export interface IUser {

  id: string;
  displayName: string;
  email: string;
  token: string;
  imageUrl?: string;
}

export interface ILoginCreds {
  email: string;
  password: string;
}

export interface IRegisterCreds {
  email: string;
  displayName: string;
  password: string;
}
