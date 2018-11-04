define(function(require,exports,module) {
	var app = require("../app/app");
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
});