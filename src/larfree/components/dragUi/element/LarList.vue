<template>
  <span>

    <template v-if="_action==='setting'">
      <drag-ui-setting-from
        setting="_setting"
        :value="_uiParam"
        schemas="{'fields':{'model':{'name':'模块名','type':'text','tip':'例如:common.user'},'mode':{'name':'模式','type':'select','option':{'100':'全部','50':'仅展示,无增删改查','20':'仅展示,无排序翻页'},'tip':'无搜索,编辑,删除等'}}}"
        v-on="$listeners"
      />
    </template>
    <template v-else>
      <lar-list v-bind="_uiParam" />
    </template>
  </span>

</template>

<script>
import setting from '@/larfree/components/dragUi/setting'
import LarList from '@/larfree/components/curd/list'

export default {
  name: 'DragUiElementLarList',
  components: { LarList },
  extends: setting
}
</script>

<style scoped>

</style>
