const dtkSdk = require('dtk-nodejs-api-sdk');
const { commconfig } = require('./commconfig');
const { getMutiplePartAccount } = require('./setMutiplePart')
const rq = require('request-promise')

let URLTWD = `https://openapi.dataoke.com/api/tb-service/twd-to-twd`
let URL = `https://openapi.dataoke.com/api/tb-service/parse-content` //淘系万能解析
let URLPri = `https://openapi.dataoke.com/api/tb-service/get-privilege-link` //高效转链

let taobaoProInfor = {
  couponInfo: 0, // 优惠券
  price: 0, // 券后价格
  returnMoney: '', // 额外返现
  longTpwd: '' // 淘口令
}

const getTaoBaoPro = async (content, accountName) => {
  console.log('content==>',content)
  // 根据不通的公众号初始化不同账号请求信息
  let daTaoKeAppKey = await getMutiplePartAccount(accountName, "daTaoKeAppKey")
  let daTaoKeAppSecret = await getMutiplePartAccount(accountName, "daTaoKeAppSecret")
  let ddxApiKey = await getMutiplePartAccount(accountName, "DdxapiKey")
  let returnRate = await getMutiplePartAccount(accountName, "returnRate")
  let returnRateNum = Number(returnRate)/100
  
  console.log("daTaoKeAppSecret", daTaoKeAppKey, daTaoKeAppSecret)
  const sdkReq = new dtkSdk({appKey:daTaoKeAppKey, appSecret:daTaoKeAppSecret, checkSign:1});
  console.log("sdkReq===>", sdkReq)
  let productInfo = await sdkReq.request(URL,{method:"GET",form:{version:"v1.0.0", content }})
  console.log("万能解析接口===>", productInfo)
  let productData = productInfo.data
  
  if(productData){
    let digitID = productData.goodsId
    // console.log('digitID===>', digitID)
    // let stringID = await getStringId(digitID)
    let stringID = await getProFormDDX(content, ddxApiKey)
    
    let productPri = await sdkReq.request(URLPri,{method:"GET",form:{version:"v1.3.1", goodsId:stringID}})
    let tempProductInfo = productPri.data
    console.log("tempProductInfo===>", tempProductInfo)
    let realPrice = productData.realPostFee || tempProductInfo.actualPrice
    console.log("realPrice===>", realPrice)

    taobaoProInfor.couponInfo = tempProductInfo.originalPrice - realPrice
    taobaoProInfor.longTpwd = tempProductInfo.longTpwd + "https:/"
    taobaoProInfor.price = realPrice
    taobaoProInfor.returnMoney = ((realPrice * (tempProductInfo.maxCommissionRate/100)) * returnRateNum).toFixed(2)
  }else if(productInfo.code == 400){ // 淘口令转淘口令接口
    let productInfo = await sdkReq.request(URLTWD,{method:"GET",form:{version:"v1.0.0", content }})
    let tempproductInfo = productInfo.data
    
    console.log("淘口令转淘口令===>", productInfo)
    if(tempproductInfo){
      taobaoProInfor.couponInfo = tempproductInfo.originalPrice - tempproductInfo.actualPrice
      taobaoProInfor.longTpwd = tempproductInfo.longTpwd + "https:/"
      taobaoProInfor.price = tempproductInfo.actualPrice
      taobaoProInfor.returnMoney = ((tempproductInfo.actualPrice * (tempproductInfo.maxCommissionRate/100)) * returnRateNum).toFixed(2)
    }else{
      taobaoProInfor = {
        couponInfo: 0, // 优惠券
        price: 0, // 券后价格
        returnMoney: '', // 额外返现
        longTpwd: '' // 淘口令
      }
    }
  }else{
    taobaoProInfor = {
      couponInfo: 0, // 优惠券
      price: 0, // 券后价格
      returnMoney: '', // 额外返现
      longTpwd: '' // 淘口令
    }
  }
  console.log('taobaoProInfor==>', taobaoProInfor)
  return taobaoProInfor
}

// 获取字符串ID
const getStringId = async (numID) => {
  let uri = `https://tkapi.apptimes.cn/tbk/get-stringid?appkey=mtc7apdp&num_id=${numID}`
  let stringID = ''
  let resAccessToken = await rq(uri)
  let stringIDInfor = JSON.parse(resAccessToken)
  if(stringIDInfor.errcode == 0 && stringIDInfor.data){
    stringID = stringIDInfor.data.string_id
  }
  return stringID
}

// 从订单侠平台获取淘宝商品的转链后的淘口令
const getProFormDDX = async(contentMsg, apikey) => {
  let stringID = ''
  // 万能高佣转链api接口 
  const URL = 'http://api.tbk.dingdanxia.com/tbk/wn_convert'
  let param = {
    method: "POST",
    uri: URL,
    body: {
      apikey: apikey,
      content: contentMsg
    },
    json: true
  }
  let res = await rq.post(param)
  if(res.code == 200){
    stringID = res.data.item_id
  }
  console.log("stringID===>", stringID)
  return stringID
}

// let contents = `【淘宝】https://m.tb.cn/h.g137XXv6qDDL6s6?tk=ulYLWHEkRuq HU0854 「植物医生官方正品山茶花补水护肤水乳套装平价化妆品春季干皮T1」
// 点击链接直接打开 或者 淘宝搜索直接打开`

// getTaoBaoPro(contents)


exports.getTaoBaoPro = getTaoBaoPro
