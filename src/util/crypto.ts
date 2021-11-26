import { AES, SHA512 } from "crypto-js";

export const generatedTokenByEmail: Function = (id: string) =>
  AES.encrypt(
    id + process.env.DISTINGUISHER + Date.now().toString(),
    process.env.ACCESS_TOKEN_KEY
  ).toString();

export const getEmailByToken: Function = (token: string) =>
  AES.decrypt(token, process.env.ACCESS_TOKEN_KEY)
    .toString()
    .split(process.env.DISTINGUISHER)[0];

export const hashPassword: Function = (password: string): string =>
  SHA512(password + process.env.PASSWORD_SECRET).toString();
