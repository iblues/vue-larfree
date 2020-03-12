<template>
  <span>
    <template v-if="_action==='setting'">
      <drag-ui-setting-from
        setting="_setting"
        :value="_uiParam"
        schemas="{'fields':{'src':{'name':'地址','type':'text','tip':'http:\/\/xx.com'}}  }"
        v-on="$listeners"
      />
    </template>
    <template v-else>
      <iframe :src="_uiParam.src" frameborder="0" allowtransparency />
    </template>
  </span>
</template>

<script>
import setting from '@/larfree/components/dragUi/setting'

export default {
  name: 'DragUiElementIframe',
  extends: setting,
  props: {
    'src': {
      'type': String,
      'default': ''
    }
  }
}
</script>

<style scoped>
  iframe{
    border: none;
    width: 100%;
    height: 100%;
  }
</style>
