<template>
  <div>

    <OnlineExcel v-if="celldata" v-loading="loading" :cell-data="celldata" :cell-title="cellTitle" @save="saveExcel" />
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
            'v': '周'
          },
          {
            'r': 0, // 行
            'c': 1, // 列
            'v': '楼栋'
          }, {
            'r': 0, // 行
            'c': 2, // 列
            'v': '房号'
          }, {
            'r': 0, // 行
            'c': 3, // 列
            'v': '专业'
          }, {
            'r': 0, // 行
            'c': 4, // 列
            'v': '年级'
          }, {
            'r': 0, // 行
            'c': 5, // 列
            'v': '性别'
          }, {
            'r': 0, // 行
            'c': 6, // 列
            'v': '分数'
          }
        ],
      celldata: [
        {
          'r': 1, // 行
          'c': 0, // 列
          'v': '公寓'
        }
      ]
    }
  },
  created() {
    // this.$http.get('/log/excel?pageSize=1&type=houseKeeping').then((data) => {
    //   this.loading = false
    //   // this.celldata = data.data[0].json;
    // })
  },
  methods: {
    saveExcel(data) {
      this.loading = true
      this.$http.post('/log/excel', { 'json': data, 'action': 'houseKeeping' }).then((res) => {
        const rep = res.data
        this.loading = false
        this.$message({
          message: '保存成功',
          type: 'success'
        })
        console.log(rep)
      })
    }
  }
}
</script>

<style>
/*#luckysheet_info_detail{display: none !important;}*/
</style>
