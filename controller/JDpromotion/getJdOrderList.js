
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
  let jdSql = `select * from jd_goods_list ${whereSql} order by record_id desc limit ${requestParam.pageNum},${requestParam.pageSize} `
  // 判断是否为超级管理员，超级管理员可以查看所有订单
  let isSuperManager = commconfig.superManagerIds[weuid]
  if(isSuperManager){
    jdSql = `select * from jd_goods_list where account_name='${isSuperManager}' order by record_id desc limit ${requestParam.pageNum},${requestParam.pageSize}`
  }
  console.log("jdSql===>", jdSql)
  jDlistRes = await queryData(jdSql)
  ctx.body = {
    code: responseCode,
    jdList: jDlistRes
  }
  next()
})
module.exports = router