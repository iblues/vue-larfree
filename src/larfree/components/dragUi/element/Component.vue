<template>
  <span>

    <template v-if="_action==='setting'">
      <drag-ui-setting-from
        setting="_setting"
        :value="_uiParam"
        schemas="{'fields':{'component':{'name':'模块名','type':'text','tip':'例如:lar-list'},'bind':{'name':'v-bind','type':'textarea','tip':'例如:{\'v-model\':\'common.user\'}'} }  }"
        v-on="$listeners"
      />
    </template>
    <template v-else>
      <!--      {{ bind }}-->
      <component :is="_uiParam.component" v-bind="bind" />
    </template>
  </span>

</template>

<script>
import setting from '@/larfree/components/dragUi/setting'
import LarList from '@/larfree/components/curd/list'
import CardIframe from '@/larfree/components/card/iframe'

export default {
  name: 'DragUiElementComponent',
  components: { CardIframe, LarList },
  extends: setting,
  computed: {
    bind: function() {
      if (this._uiParam.bind) { return JSON.parse(this._uiParam.bind) } else { return {} }
    }
  }
}
</script>

<style scoped>

</style>
