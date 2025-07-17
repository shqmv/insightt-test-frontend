export type ILogin = {
  email: string,
  password: string
}

export type ILoginResponse = {
  refreshToken: string,
  accessToken: string
}
