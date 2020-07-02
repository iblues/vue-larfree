<template>
  <div class="dashboard-container">
    <div class="app-container">

      <h2>欢迎回来</h2>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>公告通知</span>
        </div>
        <div v-html="content" />

      </el-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      currentRole: 'adminDashboard',
      content: ''
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    this.$http.get('/system/config/notice/index').then((res) => {
      console.log(res.data.index)
      this.content = res.data.index
    })
    if (!this.roles.includes('admin')) {
      this.currentRole = 'editorDashboard'
    }
  }
}
</script>
