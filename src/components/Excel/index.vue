<template>
  <div>

    <h2 style="margin-top: 10px;line-height: 150%;text-align: left;">
      <span style="margin-left: 250px">{{ title }}</span>
      <span style="float:right;margin-right:20px;font-size: 12px">{{ subTitle }}</span>

      <el-button style="float:left;margin-left: 20px;" type="primary" @click="goSave">保存文档</el-button>
      <el-button style="float:left;margin-left: 20px;" @click="exportExcel">导出文档</el-button>
    </h2>
    <div
      id="luckysheet"
      style="margin:0px;padding:0px;position:absolute;width:100%;left: 0px;top: 100px;bottom:0px;"
    />

  </div>
</template>

<script>
// {
//   "ct": { //单元格值格式
//   "fa": "General",  //格式名称为自动格式
//     "t": "n" //格式类型为数字类型
// },
//   "v": 233, //内容的原始值为 233
//   "m": 233, //内容的显示值为 233
//   "bg": "#f6b26b", //背景为 "#f6b26b"
//   "ff": 1, // 字体为 "Arial"
//   "fc": "#990000", //字体颜色为 "#990000"
//   "bl": 1, //字体加粗
//   "it": 1, //字体斜体
//   "fs": 9, //字体大小为 9px
//   "cl": 1, //启用删除线
//   "ht": 0, //水平居中
//   "vt": 0, //垂直居中
//   "tr": 2, //文字旋转 -45°
//   "tb": 2, //文本自动换行
//   "ps": { //批注
//   "left": 92, //批注框左边距
//     "top": 10, //批注框上边距
//     "width": 91, //批注框宽度
//     "height": 48, //批注框高度
//     "value": "I am a comment", //批准内容
//     "isshow": true //批注框为显示状态
// },
//   "f": "=SUM(233)" //单元格是一个求和公式
// }

import LuckyExcel from 'luckyexcel'

export default {
  name: 'OnlineExcel',
  props: {
    msg: String,
    cellData: Array,
    cellTitle: Array,
    title: String,
    subTitle: String
  },
  data() {
    return {
      dialogVisible: false,
      selected: '',
      isMaskShow: false
    }
  },
  destroyed() {
    console.log('关闭excel')
    window.luckysheet.destroy()
  },
  mounted() {
    // In some cases, you need to use $nextTick
    // this.$nextTick(() => {
    // eslint-disable-next-line no-undef
    // const data = luckysheet.transToCellData(this.cellData)
    const data = this.cellData
    console.log('excelInit', data)
    // for (const index in this.cellTitle) {
    // data.push(this.cellTitle[index])
    // }
    setTimeout(() => {
      this.createExcel(data)
    }, 500)
    // })
    // });
  },
  methods: {

    createExcel(data) {
      this.$nextTick(() => {
        luckysheet.create({
          container: 'luckysheet', // 设定DOM容器的id
          title: 'Excel表头', // 设定表格名称
          lang: 'zh', // 设定表格语言
          plugins: ['chart'],
          hook: {
            cellUpdateBefore: function(r, c, value, isRefresh) {
              // 标题行
              if (r === 0) {
                return false
              }
              console.info('cellUpdateBefore', r, c, value, isRefresh)
            }
          },
          data: [
            {
              'name': '主表', // 工作表名称
              'color': '', // 工作表颜色
              'index': 0, // 工作表索引
              'status': 1, // 激活状态
              'order': 0, // 工作表的下标
              'hide': 0, // 是否隐藏
              'row': 36, // 行数
              'lintOnSave': false,
              'column': 18, // 列数
              'defaultRowHeight': 19, // 自定义行高
              'defaultColWidth': 73, // 自定义列宽
              'celldata': data,
              'scrollLeft': 0, // 左右滚动条位置
              'scrollTop': 0, // 上下滚动条位置
              'luckysheet_select_save': [], // 选中的区域
              'calcChain': [], // 公式链
              'isPivotTable': false, // 是否数据透视表
              'pivotTable': {}, // 数据透视表设置
              'filter_select': {}, // 筛选范围
              'filter': [], // 筛选配置
              'luckysheet_alternateformat_save': [], // 交替颜色
              'luckysheet_alternateformat_save_modelCustom': [], // 自定义交替颜色
              'luckysheet_conditionformat_save': {}, // 条件格式
              'frozen': {
                type: 'row'
              },
              // 冻结行列配置
              'chart': [], // 图表配置
              'zoomRatio': 1, // 缩放比例
              'image': [], // 图片
              'showGridLines': 1, // 是否显示网格线
              'dataVerification': {} // 数据验证配置
            }
          ]

        })
      })
    },
    goSave() {
      window.luckysheet.exitEditMode()
      this.saveExcel()
    },
    saveExcel() {
      const sheet = window.luckysheet.getLuckysheetfile()
      const data = sheet[0].data
      const rows = []
      for (const index in data) {
        const row = data[index]
        if (row[0]) {
          rows.push(row)
        }
      }
      this.$emit('save', rows)
      console.log('内容', rows)
    },

    exportExcel() {
      // eslint-disable-next-line no-undef
      const data = luckysheet.getAllSheets()[0].data

      // eslint-disable-next-line no-undef
      const out = XLSX.utils.book_new()
      const aoa = [[]]

      data.forEach(function(rows, index) {
        aoa[index] = []
        for (let column = 0; column < rows.length - 1; column++) {
          if (!rows[column]) { continue }
          aoa[index][column] = rows[column].v ? rows[column].v : ''
        }
      })

      const ws = XLSX.utils.aoa_to_sheet(aoa)
      XLSX.utils.book_append_sheet(out, ws, 'sheet1')

      XLSX.writeFile(out, this.title + '.xlsx', {})
      return true
    },
    uploadExcel(evt) {
      const files = evt.target.files
      if (files == null || files.length === 0) {
        alert('No files wait for import')
        return
      }

      const name = files[0].name
      const suffixArr = name.split('.')
      const suffix = suffixArr[suffixArr.length - 1]
      if (suffix != 'xlsx') {
        alert('Currently only supports the import of xlsx files')
        return
      }
      LuckyExcel.transformExcelToLucky(files[0], function(exportJson, luckysheetfile) {
        if (exportJson.sheets == null || exportJson.sheets.length == 0) {
          alert('Failed to read the content of the excel file, currently does not support xls files!')
          return
        }
        window.luckysheet.destroy()

        window.luckysheet.create({
          container: 'luckysheet', // luckysheet is the container id
          showinfobar: false,
          data: exportJson.sheets,
          title: exportJson.info.name,
          userInfo: exportJson.info.name.creator
        })
      })
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  h3 {
    margin: 40px 0 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
