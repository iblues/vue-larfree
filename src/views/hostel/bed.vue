<template>
  <div class="rooms" style="height: 500px">
    <el-row>
      <el-col :span="3">
        <el-menu
          :default-active="initId"
          class="el-menu-vertical-demo"
          style="height: 100vh:min-width:250px"
        >
          <el-submenu index="0">
            <template slot="title">
              <i class="el-icon-location"/>
              <span>狮子山校区</span>
            </template>
            <template v-for="b in building">
              <el-menu-item :key="b.id" :index="b.id+''" @click="changeBuilding(b)">{{ b.name }}</el-menu-item>
            </template>
          </el-submenu>

        </el-menu>
      </el-col>

      <el-col v-loading="loading" :span="21">

        <div>
          <el-row style="margin: 20px" :gutter="20">
            <el-col :span="4">
              <lar-field-input action="search" fieldName="学号" fieldKey="number"></lar-field-input>
            </el-col>

            <el-col :span="4">
              <lar-field-input action="search" fieldName="房间" fieldKey="number"></lar-field-input>
            </el-col>

            <el-col :span="4">
              <lar-field-input action="search" fieldName="楼层" fieldKey="number"></lar-field-input>
            </el-col>

            <el-col :span="4">
              <lar-field-input action="search" fieldName="是否空缺" fieldKey="number"></lar-field-input>
            </el-col>

            <el-col :span="4">
              <el-button type="primary">搜索</el-button>
            </el-col>
          </el-row>
        </div>

        <el-col v-for="r in room" :span="3" style="width: 200px;margin: 10px;text-align: center;">
          <el-card shadow="hover" style="margin: 5px;min-height: 200px;z">
            <div style="background: rgba(0,0,0,0.15);padding: 2px 5px">{{ r.name }}</div>
            <template v-for="bed in r['beds']">
              <div style="margin: 5px;cursor:pointer;text-align: left;margin-left: 20px" @click="showStudent(bed)">
                <div>{{ bed.bed }}:{{ bed.student?bed.student.name:'未入住' }}</div>
              </div>
            </template>
          </el-card>
        </el-col>

      </el-col>

    </el-row>
    <lar-dialog/>
  </div>
</template>

<script>
  import OnlineExcel from '@/components/Excel/index'
  import LarDialog from '@/larfree/components/dialog'

  export default {
    name: 'Excel',
    components: { LarDialog, OnlineExcel },
    data () {
      return {
        room: {},
        building: {},
        initId: 16,
        loading: false,
      }
    },
    created () {
      this.getRoom(this.initId)
      this.getBuilding()
    },
    methods: {
      showStudent (r) {
        console.log('查看学生', r)
        if (r.student_id) {
          this.$router.push('/dialog/student/bed/' + r.student_id)
        }
      },
      getBuilding () {
        this.$http.get('/hostel/building').then((res) => {
          const data = res.data
          this.building = data
        })
      },
      getRoom (id) {
        this.loading = true
        this.$http.get('/hostel/bed/tree?building_id=' + id).then((res) => {
          const data = res.data
          this.room = data
          console.log('room-tree', data)
          this.loading = false
        })
      },

      changeBuilding (b) {
        this.getRoom(b.id)
      },
      handleNodeClick (data) {
        console.log(data)
      },
    },
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

  .rooms .history li {
    padding: 5px;
    line-height: 150%;
  }

  /*#luckysheet_info_detail{display: none !important;}*/
</style>
