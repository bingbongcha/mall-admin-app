import axios from 'axios';

const i = axios.create({
  baseURL: 'http://mallapi.duyiedu.com/',
});

i.interceptors.request.use((config) => config, (error) => { Promise.reject(error); });

i.interceptors.response.use((res) => {
  if (res.data.status === 'fail') {
    return Promise.reject(res.data.msg);
  }
  return res.data.data;
}, (error) => { Promise.reject(error); });

export default i;
