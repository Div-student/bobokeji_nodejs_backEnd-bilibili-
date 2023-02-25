
const Router = require('koa-router')
const router = new Router()
const { commconfig } = require('../../utils/commconfig')
const { queryData } = require('../../dataBase/index')

router.post('/get', async (ctx, next) => {
  let requestParam = ctx.request.body
  // 获取用户weichatUid对应的userId
  let userSql = `select * from user where wechat_uid='${requestParam.weichatUid}'`
  let usreInfor = await queryData(userSql)
  let jDlistRes = []
  let responseCode = 0
  if(usreInfor.length > 0){
    let userId = usreInfor[0].user_id
    // 根据userId获取京东订单数据
    let whereSql = `where positionId='${userId}'`
    let jdSql = `select * from jd_goods_list ${whereSql} order by record_id desc limit ${requestParam.pageNum},${requestParam.pageSize} `
    // 判断是否为超级管理员，超级管理员可以查看所有订单
    let isSuperManager = commconfig.superManagerIds.includes(userId)
    if(isSuperManager){
      jdSql = `select * from jd_goods_list order by record_id desc limit ${requestParam.pageNum},${requestParam.pageSize}`
    }
    jDlistRes = await queryData(jdSql)
  }else{
    responseCode = 1
  }
  ctx.body = {
    code: responseCode,
    jdList: jDlistRes
  }
  next()
})
module.exports = router