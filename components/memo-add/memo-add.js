Component({
  properties: {
    visible: {
      // 是否显示
      type: Boolean,
      value: false
    },
    classifyList: {
      // 分类列表
      type: Array,
      value: []
    }
  },
  data: {
    index: 0,
    array: ['家庭', '生活', '工作']
  },
  methods: {
    // 创建备忘录
    createMemo() {
    },
    // 切换分类
    pickerChange(e) {
      console.info(e.detail.value)
      this.setData({
        index: e.detail.value
      })
    },
    // 关闭弹层
    closeMemo() {
      this.setData({
        visible: false
      })
    }
  }
})
