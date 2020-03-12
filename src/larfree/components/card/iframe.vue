<template>
  <span>
    <iframe :src="src" frameborder="0" allowtransparency />
  </span>
</template>

<script>

export default {
  name: 'CardIframe',
  props: {
    'src': {
      'type': String,
      'default': 'https://baidu.com'
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
