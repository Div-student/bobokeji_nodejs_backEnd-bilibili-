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

const mutiApiReq = (url, parms)=>{ // 返回多个公众号请求的promise
  let promiseList = []
  let accounts = commconfig.mutiaccounts
  promiseList = accounts.map(async items => {
    let sdkReq = new dtkSdk({appKey:items.appKey, appSecret:items.appSecret, checkSign:2});
    let selUrlDetail = await sdkReq.request(url,{
      method:"GET",
      form:{ version: 'v1.0.0', ...parms }
    })
    return selUrlDetail
  })
  return promiseList
}
exports.mutiApiReq = mutiApiReq

