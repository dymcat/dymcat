into($.srcroot+"/#/web.js");
if($.end=="submit"){
	web.arg2par("user");
	web.exeSQL("drop");
	$.redirect="";
}