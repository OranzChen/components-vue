<template>
  <div class="Cascader-container">
    <el-cascader
      :options="menuOptions"
      :props="defaultProps"
      clearable
      @change="remoteMethod"
      :show-all-levels="false"
      ref='enum_right'
    ></el-cascader>
  </div>
</template>

<script>
export default {
  name: "Cascader",
  props: {
    defaultProps: {
      required: true,
      type: Object,
    },
    menuOptions: {
      required: true,
      type: Array,
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    remoteMethod(val) {
      this.$emit("remoteMethod", val);
    },
    reset() {
      let obj = {};
      obj.stopPropagation = () => {};
      try {
        this.$refs.enum_right.clearValue(obj);
      } catch (err) {
        this.$refs.enum_right.handleClear(obj);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
