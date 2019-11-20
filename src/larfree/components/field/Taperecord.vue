<!--
@blues
<lar-field-input v-model="input" :action="action"></lar-field-input>
-->
<template>
  <span>
    <template v-if="action == 'edit' || action == 'search' ">
      <el-input :value="value" :placeholder="fieldName" v-on="$listeners" />
    </template>
    <template v-if="action == 'table'">
      <div style="text-align: center">
        点赞:{{ data['likes_count']*1 + data['base_like']*1 + baseNumber*1 }}({{ data['likes_count'] }})  &nbsp;
        评论:{{ data['reviews_count'] }}
      </div>
      <div style="text-align: center">
        分享:{{ data['sharing_count'] | 0 }} &nbsp;
        播放:{{ data['playings_count'] }}
      </div>
      <div style="text-align: center;cursor: pointer">
        <el-popover
          placement="top-start"
          title="预览"
          width="200"
          trigger="click"
          content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
          @show="show"
        >
          <div v-loading="loading"><img width="160" :src="qr"></div>
          <el-button slot="reference" type="text" style="">预览</el-button>
        </el-popover>

        <el-popover
          v-model="visible"
          v-loading="loading"
          placement="top"
          width="160"
        >
          <h4>增加赞的数量</h4>
          <p><el-input v-model="number" type="number" /></p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="visible = false">取消</el-button>
            <el-button type="primary" size="mini" @click="addLike">确定</el-button>
          </div>
          <el-button slot="reference" type="text">加赞</el-button>
        </el-popover>

      </div>

    </template>
  </span>
</template>
<script>
import base from './base.js'

export default {
  name: 'LarFieldTaperecord',
  extends: base,
  props: {},
  data() {
    return {
      loading: false,
      visible: false,
      number: 0,
      searchModel: 'like',
      baseNumber: 0,
      qr: null
    }
  },
  methods: {
    addLike() {
      this.loading = true
      this.$http.post('tape/record/like/' + this.data['id'], { 'add_number': this.number }).then((res) => {
        this.baseNumber = this.number * 1 + this.baseNumber * 1
        this.number = 0
      }).catch(() => {
      }).finally(() => {
        this.visible = false
        this.loading = false
      })
    },
    show() {
      if (!this.qr) {
        this.loading = true
        this.$http.get('tape/record/' + this.data['id']).then((res) => {
          this.qr = res.data.preview_qr
        }).catch(() => {

        }).finally(() => {
          this.loading = false
        })
      }
    }
  }
}
</script>
<style>
</style>
