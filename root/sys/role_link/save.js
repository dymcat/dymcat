into($.srcroot+"/#/web.js");
if($.end=="submit"){
	web.arg2par("role");
	web.exeSQL("save");
	web.join(true,"change=link|role_link","$$");
	$.redirect="";
}