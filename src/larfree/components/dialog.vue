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
      :before-close="(done)=>dialogConfirmClose(done,index)"
      @closed="closeEnd"
    >
      <component
        :is="item.id"
        v-if="!!item && item.visible"
        :dialog="item"
        :params="item.params"
        @dialogTitle="changeDialogTitle"
        @dialogLock="(event)=>dialogLock(event,index)"
        @closeDialog="dialogClose(index)"
      />
    </el-dialog>
  </span>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'LarDialog',
  data() {
    return {
      params: {},
      dialogConfirmCancel: [],
      dialogWidth: 0,
      isPhone: false,
      lock: false
      // dialogTitle: [],
    }
  },

  computed: {
    ...mapState({
      dialogs: state => state.larfree.dialogs
    })
  },
  created() {
    // 判断是不是手机版, 调整弹窗的样式
    const ua = navigator.userAgent
    const ipad = ua.match(/(iPad).*OS\s([\d_]+)/)
    const isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/)
    const isAndroid = ua.match(/(Android)\s+([\d.]+)/)
    const isMobile = isIphone || isAndroid
    // console.info('isMobile',isMobile);
    if (isMobile) {
      this.isPhone = true
      // this.isCollapse = true;
    } else {
      this.isPhone = false
      // this.isCollapse = false;
    }
  },
  methods: {
    // dialogChange(visible) {
    //   console.log(visible)
    //   this.$store.commit('dialog', visible)
    // },
    closeEnd() {

    },
    /**
     * 锁定弹窗,避免误操作.
     */
    dialogLock(event, index) {
      this.dialogConfirmCancel[index] = event
    },
    changeDialogTitle(data) {
      // this.dialogTitle.push(val);
      if (data.dialog && data.title) {
        data.dialog.title = data.title
      }
    },
    dialogClose(index) {
      this.dialogs[index].visible = 0
    },
    dialogConfirmClose: function(done, index) {
      done()
      // console.log('close',index);
      // console.log(index);
      // if (this.dialogConfirmCancel[index]) {
      //   this.$confirm('是否放弃编辑？')
      //     .then(() => {
      //       done()
      //     })
      //     .catch(() => {})
      // } else {
      //   done()
      // }
    }

  }
}
</script>

<style scoped>

</style>
