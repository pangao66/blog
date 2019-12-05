<template>
  <pf-table
      :data="tableData"
      :columns="columns"
      :auto-loading="false"
      :total="total"
  >
  </pf-table>
</template>

<script>
// import pfTable from '../components/pf-table/pf-table'
import PfTable from '../components/pf-table/pf-table'

export default {
  name: 'page-table',
  data () {
    return {
      tableData: [
        { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' },
        { date: '2016-05-04', name: '王小虎', address: '上海市普陀区金沙江路 1517 弄' },
        { date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },
        { date: '2016-05-03', name: '王小虎', address: '上海市普陀区金沙江路 1516 弄' }
      ],
      total: 30
    }
  },
  computed: {
    columns () {
      return [
        { prop: 'date', label: '日期', attrs: { width: 180 } },
        { prop: 'name', label: '姓名', attrs: { width: 180 } },
        { prop: 'address', label: '地址', attrs: { width: 180 } }
      ]
    }
  },
  components: {
    PfTable
  }
}
</script>

<style scoped>

</style>
