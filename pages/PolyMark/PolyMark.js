// pages/V0.5/PolyMark.js
function performWalkingRequest(allMarkers,allPolyCoors,index,_this){

  if(index==allMarkers.length-1){
    return
  }

  var startlat=allMarkers[index].latitude;
  var startlong=allMarkers[index].longitude;
  var endlat=allMarkers[index+1].latitude;
  var endlong=allMarkers[index+1].longitude;
  

  var lurl= 'https://apis.map.qq.com/ws/direction/v1/walking/?from='+startlat+','+startlong+'&to='+endlat+','+endlong+'&key=RYYBZ-WBVCJ-O2KFD-DCVP7-XZD5Z-7AFP4';
  console.log('lurl'+lurl)
  wx.request({
        
    //地图WebserviceAPI,请求步行路线
    url: lurl,
    success(res){
      console.log('result')
      console.log(res)
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
      //console.log(pl)
      allPolyCoors=allPolyCoors.concat(pl);
      console.log(allPolyCoors)
      //if it meats the end,update the polyline
      if(index==allMarkers.length-2){
        console.log('this is the final')
        console.log('allpc:')
        console.log(allPolyCoors)
        _this.setData({
          polyline: [{
            points:allPolyCoors,
            color:'#FF0000DD',
            width:6
          }]
    
        })
      }
      console.log('reucursion index:'+index)
      console.log('apc')
      console.log(allPolyCoors)
      //delay 1s to avoid key limit
      setTimeout(performWalkingRequest,200,allMarkers,allPolyCoors,index+1,_this) 
    }
    
  })
}

Page({

  /**
   * Page initial data
   */
  data: {
    latitude: 39.909088,
    longitude: 116.397643
  },

  buttonSearch(e){
    /*1. get the markers*/
    var _this = this
    var allMarkers = [] //all the markers
    var allPolyCoors=[] //all the coors of polyline
    //通过wx.request发起HTTPS接口请求
    wx.request({
      //地图WebserviceAPI地点搜索接口请求路径及参数（具体使用方法请参考开发文档）
      url: 'https://apis.map.qq.com/ws/place/v1/search?page_index=1&page_size=30&boundary=region(广州市,0)&keyword=图书馆&key=RYYBZ-WBVCJ-O2KFD-DCVP7-XZD5Z-7AFP4',
      success(res){
        //console.log(res)
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
        console.log(allMarkers)


        /** polyline ***/

        
        //通过wx.request发起HTTPS接口请求
        performWalkingRequest(allMarkers,allPolyCoors,0,_this)
        //use the for loop,get every polyline of each 2 markers
        
  
      }
    })
    
 
    
    //append this polyline array into a single one
    //use this big polyline array to generate polyline
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