const Router = require('koa-router')
const router = new Router()

const {queryData, insertData} = require('../../dataBase/index')
const { setRedisValue, setRedisMap } = require("../../dataBase/redis")
const crypto = require('crypto');



// 生成授权有效期token
// const generateDateToken = async (expireDate, machId, price) => {
router.post('/get', async (ctx, next) => {
  let requestParam = ctx.request.body
  let expireDate = requestParam.expireDate
  let machId = requestParam.machId
  let price = requestParam.price.toString()

  const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAm3BJToxPeoAWn4DpmrEF
wdCcDxN7uiyDC+1zBbH949i5/rCbuxKj5NKHf7cs2+UpRbJLACJ+44AKGwXJ2xCB
VWiwAbZGOXl+Pne0F+rtT2aN0mbBSX7KTntc7nvCbmowQVp9StYOGc0h23I33H0B
L9Z/qC90HpjbdqWipLTQc/xpgtBvZgRYdBID3wRG21sDmUI4GXfRHH4Dq1LEE9/c
E7fX7veSETbAs9RmoskxHQ8UIqSTBRDDnrm5HmH4hHbEv6uh70pjxY1qFpPV7mFl
qU1NCj0kum8Pq6gjUPiOYStKaBnIZMq/TRLy1s1AhQbGnSd+3ZAOmRDtK9I4zvcO
IQIDAQAB
-----END PUBLIC KEY-----`

  // const unniId = "2024-10-21_59695ba15d4bdcc6187994c2b242c231713da5b9ae9215d01fee1f817450c70d";
  let unniId = `${expireDate}_${machId}`;
  // 使用公钥加密数据 生成token
  let encryptedData = crypto.publicEncrypt(publicKey, Buffer.from(unniId));
  let encryptedDataBase64 = encryptedData.toString('base64')
  console.log('加密后的数据:', encryptedDataBase64,encryptedDataBase64.length);
  // 存储激活码信息到mysql的表里
  let codeInfo = {
    'mechine_id': machId,
    'effictive_date': expireDate,
    'activation_code': encryptedDataBase64,
    'price': price, 
    'create_date': getCurrentDateString()
  }
  console.log('入表数据:', codeInfo);
  let insertRes = await insertData('mofish_activation_code',['mechine_id','effictive_date','activation_code','price', 'create_date'],[{ ...codeInfo }])
  console.log('入表数据:insertRes', insertRes);
  ctx.body = {
    encryptedDataBase64: encryptedDataBase64,
    'effictive_date': expireDate
  }
  // return encryptedDataBase64

})
// }

function getCurrentDateString() {
  const now = new Date(); // 获取当前时间

  // 获取年份、月份和日期
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份从 0 开始
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  // 格式化为 "yyyy-mm-dd hh:mm:ss"
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// generateDateToken("2024-10-21", "59695ba15d4bdcc6187994c2b242c231713da5b9ae9215d01fee1f817450c70d", "5.99")

// exports.generateDateToken = generateDateToken

module.exports = router