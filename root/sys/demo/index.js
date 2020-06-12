into($.srcroot+"/#/web.js");
if($.end=="html"){
	into($.srcbase+"/&.js");
	setListHtmlContent(null,{
		title:"示例列表"
	},web.exeSQL("list"));
}