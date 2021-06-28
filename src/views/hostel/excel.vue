<template>
  <div style="height: 500px">

    <div v-if="loading" v-loading="loading" style="z-index:9999999999;width: 100%;height: 100%;position: absolute;background: rgba(255,255,255,0.5)" />
    <OnlineExcel v-if="celldata" :cell-data="celldata" :cell-title="cellTitle" title="宿舍安排" :sub-title="subTitle" @save="saveExcel" />
  </div>
</template>

<script>
import OnlineExcel from '@/components/Excel/index'

export default {
  name: 'Excel',
  components: { OnlineExcel },
  data() {
    return {
      loading: false,
      layout: [],
      cellTitle:
        // 公寓	寝室号	床号	姓名	学号	民族	政治面貌	学院	专业	行政班	年级	学制	层次	备注	性别	核费标准
        [
          {
            'r': 0, // 行
            'c': 0, // 列
            'v': '公寓'
          },
          {
            'r': 0, // 行
            'c': 1, // 列
            'v': '寝室号'
          }, {
            'r': 0, // 行
            'c': 2, // 列
            'v': '床号'
          }, {
            'r': 0, // 行
            'c': 3, // 列
            'v': '姓名'
          }, {
            'r': 0, // 行
            'c': 4, // 列
            'v': '学号'
          }, {
            'r': 0, // 行
            'c': 5, // 列
            'v': '民族'
          }, {
            'r': 0, // 行
            'c': 6, // 列
            'v': '政治面貌'
          }, {
            'r': 0, // 行
            'c': 7, // 列
            'v': '学院'
          }, {
            'r': 0, // 行
            'c': 8, // 列
            'v': '专业'
          }, {
            'r': 0, // 行
            'c': 9, // 列
            'v': '行政班'
          }, {
            'r': 0, // 行
            'c': 10, // 列
            'v': '学制'
          }, {
            'r': 0, // 行
            'c': 11, // 列
            'v': '层次'
          }, {
            'r': 0, // 行
            'c': 12, // 列
            'v': '备注'
          }, {
            'r': 0, // 行
            'c': 13, // 列
            'v': '性别'
          },
          {
            'r': 0, // 行
            'c': 14, // 列
            'v': '核费标准'
          }
        ],
      celldata: false
    }
  },
  created() {
    this.loading = true;
    this.$http.get('/log/excel?pageSize=1&type=live').then((data) => {
      this.loading = false
      console.log('json', data.data[0].json)
      this.celldata = data.data[0].json
      this.subTitle = '最后编辑人:' + data.data[0].admin.name + ' 编辑时间:' + data.data[0].created_at
    })
  },

  methods: {
    saveExcel(data) {
      this.loading = true
      this.$http.post('/log/excel', { 'json': data, 'action': 'live' }).then((res) => {
        const rep = res.data
        this.loading = false
        this.$message({
          message: '保存成功',
          type: 'success'
        })
        console.log(rep)
      })
    }
  },
  beforeRouteLeave(to, from, next) {
    // 判断数据是否修改，如果修改按这个执行，没修改，则直接执行离开此页面
    // 弹窗显示
    this.$confirm('是否离开页面?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      next()
    }).catch(() => {
    })
  }
}
</script>

<style>
/*#luckysheet_info_detail{display: none !important;}*/
</style>
