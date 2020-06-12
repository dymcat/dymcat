into($.srcroot+"/#/web.js");
if($.end=="html"){
	web.arg2par("[[=$.idName||'']]");
	into($.srcbase+"/&.js");
	setHtmlContent(null,{
		title:"[[=$.comment||$.name||'']]编辑"
	},web.exeSQL("info"));
}else if($.end=="submit"){
	web.arg2par("[[=$.idName||'']]");
	$.pars.modifyUser=web.own("id");
	$.pars.modifyTime=lang.now();
	web.exeSQL("edit");
	$.redirect="/"+$.uripath+".html";
}