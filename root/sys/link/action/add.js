into($.srcroot+"/#/web.js");
if($.end=="html"){
	into($.srcbase+"/&.js");
	setHtmlContent(null,{
		title:"功能级链接添加"
		,leadList:web.exeSQL("plate_group_entry",{})
	});
}else if($.end=="submit"){
	$.pars.createUser=web.own("id");
	$.pars.createTime=lang.now();
	web.exeSQL("add");
	$.redirect="/"+$.uripath+"/"+$.pars.lead+".html";
}