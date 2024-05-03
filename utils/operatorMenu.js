const rq = require('request-promise')
const getAccessToken = require('./getWechatAccessToken')

const creatMenue = async () => {

  let accessToken = await getAccessToken()
  console.log('accessToken===>', accessToken)

  let rqParam = {
    "button":[
      {	
        "type":"click",
        "name":"吃饭票",
        "key":"chifanpiao"
      },
      {
        "type":"miniprogram",
        "name":"小程序",
        "url":"http://mp.weixin.qq.com",
        "appid":"wx5740cfc1ee869efc",
        "pagepath":"pages/index/index"
      }
    ]
  }

  let param = {
    method: "POST",
    uri: ` https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${accessToken}`,
    body: rqParam,
    json: true
  }
  let res = await rq.post(param)
  console.log('res===>', res)
}

creatMenue()