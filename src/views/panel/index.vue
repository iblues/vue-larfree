<template>
  <span style="margin: 10px">
    <el-button v-if="edit" @click="edit=false">
      关闭编辑
    </el-button>
    <el-button v-else @click="edit=true">
      开启编辑
    </el-button>
    <div class="app-container" style="background: rgba(240,240,245,.5);min-height: 400vh">
      <drag-ui-row :layout="layout" :edit="edit" @layout="(val)=>{update(val)}" />
    </div>
  </span>
</template>

<script>
import DragUiRow from '@/larfree/components/dragUi/Row'
export default {
  name: 'Index',
  components: { DragUiRow },
  data() {
    return {
      layout: [],
      edit: true
    }
  },
  created() {
    this.layout = this.loadLayout('test')
  },
  methods: {
    update(val) {
      this.layout = val
      this.saveLayout('test', val)
    },
    saveLayout(name, data) {
      localStorage.setItem('layout-' + name, JSON.stringify(data))
    },
    loadLayout(name) {
      const json = localStorage.getItem('layout-' + name)
      if (json) {
        return JSON.parse(json)
      } else {
        return []
      }
    }

  }
}
</script>

<style scoped>
  .vue-grid-item {
    background: #f5f6e6;
  }
</style>
