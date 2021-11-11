export default {
  data() {
    return {
      modelList: [
        { type: 'index', label: '序号', width: 100 },
        {
          prop: 'id', label: '机型', render: (row, column, cellValue) => {
            return (<span>{cellValue}</span>)
          }
        },
      ],
      colorosList: [
        { type: 'index', label: '序号', width: 100 },
        {
          prop: 'id', label: '版本名称', render: (row, column, cellValue) => {
            return (<span>{cellValue}</span>)
          }
        }
      ],
      commandList: [
        { type: 'index', label: '序号', width: 100 },
        {
          prop: 'id', label: '版本名称', render: (row, column, cellValue) => {
            return (<span>{cellValue}</span>)
          }
        }
      ],
      androidList: [
        { type: 'index', label: '序号', width: 100 },
        {
          prop: 'id', label: '版本名称', render: (row, column, cellValue) => {
            return (<span>{cellValue}</span>)
          }
        }
      ],
      instruction: [
        { prop: 'commandName', label: '指令名称' },
        { prop: 'title', label: '标题' },
        {
          prop: 'status', label: '状态', render: (row, column, cellValue) => {
            return (<span>{cellValue === 1 ? '测试' : cellValue === 2 ? '上线' : '下线'}</span>)
          }
        },
        { prop: 'commandDescription', label: '描述' },
        {
          prop: 'os11IconUrl', label: 'os11图标', render: (row, column, cellValue) => {
            return (<img class="tableImg" src={cellValue} />)
          }
        },
        {
          prop: 'os12IconUrl', label: 'os12图标', render: (row, column, cellValue) => {
            return (<img class="tableImg" src={cellValue} />)
          }
        },
        {
          prop: 'type', label: '类型', render: (row, column, cellValue) => {
            return (<span>{cellValue === 1 ? '一键' : '自动'}</span>)
          }
        }



      ],
      theme: [
        { prop: 'name', label: '专题名称' },
        { prop: 'remark', label: '描述' },
        {
          prop: 'status', label: '状态', render: (row, column, cellValue) => {
            return (<span>{cellValue === 1 ? '测试' : cellValue === 2 ? '上线' : '下线'}</span>)
          }
        },
        {
          prop: 'iconUrl', label: '图标', render: (row, column, cellValue) => {
            return (<img class="tableImg" src={cellValue} />)
          }
        }


      ]
    }
  }

}