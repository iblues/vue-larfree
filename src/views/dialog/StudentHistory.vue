<template>

  <div class="main">
    <span>

      <el-descriptions title="学生信息">
        <el-descriptions-item label="姓名">   {{ student.name }}</el-descriptions-item>
        <el-descriptions-item label="学号">   {{ student.number }}</el-descriptions-item>
        <el-descriptions-item label="班级">   {{ student.grade }}级&nbsp;&nbsp;{{ student.class }}</el-descriptions-item>
        <el-descriptions-item label="性别">{{ student.sex }}</el-descriptions-item>
        <el-descriptions-item label="专业">{{ student.college }}-{{ student.major }}</el-descriptions-item>
        <el-descriptions-item label="类别">{{ student.level }}</el-descriptions-item>
        <el-descriptions-item label="备注">
          <el-tag size="small">已退宿</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="操作">
          <el-button size="mini" type="danger">退宿</el-button>
          <el-button size="mini" type="primary">调换</el-button>
        </el-descriptions-item>
      </el-descriptions>
      <br> <br>
      调整床位
      <el-row style="padding-top: 5px">
        <el-col :span="10">
          <lar-field-select :field-name="床位" placeholder="请输入关键词" />
        </el-col>
        <el-col :span="4">
          <el-button>修改</el-button>
        </el-col>

        <el-button>退宿</el-button>
      </el-row>

      <h4>入驻历史: </h4>

      <div class="block">
        <el-timeline>
          <el-timeline-item
            v-for="(activity, index) in history"
            :key="index"
            icon="el-icon-more"
            type="primary"
            :color="activity.color"
            size="large"
            :timestamp="activity.created_at"
          >
            <span v-if="activity.student_id == id"><span style="color: blue">入住</span> {{ activity.bed?activity.bed.name:'' }}  </span>
            <span v-else><span style="color: red">搬出</span> {{ activity.bed?activity.bed.name:'' }}  </span>
            <br>  操作人:{{ activity.admin.name }}
          </el-timeline-item>
        </el-timeline>
      </div>

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
