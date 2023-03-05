const koa = require('koa')
const app = new koa()
const path = require("path")
const xml2js = require("xml2js")

const koaBody = require("koa-body")
app.use(koaBody({json: true}))

const static = require('koa-static')
app.use(static(path.join(__dirname, '/static')))

const views = require('koa-views')
app.use(views('./view', {map:{"html":'ejs'}}))

const Router = require('koa-router')
const router = new Router()
app.use(router.routes())

const validateWechatHost = require('./utils/validateWechatHost')
const { createResData } = require('./utils/createRespondData')
const { createUser } = require('./controller/userOperator/createUser')
const { sendMsg, sendNewsMsg } = require('./utils/sendMsg')


app.use(async ctx => {
  console.log('ctx.query===>', ctx.query)
  let validateRes = await validateWechatHost(ctx)
  if(ctx.request.method == "GET" && validateRes.isWechatHost){
    ctx.body = validateRes.echostr
  }else if(ctx.request.method == "POST" && validateRes.isWechatHost){
    let xmlString = await xml2js.parseStringPromise(ctx.request.body)
    let xmlTemp = xmlString.xml
    let xmlJson = {}
    for(let item in xmlTemp){
      xmlJson[item] = xmlTemp[item][0]
    }
    console.log("xmlJson", xmlJson)
    let xmlMsg = ''
    if(xmlJson.MsgType==='event' && xmlJson.EventKey === 'chifanpiao'){
      xmlMsg = await sendNewsMsg(xmlJson)
    } else if(xmlJson.MsgType==='text'){
      // 新增用户绑定openId
      await createUser(xmlJson.FromUserName, xmlJson.ToUserName)
      xmlMsg = await sendMsg(xmlJson)
    }
    let resMsg = createResData(xmlMsg)
    ctx.body = resMsg
  }
})

/**
 * 页面渲染
 */
router.get('/home', async (ctx) =>{
  await ctx.render('home', {name:'波波科技网络工作室001'})
})
router.get('/jdlist', async (ctx) =>{
  await ctx.render('jdList', {})
})
// router.get('/', async (ctx) =>{
//   await ctx.render('index', {})
// })

/**
 * 接口api
 */
// 根据用户的wechat_uid获取JD订单列表 api: /jdOrderList/get
const getJdOrderList = require('./controller/JDpromotion/getJdOrderList')
router.use('/jdOrderList', getJdOrderList.routes())


app.listen('8080')
console.log('serve is on at 8080')