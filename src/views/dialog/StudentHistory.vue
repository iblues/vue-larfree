<template>

  <div class="main">
    <span>
      {{ student.name }}&nbsp;&nbsp;&nbsp;&nbsp;{{ student.sex }}&nbsp;&nbsp;&nbsp;&nbsp;{{ student.college }}-{{ student.major }}-{{ student.level }}
      &nbsp;&nbsp;{{ student.grade }}级&nbsp;&nbsp;{{ student.class }}
      <br>   <br>入驻历史:
      <ul class="history">
        <li v-for="row in history">{{ row.created_at }}<br>

          <span v-if="row.student_id == id">入住 {{ row.bed?row.bed.name:'' }}  </span>
          <span v-else>搬出 {{ row.bed?row.bed.name:'' }}  </span>

          <br>  操作人:{{ row.admin.name }}</li>
      </ul>

    </span>
  </div>
</template>
<script>
export default {
  name: 'StudentHistory',
  props: {
    params: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      student: {
        name: '',
        number: '',
        sex: '',
        level: '',
        major: '',
        college: '',
        grade: '',
        class: ''
      },
      history: []

    }
  },
  computed: {
    module: function(value) {
      return this.params.module
    },
    model: function(value) {
      return this.params.model
    },
    id: function(value) {
      return this.params.id
    }
  },
  created() {
    this.$http.get('/user/student/' + this.id).then((res) => {
      this.student = res.data
    })

    this.$http.get('/log/bed_change/?student_all=' + this.id).then((res) => {
      console.log('history', res.data)
      this.history = res.data
    })
  },
  methods: {
    back() {
      this.$emit('closeDialog')
    }
  }
}
</script>
<style scoped>
  .main {
    padding: 20px 25px;
  }
</style>
