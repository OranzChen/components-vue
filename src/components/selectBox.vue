<template>
  <el-select class="select-box"
             :value="value ||''"
             v-bind="$attrs"
             multiple
             filterable
             clearable
             :placeholder="placeholder"
             @input="$emit('input',$event)">
    <div class="optionsList">
      <el-option v-for="(item,index) in options"
                 :key="index"
                 :label="arrayType==='string'?item:item[label]"
                 :value="arrayType==='string'?item:item[code]" />
    </div>
    <div class="selectButtons">
      <el-button type="primary"
                 size="mini"
                 @click="handleReverse">反选</el-button>
      <el-button type="primary"
                 size="mini"
                 @click="handleSelectAll">全选</el-button>
      <el-button size="mini"
                 @click="cancelSelect">重置</el-button>
    </div>

  </el-select>
</template>
<script>
export default {
  props: {
    value: {
      type: [String, Array, Object, Number]
    },
    options: {
      type: Array,
      default: () => { return [] }
    },
    arrayType: {
      default: 'object'
    },
    placeholder: {
      default: '请选择'
    },
    label: String,
    code: String

    // type:{
    //   default: true
    // }
  },
  data() {
    return {
      checkList: []
    }
  },
  methods: {
    handleSelectAll() {
      let newChecked = []
      if (this.arrayType === 'string') {
        newChecked = this.options
      } else {
        newChecked = this.options.map((item) => { return item[this.code] })
      }
      this.$emit('input', newChecked)
    },
    handleReverse() {
      // this.checkList = []
      const string = this.arrayType === 'string'
      const newChecked = []
      this.options.forEach(list => {
        const value = string ? list : list[this.code]
        if (!this.value.includes(value)) {
          newChecked.push(value)
        }
      })
      this.$emit('input', newChecked)
    },
    cancelSelect() {
      this.$emit('input', [])
    }
  }
}
</script>
<style lang='scss' scoped>
.select-box {
  // width: 100%;
  // /deep/.el-select__tags {
  //   width: 100%;
  //   max-height: 131px;
  //   overflow: auto;
  // }
  /deep/.el-popover__reference {
    width: 100%;
  }
}

/deep/.el-checkbox {
  display: block;
  margin-bottom: 6px;
}
.el-checkbox-group {
  width: 398px;
}
// /deep/.el-popover {
//   width: 398px;
// }
.selectButtons {
  padding: 10px;
  text-align: center;
  background: #ffffff;
}
/deep/.el-select-dropdown__list {
  padding-bottom: 50px;
}
.optionsList {
  height: 190px;
  overflow: auto;
}
</style>
