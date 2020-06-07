<template>
  <span class="lar-list">
      <!--顶部功能区域-->
      <div class="filter-container">
        <!--搜索的结果 是通过vuex直接传递给lar-table的 然后也会 提交事件上报-->
        <lar-search :model="model" :schemas="schemas['search']" :adv-schemas="schemas['advSearch']">
          <!--定制按钮区域-->
          <template v-slot:btn>
            <span class="divide">|</span>
            <el-button plain icon="el-icon-refresh" size="medium" type="primary" @click="search()">刷新</el-button>
            <!--<el-button icon="el-icon-upload2" size="medium" @click="search()">导出当页</el-button>-->
            <el-button v-for="btn in btns" :key="btn.html" type="primary" :icon="btn.icon" @click="handelButton(btn)">
              {{ btn.html }}
            </el-button>

          </template>

        </lar-search>
      </div>

      <!--表格控件-->
      <div>
        <lar-table
          v-loading="loading"
          :model="model"
          :schemas="schemas"
          :data="tableData"
          :api="api"
          :btn="btns"
          :show-search="true"
          @changeSort="changeSort"
          @change="getData"
        />
      </div>

      <!--底部控件-->
      <div class="block" style="text-align: right;padding-bottom: 20px;margin-top: 20px">
        <span style="float: left">
          <el-dropdown :hide-on-click="false">
            <el-button size="mini" class="el-dropdown-link">
              显示<i class="el-icon-arrow-down el-icon--right" />
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="field in schemas['fields']" :key="field.key"> <el-checkbox v-model="field['show']">{{ field.name }}</el-checkbox></el-dropdown-item>
            <!--<el-dropdown-item disabled> <el-checkbox v-model="checked">备选项</el-checkbox>双皮奶</el-dropdown-item>-->
            <!--<el-dropdown-item divided> <el-checkbox v-model="checked">备选项</el-checkbox>蚵仔煎</el-dropdown-item>-->
            </el-dropdown-menu>
          </el-dropdown>
        </span>

        <el-pagination
          background
          :current-page="pageInfo.current_page"
          :page-sizes="[10, 20, 40, 60, 80, 100, 200]"
          :page-size="pageInfo.per_page"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageInfo.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
      <lar-dialog />
  </span>
</template>

<script>
import { larSchemas } from '@/api/larfree-curd'
import larSearch from '@/larfree/components/curd/search'
import larDialog from '@/larfree/components/dialog'
import { mapGetters } from 'vuex'

import Vue from 'vue'

/**
   * 整合表格,搜索,翻页组件
   * @author Blues
   */
export default {
  name: 'LarList',
  components: { larSearch, larDialog },
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
      if (!this.api) {
        return ''
      }
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
      if (!model) {
        return ''
      }
      this.loading = true
      larSchemas(model, module)
        .then((response) => {
          this.loading = false
          this.schemas = response.data
          // 确定请求api
          this.api = response.data.config.api
          this.btns = response.data.config.button
          console.log('Schemas', this.Schemas)
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
      console.log('fullApi', this.fullApi)
      if (!this.fullApi) {
        return false
      }
      this.$api(this.fullApi)
        .then((response) => {
          this.loading = false
          this.tableData = response.data
          if (response.meta) {
            this.pageInfo = response.meta
          }

          // 让他全部加载完了才能开始
          // setTimeout(() => {
          //   this.canQuickChange = true
          // }, 300)
          this.zeroing = false
        })
        .catch((error) => {
          console.log('table.vue', error)
          this.loading=false;
          this.$message.error('Table模块请求数据错误')
        })
    },

    changeSort(sort) {
      Vue.set(this.apiQuery, '@sort', sort)
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
    },

    /**
       * 按钮组的捕捉
       * @param button
       */
    handelButton(button) {
      if (button.function) {
        this[button.function](button)
      } else if (button.url) {
        this.$router.push(button.url)
      }
    },

    /**
     * 导出excel文件
     * @param button
     */
    export(button) {
      this.$api(button.url, { 'responseType': 'blob' }).then((res) => {
        console.log(res)
        const blob = new Blob([res])
        const fileName = button.fileName || '导出明细.xlsx'
        // 通过 URL.createObjectURL(Blob对象), 可以把 Blob对象 转换成一个链接地址,该地址可以直接用在某些 DOM 的 src 或者 href 上
        const link = document.createElement('a') // 创建a标签
        link.href = window.URL.createObjectURL(blob) // 创建下载的链接
        link.download = fileName // 文件名
        link.click() // 点击下载
        window.URL.revokeObjectURL(link.href)
        // window.URL.revokeObjectUR()下载链接)释放blob对象
        link.remove() // 将a标签移除
      })
    },

    search() {
      this.getData()
    }

  }
}
</script>

<style>
    @media (max-width: 380px) {
        .search_box .divide {
            display: none;
        }
    }

    .search_box .divide {
        margin: 0 10px;
    }

    .search_box .el-button {
        margin-bottom: 2px !important;
    }

    .el-table th.is-leaf, .el-table td {
        border-color: rgba(240, 240, 245, .5)
    }
</style>
