<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;">
    <el-table-column label="作品名" min-width="200">
      <template slot-scope="scope">
         ID:{{ scope.row.id }}: 《{{ scope.row.title }}》- <span v-if="scope.row.subject">{{ scope.row.subject.title }}</span>

      </template>
    </el-table-column>
    <el-table-column label="作者" max-width="150" align="center">
      <template v-if="scope.row.user" slot-scope="scope">
        {{ scope.row.user.name }}
      </template>
    </el-table-column>
    <el-table-column :label="showName" max-width="30" align="center">
      <template slot-scope="scope">
        {{scope.row.record}}
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'RankingList',
  props: {
    ranking: {
      type: String
    }
  },
  data() {
    return {
      list: []
    }
  },
  computed: {
    showName() {
      switch (this.ranking) {
        case 'likes':
          return '赞'
        case 'sharing':
          return '分享'
        case 'playings':
          return '播放'
        case 'comprehensive':
          return '综合'
      }
      return ''
    }
  },
  created: function() {
    this.getList()
  },
  methods: {
    getField(row) {
      return row[this.ranking + '_count']
    },
    getList(type) {
      this.$http.get('/common/statistics/comprehensive?type=' + this.ranking).then((res) => {
        this.list = res.data
      })
    }
  }
}
</script>

<style scoped>

</style>
