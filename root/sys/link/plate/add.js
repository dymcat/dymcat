into($.srcroot+"/#/web.js");
if($.end=="html"){
	into($.srcbase+"/&.js");
	setHtmlContent(null,{
		title:"板块级链接添加"
	});
}else if($.end=="submit"){
	$.pars.createUser=web.own("id");
	$.pars.createTime=lang.now();
	web.exeSQL("add");
	$.redirect="/"+$.uripath+".html";
}