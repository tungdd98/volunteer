import React, { FC, useState } from "react";

import { Container, Typography } from "@mui/material";

import {
  initialSignUpPersonalInformationForm,
  SignUpPersonalInformationMode,
} from "features/auth/auth";

import InputScreen from "./InputScreen/InputScreen";
import PreviewScreen from "./PreviewScreen/PreviewScreen";

const SignUpPersonalInformationScreen: FC = () => {
  const [mode, setMode] = useState(SignUpPersonalInformationMode.INPUT);
  const [userProfile, setUserProfile] = useState(
    initialSignUpPersonalInformationForm
  );

  return (
    <Container maxWidth="sm" sx={{ py: 3 }}>
      <Typography variant="h2" sx={{ mb: 3 }}>
        Đăng ký thông tin cá nhân
      </Typography>

      {mode === SignUpPersonalInformationMode.INPUT && (
        <InputScreen
          setMode={setMode}
          userProfile={userProfile}
          setUserProfile={setUserProfile}
        />
      )}
      {mode === SignUpPersonalInformationMode.PREVIEW && (
        <PreviewScreen setMode={setMode} userProfile={userProfile} />
      )}
    </Container>
  );
};

export default SignUpPersonalInformationScreen;
