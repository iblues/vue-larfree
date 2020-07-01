<template>

  <div class="app-container">
    <larfree-config />
  </div>
</template>

<script>
import LarfreeConfig from '@/larfree/components/config/index'
export default {
  components: { LarfreeConfig },
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
