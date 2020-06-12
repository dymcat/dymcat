into($.srcroot+"/#/web.js");
if($.end=="html"){
	into($.srcbase+"/&.js");
	setListHtmlContent(null,{
		title:"[[=$.comment||$.name||'']]列表"
	},web.exeSQL("list"));
}