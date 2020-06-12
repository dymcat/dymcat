into($.srcroot+"/#/web.js");
if($.end=="html"){
	web.arg2par("id");
	into($.srcbase+"/&.js");
	setHtmlContent(null,{
		title:"用户详情"
	},web.exeSQL("info"));
}