into($.srcroot+"/#/web.js");
if($.end=="html"){
	web.arg2par("id");
	into($.srcbase+"/&.js");
	setHtmlContent(null,{
		title:"用户编辑"
	},web.exeSQL("info"));
}else if($.end=="submit"){
	web.arg2par("id");
	$.pars.password=lang.md5($.pars.password);
	$.pars.modifyUser=web.own("id");
	$.pars.modifyTime=lang.now();
	web.exeSQL("edit");
	if($.pars.status=="2"){web.join(true,$.pars.id,"$$[user$status=2]");}
	$.redirect="/"+$.uripath+".html";
}