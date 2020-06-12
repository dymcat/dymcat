into($.srcroot+"/#/web.js");
if($.end=="html"){
	into($.srcbase+"/&.js");
	setHtmlContent(null,{
		title:"应用源代码"
		,jdbc_keys:$.server.getGlobal("jdbc").keys()
		,tree_json:"var tree_json="+listFilesTree({
			folder:new java.io.File(".")
			,order:"item"
			,root:/^\.\//
			,like:"javascript:infopost('?');"
			,update:true
			,name:null
		})+";"
	});
}else if($.end=="json"&&$.args.length>0){
	if($.args[0]=="call"){
		try{
			$.content={flag:new java.io.File($.pars.path).renameTo(new java.io.File($.pars.path.replace(/[\/\\][^\/\\]*$/,"/")+$.pars.name))};
		}catch(e){
			$.content={flag:false};
		}
	}else if($.args[0]=="info"){
		var file=new java.io.File($.pars.path);
		try{
			$.content={text:(file.length()>1024*1024?"该文件大小超过1M，无法打开！":Tool.readString(file).trim())};
		}catch(e){
			$.content={text:""};
		}
	}else if($.args[0]=="edit"){
		try{
			$.content={flag:Tool.writeString($.pars.path,$.pars.code)};
		}catch(e){
			$.content={flag:false};
		}
	}else if($.args[0]=="add"){
		var file=new java.io.File($.pars.path);
		if(file.exists()){
			$.content={flag:false};
		}else{
			var type=$.pars.type;
			if(type=="folder"){
				$.content={flag:file.mkdir()};
			}else if(type.indexOf(".")==0){
				var code=new java.io.File($.srcpath+"/demo/code"+type);
				if(!code||code.isDirectory()){
					type="";
				}else{
					try{
						$.content={flag:Tool.writeString(file,Tool.readString(code).trim())};
					}catch(e){
						type="";
					}
				}
			}
			if(type==""){
				$.content={flag:file.createNewFile()};
			}
		}
	}else if($.args[0]=="play"){
		$.content=new java.io.File($.pars.path);
		$.type=$.server.mime($.pars.path);
	}else if($.args[0]=="down"){
		$.content=new java.io.File($.pars.path);
		if($.content.isFile()){
			$.type="application/octet-stream";
		}else if($.content.isDirectory()){
			$.content=Tool.compressByZip($.content,$.charset,1024,4,null);
			$.pars.path+=".zip";
			$.type="application/zip";
		}
		web.down($.pars.path);
	}else if($.args[0]=="drop"){
		try{
			$.content={flag:Tool.deleteAllFiles(new java.io.File($.pars.path))};
		}catch(e){
			$.content={flag:false};
		}
	}
}

function listFilesTree(json){
	if(json.tree){
		if(!json.folder||!json.folder.isDirectory()){return json.tree.toString();}
		var pId=json.index[0];
		var list=Tool.sortFiles(json.folder.listFiles(),json.order);
		for(var i=0;i<list.length;i++){
			var file=list[i];
			var path=file.getPath().replace(/\\/g,"/").replace(/\/{2,}/g,"/").replace(json.root,"").replace(/\$/g,"\\$");
			if(file.isDirectory()){
				json.tree.append(",{pId:"+pId+",id:"+(++json.index[0])+",path:\""+(json.update?path:file.getName())+"\",open:true}");
				listFilesTree({
					tree:json.tree
					,folder:file
					,order:json.order
					,root:json.root
					,like:json.like
					,update:json.update
					,index:json.index
				});
			}else if(file.isFile()){
				json.tree.append(",{pId:"+pId+",id:"+(++json.index[0])+",path:\""+(json.update?path:file.getName())+"\",url:\""+(json.like==null?path:json.like.replace(/\?/,path))+"\"}");
			}
		}
		return json.tree.toString();
	}else{
		return "["+"{pId:"+-1+",id:"+0+",name:\""+(json.name==null?json.folder.getName():json.name)+"\""+(json.update?",path:\""+json.folder.getPath().replace(/\\/g,"/").replace(/\/{2,}/g,"/").replace(json.root,"").replace(/\$/g,"\\$")+"\"":"")+"}"+listFilesTree({
			tree:new java.lang.StringBuilder()
			,folder:json.folder
			,order:json.order
			,root:json.root
			,like:json.like
			,update:json.update
			,index:[0]
		})+"]";
	}
}