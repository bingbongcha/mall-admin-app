/* eslint-disable */
import axios from 'axios';
import store from "../store"

const i = axios.create({
  baseURL: 'http://mallapi.duyiedu.com/',
});

i.interceptors.request.use((config) => {
  if(config.url.includes("/passport")){
    return config
  }
  return {
    ...config,
    params : {
      ...config.params,
      appkey : store.state.user.appkey
    }
  }
}, (error) => { Promise.reject(error); });

i.interceptors.response.use((res) => {
  if (res.data.status === 'fail') {
    return Promise.reject(res.data.msg);
  }
  return res.data.data;
}, (error) => { Promise.reject(error); });

export default i;
