into($.srcroot+"/#/web.js");
if($.end=="submit"){
	web.arg2par("[[=$.idName||'']]");
	web.exeSQL("drop");
	$.redirect="";
}