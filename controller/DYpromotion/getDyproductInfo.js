const rq = require('request-promise')
const { getMutiplePartAccount } = require('../../utils/setMutiplePart')

let douyingProInfor = {
  shopName: '',
  goodName:'',
  couponInfo: 0, // 优惠券
  price: 0, // 券后价格
  returnMoney: '', // 额外返现
  longTpwd: '' // 淘口令
}

// 抖音精选联盟商品搜索API接口
const searchProApi = async (title, accountName) => {
  douyingProInfor = {
    shopName: '',
    goodName:'',
    couponInfo: 0, // 优惠券
    price: 0, // 券后价格
    returnMoney: '', // 额外返现
    longTpwd: '' // 淘口令
  }

  let JTKpubId = await getMutiplePartAccount(accountName, "JTKpubId") 
  // let JTKpubId = 5570
  let rqParam = {
    "pub_id": JTKpubId,
    "title": title
  }

  let param = {
    method: "POST",
    uri: `http://api.act.jutuike.com/dyfx/product_search`,
    body: rqParam,
    json: true
  }

  let res = await rq.post(param)

  if(res.code == 1 && res.total_results > 0){
    let proData = res.data[0]
    douyingProInfor.shopName = proData.shop_name
    douyingProInfor.goodName =  proData.title
    douyingProInfor.couponInfo = (proData.coupon_price/100).toFixed(2)
    douyingProInfor.price = (proData.price/100).toFixed(2)
    douyingProInfor.returnMoney = (proData.cos_fee/100).toFixed(2)
    await getProApi(proData.product_id, JTKpubId)
  }
  console.log('douyingProInfor===>', douyingProInfor)
  return douyingProInfor
} 


// 抖音精选联盟商品转链API接口
const getProApi = async (id, pub_id) => {
  let rqParam = {
    pub_id,
    "product_url": id,
    "sid": "123456"
  }

  let param = {
    method: "POST",
    uri: `http://api.act.jutuike.com/dyfx/product_privilege`,
    body: rqParam,
    json: true
  }
  let res = await rq.post(param)
  if(res.code == 1){
    douyingProInfor.longTpwd = res.data.dy_password
  }else{
    douyingProInfor = {
      couponInfo: 0, // 优惠券
      price: 0, // 券后价格
      returnMoney: '', // 额外返现
      longTpwd: '' // 淘口令
    }
  }
}

exports.searchProApi = searchProApi

// let title = `9.28 reo:/ r@r.Rx 01/26 【抖音商城】https://v.douyin.com/i2wDMRRN/ 【卡宾熊】130g*10袋猫耳酥休闲零食童年回忆猫耳朵食品
// 长按复制此条消息，打开抖音搜索，查看商品详情！`

// searchProApi(title)