into($.srcroot+"/#/web.js");
if($.end=="html"){
	into($.srcbase+"/&.js");
	setListHtmlContent(null,{
		title:"用户列表"
	},web.exeSQL("list"));
}