<template>
  <span class="lar-form">

    <!--表格控件-->
    <div>
      <lar-form v-model="formData" v-loading="loading" :model="model" :schemas="Schemas" @submit="onSubmit">
        <template v-slot:bottom>
          <div style="text-align: center;margin-top: 20px">
            <el-button type="primary" @click="onSubmit">确定</el-button>
            <el-button @click="cancel">取消</el-button>
          </div>
        </template>
      </lar-form>
    </div>

  </span>
</template>

<script>
import { larSchemas, larData } from '@/api/larfree-curd'
export default {
  props: {
    id: {
      type: [String, Number],
      default: null
    },
    model: {
      type: String,
      required: true
    },
    module: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      debug: false,
      errors: [],
      formData: {},
      api: '',
      Schemas: {},
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
      this.getData()
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

    // 读取配置文件
    getSchemas(model, module) {
      // 如果有主键,应该是编辑模式
      if (this.id) {
        this.mode = 'edit'
      }

      if (module) {
        module = '.' + module
      }
      larSchemas(model, 'base.' + this.mode + module, '').then((response) => {
        this.Schemas = response.data
        if (this.mode === 'edit') {
          // 编辑模式,需先读取数据
          this.readApi = this.$larfree.replaceParm(response.data.config.readApi, this)
          this.getData()
        } else {
          this.getData()// add模式 也需要初始化变量用
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

    // 如果是编辑模式,读取远程数据
    getData() {
      // 根据配置 初始化添加的数据结构
      if (this.mode === 'add') {
        const Schemas = {}
        for (const key in this.Schemas['fields']) {
          const name = this.Schemas['fields'][key]['key']
          if (this.Schemas['fields'][key]['default']) {
            Schemas[name] = this.Schemas['fields'][key]['default']
          }
        }
        this.formData = Schemas
        this.loading = false
      } else {
        this.$api(this.readApi).then((response) => {
          this.loading = false
          if (response.status === 1) {
            this.$emit('loaded')
            // this.$debug.log(response.data, this.api, this)
            this.formData = response.data
          } else {
            this.$message.error('数据错误')
          }
        }).catch((error) => {
          this.loading = false
          this.$message.error(error.response.msg)
          //                        console.log(error);
        })
      }
    },

    // 保存/添加数据
    onSubmit() {
      this.$emit('loading')
      this.loading = true
      // this.$debug.log(this.formData, 'submit', this)
      let http
      // 添加是post, 编辑是put
      console.log(this.formData)
      if (this.mode === 'add') {
        http = this.$api(this.api, this.formData)
      } else {
        http = this.$api(this.api, this.formData)
      }

      http.then((response) => {
        this.loading = false
        this.$message.success(response.msg || '操作成功')
        this.formData = response.data
        this.$store.commit('larfree/refreshEvents', this.model)
        this.$store.commit('larfree/refreshDialog')
        this.$emit('back')
      }).catch((error) => {
        console.log(error, '保存/添加请求')
        this.loading = false
        this.$message.error(error.response.msg || '请求失败')
        this.$larfree.goToTop()
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
