
const Router = require('koa-router')
const router = new Router()
const { commconfig } = require('../../utils/commconfig')
const { queryData } = require('../../dataBase/index')

router.post('/get', async (ctx, next) => {
  let requestParam = ctx.request.body
  let weuid = requestParam.weichatUid || ''
  console.log("requestParam===>", requestParam.weichatUid)
  let jDlistRes = []
  let responseCode = 0
  // 根据userId获取京东订单数据
  let whereSql = `where wechat_uid='${weuid}'`
  let jdSql = `select * from pdd_goods_list ${whereSql} order by id desc limit ${requestParam.pageNum},${requestParam.pageSize} `
  // 判断是否为超级管理员，超级管理员可以查看所有订单
  let isSuperManager = commconfig.superManagerIds[weuid]
  if(isSuperManager){
    jdSql = `select * from pdd_goods_list where account_name='${isSuperManager}' order by id desc limit ${requestParam.pageNum},${requestParam.pageSize}`
  }
  console.log("jdSql===>", jdSql)
  jDlistRes = await queryData(jdSql)
  let formatRes = jDlistRes.map(item => {
    return {
      "record_id": item.id,
      "price": item.orderAmount,
      "skuName": item.goodsName,
      "skuNum": item.goodsQuantity,
      "commissionRate": item.promotionRate/10,
      "estimateFee": item.promotionAmount.toFixed(2),
      "validCode": item.orderStatus,
      "estimateCosPrice": item.goodsPrice,
      "priceCompareStatus": item.priceCompareStatus
    }
  })
  ctx.body = {
    code: responseCode,
    jdList: formatRes
  }
})
module.exports = router