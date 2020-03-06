import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters

/* 自定义组件*/
import larFieldTapeRecord from './larfree/components/field/Taperecord'
Vue.component(larFieldTapeRecord.name, larFieldTapeRecord)
import larFieldUserDetail from './larfree/components/field/UserDetail'
Vue.component(larFieldUserDetail.name, larFieldUserDetail)

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}
// console.log(process.env.VUE_APP_BASE_API, 'host2')
// larfree需要变更
// import larfree from 'vue-larfree-core'
import larfree from '../../vue-larfree-core/src/index.js'
Vue.use(larfree, { host: process.env.VUE_APP_BASE_API })

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

// 增加弹窗拦截器,配合larDialog使用
import NProgress from 'nprogress' // progress bar
router.beforeEach((to, from, next) => {
  // console.log(to, 'router')

  // 路径中带http://的 又没有转义. 就直接location跳过去
  if (to.path.indexOf('http://') > 0 || to.path.indexOf('https://') > 0) {
    location.href = (to.path.substring(to.path.indexOf('http://')))
  }

  if (to.path.indexOf('dialog') > 0) {
    const id = 'dialog' + Math.floor(Math.random() * 1000000000000000)
    Vue.component(id, to.matched[0].components.default)
    store.commit('larfree/dialog', {
      id: id,
      visible: true,
      dWidth: to.meta.width,
      params: to.params,
      title: to.meta.title,
      closeDialog: i => {
        // Vue.set(this.dialogs[i], 'visible', false)
        // this.dialogs.splice(i, 1)
        // this.closeEnd();
      }
    })
    NProgress.done()
    next(false)
  } else {
    next()
  }
})

// 拖拽化用
import DragUiSettingFrom from '@/larfree/components/dragUi/SettingFrom'
Vue.component(DragUiSettingFrom.name, DragUiSettingFrom)
import UiPlane from '@/components/Ui/Plane'
Vue.component(UiPlane.name, UiPlane)

import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
Vue.use(Viewer, {
  defaultOptions: {
    'zIndex': 3000,
    'inline': false,
    'button': false,
    'navbar': false,
    'title': false,
    'toolbar': false,
    'tooltip': false,
    'movable': false,
    'zoomable': false,
    'rotatable': false,
    'scalable': false,
    'transition': true,
    'fullscreen': true,
    'keyboard': true,
    'url': 'data-source'
  }
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
