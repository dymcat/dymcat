into($.srcroot+"/#/web.js");
if($.end=="html"){
	$.content=Tool.readString($.srcview);
	web.exeSQL("new");
}else if($.end=="json"){
	$.status=404;
	if($.args.length==1){
		if($.args[0]=="set"){
			$.content={random:$.pars.random,base64:web.exeSQL("set")?$.pars.base64:null};
		}else if($.args[0]=="get"){
			var erupt=web.exeSQL("get");
			$.content={random:$.pars.random,base64:erupt?erupt.base64:null};
		}
	}
	if($.content){$.status=200;}
}