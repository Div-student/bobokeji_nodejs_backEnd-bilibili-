/**
 * 同步京东订单到数据库
 */ 
const { apiRequest, mutiApiReq } = require("../../utils/dataokeSdkRequest")
const { commconfig } = require("../../utils/commconfig")
const { insertData, updateData, queryData } = require("../../dataBase/index.js")
const { getRedisValue, setRedisValue } = require("../../dataBase/redis")

// 获取京东订单数据
const getJdOrderList = async(startTime, endTime) => {
  let orderlistUrl = 'https://openapi.dataoke.com/api/dels/jd/order/get-official-order-list'
  let params = {
    type: 1, // 订单时间查询类型 1：下单时间，2：完成时间（购买用户确认收货时间），3：更新时间
    key: commconfig.JDKEY, // 京东联盟授权key
    startTime: startTime, // 开始时间 格式yyyy-MM-dd HH:mm:ss，与endTime间隔不超过1小时
    endTime: endTime // 结束时间 格式yyyy-MM-dd HH:mm:ss，与startTime间隔不超过1小时
  }
  let goodListRes = await Promise.all(mutiApiReq(orderlistUrl, params))
  let jdGoodList = []
  let orderIds = []
  let orderIdMap = {}
  if(goodListRes.code === 0 && goodListRes.data.length>0){
    jdGoodList = await Promise.all(goodListRes.data.map(async(item) => {
      orderIds.push(item.orderId)
      orderIdMap[item.orderId] = item
      let personMap = await getPersonFromRedis(item.positionId)
      return {
        price: item.price,
        skuName: item.skuName,
        skuNum: item.skuNum,
        finalRate: item.finalRate,
        commissionRate: item.commissionRate,
        actualFee: item.actualFee,
        actualCosPrice: item.actualCosPrice,
        estimateFee: item.estimateFee,
        orderId: item.orderId,
        validCode: item.validCode,
        orderTime: item.orderTime,
        finishTime: item.finishTime,
        positionId: item.positionId,
        subUnionId: item.subUnionId,
        estimateCosPrice: item.estimateCosPrice,
        wechat_uid: personMap.wechat_uid,
        account_name: personMap.account_name
      }
    }))
  }
  return { jdGoodList, orderIds, orderIdMap }
}

// 将最新的订单数据插入表中jd_goods_list
const insertJDlist = async(startTime, endTime) => {
  // 获取最近5分钟订单数据
  let { jdGoodList, orderIds, orderIdMap } = await getJdOrderList(startTime, endTime)
  console.log('jdGoodList==>', jdGoodList)
  let insertRes = ''
  if(orderIds.length > 0){
    // 1、根据订单id查询表中已存在的订单数据
    let querySql = `select orderId,estimateCosPrice,actualCosPrice,actualFee,estimateFee,validCode,finishTime from jd_goods_list where orderId in (${orderIds.join(",")})`
    let queryDataRes = await queryData(querySql)
  
    // 2、更新表中已有的订单数据
    let filterOrderIds = [] //需要过滤的订单id
    let updateKeys = ["finishTime", "validCode", "estimateFee", "actualFee", "actualCosPrice", "estimateCosPrice"]
    queryDataRes.forEach( async element => {
      let uadateWhereSql = `orderId='${element.orderId}'`
      let upadateValues = [ 
        orderIdMap[element.orderId].finishTime, 
        orderIdMap[element.orderId].validCode, 
        orderIdMap[element.orderId].estimateFee, 
        orderIdMap[element.orderId].actualFee, 
        orderIdMap[element.orderId].actualCosPrice, 
        orderIdMap[element.orderId].estimateCosPrice
      ]
      filterOrderIds.push(element.orderId)
      let updateTableRes = await updateData('jd_goods_list', updateKeys, upadateValues, uadateWhereSql)
    });
  
    // 3、过滤掉已经更新的数据
    let afterFileterData = jdGoodList.filter(item => {
      let ordId = item.orderId.toString()
      return !filterOrderIds.includes(ordId)
    })
    console.log('afterFileterData==>', afterFileterData)
    if(afterFileterData.length > 0){
      // 4、将数据插入表中
      let tableKeys = [
        "price",'skuName','skuNum','finalRate','commissionRate','estimateFee','actualFee',
        'actualCosPrice','orderId','validCode','orderTime','finishTime','subUnionId', 'positionId',
        'estimateCosPrice','wechat_uid','account_name'
      ]
      insertRes = await insertData('jd_goods_list', tableKeys, afterFileterData)
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

// insertJDlist("2023-02-26 19:04:00","2023-02-26 19:06:00")

getJdOrderList("2023-02-27 22:46:00", "2023-02-27 22:50:00")