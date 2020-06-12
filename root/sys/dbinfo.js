into($.srcroot+"/#/web.js");
if($.end=="html"){
	$.uripath+="/dbinfo";
	into($.srcbase+"/&.js");
	setHtmlContent(null,{
		title:"数据库信息"
		,db_info_list:function(){
			var list={};
			var jdbc=$.server.getGlobal("jdbc");
			jdbc.keys().forEach(function(name){
				if(!name){return;}
				var pool=jdbc.get(name);
				list[name]={
					driver:pool.getDriver()
					,url:pool.getUrl()
					,user:pool.getUser()
					,pwd:pool.getPwd()
					,spanLife:pool.getSpanLife()
					,workLife:pool.getWorkLife()
					,waitLife:pool.getWaitLife()
					,spare:pool.getSpare()
					,workCount:pool.getWorkCount()
					,waitCount:pool.getWaitCount()
					,source:pool.getSource()
					,method:pool.getMethod()
				};
			});
			return list;
		}()
	});
}