<template>
  <div class="rooms" style="height: 500px">
    <el-row>
      <el-col :span="3">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          style="height: 100vh:min-width:250px"
        >
          <el-submenu index="1">
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

      <el-col :span="21">

        <el-col v-for="r in room" :span="3" style="width: 200px;margin: 10px;text-align: center;">
          <el-card shadow="hover" style="margin: 5px;min-height: 200px">
            <div style="background: rgba(0,0,0,0.15);padding: 2px 5px">{{ r.name }}</div>
            <div v-for="bed in r['beds']" style="margin: 5px">
              <div>{{ bed.bed }}:{{ bed.student?bed.student.name:"空" }}</div>
            </div>
          </el-card>
        </el-col>

      </el-col>

    </el-row>
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
      building: {}
    }
  },
  created() {
    this.getRoom(1)
    this.getBuilding()
  },
  methods: {
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

  .rooms .el-card__body{
    padding: 0 !important;
  }
/*#luckysheet_info_detail{display: none !important;}*/
</style>
