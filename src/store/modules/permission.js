import { asyncRoutes, constantRoutes } from '@/router'
import { getNav } from '@/api/user'
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

function rebuildRouters(asyncRoutes,adminNav) {
  return asyncRoutes
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    // 获取服务器的地址
    return new Promise((resolve, reject) => {
      getNav().then((adminNav) => {
        let accessedRoutes
        // todo 需要重组整个路由
        accessedRoutes = rebuildRouters(asyncRoutes, adminNav)
        if (roles.includes('admin')) {
          accessedRoutes = accessedRoutes || []
        } else {
          accessedRoutes = filterAsyncRoutes(accessedRoutes, roles)
        }
        console.log('应该在accessRoutes前面', accessedRoutes)
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      }).catch((err) => {
        reject(err)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
