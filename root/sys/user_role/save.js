into($.srcroot+"/#/web.js");
if($.end=="submit"){
	web.arg2par("user");
	web.exeSQL("save");
	web.join(true,$.pars.user,"$$[user_role#save=true]");
	$.redirect="";
}