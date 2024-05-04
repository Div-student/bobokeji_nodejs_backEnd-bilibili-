
const { getGoodsInforandUrl } = require('../controller/JDpromotion/getJDgoodsUrl')
const { getPDDgoodsDetail } = require('../controller/PDDpromotion/getPDDgoodsInfor')
const { getTaoBaoPro } = require('../utils/getTaoBaoProduct')
const { commconfig } = require('./commconfig')
const { setRedisMap } = require('../dataBase/redis')
const { setMutiplePart } = require('./setMutiplePart')

const sendMsg = async (xmlJson)=>{
  // 调用京东接口查询返现
  let JDrepx = /【京东】/
  let isJDtest = JDrepx.test(xmlJson.Content)
  // 判断是否为拼多多链接
  let pddEXP = /(\bgoodsid\b|\bpxq_secret_key\b)/
  let isPDDlind = pddEXP.test(xmlJson.Content)
  // 判断是否为多租参数设置
  let isSetMutipRepx = /(\bbobokeji\b)/g
  let isSetMutip = isSetMutipRepx.test(xmlJson.Content)
  // 判断是否是获取课程资料
  let autoJsLearn = /^(学习|资料)+[0-9]*$/
  let autoMatch = xmlJson.Content.match(autoJsLearn)
  if(autoMatch !== null && xmlJson.ToUserName == "gh_16c32413485a"){
    xmlJson.type = 'text'
    xmlJson.content = `
    一、舔狗神器的资料和源码：\n
    百度网盘链接:https://pan.baidu.com/s/1gQ_QRCCvhzlEhHF01LabJw 提取码:30qy \n
    
    百度网盘:https://pan.baidu.com/s/1g35kZu_O5cLKeksp5a92NA 提取码:641n \n
    
    二、自动收能量源码: \n
    github源码： https://github.com/Div-student/antEnergy \n
    
    三、公众号实战开发课程资料：\n 
    链接: https://pan.baidu.com/s/1CkB7DjPxvpDwVAyvABBshw?pwd=tpp3 提取码: tpp3 
    `
  }else if(isPDDlind){
    let pddRes = await getPDDgoodsDetail(xmlJson.Content, xmlJson.FromUserName, xmlJson.ToUserName)
    console.log('pddRes===>', pddRes)
    let PddProInfo = ''
    if(pddRes && pddRes.promotion_rate > 0){
      let tempName = pddRes.goods_name.slice(0, 10) + '...'
      amount = pddRes.has_coupon?`优惠券: ${pddRes.coupon_discount.toFixed(2)}\n`:''
      returnMoney = ((pddRes.min_group_price - pddRes.coupon_discount)*(pddRes.promotion_rate/100)).toFixed(2)
      PddProInfo = `商品名称：${tempName}\n优惠券：${pddRes.coupon_discount.toFixed(2)}\n券后价格：${(pddRes.min_group_price - pddRes.coupon_discount).toFixed(2)}\n额外返现：${returnMoney}\n----------------\n<a href="${pddRes.urlWithGoodSign}">点击领券下单</a>\n**********************\n<a href="${commconfig.JDListUrl+'?weui='+xmlJson.FromUserName+'&pageType=PDD'}">点击查看我的订单</a>`
    }else{
      PddProInfo = '亲，该商家无活动哦！'
    }
    xmlJson.type = 'text'
    xmlJson.content = PddProInfo
  }else if(isJDtest){
    // 提取字符串中的网址
    const reg = /(https?|http):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;
    const strValue = xmlJson.Content.match(reg)[0];
    let JdRes = await getGoodsInforandUrl(strValue, xmlJson.FromUserName, xmlJson.ToUserName)
    let JdformateProductInfo = ''
    if(JdRes.returnMoney !== 0 && JdRes.goodUrl){
      let tempName = JdRes.goodName.slice(0, 10) + '...'
      JdformateProductInfo = `商品名称：${tempName}\n优惠券：${JdRes.coupon}\n券后价格：${JdRes.afterPrice}\n额外返现：${JdRes.returnMoney}\n----------------\n<a href="${JdRes.goodUrl}">点击领券下单</a>`
    }else{
      JdformateProductInfo = '亲，该商家无活动哦！'
    }
    xmlJson.type = 'text'
    xmlJson.content = JdformateProductInfo
  }else if(isSetMutip){ // 多租户设置
    let sedMsg = await setMutiplePart(xmlJson)
    xmlJson.type = 'text'
    xmlJson.content = sedMsg
  }else{
    // 查询淘宝官方接口，返回商品返现和优惠券详情逻辑
    let taobaoPro = await getTaoBaoPro(xmlJson.Content, xmlJson.ToUserName)
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