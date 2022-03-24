import request from './request';

export default {
  login(params) {
    return request.post('/passport/login', params);
  },
};
