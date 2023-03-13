const dtkSdk = require('dtk-nodejs-api-sdk');
const { commconfig } = require('./commconfig');
const { getMutiplePartAccount } = require('./setMutiplePart')

let URL = `https://openapi.dataoke.com/api/tb-service/twd-to-twd`
let taobaoProInfor = {
  couponInfo: 0, // 优惠券
  price: 0, // 券后价格
  returnMoney: '', // 额外返现
  longTpwd: '' // 淘口令
}

const getTaoBaoPro = async (content, accountName) => {
  // 根据不通的公众号初始化不同账号请求信息
  let daTaoKeAppKey = await getMutiplePartAccount(accountName, "daTaoKeAppKey")
  let daTaoKeAppSecret = await getMutiplePartAccount(accountName, "daTaoKeAppSecret")
  const sdkReq = new dtkSdk({appKey:daTaoKeAppKey, appSecret:daTaoKeAppSecret, checkSign:2});

  let productInfo = await sdkReq.request(URL,{method:"GET",form:{version:"v1.0.0", content }})
  let productData = productInfo.data
  if(productData){
    taobaoProInfor.couponInfo = Math.ceil(productData.originalPrice - productData.actualPrice);
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
  return taobaoProInfor
}

exports.getTaoBaoPro = getTaoBaoPro
