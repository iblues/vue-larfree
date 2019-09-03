<template>

  <div class="main">
    <lar-form :id="id" :model="model" @back="back" />
    <!--<router-link :to="`/dialog/edit/express.order/`+id">-->
    <!--<span class="modify-info">-->
    <!--修改-->
    <!--</span>-->
    <!--</router-link>-->
  </div>
</template>
<script>

export default {
  name: 'CommonForm',
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
    model: function(value) {
      return this.params.model
    },
    id: function(value) {
      return this.params.id
    }
  },
  created() {
    this.$emit('dialogTitle', '编辑')
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
