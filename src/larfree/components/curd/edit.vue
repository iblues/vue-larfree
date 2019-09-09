<template>
  <span class="lar-form">

    <!--表格控件-->
    <div>
      <lar-form v-loading="loading" :model="model" :schemas="Schemas" :data="tableData" />
    </div>

  </span>
</template>

<script>
import { larSchemas } from '@/api/larfree-curd'
export default {
  props: {
    id: {
      type: [String, Number],
      default: 0
    },
    model: {
      type: String,
      default: 'common.user',
      required: true
    },
    module: {
      type: String,
      default: 'base.edit',
      required: true
    }
  },
  data() {
    return {
      debug: false,
      errors: [],
      formData: {},
      tableData: [],
      api: '',
      Schemas: [],
      mode: 'add',
      loading: true
    }
  },

  watch: {
    id: function() {
      this.loading = true
      this.getSchemas()
    },
    model: function() {
      // this.loading=true;
      // this.getSchemas();
    },
    readApi: function() {
      // this.getData();
    },
    mode: function() {
      if (this.mode === 'add') { this.$emit('title', '添加') } else { this.$emit('title', '编辑') }
    }
  },

  created: function() {
    this.getSchemas(this.model, this.module)
    this.debug = localStorage.getItem('debug')
    this.$emit('title', '添加')
    // this.dataChange();
  },

  methods: {
    updateData(data) {
      this.formData = data
    },
    getSchemas(model, module) {
      if (this.id) {
        this.mode = 'edit'
      }

      larSchemas(model, module, `?mode=${this.mode}`).then((response) => {
        this.Schemas = response.data
        if (this.mode === 'edit') {
          // 编辑模式,需先读取数据
          this.readApi = this.$larfree.replaceParm(response.data.config.readApi, this)
          this.getData()
        } else {
          // this.getData();
          this.readApi = ''
          // 添加模式 直接加载完成
          this.loading = false
          this.$emit('loaded')
        }
        // 更新接口
        this.api = this.$larfree.replaceParm(response.data.config.api, this)
      }).catch((error) => {
        this.$message.error(error.response.data.msg)
        //                    console.log(error);
      })
    },

    getData() {
      // 根据配置 初始化添加的数据结构
      if (this.mode === 'add') {
        const Schemas = {}
        for (var key in this.Schemas['fields']) {
          const name = this.Schemas['fields'][key]['key']
          Schemas[name] = ''
        }
        this.formData = Schemas
        this.loading = false
      } else {
        this.$http.get(this.readApi)
          .then((response) => {
            this.loading = false
            if (response.data.status === 1) {
              this.$emit('loaded')
              this.$debug.log(response.data.data, this.api, this)
              this.formData = response.data.data
            } else {
              this.$message.error('数据错误')
            }
          })
          .catch((error) => {
            this.loading = false
            this.$message.error(error.response.data.msg)
            //                        console.log(error);
          })
      }
    },

    onSubmit() {
      this.$emit('loading')
      this.loading = true
      this.$debug.log(this.formData, 'submit', this)
      let http
      if (this.mode === 'add') { http = this.$http.post(this.api, this.formData) } else { http = this.$http.put(this.api, this.formData) }

      http.then((response) => {
        this.loading = false
        if (response.data.status === 1) {
          this.$message.success(response.data.msg)
          this.formData = response.data.data
          this.$store.commit('refreshEvents', this.model)
          this.$store.commit('refreshDialog')
          this.$emit('back')
        } else {
          this.errors = response.data.data
          this.$message.error(response.data.msg)
          this.$larfree.goToTop()
        }
      }).catch((error) => {
        this.loading = false
        this.$message.error(error.response.data.msg)
        return true
      })
      //            this.$debug.log(this.formData,'test');
    },

    cancel() {
      this.$emit('back')
    },

    dataChange() {
      this.$emit('change')
    }
  }
}
</script>
