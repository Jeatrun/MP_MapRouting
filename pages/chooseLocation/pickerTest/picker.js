// v0.61/pickerTest/picker.js
Page({

  /**
   * Page initial data
   */
  data: {
    array: ['美国', '中国', '巴西', '日本'],
    objectArray: [
      {
        callout:{
          content: '美国'
        },
        id: 0,

      },
      {
        id: 1,
        callout:{
          content: '中国'
        },
      },
      {
        id: 2,
        callout:{
          content: '巴西'
        },
      },
      {
        id: 3,
        callout:{
          content:  '日本'
        },
      }
    ],
    aindex: 0
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      aindex: e.detail.value
    })
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {

  }
})