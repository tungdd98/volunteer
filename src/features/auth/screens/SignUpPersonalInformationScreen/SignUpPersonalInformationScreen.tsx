import React, { FC, useState } from "react";

import { Container, Typography } from "@mui/material";
import { Redirect } from "react-router-dom";

import { useAppSelector } from "app/hooks";
import {
  initialSignUpPersonalInformationForm,
  SignUpPersonalInformationMode,
} from "features/auth/auth";
import { ROOT_ROUTE } from "routes/routes.config";

import EditPersonal from "../../components/EditPersonal/EditPersonal";
import PreviewPersonal from "../../components/PreviewPersonal/PreviewPersonal";

const SignUpPersonalInformationScreen: FC = () => {
  const { userInfo } = useAppSelector(state => state.auth);

  const [mode, setMode] = useState(SignUpPersonalInformationMode.INPUT);
  const [userProfile, setUserProfile] = useState(
    initialSignUpPersonalInformationForm
  );

  if (userInfo?.displayName) {
    return <Redirect to={ROOT_ROUTE} />;
  }

  return (
    <Container maxWidth="sm" sx={{ py: 3 }}>
      <Typography variant="h2" sx={{ mb: 3 }}>
        Đăng ký thông tin cá nhân
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

export default SignUpPersonalInformationScreen;
