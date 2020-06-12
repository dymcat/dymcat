into($.srcroot+"/#/web.js");
if($.end=="html"){
	into($.srcbase+"/&.js");
	setHtmlContent(null,{
		title:"群组级链接添加"
		,leadList:web.exeSQL("plate",{})
	});
}else if($.end=="submit"){
	$.pars.createUser=web.own("id");
	$.pars.createTime=lang.now();
	web.exeSQL("add");
	$.redirect="/"+$.uripath+"/"+$.pars.lead+".html";
}