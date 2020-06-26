<template>
  <div class="dashboard-container">
    <div class="app-container">

      <h2>欢迎回来</h2>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>公告通知</span>
        </div>
        <div>
          有什么通知都写这里.
          所有人都能看到.
        </div>

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
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    if (!this.roles.includes('admin')) {
      this.currentRole = 'editorDashboard'
    }
  }
}
</script>
