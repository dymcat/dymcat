into($.srcroot+"/#/web.js");
if($.end=="html"){
	if($.args.length==0){
		var list,apiList=[],demoList=[];
		list=new java.io.File($.srcroot+"/help/api").list();
		for(var i=0;i<list.length;i++){
			apiList.push({text:list[i],href:"help/api/"+list[i]});
		}
		list=new java.io.File($.srcroot+"/help/demo").list();
		for(var i=0;i<list.length;i++){
			demoList.push({text:list[i],href:"help/demo/"+list[i]});
		}
		$.content=web.fillIN($.srcview,lang.copy($,{
			body_color_style:web.own("body_color_style")||web.take("body_color_style","$$")
			,area_color_style:web.own("area_color_style")||web.take("area_color_style","$$")
			,level:0
			,title:"帮助"
			,label:"<h3>帮助中心</h3>"
			,apiList:apiList
			,demoList:demoList
		}));
	}else{
		$.content=Tool.readString($.srcroot+"/"+$.uriview);
	}
}else if($.end=="txt"){
	$.type="text/html";
	$.content=Tool.readString($.srcroot+"/"+$.uriview).replace(/[\r\n]+/g,"<br/>").replace(/\t/g,"&nbsp;&nbsp;&nbsp;&nbsp;");
}