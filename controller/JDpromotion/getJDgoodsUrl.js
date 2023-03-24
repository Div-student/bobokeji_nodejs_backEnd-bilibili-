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
  goodName: '',
  coupon: '',
  afterPrice: 0,
  returnMoney: 0,
  goodUrl: ''
}

// 1、调用`京东链接解析`接口获取商品的ID
const getGoodID = async(url, sdkReq)=>{
  let goodID = ''
  let res = await sdkReq.request('https://openapi.dataoke.com/api/dels/jd/kit/parseUrl',{
    method:"GET",
    form:{url, version:"v1.0.0"}
  })
  if(res.code === 0 && res.data){
    goodID = res.data.skuId
  }
  return goodID
}

// 2、调用`京东联盟搜索`接口获取商品详细信息
const getGoodInfor = async(url, sdkReq) => {
  let skuIds = await getGoodID(url, sdkReq)
  let res = await sdkReq.request('https://openapi.dataoke.com/api/dels/jd/goods/search',{
    method:"GET",
    form:{skuIds, version:"v1.0.0"}
  })
  if(res.code === 0 && res.data){
    const temp = res.data.list[0]
    goodInformation.goodName = temp.skuName;
    goodInformation.afterPrice = temp.lowestCouponPrice;
    goodInformation.returnMoney = temp.couponCommission;
    goodInformation.coupon = Math.ceil(temp.lowestPrice - temp.lowestCouponPrice)
  }
}

// 3、调用`京东商品转链`接口将商品转换成自己的推广链接
const getSelfUrl = async (materialId, wechatId, accountName, sdkReq)=>{
  let sql = `select * from user where wechat_uid='${wechatId}' and account_name='${accountName}'`
  let sqlres = await queryData(sql)
  let user_id = 0
  if(sqlres.length>0){
    user_id = sqlres[0].user_id
  }
  let JDunionId = await getMutiplePartAccount(accountName, "JDunionId")
  let res = await sdkReq.request('https://openapi.dataoke.com/api/dels/jd/kit/promotion-union-convert',{
    method:"GET",
    form:{ unionId:JDunionId, materialId, positionId:user_id, version:"v1.0.0"}
  })
  if(res.code === 0 && res.data){
    goodInformation.goodUrl = res.data.shortUrl
  }
}

const getGoodsInforandUrl = async(url, wechatId, accountName) => {
  // 清空上次的缓存数据，防止JD查询无商品返现时返回了推荐的商品
  goodInformation = { goodName: '', coupon: '', afterPrice: 0, returnMoney: 0, goodUrl: '' }
  // 根据不通的公众号初始化不同账号请求信息
  let daTaoKeAppKey = await getMutiplePartAccount(accountName, "daTaoKeAppKey")
  let daTaoKeAppSecret = await getMutiplePartAccount(accountName, "daTaoKeAppSecret")
  const sdkReq = new dtkSdk({appKey:daTaoKeAppKey, appSecret:daTaoKeAppSecret, checkSign:2});

  await Promise.all([getGoodInfor(url, sdkReq), getSelfUrl(url, wechatId, accountName, sdkReq)])
  return goodInformation
}

exports.getGoodsInforandUrl = getGoodsInforandUrl
