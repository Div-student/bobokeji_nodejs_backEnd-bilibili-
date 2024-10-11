const Router = require('koa-router')
const router = new Router()

const {queryData, insertData} = require('../../dataBase/index')



// 生成授权有效期token
router.post('/get', async (ctx, next) => {
  let requestParam = ctx.request.body
  let machId = requestParam.machId

  // 查询user表中是否保存用户的openId
  let querySql = `select * from mofish_activation_code where mechine_id='${machId}' order by create_date desc`
  let result = await queryData(querySql)

  ctx.body = {result}

})

module.exports = router