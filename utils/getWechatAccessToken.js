const rq = require('request-promise')
const fs = require('fs')
const { getRedisMap, setRedisMap } = require('../dataBase/redis')

const file_path = __dirname + '/token_file/accessToken.json'

// 测试号的 APPID && APPSECRET
const APPID = 'wxe*******5b8'
const APPSECRET = '6386*******506'

// 生产环境的 APPID && APPSECRET
// const APPID = 'wxe*******547c'
// const APPSECRET = '075a*******5a28'

let uri = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`

const updateAccessToken = async (accountName) => {
  // 请求微信接口获取token 
  let resAccessToken = await rq(uri)
  let fomateToken = JSON.parse(resAccessToken)
  let expireTime = new Date().getTime() + fomateToken.expires_in * 1000
  fomateToken.expireTime = expireTime
  let formatToken = JSON.stringify(fomateToken)
  await setRedisMap(accountName,"weChatToken", formatToken)
}

const getAccessToken = async (accountName="testAccount") => {
  // 获取本地存储的accessToken
  let localToken = await getRedisMap(accountName, "weChatToken")
  let resultToken = ''
  if(localToken){ // 如果wechatToken不存在则更新token到redis中
    // 判断本地token是否过期
    let localTokenFormate = JSON.parse(localToken)
    resultToken = localTokenFormate.access_token
    let nowTime = new Date().getTime()
    if(nowTime - localTokenFormate.expireTime >= 0){
      await updateAccessToken(accountName)
      await getAccessToken(accountName)
    }
  }else{
    await updateAccessToken(accountName)
    await getAccessToken(accountName)
  }
  return resultToken
}

// const testsetMap = async(accountName) => {
//   let formatToken = "{\"access_token\":\"67_XsUNqUdQm-IMZnEC_DzfOxzTWxStGD1zF9kuBBA7AFOvK59C1lGH15JXdzceRCZpXnOhUSUxJ_fisQsYq-OAylKOdeefJMHcKlaakWS0Z1REGOW1VZVq1hQhgsgQTSbAIAGJI\",\"expires_in\":7200,\"expireTime\":1600748911706}"
//   await setRedisMap(accountName, "weChatToken", formatToken)
// }

module.exports = getAccessToken

// getAccessToken("testAccount").then(res => {
//   console.log("accessToke===>", res)
// })

// testsetMap("testAccount").then(res => {
//   console.log("accessToke===>", res)
// })

