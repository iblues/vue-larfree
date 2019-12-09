<template>
  <div style="text-align: center">
    <lar-field-file v-model="name" style="margin: auto" tip="请上传xlsx文件,不要超过8mg" @uploaded="success" />
    <el-button @click="submit()">导入</el-button>
  </div>
</template>

<script>
import LarFieldFile from '../../../../vue-larfree-core/src/components/field/File'

export default {
  name: 'Import',
  components: { LarFieldFile },
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
      name: '',
      url: ''
    }
  },
  computed: {
    model: function(value) {
      return this.params.model
    },
    api: function(value) {
      return this.params.api
    }
  },
  created() {
    this.$emit('dialogTitle', '编辑')
  },
  methods: {
    submit() {
      this.$http.post(this.api, { file: this.url }).then((res) => {
        this.$emit('closeDialog')
        this.$store.commit('larfree/refreshEvents', this.model)
      })
    },
    success(file) {
      this.url = file
    },
    back() {
      this.$emit('closeDialog')
    }
  }
}
</script>

<style scoped>

</style>
