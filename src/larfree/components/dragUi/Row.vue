<template>
  <span>

    <grid-layout
      :class="edit||'plane'"
      :layout.sync="layout"
      :col-num="12"
      :row-height="30"
      :is-draggable="edit"
      :is-resizable="edit"
      :is-mirrored="false"
      :vertical-compact="true"
      :margin="[10, 10]"
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
            <span v-if="edit" class="del" @click="delElement(item.i)">x</span>
          </span>
          <drag-ui-row :layout="item.layout" :edit="edit" @layout="val =>updateLayout(val,key)" />

          <template v-if="edit">
            <span style="margin-left: 20px">{{ item.type }}</span>
          </template>
          <template v-else>
          </template>
        </div>

      </grid-item>

    </grid-layout>

    <drag-ui-add-element v-if="edit" @addElement="addElement" />

  </span>
</template>

<script>
import VueGridLayout from 'vue-grid-layout'
import DragUiAddElement from './AddElement'

export default {
  name: 'DragUiRow',
  components: {
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
    addElement(data) {
      const grid = this.createGrid(data.type, data.position)
      this.layout.push(grid)
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
        'w': 2,
        'h': 6,
        'i': Math.round(Math.random() * 100000000),
        'layout': [],
        'type': type
      }
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
    }
  }
}
</script>

<style scoped>
  .vue-grid-item {
    border: #cccccc dashed 1px;
    overflow-x: auto;
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
  .plane{
    /*height: auto !important;*/
  }
</style>
