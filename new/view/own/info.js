into($.srcroot+"/#/web.js");
if($.end=="html"){
	web.arg2par("[[=$.idName||'']]");
	into($.srcbase+"/&.js");
	setHtmlContent(null,{
		title:"[[=$.comment||$.name||'']]详情"
	},web.exeSQL("info"));
}