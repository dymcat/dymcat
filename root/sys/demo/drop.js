into($.srcroot+"/#/web.js");
if($.end=="submit"){
	web.arg2par("id");
	web.exeSQL("drop");
	$.redirect="";
}