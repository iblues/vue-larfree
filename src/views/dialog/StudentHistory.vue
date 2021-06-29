<template>

  <div class="main">
    <span>
      张三&nbsp;&nbsp;&nbsp;&nbsp;男&nbsp;&nbsp;&nbsp;&nbsp;文学院-语言学&nbsp;&nbsp;&nbsp;&nbsp;021级02班
      <br>   <br>变动历史:
      <ul class="history">
        <li>2020-06-21 从重德苑四幢 403-1 更换为 重德苑四幢404-1<br>  -操作人:李四</li>
        <li>2020-08-21 从重德苑四幢 403-1 更换为 重德苑四幢404-1<br>  -操作人:李四</li>
      </ul>

    </span>
  </div>
</template>
<script>
export default {
  name: 'StudentHistory',
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
