export interface UserDef {
  uid: string;
  accessToken: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  phoneNumber: string | null;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm extends LoginForm {
  confirmPassword: string;
}

export interface SignUpPersonalInformationForm {
  displayName: string | null;
  photoURL: string | File;
}
