into($.srcroot+"/#/web.js");
if($.end=="html"){
	web.arg2par("id");
	into($.srcbase+"/&.js");
	setHtmlContent(null,{
		title:"角色编辑"
	},web.exeSQL("info"));
}else if($.end=="submit"){
	web.arg2par("id");
	$.pars.modifyUser=web.own("id");
	$.pars.modifyTime=lang.now();
	web.exeSQL("edit");
	web.join(true,"change=role","$$");
	$.redirect="/"+$.uripath+".html";
}