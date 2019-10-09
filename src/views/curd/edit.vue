<template>

  <div class="app-container" style="background: rgba(240,240,245,.5)">
    <ui-plane>
      <lar-edit :id="id" :model="model" />
    </ui-plane>
  </div>
</template>
<script>
import LarEdit from '@/larfree/components/curd/edit'
import UiPlane from '@/components/Ui/Plane'

export default {
  components: { UiPlane, LarEdit },
  data() {
    return {
      test: '测试',
      tableTitle: '数据管理',
      id: 0,
      model: ''
    }
  },
  watch: {
    $route: function() {
      this.getRouterData()
    }
  },
  created() {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.getRouterData()
  },

  methods: {
    getRouterData() {
      this.model = this.$route.params.model
      this.id = this.$route.params.id
    }
  }
}
</script>
<style scoped>
    .main {
        padding: 20px 25px;
    }
</style>
