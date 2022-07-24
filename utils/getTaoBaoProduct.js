const dtkSdk = require('dtk-nodejs-api-sdk');
/*
 *  @checkSign: 1 默认老版本验签  2 新版验签
 *  @appKey: 用户填写 appkey
 *  @appSecret: 用户填写 appSecret
 */ 

const APP_KEY = '62******3d1'
const APP_SECRET = 'd69c***********7a18e'
const sdk = new dtkSdk({appKey: APP_KEY, appSecret: APP_SECRET, checkSign:2});
let URL = `https://openapi.dataoke.com/api/tb-service/twd-to-twd`
let taobaoProInfor = {
  couponInfo: 0, // 优惠券
  price: 0, // 券后价格
  returnMoney: '', // 额外返现
  longTpwd: '' // 淘口令
}

const getTaoBaoPro = async (content) => {
  let productInfo = await sdk.request(URL,{method:"GET",form:{version:"v1.0.0", content }})
  let productData = productInfo.data
  if(productData){
    taobaoProInfor.couponInfo = productData.originalPrice - productData.actualPrice;
    taobaoProInfor.longTpwd = productData.longTpwd;
    taobaoProInfor.price = productData.actualPrice
    taobaoProInfor.returnMoney = ((productData.actualPrice * (productData.maxCommissionRate/100)) * 0.9).toFixed(2)
  }else{
    taobaoProInfor = {
      couponInfo: 0, // 优惠券
      price: 0, // 券后价格
      returnMoney: '', // 额外返现
      longTpwd: '' // 淘口令
    }
  }
  console.log('taobaoProInfor===>', taobaoProInfor)
  return taobaoProInfor
}

exports.getTaoBaoPro = getTaoBaoPro
