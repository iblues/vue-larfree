<template>
  <div class="ui-plane">

    <div v-if="title" class="title">
      {{ title }}
    </div>
    <div class="body">
      <slot name="default" />
    </div>
  </div>

</template>

<script>
import setting from '@/larfree/components/dragUi/setting'

export default {
  name: 'UiPlane',
  extends: setting,
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
.ui-plane{
    height: 100%;
    border-radius: 10px;
    background:#ffffff;
    padding-top: 10px;
    .title{
        margin-top: -10px;
        padding: 10px;
        padding-left: 15px;
        border-bottom: 1px solid rgba(238,238,245,1);
    }
    .body{
        padding: 10px;
        padding-top: 5px;
    }
    /*margin-bottom: 10px;*/
}

</style>
