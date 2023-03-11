const {queryData, insertData} = require('../../dataBase/index')
const { setRedisValue, setRedisMap } = require("../../dataBase/redis")

const createUser = async (openId, accountName) =>{
  if(!openId) return;
  // 查询user表中是否保存用户的openId
  let querySql = `select * from user where wechat_uid='${openId}' and account_name='${accountName}'`
  let result = await queryData(querySql)
  console.log('result===>', result)
  // 新增用户
  if(result.length === 0){
    let insertRes = await insertData('user',['wechat_uid','account_name'],[{ wechat_uid:openId, account_name:accountName }])
    await setRedisValue(`${insertRes}`, `${openId},${accountName}`) // 组合成以用户id为key值，用户的openid和公众号名称为value值的键值对
    await setRedisMap() // 构造成一个用户openid为key,
  }
}
exports.createUser = createUser