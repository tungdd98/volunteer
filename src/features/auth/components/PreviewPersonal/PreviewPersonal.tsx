import React, { FC, memo, useMemo, useState } from "react";

import { Box, Button, Stack, Typography } from "@mui/material";
import { getAuth, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useHistory } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "app/hooks";
import PreviewImage from "components/PreviewImage/PreviewImage";
import RowData from "components/RowData/RowData";
import {
  setUserInfo,
  SignUpPersonalInformationForm,
  SignUpPersonalInformationMode,
} from "features/auth/auth";
import { handleShowSnackbar } from "helpers/form/display-snackbar";
import { ROOT_ROUTE } from "routes/routes.config";

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
            dispatch(
              setUserInfo({
                ...userInfo,
                displayName,
                photoURL: photoUrlUploaded || userInfo.photoURL,
              })
            );
            history.push(ROOT_ROUTE);
          }
        })
        .catch(error => {
          handleShowSnackbar({ dispatch, error });
        })
        .finally(() => setIsSubmitting(false));
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
      return <PreviewImage width={240} src={userProfile.photoURL} />;
    }

    if (userProfile.photoURL instanceof File) {
      return <PreviewImage width={240} file={userProfile.photoURL} />;
    }

    return null;
  }, [userProfile.photoURL]);

  return (
    <>
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ mb: 0.5 }}>Họ và tên</Typography>
        <RowData content={userProfile.displayName} />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography sx={{ mb: 0.5 }}>Ảnh đại diện</Typography>
        {photoURL}
      </Box>

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
