import * as yup from "yup";

import { DefaultMessages } from "constants/message.constants";

import {
  AuthMessages,
  LoginForm,
  RegisterForm,
  SignUpPersonalInformationForm,
} from "../auth";

export const initialLoginForm: LoginForm = {
  email: "",
  password: "",
};

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email(AuthMessages.EMAIL_INVALID)
    .required(DefaultMessages.REQUIRED),
  password: yup.string().required(DefaultMessages.REQUIRED),
});

export const initialRegisterForm: RegisterForm = {
  email: "",
  password: "",
  confirmPassword: "",
};

export const registerSchema = yup.object().shape({
  email: yup
    .string()
    .email(AuthMessages.EMAIL_INVALID)
    .required(DefaultMessages.REQUIRED)
    .max(255),
  password: yup.string().required(DefaultMessages.REQUIRED),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], AuthMessages.PASSWORD_NOT_MATCH),
});

export const initialSignUpPersonalInformationForm: SignUpPersonalInformationForm =
  {
    displayName: "",
    photoURL: "",
    personalCode: null,
  };
