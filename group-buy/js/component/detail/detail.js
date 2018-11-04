define(function(require,exports,module) {
	require("./detail.css");
	var Util = require("../../util/util");
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
	Vue.component("detail",Detail);
	module.exports = Detail;
})