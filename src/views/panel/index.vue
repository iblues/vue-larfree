<template>
  <span>
    <grid-layout
      :layout.sync="layout"
      :col-num="12"
      :row-height="30"
      :is-draggable="true"
      :is-resizable="true"
      :is-mirrored="false"
      :vertical-compact="true"
      :margin="[10, 10]"
      :use-css-transforms="true"
    >

      <grid-item
        v-for="item in layout"
        :key="item.i"
        :x="item.x"
        :y="item.y"

        :w="item.w||1"
        :h="item.h||1"
        :i="item.i"
      >
        <ui-plane>
          <span @click="delElement(item.i)">删除</span>
          <lar-list v-if="item.i==100" model="user.admin" />
        </ui-plane>
      </grid-item>

    </grid-layout>

    <drag-ui-add-element @addElement="addElement" />

  </span>
</template>

<script>
import VueGridLayout from 'vue-grid-layout'
import LarList from '@/larfree/components/curd/list'
import UiPlane from '@/components/Ui/Plane'
import DragUiAddElement from '@/components/DragUi/addElement'
export default {
  name: 'Index',
  components: {
    DragUiAddElement,
    UiPlane,
    LarList,
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem
  },
  data() {
    return {
      layout: [
        { 'x': 0, 'y': 0, 'w': 2, 'h': 2, 'i': '0' },
        { 'x': 0, 'y': 0, 'w': 2, 'h': 2, 'i': '1' }
      ]

    }
  },
  watch: {
    layout: {
      handler(val) {
        this.saveLayout('test', val)
      },
      deep: true
    }
  },
  created() {
    this.layout = this.loadLayout('test') || this.layout
  },
  methods: {
    saveLayout(name, data) {
      console.log(data)
      localStorage.setItem('layout-' + name, JSON.stringify(data))
    },
    loadLayout(name) {
      const json = localStorage.getItem('layout-' + name)
      if (json) {
        return JSON.parse(json)
      } else {
        return false
      }
    },
    addElement(data) {
      const grid = this.createGrid(data.type)
      // 向末尾插入一个
      if (data.position === -1) {
        this.layout.push(grid)
      }
    },

    createGrid() {
      return { 'x': 0, 'y': 0, 'w': 2, 'h': 6, 'i': int(Math.random() * 100000000) }
    },

    delElement(key) {
      this.layout = this.layout.filter((val) => {
        return val.i !== key
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
