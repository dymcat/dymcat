into($.srcroot+"/#/web.js");
if($.end=="html"){
	web.arg2par("id");
	into($.srcbase+"/&.js");
	setHtmlContent(null,{
		title:"板块级链接编辑"
	},web.exeSQL("info"));
}else if($.end=="submit"){
	web.arg2par("id");
	if($.pars.frame=="true"){$.pars.path="";}
	$.pars.modifyUser=web.own("id");
	$.pars.modifyTime=lang.now();
	web.exeSQL("edit");
	web.join(true,"change=link|role_link","$$");
	$.redirect="/"+$.uripath+".html";
}