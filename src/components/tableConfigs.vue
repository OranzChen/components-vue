<template>
  <div class="content-body">
    <search-items ref="search"
                  :search-config="searchConfig"
                  @clearField="search">
      <!-- <template v-slot:addNew>
        <el-button type="primary"
                   @click="addNew">新增</el-button>
      </template> -->
      <template v-slot:default="searchItems">
        <el-button class="searchBtn"
                   type="primary"
                   @click="search(searchItems)">查询</el-button>
        <el-button class="searchBtn"
                   @click="reset">重置</el-button>
      </template>
    </search-items>

    <slot>
      <div class="rightLine">
        <el-button v-if="isAddNew"
                   type="primary"
                   @click="addNew">新增</el-button>
        <el-button v-if="multiple"
                   type="primary"
                   @click="deleteRows">删除</el-button>
      </div>
    </slot>
    <p class="tip"
       v-if="multiple">已选择 {{ selectedList.length }} 条</p>
    <el-table ref="table"
              :data="tableData"
              :header-cell-style="headerStyle"
              border
              :row-key="rowKeyFunc"
              @select="handleSelect"
              @select-all="handleSelectAll">
      <el-table-column v-if="multiple"
                       type="selection"
                       :reserve-selection="true"
                       width="55" />
      <el-table-column v-for="{ type, prop, label, width, render } in columns"
                       :key="label"
                       :type="type"
                       :label="label"
                       :prop="prop"
                       :width="width"
                       :formatter="render" />
    </el-table>
    <div>
      <pagination ref="pagination"
                  not-last-page
                  :total="total"
                  not-immediate
                  @pagination="refreshTable" />
    </div>
  </div>
</template>
<script>
import SearchItems from "@/components/searchItems";
import Pagination from "./Pagination";

export default {
  components: {
    SearchItems,
    Pagination,
  },
  props: {
    columns: {
      type: Array,
      default: () => {
        return [];
      },
    },
    tableData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    total: {
      type: Number,
      default: 0,
    },
    searchConfig: {
      type: Array,
      required: true,
    },
    downloadLink: {
      type: String,
      default: "",
    },
    multiple: Boolean,
    rowKey: [String, Number],
    // 是否显示新增按钮
    isAddNew: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      headerStyle: { backgroud: "red" },
      selectedList: [],
    };
  },
  computed: {
    searchParams: {
      get() {
        return this.$refs.search.searchItems;
      },
      set() { },
    },
    // searchParams() {

    // }
  },
  methods: {
    addNew() {
      this.$emit("addNew");
    },
    search(items) {
      this.$emit("refreshTable", {}, this.searchParams);
    },
    reset() {
      this.$refs.search.resetSearchItems();
      this.$emit("refreshTable", {}, this.searchParams);
    },
    refreshTable(pagination) {
      this.$emit("refreshTable", pagination, this.searchParams);
    },
    download() {
      const a = document.createElement("a");
      a.href = this.downloadLink;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
    deleteRows() {
      this.$emit("del", this.selectedList);
    },
    rowKeyFunc(row) {
      return row[this.rowKey];
    },
    handleSelect(selection) {
      // this.changeSelectedRow(selection)
      this.selectedList = selection;
    },
    handleSelectAll(selection) {
      this.selectedList = selection;
      // this.changeSelectedRow(selection)
    },
    clearSelection() {
      this.$refs.table.clearSelection();
      this.selectedList = [];
    },
  },
};
</script>
<style scoped>
.rightLine {
  text-align: right;
  margin-bottom: 10px;
}
.tip {
  font-size: 14px;
  padding-bottom: 10px;
  color: #909399;
}
</style>
