into($.srcroot+"/#/web.js");
if($.end=="html"){
	web.arg2par("user");
	into($.srcbase+"/&.js");
	setListHtmlContent(null,{
		title:"用户角色列表"
		,hide_search:true
	},web.exeSQL("role"));
}