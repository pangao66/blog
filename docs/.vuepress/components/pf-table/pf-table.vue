<template>
  <div>
    <t-form
        v-if="formItems.length"
        v-bind="formOptions"
        :form-items="formItems"
        :is-search-form="true"
        @search="search"
        @reset="reset"
        @form-change="formChange"
        inline
    >
      <template v-for="slot in formSlots" :slot="slot" slot-scope="{ item ,form}">
        <slot :name="item.slot" :form="form" :item="item"></slot>
      </template>
    </t-form>
    <slot name="form-after"></slot>
    <el-table
        style="width:100%"
        v-loading="loading" :data="data" v-on="$listeners" v-bind="$attrs" :class="tableClass"
              :style="tableStyle"
    >
      <template v-for="(col,index) in tableColumns">
        <!-- 无列slot情况-->
        <el-table-column
            v-if="!col.slot"
            :key="index"
            :prop="col.prop"
            :label="col.label"
            v-bind="col.attrs||{}"
            :formatter="(row,column,cellValue,index)=>formatCell(row,column,cellValue,index,col.formatter)"
        >

          <template slot="header" slot-scope="scope">
            {{col.label}}
            <template v-if="col.headerSlot || col.tip">
              <template v-if="col.tip">
                <el-tooltip class="item" effect="dark" :content="col.tip" placement="top">
                  <i class="el-icon-question"></i>
                </el-tooltip>
              </template>
              <slot :name="col.headerSlot" :scope="scope" v-if="col.headerSlot"></slot>
            </template>
          </template>
        </el-table-column>
        <!--有列slot情况-->
        <el-table-column
            v-else
            :key="index"
            :label="col.label"
            v-bind="col.attrs||{}"
            :formatter="(row,column,cellValue,index)=>formatCell(row,column,cellValue,index,col.formatter)"
        >
          <template slot-scope="scope">
            <!--自定义列 模板写法-->
            <template v-if="!col.slot.renderFn">
              <slot :name="col.slot" :scope="scope"></slot>
            </template>
            <!--自定义列 render写法-->
            <template v-else>
              {{col.slot.renderFn(scope)}}
              <!--            <VNodes :vnodes="col.slot.renderFn(scope)"></VNodes>-->
            </template>
          </template>
          <!-- 列头部slot-->
          <template slot="header" slot-scope="scope">
            {{col.label}}
            <template v-if="col.headerSlot || col.tip">
              <template v-if="col.tip">
                <el-tooltip class="item" effect="dark" :content="col.tip" placement="top">
                  <i class="el-icon-question"></i>
                </el-tooltip>
              </template>
              <slot :name="col.headerSlot" :scope="scope" v-if="col.headerSlot"></slot>
            </template>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :total="total"
        v-bind="pageInfo"
        style="text-align:center;"
        v-if="pagination"
    >
      <slot name="pagination-slot"></slot>
    </el-pagination>
  </div>
</template>

<script>
import { formatDate } from 'element-ui/lib/utils/date-util'
import NP from 'number-precision'
import TForm from './t-form'

export default {
  name: 'pf-table',
  props: {
    columns: {
      required: true,
      default: () => []
    },
    data: {
      required: true,
      default: () => []
    },
    tableClass: {
      type: [String, Array, Object, Function]
    },
    tableStyle: {
      type: [String, Array, Object, Function]
    },
    formItems: {
      type: Array,
      default: () => []
    },
    formOptions: {
      type: Object,
      default: () => {}
    },
    pagination: {
      type: Boolean,
      default: true
    },
    pageConfig: {
      type: Object,
      default: () => {}
    },
    total: {
      type: Number,
      default: 10
    },
    initGetData: {
      type: Boolean,
      default: true
    },
    syncFormQuery: {
      type: Boolean,
      default: true
    },
    autoLoading: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      pageInfo: {
        layout: 'total, sizes, prev, pager, next, jumper',
        pageSize: 10,
        currentPage: 1,
        pageSizes: [10, 20, 50, 100]
      },
      searchQuery: {},
      formData: {},
      loading: false
    }
  },
  created () {
    this.pageInfo = { ...this.pageInfo, ...this.pageConfig }
    if (this.initGetData) {
      this.getTableData()
    }
  },
  methods: {
    handleCurrentChange (val) {
      this.pageInfo.currentPage = val
      this.getTableData()
    },
    handleSizeChange (val) {
      this.pageInfo.pageSize = val
      this.pageInfo.currentPage = 1
      this.getTableData()
    },
    getTableData () {
      if (this.autoLoading) {
        this.loading = true
      }
      this.$emit('get-table-data', {
        ...this.currentPageInfo,
        ...this.formQuery,
        done: () => {
          this.loading = false
        }
      })
    },
    search (formData) {
      this.searchQuery = { ...formData }
      this.pageInfo.currentPage = 1
      this.getTableData()
    },
    reset () {
      this.searchQuery = {}
      this.pageInfo.currentPage = 1
      this.getTableData()
    },
    formChange (val) {
      this.formData = { ...val }
    },
    formatCell (row, column, cellValue, index, formatter) {
      if (cellValue === null || cellValue === '' || typeof cellValue === 'undefined') {
        return '-'
      }
      if (!formatter) {
        return cellValue
      }
      const type = typeof formatter
      if (type === 'function') {
        return formatter({ row, column, cellValue, index })
      }
      if (type === 'string') {
        switch (formatter) {
          case 'date':
            return formatDate(cellValue, 'yyyy-MM-dd')
          case 'time':
            return formatDate(cellValue, 'yyyy-MM-dd hh:mm:ss')
          case 'money': // 金额三位分割
            return cellValue.toLocaleString()
          case 'point2': // 保留两位小数
            return NP.round(cellValue, 2)
          case 'rmb': // 人民币分变成元
            return NP.round(NP.divide(cellValue, 100), 2)
          default :
            return cellValue
        }
      }
      if (type === 'object') {
        if (formatter.type && formatter.type === 'date') {
          return formatDate(cellValue, formatter.content)
        }
      }
      return cellValue
    }
  },
  computed: {
    currentPageInfo () {
      const { pageSize, currentPage } = this.pageInfo
      return {
        pageSize, currentPage
      }
    },
    tableColumns () {
      return this.columns.filter((item) => !item.hidden)
    },
    formQuery () {
      return this.syncFormQuery ? this.formData : this.searchQuery
    },
    formSlots () {
      const formItems = this.formItems
      let list = []
      formItems.forEach((item) => {
        if (item.slot) {
          list.push(item.slot)
        }
      })
      return list
    }
  },
  components: {
    TForm,
    // eslint-disable-next-line vue/no-unused-components
    VNodes: {
      functional: true,
      render: (h, ctx) => {
        return ctx.props.vnodes()
      }
    }
  }
}
</script>

<style scoped>

</style>
