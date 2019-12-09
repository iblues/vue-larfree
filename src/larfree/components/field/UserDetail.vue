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
        充值:{{ data['recharge_count'] || 0 }} &nbsp;
        使用:{{ data['used_record_count'] || 0 }}
      </div>
      <div v-for="(item,key) in data['rest_number_group']" :key="key" style="text-align: center">
        <div v-if="item.product_type_name"><b>{{item.product_type_name.name}} - 剩余次数</b></div>
        收费:{{ item['balance'] || 0}}
        赠送:{{ item['gift'] || 0 }}
      </div>
    </template>
  </span>
</template>
<script>
import base from './base.js'

export default {
  name: 'LarFieldUserdetail',
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
