<template>
  <el-input v-if="label !== 'select'"
            :disabled="pageType === 'info'"
            v-bind="$attrs"
            :value="value"
            :placeholder="`${placeholder}`"
            :style="{width:`${width}px`}"
            :clearable="clearable"
            @clear="clearField"
            @input="$emit('input', $event)" />
  <el-select v-else
             v-bind="$attrs"
             :value="value"
             :disabled="pageType === 'info'"
             :style="{width:`${width}px`}"
             :placeholder="`请选择`"
             :clearable="clearable"
             @clear="clearField"
             @input="$emit('input', $event)">
    <el-option v-for="(item,index) in $attrs.options"
               :key="index"
               :value="(objVal || arrayType==='string')?item:item[optionValue]"
               :label="(objVal || arrayType!=='string')?item[optionLabel]:item">{{(objVal || arrayType!=='string')?item[optionLabel]:item}}</el-option>
  </el-select>
</template>
<script>
export default {
  inject: {
    pageType: {
      default: 'new'
    }
  },
  props: {
    value: {},
    label: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    clearable: {
      type: Boolean,
      default: true
    },
    width: Number,
    // 下拉选择器的时候，下拉选项的数组类型
    arrayType: String,
    // 是否要返回整个对象
    objVal: Boolean,
    // 对象数组时的lable字段
    optionLabel: String,
    // 对象数组时的value字段
    optionValue: String
  },
  methods: {
    clearField() {
      if (this.clearable) {
        this.$emit('clearField')
      }
    }
  }
}
</script>
