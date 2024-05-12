const dtkSdk = require('dtk-nodejs-api-sdk');
const { commconfig } = require('../../utils/commconfig');
const { queryData } = require('../../dataBase')
const { getMutiplePartAccount } = require('../../utils/setMutiplePart')
/*
 *  @checkSign: 1 默认老版本验签  2 新版验签
 *  @appKey: 用户填写 appkey
 *  @appSecret: 用户填写 appSecret
 */ 

let goodInformation = {
  shopName: "",
  goodName: '',
  coupon: '',
  afterPrice: 0,
  returnMoney: 0,
  goodUrl: ''
}

// 1、调用`京东链接解析`接口获取商品的ID
const getGoodID = async(url, sdkReq)=>{
  let goodID = ''
  let itemUrl = ''
  let res = await sdkReq.request('https://openapi.dataoke.com/api/dels/jd/kit/parseUrl',{
    method:"GET",
    form:{url, version:"v1.0.0"}
  })
  if(res.code === 0 && res.data){
    goodID = res.data.skuId
    itemUrl = res.data.itemUrl
  }
  return {goodID, itemUrl}
}

// 2、调用`京东联盟搜索`接口获取商品详细信息
const getGoodInfor = async(url, sdkReq, accountName) => {
  let skuIds = await getGoodID(url, sdkReq)
  let res = await sdkReq.request('https://openapi.dataoke.com/api/dels/jd/goods/search',{
    method:"GET",
    form:{skuIds:skuIds.goodID, version:"v1.0.0"}
  })
  let returnRate = await getMutiplePartAccount(accountName, "returnRate")
  let returnRateNum = Number(returnRate)/100

  if(res.code === 0 && res.data){
    const temp = res.data.list[0]
    goodInformation.goodName = temp.skuName;
    goodInformation.afterPrice = temp.lowestCouponPrice;
    goodInformation.returnMoney = (temp.couponCommission * returnRateNum).toFixed(2);
    goodInformation.coupon = Math.ceil(temp.lowestPrice - temp.lowestCouponPrice)
  }
}

// 3、调用`京东商品转链`接口将商品转换成自己的推广链接
const getSelfUrl = async (materialId, wechatId, accountName, sdkReq)=>{
  // 修复大淘客‘京东商品转链’接口的bug,需要先调‘京东链接解析’接口转换京东链接
  let itemUrl = await getGoodID(materialId, sdkReq)
  console.log('itemUrl===>', itemUrl)
  let sql = `select * from user where wechat_uid='${wechatId}' and account_name='${accountName}'`
  let sqlres = await queryData(sql)
  let user_id = 0
  if(sqlres.length>0){
    user_id = sqlres[0].user_id
  }
  let JDunionId = await getMutiplePartAccount(accountName, "JDunionId")
  let res = await sdkReq.request('https://openapi.dataoke.com/api/dels/jd/kit/promotion-union-convert',{
    method:"GET",
    form:{ unionId:JDunionId, materialId:itemUrl.itemUrl, positionId:user_id, version:"v1.0.0"}
  })
  console.log('自己的推广链接===>', res)
  if(res.code === 0 && res.data){
    goodInformation.goodUrl = res.data.shortUrl
  }
}

// 由于京东联盟对比价订单限制，转链接接口不支持数字id，获取优惠券直接改成京东联盟搜索接口
const getJDgoodsInoforAll = async(sdkReq, keyword, accountName) => {
  let res = await sdkReq.request('https://openapi.dataoke.com/api/dels/jd/goods/search',{
    method:"GET",
    form:{version:"v1.0.0", keyword, sortName:"price", sort:"aesc"}
  })
  if(res.code == 0 && res.data.list.length > 0){
    let goodRes = res.data.list[0]

    let returnRate = await getMutiplePartAccount(accountName, "returnRate")
    let returnRateNum = Number(returnRate)/100


    let goodUrl = ''
    if(goodRes.couponList.length > 0){
      goodUrl = goodRes.couponList[0].link
    }else{
      goodUrl = goodRes.materialUrl
    }

    goodInformation = {
      shopName: goodRes.shopName,
      goodName: goodRes.skuName,
      coupon: goodRes.lowestPrice - goodRes.lowestCouponPrice,
      afterPrice: goodRes.lowestCouponPrice,
      returnMoney: (goodRes.couponCommission * returnRateNum).toFixed(2),
      goodUrl: goodUrl
    }
  }
}

// 从京东链接中获取搜索关键字
const getJDKeyWord = (url) => {
  console.log("JD keyWord ==>url", url)
  let match = url.match(/「(.*?)」/);
  let keyWord = ""
  if (match) {
    keyWord = match[1].replace(/【[^】]*】/, '')
  }
  console.log("JD keyWord ==>", keyWord)
  return keyWord
}

const getGoodsInforandUrl = async(url, wechatId, accountName) => {
  // 清空上次的缓存数据，防止JD查询无商品返现时返回了推荐的商品
  goodInformation = { shopName: "", goodName: '', coupon: '', afterPrice: 0, returnMoney: 0, goodUrl: '' }
  // 根据不通的公众号初始化不同账号请求信息
  let daTaoKeAppKey = await getMutiplePartAccount(accountName, "daTaoKeAppKey")
  let daTaoKeAppSecret = await getMutiplePartAccount(accountName, "daTaoKeAppSecret")
  const sdkReq = new dtkSdk({appKey:daTaoKeAppKey, appSecret:daTaoKeAppSecret, checkSign:2});
  // await Promise.all([getGoodInfor(url, sdkReq, accountName), getSelfUrl(url, wechatId, accountName, sdkReq)])
  let keyWord = getJDKeyWord(url)
  await getJDgoodsInoforAll(sdkReq, keyWord, accountName)
  return goodInformation
}

exports.getGoodsInforandUrl = getGoodsInforandUrl
