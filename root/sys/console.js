into($.srcroot+"/#/web.js");
if($.end=="html"){
	$.uripath+="/console";
	into($.srcbase+"/&.js");
	setHtmlContent(null,{
		title:"H2控制台"
		,h2url:"http://"+$.request.headers().get("Host").replace(/\:\d+$/,"")+":"+$.server.getGlobal("h2webPort")+"?language="+$.language
	});
}