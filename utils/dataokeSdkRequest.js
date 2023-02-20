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

