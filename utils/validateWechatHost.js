const { createHash } = require('crypto')


const validateWechatHost = async (ctx)=>{
  const token = 'abcefg123'
  const {signature, echostr, timestamp, nonce} = ctx.query
  // 将token、timestamp、nonce三个参数进行字典序排序
  const stringArray = [timestamp, nonce, token]
  const resultArray = stringArray.sort()
  // 将三个参数字符串拼接成一个字符串进行sha1加密
  const resultString = resultArray.join('')
  const hashResut = createHash('sha1').update(resultString).digest('hex')
  let isWechatHost = false
  if(hashResut === signature){
    isWechatHost = true
  }
  console.log('hashResut===>', hashResut)
  console.log('signature===>', signature)
  return {  echostr, isWechatHost }
}

module.exports = validateWechatHost