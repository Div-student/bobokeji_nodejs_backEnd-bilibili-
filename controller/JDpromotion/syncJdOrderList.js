/**
 * 同步京东订单到数据库
 */ 
const { apiRequest } = require("../../utils/dataokeSdkRequest")
const { commconfig } = require("../../utils/commconfig")
const { insertData, updateData, queryData } = require("../../dataBase/index.js")

// 获取京东订单数据
const getJdOrderList = async(startTime, endTime) => {
  let orderlistUrl = 'https://openapi.dataoke.com/api/dels/jd/order/get-official-order-list'
  let params = {
    type: 3, // 订单时间查询类型 1：下单时间，2：完成时间（购买用户确认收货时间），3：更新时间
    key: commconfig.JDKEY, // 京东联盟授权key
    startTime: startTime, // 开始时间 格式yyyy-MM-dd HH:mm:ss，与endTime间隔不超过1小时
    endTime: endTime // 结束时间 格式yyyy-MM-dd HH:mm:ss，与startTime间隔不超过1小时
  }
  let goodListRes = await apiRequest(orderlistUrl, params)
  let jdGoodList = []
  let orderIds = []
  let orderIdMap = {}
  if(goodListRes.code === 0 && goodListRes.data.length>0){
    jdGoodList = goodListRes.data.map((item) => {
      orderIds.push(item.orderId)
      orderIdMap[item.orderId] = item
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
        estimateCosPrice: item.estimateCosPrice
      }
    })
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
        'actualCosPrice','orderId','validCode','orderTime','finishTime','subUnionId', 'positionId','estimateCosPrice'
      ]
      insertRes = await insertData('jd_goods_list', tableKeys, afterFileterData)
    }
  }
  return insertRes
}
exports.insertJDlist = insertJDlist

