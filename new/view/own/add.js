into($.srcroot+"/#/web.js");
if($.end=="html"){
	into($.srcbase+"/&.js");
	setHtmlContent(null,{
		title:"[[=$.comment||$.name||'']]添加"
	});
}else if($.end=="submit"){
	$.pars.createUser=web.own("id");
	$.pars.createTime=lang.now();
	web.exeSQL("add");
	$.redirect="/"+$.uripath+".html";
}