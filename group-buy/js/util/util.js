define(function(requrie,exports,module) { 
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
	module.exports = Util;
});