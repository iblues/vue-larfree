<template>
  <span>
    <grid-layout
      v-if="layout.length>0"
      :class="edit||'plane'"
      :layout.sync="layout"
      :col-num="24"
      :row-height="5"
      :is-draggable="edit"
      :is-resizable="edit"
      :is-mirrored="false"
      :vertical-compact="true"
      :margin="margin"
      :responsive="responsive"
      :use-css-transforms="true"
    >
      <grid-item
        v-for="(item,key) in layout"
        :key="key"
        :class="edit||'plane'"
        :x="item.x"
        :y="item.y"
        :w="item.w||1"
        :h="item.h||1"
        :i="item.i"
      >
        <div>
          <span class="action-row">
            <drag-ui-add-element v-if="edit" @addElement="val=>addElement(item,key,val)" />
            <span v-if="edit" class="del" @click="delElement(item.i)">x</span>
          </span>

          <!--内嵌元素-->
          <template v-if="scopeElemet(item.type)">
            <component
              :is="item.type"
              :_ui-param="item.component_param"
              :_action="edit?'setting':'running'"
              @submit="val=>saveSetting(item,key,val)"
            >
              <drag-ui-row class="ui-plane" :layout="item.layout" :edit="edit" @layout="val =>updateLayout(val,key)" />
            </component>
          </template>

          <template v-else>
            <!--              卡片元素-->
<!--            {{item.type}}-->
            <drag-ui-row :layout="item.layout" :edit="edit" @layout="val =>updateLayout(val,key)" />
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

export default {
  name: 'DragUiRow',
  components: {
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
    }
  },
  data() {
    return {
      tmpLayout: [],
      responsive: false
    }
  },

  computed: {
    margin() {
      if (this.edit) {
        return [10, 10]
      } else {
        return [0, 0]
      }
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
      this.layout[key].layout.push(grid)
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
        'y': 999,
        'w': 24,
        'h': 4,
        'i': Math.round(Math.random() * 100000000),
        'layout': [],
        'type': type
      }
    },
    /**
     *  判断是不是布局元素
     **/
    scopeElemet(type) {
      const element = ['ui-plane']
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

<style scoped>
  .vue-grid-item {
    border: #cccccc dashed 1px;
    overflow: auto;

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
    position: relative;
  }
  .vue-grid-layout.plane{
    /*height: 0 !important;*/
  }

  .plane {
    border-color: rgba(0,0,0,0);
    padding: 0;
    overflow-x: hidden;
    /*height: auto !important;*/
  }
</style>
