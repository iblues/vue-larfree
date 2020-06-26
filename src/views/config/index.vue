<template>

  <div class="app-container">
    <ui-plane>
      <h2>配置管理中心</h2>
      <el-input
        style="max-width: 350px"
        placeholder="请输入内容"
      >
        <i slot="prefix" class="el-input__icon el-icon-search" />
        <el-button slot="append" icon="el-icon-search">搜索</el-button>
      </el-input>

      <el-row :gutter="20">

        <el-col v-for="k in 6" :key="k" :xs="24" :sm="12" :md="8" :lg="6" >
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>卡片名称</span>
              <el-button style="float: right; padding: 3px 0" type="text">编辑</el-button>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
              {{ '列表内容 ' + o }}
            </div>
          </el-card>
        </el-col>

      </el-row>
    </ui-plane>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style scoped>
 .box-card{
   margin-top: 10px;
   height: 250px;
   overflow-y: auto;
 }
</style>
