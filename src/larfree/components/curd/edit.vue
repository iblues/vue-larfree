<template>
  <span class="lar-form">

    <!--表格控件-->
    <div>
      <lar-form v-loading="loading" :model="model" :schemas="schemas" :data="tableData" :api="api" :btn="btns" :show-search="true" />
    </div>

  </span>
</template>

<script>
import { larSchemas, larData } from '@/api/larfree-curd'
import { mapGetters } from 'vuex'
/**
 * 整合表格,搜索,翻页组件
 * @author Blues
 */
export default {
  name: 'LarEdit',
  props: {
    model: {
      type: String,
      default: 'common.user'
    },
    action: {
      type: String,
      default: 'base.table'
    },
    pageSize: {
      type: Number,
      default: 10
    },
    params: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      isShowCheck: true,
      isShowDrop: true,
      title: '',

      api: '',
      apiQuery: {}, // ?默认的查询参数
      loading: true,
      tableData: [],

      btns: {},
      schemas: {},
      data: {},
      pageInfo: {
        per_page: 10,
        total: 0,
        current_page: 1
      }
    }
  },
  computed: {
    ...mapGetters({
      getPipe: 'larfree/getPipe',
      getRefreshEvents: 'larfree/getRefreshEvents'
    }),
    /**
     * 关键属性,用于判断是否需要刷新请求
     * @author Blues
     **/
    fullApi: function() {
      console.log(this.pipeName, 'pipe')
      if (!this.api) { return '' }
      // 读取额外查询查询
      let query = this.apiQuery
      // 分页
      query['pageSize'] = this.pageInfo.per_page * 1
      query['page'] = this.pageInfo.current_page
      query = Object.assign(query, this.searchQuery)
      if (this.params) {
        query = Object.assign(query, this.params)
      }
      return this.$larfree.httpQuery(query, this.api)
    },

    dataRefreshEvents() {
      return this.getRefreshEvents(this.model)
    },
    dataRefreshDialog() {
      return this.$store.state.larfree.num
    },

    /**
     * 管道名,用于通过vuex进行管道通信
     * @author Blues
     **/
    pipeName() {
      return this.schemas.pipeName ? this.schemas.pipeName : this.model + '.table'
    },

    // 读取vuex的搜索参数进行搜索,  注意pipeName
    searchQuery() {
      // this.zeroing = true
      const data = this.getPipe(this.pipeName)
      console.log(data)
      console.log(this.$larfree.getSearchQuery(data), 'searchQuery')
      return this.$larfree.getSearchQuery(data)
    }
    // searchSchemas: function() {
    //   if (!this.schemas) { return [] }
    //   return this.schemas['search']
    // },
    // advSchemas: function() {
    //   if (!this.schemas || !this.schemas['adv_search']) { return [] }
    //   return this.schemas['adv_search']
    // }
  },
  watch: {
    model: function() {
      // 清理旧数据
      this.apiQuery = {}
      this.getSchemas()
    },
    dataRefreshEvents: function() {
      this.loading = true
      this.getData()
    },
    dataRefreshDialog: function() {
      this.loading = true
      this.getData()
    },
    // 如果api变化就请求数据
    fullApi: function() {
      this.loading = true
      this.getData()
    }
  },
  created() {
    this.getSchemas(this.model, this.action)
  },
  methods: {
    /**
     * 从larfree系统获取当前列表的配置细信息
     * @author Blues
     * @param model 模块名 如common.user
     * @param module 场景单元 如base.table.register
     */
    getSchemas(model, module) {
      if (!model) { return '' }
      this.loading = true
      larSchemas(model, module)
        .then((response) => {
          this.loading = false
          this.schemas = response.data
          // 确定请求api
          this.api = response.data.config.api
          this.btns = response.data.config.button
          console.log(this.Schemas)
          this.tableData = []
        })
        .catch((error) => {
          this.loading = false
          this.$message.error('Table模块请求错误')
          console.log(error)
        })
    },

    /**
     * 根据fullApi属性, 获取列表数据
     * @author Blues
     * @returns {boolean}
     */
    getData() {
      this.loading = true
      // this.canQuickChange = false
      if (this.zeroing) {
        this.pageInfo.current_page = 1
      }
      console.log(this.fullApi, 'api')
      if (!this.fullApi) {
        return false
      }
      larData(this.fullApi)
        .then((response) => {
          this.loading = false
          this.tableData = response.data
          if (response.meta) { this.pageInfo = response.meta }

          // 让他全部加载完了才能开始
          // setTimeout(() => {
          //   this.canQuickChange = true
          // }, 300)
          this.zeroing = false
        })
        .catch((error) => {
          console.log('table.vue', error)
          this.$message.error('Table模块请求数据错误')
        })
    },

    /**
     * 设置每页大小
     * @author blues
     * @param val
     */
    handleSizeChange(val) {
      this.pageInfo.per_page = val
    },

    /**
     * 设置当前页数
     * @author Blues
     * @param val
     */
    handleCurrentChange(val) {
      this.zeroing = false
      this.pageInfo.current_page = val
    }

  }
}
</script>

<style>
  @media (max-width: 380px) {
    .search_box .divide{
      display: none;
    }
  }

  .search_box .divide{
    margin:0 10px;
  }
  .search_box .el-button{
    margin-bottom: 2px !important;
  }
  .el-table th.is-leaf, .el-table td{
    border-color: rgba(240,240,245,.5)
  }
</style>
