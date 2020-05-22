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
      this.saveMemo(memoList);
    }
    memoList.map(memo => {
      let count = 0;
      memo.items.map(item => {
        !item.done && count++;
      });
      memo.undoCount = count;
    });
    this.setData({
      memoList: memoList
    });
    console.info(this.data.memoList)
  },
  // 保存整个memo
  saveMemo(memoList) {
    let newMemoList = JSON.parse(JSON.stringify(memoList));
    newMemoList.map(memo => {
      delete memo.showItems;
      delete memo.undoCount;
    });
    wx.setStorageSync('memo', newMemoList);
  },
  // 创建备忘录回调
  createMemo(data) {
    let arr = this.data.memoList[data.detail.idx].items;
    arr.push({
      id: new Date().getTime(),
      title: data.detail.title,
      detail: '',
      done: false
    });
    this.setData({
      ['memoList['+data.detail.idx+'].undoCount']: this.data.memoList[data.detail.idx].undoCount + 1,
      ['memoList['+data.detail.idx+'].items']: arr
    });
    this.saveMemo(this.data.memoList);
    console.info(this.data.memoList)
  },
  // 创建分类回调
  createClassify(data) {
    let memoList = this.data.memoList;
    memoList.push({
      id: new Date().getTime(),
      name: data.detail.title,
      items: [],
      undoCount: 0
    });
    this.setData({
      memoList: memoList
    });
    this.saveMemo(memoList);
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
  },
  // 切换checkbox
  checkboxChange(e) {
    let classifyIdx = e.target.dataset.classifyIdx;
    let memoIdx = e.target.dataset.memoIdx;
    let restCount = this.data.memoList[classifyIdx].undoCount - 1;
    this.setData({
      ['memoList['+classifyIdx+'].showItems']: restCount ? true : false,
      ['memoList['+classifyIdx+'].undoCount']: this.data.memoList[classifyIdx].undoCount - 1,
      ['memoList['+classifyIdx+'].items['+memoIdx+'].done']: true
    });
    this.saveMemo(this.data.memoList);
  },
  // 展开/收起分类
  toggleClassify(e) {
    let idx = e.target.dataset.idx;
    if (!this.data.memoList[idx].undoCount) {
      wx.showToast({
        title: '没有备忘信息哦~',
        icon: 'none'
      })
      return;
    }
    let showItems = this.data.memoList[idx].showItems;
    this.setData({
      ['memoList['+idx+'].showItems']: !showItems
    });
  }
})
