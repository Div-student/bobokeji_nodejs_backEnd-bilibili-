const dtkSdk = require('dtk-nodejs-api-sdk');
const { commconfig } = require('./commconfig');
const sdk = new dtkSdk({appKey:commconfig.appKey, appSecret:commconfig.appSecret, checkSign:2});

const apiRequest = async (url, parms) => {
  let selUrlDetail = await sdk.request(url,{
    method:"GET",
    form:{ version: 'v1.0.0', ...parms }
  })
  return selUrlDetail
}
exports.apiRequest = apiRequest

const mutiApiReq = (url, startTime, endTime)=>{ // 返回多个公众号请求的promise
  let promiseList = []
  let accounts = commconfig.mutiaccounts
  promiseList = accounts.map(async items => {
    let params = {
      type: 3, // 订单时间查询类型 1：下单时间，2：完成时间（购买用户确认收货时间），3：更新时间
      key: items.JDKEY, // 京东联盟授权key
      startTime: startTime, // 开始时间 格式yyyy-MM-dd HH:mm:ss，与endTime间隔不超过1小时
      endTime: endTime, // 结束时间 格式yyyy-MM-dd HH:mm:ss，与startTime间隔不超过1小时
      version: 'v1.0.0'
    }
    let sdkReq = new dtkSdk({appKey:items.appKey, appSecret:items.appSecret, checkSign:2});
    let selUrlDetail = await sdkReq.request(url,{
      method:"GET",
      form:params
    })
    return selUrlDetail
  })
  return promiseList
}
exports.mutiApiReq = mutiApiReq

