
// 获取用户的openId和平台类型
let searchParam = window.location.search
let paramList = searchParam.split('&')
let wechatUid = paramList[0]?.split('=')[1]
let pageType = paramList[1]?.split('=')[1]
let urlMap = {
  JD: '/jdOrderList/get',
  PDD: '/pddOrderList/get'
}
let titleMap = {
  JD: '我的京东订单列表',
  PDD: '我的拼多多订单列表'
}

let pageNum = 0
let pageSize = 5
let loadingDom = document.getElementById('mask')
let nodataDom = document.getElementById('nodata')
let viewMoreDom = document.getElementById('viewMore')
let pageTitleDom = document.getElementById('page__title')

pageTitleDom.innerText = titleMap[pageType]

function getJdlist(){
  loadingDom.style.display = " "
  // 请求用户京东订单数据
  let parmas = {
    pageNum,
    pageSize,
    weichatUid: wechatUid
  }
  // 京东订单状态
  // sku维度的有效码（-1：未知,2.无效-拆单,3.无效-取消,4.无效-京东帮帮主订单,5.无效-账号异常,6.无效-赠品类目不返佣,
  // 7.无效-校园订单,8.无效-企业订单,
  // 9.无效-团购订单,11.无效-乡村推广员下单,13.无效-违规订单,14.无效-来源与备案网址不符,15.待付款,16.已付款,17.已完成（购买用户确认收货）,
  // 20.无效-此复购订单对应的首购订单无效,21.无效-云店订单
  const JDstatusMap = {
    2:{
      status: "无效",
      desc: "拆单"
    },
    3:{
      status: "无效",
      desc: "取消"
    },
    4:{
      status: "无效",
      desc: "京东帮帮主订单"
    },
    5:{
      status: "无效",
      desc: "账号异常"
    },
    6:{
      status: "无效",
      desc: "赠品类目不返佣"
    },
    7:{
      status: "无效",
      desc: "校园订单"
    },
    8:{
      status: "无效",
      desc: "企业订单"
    },
    9:{
      status: "无效",
      desc: "团购订单"
    },
    11:{
      status: "无效",
      desc: "乡村推广员下单"
    },
    13:{
      status: "无效",
      desc: "违规订单"
    },
    14:{
      status: "无效",
      desc: "来源与备案网址不符"
    },
    15:{
      status: "有效",
      desc: "待付款"
    },
    16:{
      status: "有效",
      desc: "已付款"
    },
    17:{
      status: "有效",
      desc: "已完成"
    },
    20:{
      status: "无效",
      desc: "此复购订单对应的首购订单无效"
    },
    21:{
      status: "无效",
      desc: "云店订单"
    },
  }

  // PDD订单状态
  // 订单状态：0-已支付；1-已成团；2-确认收货；3-审核成功；4-审核失败（不可提现）；5-已经结算 ;10-已处罚
  const PDDstatusMap = {
    0:{
      status: "有效",
      desc: "已支付"
    },
    1:{
      status: "有效",
      desc: "已成团"
    },
    2:{
      status: "有效",
      desc: "确认收货"
    },
    3:{
      status: "有效",
      desc: "审核成功"
    },
    4:{
      status: "无效",
      desc: "审核失败"
    },
    5:{
      status: "有效",
      desc: "已经结算"
    },
    10:{
      status: "无效",
      desc: "已处罚"
    },
    22:{
      status: "无效",
      desc: "比价订单"
    }
  }

  let statusMap = {
    PDD: PDDstatusMap,
    JD: JDstatusMap
  }
  let tempMap = statusMap[pageType]

  var jdlist = []
  axios.post(urlMap[pageType], parmas).then(res => {
    if(res.data.code === 0){
      jdlist = res.data.jdList
      if(jdlist.length === 0){
        if(pageNum === 0){ // 页面第一次加载如果没有数据的话就显示无数据，隐藏加载更多按钮
          nodataDom.style.display = '';
        }
        alert("没有更多订单数据了")
        viewMoreDom.style.display = 'none'
      }
      // 拼装订单列表并且渲染到页面
      let JdlistWrapDom = document.getElementById("JdlistWrap")
      jdlist.forEach((item)=>{
        let divDom = document.createElement("div")
        if(item.priceCompareStatus === 1){
          item.validCode = 22
        }
        divDom.innerHTML = `
          <div role="option" class="weui-form-preview__hd">
            <div class="weui-form-preview__item">
              <label class="weui-form-preview__label">商品名称</label>
              <em class="weui-form-preview__value">${item.skuName}</em>
            </div>
          </div>
          <div role="option" aria-labelledby="p1 js_a11y_comma p2 js_a11y_comma p3" class="weui-form-preview__bd">
            <div id="p1" class="weui-form-preview__item">
              <label class="weui-form-preview__label">订单金额</label>
              <span class="weui-form-preview__value">¥${item.estimateCosPrice}</span>
            </div>
            <div id="p1" class="weui-form-preview__item">
              <label class="weui-form-preview__label">返现比率</label>
              <span class="weui-form-preview__value">${item.commissionRate}%</span>
            </div>
            <div id="p2" class="weui-form-preview__item">
              <label class="weui-form-preview__label">预估收益</label>
              <span class="weui-form-preview__value">¥${item.estimateFee}</span>
            </div>
            <div id="p3" class="weui-form-preview__item">
              <label class="weui-form-preview__label">订单状态(${tempMap[item.validCode].status})</label>
              <span class="weui-form-preview__value">${tempMap[item.validCode].desc}</span>
            </div>
          </div>
        `
        JdlistWrapDom.appendChild(divDom)
      })
    }else if(res.data.code === 1){
      viewMoreDom.style.display = 'none'
      nodataDom.style.display = '';
      alert("当前用户不存在")
    }
    loadingDom.style.display = "none"
  })
  pageNum += pageSize
}
getJdlist()