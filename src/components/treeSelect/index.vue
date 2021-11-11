<template>
  <div>
    <div v-for="checkbox in data"
         class="checkbox">
      <op-checkbox :item="checkbox"
                   :props="props"
                   :parentNode="checkbox" />
      <div v-if="checkbox[props.children] && checkbox[props.children].length"
           class="childNode">
        <tree-select :data="checkbox[props.children]"
                     :props="props" />
      </div>
    </div>

  </div>
</template>
<script>
import OpCheckbox from './opCheckbox'
export default {
  name: 'TreeSelect',
  components: {
    OpCheckbox
  },
  props: {
    data: {
      type: Array,
      required: true
    },

    defaultProps: {
      type: Object,
      default: () => { return {} }
    }
  },
  // data() {


  // },
  computed: {
    props() {
      const { children, label, disabled, isLeaf } = this.defaultProps
      return {
        children: children || 'children',
        label: label || 'label',
        disabled: disabled || 'disabled',
        isLeaf: isLeaf || 'isLeaf'
      }
    }
  },
}
</script>
<style lang="scss" scoped>
.childNode {
  margin-left: 30px;
}
.rotate90 + .childNode {
  height: 0;
  overflow: auto;
}
.checkbox /deep/.collapse + .childNode {
  height: 0;
  // transition: height 0.5s;
  overflow: auto;
}
.checkbox /deep/.noCollapse + .childNode {
  height: 100%;
  // transition: height 0.5s;
}
</style>