/* eslint-disable */

const roleToRoute = {
  'admin': [
    { name: "Product" },
    { name: "ProductList" },
    { name: "ProductAdd" },
    { name: "Category" }
  ],
  'coustomer': [
    { name: "Product" },
    { name: "ProductList" },
    { name: "ProductAdd" },
  ],
}

export default function getMenuRoute(role, routes) {
  const allowRoutesName = roleToRoute[role].map(i=>i.name)
  const resultRoute = routes.filter(r=>{
    if(allowRoutesName.indexOf(r.name) !== -1){
      r.children = r.children.filter(r=>allowRoutesName.indexOf(r.name) !== -1)
      return true
    }
    return false
  })
  return resultRoute
}