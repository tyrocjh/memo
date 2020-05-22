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
    classifyIdx: 0,
    memoText: ''
  },
  methods: {
    // 创建备忘录
    createMemo() {
      if (!this.data.memoText.trim()) {
        wx.showToast({
          title: '请填写备忘信息~',
          icon: 'none'
        })
        return;
      }
      this.triggerEvent('create', {
        idx: this.data.classifyIdx,
        title: this.data.memoText.trim()
      });
      this.closeMemo();
    },
    // 改变备忘文案
    changeMemo(e) {
      this.setData({
        memoText: e.detail.value
      })
    },
    // 切换分类
    pickerChange(e) {
      this.setData({
        classifyIdx: e.detail.value
      })
    },
    // 关闭弹层
    closeMemo() {
      this.setData({
        memoText: '',
        visible: false
      })
    }
  }
})
