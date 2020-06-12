into($.srcroot+"/#/web.js");
if($.end=="html"){
	$.uripath+="/create";
	into($.srcbase+"/&.js");
	setHtmlContent(null,{
		title:"代码生成器"
		,jdbcKeys:$.server.getGlobal("jdbc").keys()
		,workList:new java.io.File("new/work/build").list()
		,rootList:Tool.readString("new/root.txt").replace(/{root}/g,$.srcroot).split(/[\r\n]+/)
		,viewList:(function(){
			var list=[];
			var lines=new java.io.File("new/view").list();
			for(var i=0;i<lines.length;i++){
				var cfg=Tool.mapify(Tool.readString("new/view/"+lines[i]+"/@/cfg.json"));
				cfg.name=lines[i];
				list.push(cfg);
			}
			return list;
		}())
	});
}else if($.end=="json"){
	into("new/build.js");
	build($.pars.jdbc,$.pars.work,$.pars.root,$.pars.view);
	$.content={flag:true};
}else if($.args.length>0){
	if($.args.length==3&&$.args[0]=="face"){
		$.content=new java.io.File("new/view/"+$.args[1]+"/@"+($.uriview.substring($.uriview.lastIndexOf("/"))));
	}
}