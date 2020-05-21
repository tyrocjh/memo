const app = getApp()

Page({
  data: {
    defaultAvator: '/static/images/avator.png',
    memoAddVisible: false,
    classifyAddVisible: false,
    defaultMemoList: [
      { id: new Date().getTime(), name: '家庭', items: [] },
      { id: new Date().getTime() + 1, name: '生活', items: [] },
      { id: new Date().getTime() + 2, name: '工作', items: [] }
    ],
    memoList: []
  },
  onLoad() {
    this.initData();
  },
  // 初始化数据
  initData() {
    let memoList = wx.getStorageSync('memo');
    if (!memoList) {
      memoList = this.data.defaultMemoList;
      wx.setStorageSync('memo', memoList);
    }
    this.setData({
      memoList: memoList
    });
  },
  createClassify(data) {
    let memoList = this.data.memoList;
    memoList.push({
      id: new Date().getTime(),
      name: data.detail.title,
      items: []
    });
    wx.setStorageSync('memo', memoList);
    this.setData({
      memoList: memoList
    });
  },
  // 添加分类弹窗
  addClassify() {
    this.setData({
      classifyAddVisible: true
    })
  },
  // 添加备忘录弹窗
  addMemo() {
    this.setData({
      memoAddVisible: true
    })
  }
})
