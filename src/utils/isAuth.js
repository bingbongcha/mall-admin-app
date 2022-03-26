/* eslint-disable */
/**
 * 返回改路径是否要鉴权，要鉴权返回true
 * @param {String} path 
 * @param {Array} routes 
 */
export default function isAuth(path,routes){
  path = path.replace(/^\//,"");
  let arr = path.split("/")
  if(arr.length > 0){
   const routesPathArr = routes.map(r=>r.path)
   for (const p of routesPathArr) {
     if(arr[0] === p|| ("/"+ arr[0]) === p){
        // 匹配到了
        arr.shift()
        // 如果还有要搜索的路径，并且路由还有children,递归
        if(arr.length > 0 && routes.filter(r=>r.path === p)[0].children){
          const rpath = "/"+arr.join("")
          const rchildren =  routes.filter(r=>r.path === p)[0].children
          return isAuth(rpath,rchildren)
        }else{
          const meta = routes.filter(r=>r.path === p)[0].meta
          if(meta.auth){
            return true
          }else{
            return false
          }
        }
     }
   }
  //  走到这里说明虽然有路径，但是匹配不到路由信息
   return false
  }

}