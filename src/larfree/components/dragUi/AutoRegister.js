import Vue from 'vue'
// 批量读取field组件
const modulesFiles = require.context('./element', true, /\.vue$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

// 将field中的组件自动注册
for (const key in modules) {
  if (modules[key].name) {
    // console.log(modules[key].name, '已注册')
    Vue.component(modules[key].name, modules[key])
  }
}
