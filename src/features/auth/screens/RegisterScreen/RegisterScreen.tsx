import React, { FC } from "react";

import { RestaurantMenuRounded } from "@mui/icons-material";
import { Box, Typography, Link, Button } from "@mui/material";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Formik, Form, FormikHelpers } from "formik";
import { useHistory } from "react-router-dom";

import { useAppDispatch } from "app/hooks";
import FormikTextField from "components/FormElements/FormikTextField/FormikTextField";
import { RegisterForm } from "features/auth/auth";
import {
  initialRegisterForm,
  registerSchema,
} from "features/auth/helpers/auth.helpers";
import { handleShowSnackbar } from "helpers/form/display-snackbar";
import { ROOT_ROUTE } from "routes/routes.config";

const RegisterScreen: FC = () => {
  const auth = getAuth();
  const history = useHistory();

  const dispatch = useAppDispatch();

  const registerUser = (
    values: RegisterForm,
    { setSubmitting }: FormikHelpers<RegisterForm>
  ) => {
    const { email, password } = values;

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        signInWithEmailAndPassword(auth, email, password)
          .then(() => {
            history.push(ROOT_ROUTE);
          })
          .catch(error => {
            handleShowSnackbar({ dispatch, error });
          })
          .finally(() => {
            setSubmitting(false);
          });
      })
      .catch(error => {
        handleShowSnackbar({ dispatch, error });
        setSubmitting(false);
      });
  };

  return (
    <Box sx={{ py: 5 }}>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h1" fontSize={32} sx={{ px: 6 }}>
          Đăng ký
        </Typography>

        <Box sx={{ fontSize: 70, my: 4 }}>
          <RestaurantMenuRounded color="primary" fontSize="inherit" />
        </Box>
      </Box>

      <Formik
        validationSchema={registerSchema}
        initialValues={initialRegisterForm}
        onSubmit={registerUser}
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
            <FormikTextField
              name="confirmPassword"
              fullWidth
              placeholder="********"
              type="password"
              label="Xác nhận mật khẩu"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isSubmitting}
            >
              Tạo tài khoản
            </Button>
          </Form>
        )}
      </Formik>

      <Typography
        variant="caption"
        color="GrayText"
        display="block"
        textAlign="center"
        sx={{ mt: 5 }}
      >
        Bằng cách đăng ký, bạn đồng ý với&nbsp;
        <Link href="abc" underline="none">
          Chính sách bảo mật
        </Link>
        &nbsp; và&nbsp;
        <Link href="abc" underline="none">
          Điều khoản sử dụng
        </Link>
        &nbsp; của chúng tôi.
      </Typography>
    </Box>
  );
};

export default RegisterScreen;
