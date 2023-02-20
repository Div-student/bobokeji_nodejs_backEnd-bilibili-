const dtkSdk = require('dtk-nodejs-api-sdk');
const { commconfig } = require('../../utils/commconfig');
const { queryData } = require('../../dataBase')
/*
 *  @checkSign: 1 默认老版本验签  2 新版验签
 *  @appKey: 用户填写 appkey
 *  @appSecret: 用户填写 appSecret
 */ 

const sdk = new dtkSdk({appKey:commconfig.appKey,appSecret:commconfig.appSecret,checkSign:2});
const goodInformation = {
  goodName: '',
  coupon: '',
  afterPrice: 0,
  returnMoney: 0,
  goodUrl: ''
}

// 1、调用`京东链接解析`接口获取商品的ID
const getGoodID = async(url)=>{
  let goodID = '' 
  let res = await sdk.request('https://openapi.dataoke.com/api/dels/jd/kit/parseUrl',{
    method:"GET",
    form:{url, version:"v1.0.0"}
  })
  if(res.code === 0 && res.data){
    goodID = res.data.skuId
  }
  return goodID
}

// 2、调用`京东联盟搜索`接口获取商品详细信息
const getGoodInfor = async(url) => {
  let skuIds = await getGoodID(url)
  let res = await sdk.request('https://openapi.dataoke.com/api/dels/jd/goods/search',{
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
const getSelfUrl = async (materialId, wechatId)=>{
  let sql = `select * from user where wechat_uid='${wechatId}'`
  let sqlres = await queryData(sql)
  let user_id = 0
  if(sqlres.length>0){
    user_id = sqlres[0].user_id
  }
  console.log('user_id===>', user_id)
  let res = await sdk.request('https://openapi.dataoke.com/api/dels/jd/kit/promotion-union-convert',{
    method:"GET",
    form:{ unionId:commconfig.unionId, materialId, positionId:user_id, version:"v1.0.0"}
  })
  if(res.code === 0 && res.data){
    goodInformation.goodUrl = res.data.shortUrl
  }
  // console.log('goodInformation===>', goodInformation)
}

const getGoodsInforandUrl = async(url, wechatId) => {
  await Promise.all([getGoodInfor(url), getSelfUrl(url, wechatId)])
  return goodInformation
}

exports.getGoodsInforandUrl = getGoodsInforandUrl


// let url = `【京东】【京喜】树花晓秀口腔清洁牙膏
// 🌻牙膏中含有进口的蜂胶成分🌟能够有效的去除牙齿上的牙菌斑🌙让你的口腔更加的健康🌹它的质地非常的温和✨即使是敏感肌也可以放心使用🍀
// ———————
// 拼购价: ¥159.60
// 券后拼购价: ¥79.60

// 领券抢购: https://u.jd.com/5CjYUvE 73.00%`

// getGoodInfor(url)
// getSelfUrl(url, 'oF-RA6fbdaY0mXnMW5lzgWVlpOXM')

// getGoodsInforandUrl(url, 'oF-RA6fbdaY0mXnMW5lzgWVlpOXM')