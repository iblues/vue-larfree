<template>
  <div>
    <el-upload
      class="upload-demo"
      drag
      :action="api"
      :on-success="handleSuccess"
      multiple
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>

    <h3>编辑排序区域</h3>

    <draggable v-model="items" v-loading="loading" group="people" @start="drag=true" @end="drag=false">
      <div v-for="(element) in items" :key="element.id" class="ui-div">
        <span style="width: 34px;display: inline-block;text-align: center">{{ element.collection }}.</span> {{
          element.title }} ({{ element.time }}秒)
        <el-button style="float: right" size="mini" type="danger" round @click="delAudio(element.id)">删除</el-button>
      </div>
    </draggable>

  </div>
</template>
<script>
import draggable from 'vuedraggable'
import base from './base.js'

export default {
  name: 'LarFieldEpisodes',
  components: { draggable },
  extends: base,
  data() {
    return {
      flag: false,
      loading: false,
      visible: false,
      searchModel: 'like',
      items: [{
        id: 1,
        title: '测试1',
        collection: 1,
        time: 20
      }]
    }
  },
  computed: {
    api: function() {
      return process.env.VUE_APP_BASE_API + '/common/upload/upload_mp3?albums_id=' + this.data.id
    }
  },
  watch: {
    data: function() {
      this.loadData()
    },
    items: function() {
      for (const i in this.items) {
        this.items[i].collection = (i * 1 + 1)
      }
      console.log(this.items)
      this.data['episodes'] = this.items
    }
  },
  methods: {
    delAudio(id) {
      // for (const i in this.items) {
      //   if (this.items[i].id === id) {
      //     this.items.splice(i, 1)
      //   }
      // }
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        this.$http.delete('/audio/episodes/' + id).then((res) => {
          this.loadData()
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      }).catch(() => {
      })
    },
    loadData() {
      clearTimeout(this.flag)
      this.loading = true
      this.flag = setTimeout(() => {
        this.$http.get('/audio/episodes?@sort=collection.asc&pageSize=10000&albums_id=' + this.data.id).then((res) => {
          this.items = res.data
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      }, 1000)
    },
    handleSuccess() {
      this.loadData()
    }

  }
}
</script>

<style scoped>
  .ui-div {
    border-bottom: 1px solid #eee;
    margin-bottom: 2px;
    padding-bottom: 2px;
    cursor: move;
  }

  .ui-div button {
    margin-top: 3px;
  }
</style>
