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
  console.log('res==>', res[0])
}

let sql = "delete from user where user_id = '2'" // 删除数据
let sqlquery = "select * from user " // 删除数据

// 新增数据
const insertData = async (tableName, keys, values)=>{
  let sql = `insert into ${tableName} (${keys.join(',')}) values ${values.join(',')}`
  let res = await poolPromise.execute(sql)
  console.log('res==>', res[0])
}

// 更新数据
const updateData = async(tableName, keys, values, wheresql) => {
  let tempArray = []
  keys.forEach(element => {
    tempArray.push(`${element}=?`)
  });
  let sql = `update ${tableName} set ${tempArray.join(',')} where ${wheresql}`
  let res = await poolPromise.execute(sql, values)
  console.log('res==>', res[0])
}

queryData(sqlquery)
// let keys = ['user_name', "user_age"]
// let values = ["('bobokeji03', 20)", "('bobokeji04', 21)"]
// insertData('user', keys, values)
// updateData('user', ['user_name', 'user_age'], ['bobokeji004', 16], 'user_id=5')