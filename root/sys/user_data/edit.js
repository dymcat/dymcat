into($.srcroot+"/#/web.js");
if($.end=="html"){
	web.arg2par("user");
	into($.srcbase+"/&.js");
	setHtmlContent(null,{
		title:"用户资料编辑"
	},web.exeSQL("info"));
}else if($.end=="submit"){
	web.arg2par("user");
	$.pars.modifyUser=web.own("id");
	$.pars.modifyTime=lang.now();
	web.exeSQL("edit");
	$.redirect="/"+$.uripath+".html";
}