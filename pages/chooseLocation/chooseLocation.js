
Page({

  /**
   * Page initial data
   */
  data: {
    index:0,
    titles:[],
    startlat:0,
    startlong:0,
    vendlat:0,
    endlong:0,
    latitude: 39.909088,
    longitude: 116.397643,
  },
  bindPickerChange: function(e) {
    var markers=this.data.markers
    var index=e.detail.value
    console.log('picker发送选择改变，携带值为', index)
    this.setData({
      index: index,
      latitude:markers[index].latitude,
      longitude: markers[index].longitude
    })
  },
  buttonSearch(e){
    var _this = this
    var allMarkers = []
    var allTitles=[]
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
          const ltitle={
            id:i,
            content:title
          }
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
          allTitles.push(ltitle)
        }
        _this.setData({
          latitude: allMarkers[0].latitude,
          longitude: allMarkers[0].longitude,
          markers: allMarkers,
          titles:allTitles

        })
        //console.log(allMarkers)
        //console.log(_this.data.titles)
      }
    })

    
  },
  buttonRoute(){
    var _this = this
    var startlat=_this.data.startlat;
    var startlong=_this.data.startlong;
    var endlat=_this.data.endlat;
    var endlong=_this.data.endlong;
    
  
    var lurl= 'https://apis.map.qq.com/ws/direction/v1/walking/?from='+startlat+','+startlong+'&to='+endlat+','+endlong+'&key=RYYBZ-WBVCJ-O2KFD-DCVP7-XZD5Z-7AFP4';
    console.log('lurl'+lurl)
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