<template>
  <div :class="{'hidden':hidden}"
       class="pagination-container">
    <el-pagination :class="{'not-display': notLastPage}"
                   :background="background"
                   :current-page.sync="currentPage"
                   :page-size.sync="limit"
                   :layout="layout"
                   :page-sizes="pageSizes"
                   :total="total"
                   v-bind="$attrs"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange" />
  </div>
</template>

<script>
// import { scrollTo } from '@/utils/scroll-to'
export default {
  name: 'Pagination',
  props: {
    total: {
      required: true,
      type: Number
    },
    pageSize: {
      type: Number,
      default: 10
    },
    background: {
      type: Boolean,
      default: false
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    },
    brief: {
      type: Boolean,
      default: false
    },
    notImmediate: {
      type: Boolean,
      default: false
    },
    notLastPage: {
      type: Boolean,
      default: false
    },
    defaultPageSizes: {
      type: Array,
      default: () => { return [10, 20, 30, 50] }
    }
  },
  data() {
    return {
      currentPage: 1,
      pageSizeLimit: this.pageSize,
      pageSizes: this.defaultPageSizes,
      layout: this.brief ? 'total, prev, pager, next' : 'total, prev, pager, next, sizes, jumper'
    }
  },
  computed: {
    limit: {
      get() {
        return this.pageSizeLimit
      },
      set(val) {
        this.pageSizeLimit = val
      }
    }
  },
  watch: {
    pageSize(val) {
      this.pageSizeLimit = val
    }
  },
  mounted() {
    if (!this.notImmediate) {
      this.$emit('pagination', { pageNo: 1, pageSize: this.limit })
    }
  },
  methods: {
    reSetCurrentPage() {
      this.currentPage = 1
    },
    refresh() {
      this.currentPage = 1
      this.handleCurrentChange(this.currentPage)
    },
    handleSizeChange(val) {
      this.currentPage = 1
      this.$emit('pagination', { pageNo: 1, pageSize: val })
      // if (this.autoScroll) {
      //   scrollTo(0, 800)
      // }
    },
    handleCurrentChange(val) {
      this.$emit('pagination', { pageNo: val, pageSize: this.limit })
      // if (this.autoScroll) {
      //   scrollTo(0, 800)
      // }
    },
    handlePresentChange(val) {
      this.$emit('pagination', { pageNo: this.currentPage, pageSize: this.limit })
      // if (this.autoScroll) {
      //   scrollTo(0, 800)
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination-container {
  background: #fff;
  display: flex;
  justify-content: flex-end;
  padding: 20px 0;

  .not-display {
    /deep/.btn-quicknext {
      display: none;
      & + li {
        display: none;
      }
    }
  }
}
.pagination-container.hidden {
  display: none;
}
</style>
