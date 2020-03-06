<template>
  <span>
    <span class="add-button" @click.stop="openSelect">+</span>
    <el-dialog append-to-body title="选择要添加的元素" :visible.sync="dialogVisible">
      <el-button @click.stop="addElement('drag-ui-row')">增加布局元素</el-button>
      <el-button @click.stop="addElement('lar-list')">增加编辑列表(lar-list)</el-button>
      <el-button @click.stop="addElement('lar-chart-simple-line')">简单统计(lar-chart)</el-button>
      <el-button @click.stop="addElement('lar-chart-line')">复杂统计(lar-chart)</el-button>
      <el-button @click.stop="addElement('ui-plane')">增加面板(ui-plane)</el-button>
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
