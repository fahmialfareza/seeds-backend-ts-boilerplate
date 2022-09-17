export interface IUser {
  [x: string]: any;
  id: number;
  idWallet: number;
  phone: string;
  email: string;
  avatar: string;
  seedsTag: string;
  seedsName: string;
  otp: string;
  pin: string;
  countPost: number;
  countFollowers: number;
  countFollowings: number;
}

export interface IToken {
  id: number;
  idUser: number;
  tokenFirebase: string;
  tokenGoogle: string;
  tokenFacebook: string;
  tokenApple: string;
  deviceId: string;
}

export interface IQuestioner {
  id: number;
  idUser: number;
  risk: string;
  preferenceChoosed: string;
  interest: string;
  experience: string;
  preference: string;
}

export interface IWallet {
  id: number;
  idUser: number;
  walletType: 'IDR_DEMO' | 'IDR' | 'USD_DEMO' | 'USD';
  walletValue: number;
}
export interface IWalletTransactions {
  id: number;
  walletId: number;
  transactionType: 'DEBIT' | 'CREDIT';
  transactionValue: number;
  transactionNote: string;
}
