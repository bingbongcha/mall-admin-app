/* eslint-disable */
import loginApi from '@/api/login';
import * as userCookieApi from "@/utils/setUserCookie"

export default {
  namespaced: true,
  state: {
    username: '',
    appkey: '',
    role: '',
    email: '',
  },
  mutations: {
    SET_USER(state, userInfo) {
      const { username, appkey, role, email } = userInfo
      state.username = username;
      state.appkey = appkey
      state.role = role
      state.email = email
    },
  },
  actions: {
    login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        loginApi.login(userInfo).then((res) => {
          commit('SET_USER', res)
          userCookieApi.setUserCookie(res)
          resolve(res)
        }).catch(error => reject(error));
      });
    },
    whoAmI({ commit }) {
      return loginApi.whoAmI().then(res => {
        commit('SET_USER', res)
      })
    },
    loginOut({commit}) {
      return loginApi.loginOut().then(() => {
        commit('SET_USER', {
          username: "",
          appkey: "",
          role: "",
          email: ""
        })
      })

    }
  },
};
