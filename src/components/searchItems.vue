<template>
  <div>
    <div class="content-header">
      <div class="searchItem">
        <div v-for="{label,value,type,options,width} in searchConfig"
             :key="label"
             class="items">
          <label>{{ label }}：</label>
          <template v-if="type ==='dateTime'">
            <el-date-picker v-model="searchItems[value]"
                            @change="changeValue"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始时间"
                            end-placeholder="结束时间"
                            format="yyyy-MM-dd HH:mm:ss"
                            value-format="yyyy-MM-dd HH:mm:ss">
            </el-date-picker>
          </template>
          <!-- 级联选择器 -->
          <template v-else-if="type ==='cascader'">
            <el-cascader v-model="searchItems[value]"
                         style="width:300px"
                         :options="options"
                         :props="{label:'resName',value:'resNum',checkStrictly:true}"
                         clearable
                         filterable
                         @change="changeValue"></el-cascader>
          </template>
          <op-input v-else
                    v-model.trim="searchItems[value]"
                    :placeholder="`请${type === 'select'?'选择':'输入'}${label}`"
                    :label="type"
                    :width="width || 200"
                    :options="options"
                    optionLabel="label"
                    optionValue="value"
                    @clearField="clearField" />
        </div>
        <div class="buttons">
          <slot :searchItems="searchItems" />
          <slot name="addNew" />
        </div>
      </div>

    </div>
    <!-- <div class="content-header">
      <div>
        <slot name="addNew" />
      </div>
    </div> -->
  </div>
</template>
<script>
import OpInput from '@/components/opInput'

export default {
  components: {
    OpInput
  },
  props: {
    searchConfig: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      searchItems: {
        // time: [
        //   new Date(new Date().getTime()),
        //   new Date(new Date(new Date()).getTime() + (23 * 60 * 60 * 1000 + 59 * 60 * 1000 + 59 * 1000))
        // ]
      },
      // cascaderValue: []
    }
  },
  methods: {
    clearField() {
      this.$emit('clearField', this.searchItems)
    },
    resetSearchItems() {
      this.searchItems = {}
    },
    changeValue(value) {
      if (!value) {
        this.clearField()
      }
    }
  }

}
</script>
<style scoped lang="scss">
.content-header {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  margin-bottom: 20px;
}
.searchItem {
  display: flex;
  flex-wrap: wrap;
  .items {
    margin-top: 10px;
    margin-right: 10px;
    display: flex;
    label {
      display: block;
      color: #505154;
      width: 151px;
      text-align: right;
      line-height: 41px;
    }
  }
  .buttons {
    margin: 10px 0 0 50px;
  }
}
</style>
