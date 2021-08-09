<template>
  <div style="height: 500px">

    <div
      v-if="loading"
      v-loading="loading"
      style="z-index:9999999999;width: 100%;height: 100%;position: absolute;background: rgba(255,255,255,0.5)"
    />
    <OnlineExcel
      v-if="celldata"
      :cell-data="celldata"
      :cell-title="cellTitle"
      title="宿舍安排"
      :sub-title="subTitle"
      @save="goSave"
    />

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>输入变更备注</span><br><br>
      <el-input v-model="comment" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false;saveExcel()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import OnlineExcel from '@/components/Excel/index'
import { Message } from 'element-ui'

export default {
  name: 'Excel',
  components: { OnlineExcel },
  data() {
    return {
      loading: false,
      layout: [],
      cellJsonData: {},
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
              'v': '年级'
            }, {
              'r': 0, // 行
              'c': 11, // 列
              'v': '学制'
            }, {
              'r': 0, // 行
              'c': 12, // 列
              'v': '层次'
            }, {
              'r': 0, // 行
              'c': 13, // 列
              'v': '备注'
            }, {
              'r': 0, // 行
              'c': 14, // 列
              'v': '性别'
            },
            {
              'r': 0, // 行
              'c': 15, // 列
              'v': '核费标准'
            }
          ],
      celldata: false,
      dialogVisible: false,
      comment: '',
      tmpData: ''
    }
  },
  created() {
    this.loading = true
    this.$http.get('/log/excel?pageSize=1&action=live').then((data) => {
      this.loading = false
      this.cellJsonData = data.data[0].json
      this.celldata = this.jsonToExcel(data.data[0].json)
      // console.log('getJson', this.celldata)
      this.subTitle = '最后编辑人:' + data.data[0].admin.name + ' 编辑时间:' + data.data[0].created_at
    })
  },

  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          console.log('确定保存')
          this.saveExcel()
          done()
        })
        .catch(_ => {})
    },
    goSave(data) {
      this.dialogVisible = true
      this.tmpData = data
    },

    saveExcel() {
      let data = this.tmpData
      this.loading = true
      data = this.excelToJson(data)
      const changeJson = this.diff(this.cellJsonData, data)
      this.$http.post('/log/excel', { 'json': data, 'change_json': changeJson, 'action': 'live' }).then((res) => {
        this.$message({
          message: '保存成功',
          type: 'success'
        })

        this.cellJsonData = data
        this.celldata = this.jsonToExcel(data)
        this.loading = false
      }).catch((error) => {
        this.loading = false
        // Message({
        //   showClose: true,
        //   message: error.response.data.msg || '网络错误',
        //   type: 'error'
        // })
      })
    },

    diff(oldData, newData) {
      const tmpNewData = {}
      const diff = {}
      for (const number in newData) {
        if (number === 0) {
          continue
        }
        tmpNewData[newData[number][0].v + '=' + newData[number][1].v + '=' + newData[number][2].v] = newData[number]
      }
      // console.log('tmpNewData', tmpNewData)
      for (const oldNumber in oldData) {
        const row = oldData[oldNumber]
        const room = row[0].v + '=' + row[1].v + '=' + row[2].v
        const newRow = tmpNewData[room]
        if (!newRow) {
          console.log('diff,未找到', room)
        }
        // 说明被删除了
        if (!newRow[4]) {
          diff[room] = newRow
        } else {
          if (newRow[4].v !== row[4].v) {
            diff[room] = newRow
          }
        }
      }
      console.log('diff', diff)
      return diff
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
