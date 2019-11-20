<template>
  <div class="app-container" style="background: rgba(240,240,245,.5)">
      <!--<el-row :gutter="10">-->
        <!--<el-col :span="12">-->
          <!--<ui-plane>-->
          <!--<LarChartSimpleLine model="test.test" />-->
          <!--</ui-plane>-->
        <!--</el-col>-->
        <!--<el-col :span="12">-->
          <!--<ui-plane>-->
          <!--<LarChartSimpleLine model="test.test" />-->
          <!--</ui-plane>-->
        <!--</el-col>-->
      <!--</el-row>-->

    <ui-plane>
      <lar-list :model="model" />
    </ui-plane>
  </div>
</template>

<script>
import { larSchemas } from '@/api/larfree-curd'
import larList from '@/larfree/components/curd/list'
import UiPlane from '@/components/Ui/Plane'
export default {
  name: 'List',
  components: {
    UiPlane,
    larList
  },
  data() {
    return {
      listLoading: true,
      schemas: [],
      model: ''
    }
  },
  created() {
    this.model = this.$route.params.model
    this.fetchData(this.model)
  },
  methods: {
    fetchData(model) {
      this.listLoading = true
      larSchemas(model).then(response => {
        this.schemas = response.data
        this.listLoading = false
      })
    }
  }
}
</script>

<style scoped>
</style>
