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
    },
    _uiParam: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },

  inheritAttrs: false,
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
