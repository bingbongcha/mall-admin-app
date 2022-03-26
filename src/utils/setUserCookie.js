/* eslint-disable */
import Cookie from "js-cookie"


export function setUserCookie(info) {
  const arr = Object.entries(info)
  for (let i = 0; i < arr.length; i++) {
    Cookie.set(arr[i][0],arr[i][1])
  }
  return true
}

export function getUserCookie(){
  return {
    username : Cookie.get("username"),
    appkey : Cookie.get("appkey"),
    role : Cookie.get("role"),
    email : Cookie.get("email")
  }
}

export function removeUserCookie(){
   Cookie.remove("username")
   Cookie.remove("appkey")
   Cookie.remove("role")
   Cookie.remove("email")
}