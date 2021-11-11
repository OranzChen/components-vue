<template>
  <div :class="[collapse?'collapse':'noCollapse']">
    <i :class="['el-icon-caret-right',collapse?'rotate0':'rotate90']"
       @click="changeCollapse"
       v-if="hasChildren"></i>
    <el-checkbox v-model="item.checked"
                 @change="changeChecked"
                 :indeterminate="isIndeterminate">{{item[label]}}</el-checkbox>
    <slot />

  </div>
</template>


<script>
export default {
  name: 'OpCheckbox',
  props: {
    item: {
      type: Object,
      required: true
    },
    props: {
      type: Object,
      default: () => { return {} }
    },
    parentNode: {
      type: Object,
      default: () => { return {} }
    }
  },
  data() {
    return {
      isIndeterminate: false,
      collapse: true,
      length: 0
    }

  },
  created() {
  },
  watch: {
    parentNode: {
      handler() {
        this.checkedStatus()
      },
      immediate: true,
      deep: true
    },
  },
  computed: {
    hasChildren() {
      return this.item[this.children] && this.item[this.children].length
    },
    childNodes() {
      if (this.hasChildren) { return this.item[this.children] }
      return []
    },
    // changeIndeterminate
    // isIndeterminate() {
    //   // const status = this.checkedStatus()
    //   // return status === 'childSelect'
    //   return true
    // },
    checked: {
      get() {
        console.log(this.item)
        return this.item.checked && !this.isIndeterminate
      },
      set() {
        debugger
        this.item.checked = !this.item.checked

      }
    },
    children() {
      return this.props.children
    },
    label() {
      return this.props.label
    }
  },
  methods: {
    checkedStatus() {
      let checked = 0
      if (!!this.childNodes) {
        this.childNodes.forEach((n) => { if (n.checked) checked++ })
        // checked = this.childNodes.filter((n) => { return n.checked })

        if (checked > 0 && checked < this.childNodes.length) {
          this.isIndeterminate = true
          // this.item.checked = false
          // return 'childSelect'
        } else if (!checked) {
          // this.item.checked = false

          this.isIndeterminate = false
          // this.$set(this.item, 'checked', false)
          this.item.checked = false

          // return 'clear'
        } else if (checked === this.childNodes.length) {
          this.isIndeterminate = false
          this.item.checked = true
          // return 'selectAll'

        }
      }
    },
    changeCollapse() {
      this.collapse = !this.collapse
    },
    changeChecked(value) {
      this.setSelectChecked(this.item, value)
      // if (value) {

      // } else {

      // }
    },
    setSelectChecked(data, value) {
      const children = this.children
      const hasChildren = data[this.children] && data[this.children].length
      if (hasChildren) {
        data[children].forEach(box => {
          this.$set(box, 'checked', value)
          this.setSelectChecked(box, value)
        })
      }
    },
    selectedLength() {


    },
    isSelectAll() {

    }
  }
}
</script>
<style lang="scss" scoped>
.childNode {
  margin-left: 20px;
}
.rotate90 {
  transform: rotate(90deg);
  transition: -webkit-transform 0.5s;
}
.rotate0 {
  transform: rotate(0deg);
  transition: -webkit-transform 0.5s;
}
.collapse + div {
  color: red;
  // height: 0;
  // overflow: auto;
}
</style>