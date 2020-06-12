into($.srcroot+"/#/web.js");
if($.end=="html"){
	into($.srcbase+"/&.js");
	setHtmlContent(null,{
		level:2
		,title:"资料"
	});
}else if($.end=="submit"){
	if($.pars.photo){
		var bytes=java.util.Base64.getDecoder().decode($.pars.photo);
		Tool.writeBytes($.server.uri2src($.context,$.request,$.pars.photo="upload/@/photo/"+$.pars.user+".png")[0],bytes);
	}else{
		$.pars.remove("photo");
	}
	if(!$.pars.scene){$.pars.remove("scene");}
	var owner=web.take("owner");
	$.pars.id=owner.id;
	web.exeSQL("sys/user/>edit");
	$.pars.user=owner.id;
	$.pars.saveTime=lang.now();
	web.exeSQL(owner.user?"sys/user_data/>edit":"sys/user_data/>add");
	web.join(lang.copy(owner,web.exeSQL("user.data.get")),"owner");
	$.redirect="";
}