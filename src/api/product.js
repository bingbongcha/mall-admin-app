/* eslint-disable */
import request from './request';

// 获取所有产品信息
export function getProducts(params){
  return request({
    url : "/products/all",
    method : "get",
    params
  })
}

// 删除一个产品
export function delOneProduct(params){
  return request({
    url : `/products/${params.id}`,
    method : "delete"
  })
}