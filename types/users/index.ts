export type User = {
  id: string;
  name: string;
  email: string;
  isTwoFactorEnabled: boolean;
  emailVerified: Date | null;
  reSendemail: number;
  image: string | null;
  banUntil: Date | null;
  password: string | null;
  twoFactorConfirmation: TwoFactorConfirmation;
  role: Role;
  account: Account | null;
};

export type TwoFactorConfirmation = {
  id: string
  userId: string
}

export type Account = {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
};

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}
