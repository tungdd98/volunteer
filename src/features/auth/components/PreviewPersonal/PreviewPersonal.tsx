import React, { FC, memo, useMemo, useState } from "react";

import { Box, Button, Stack, Typography } from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import { getAuth, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useHistory } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "app/hooks";
import PreviewImage from "components/PreviewImage/PreviewImage";
import RowData from "components/RowData/RowData";
import {
  createAccount,
  setUserInfo,
  SignUpPersonalInformationForm,
  SignUpPersonalInformationMode,
} from "features/auth/auth";
import { handleShowSnackbar } from "helpers/form/display-snackbar";
import { ROOT_ROUTE } from "routes/routes.config";

import PreviewCodeInfoText from "../PreviewCodeInfo/PreviewCodeInfoText";

interface PreviewPersonalProps {
  setMode: React.Dispatch<React.SetStateAction<SignUpPersonalInformationMode>>;
  userProfile: SignUpPersonalInformationForm;
}

const PreviewPersonal: FC<PreviewPersonalProps> = ({
  setMode,
  userProfile,
}) => {
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector(state => state.auth);

  const history = useHistory();

  const fileName = userProfile.photoURL instanceof File ? userInfo?.uid : "";
  const storage = getStorage();
  const storageRef = ref(storage, `/files/${fileName}`);
  const auth = getAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpdateProfile = (photoUrlUploaded?: string) => {
    const { displayName } = userProfile;

    if (auth.currentUser) {
      updateProfile(auth.currentUser, {
        displayName,
        photoURL: photoUrlUploaded,
      })
        .then(() => {
          if (userInfo) {
            const userInfoBasic = {
              ...userInfo,
              displayName,
              photoURL: photoUrlUploaded || userInfo.photoURL,
            };
            dispatch(setUserInfo(userInfoBasic));

            if (userProfile?.codeInfo) {
              dispatch(createAccount(userProfile.codeInfo))
                .then(unwrapResult)
                .then(() => {
                  dispatch(
                    setUserInfo({
                      ...userInfoBasic,
                      codeInfo: userProfile.codeInfo,
                    })
                  );
                  history.push(ROOT_ROUTE);
                })
                .finally(() => setIsSubmitting(false));
            } else {
              setIsSubmitting(false);
              history.push(ROOT_ROUTE);
            }
          }
        })
        .catch(error => {
          handleShowSnackbar({ dispatch, error });
        });
    }
  };

  const handleUploadPhotoURL = () => {
    if (userProfile.photoURL instanceof File) {
      setIsSubmitting(true);
      uploadBytes(storageRef, userProfile.photoURL).then(() => {
        getDownloadURL(storageRef).then(url => {
          handleUpdateProfile(url);
        });
      });
    } else {
      handleUpdateProfile();
    }
  };

  const photoURL = useMemo(() => {
    if (typeof userProfile.photoURL === "string") {
      return <PreviewImage width={180} src={userProfile.photoURL} />;
    }

    if (userProfile.photoURL instanceof File) {
      return <PreviewImage width={180} file={userProfile.photoURL} />;
    }

    return null;
  }, [userProfile.photoURL]);

  return (
    <>
      <Box sx={{ mb: 3 }}>
        <Typography fontWeight={600} sx={{ mb: 0.5 }}>
          Nickname
        </Typography>
        <RowData content={userProfile.displayName} />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography fontWeight={600} sx={{ mb: 0.5 }}>
          Ảnh đại diện
        </Typography>
        {photoURL}
      </Box>

      {userProfile?.codeInfo && (
        <PreviewCodeInfoText codeInfo={userProfile.codeInfo} />
      )}

      <Stack direction="column" spacing={1}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          onClick={handleUploadPhotoURL}
          disabled={isSubmitting}
        >
          Lưu lại
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          fullWidth
          onClick={() => setMode(SignUpPersonalInformationMode.INPUT)}
        >
          Chỉnh sửa
        </Button>
      </Stack>
    </>
  );
};

export default memo(PreviewPersonal);
