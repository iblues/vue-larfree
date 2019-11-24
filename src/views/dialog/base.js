export default {
  created() {
    this.myValue = this.value
  },
  props: {
    param: {
      type: String,
      default: '数据列表'
    }
  },
  mounted() {
    // 告诉系统.搜索用什么模式
  },
  data() {
    return {
    }
  },
  watch: {
    // 实现v-model
    myValue: function(newValue, oldValue) {
      this.$emit('input', newValue)
    },
    // 实现v-model
    value: function(newQuery) {
      this.myValue = this.value
    }
  },
  methods: {
    quickChange: function() {
      this.$emit('quick-change', this.value)
    }
  }
}
