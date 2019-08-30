<template>
  <div class="ui-plane">
    <div class="title">
      {{ title }}
    </div>
    <div class="body">
      <slot name="default" />
    </div>
  </div>

</template>

<script>
export default {
  name: 'UiPlane',
  props: {
    title: {
      type: String,
      default: '模块名'
    }
  }
}
</script>

<style lang="scss">
.ui-plane{
    border-radius: 10px;
    background:#ffffff;
    .title{
        padding: 15px;
        border-bottom: 1px solid rgba(238,238,245,1);
    }
    .body{
        padding: 15px;
    }
}

</style>
