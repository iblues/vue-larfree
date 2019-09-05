<template>

  <span>

    <lar-search-box :schemas="schemas" :adv-schemas="advSchemas" @submit="submit" @clear="clearSearch">
      <template v-slot:btn>
        <slot name="btn" />
      </template>
    </lar-search-box>
  </span>

</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'LarSearch',
  props: {
    model: {
      type: String,
      default: ''
    },
    schemas: {
      type: [Object, Array],
      default: function() {
        return []
      }
    },
    advSchemas: {
      type: [Object, Array],
      default: function() {
        return []
      }
    },
    // 管道名称
    pipeName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      searchData: []
    }
  },

  computed: {
    ...mapGetters({
      getPipe: 'larfree/getPipe'
    }),
    lastPipeName() {
      return this.pipeName ? this.pipeName : this.model + '.table'
    }

  },

  watch: {

    model: function() {
      this.initData()
    }

  },
  created: function() {
    //          this.initData();
    //             console.info(this.searchData);
    this.searchData = this.getPipe(this.lastPipeName)
  },
  methods: {
    // 更新vuex
    update(newValue) {
      let data
      if (newValue) {
        data = JSON.parse(JSON.stringify(newValue))
      } else {
        data = []
      }
      this.$store.commit('larfree/pipe', { 'value': data, 'name': this.lastPipeName })
      // this.$emit('input', data);
    },

    // 提交事件
    submit(newValue) {
      this.searchData = newValue
      this.$emit('submit', this.searchData)
      this.update(this.searchData)
    }, // 去搜索

    // 清空事件
    clearSearch(newValue) {
      this.searchData = newValue
      this.$emit('clear', this.searchData)
      this.update(this.searchData)
    }
  }
}
</script>
<style  scoped>

    .search_box .form-group {
        margin-bottom:16px;
    }

    .top-search{
        overflow: hidden;
        border-radius:4px;
        padding:0 14px;
        border:1px solid rgba(177,217,255,1);
        background-color: rgba(229,242,255,0.2);
        margin-bottom: 10px;
    }
</style>
