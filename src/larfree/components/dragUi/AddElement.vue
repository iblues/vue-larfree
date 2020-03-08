<template>
  <span>
    <span class="add-button" @click.stop="openSelect">+</span>
    <el-dialog append-to-body title="选择要添加的元素" :visible.sync="dialogVisible">
      <template v-for="(component,key) in componentList">
        <el-button :key="key" @click.stop="addElement(component,key)">{{ component.name }}</el-button>
      </template>
    </el-dialog>
  </span>
</template>

<script>
export default {
  name: 'DragUiAddElement',
  props: {
    componentList: {
      type: Object,
      default: function() {
        return []
      }
    }
  },
  data: function() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    openSelect() {
      this.dialogVisible = true
    },
    addElement(component, type) {
      this.$emit('addElement', { 'type': type, 'position': -1 })
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped>
  .add-button{
    cursor: pointer;
    position: relative;
    width: 20px;
    height: 20px;
    text-align: center;
  }
</style>
