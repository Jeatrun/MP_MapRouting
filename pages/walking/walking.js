// pages/walking.js
Page({

  /**
   * Page initial data
   */
  data: {
    latitude: 39.909088,
    longitude: 116.397643,
  },
  buttonSearch(e){
    var _this = this
    
    //通过wx.request发起HTTPS接口请求
    wx.request({
      //地图WebserviceAPI,请求步行路线
      url: 'https://apis.map.qq.com/ws/direction/v1/walking/?from=39.909088,116.397643&to=41.976249,116.316569&key=RYYBZ-WBVCJ-O2KFD-DCVP7-XZD5Z-7AFP4',
      success(res){
        //console.log(res.data.result.routes[0].polyline)
        var result = res.data.result;
        var coors=result.routes[0].polyline;
        var pl=[];
        //坐标解压缩
        for(var i=2;i<coors.length;i++){
          coors[i]=Number(coors[i-2])+Number(coors[i])/1000000;
        }
        for(var i=0;i<coors.length;i+=2){
          pl.push({latitude:coors[i],longitude:coors[i+1]})
        }
        console.log(pl)
        _this.setData({
          latitude:pl[0].latitude,
          longitude:pl[0].longitude,
          polyline: [{
            points:pl,
            color:'#FF0000DD',
            width:6
          }]
    
        })
        console.log(_this.data.coors)
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