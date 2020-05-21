Component({
  properties: {
    visible: {
      // 是否显示
      type: Boolean,
      value: false
    }
  },
  data: {
    title: ''
  },
  methods: {
    // 改变名字
    changeTitle(e) {
      this.setData({
        title: e.detail.value
      })
    },
    // 创建分类
    createClassify() {
      this.triggerEvent('create', {title: this.data.title});
      this.closePopup();
    },
    // 关闭弹层
    closePopup() {
      this.setData({
        title: '',
        visible: false
      })
    }
  }
})
