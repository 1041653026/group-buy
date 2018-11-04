define(function(require,exports,module) {
	require("./home.css");
	var Util = require("../../util/util");
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
	// 注册组件
	Vue.component("home",Home);
	module.exports = Home;
});