<template>
  <div>
    <lar-list />
  </div>
</template>

<script>
import { larSchemas } from '@/api/larfree-curd'
import larList from '@/larfree/components/curd/list'
export default {
  name: 'List',
  components: {
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
