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

// 新增产品
export function addProduct(params){
  return request.post("/products/add",params)
}

// 查询一个商品信息
export function getOneProduct(id){
  return request.get(`/products/${id}`)
}

// 编辑商品信息
export function editProduct(params){
  return request.put("/products/edit",params)
}