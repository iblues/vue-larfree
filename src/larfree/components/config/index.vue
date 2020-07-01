<template>

  <div class="app-container">
    <ui-plane>
      <h2>配置管理中心</h2>
      <el-input
        v-model="search"
        style="max-width: 350px"
        placeholder="请输入内容"
      >
        <i slot="prefix" class="el-input__icon el-icon-search" />
        <el-button slot="append" icon="el-icon-search">搜索</el-button>
      </el-input>
      <el-button icon="el-icon-refresh" @click="getList">刷新</el-button>

      <el-row v-loading="loading" :gutter="20">

        <el-col v-for="config in configs" :key="config.key" :xs="24" :sm="12" :md="8" :lg="6">
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
    <lar-dialog />
  </div>
</template>

<script>
import LarDialog from '@/larfree/components/dialog'
import { mapGetters } from 'vuex'
export default {
  name: 'LarfreeConfig',
  components: { LarDialog },
  data() {
    return {
      configList: [],
      loading: false,
      search: ''
    }
  },
  created() {
    this.getList()
  },
  computed: {
    ...mapGetters({
      getPipe: 'larfree/getPipe',
      getRefreshEvents: 'larfree/getRefreshEvents'
    }),
    // 搜索过滤
    configs() {
      if (!this.search) {
        console.log('没有搜索', this.configList)
        return this.configList
      }
      const configs = []
      this.configList.forEach((data) => {
        const searchDetail = {}
        for (const detailKey in data.detail) {
          // 有搜索到结果
          if (data.detail[detailKey].name.indexOf(this.search) > -1) {
            searchDetail[detailKey] = data.detail[detailKey]
          }
        }

        // 不为空
        if ((JSON.stringify(searchDetail) !== '{}')) {
          const cloneObj = JSON.parse(JSON.stringify(data))// clone
          cloneObj.detail = searchDetail
          configs.push(cloneObj)
        }
      })
      return configs
    },
    dataRefreshEvents() {
      return this.getRefreshEvents('system.config')
    }
  },
  watch: {
    dataRefreshEvents: function() {
      this.getList()
    }
  },
  methods: {
    getList() {
      this.loading = true
      this.$http.get('/system/config').then((res) => {
        console.log(res)
        this.configList = res.data
        this.loading = false
      }).catch(() => {
        this.loading = false
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
