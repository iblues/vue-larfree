<template>
  <div class="rooms" style="height: 500px">
    <el-row>
      <el-col :span="3">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          style="height: 100vh:min-width:250px"
        >
          <el-submenu index="0">
            <template slot="title">
              <i class="el-icon-location" />
              <span>成都校区</span>
            </template>
            <template v-for="b in building">
              <el-menu-item :index="b.id" @click="changeBuilding(b)">{{ b.name }}</el-menu-item>
            </template>
          </el-submenu>

        </el-menu>
      </el-col>

      <el-col :span="21" >

        <el-col v-for="r in room" :span="3" style="width: 200px;margin: 10px;text-align: center;" >
          <el-card @click="showRoom" shadow="hover" style="margin: 5px;min-height: 200px;z">
            <div style="background: rgba(0,0,0,0.15);padding: 2px 5px">{{ r.name }}</div>
            <div @click="showRoom"  v-for="bed in r['beds']" style="margin: 5px;cursor:pointer;">
              <div>{{ bed.bed }}:{{ bed.student?bed.student.name:'空' }}</div>
            </div>
          </el-card>
        </el-col>

      </el-col>

    </el-row>

    <el-dialog
      title="床位信息"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span>
        张三&nbsp;&nbsp;&nbsp;&nbsp;男&nbsp;&nbsp;&nbsp;&nbsp;文学院-语言学&nbsp;&nbsp;&nbsp;&nbsp;021级02班
        <br />   <br />变动历史:
        <ul class="history">
          <li>2020-06-21 从重德苑四幢 403-1 更换为 重德苑四幢404-1<br/>  -操作人:李四</li>
          <li>2020-08-21 从重德苑四幢 403-1 更换为 重德苑四幢404-1<br/>  -操作人:李四</li>
        </ul>

      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import OnlineExcel from '@/components/Excel/index'

export default {
  name: 'Excel',
  components: { OnlineExcel },
  data() {
    return {
      room: {},
      building: {},
      dialogVisible: false
    }
  },
  created() {
    this.getRoom(1)
    this.getBuilding()
  },
  methods: {
    showRoom() {
      console.log(11);
      this.dialogVisible = true
    },
    getBuilding() {
      this.$http.get('/hostel/building').then((res) => {
        const data = res.data
        this.building = data
      })
    },
    getRoom(id) {
      this.$http.get('/hostel/bed/tree?building_id=' + id).then((res) => {
        const data = res.data
        this.room = data
        console.log('room-tree', data)
      })
    },

    changeBuilding(b) {
      this.getRoom(b.id)
    },
    handleNodeClick(data) {
      console.log(data)
    }
  }
  // beforeRouteLeave(to, from, next) {
  //   // 判断数据是否修改，如果修改按这个执行，没修改，则直接执行离开此页面
  //   // 弹窗显示
  //   this.$confirm('是否离开页面?', '提示', {
  //     confirmButtonText: '确定',
  //     cancelButtonText: '取消',
  //     type: 'warning'
  //   }).then(() => {
  //     next()
  //   }).catch(() => {
  //   })
  // }
}
</script>

<style>

  .rooms .el-card__body {
    padding: 0 !important;
  }
  .rooms .history li{
    padding: 5px;
    line-height: 150%;
  }
  /*#luckysheet_info_detail{display: none !important;}*/
</style>
