<template>
  <span>
    <lar-form :value="value" :schemas="doneSchemas" @submit="save" v-on="$listeners">
      <template v-slot:bottom>
      </template>
    </lar-form>
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
    },
    schemas: {
      type: String || Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
    }
  },
  computed: {
    doneSchemas() {
      if (typeof this.schemas === 'string') {
        return JSON.parse(this.schemas.replace(/'/g, '"'))
      } else {
        return this.schemas
      }
    }
  },
  methods: {
    save(data) {
      if (this._action === 'setting') {
        this.$emit('submit', data)
      }
    }
  }
}
</script>

<style scoped>

</style>
