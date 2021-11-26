import { AES, SHA512, enc } from "crypto-js";

export const generatedTokenByEmail: Function = (id: string) =>
  AES.encrypt(
    String(id + process.env.DISTINGUISHER + Date.now().toString()),
    String(process.env.ACCESS_TOKEN_KEY)
  ).toString();

export const getEmailByToken: Function = (token: string) =>
  AES.decrypt(String(token), String(process.env.ACCESS_TOKEN_KEY))
    .toString(enc.Utf8)
    .split(process.env.DISTINGUISHER)[0];

export const hashPassword: Function = (password: string): string =>
  SHA512(password + process.env.PASSWORD_SECRET).toString();
