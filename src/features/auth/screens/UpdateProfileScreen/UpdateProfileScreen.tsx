import React, { FC, useState } from "react";

import { Container, Typography } from "@mui/material";

import { useAppSelector } from "app/hooks";
import {
  SignUpPersonalInformationForm,
  SignUpPersonalInformationMode,
} from "features/auth/auth";

import EditPersonal from "../../components/EditPersonal/EditPersonal";
import PreviewPersonal from "../../components/PreviewPersonal/PreviewPersonal";

const UpdateProfileScreen: FC = () => {
  const { userInfo } = useAppSelector(state => state.auth);

  const [mode, setMode] = useState(SignUpPersonalInformationMode.INPUT);
  const [userProfile, setUserProfile] = useState<SignUpPersonalInformationForm>(
    {
      displayName: userInfo?.displayName || "",
      photoURL: userInfo?.photoURL || "",
      personalCode: null,
    }
  );

  return (
    <Container maxWidth="sm" sx={{ py: 3 }}>
      <Typography variant="h2" sx={{ mb: 3 }}>
        Cập nhật thông tin cá nhân
      </Typography>

      {mode === SignUpPersonalInformationMode.INPUT && (
        <EditPersonal
          setMode={setMode}
          userProfile={userProfile}
          setUserProfile={setUserProfile}
        />
      )}
      {mode === SignUpPersonalInformationMode.PREVIEW && (
        <PreviewPersonal setMode={setMode} userProfile={userProfile} />
      )}
    </Container>
  );
};

export default UpdateProfileScreen;
