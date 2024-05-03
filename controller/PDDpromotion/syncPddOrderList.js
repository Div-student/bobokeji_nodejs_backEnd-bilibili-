/**
 * 同步京东订单到数据库
 */ 
const { apiRequest, mutiApiReqPDD } = require("../../utils/dataokeSdkRequest")
const { commconfig } = require("../../utils/commconfig")
const { insertData, updateData, queryData } = require("../../dataBase/index.js")
const { getRedisValue, setRedisValue } = require("../../dataBase/redis")

const dtkSdk = require('dtk-nodejs-api-sdk');

// 获取PDD订单数据
const getPddOrderList = async(startTime, endTime) => {
  let orderlistUrl = 'https://openapi.dataoke.com/api/dels/pdd/order/incrementSearch'
  let goodListRes = await Promise.all(mutiApiReqPDD(orderlistUrl, startTime, endTime))
  let jdGoodList = []
  let orderIds = []
  let orderIdMap = {}
  let goodList = goodListRes[0].data.list
  console.log('goodListRes====>', goodList)
  if(goodListRes[0].code === 0 && goodList.length > 0){
    jdGoodList = await Promise.all(goodList.map(async(item) => {
      orderIds.push(`'${item.orderSN}'`)
      orderIdMap[item.orderSN] = item
      // let userID = JSON.parse(item.customParameters).userId
      let userID = "40"
      console.log('userID====>', userID)
      let personMap = await getPersonFromRedis(userID)
      console.log('personMap====>', personMap)
      return {
        orderSN: item.orderSN, //推广订单编号
        wechat_uid: personMap.wechat_uid, //微信公众号用户id
        account_name: personMap.account_name, // 微信公众号名称
        failReason: item.failReason, // 订单审核失败/惩罚原因
        goodsId: item.goodsId, // 商品ID
        goodsName: item.goodsName, // 商品标题
        goodsPrice: item.goodsPrice, // 订单中sku的单件价格，单位为元
        goodsQuantity: item.goodsQuantity, // 购买商品的数量
        goodsSign: item.goodsSign, // goodsSign是加密后的goodsId
        goodsThumbnailUrl: item.goodsThumbnailUrl, // 商品缩略图
        isDirect: item.isDirect, // 是否直推 ，1表示是，0表示否
        orderAmount: item.orderAmount, // 实际支付金额，单位为元
        orderCreateTime: item.orderCreateTime, // 订单生成时间，UNIX时间戳
        orderPayTime: item.orderPayTime, // 支付时间
        orderReceiveTime: item.orderReceiveTime, // 确认收货时间
        orderStatus: item.orderStatus, // 订单状态：0-已支付；1-已成团；2-确认收货；3-审核成功；4-审核失败（不可提现）；5-已经结算 ;10-已处罚
        orderStatusDesc: item.orderStatusDesc, // 订单状态描述
        priceCompareStatus: item.priceCompareStatus, // 比价状态：0：正常，1：比价
        promotionAmount: item.promotionAmount, // 佣金金额，单位为分
        promotionRate: item.promotion_rate, // 佣金比例，千分比
        orderModifyAt: item.orderModifyAt // 最后更新时间
      }
    }))
  }
  return { jdGoodList, orderIds, orderIdMap }
}

// 将最新的订单数据插入表中jd_goods_list
const insertJDlist = async(startTime, endTime) => {
  // 获取最近5分钟订单数据
  let { jdGoodList, orderIds, orderIdMap } = await getPddOrderList(startTime, endTime)
  console.log('orderIds==>', orderIds)
  let insertRes = ''
  if(orderIds.length > 0){
    // 1、根据订单id查询表中已存在的订单数据
    let querySql = `select orderSN,failReason,orderReceiveTime,orderStatus,orderStatusDesc,priceCompareStatus,promotionAmount,orderModifyAt,promotionRate from pdd_goods_list where orderSN in (${orderIds.join(",")})`
    console.log('querySql==>', querySql)
    let queryDataRes = await queryData(querySql)
    console.log('queryDataRes==>', queryDataRes)
    // 2、更新表中已有的订单数据
    let filterOrderIds = [] //需要过滤的订单id
    let updateKeys = ["failReason","orderReceiveTime","orderStatus","orderStatusDesc","priceCompareStatus","promotionAmount","orderModifyAt","promotionRate"]
    queryDataRes.forEach( async element => {
      let uadateWhereSql = `orderSN='${element.orderSN}'`
      let upadateValues = [ 
        orderIdMap[element.orderSN].failReason, 
        orderIdMap[element.orderSN].orderReceiveTime, 
        orderIdMap[element.orderSN].orderStatus, 
        orderIdMap[element.orderSN].orderStatusDesc, 
        orderIdMap[element.orderSN].priceCompareStatus, 
        orderIdMap[element.orderSN].promotionAmount,
        orderIdMap[element.orderSN].orderModifyAt,
        orderIdMap[element.orderSN].promotion_rate
      ]
      filterOrderIds.push(element.orderSN)
      console.log('upadateValues===>', upadateValues)
      let updateTableRes = await updateData('pdd_goods_list', updateKeys, upadateValues, uadateWhereSql)
    });
  
    // 3、过滤掉已经更新的数据
    let afterFileterData = jdGoodList.filter(item => {
      return !filterOrderIds.includes(item.orderSN)
    })
    console.log('afterFileterData==>', afterFileterData)
    if(afterFileterData.length > 0){
      // 4、将数据插入表中
      let tableKeys = [
        "orderSN",'wechat_uid','account_name','failReason','goodsId','goodsName','goodsPrice',
        'goodsQuantity','goodsSign','goodsThumbnailUrl','isDirect','orderAmount','orderCreateTime', 'orderPayTime',
        'orderReceiveTime','orderStatus','orderStatusDesc','priceCompareStatus','promotionAmount','promotionRate','orderModifyAt'
      ]
      insertRes = await insertData('pdd_goods_list', tableKeys, afterFileterData)
    }
  }
  return insertRes
}
exports.insertJDlist = insertJDlist

const getPersonFromRedis = async(key)=>{
  let userMap = {
    wechat_uid: "",
    account_name: ""
  }
  let keyString = key.toString()
  let userInfo = await getRedisValue(keyString)
  if(userInfo){ // 从redis里取用户的信息
    userMap.wechat_uid = userInfo.split(',')[0]
    userMap.account_name = userInfo.split(',')[1]
  }else{ // 如果redis里没有，则从mysql里获取用户信息，并存入redis下次便可以直接从redis获取数据
    let querySql = `select * from user where user_id='${key}'`
    let result = await queryData(querySql)
    if(result.length > 0){
      let userRes = [result[0].wechat_uid,result[0].account_name]
      userMap.wechat_uid = result[0].wechat_uid
      userMap.account_name = result[0].account_name
      setRedisValue(keyString, userRes.join(',')) // 这里用异步处理，提高效率
    }
  }
  console.log('userMap===>', userMap)
  return userMap
}

insertJDlist("2023-03-26 17:09:00", "2023-03-26 18:09:00")

// getPddOrderList("2023-03-26 17:09:00", "2023-03-26 18:09:00")