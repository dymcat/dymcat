into($.srcroot+"/#/web.js");
if($.end=="html"){
	$.uripath+="/script";
	into($.srcbase+"/&.js");
	setHtmlContent(null,{
		title:"预编译脚本"
		,sjs_file_list:function(){
			var folder=new java.io.File($.srcroot);
			return sjs_file_list(folder,folder.getCanonicalPath().replace(/\\/g,"/"),"");
		}()
	});
}else if($.end=="json"){
	var count=null;
	if($.pars.func=="load"){
		if($.pars.type=="代码"){
			Tool.runScript($.server.into(),new java.io.File($.srcroot+"/"+$.pars.path),{"#":$.server.babel(),"@":false});
			var script=Tool.ScriptCompiledCache.get(new java.io.File($.srcroot).getCanonicalPath().replace(/\\/g,"/")+"/"+$.pars.path);
			count=lang.isArray(script)?script[0].size():1;
		}else if($.pars.type=="方法"){
			Tool.runScript($.server.into(),new java.io.File($.srcroot+"/"+$.pars.path),$.server.babel()?"#":null,null);
			count=1;
		}
	}else if($.pars.func=="unload"){
		if($.pars.type=="代码"){
			var script=Tool.ScriptCompiledCache.remove(new java.io.File($.srcroot).getCanonicalPath().replace(/\\/g,"/")+"/"+$.pars.path);
			if(lang.isArray(script)){script[0].clear();}
			count=0;
		}else if($.pars.type=="方法"){
			Tool.ScriptEngineCache.remove(new java.io.File($.srcroot).getCanonicalPath().replace(/\\/g,"/")+"/"+$.pars.path);
			count=0;
		}
	}
	$.content={count:count};
}

function sjs_file_list(folder,absolute,relative){
	var list={};
	var files=folder.listFiles();
	for(var i=0;i<files.length;i++){
		var name=files[i].getName();
		if(files[i].isDirectory()&&name!="@"){
			list=lang.copy(list,sjs_file_list(files[i],absolute+"/"+name,(relative==""?"":relative+"/")+name));
		}else if(files[i].isFile()&&name.endsWith($.server.getGlobal("end"))){
			var type=null;
			var count=0;
			var script=Tool.ScriptCompiledCache.get(absolute+"/"+name);
			if(script!=null){
				type="代码";
				count=lang.isArray(script)?script[0].size():1;
			}else if(Tool.ScriptEngineCache.containsKey(absolute+"/"+name)){
				type="方法";
				count=1;
			}
			list[(relative==""?"":relative+"/")+name]=format_data(files[i],{type:type,count:count,size:files[i].length(),time:files[i].lastModified()});
		}
	}
	return list;
}
function format_data(file,item){
	if(!item.type){item.type=/.*function\s+[a-zA-Z0-9_\$]+\s*\(\s*\$\s*\)\s*{.*/.test(Tool.readString(file))?"方法":"代码";}
	if(item.size<1024){item.size=item.size+" B";}
	else if(item.size<1024*1024){item.size=(item.size/1024).toFixed(3)+" KB";}
	else if(item.size<1024*1024*1024){item.size=(item.size/1024/1024).toFixed(3)+" MB";}
	else if(item.size<1024*1024*1024*1024){item.size=(item.size/1024/1024/1024).toFixed(3)+" GB";}
	else{item.size=(item.size/1024/1024/1024/1024).toFixed(3)+" TB";}
	item.time=lang.strify(new Date(item.time-0));
	return item;
}