<template>
  <div>
    <p class="cardName">发布范围</p>
    <div class="flex">
      <el-form-item label="机型"
                    prop="modelLimit"
                    :rules="[{ required: true, message: '请选择机型', trigger: 'change' }]">
        <op-input v-model="form.modelLimit"
                  type="select"
                  :options="limitList" />
      </el-form-item>
      <el-form-item label="ColorOS版本"
                    prop="colorosLimit"
                    :rules="[{ required: true, message: '请选择ColorOS版本', trigger: 'change' }]">
        <op-input v-model="form.colorosLimit"
                  type="select"
                  :options="limitList" />
      </el-form-item>
    </div>
    <div class="flex">
      <el-form-item label="指令版本"
                    prop="commandLimit"
                    :rules="[{ required: true, message: '请选择指令版本', trigger: 'change' }]">

        <op-input v-model="form.commandLimit"
                  type="select"
                  :options="limitList"></op-input>

      </el-form-item>
      <el-form-item label="Android版本"
                    prop="androidLimit"
                    :rules="[{ required: true, message: '请选择指令版本', trigger: 'change' }]">

        <op-input v-model="form.androidLimit"
                  type="select"
                  :options="limitList"></op-input>

      </el-form-item>
    </div>
    <!-- 限制选择—————————————————————————————————————— -->
    <el-form-item v-if="form.modelLimit"
                  label="机型限制"
                  prop="modelDetail"
                  :rules="[{ required: true, message: '请选择机型限制', trigger: 'change' }]">
      <op-input v-model="form.modelDetail"
                type="textarea"
                placeholder=""
                :width="550"
                disabled
                :rows="4"
                resize="none" />
      <el-button type="primary"
                 class="selectBbtn"
                 @click="chooseLimit('modelList')">选择</el-button>
    </el-form-item>
    <el-form-item v-if="form.colorosLimit"
                  label="ColorOS版本限制"
                  prop="colorosDetail"
                  :rules="[{ required: true, message: '请选择ColorOS版本限制', trigger: 'blur' }]">
      <op-input v-model="form.colorosDetail"
                type="textarea"
                placeholder=""
                :width="550"
                disabled
                :rows="4"
                resize="none" />
      <el-button type="primary"
                 class="selectBbtn"
                 @click="chooseLimit('colorosList')">选择</el-button>
    </el-form-item>
    <el-form-item v-if="form.commandLimit"
                  label="指令版本限制"
                  prop="commandDetail"
                  :rules="[{ required: true, message: '请选择指令版本限制', trigger: 'blur' }]">
      <op-input v-model="form.commandDetail"
                type="textarea"
                placeholder=""
                :width="550"
                disabled
                :rows="4"
                resize="none" />
      <el-button type="primary"
                 class="selectBbtn"
                 @click="chooseLimit('commandList')">选择</el-button>
    </el-form-item>
    <el-form-item v-if="form.androidLimit"
                  label="安卓版本限制"
                  prop="androidDetail"
                  :rules="[{ required: true, message: '请选择指令版本限制', trigger: 'blur' }]">
      <op-input v-model="form.androidDetail"
                type="textarea"
                placeholder=""
                :width="550"
                disabled
                :rows="4"
                resize="none" />
      <el-button type="primary"
                 class="selectBbtn"
                 @click="chooseLimit('androidList')">选择</el-button>
    </el-form-item>
    <op-muti-table ref="muliTable"
                   :dialogVisible.sync="dialogVisible"
                   :col="type"
                   :tableData="tableData"
                   :total="total"
                   :selected="selectedList"
                   @refreshTable="chooseLimit"
                   @handelSelected="handelSelected" />
  </div>
</template>
<script>
import OpInput from '@/views/components/opInput'
import OpMutiTable from '@/views/components/opMutiTable'
import { limitList } from '@/views/components/variable'
import { modelList, colorosList, commandList, androidList } from '@/api/common.api'

export default {
  props: {
    form: {
      required: true
    },

  },
  components: {
    OpInput,
    OpMutiTable
  },
  data() {
    return {
      limitList,
      modelList,
      colorosList,
      commandList,
      androidList,
      dialogVisible: false,
      type: '',
      selectedList: [],
      tableData: [],
      total: 12
    }
  },
  methods: {
    chooseLimit(type, params = { page: 1, pageSize: 10, keyWord: '' }) {
      // 获取
      this.type = type
      this[type](params).then(({ data }) => {
        this.tableData = data.list.map((n) => { return { id: n.versionCode || n } })
        this.total = data.total
        // this.$refs.muliTable.dialogVisible = true
        this.dialogVisible = true

        // 构建回显的数据结构
        this.selectedList = []
        if (this.form[type]) this.selectedList.push(...this.form[type].map((n) => { return { id: n } }))

      })

    },
    handelSelected(selection) {
      this.form[this.type] = selection.map((n) => { return n.id })
      let selectedList = this.form[this.type].join('、')
      // 传给后台的是数组，展示的时候需要用（、）号连接、用另一个type+Detail字段做展示
      // 在校验的时候使用join成字符串的字段去校验，避免vue无法监听深层数组变化导致校验失败的bug
      let showDetail = this.type.replace(/List/, 'Detail')
      this.$set(this.form, showDetail, selectedList)
      this.dialogVisible = false
    }
  }

}
</script>
<style scoped>
.flex {
  display: flex;
  justify-content: space-between;
}
.selectBbtn {
  margin-left: 50px;
  vertical-align: top;
}
</style>