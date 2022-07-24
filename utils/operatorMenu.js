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
        "name":"购物票",
        "sub_button":[
          {	
            "type":"view",
            "name":"优惠优选",
            "url":"http://www.soso.com/"
          },
          {	
            "type":"view",
            "name":"解析返现",
            "url":"https://www.bilibili.com/"
          }
        ]
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