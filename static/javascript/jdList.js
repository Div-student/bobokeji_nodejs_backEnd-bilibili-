function getJdlist(){
  // 请求用户京东订单数据
  var jdlist = [
    {
      goodName: "菜鸟课程",
      orderPrice: 1,
      returnPercent: 70,
      getMoney: 20,
      orderStatus: "有效",
      orderDesc: "完成"
    },
    {
      goodName: "000波波科技课程121212121212121121sdfsfdsfdsfsfdsfsdf",
      orderPrice: 100,
      returnPercent: 80,
      getMoney: 90,
      orderStatus: "有效",
      orderDesc: "完成"
    }
  ]

  // 拼装订单列表并且渲染到页面
  let JdlistWrapDom = document.getElementById("JdlistWrap")
  jdlist.forEach((item)=>{
    let divDom = document.createElement("div")
    divDom.innerHTML = `
      <div role="option" class="weui-form-preview__hd">
              <div class="weui-form-preview__item">
                  <label class="weui-form-preview__label">商品名称</label>
                  <em class="weui-form-preview__value">${item.goodName}</em>
              </div>
          </div>
          <div role="option" aria-labelledby="p1 js_a11y_comma p2 js_a11y_comma p3" class="weui-form-preview__bd">
              <div id="p1" class="weui-form-preview__item">
                  <label class="weui-form-preview__label">订单金额</label>
                  <span class="weui-form-preview__value">¥${item.orderPrice}</span>
              </div>
              <div id="p1" class="weui-form-preview__item">
                  <label class="weui-form-preview__label">返现比率</label>
                  <span class="weui-form-preview__value">${item.returnPercent}%</span>
              </div>
              <div id="p2" class="weui-form-preview__item">
                  <label class="weui-form-preview__label">预估收益</label>
                  <span class="weui-form-preview__value">¥${item.getMoney}</span>
              </div>
              <div id="p3" class="weui-form-preview__item">
                  <label class="weui-form-preview__label">订单状态(${item.orderStatus})</label>
                  <span class="weui-form-preview__value">${item.orderDesc}</span>
              </div>
          </div>
    `
    JdlistWrapDom.appendChild(divDom)
  })
  
}
getJdlist()