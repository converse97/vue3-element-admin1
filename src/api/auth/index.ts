import request from "../../utils/request";
import type { AxiosPromise } from "axios";
import type { LoginData, LoginResult } from "./types";

// 登录api
export function loginApi(data: LoginData): AxiosPromise<LoginResult> {
  return request({
    url: "/api/v1/auth/login",
    method: "post",
    params: data,
  });
}

export default loginApi;
