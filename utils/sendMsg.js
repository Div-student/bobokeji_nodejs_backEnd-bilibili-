
const { getGoodsInforandUrl } = require('../controller/JDpromotion/getJDgoodsUrl')
const { getTaoBaoPro } = require('../utils/getTaoBaoProduct')
const { commconfig } = require('./commconfig')
const { setRedisMap, getRedisMap } = require('../dataBase/redis')
const { setMutiplePart } = require('./setMutiplePart')

const sendMsg = async (xmlJson)=>{
  // 调用京东接口查询返现
  let JDrepx = /(\bjd\.com\b)/g
  let isJDtest = JDrepx.test(xmlJson.Content)
  let isSetMutipRepx = /(\bbobokeji\b)/g
  let isSetMutip = isSetMutipRepx.test(xmlJson.Content)
  if(isJDtest){
    // 提取字符串中的网址
    const reg = /(https?|http):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;
    const strValue = xmlJson.Content.match(reg)[0];
    let JdRes = await getGoodsInforandUrl(strValue, xmlJson.FromUserName, xmlJson.ToUserName)
    let JdformateProductInfo = ''
    if(JdRes.returnMoney !== 0 && JdRes.goodUrl){
      let tempName = JdRes.goodName.slice(0, 11) + '...'
      JdformateProductInfo = `商品名称：${tempName}\n优惠券：${JdRes.coupon}\n券后价格：${JdRes.afterPrice}\n额外返现：${JdRes.returnMoney}\n----------------\n<a href="${JdRes.goodUrl}">点击领券下单</a>\n**********************\n<a href="${commconfig.JDListUrl+'?weui='+xmlJson.FromUserName}">点击查看我的订单</a>`
    }else{
      JdformateProductInfo = '亲，该商家无活动哦！'
    }
    xmlJson.type = 'text'
    xmlJson.content = JdformateProductInfo
  }else if(isSetMutip){ // 多租户设置
    console.log('isSetMutip===>', isSetMutip)
    let sedMsg = await setMutiplePart(xmlJson)
    xmlJson.type = 'text'
    xmlJson.content = sedMsg
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

const sendNewsMsg = async (xmlJson)=>{
  xmlJson.type = "news"
  xmlJson.content = [
    {
      title: '外卖每日🧧合集',
      description: '美团、饿了么每日大额度🧧限时领取，红包和商家满减优惠叠加使用哦',
      picurl: 'https://mmbiz.qpic.cn/mmbiz_jpg/q5Fp4Y0f14uBuuO0MYHMXMp7SBokPUeQrPSOYTciavOzS8OawiaS88BfeWpgw6Q0ibPaQj6UegNSMcMzu3ArBibtDQ/0?wx_fmt=jpeg',
      url: 'https://mp.weixin.qq.com/s/eDJy5PzijNaYd7SogPaZQA'
    }
  ]
  xmlJson.count = 1

  return xmlJson
}
exports.sendNewsMsg = sendNewsMsg