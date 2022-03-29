/* eslint-disable */
import request from './request';

export function getAllCategory(params){
  return request({
    url : "/category/all",
    method : "get",
    params
  })
}