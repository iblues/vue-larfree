<template>
  <div class="app-container" style="background: rgba(240,240,245,.5)">
    <ui-plane>
      <lar-list />
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
      schemas: []
    }
  },
  created() {
    this.fetchData('common.user')
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
