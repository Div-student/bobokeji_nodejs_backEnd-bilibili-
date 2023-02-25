
const { getGoodsInforandUrl } = require('../controller/JDpromotion/getJDgoodsUrl')
const { getTaoBaoPro } = require('../utils/getTaoBaoProduct')
const { commconfig } = require('./commconfig')

const sendMsg = async (xmlJson)=>{
  // 调用京东接口查询返现
  let JDrepx = /(\bjd\.com\b)/g
  let isJDtest = JDrepx.test(xmlJson.Content)
  if(isJDtest){
    // 提取字符串中的网址
    const reg = /(https?|http):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;
    const strValue = xmlJson.Content.match(reg)[0];
    let JdRes = await getGoodsInforandUrl(strValue, xmlJson.FromUserName)
    let JdformateProductInfo = ''
    if(JdRes.returnMoney !== 0 && JdRes.goodUrl){
      let tempName = JdRes.goodName.slice(0, 11) + '...'
      JdformateProductInfo = `商品名称：${tempName}\n优惠券：${JdRes.coupon}\n券后价格：${JdRes.afterPrice}\n额外返现：${JdRes.returnMoney}\n----------------\n<a href="${JdRes.goodUrl}">点击领券下单</a>\n**********************\n<a href="${commconfig.JDListUrl+'?weui='+xmlJson.FromUserName}">点击查看我的订单</a>`
    }else{
      JdformateProductInfo = '亲，该商家无活动哦！'
    }
    xmlJson.type = 'text'
    xmlJson.content = JdformateProductInfo
  }else{
    // 查询淘宝官方接口，返回商品返现和优惠券详情逻辑
    let taobaoPro = await getTaoBaoPro(xmlJson.Content)
    let formateProductInfo = ''
    if(taobaoPro.couponInfo !== 0 || taobaoPro.returnMoney){
      formateProductInfo = `优惠券：${taobaoPro.couponInfo}\n券后价格：${taobaoPro.price}\n额外返现：${taobaoPro.returnMoney}\n----------------\n${taobaoPro.longTpwd}`
    }else{
      formateProductInfo = '亲，该商家无活动哦！'
    }
    xmlJson.type = 'text'
    xmlJson.content = formateProductInfo
  }
  return xmlJson
}

exports.sendMsg = sendMsg