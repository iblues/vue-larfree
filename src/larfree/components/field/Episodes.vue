<template>
  <div>
    <el-upload
      class="upload-demo"
      drag
      :action="api"
      multiple
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>

    <draggable v-model="items" group="people" @start="drag=true" @end="drag=false">
      <div v-for="(element,key) in items" :key="element.id" class="ui-div">
        {{key+1}}. {{element.name}}
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
      loading: false,
      visible: false,
      searchModel: 'like',
      items: [{
        id: 1,
        name: '测试1',
        collection: 1
      }, {
        id: 2,
        name: '测试22',
        collection: 2
      }]
    }
  },
  computed: {
    api: function() {
      return process.env.VUE_APP_BASE_API + '/common/upload/upload_mp3?albums_id=' + this.data.id
    }
  },
  methods: {
    delAudio(id) {
      for (const i in this.items) {
        if (this.items[i].id === id) {
          this.items.splice(i, 1)
        }
      }
    }
  }
}
</script>

<style scoped>
  .ui-div{
    border-bottom: 1px solid #eee;
    margin-bottom: 2px;
    padding-bottom: 2px;
    cursor: move;
  }
  .ui-div button{
    margin-top: 3px;
  }
</style>
