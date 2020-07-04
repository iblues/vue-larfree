<template>

  <div class="app-container">
    <larfree-schemas />
  </div>
</template>

<script>
import LarfreeSchemas from '@/larfree/components/Schemas/index'
export default {
  components: { LarfreeSchemas },
  data() {
    return {
      configList: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.$http.get('/system/config').then((res) => {
        console.log(res)
        this.configList = res.data
      })
    }
  }
}
</script>
