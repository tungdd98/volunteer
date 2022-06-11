export interface Account {
  uid: string;
  fullname: string;
  birthday: string;
  code: string;
  gender: string;
  location: string;
  nation: string;
  address: string;
}

export interface UserDef {
  uid: string;
  accessToken: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  phoneNumber: string | null;
  codeInfo?: Account | null;
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
  personalCode: File | null;
  codeInfo?: Account;
}
