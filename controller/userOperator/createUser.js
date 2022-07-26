const {queryData, insertData} = require('../../dataBase/index')

const createUser = async (openId) =>{
  if(!openId) return;
  // 查询user表中是否保存用户的openId
  let querySql = `select * from user where wechat_uid='${openId}'`
  let result = await queryData(querySql)
  console.log('result===>', result)
  // 新增用户
  if(result.length === 0){
    let insertRes = await insertData('user',['wechat_uid'],[`('${openId}')`])
    console.log('insertRes===>', insertRes)
  }
}
exports.createUser = createUser