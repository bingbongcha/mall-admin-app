/* eslint-disable */
import request from './request';
import { getUserCookie,removeUserCookie } from "@/utils/setUserCookie"

export default {
  login(params) {
    return request.post('/passport/login', params);
  },
  whoAmI() {
    return new Promise((resolve) => {
      resolve(getUserCookie())
    })
  },
  loginOut(){
    return new Promise((resolve)=>{
      removeUserCookie()
      resolve()
    })
  }
};
