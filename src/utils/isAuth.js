/* eslint-disable */
/**
 * 返回该路径是否要鉴权，要鉴权返回true
 * @param {String} path 
 * @param {Array} routes 
 */

export default function isAuth(path, routes) {
  const routesPathArr = routes.map(r => r.path)
  for (let routePath of routesPathArr) {
    let routePathx = routePath.replace(/^\//, "")
    const pathBlockArr = routePathx.split("/")
    let reg = '^'
    for (let i = 0; i < pathBlockArr.length; i++) {
      // 拼接出正则表达式
      if (pathBlockArr[i].includes(":")) {
        // 说明是动态路径
        reg = reg + `\/.+`
      } else {
        reg = reg + `\/${pathBlockArr[i]}`
      }
    }
    const regobj = new RegExp(reg)
    if (regobj.test(path)) {
      // 说明路径匹配成功，有此路由
      path = path.replace(/^\//, "")
      const pathArr = path.split("/")
      for (let k = 0; k < pathBlockArr.length; k++) {
        // 匹配了多少段就删掉多少段。   段：两个/之间的部分
        pathArr.shift()
      }
      if (pathArr.length > 0 && routes.filter((r) => r.path === routePath)[0].children) {
        const cpath = "/" + pathArr.join("/")
        const croutes = routes.filter((r) => r.path === routePath)[0].children
        return isAuth(cpath, croutes)
      } else {
        const meta = routes.filter((r) => r.path === routePath)[0].meta
        return meta.auth
      }
    } else {
      continue
    }
  }
  return false
}