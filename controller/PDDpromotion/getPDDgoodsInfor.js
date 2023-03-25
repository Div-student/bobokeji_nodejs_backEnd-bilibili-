const dtkSdk = require('dtk-nodejs-api-sdk');
let url = require('url');
let querystring = require("querystring");
let moment = require('moment')

const { getMutiplePartAccount } = require('../../utils/setMutiplePart')


// 提取链接中的参数信息
const getParamsFromUrl = (urlPrama) => {
  let paramsString = url.parse(urlPrama).query
  let paramsObj = querystring.parse(paramsString)
  return paramsObj
}

const dataokeApiRes = async(accountName) => {
  // 根据不同的公众号初始化不同账号请求信息
  let daTaoKeAppKey = await getMutiplePartAccount(accountName, "daTaoKeAppKey")
  let daTaoKeAppSecret = await getMutiplePartAccount(accountName, "daTaoKeAppSecret")
  const sdkReq = new dtkSdk({appKey:daTaoKeAppKey, appSecret:daTaoKeAppSecret, checkSign:2});
  return sdkReq
}

// 获取PDD商品详情
const getPDDgoodsDetail = async(url, userId, accountName) => {
  // 获取链接中的商品id
  let { goods_id } = getParamsFromUrl(url)
  console.log('goods_id====>', goods_id)

  // 获取PDD商品详情 https://openapi.dataoke.com/api/dels/pdd/goods/detail
  let dataokeReq = await dataokeApiRes(accountName)
  let goodRes = await dataokeReq.request('https://openapi.dataoke.com/api/dels/pdd/goods/detail',{
    method:"GET",
    form:{ goodsId: goods_id, version: "v2.0.0" }
  })
  let pDDgoodInfo = {}
  let keyInfo = {}
  if(goodRes.code === 0 && goodRes.data){
    let formatData = goodRes?.data
    keyInfo = {
      goodsSign:formatData.goodsSign,
      goods_image_url: formatData.goodsImageUrl, // 多多进宝商品主图
      extra_coupon_amount: formatData.extraCouponAmount, // 额外优惠券
    }
  }

  // 获取PDD推广位ID
  let PddPid = await getMutiplePartAccount(accountName, "PDDpid")
  console.log('PddPid===>', PddPid)

  // 获取PDD商品转链
  let goodResURl = await dataokeReq.request('https://openapi.dataoke.com/api/dels/pdd/kit/goods-prom-generate',{
    method:"GET",
    form: {
      pid: PddPid,
      goodsSign: keyInfo.goodsSign, 
      customParameters: JSON.stringify({ uid:"bobokeji", userId }), 
      version: "v2.0.0" 
    }
  })
  
  if(goodResURl.code === 0 && goodResURl.data){
    let formatData = goodResURl?.data
    console.log('formatData===>', formatData)
    pDDgoodInfo = {
      ...keyInfo,
      coupon_remain_quantity: formatData.couponRemainQuantity, // 优惠券剩余数量
      promotion_rate: formatData.promotionRate, // 佣金比例，千分比
      goods_name: formatData.goodsName, // 商品名称
      predict_promotion_rate: formatData.predictPromotionRate, // 比价行为预判定佣金，当值为0时即为比价订单
      coupon_discount: formatData.couponDiscount/1, // 优惠券面额，单位为分
      min_group_price: formatData.minGroupPrice/1, // 最低价sku的拼团价，单位为分
      min_normal_price: formatData.minNormalPrice/1, // 最低价sku的单买价，单位为分
      coupon_min_order_amount: formatData.couponMinOrderAmount/1, //优惠券门槛金额，单位为分
      coupon_total_quantity: formatData.couponTotalQuantity, // 优惠券总数量
      has_coupon: formatData.hasCoupon, // 商品是否有优惠券 true-有，false-没有
      urlWithGoodSign: formatData.mobileShortUrl  // 优惠券领取下单跳转链接
    }
  }
  return pDDgoodInfo
}

// let PDDURL = 'https://mobile.yangkeduo.com/goods.html?goods_id=224118279869&page_from=29&pxq_secret_key=OCWBHRLD5WMX372IV7DQ4KTBBOA5AVNQ5TTDGAT2CIVPWVJD3P2A&_oak_share_detail_id=2390748209&_oak_share_time=1679759024&_oak_share_snapshot_num=13700&share_uin=OTILKWQGHFWI5BAAH5AZ7BDSH4_GEXDA&refer_share_id=a48ce0a22fb34c3d8657c4bfdf71f826&refer_share_uin=OTILKWQGHFWI5BAAH5AZ7BDSH4_GEXDA&refer_share_channel=copy_link&refer_share_form=text'
// getPDDgoodsDetail(PDDURL, 'oBHe40ybW1KyGblscxI4uTaGExWo', "gh_16c32413485a")


exports.getPDDgoodsDetail = getPDDgoodsDetail