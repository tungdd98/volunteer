import React, { FC, useState } from "react";

import { RestaurantMenuRounded, Apple } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Formik, Form, FormikHelpers } from "formik";
import { useHistory } from "react-router-dom";

import { useAppDispatch } from "app/hooks";
import { ReactComponent as FacebookIcon } from "assets/images/icon-facebook.svg";
import { ReactComponent as GoogleIcon } from "assets/images/icon-google.svg";
import FormikTextField from "components/FormElements/FormikTextField/FormikTextField";
import {
  AuthPathsEnum,
  initialLoginForm,
  LoginForm,
  loginSchema,
} from "features/auth/auth";
import { handleShowSnackbar } from "helpers/form/display-snackbar";
import { ROOT_ROUTE } from "routes/routes.config";

const LoginScreen: FC = () => {
  const auth = getAuth();
  const history = useHistory();

  const dispatch = useAppDispatch();

  const [isSubmittingGoogle, setIsSubmittingGoogle] = useState(false);
  const [isSubmittingFacebook, setIsSubmittingFacebook] = useState(false);

  const loginWithGoogle = () => {
    setIsSubmittingGoogle(true);
    signInWithPopup(auth, new GoogleAuthProvider())
      .then(() => {
        history.push(ROOT_ROUTE);
      })
      .catch(error => {
        handleShowSnackbar({ dispatch, error });
      })
      .finally(() => {
        setIsSubmittingGoogle(false);
      });
  };

  const loginWithFacebook = () => {
    setIsSubmittingFacebook(true);
    signInWithPopup(auth, new FacebookAuthProvider())
      .then(() => {
        history.push(ROOT_ROUTE);
      })
      .catch(error => {
        handleShowSnackbar({ dispatch, error });
      })
      .finally(() => {
        setIsSubmittingFacebook(false);
      });
  };

  const loginWithEmailPassword = (
    values: LoginForm,
    { setSubmitting }: FormikHelpers<LoginForm>
  ) => {
    const { email, password } = values;

    signInWithEmailAndPassword(auth, email, password)
      .then(userInfo => {
        if (userInfo.user.displayName) {
          history.push(ROOT_ROUTE);
        } else {
          history.push(AuthPathsEnum.SIGN_UP_PERSONAL_INFO);
        }
      })
      .catch(error => {
        handleShowSnackbar({ dispatch, error });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <Box sx={{ py: 5 }}>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h1" sx={{ px: 6 }}>
          Đăng nhập
        </Typography>

        <Box sx={{ fontSize: 70, my: 4 }}>
          <RestaurantMenuRounded color="primary" fontSize="inherit" />
        </Box>

        <Typography variant="caption" color="GrayText">
          Đăng nhập với
        </Typography>

        <Stack
          spacing={2}
          direction="row"
          justifyContent="center"
          sx={{ mt: 2 }}
        >
          <IconButton
            component={Paper}
            elevation={10}
            onClick={loginWithFacebook}
            disabled={isSubmittingFacebook}
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            component={Paper}
            elevation={10}
            onClick={loginWithGoogle}
            disabled={isSubmittingGoogle}
          >
            <GoogleIcon />
          </IconButton>
          <IconButton component={Paper} elevation={10}>
            <Apple />
          </IconButton>
        </Stack>

        <Typography
          variant="caption"
          color="GrayText"
          display="block"
          sx={{ my: 3 }}
        >
          hoặc tiếp tục với
        </Typography>
      </Box>

      <Formik
        validationSchema={loginSchema}
        initialValues={initialLoginForm}
        onSubmit={loginWithEmailPassword}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ isSubmitting }) => (
          <Form>
            <FormikTextField
              name="email"
              fullWidth
              placeholder="Email"
              label="Email"
            />
            <FormikTextField
              name="password"
              fullWidth
              placeholder="********"
              type="password"
              label="Mật khẩu"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isSubmitting}
            >
              Đăng nhập
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default LoginScreen;
