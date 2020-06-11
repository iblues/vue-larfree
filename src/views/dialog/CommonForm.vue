<template>

  <div class="main">
    <lar-edit :id="id" :model="model" :module="module" @back="back" />
    <!--<router-link :to="`/dialog/edit/express.order/`+id">-->
    <!--<span class="modify-info">-->
    <!--修改-->
    <!--</span>-->
    <!--</router-link>-->
  </div>
</template>
<script>
import LarEdit from '@/larfree/components/curd/edit'
export default {
  name: 'CommonForm',
  components: { LarEdit },
  props: {
    params: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
    }
  },
  computed: {
    module: function(value) {
      return this.params.module
    },
    model: function(value) {
      return this.params.model
    },
    id: function(value) {
      return this.params.id
    }
  },
  created() {
    this.$emit('dialogTitle', '编辑')
    this.$emit('dialogLock', true)
  },
  methods: {
    back() {
      this.$emit('closeDialog')
    }
  }
}
</script>
<style scoped>
    .main {
        padding: 20px 25px;
    }
</style>
