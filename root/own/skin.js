into($.srcroot+"/#/web.js");
if($.end=="html"){
	into($.srcbase+"/&.js");
	setHtmlContent(null,{
		level:2
		,title:"皮肤"
	});
}else if($.end=="json"){
	var flag=web.exeSQL("user.skin.save");
	$.content={flag:flag};
	if(flag){
		var owner=web.take("owner");
		owner.skin=$.pars.skin;
		owner.body_color_style=null;
		owner.area_color_style=null;
		into($.srcroot+"/#/door.js");
		door.skin(owner,true);
		web.join(owner,"owner");
		into($.srcroot+"/@/script/skin.counter.js");
		color_skin_counter[$.pars.skin]=parseInt((color_skin_counter[$.pars.skin]||0)+1);
		Tool.writeString($.srcroot+"/@/script/skin.counter.js","var color_skin_counter="+lang.strify(color_skin_counter)+";");
	}
}