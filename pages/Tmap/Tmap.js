// pages/Tmap/Tmap.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    latitude: 39.909088,
    longitude: 116.397643
  },
  buttonSearch(e){
    var _this = this
    var allMarkers = []
    //通过wx.request发起HTTPS接口请求
    wx.request({
      //地图WebserviceAPI地点搜索接口请求路径及参数（具体使用方法请参考开发文档）
      url: 'https://apis.map.qq.com/ws/place/v1/search?page_index=1&page_size=30&boundary=region(广州市,0)&keyword=图书馆&key=RYYBZ-WBVCJ-O2KFD-DCVP7-XZD5Z-7AFP4',
      success(res){
        console.log(res)
        var result = res.data
        var pois = result.data
        for(var i = 0; i< pois.length; i++){
          var title = pois[i].title
          var lat = pois[i].location.lat
          var lng = pois[i].location.lng
          console.log(title+","+lat+","+lng)
          const marker = {
            id: i,
            latitude: lat,
            longitude: lng,
            callout: {
              // 点击marker展示title
              content: title
            }
          }
          allMarkers.push(marker)
          
        }
        
        _this.setData({
          latitude: allMarkers[0].latitude,
          longitude: allMarkers[0].longitude,
          markers: allMarkers
        })
      }
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