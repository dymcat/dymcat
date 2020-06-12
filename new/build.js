function buildAll(){
	var build=new java.io.File("new/work/build").list();
	for(var i=0;i<build.length;i++){
		build("h2",build,"root/sys","sys");
	}
}
function build(jdbc,work,root,view){
	var comment=work.substring(work.indexOf("=")+1,work.lastIndexOf("."));
	var name=work.substring(0,work.indexOf("="));
	var list=Tool.listify(Tool.readString("new/work/build/"+work));
	var idName=null;
	var idComment=null;
	var isNumber=null;
	var isTime=null;
	var hasCreateUser=null;
	var hasModifyUser=null;
	var order=null;
	var index=[];
	var content="";
	for(var i=0;i<list.length;i++){
		var map=list[i];
		if(!map.name||!map.type){
			$.status=500;
			$.content="new/work/build/"+work+" -> 存在name=null或者type=null";
			break;
		}
		content+="\t"+(content==""?"":",")+map.name;
		content+=" "+map.type;
		if(map.type=="tinyint"){
			content+=" unsigned";
		}else if(map.type=="decimal"){
			content+="("+(map.length=map.length||18)+","+(map.range=map.range||2)+")";
		}else if(map.type=="char"){
			index.push(map.name);
			content+="("+(map.length=map.length||32)+")";
		}else if(map.type=="varchar"){
			content+="("+(map.length=map.length||255)+")";
		}
		map.isNumber="|tinyint|int|bigint|float|double|decimal|".indexOf("|"+map.type+"|")>-1;
		map.isTime="|year|date|time|datetime|timestamp|".indexOf("|"+map.type+"|")>-1;
		if(map.notnull){content+=" not null";}
		if(typeof(map.value)=="number"||map.value=="now()"||map.value=="uuid()"){
			content+=" default "+map.value;
			if(map.value=="now()"){order=map.name;}
		}else if(typeof(map.value)=="string"){
			content+=" default '"+map.value+"'";
		}
		if(map.comment){content+=" comment '"+map.comment+"'";}
		if(map.primary){
			content+=" primary key";
			if(map.type=="int"){content+=" auto_increment";}
			idName=map.name;
			idComment=map.comment;
			isNumber=map.isNumber;
			isTime=map.isTime;
		}
		if(map.name=="createUser"){hasCreateUser=true;}
		if(map.name=="modifyUser"){hasModifyUser=true;}
		if(map.unique){
			content+=" unique";
		}
		content+="\r\n";
	}
	content="drop table if exists tb_"+name+";\r\ncreate table if not exists tb_"+name+"(\r\n"+content+")comment='"+comment+"';";
	for(var i=0;i<index.length;i++){
		content+="\r\ncreate index "+name+"_"+index[i]+" on tb_"+name+"("+index[i]+");";
	}
	content+="\r\nselect * from tb_"+name+";";
	var pool=$.server.getGlobal("jdbc").get(jdbc);
	var conn=pool.toWork();
	com.dymcat.lang.Jdbc.update(conn,content);
	pool.toWait(conn);
	var file="new/table/tb_"+name+".sql";
	Tool.writeString(file,"\r\n"+content+"\r\n");
	Tool.appendToFile("new/table/db.sql","\r\n"+content+"\r\n");
	web.out(file+"=>"+content);
	var data={name:name,comment:comment,list:list,idName:idName,idComment:idComment,isNumber:isNumber,isTime:isTime,hasCreateUser:hasCreateUser,hasModifyUser:hasModifyUser,order:order,index:index};
	view=new java.io.File("new/view/"+view).listFiles();
	for(var i=0;i<view.length;i++){
		if(!view[i].isFile()){continue;}
		file=new java.io.File(root+"/"+name+"/"+view[i].getName());
		if(file.exists()){continue;}
		content=web.fillIN(view[i].getPath(),data,"shun").replace(/^\s+|\s+$/g,"");
		Tool.writeString(file,content);
		web.out(file+"=>"+content);
	}
	new java.io.File("new/work/built").mkdirs();
	new java.io.File("new/work/build/"+work).renameTo(new java.io.File("new/work/built/"+work));
}