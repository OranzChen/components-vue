<template>
  <el-dialog :title="title"
             :visible.sync="dialogVisible"
             :close-on-click-modal="false"
             :show-close="false"
             :width="`${width}px`">
    <div style="margin-bottom:20px">
      <el-input v-model="keyWord"
                clearable=""
                style="width:200px"
                @clear="clearKeyWord" />
      <el-button class="searchBtn"
                 type="primary"
                 @click="search">搜索</el-button>
    </div>

    <el-table ref="multipleTable"
              :data="tableData"
              border
              size="mini"
              top="2vh"
              style="width: 100%;maxHeight:450px;overflow:auto"
              :row-key="rowKeyFunc"
              @selection-change="handleSelectionChange"
              @select="handleSelect"
              @select-all="handleSelectAll">
      <el-table-column type="selection"
                       :reserve-selection="true"
                       width="55" />
      <el-table-column v-for="{type,prop,label,width,render} in columns"
                       :type="type"
                       :label="label"
                       :prop="prop"
                       :width="width"
                       :formatter="render" />
    </el-table>
    <pagination ref="pagination"
                not-last-page
                :total="total"
                not-immediate
                @pagination="refreshTable" />
    <div v-if="showSelectDetail&&!!selectedList.length"
         class="selectDetail">
      <p>已选择：</p>
      <p>{{ selectedList.map(n=> {return n.id}).join('、') }}</p>
    </div>
    <span slot="footer"
          class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary"
                 @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
// import OpSeletTable from './opSeletTable'
import columnConfigs from './column.config'
import Pagination from '@/components/Pagination'

export default {
  components: {
    Pagination
  },
  mixins: [columnConfigs],
  props: {
    title: {
      type: String,
      default: '选择'
    },
    dialogVisible: {
      required: true
    },
    // 由于在当前组件使用dialogVisible来控制弹窗，所以会导致数据传给父组件后，父组件的试图没有更新，通过操作这个值让父组件视图
    // syncData: {},
    col: {
      type: String,
      required: true
    },
    tableData: {
      type: Array,
      required: true
    },
    total: {
      type: Number,
      default: 0
    },
    selected: {
      type: Array,
      default: () => { return [] }
    },
    width: {
      type: String,
      default: '800'
    },
    showSelectDetail: {
      type: Boolean,
      default: true
    },
    type: {

    },
    echoData: {
      type: Array
    }
  },
  data() {
    return {
      keyWord: '',
      selectedList: []
      // dialogVisible: false
    }
  },
  computed: {
    columns() {
      return this[this.col]
    }
  },
  watch: {
    dialogVisible(value) {
      if (value) {
        this.selectedList = [...this.selected]
      } else {
        this.keyWord = ''
        this.selectedList = []
        this.$refs.pagination.currentPage = 1
        this.$refs.multipleTable.clearSelection()
      }
    },
    tableData: {
      handler() {
        // 页面的数据每次变化的时候，都看下有哪些数据需要回显
        const selected = this.selectedList.map(n => { return n.id })
        if (selected) {
          this.$nextTick((data) => {
            this.tableData.forEach((row) => {
              if (selected.includes(row.id)) {
                this.$refs.multipleTable.toggleRowSelection(row, true)
              } else {
                this.$refs.multipleTable.toggleRowSelection(row, false)
              }
            })
          })
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    search() {
      this.$refs.pagination.currentPage = 1
      const params = {
        page: 1,
        pageSize: this.$refs.pagination.pageSize,
        keyWord: this.keyWord
      }
      console.log(params)
      this.$emit('refreshTable', this.col, params)
    },
    clearKeyWord() {
      this.search()
    },
    cancel() {
      this.$emit('update:dialogVisible', false)
      // this.dialogVisible = false
    },
    submit() {
      this.$emit('handelSelected', this.selectedList)
      // this.$emit('update:dialogVisible', false)
      this.cancel()
    },
    refreshTable(pagination) {
      const params = {
        page: pagination.page,
        pageSize: pagination.pageSize,
        keyWord: this.keyWord
      }
      this.$emit('refreshTable', this.col, params)
    },
    handleSelect(selection) {
      console.log('handleSelect', selection)
      this.changeSelectedRow(selection)
    },
    handleSelectAll(selection) {
      console.log('handleSelectAll', selection)
      this.changeSelectedRow(selection)
    },
    handleSelectionChange(selection) {
      // console.log('SelectionChange', selection)
    },
    changeSelectedRow(selection) {
      const oldSelection = this.selectedList.map((n) => { return n.id })
      // 对比，之前不存在的就加入
      if (selection.length > oldSelection) {
        selection.forEach((item) => {
          if (!oldSelection.includes(item.id)) {
            this.selectedList.push(item)
          }
        })
      } else {
        // 如果selection.length<this.selectedList.length 是取消选中，选中的数据直接为selection
        this.selectedList = []
        this.selectedList.push(...selection)
      }
    },
    rowKeyFunc(row) {
      return row.id
    }
  }

}
</script>
<style scoped>
.selectDetail {
  color: #ff5555;
  padding: 5px;
  border-top: 1px solid #ebeef5;
  border-bottom: 1px solid #ebeef5;
}
</style>
