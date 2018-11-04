define(function(require,exports,module) {
	require("./list-page.css");
	require("../list.css");
	var Util = require("../../util/util");
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
	Vue.component("list",List);
	module.exports = List;
})