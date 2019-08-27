<template>
  <div class="app-container">

    <!--<div class="filter-container">-->
    <!--<el-input  placeholder="Title" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />-->
    <!--<el-select  placeholder="Imp" clearable style="width: 90px" class="filter-item">-->
    <!--<el-option  :key="item" :label="item" :value="item" />-->
    <!--</el-select>-->
    <!--<el-select  placeholder="Type" clearable class="filter-item" style="width: 130px">-->
    <!--<el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key" />-->
    <!--</el-select>-->
    <!--<el-select  style="width: 140px" class="filter-item" @change="handleFilter">-->
    <!--<el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />-->
    <!--</el-select>-->
    <!--<el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">-->
    <!--Search-->
    <!--</el-button>-->
    <!--<el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">-->
    <!--Add-->
    <!--</el-button>-->

    <!--</div>-->

    <lar-list />

  </div>
</template>

<script>
import { larSchemas } from '@/api/larfree-curd'
import larList from '@/larfree/components/curd/list'
export default {
  name: 'List',
  components: {
    larList
  },
  data() {
    return {
      listLoading: true,
      schemas: []
    }
  },
  created() {
    this.fetchData('common.user')
  },
  methods: {
    fetchData(model) {
      this.listLoading = true
      larSchemas(model).then(response => {
        this.schemas = response.data
        this.listLoading = false
      })
    }
  }
}
</script>

<style scoped>

</style>
