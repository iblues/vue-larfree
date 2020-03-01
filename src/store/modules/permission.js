import { asyncRoutes, constantRoutes } from '@/router'
import { getNav } from '@/api/user'
import Layout from '@/layout'
import { deepClone } from '@/utils'

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

/**
 * 由于带有:model参数的是动态的.
 * 为了让他适应更多情况.替换:model(common.user)
 * 让vue认为是多个路由
 * @param url
 * @param route
 * @returns {*}
 */
function replacePath(url, route) {
  url = url.split('/')
  route = route.split('/')
  for (const key in route) {
    if (route[key] === ':model') {
      route[key] = ':model(' + url[key] + ')'
    }
  }
  return route.join('/')
}

function rebuildRouters(asyncRoutes, adminNav, root) {
  const router = []
  adminNav.forEach((nav) => {
    asyncRoutes.forEach((route) => {
      // 空组件
      if (!nav.component) {
        // 站位的
      } else if (nav.component === route.uniqueKey) {
        // 找到uniqueKey匹配的组件
        const defineRoute = deepClone(route)
        let tmpRouter = {}
        // 如果不是根目录,就把最外侧的layout干掉

        defineRoute['url'] = nav.url
        defineRoute['name'] = nav.url
        defineRoute['path'] = replacePath(nav.url, defineRoute.path)
        defineRoute['meta'] = { 'title': nav.name, 'icon': nav.icon }

        // 根目录加上layout的外壳
        if (root) {
          tmpRouter = {
            redirect: nav.url,
            path: '/',
            meta: { 'title': nav.name, 'icon': nav.icon, affix: true },
            component: Layout,
            children: [defineRoute]
          }
        } else {
          tmpRouter = defineRoute
        }

        // 如果是多级菜单.递归
        // console.log(nav.children, 'children')
        if (nav.children) {
          console.log(nav.children)
          tmpRouter['children'] = rebuildRouters(asyncRoutes, nav.children, false)
          // tmpRouter['component'] = '';
        }

        router.push(tmpRouter)
      }
    })
  })
  return router
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
        accessedRoutes = rebuildRouters(asyncRoutes, adminNav.data, true)
        // console.log(accessedRoutes, 'last')
        if (roles.includes('admin')) {
          accessedRoutes = accessedRoutes || []
        } else {
          accessedRoutes = filterAsyncRoutes(accessedRoutes, roles)
        }
        // console.log('应该在accessRoutes前面', accessedRoutes)
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
