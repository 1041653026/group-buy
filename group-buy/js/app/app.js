define(function(require,exprots,module) {
	// 引入css
	require("./app.css");
	// 引入三个组件
	require("../component/home/home");
	require("../component/list/list");
	require("../component/detail/detail");
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
	module.exports = app;
});