<template>
  <span>
    <div style="padding: 10px">
      拖拽 <el-switch v-model="drag" />   <el-divider direction="vertical" />
      大小 <el-switch v-model="resize" />   <el-divider direction="vertical" />
      设置 <el-switch v-model="edit" />

      <span style="float: right">
        <el-button size="mini" plain type="primary" @click="saveLayout">保存</el-button>
        <el-button size="mini" plain type="danger" @click="loadLayout">重置</el-button>
      </span>
    </div>

    <div class="app-container" style="background: rgba(240,240,245,.5);min-height: 400vh">
      <drag-ui-row :drag="drag" :resize="resize" :layout="layout" :edit="edit" @layout="(val)=>{update(val)}" />
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
      edit: false,
      drag: false,
      resize: false,
      name: 'home',
      api: {
        get: 'GET://system/config/plane',
        put: 'PUT://system/config/plane'
      }
    }
  },
  created() {
    this.loadLayout()
  },
  methods: {
    update(val) {
      console.log('layout', val)
      this.layout = val
    },
    saveLayout() {
      const data = {}
      data[this.name] = { 'layout': this.layout }
      this.$api(this.api.put, data).then(() => {
        this.$message({
          message: '保存成功',
          type: 'success'
        })
      })

      // localStorage.setItem('layout-' + name, JSON.stringify(data))
    },
    loadLayout() {
      this.$api(this.api.get + '/' + this.name).then((data) => {
        const json = data.data.layout

        if (json.length > 0) {
          this.layout = json
        } else {
          this.layout = [{
            'x': 0,
            'y': 0,
            'w': 24,
            'h': 24,
            'i': 1,
            'layout': []
          }]
        }
      })
    }

  }
}
</script>

<style scoped>
  .vue-grid-item {
    background: #f5f6e6;
  }
</style>
