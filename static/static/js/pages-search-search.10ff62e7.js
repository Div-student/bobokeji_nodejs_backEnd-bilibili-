(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-search-search"],{"0393":function(t,e,a){"use strict";(function(t){a("7a82");var n=a("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,a("d3b7"),a("159b"),a("c740"),a("c975"),a("3c65"),a("a434");var i=n(a("c7eb")),o=n(a("1da1")),r=n(a("5530")),s=a("26cb"),u=t.importObject("bobokeji-goods"),c={data:function(){return{keyword:"",searchhistoryList:[],goodlist:[]}},watch:{carts:{deep:!0,handler:function(t,e){this.changeSelectCount(t)}}},computed:(0,r.default)({},(0,s.mapGetters)(["carts","totalCount"])),methods:{changeSelectCount:function(t){var e=this;t.forEach((function(t){var a=e.goodlist.findIndex((function(e){return e._id==t._id}));a>=0&&e.$set(e.goodlist[a],"selectCounts",t.selectCounts)}))},onsearch:function(){var t=this;return(0,o.default)((0,i.default)().mark((function e(){return(0,i.default)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:-1==t.searchhistoryList.indexOf(t.keyword)&&t.searchhistoryList.unshift(t.keyword),uni.setStorageSync("searchhistoryList",t.searchhistoryList),t.searchGoodList();case 3:case"end":return e.stop()}}),e)})))()},searchGoodList:function(){var t=this;return(0,o.default)((0,i.default)().mark((function e(){var a;return(0,i.default)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,u.searchGoods(t.keyword);case 2:a=e.sent,t.goodlist=a.data,t.changeSelectCount(t.carts);case 5:case"end":return e.stop()}}),e)})))()},deletehistory:function(t){this.searchhistoryList.splice(t,1),uni.setStorageSync("searchhistoryList",this.searchhistoryList)},selectSearch:function(t){this.keyword=t,this.searchGoodList()},clearSearch:function(){this.goodlist=[]}},onLoad:function(){var t=uni.getStorageSync("searchhistoryList");console.log("templist",t),t.length>0&&(this.searchhistoryList=t)}};e.default=c}).call(this,a("a9ff")["default"])},"0b4f":function(t,e,a){"use strict";a.r(e);var n=a("174f"),i=a("3044");for(var o in i)["default"].indexOf(o)<0&&function(t){a.d(e,t,(function(){return i[t]}))}(o);a("13f2");var r=a("f0c5"),s=Object(r["a"])(i["default"],n["b"],n["c"],!1,null,"132fd050",null,!1,n["a"],void 0);e["default"]=s.exports},"13f2":function(t,e,a){"use strict";var n=a("bcd5"),i=a.n(n);i.a},"174f":function(t,e,a){"use strict";a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return o})),a.d(e,"a",(function(){return n}));var n={uPopup:a("81ea").default,productItem:a("fcee").default,uNumberBox:a("ca6b").default,uButton:a("0256").default},i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticClass:"proSpecs"},[a("u-popup",{attrs:{show:t.proSpecsState,closeable:!0,round:"10","z-index":"20001",overlayStyle:{zIndex:2e4}},on:{close:function(e){arguments[0]=e=t.$handleEvent(e),t.onClose.apply(void 0,arguments)}}},[a("v-uni-view",{staticClass:"proSpecsWrapper"},[a("v-uni-view",{staticClass:"top"}),a("v-uni-view",{staticClass:"body"},[a("v-uni-scroll-view",{staticClass:"scrollView",attrs:{"scroll-y":!0}},[a("v-uni-view",{staticClass:"proItem"},[a("product-item",{attrs:{productInfo:t.detailData,btnState:!1}})],1),t.selectShow?a("v-uni-view",{staticClass:"selectWrapper"},t._l(t.detailData.selectSku,(function(e,n){return a("v-uni-view",{key:e._id,staticClass:"list"},[a("v-uni-view",{staticClass:"title"},[t._v(t._s(e.skuName))]),a("v-uni-view",{staticClass:"group"},t._l(e.attrValues,(function(e,i){return a("v-uni-view",{staticClass:"btn",class:t.skuArr.includes(e.attrName)?"active":"",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.clickSelect(n,i)}}},[t._v(t._s(e.attrName))])})),1)],1)})),1):t._e(),a("v-uni-view",{staticClass:"numSelect"},[a("v-uni-view",{staticClass:"title"},[t._v("购买数量")]),a("u-number-box",{model:{value:t.numvalue,callback:function(e){t.numvalue=e},expression:"numvalue"}})],1)],1)],1),a("v-uni-view",{staticClass:"footer"},[a("u-button",{attrs:{color:"#EC544F",icon:"shopping-cart",iconColor:"#fff",disabled:t.confirmState},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.clickConfirm.apply(void 0,arguments)}}},[t._v("确认")])],1)],1)],1)],1)},o=[]},"1c22":function(t,e,a){var n=a("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/**\n * 自定义颜色\n */uni-view[data-v-30282a05], uni-scroll-view[data-v-30282a05], uni-swiper-item[data-v-30282a05]{display:flex;flex-direction:column;flex-shrink:0;flex-grow:0;flex-basis:auto;align-items:stretch;align-content:flex-start}.u-popup[data-v-30282a05]{flex:1}.u-popup__content[data-v-30282a05]{background-color:#fff;position:relative}.u-popup__content--round-top[data-v-30282a05]{border-top-left-radius:0;border-top-right-radius:0;border-bottom-left-radius:10px;border-bottom-right-radius:10px}.u-popup__content--round-left[data-v-30282a05]{border-top-left-radius:0;border-top-right-radius:10px;border-bottom-left-radius:0;border-bottom-right-radius:10px}.u-popup__content--round-right[data-v-30282a05]{border-top-left-radius:10px;border-top-right-radius:0;border-bottom-left-radius:10px;border-bottom-right-radius:0}.u-popup__content--round-bottom[data-v-30282a05]{border-top-left-radius:10px;border-top-right-radius:10px;border-bottom-left-radius:0;border-bottom-right-radius:0}.u-popup__content--round-center[data-v-30282a05]{border-top-left-radius:10px;border-top-right-radius:10px;border-bottom-left-radius:10px;border-bottom-right-radius:10px}.u-popup__content__close[data-v-30282a05]{position:absolute}.u-popup__content__close--hover[data-v-30282a05]{opacity:.4}.u-popup__content__close--top-left[data-v-30282a05]{top:15px;left:15px}.u-popup__content__close--top-right[data-v-30282a05]{top:15px;right:15px}.u-popup__content__close--bottom-left[data-v-30282a05]{bottom:15px;left:15px}.u-popup__content__close--bottom-right[data-v-30282a05]{right:15px;bottom:15px}',""]),t.exports=e},"1c7f":function(t,e,a){var n=a("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/**\n * 自定义颜色\n */uni-view[data-v-72bdd996], uni-scroll-view[data-v-72bdd996], uni-swiper-item[data-v-72bdd996]{display:flex;flex-direction:column;flex-shrink:0;flex-grow:0;flex-basis:auto;align-items:stretch;align-content:flex-start}[type="search"][data-v-72bdd996]::-webkit-search-decoration{display:none}.u-search[data-v-72bdd996]{display:flex;flex-direction:row;align-items:center;flex:1}.u-search__content[data-v-72bdd996]{display:flex;flex-direction:row;align-items:center;padding:0 10px;flex:1;justify-content:space-between;border-width:1px;border-color:transparent;border-style:solid;overflow:hidden}.u-search__content__icon[data-v-72bdd996]{display:flex;flex-direction:row;align-items:center}.u-search__content__label[data-v-72bdd996]{color:#303133;font-size:14px;margin:0 4px}.u-search__content__close[data-v-72bdd996]{width:20px;height:20px;border-top-left-radius:100px;border-top-right-radius:100px;border-bottom-left-radius:100px;border-bottom-right-radius:100px;background-color:#c6c7cb;display:flex;flex-direction:row;align-items:center;justify-content:center;-webkit-transform:scale(.82);transform:scale(.82)}.u-search__content__input[data-v-72bdd996]{flex:1;font-size:14px;line-height:1;margin:0 5px;color:#303133}.u-search__content__input--placeholder[data-v-72bdd996]{color:#909193}.u-search__action[data-v-72bdd996]{font-size:14px;color:#303133;width:0;overflow:hidden;transition-property:width;transition-duration:.3s;white-space:nowrap;text-align:center}.u-search__action--active[data-v-72bdd996]{width:40px;margin-left:5px}',""]),t.exports=e},"26a4":function(t,e,a){"use strict";a.r(e);var n=a("a115"),i=a("aba1");for(var o in i)["default"].indexOf(o)<0&&function(t){a.d(e,t,(function(){return i[t]}))}(o);a("7c88");var r=a("f0c5"),s=Object(r["a"])(i["default"],n["b"],n["c"],!1,null,"186edb96",null,!1,n["a"],void 0);e["default"]=s.exports},3044:function(t,e,a){"use strict";a.r(e);var n=a("f4f0"),i=a.n(n);for(var o in n)["default"].indexOf(o)<0&&function(t){a.d(e,t,(function(){return n[t]}))}(o);e["default"]=i.a},"349a":function(t,e,a){"use strict";a("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={props:{bgColor:{type:String,default:uni.$u.props.statusBar.bgColor}}};e.default=n},"3f59":function(t,e,a){"use strict";a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return o})),a.d(e,"a",(function(){return n}));var n={uSearch:a("454d").default,uIcon:a("3915").default,productItem:a("fcee").default,prodeuctDetail:a("d838").default,productSpec:a("0b4f").default,carLayout:a("79bc").default},i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{},[a("v-uni-view",{staticClass:"searchWrap"},[a("u-search",{attrs:{placeholder:"请输入搜索内容",clearabled:!0,"show-action":!0,"action-text":"搜索",animation:!0},on:{clear:function(e){arguments[0]=e=t.$handleEvent(e),t.clearSearch.apply(void 0,arguments)},custom:function(e){arguments[0]=e=t.$handleEvent(e),t.onsearch.apply(void 0,arguments)},search:function(e){arguments[0]=e=t.$handleEvent(e),t.onsearch.apply(void 0,arguments)}},model:{value:t.keyword,callback:function(e){t.keyword=e},expression:"keyword"}}),t._l(t.searchhistoryList,(function(e,n){return t.goodlist.length?t._e():a("v-uni-view",{key:n,staticClass:"searchhistory"},[a("v-uni-view",{staticClass:"text",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.selectSearch(e)}}},[t._v(t._s(e))]),a("u-icon",{attrs:{name:"close",size:"15",color:"#a7a7a7"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.deletehistory(n)}}})],1)})),t._l(t.goodlist,(function(t){return a("v-uni-view",{key:t._id},[a("product-item",{attrs:{productInfo:t}})],1)})),a("v-uni-view",{staticClass:"holdplace"})],2),a("prodeuct-detail"),a("product-spec"),t.totalCount>0?a("car-layout",{staticClass:"carLayout"}):t._e()],1)},o=[]},"454d":function(t,e,a){"use strict";a.r(e);var n=a("46f6"),i=a("8c70");for(var o in i)["default"].indexOf(o)<0&&function(t){a.d(e,t,(function(){return i[t]}))}(o);a("cc1d");var r=a("f0c5"),s=Object(r["a"])(i["default"],n["b"],n["c"],!1,null,"72bdd996",null,!1,n["a"],void 0);e["default"]=s.exports},"46f6":function(t,e,a){"use strict";a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return o})),a.d(e,"a",(function(){return n}));var n={uIcon:a("3915").default},i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticClass:"u-search",style:[{margin:t.margin},t.$u.addStyle(t.customStyle)],on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.clickHandler.apply(void 0,arguments)}}},[a("v-uni-view",{staticClass:"u-search__content",style:{backgroundColor:t.bgColor,borderRadius:"round"==t.shape?"100px":"4px",borderColor:t.borderColor}},[t.$slots.label||null!==t.label?[t._t("label",[a("v-uni-text",{staticClass:"u-search__content__label"},[t._v(t._s(t.label))])])]:t._e(),a("v-uni-view",{staticClass:"u-search__content__icon"},[a("u-icon",{attrs:{size:t.searchIconSize,name:t.searchIcon,color:t.searchIconColor?t.searchIconColor:t.color},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.clickIcon.apply(void 0,arguments)}}})],1),a("v-uni-input",{staticClass:"u-search__content__input",style:[{textAlign:t.inputAlign,color:t.color,backgroundColor:t.bgColor,height:t.$u.addUnit(t.height)},t.inputStyle],attrs:{"confirm-type":"search",value:t.value,disabled:t.disabled,focus:t.focus,maxlength:t.maxlength,"placeholder-class":"u-search__content__input--placeholder",placeholder:t.placeholder,"placeholder-style":"color: "+t.placeholderColor,type:"text"},on:{blur:function(e){arguments[0]=e=t.$handleEvent(e),t.blur.apply(void 0,arguments)},confirm:function(e){arguments[0]=e=t.$handleEvent(e),t.search.apply(void 0,arguments)},input:function(e){arguments[0]=e=t.$handleEvent(e),t.inputChange.apply(void 0,arguments)},focus:function(e){arguments[0]=e=t.$handleEvent(e),t.getFocus.apply(void 0,arguments)}}}),t.keyword&&t.clearabled&&t.focused?a("v-uni-view",{staticClass:"u-search__content__icon u-search__content__close",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.clear.apply(void 0,arguments)}}},[a("u-icon",{attrs:{name:"close",size:"11",color:"#ffffff",customStyle:"line-height: 12px"}})],1):t._e()],2),a("v-uni-text",{staticClass:"u-search__action",class:[(t.showActionBtn||t.show)&&"u-search__action--active"],style:[t.actionStyle],on:{click:function(e){e.stopPropagation(),e.preventDefault(),arguments[0]=e=t.$handleEvent(e),t.custom.apply(void 0,arguments)}}},[t._v(t._s(t.actionText))])],1)},o=[]},5141:function(t,e,a){var n=a("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/**\n * 自定义颜色\n */.u-status-bar[data-v-186edb96]{width:100%}',""]),t.exports=e},5443:function(t,e,a){var n=a("1c22");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var i=a("4f06").default;i("5633754c",n,!0,{sourceMap:!1,shadowMode:!1})},5758:function(t,e,a){var n=a("d6e3");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var i=a("4f06").default;i("5f3b3744",n,!0,{sourceMap:!1,shadowMode:!1})},"5e24":function(t,e,a){"use strict";a.r(e);var n=a("8980"),i=a.n(n);for(var o in n)["default"].indexOf(o)<0&&function(t){a.d(e,t,(function(){return n[t]}))}(o);e["default"]=i.a},"5e6d":function(t,e,a){"use strict";var n=a("f424"),i=a.n(n);i.a},"654e":function(t,e,a){"use strict";a("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;e.default={props:{}}},"722f":function(t,e,a){"use strict";a("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,a("ac1f"),a("841c"),a("a9e3");var n={props:{shape:{type:String,default:uni.$u.props.search.shape},bgColor:{type:String,default:uni.$u.props.search.bgColor},placeholder:{type:String,default:uni.$u.props.search.placeholder},clearabled:{type:Boolean,default:uni.$u.props.search.clearabled},focus:{type:Boolean,default:uni.$u.props.search.focus},showAction:{type:Boolean,default:uni.$u.props.search.showAction},actionStyle:{type:Object,default:uni.$u.props.search.actionStyle},actionText:{type:String,default:uni.$u.props.search.actionText},inputAlign:{type:String,default:uni.$u.props.search.inputAlign},inputStyle:{type:Object,default:uni.$u.props.search.inputStyle},disabled:{type:Boolean,default:uni.$u.props.search.disabled},borderColor:{type:String,default:uni.$u.props.search.borderColor},searchIconColor:{type:String,default:uni.$u.props.search.searchIconColor},color:{type:String,default:uni.$u.props.search.color},placeholderColor:{type:String,default:uni.$u.props.search.placeholderColor},searchIcon:{type:String,default:uni.$u.props.search.searchIcon},searchIconSize:{type:[Number,String],default:uni.$u.props.search.searchIconSize},margin:{type:String,default:uni.$u.props.search.margin},animation:{type:Boolean,default:uni.$u.props.search.animation},value:{type:String,default:uni.$u.props.search.value},maxlength:{type:[String,Number],default:uni.$u.props.search.maxlength},height:{type:[String,Number],default:uni.$u.props.search.height},label:{type:[String,Number,null],default:uni.$u.props.search.label}}};e.default=n},7858:function(t,e,a){"use strict";a.r(e);var n=a("bb01"),i=a("e34f");for(var o in i)["default"].indexOf(o)<0&&function(t){a.d(e,t,(function(){return i[t]}))}(o);a("5e6d");var r=a("f0c5"),s=Object(r["a"])(i["default"],n["b"],n["c"],!1,null,"eca591a4",null,!1,n["a"],void 0);e["default"]=s.exports},"7c88":function(t,e,a){"use strict";var n=a("d0a3"),i=a.n(n);i.a},"81ea":function(t,e,a){"use strict";a.r(e);var n=a("bd9b"),i=a("5e24");for(var o in i)["default"].indexOf(o)<0&&function(t){a.d(e,t,(function(){return i[t]}))}(o);a("e377");var r=a("f0c5"),s=Object(r["a"])(i["default"],n["b"],n["c"],!1,null,"30282a05",null,!1,n["a"],void 0);e["default"]=s.exports},"85ac":function(t,e,a){var n=a("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/**\n * 自定义颜色\n */.searchWrap[data-v-fb2fea9a]{padding:%?15?%}.searchWrap .holdplace[data-v-fb2fea9a]{width:100%;height:%?100?%}.searchWrap .searchhistory[data-v-fb2fea9a]{height:%?60?%;align-items:center;margin-top:%?15?%;display:flex;justify-content:space-between;border-bottom:1px solid #efefef}.searchWrap .searchhistory .text[data-v-fb2fea9a]{flex:1}.carLayout[data-v-fb2fea9a]{position:fixed;bottom:0;left:0;width:100%}',""]),t.exports=e},8641:function(t,e,a){"use strict";a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return o})),a.d(e,"a",(function(){return n}));var n={uPopup:a("81ea").default,uButton:a("0256").default},i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticClass:"proDetail"},[a("u-popup",{attrs:{show:t.detailPopState,closeable:!0,round:"10"},on:{close:function(e){arguments[0]=e=t.$handleEvent(e),t.onClose.apply(void 0,arguments)}}},[t.detailData.name?a("v-uni-view",{staticClass:"detailWrapper"},[a("v-uni-view",{staticClass:"top"}),a("v-uni-view",{staticClass:"body"},[a("v-uni-scroll-view",{staticClass:"scrollView",attrs:{"scroll-y":!0}},[a("v-uni-view",{staticClass:"thumb"},[a("v-uni-image",{staticClass:"img",attrs:{src:t.detailData.imageValue[0].url,mode:"aspectFill"}})],1),a("v-uni-view",{staticClass:"info"},[a("v-uni-view",{staticClass:"title"},[t._v(t._s(t.detailData.name))]),a("v-uni-view",{staticClass:"price"},[a("v-uni-view",{staticClass:"big"},[t._v("￥"+t._s(t.priceFormat(t.detailData.price)))]),t.detailData.originPrice?a("v-uni-view",{staticClass:"small"},[t._v("￥"+t._s(t.priceFormat(t.detailData.originPrice)))]):t._e(),t.detailData.originPrice&&t.discount(t.detailData.price,t.detailData.originPrice)?a("v-uni-view",{staticClass:"discount"},[t._v(t._s(t.discount(t.detailData.price,t.detailData.originPrice)/10)+"折")]):t._e()],1)],1),a("v-uni-view",{staticClass:"detail"},[a("v-uni-view",{staticClass:"text"},[a("v-uni-view",{staticClass:"title"},[t._v("商品描述")]),a("v-uni-view",{staticClass:"description"},[a("v-uni-rich-text",{attrs:{nodes:t.detailData.discript}})],1)],1),a("v-uni-view",{staticClass:"picList"},t._l(t.detailData.imageValue,(function(e,n){return a("v-uni-view",{key:e.url},[0!=n?a("v-uni-image",{staticClass:"img",attrs:{src:e.url,mode:"widthFix"}}):t._e()],1)})),1),a("v-uni-view",{staticClass:"intro"},[t._v("以上是全部介绍，欢迎选购")])],1)],1)],1),a("v-uni-view",{staticClass:"footer"},[a("u-button",{attrs:{color:"#EC544F",icon:"shopping-cart",iconColor:"#fff"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.clickAddCart.apply(void 0,arguments)}}},[t._v("加入购物车")])],1)],1):t._e()],1)],1)},o=[]},"892f":function(t,e,a){"use strict";a("7a82");var n=a("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=n(a("5530")),o=a("26cb"),r=a("4a51"),s={name:"pro-detail-popup",data:function(){return{}},computed:(0,i.default)({},(0,o.mapGetters)(["detailPopState","detailData"])),methods:(0,i.default)((0,i.default)({},(0,o.mapMutations)(["setSpecsState","setPotState"])),{},{priceFormat:r.priceFormat,discount:r.discount,onClose:function(){this.setPotState(!1)},clickAddCart:function(){this.setSpecsState(!0)}})};e.default=s},8980:function(t,e,a){"use strict";a("7a82");var n=a("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=n(a("cd8a")),o={name:"u-popup",mixins:[uni.$u.mpMixin,uni.$u.mixin,i.default],data:function(){return{overlayDuration:this.duration+50}},watch:{show:function(t,e){}},computed:{transitionStyle:function(){var t={zIndex:this.zIndex,position:"fixed",display:"flex"};return t[this.mode]=0,"left"===this.mode||"right"===this.mode?uni.$u.deepMerge(t,{bottom:0,top:0}):"top"===this.mode||"bottom"===this.mode?uni.$u.deepMerge(t,{left:0,right:0}):"center"===this.mode?uni.$u.deepMerge(t,{alignItems:"center","justify-content":"center",top:0,left:0,right:0,bottom:0}):void 0},contentStyle:function(){var t={},e=uni.$u.sys();e.safeAreaInsets;if("center"!==this.mode&&(t.flex=1),this.bgColor&&(t.backgroundColor=this.bgColor),this.round){var a=uni.$u.addUnit(this.round);"top"===this.mode?(t.borderBottomLeftRadius=a,t.borderBottomRightRadius=a):"bottom"===this.mode?(t.borderTopLeftRadius=a,t.borderTopRightRadius=a):"center"===this.mode&&(t.borderRadius=a)}return uni.$u.deepMerge(t,uni.$u.addStyle(this.customStyle))},position:function(){return"center"===this.mode?this.zoom?"fade-zoom":"fade":"left"===this.mode?"slide-left":"right"===this.mode?"slide-right":"bottom"===this.mode?"slide-up":"top"===this.mode?"slide-down":void 0}},methods:{overlayClick:function(){this.closeOnClickOverlay&&this.$emit("close")},close:function(t){this.$emit("close")},afterEnter:function(){this.$emit("open")},clickHandler:function(){"center"===this.mode&&this.overlayClick(),this.$emit("click")}}};e.default=o},"8c70":function(t,e,a){"use strict";a.r(e);var n=a("9744"),i=a.n(n);for(var o in n)["default"].indexOf(o)<0&&function(t){a.d(e,t,(function(){return n[t]}))}(o);e["default"]=i.a},9473:function(t,e,a){"use strict";var n=a("5758"),i=a.n(n);i.a},9744:function(t,e,a){"use strict";a("7a82");var n=a("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=n(a("722f")),o={name:"u-search",mixins:[uni.$u.mpMixin,uni.$u.mixin,i.default],data:function(){return{keyword:"",showClear:!1,show:!1,focused:this.focus}},watch:{keyword:function(t){this.$emit("input",t),this.$emit("change",t)},value:{immediate:!0,handler:function(t){this.keyword=t}}},computed:{showActionBtn:function(){return!this.animation&&this.showAction}},methods:{inputChange:function(t){this.keyword=t.detail.value},clear:function(){var t=this;this.keyword="",this.$nextTick((function(){t.$emit("clear")}))},search:function(t){this.$emit("search",t.detail.value);try{uni.hideKeyboard()}catch(t){}},custom:function(){this.$emit("custom",this.keyword);try{uni.hideKeyboard()}catch(t){}},getFocus:function(){this.focused=!0,this.animation&&this.showAction&&(this.show=!0),this.$emit("focus",this.keyword)},blur:function(){var t=this;setTimeout((function(){t.focused=!1}),100),this.show=!1,this.$emit("blur",this.keyword)},clickHandler:function(){this.disabled&&this.$emit("click")},clickIcon:function(){this.$emit("clickIcon")}}};e.default=o},"99cf":function(t,e,a){"use strict";a.r(e);var n=a("0393"),i=a.n(n);for(var o in n)["default"].indexOf(o)<0&&function(t){a.d(e,t,(function(){return n[t]}))}(o);e["default"]=i.a},a115:function(t,e,a){"use strict";a.d(e,"b",(function(){return n})),a.d(e,"c",(function(){return i})),a.d(e,"a",(function(){}));var n=function(){var t=this.$createElement,e=this._self._c||t;return e("v-uni-view",{staticClass:"u-status-bar",style:[this.style]},[this._t("default")],2)},i=[]},aadb:function(t,e,a){"use strict";a("7a82");var n=a("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=n(a("654e")),o={name:"u-safe-bottom",mixins:[uni.$u.mpMixin,uni.$u.mixin,i.default],data:function(){return{safeAreaBottomHeight:0,isNvue:!1}},computed:{style:function(){return uni.$u.deepMerge({},uni.$u.addStyle(this.customStyle))}},mounted:function(){}};e.default=o},aba1:function(t,e,a){"use strict";a.r(e);var n=a("c6ac"),i=a.n(n);for(var o in n)["default"].indexOf(o)<0&&function(t){a.d(e,t,(function(){return n[t]}))}(o);e["default"]=i.a},bb01:function(t,e,a){"use strict";a.d(e,"b",(function(){return n})),a.d(e,"c",(function(){return i})),a.d(e,"a",(function(){}));var n=function(){var t=this.$createElement,e=this._self._c||t;return e("v-uni-view",{staticClass:"u-safe-bottom",class:[!this.isNvue&&"u-safe-area-inset-bottom"],style:[this.style]})},i=[]},bcd5:function(t,e,a){var n=a("d35f");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var i=a("4f06").default;i("adef6338",n,!0,{sourceMap:!1,shadowMode:!1})},bd8b:function(t,e,a){"use strict";a.r(e);var n=a("3f59"),i=a("99cf");for(var o in i)["default"].indexOf(o)<0&&function(t){a.d(e,t,(function(){return i[t]}))}(o);a("c011");var r=a("f0c5"),s=Object(r["a"])(i["default"],n["b"],n["c"],!1,null,"fb2fea9a",null,!1,n["a"],void 0);e["default"]=s.exports},bd9b:function(t,e,a){"use strict";a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return o})),a.d(e,"a",(function(){return n}));var n={uOverlay:a("da8f").default,uTransition:a("5e3c").default,uStatusBar:a("26a4").default,uIcon:a("3915").default,uSafeBottom:a("7858").default},i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticClass:"u-popup"},[t.overlay?a("u-overlay",{attrs:{show:t.show,duration:t.overlayDuration,customStyle:t.overlayStyle,opacity:t.overlayOpacity},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.overlayClick.apply(void 0,arguments)}}}):t._e(),a("u-transition",{attrs:{show:t.show,customStyle:t.transitionStyle,mode:t.position,duration:t.duration},on:{afterEnter:function(e){arguments[0]=e=t.$handleEvent(e),t.afterEnter.apply(void 0,arguments)},click:function(e){arguments[0]=e=t.$handleEvent(e),t.clickHandler.apply(void 0,arguments)}}},[a("v-uni-view",{staticClass:"u-popup__content",style:[t.contentStyle],on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.noop.apply(void 0,arguments)}}},[t.safeAreaInsetTop?a("u-status-bar"):t._e(),t._t("default"),t.closeable?a("v-uni-view",{staticClass:"u-popup__content__close",class:["u-popup__content__close--"+t.closeIconPos],attrs:{"hover-class":"u-popup__content__close--hover","hover-stay-time":"150"},on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.close.apply(void 0,arguments)}}},[a("u-icon",{attrs:{name:"close",color:"#909399",size:"18",bold:!0}})],1):t._e(),t.safeAreaInsetBottom?a("u-safe-bottom"):t._e()],2)],1)],1)},o=[]},c011:function(t,e,a){"use strict";var n=a("d8fe"),i=a.n(n);i.a},c6ac:function(t,e,a){"use strict";a("7a82");var n=a("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=n(a("349a")),o={name:"u-status-bar",mixins:[uni.$u.mpMixin,uni.$u.mixin,i.default],data:function(){return{}},computed:{style:function(){var t={};return t.height=uni.$u.addUnit(uni.$u.sys().statusBarHeight,"px"),t.backgroundColor=this.bgColor,uni.$u.deepMerge(t,uni.$u.addStyle(this.customStyle))}}};e.default=o},c761:function(t,e,a){var n=a("1c7f");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var i=a("4f06").default;i("19e6b0d8",n,!0,{sourceMap:!1,shadowMode:!1})},cc1d:function(t,e,a){"use strict";var n=a("c761"),i=a.n(n);i.a},cd8a:function(t,e,a){"use strict";a("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,a("a9e3");var n={props:{show:{type:Boolean,default:uni.$u.props.popup.show},overlay:{type:Boolean,default:uni.$u.props.popup.overlay},mode:{type:String,default:uni.$u.props.popup.mode},duration:{type:[String,Number],default:uni.$u.props.popup.duration},closeable:{type:Boolean,default:uni.$u.props.popup.closeable},overlayStyle:{type:[Object,String],default:uni.$u.props.popup.overlayStyle},closeOnClickOverlay:{type:Boolean,default:uni.$u.props.popup.closeOnClickOverlay},zIndex:{type:[String,Number],default:uni.$u.props.popup.zIndex},safeAreaInsetBottom:{type:Boolean,default:uni.$u.props.popup.safeAreaInsetBottom},safeAreaInsetTop:{type:Boolean,default:uni.$u.props.popup.safeAreaInsetTop},closeIconPos:{type:String,default:uni.$u.props.popup.closeIconPos},round:{type:[Boolean,String,Number],default:uni.$u.props.popup.round},zoom:{type:Boolean,default:uni.$u.props.popup.zoom},bgColor:{type:String,default:uni.$u.props.popup.bgColor},overlayOpacity:{type:[Number,String],default:uni.$u.props.popup.overlayOpacity}}};e.default=n},d0a3:function(t,e,a){var n=a("5141");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var i=a("4f06").default;i("04df9334",n,!0,{sourceMap:!1,shadowMode:!1})},d35f:function(t,e,a){var n=a("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/**\n * 自定义颜色\n */.proSpecsWrapper[data-v-132fd050]{height:70vh}.proSpecsWrapper .top[data-v-132fd050]{height:%?80?%;width:100%}.proSpecsWrapper .body[data-v-132fd050]{height:calc(100% - %?220?%)}.proSpecsWrapper .body .scrollView[data-v-132fd050]{height:100%;padding:0 %?30?%}.proSpecsWrapper .body .scrollView .proItem[data-v-132fd050]{border-bottom:1px solid #efefef}.proSpecsWrapper .body .scrollView .selectWrapper[data-v-132fd050]{border-bottom:1px solid #efefef;padding:%?10?% 0}.proSpecsWrapper .body .scrollView .selectWrapper .list[data-v-132fd050]{padding:%?20?% 0}.proSpecsWrapper .body .scrollView .selectWrapper .list .title[data-v-132fd050]{font-size:%?32?%;font-weight:700;padding-bottom:%?20?%}.proSpecsWrapper .body .scrollView .selectWrapper .list .group[data-v-132fd050]{display:flex;justify-content:space-between;align-items:center;justify-content:flex-start;align-items:center;flex-wrap:wrap}.proSpecsWrapper .body .scrollView .selectWrapper .list .group .btn[data-v-132fd050]{padding:%?0?% %?25?%;height:%?60?%;border:%?1?% solid #efefef;margin-right:%?20?%;border-radius:%?10?%;color:#676767;margin-bottom:%?20?%;display:flex;justify-content:space-between;align-items:center;justify-content:center;align-items:center;background:#f7f7f7}.proSpecsWrapper .body .scrollView .selectWrapper .list .group .btn.active[data-v-132fd050]{border-color:#ec544f;color:#ec544f;background:rgba(236,87,79,.1)}.proSpecsWrapper .body .scrollView .numSelect[data-v-132fd050]{display:flex;align-items:center;padding:%?30?% 0;border-bottom:1px solid #efefef}.proSpecsWrapper .body .scrollView .numSelect .title[data-v-132fd050]{font-size:%?32?%;font-weight:700;padding-right:%?30?%}.proSpecsWrapper .footer[data-v-132fd050]{height:%?140?%;border-top:1px solid #efefef;display:flex;justify-content:space-between;align-items:center;justify-content:center;align-items:center;padding:0 %?200?%}',""]),t.exports=e},d6e3:function(t,e,a){var n=a("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/**\n * 自定义颜色\n */.detailWrapper[data-v-5be47f2e]{height:83vh}.detailWrapper .top[data-v-5be47f2e]{height:%?80?%;width:100%}.detailWrapper .body[data-v-5be47f2e]{height:calc(100% - %?220?%)}.detailWrapper .body .scrollView[data-v-5be47f2e]{height:100%;padding:0 %?30?%}.detailWrapper .body .scrollView .thumb[data-v-5be47f2e]{width:%?690?%;height:%?690?%}.detailWrapper .body .scrollView .thumb .img[data-v-5be47f2e]{width:100%;height:100%}.detailWrapper .body .scrollView .info[data-v-5be47f2e]{padding:%?20?% 0;border-bottom:1px solid #efefef}.detailWrapper .body .scrollView .info .title[data-v-5be47f2e]{font-size:%?40?%;font-weight:700}.detailWrapper .body .scrollView .info .price[data-v-5be47f2e]{display:flex;align-items:center;padding-top:%?20?%}.detailWrapper .body .scrollView .info .price .big[data-v-5be47f2e]{font-size:%?46?%;font-weight:700;color:#ec544f}.detailWrapper .body .scrollView .info .price .small[data-v-5be47f2e]{font-size:%?28?%;color:#a7a7a7;font-weight:700;text-decoration:line-through;margin-left:%?10?%}.detailWrapper .body .scrollView .info .price .discount[data-v-5be47f2e]{border:1px solid #ec544f;color:#ec544f;font-size:%?22?%;padding:%?2?% %?20?%;margin-left:%?10?%;border-radius:%?8?%}.detailWrapper .body .scrollView .detail .text[data-v-5be47f2e]{padding:%?20?% 0}.detailWrapper .body .scrollView .detail .text .title[data-v-5be47f2e]{font-size:%?32?%;font-weight:700}.detailWrapper .body .scrollView .detail .text .description[data-v-5be47f2e]{padding:%?20?% 0;line-height:1.7em}.detailWrapper .body .scrollView .detail .picList .img[data-v-5be47f2e]{width:100%;margin-bottom:%?30?%}.detailWrapper .body .scrollView .detail .intro[data-v-5be47f2e]{padding:%?40?% 0;font-size:%?30?%;color:#a7a7a7;text-align:center}.detailWrapper .footer[data-v-5be47f2e]{height:%?140?%;border-top:1px solid #efefef;display:flex;justify-content:space-between;align-items:center;justify-content:center;align-items:center;padding:0 %?200?%}',""]),t.exports=e},d838:function(t,e,a){"use strict";a.r(e);var n=a("8641"),i=a("f35e");for(var o in i)["default"].indexOf(o)<0&&function(t){a.d(e,t,(function(){return i[t]}))}(o);a("9473");var r=a("f0c5"),s=Object(r["a"])(i["default"],n["b"],n["c"],!1,null,"5be47f2e",null,!1,n["a"],void 0);e["default"]=s.exports},d8fe:function(t,e,a){var n=a("85ac");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var i=a("4f06").default;i("e5315fa4",n,!0,{sourceMap:!1,shadowMode:!1})},e34f:function(t,e,a){"use strict";a.r(e);var n=a("aadb"),i=a.n(n);for(var o in n)["default"].indexOf(o)<0&&function(t){a.d(e,t,(function(){return n[t]}))}(o);e["default"]=i.a},e377:function(t,e,a){"use strict";var n=a("5443"),i=a.n(n);i.a},f35e:function(t,e,a){"use strict";a.r(e);var n=a("892f"),i=a.n(n);for(var o in n)["default"].indexOf(o)<0&&function(t){a.d(e,t,(function(){return n[t]}))}(o);e["default"]=i.a},f424:function(t,e,a){var n=a("ffad");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var i=a("4f06").default;i("f75cbb1e",n,!0,{sourceMap:!1,shadowMode:!1})},f4f0:function(t,e,a){"use strict";a("7a82");var n=a("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,a("d81d"),a("c740"),a("14d9"),a("a434"),a("e9c4");var i=n(a("5530")),o=a("26cb"),r={name:"pro-select-specs",data:function(){return{numvalue:1,userSelect:[]}},computed:(0,i.default)((0,i.default)({},(0,o.mapGetters)(["proSpecsState","detailData"])),{},{selectShow:function(){var t,e,a;return null!==(t=null===(e=this.detailData)||void 0===e||null===(a=e.selectSku)||void 0===a?void 0:a.length)&&void 0!==t?t:null},skuArr:function(){return this.userSelect.map((function(t){return t.name}))},confirmState:function(){var t,e;return console.log("this.detailData.selectSku===>",this.detailData.selectSku),!(this.userSelect.length==(null===(t=this.detailData)||void 0===t||null===(e=t.selectSku)||void 0===e?void 0:e.length)||!this.detailData.selectSku)}}),methods:(0,i.default)((0,i.default)({},(0,o.mapMutations)(["setSpecsState","setPotState","setCarts"])),{},{onClose:function(){this.setSpecsState(!1),this.userSelect=[],this.numvalue=1},clickSelect:function(t,e){var a={id:this.detailData.selectSku[t]._id,name:this.detailData.selectSku[t].attrValues[e].attrName},n=this.userSelect.findIndex((function(t){return t.id==a.id}));n<0?this.userSelect.push(a):this.userSelect.splice(n,1,a)},clickConfirm:function(){var t=JSON.parse(JSON.stringify(this.detailData));this.skuArr.length&&(t.skuArr=this.skuArr),t.add=!0,this.setPotState(!1),this.setCarts({productInfo:t,num:this.numvalue}),this.onClose()}})};e.default=r},ffad:function(t,e,a){var n=a("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/**\n * 自定义颜色\n */.u-safe-bottom[data-v-eca591a4]{width:100%}',""]),t.exports=e}}]);