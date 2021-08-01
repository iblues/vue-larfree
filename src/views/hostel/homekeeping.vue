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
      celldata: false
    }
  },
  created() {
    this.loading = true
    this.$http.get('/log/excel?pageSize=1&action=houseKeeping').then((data) => {
      this.loading = false
      this.cellJsonData = data.data[0].json
      this.celldata = this.jsonToExcel(data.data[0].json)
      console.log('getJson', this.celldata)
      this.subTitle = '最后编辑人:' + data.data[0].admin.name + ' 编辑时间:' + data.data[0].created_at
    })
  },
  methods: {
    saveExcel(data) {
      this.loading = true
      data = this.excelToJson(data)
      this.$http.post('/log/excel', { 'json': data, 'action': 'houseKeeping' }).then((res) => {
        const rep = res.data
        this.loading = false
        this.$message({
          message: '保存成功',
          type: 'success'
        })
        console.log(rep)
      })
    },
    excelToJson(data) {
      const json = []
      for (const num in data) {
        // 跳过第一行
        if (num === 0) {
          continue
        }
        const row = data[num]
        const rows = []
        for (let i = 0; i < 16; i++) {
          const v = row[i] ? row[i].v : ''
          rows[i] = { 'v': v }
        }
        json.push(rows)
      }
      console.log('toJson', json)
      return json
    },
    // 把标准json转为excel可以识别的
    jsonToExcel(json) {
      const excel = []
      for (const number in json) {
        const row = json[number]
        for (const rowKey in row) {
          const cell = {
            'r': number, // 行
            'c': rowKey, // 列
            'v': row[rowKey] ? row[rowKey].v : ''
          }
          excel.push(cell)
        }
      }
      console.log('jsonToExcel', excel)
      return excel
    }
  }
}
</script>

<style>
  /*#luckysheet_info_detail{display: none !important;}*/
</style>
