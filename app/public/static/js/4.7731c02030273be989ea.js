webpackJsonp([4],{NMJL:function(t,i){},Skqu:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var s=e("mvHQ"),a=e.n(s),o=e("BO1k"),r=e.n(o),n=e("sf/l"),c=e("f+26"),v=e("Au9i"),u={name:"order",data:function(){return{userInfo:{},list:[],money:0,orderNum:0,cartShow:!1,store:"人民广场店"}},created:function(){var t=this;this.userInfo=JSON.parse(Object(n.c)("get","userInfo")),Object(c.a)("get","commodity/list",{},function(i){var e={},s=!0,a=!1,o=void 0;try{for(var n,c=r()(i);!(s=(n=c.next()).done);s=!0){var v=n.value;v.num=0,e[v.id]=v}}catch(t){a=!0,o=t}finally{try{!s&&c.return&&c.return()}finally{if(a)throw o}}t.list=e}),Object(n.a)("点餐")},methods:{addCommodity:function(t){this.orderNum++,this.list[t].num++;var i=this.list[t].price;this.list[t].discount&&(i=this.list[t].price*this.list[t].discount/10),this.money+=i},reduceCommodity:function(t){this.orderNum--,this.list[t].num--;var i=this.list[t].price;this.list[t].discount&&(i=this.list[t].price*this.list[t].discount/10),this.money-=i,this.money<0&&(this.money=0)},subOrder:function(){var t=this;if(this.money<=0)Object(v.Toast)({message:"您还啥都没点呢！",position:"bottom"});else{var i=[],e=this.list;for(var s in e)e[s].num&&0!==e[s].num&&i.push({id:e[s].id,num:e[s].num});Object(c.a)("post","order/add",{userId:this.userInfo.id,times:(new Date).getTime(),price:this.money,store:this.store,list:a()(i)},function(i){Object(v.Toast)("下单成功"),setTimeout(function(){t.$router.push({path:"/myOrder"})},1e3)})}}}},l={render:function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"order"},[s("div",{staticClass:"banner"},[s("h1",[t._v("四海味")]),t._v(" "),s("div",{staticClass:"store"},[s("i",{staticClass:"iconfont"},[t._v("")]),t._v(" "),s("select",{directives:[{name:"model",rawName:"v-model",value:t.store,expression:"store"}],attrs:{name:""},on:{change:function(i){var e=Array.prototype.filter.call(i.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.store=i.target.multiple?e:e[0]}}},[s("option",{attrs:{value:"人民广场店"}},[t._v("人民广场店")]),t._v(" "),s("option",{attrs:{value:"上海大学店"}},[t._v("上海大学店")]),t._v(" "),s("option",{attrs:{value:"徐汇店"}},[t._v("徐汇店")]),t._v(" "),s("option",{attrs:{value:"虹桥店"}},[t._v("虹桥店")]),t._v(" "),s("option",{attrs:{value:"张江高科店"}},[t._v("张江高科店")])])])]),t._v(" "),s("div",{staticClass:"order-list"},[s("ul",t._l(t.list,function(i){return s("li",[s("router-link",{directives:[{name:"lazy",rawName:"v-lazy:background-image",value:{src:i.img},expression:"{src: item.img}",arg:"background-image"}],staticClass:"imgbg",attrs:{to:{path:"/detail?id="+i.id}}}),t._v(" "),i.discount?s("div",{staticClass:"discount"},[t._v(t._s(i.discount)+"折")]):t._e(),t._v(" "),s("h4",[t._v(t._s(i.name))]),t._v(" "),s("div",{staticClass:"flex"},[i.discount?s("div",{staticClass:"price"},[t._v("￥"+t._s(i.price*i.discount/10)),s("span",[t._v(t._s(i.price))])]):s("div",{staticClass:"price"},[t._v("￥"+t._s(i.price))]),t._v(" "),s("div",{staticClass:"add",on:{click:function(e){t.addCommodity(i.id)}}},[t._v("+")])])],1)}))]),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:t.cartShow,expression:"cartShow"}],staticClass:"order-meng meng"},[s("div",{staticClass:"meng-box"},[s("h2",{staticClass:"flex"},[s("span"),s("span",[t._v("购物车")]),s("span",{on:{click:function(i){t.cartShow=!1}}},[t._v("×")])]),t._v(" "),t.money>0?s("ul",t._l(t.list,function(i){return s("li",[i.num&&0!==i.num?s("div",{staticClass:"flex item"},[s("h5",[t._v(t._s(i.name))]),t._v(" "),i.discount?s("div",{staticClass:"price"},[t._v("￥"+t._s(i.price*i.discount/10))]):s("div",{staticClass:"price"},[t._v("￥"+t._s(i.price))]),t._v(" "),s("div",{staticClass:"operation flex"},[s("span",{staticClass:"do",on:{click:function(e){t.reduceCommodity(i.id)}}},[t._v("-")]),t._v(" "),s("div",[t._v(t._s(i.num))]),t._v(" "),s("span",{staticClass:"do",on:{click:function(e){t.addCommodity(i.id)}}},[t._v("+")])])]):t._e()])})):s("div",{staticClass:"no-data"},[s("img",{attrs:{src:e("M/73"),alt:""}}),t._v(" "),s("p",[t._v("空空如也~")])])])]),t._v(" "),s("div",{staticStyle:{height:"1rem"}}),t._v(" "),s("div",{staticClass:"state flex"},[s("router-link",{staticClass:"user",attrs:{to:"/myOrder"}},[s("img",{attrs:{src:t.userInfo.figureurl,alt:""}}),t._v(" "),s("h2",[t._v(t._s(t.userInfo.name))])]),t._v(" "),s("div",{staticClass:"content",on:{click:function(i){t.cartShow=!0}}},[s("img",{attrs:{src:e("ipoh"),alt:""}}),t._v(" "),s("h5",[t._v("￥"+t._s(t.money.toFixed(2)))]),t._v(" "),s("span",{directives:[{name:"show",rawName:"v-show",value:t.orderNum>0,expression:"orderNum > 0"}]},[t._v(t._s(t.orderNum))])]),t._v(" "),s("button",{on:{click:t.subOrder}},[t._v("下单")])],1)])},staticRenderFns:[]};var m=e("VU/8")(u,l,!1,function(t){e("NMJL")},"data-v-0bb0933c",null);i.default=m.exports},ipoh:function(t,i){t.exports="data:image/png;base64,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"}});