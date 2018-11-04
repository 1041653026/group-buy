// 定义一些工具方法
var Util = {
	ajax : function(url,fn) {
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4){
				if(xhr.status === 200){
					return fn(JSON.parse(xhr.responseText));
				}
			}
		}
		xhr.open("GET",url,true);
		xhr.send(null);
	}
}
// 创建组件
var Home = Vue.extend({
	template : "#tpl_home",
	data : function(){
		return {
			types : [
				{id: 1, url: 'imgs/icon/01.png', text: '美食'},
				{id: 2, url: 'imgs/icon/02.png', text: '电影'},
				{id: 3, url: 'imgs/icon/03.png', text: '酒店'},
				{id: 4, url: 'imgs/icon/04.png', text: '休闲'},
				{id: 5, url: 'imgs/icon/05.png', text: '外卖'},
				{id: 6, url: 'imgs/icon/06.png', text: 'ktv'},
				{id: 7, url: 'imgs/icon/07.png', text: '周边游'},
				{id: 8, url: 'imgs/icon/08.png', text: '丽人'},
				{id: 9, url: 'imgs/icon/09.png', text: '小吃'},
				{id: 10, url: 'imgs/icon/10.png', text: '火车票'}
			],
			ad : [],
			list : []
		}
	},
	created : function() {
		var me = this;
		Util.ajax("./data/home.json",function(data){
			if(data && data.errno === 0){
				me.ad = data.data.ad;
				me.list = data.data.list;
			}
		})
	}
});
var List = Vue.extend({
	template : "#tpl_list",
	props : ["search"],
	data : function(){
		return {
			order : [
				{ type : "price", text : "价格排序" },
				{ type : "sales", text : "销量排序" },
				{ type : "evaluate", text : "好评排序" },
				{ type : "preferential", text : "优惠排序" }
			],
			list : [],
			showClock : false,
			showOthersClock : true
			// others : []
		}
	},
	computed : {
		listFilter : function() {
			var me = this;
			// var arr = this.list.concat(this.others);
			var result = [];
			this.list.forEach(function(item,index) {
				if(item.title.indexOf(me.search) >= 0) {
					result.push(item);
				}
			});
			// this.others = result.slice(3);
			// this.list = result.slice(0,3);
			return result;
		},
		num : function(){
			var me = this;
			var result = 0;
			this.list.forEach(function(item,index){
				if(item.title.indexOf(me.search) >= 0) {
					result ++;
				}
			});
			result -= 3;
			return result;
		}
	},
	methods : {
		showOthers : function(){
			/*this.list = this.list.concat(this.others);
			this.others = [];*/
			this.showClock = true;
			this.showOthersClock = false;
		},
		orderFn : function(type){
			if(type === "preferential") {
				this.list.sort(function(a,b){
					// 升序
					return (a["originPrice"]-a["price"]) - (b["originPrice"]-b["price"]);
					// 降序
					// return (b["originPrice"]-b["price"]) - (a["originPrice"]-a["price"]);
				});
			} else {
				this.list.sort(function(a,b){
					// 升序
					return a[type] - b[type];
					// 降序     
					// return b[type] - a[type];
				});
			}
		}
	},
	created : function(){
		var me = this;
		Util.ajax("data/list.json",function(res){
			if(res && res.errno === 0){
				me.list = res.data;
				// me.others = res.data.slice(3);
			}
		});
	}
});
var Detail = Vue.extend({
	template : "#tpl_detail",
	props : ["query"],
	data : function(){
		return {
			data : {}
		}
	},
	created : function() {
		var me = this;
		Util.ajax("data/product.json?id=" + this.query[0],function(res) {
			if(res && res.errno === 0){
				me.data = res.data;
			}
		})
	}
});
// 注册组件
Vue.component("home",Home);
Vue.component("list",List);
Vue.component("detail",Detail);
// 创建Vue实例化对象
var app = new Vue({
	el : "#app",
	data : {
		view : "",
		query : [],
		val : "",
		lastValue : ""
	},
	methods : {
		inputLastValue : function(){
			this.lastValue = this.val;
		},
		goBack : function() {
			return history.go(-1);
		}
	}
});
window.addEventListener("hashchange",route);
route();
function route(){
	// 解析hash
	var hash = location.hash;
	// 去除 # 或者#/
	hash = hash.replace(/^#\/?/,"");
	var arr = hash.split("/");
	// console.log(arr)
	// 映射数组
	var map = {
		home : true,
		list : true,
		detail : true
	}
	if(map[arr[0]]) {
		app.view = arr[0];
	} else {
		app.view = "home";
	}
	// 存储路由数据
	app.query = arr.slice(1);
}