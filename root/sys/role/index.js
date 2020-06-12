into($.srcroot+"/#/web.js");
if($.end=="html"){
	into($.srcbase+"/&.js");
	setListHtmlContent(null,{
		title:"角色列表"
	},web.exeSQL("list"));
}