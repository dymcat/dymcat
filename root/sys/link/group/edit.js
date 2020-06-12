into($.srcroot+"/#/web.js");
if($.end=="html"){
	web.arg2par("id");
	into($.srcbase+"/&.js");
	setHtmlContent(null,{
		title:"群组级链接编辑"
		,leadList:web.exeSQL("plate",{})
	},web.exeSQL("info"));
}else if($.end=="submit"){
	web.arg2par("id");
	$.pars.modifyUser=web.own("id");
	$.pars.modifyTime=lang.now();
	web.exeSQL("edit");
	web.join(true,"change=link|role_link","$$");
	$.redirect="/"+$.uripath+"/"+($.pars.lead||$.pars.last_lead)+".html";
}