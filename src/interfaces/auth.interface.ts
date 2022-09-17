export interface IDataStoredInToken {
  id: number;
}

export interface ITokenData {
  token: string;
  expiresIn: number;
}

export interface ILoginByPhone {
  phone: string;
  otp: string;
  signatureKey?: string;
}

export interface IRegisterByPhone {
  phone: string;
  otp: string;
  otpID: string;
  seedsTag: string;
  avatar: string;
  pin: string;
  signatureKey?: string;
}
