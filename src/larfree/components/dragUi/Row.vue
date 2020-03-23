<template>
  <span class="drag-ui">
    <grid-layout
      v-if="layout.length>0"
      :class="drag || resize ||'plane'"
      :layout.sync="layout"
      :col-num="24"
      :row-height="4"
      :is-draggable="drag"
      :is-resizable="resize"
      :is-mirrored="false"
      :vertical-compact="true"
      :margin="margin"
      :responsive="responsive"
      :use-css-transforms="true"
    >
      <!--
     -->
      <grid-item
        v-for="(item,key) in layout"
        :key="key"
        :class="drag|| resize || 'plane'"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
      >
        <div>
          <span class="action-row">
            <drag-ui-add-element v-if="drag || resize" class="add-button" :component-list="componentList" @addElement="val=>addElement(item,key,val)" />
            <span v-if="drag || resize " class="del" @click="delElement(item.i)"><i class="el-icon-close" /></span>
          </span>

          <!--内嵌元素-->
          <template v-if="scopeElemet(item.type)">
            <component
              :is="item.type"
              :_ui-param="item.component_param"
              :_action="edit?'setting':'running'"
              @submit="val=>saveSetting(item,key,val)"
            >
              <drag-ui-row class="ui-plane" :layout="item.layout" :edit="edit" :drag="drag" :resize="resize" @layout="val =>updateLayout(val,key)" />
            </component>
          </template>

          <template v-else>
            <!--              卡片元素-->
            <!--            {{item.type}}-->
            <drag-ui-row :layout="item.layout" :edit="edit" :drag="drag" :resize="resize" @layout="val =>updateLayout(val,key)" />
            <component
              :is="item.type"
              :_ui-param="item.component_param"
              :_action="edit?'setting':'running'"
              @submit="val=>saveSetting(item,key,val)"
            />
          </template>

        </div>

      </grid-item>

    </grid-layout>

  </span>
</template>

<script>
import VueGridLayout from 'vue-grid-layout'
import DragUiAddElement from './AddElement'
import LarList from '@/larfree/components/curd/list'
import './AutoRegister'
import DragUiElementIframe from '@/larfree/components/dragUi/element/iframe'
export default {
  name: 'DragUiRow',
  components: {
    DragUiElementIframe,
    LarList,
    DragUiAddElement,
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem
  },
  props: {
    layout: {
      type: Array,
      default: function() {
        return []
      }
    },
    edit: {
      type: Boolean,
      default: false
    },
    drag: {
      type: Boolean,
      default: false
    },
    resize: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tmpLayout: [],
      responsive: false,
      componentList: {
        'drag-ui-element-lar-list': { 'name': '列表元素(LarList)' },
        'drag-ui-element-row': { 'name': '布局元素(Row)' },
        'drag-ui-element-ui-plane': { 'name': 'UI面板(UiPlane)' },
        'drag-ui-element-component': { 'name': '自定义组件' },
        'drag-ui-element-iframe': { 'name': 'iframe' }
      }
    }
  },

  computed: {
    margin() {
      return [10, 10]
      // if (this.edit || this.drag) {
      //   return [10, 10]
      // } else {
      //   return [0, 0]
      // }
    }
  },
  watch: {
    layout: {
      handler(layout) {
        this.tmpLayout = layout
      },
      deep: true
    },
    tmpLayout: {
      handler(layout) {
        this.$emit('layout', layout)
      },
      deep: true
    }
  },
  methods: {
    updateLayout(data, key) {
      this.layout[key].layout = data
    },
    addElement(item, key, data) {
      const grid = this.createGrid(data.type, data.position)
      console.log('push', this.layout[key])
      this.tmpLayout[key].layout.push(grid)
    },

    /**
       * 创建元素
       * @returns {{w: number, x: number, h: number, y: number, i: *}}
       */
    createGrid(type, y) {
      if (y === -1) {
        y = 9999
      } else if (y === 0) {
        y = 0
      }
      return {
        'x': 0,
        'y': y,
        'w': 24,
        'h': 8,
        'i': Math.round(Math.random() * 100000000),
        'layout': [],
        'type': type
      }
    },
    /**
     *  判断是不是布局元素
     **/
    scopeElemet(type) {
      const element = ['drag-ui-element-ui-plane']
      return element.includes(type)
    },

    /**
       * 删除元素
       * @param key
       */
    delElement(key) {
      this.$confirm('是否删除元素?', '删除元素', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tmpLayout = this.tmpLayout.filter((val) => {
          return val.i !== key
        })
      }).catch(() => {

      })
    },

    /**
       * 保存卡片中设置的内容
       * @param item
       * @param key
       * @param settingData
       */
    saveSetting(item, key, settingData) {
      console.log('settingData', settingData)
      this.tmpLayout[key]['component_param'] = settingData
    }
  }
}
</script>

<style>
  .drag-ui .vue-grid-item>div{
    height: 100% !important;
  }
</style>
<style scoped>
  .vue-grid-item {
    border: #cccccc dashed 1px;
    overflow: auto;
    padding-bottom: 3px;

  }

  .vue-grid-item .action-row {
    float: right;
  }

  .vue-grid-item .action-row .del {
    display: inline-block;
    width: 20px;
    text-align: center;
    cursor: pointer;
    z-index: 9999;
    position:absolute;
    right: 0;
    top: 0;
  }
  .vue-grid-layout.plane{
    /*height: 0 !important;*/
  }
  .vue-grid-layout{
    /*padding: 0 !important;*/
    height: 100% !important;
  }
  .plane {
    border-color: rgba(0,0,0,0);
  }
  .add-button{
    position: absolute;
    z-index: 99999;
    right: 20px;
  }
</style>
