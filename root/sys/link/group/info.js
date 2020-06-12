into($.srcroot+"/#/web.js");
if($.end=="html"){
	web.arg2par("id");
	into($.srcbase+"/&.js");
	setHtmlContent(null,{
		title:"群组级链接详情"
	},web.exeSQL("info"));
}