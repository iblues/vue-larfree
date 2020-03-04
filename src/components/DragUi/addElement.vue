<template>
  <span>
    <el-button @click="openSelect">增加元素</el-button>
    <el-dialog title="选择要添加的元素" :visible.sync="dialogVisible">
      <el-button @click="addElement('grid')">增加布局元素</el-button>
    </el-dialog>
  </span>
</template>

<script>
export default {
  name: 'DragUiAddElement',
  data: function() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    openSelect() {
      this.dialogVisible = true
    },
    addElement(type) {
      this.$emit('addElement', { 'type': type, 'position': -1 })
    }
  }
}
</script>

<style scoped>

</style>
