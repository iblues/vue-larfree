<template>
  <span>
    <el-dialog
      v-for="(item, index) in dialogs"
      :key="index"
      top="5vh"
      :custom-class="isPhone ? 'margno ' + item.dWidth : item.dWidth"
      :title="item.title"
      :visible.sync="!!item && item.visible"
      :append-to-body="false"
      @closed="closeEnd"
    >
      <component
        :is="item.id"
        v-if="!!item && item.visible"
        :dialog="item"
        :params="item.params"
        @dialogTitle="changeDialogTitle"
        @closeDialog="dialogConfirmClose(index)"
      />
    </el-dialog>
    {{dialogs}}12313
  </span>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
export default {
  name: 'LarDialog',
  data() {
    return {
      params: {},
      dialogConfirmCancel: false,
      dialogWidth: 0
      // dialogTitle: [],
    }
  },
  computed: {
    ...mapState({
      dialogs: state => state.larfree.dialogs
    })
  },
  methods: {
    dialogChange(visible) {
      this.$store.commit('dialog', visible)
    },
    changeDialogTitle(data) {
      // this.dialogTitle.push(val);
      if (data.dialog && data.title) {
        data.dialog.title = data.title
      }
    },
    dialogConfirmClose: function(done) {
      if (this.dialogConfirmCancel) {
        this.$confirm('是否放弃编辑内容？')
          .then(() => {
            this.$router.go(-1)
            done()
          })
          .catch(() => {})
      } else {
        this.$router.go(-1)
        done()
      }
    }

  }
}
</script>

<style scoped>

</style>
