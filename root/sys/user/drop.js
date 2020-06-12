into($.srcroot+"/#/web.js");
if($.end=="submit"){
	web.arg2par("id");
	web.exeSQL("drop");
	var ids=lang.isArray($.pars.id)?$.pars.id:[$.pars.id];
	for(var i=0;i<ids.length;i++){
		web.join(true,ids[i],"$$[user#drop=true]");
	}
	$.redirect="";
}