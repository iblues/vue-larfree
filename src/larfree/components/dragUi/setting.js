export default {
  created() {
  },
  props: {
    _action: {
      type: String,
      default: 'running'// edit,table,search   操作的场景
    },
    _setting: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },

  data() {
    return {
      uiSchema: {}
    }
  },
  watch: {

  },
  methods: {
  }
}
