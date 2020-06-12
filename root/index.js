into($.srcroot+"/#/web.js");
if($.end=="html"){
	if($.uripath==""){
		into($.srcpath+"/&.js");
		var frame=null;
		if($.pars.style){
			frame={$:$.srcbase+"/&["+$.pars.style+"].html"};
			if($.pars.style=="layui"){frame.layui=$.srcbase+"/layui.html";}
		}
		setHtmlContent(frame,{
			title:"首页"
		});
	}else{
		$.status=404;
	}
}