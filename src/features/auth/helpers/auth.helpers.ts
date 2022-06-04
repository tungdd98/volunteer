import * as yup from "yup";

import { AuthMessages, LoginForm, RegisterForm } from "../auth";

export const initialLoginForm: LoginForm = {
  email: "",
  password: "",
};

export const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const initialRegisterForm: RegisterForm = {
  email: "",
  password: "",
  confirmPassword: "",
};

export const registerSchema = yup.object().shape({
  email: yup.string().email().required().max(255),
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], AuthMessages.PASSWORD_NOT_MATCH),
});
