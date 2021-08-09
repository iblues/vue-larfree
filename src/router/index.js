import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'
// import larfreeRouter from './modules/larfreeRouter'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },

  // {
  //   path: '/show',
  //   component: Layout,
  //   hidden: true,
  //   children: [
  //     {
  //       path: '/show/:model/:actn?',
  //       component: require('@/views/curd/show.vue').default
  //     }
  //   ]
  // },

  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      // {
      //   path: 'dashboard',
      //   component: () => import('@/views/panel'),
      //   name: 'Dashboard',
      //   meta: { title: '首页', icon: 'dashboard', affix: true }
      // }
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  // excel

  // // 案例
  // {
  //   path: '/curd/common.user/',
  //   component: Layout,
  //   children: [
  //     {
  //       url: '/curd/common.user/test/test',
  //       path: '/curd/:model(common.user)/:actn?/:query?/',
  //       meta: { title: '用户管理2', icon: 'dashboard', affix: true },
  //       component: require('@/views/curd/list.vue').default
  //     }
  //   ]
  // },

  // {
  //   path: '/documentation',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/documentation/index'),
  //       name: 'Documentation',
  //       meta: { title: 'Documentation', icon: 'documentation', affix: true }
  //     }
  //   ]
  // },
  // {
  //   path: '/guide', // 教程
  //   component: Layout,
  //   redirect: '/guide/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/guide/index'),
  //       name: 'Guide',
  //       meta: { title: 'Guide', icon: 'guide', noCache: true }
  //     }
  //   ]
  // },
  {
    path: '/profile', // 个人中心
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  },

  // 面板编辑
  {
    path: '/panel',
    component: Layout,
    uniqueKey: 'curd/table',
    hidden: true,
    children: [
      {
        path: '/panel/:id/:edit?',
        component: () => import('@/views/panel'),
        name: '面板',
        meta: { title: '面板', icon: 'bug' }
      }
    ]
  },
  // 蓝图修改
  {
    path: '/schemas',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/schemas',
        component: () => import('@/views/schemas/index'),
        name: '蓝图',
        meta: { title: '面板', icon: 'list' }
      }
    ]
  },
  {
    path: '/larfree_config',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/larfree_config',
        component: () => import('@/views/config/index'),
        name: '系统配置',
        meta: { title: '系统配置', icon: 'list' }
      }
    ]
  },

  /* 调试用 先放这里 */

  {
    path: '/curd', // 个人中心
    component: Layout,
    hidden: true,
    children: [
      {
        hidden: true,
        path: '/curd/add/:model/:module?',
        meta: { 'title': '数据添加', 'icon': 'edit' },
        props: true,
        component: require('@/views/curd/edit.vue').default
      },
      {
        hidden: true,
        path: '/curd/edit/:model/:id/:module?',
        meta: { 'title': '数据添加', 'icon': 'edit' },
        props: true,
        component: require('@/views/curd/edit.vue').default
      },
      {
        hidden: true,
        path: '/curd/:model/:actn?/:query?/',
        meta: { 'title': '数据管理', 'icon': 'edit' },
        component: require('@/views/curd/list.vue').default
      }
    ]
  },
  {
    hidden: true,
    path: '/dialog/student/bed/:id?/:module?',
    meta: { dialog: true, title: '学生信息', width: 'w800' },
    component: require('@/views/dialog/StudentHistory.vue').default,
    props: true
  },
  // 调试用end
  // 弹窗
  {
    hidden: true,
    path: '/dialog/edit/:model/:id?/:module?',
    meta: { dialog: true, title: '编辑', width: 'w800' },
    component: require('@/views/dialog/CommonForm.vue').default,
    props: true
  },
  {
    hidden: true,
    path: '/dialog/add/:model/:module?',
    meta: { dialog: true, title: '编辑', width: 'w800' },
    component: require('@/views/dialog/CommonForm.vue').default,
    props: true
  },
  {
    hidden: true,
    path: '/dialog/import/:model/:api',
    meta: { dialog: true, title: '导入', width: 'w600' },
    component: require('@/views/dialog/import.vue').default,
    props: true
  },

  { path: '*', component: () => import('@/views/error-page/404'), hidden: true }

]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  /**
   // {
  //   path: '/permission',
  //   component: Layout,
  //   redirect: '/permission/page',
  //   alwaysShow: true, // will always show the root menu
  //   name: 'Permission',
  //   meta: {
  //     title: 'Permission',
  //     icon: 'lock',
  //     roles: ['admin', 'editor'] // you can set roles in root nav
  //   },
  //   children: [
  //     {
  //       path: 'page',
  //       comphttps://github.com/PanJiaChen/vue-element-adminonent: () => import('@/views/permission/page'),
  //       name: 'PagePermission',
  //       meta: {
  //         title: 'Page Permission',
  //         roles: ['admin'] // or you can only set roles in sub nav
  //       }
  //     },
  //     {
  //       path: 'directive',
  //       component: () => import('@/views/permission/directive'),
  //       name: 'DirectivePermission',
  //       meta: {
  //         title: 'Directive Permission'
  //         // if do not set roles, means: this page does not require permission
  //       }
  //     },
  //     {
  //       path: 'role',
  //       component: () => import('@/views/permission/role'),
  //       name: 'RolePermission',
  //       meta: {
  //         title: 'Role Permission',
  //         roles: ['admin']
  //       }
  //     }
  //   ]
  // },

   // {
  //   path: '/icon',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/icons/index'),
  //       name: 'Icons',
  //       meta: { title: 'Icons', icon: 'icon', noCache: true }
  //     }
  //   ]
  // },
   **/

  {
    hidden: false,
    uniqueKey: 'hostel/live',
    path: '/hostel/live',
    meta: { 'title': '内容管理', 'icon': 'edit' },
    component: require('@/views/hostel/excel.vue').default
  },
  {
    hidden: false,
    uniqueKey: 'hostel/homekeeping',
    path: '/hostel/homekeeping',
    meta: { 'title': '内容管理', 'icon': 'edit' },
    component: require('@/views/hostel/homekeeping.vue').default
  },
  {
    hidden: false,
    uniqueKey: 'hostel/bed',
    path: '/hostel/bed',
    meta: { 'title': '内容管理', 'icon': 'edit' },
    component: require('@/views/hostel/bed.vue').default
  },
  /**  larfree start **/

  // 页面类

  {
    hidden: false,
    uniqueKey: 'curd/table',
    path: '/curd/:model/:actn?/:query?/',
    meta: { 'title': '数据管理', 'icon': 'edit' },
    component: require('@/views/curd/list.vue').default
  },
  {
    hidden: false,
    uniqueKey: 'curd/add',
    path: '/curd/add/:model/:module?',
    meta: { 'title': '数据添加', 'icon': 'edit' },
    props: true,
    component: require('@/views/curd/edit.vue').default
  },
  {
    uniqueKey: 'curd/edit',
    path: '/curd/edit/:model/:id?',
    meta: { 'title': '数据添加', 'icon': 'edit' },
    component: require('@/views/curd/edit.vue').default
  },
  {
    path: 'config',
    uniqueKey: 'config',
    component: () => import('@/views/config/index'),
    name: '系统配置',
    meta: { title: '系统配置', icon: 'list' }
  },

  /** when your routing map is too long, you can split it into small modules **/
  // componentsRouter,
  // chartsRouter,
  // nestedRouter,
  // tableRouter,

  {
    path: '/error-log',
    component: Layout,
    children: [
      {
        path: 'log',
        component: () => import('@/views/error-log/index'),
        name: 'ErrorLog',
        meta: { title: 'Error Log', icon: 'bug' }
      }
    ]
  }
  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
// 为了可以动态删除路由
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
