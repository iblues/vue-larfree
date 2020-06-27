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

        <el-col v-for="config in configList" :key="config.key" :xs="24" :sm="12" :md="8" :lg="6">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>{{ config.title || '缺失标题' }}</span>
              <router-link :to="`/dialog/edit/system.config/`+config.key+'/'+config.key">
                <el-button style="float: right; padding: 3px 0" type="text">编辑</el-button>
              </router-link>
            </div>
            <div class="box-content">
              <div v-for="(field,key) in config.detail" :key="key" class="text item">
                {{ field.name }}  <span class="right_item">{{ field.value }}</span>
              </div>
            </div>

          </el-card>
        </el-col>

      </el-row>
    </ui-plane>
    <lar-dialog></lar-dialog>
  </div>
</template>

<script>
import LarDialog from "@/larfree/components/dialog"
export default {
  components: {LarDialog},
  data() {
    return {
      configList: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.$http.get('/system/config').then((res) => {
        console.log(res)
        this.configList = res.data
      })
    }
  }
}
</script>

<style scoped>
  .box-card {
    margin-top: 10px;
  }
 .box-card .box-content{
   height: 150px;
   overflow-y: auto;
 }
  .item{
    margin-top: 10px;
  }
  .right_item{
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    float: right;
    width: 100px;
  }
</style>
