into($.srcroot+"/#/web.js");
if($.end=="html"){
	web.arg2par("user");
	into($.srcbase+"/&.js");
	setHtmlContent(null,{
		title:"用户资料详情"
	},web.exeSQL("info"));
}