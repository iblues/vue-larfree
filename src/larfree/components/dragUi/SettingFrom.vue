<template>
  <span>
    <lar-form v-model="value" :schemas="schemas" />
  </span>
</template>

<script>
export default {
  name: 'DragUiSettingFrom',
  props: {
    value: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      'schemas': {
        'fields':
            {
              'model': {
                'name': '模块名',
                'type': 'text'
              }
            }
      }
    }
  }
}
</script>

<style scoped>

</style>
