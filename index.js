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
const { getTaoBaoPro } = require('./utils/getTaoBaoProduct')



app.use(async ctx => {
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
    if(xmlJson.MsgType==='event' && xmlJson.EventKey === 'chifanpiao'){
      xmlJson.type = "news"
      xmlJson.content = [
        {
          title: '波波科技测试',
          description: '波波科技测试',
          picurl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F1115%2F101021113337%2F211010113337-6-1200.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1654594035&t=6e5217870597b6df9d6d0d7af1ebd452',
          url: 'https://developers.weixin.qq.com/doc/offiaccount/Message_Management/Passive_user_reply_message.html#5'
        }
      ]
      xmlJson.count = 1
    } else if(xmlJson.MsgType==='text'){
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
    let resMsg = createResData(xmlJson)
    ctx.body = resMsg
  }
})

router.get('/home', async (ctx) =>{
  await ctx.render('home', {name:'波波科技网络工作室001'})
})

app.listen('8080')
console.log('serve is on at 8080')