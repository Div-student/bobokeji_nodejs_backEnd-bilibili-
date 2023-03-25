/**
 * 往redis里设置多租户的账号配置信息
 */
const { setRedisMap, getRedisMap } = require('../dataBase/redis')
const { commconfig } = require("./commconfig")
const {queryData, insertData, updateData} = require("../dataBase/index")

// 更新mysql数据库数据
const setMutiplePartDB = async(account, accountType, insertValues, updateValues) => {
  let fields = ["account_name", "account_type", "account_value"]
  // 判断mysql数据库里是否存在该数据
  let res = await queryAccountFromDB(account, accountType)
  if(res){
    await updateData("mutiple_part", fields, updateValues,`account_name='${account}' and account_type='${accountType}'`)
  }else{
    await insertData("mutiple_part", fields, insertValues)
  }
}

const setMutiplePart = async(xmlJson) => {
  let sendMsg = ``
  console.log('commconfig.systemManager', commconfig.systemManager, xmlJson.FromUserName)
  // 判断发起账号设置请求的来源是否为超级管理员
  if(commconfig.systemManager != xmlJson.FromUserName) {
    sendMsg = `您没有设置的权限，请联系你的管理员`
    return sendMsg
  }

  // 判断设置的账号类型是否符合要求(大淘客appkey、大淘客密钥、京东联盟账号)
  let acountKey = xmlJson.Content.split(' ')[1]
  let acountValue = xmlJson.Content.split(' ')[2]
  let accountTypes = ["daTaoKeAppKey", "daTaoKeAppSecret", "JDunionId", "PDDpid"]
  if(!accountTypes.includes(acountKey)){
    sendMsg = '您设置的账号类型不对'
    return sendMsg
  } 
  
  // mysql数据库和redis里缓存不同公众号对接的联盟账号信息
  let insertMap = {account_name:xmlJson.ToUserName, account_type:acountKey, account_value:acountValue}
  let updateValues = [xmlJson.ToUserName, acountKey, acountValue]
  await setMutiplePartDB(xmlJson.ToUserName, acountKey, [insertMap], updateValues)
  await setRedisMap(xmlJson.ToUserName, acountKey, acountValue)
  sendMsg = `恭喜你设置${acountKey}成功`
  return sendMsg
}
exports.setMutiplePart = setMutiplePart

// 获取不同租户的账号信息
const getMutiplePartAccount = async(accountName, acountKey) => {
  let accountValue
  // 优先从redis里获取
  accountValue = await getRedisMap(accountName, acountKey)
  if(!accountValue){ // 如果redis里账号不存在则取DB查询数据
    accountValue = await queryAccountFromDB(accountName, acountKey)
  }
  return accountValue
}

const queryAccountFromDB = async(accountName, acountKey)=>{
  let sql = `select * from mutiple_part where account_name='${accountName}' and account_type='${acountKey}'`
  let results = await queryData(sql)
  return results[0]?.account_value
}

exports.getMutiplePartAccount = getMutiplePartAccount