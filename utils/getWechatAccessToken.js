const rq = require('request-promise')
const fs = require('fs')

const file_path = __dirname + '/token_file/accessToken.json'

// 测试号的 APPID && APPSECRET
// const APPID = 'wxeaf6f9a5e5b669b8'
// const APPSECRET = '6386bad5201d9797b0fa53a96ecead06'

// 生产环境的 APPID && APPSECRET
const APPID = 'wx25d2688c82238171'
const APPSECRET = 'ac27b337e1cb6f815553076c4c0d2010'

let uri = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`

const updateAccessToken = async () => {
  // 请求微信接口获取token 
  let resAccessToken = await rq(uri)
  let fomateToken = JSON.parse(resAccessToken)
  let expireTime = new Date().getTime() + fomateToken.expires_in * 1000
  fomateToken.expireTime = expireTime
  fs.writeFileSync(file_path, JSON.stringify(fomateToken))
}

const getAccessToken = async () => {
  // 获取本地存储的accessToken
  try{
    let localToken = await fs.readFileSync(file_path, 'utf8')

    // 判断本地token是否过期
    let localTokenFormate = JSON.parse(localToken)
    let nowTime = new Date().getTime()

    let resultToken = ''
    if(nowTime - localTokenFormate.expireTime >= 0){
      await updateAccessToken()
      await getAccessToken()
    }else{
      resultToken = localTokenFormate.access_token
    }
    return resultToken
  }catch(e){
    await updateAccessToken()
    await getAccessToken()
  }
  
}

module.exports = getAccessToken

// setInterval(()=>{
//   getAccessToken().then(res => {
//     console.log("accessToke===>", res)
//   })
// }, 7200*1000)


