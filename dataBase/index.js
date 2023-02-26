// get the client
const mysql = require('mysql2');

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: "ShenXiaoBo@520",
  database: 'bobokeji01'
});

const poolPromise = pool.promise()

// 查询/删除数据库
const queryData = async(sql)=>{
  let res = await poolPromise.execute(sql)
  return res[0]
}
exports.queryData = queryData


const insertTable = async (tableName, fieds, Values) => {
  let fiedsString = ''
  let valuestrings = []

  Values.forEach(re => {
    let tempArray = []
    fieds.forEach(item => {
      tempArray.push(`'${re[item]}'`)
    })
    valuestrings.push(`(${tempArray.join(',')})`)
  });
  let sql = `insert into ${tableName}(${fieds.join(',')}) values${valuestrings.join(',')}`
  try{
    const res = await poolPromise.execute(sql)
    return res[0].insertId
  }catch(err){
    throw new Error(err)
  }
}
exports.insertData = insertTable

// 更新数据
const updateData = async(tableName, keys, values, wheresql) => {
  let tempArray = []
  keys.forEach(element => {
    tempArray.push(`${element}=?`)
  });
  let sql = `update ${tableName} set ${tempArray.join(',')} where ${wheresql}`
  let res = await poolPromise.execute(sql, values)
  return res[0]
}
exports.updateData = updateData
// let sql = "delete from jd_goods_list where price = 60" // 删除数据
// let sqlquery = "select * from user " // 查询数据
// queryData(sql)
// let keys = ['wechat_uid', "user_nickname"]
// let values = [{wechat_uid:"1234", user_nickname:"bobo1"}, {wechat_uid:"4567", user_nickname:"bobo2"}]
// insertTable('user', keys, values)
// updateData('user', ['wechat_uid', 'user_nickname'], ['test', 16], 'user_id=1')