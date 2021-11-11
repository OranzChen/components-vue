
const violationType = {
  0: {
    label: 'S',
    value: '0',
    explaination: '违反MADA协议要求'
  },
  1: {
    label: 'A',
    value: '1',
    explaination: '违反RSA协议要求'
  },
  2: {
    label: 'B',
    value: '2',
    explaination: '引发google邮件示警'
  },
  3: {
    label: 'C',
    value: '3',
    explaination: '违反OPPO内部更新要求'
  }
}

const state = {
  violationType
}

const mutations = {
}

const actions = {
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

