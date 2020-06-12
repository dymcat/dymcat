into($.srcroot+"/"+$.server.air()+"/lang.js");

var web={};

web.out=function(data){
	return Tool.out(data,$.server.print(),$.server.debug());
}
web.err=function(data){
	return Tool.err(data,$.server.print(),$.server.debug());
}

web.arg2par=function(args){
	if(typeof(args)=="string"){
		args=args.split("\/");
		for(var i=0;i<$.args.length;i++){
			if(i==args.length){break;}
			$.pars[args[i]]=$.args[i];
		}
	}
	return $.pars;
}
web.iframe=function(data){
	$.type="text/html";
	$.content=typeof(data)=="string"?"<script>parent.location.href='"+(data==""?$.request.headers().get("Referer"):data)+"';</script>":"<script>parent.showErrorMessage("+lang.strify(data)+");</script>";
}

web.cookie=function(json){
	if(typeof(json)=="string"){return com.dymcat.netty.HttpServer.getCookieValue($.request,json);}
	if(!$.cookie){
		$.cookie=json;
	}else if(lang.isArray($.cookie)){
		$.cookie.push(json);
	}else{
		$.cookie=[$.cookie,json];
	}
}
web.down=function(name){
	name=name.replace(/^.*[\/\\]/,"");
	var agent=$.request.headers().get("User-Agent")||"";
	if(!$.header){$.header={};}
	$.header["Content-Disposition"]="attachment;filename="+(agent.indexOf(" Firefox/")>-1||agent.indexOf(" Safari/")>-1&&agent.indexOf(" Chrome/")==-1?new java.lang.String(name.getBytes($.charset||"UTF-8"),"ISO-8859-1"):java.net.URLEncoder.encode(name));
}
web.i18n=function(text,data){
	return $.server.i18n($.language,text,data==undefined?null:data);
}
web.own=function(key){
	var owner=web.take("owner");
	return owner&&owner[key]?owner[key]:null;
}
web.allLink=function(){
	return web.own("link_door")||web.take("unknown_door","$$");
}
web.hasLink=function(link){
	return (web.allLink()||"").indexOf("#"+link+"#")>-1;
}

web.have=function(id,td,tb){
	if(!id||!td&&!tb&&!$.session){return false;}
	var jsdb=$.server.getGlobal("jsdb");
	if(!jsdb){return false;}
	tb=td?tb||"$":$.session;
	if(!jsdb.has(tb)){return false;}
	if(!td){return jsdb.get(tb).have(id);}
	var data=jsdb.get(tb).take(td);
	return data?!!data[id]:false;
}
web.take=function(id,td,tb){
	if(!id||!td&&!tb&&!$.session){return null;}
	var jsdb=$.server.getGlobal("jsdb");
	if(!jsdb){return null;}
	tb=td?tb||"$":$.session;
	if(!jsdb.has(tb)){return null;}
	if(!td){return jsdb.get(tb).take(id);}
	var data=jsdb.get(tb).take(td);
	return data?data[id]:null;
}
web.takeTime=function(id,td,tb){
	if(!id||!td&&!tb&&!$.session){return null;}
	var jsdb=$.server.getGlobal("jsdb");
	if(!jsdb){return null;}
	tb=td?tb||"$":$.session;
	if(!jsdb.has(tb)){return null;}
	if(!td){return jsdb.get(tb).takeTime(id);}
	var data=jsdb.get(tb).take(td);
	return data?data["$$$$$"+id]:null;
}
web.join=function(data,id,td,tb){
	if(!data||!id||!td&&!tb&&!$.session){return null;}
	var jsdb=$.server.getGlobal("jsdb");
	if(!jsdb){return null;}
	tb=td?tb||"$":$.session;
	if(!jsdb.has(tb)){
		jsdb.add({
			tbName:tb
			,idName:"$$$"
			,timeName:"$$$$"
			,maxCache:1024
			,digest:""
			,cipher:""
			,attribute:{
				create:lang.now()
				,update:lang.now()
			}
			,index:null
			,finish:null
		});
	}
	return !td
		?jsdb.get(tb).join(id,data,true)
		:jsdb.get(tb).join(td,function(){
			var json={};
			json[id]=data;
			json["$$$$$"+id]=new Date().getTime();
			return json;
		}());
}
web.dump=function(id,td,tb){
	if(!id||!td&&!tb&&!$.session){return false;}
	var jsdb=$.server.getGlobal("jsdb");
	if(!jsdb){return false;}
	tb=td?tb||"$":$.session;
	if(!jsdb.has(tb)){return false;}
	if(!td){return jsdb.get(tb).dump(id);}
	var data=jsdb.get(tb).take(td);
	if(!data){return false;}
	data.remove(id);
	web.join(data,id,td,tb);
	return true;
}

web.takeConn=function(jdbc,autoCommit){
	var conn=$.server.getGlobal("jdbc").toWork(jdbc||"",autoCommit!=null&&autoCommit);
	if(!$.JdbcConnMapper){$.JdbcConnMapper={};}
	$.JdbcConnMapper["jchc_"+conn.hashCode()]=[jdbc,conn];
	return conn;
}
web.backConn=function(conn,jdbc,isCommit){
	$.server.getGlobal("jdbc").toWait(jdbc||"",conn,isCommit==null||isCommit);
	delete $.JdbcConnMapper["jchc_"+conn.hashCode()];
	return true;
}

web.exeSQL=function(name,args,conn){
	if(!name){throw new Error("没有指定要执行的SQL语句");}
	if(!args){args=$.pars;}
	var file;
	var index=name.indexOf(">");
	if(index==-1){
		file=$.srcpath+"/sql.xml";
	}else{
		file=name.substring(0,index);
		if(file.length-".xml".length!=file.lastIndexOf(".xml")){file+=file.length-"/".length==file.lastIndexOf("/")?"sql.xml":".xml";}
		file=$.server.uri2src($.context,$.request,file)[0];
		name=name.substring(index+1);
	}
	var node=Tool.loadNode(file=new java.io.File(file),"sql","name",name);
	if(node){
		web.out(Tool.strify(node));
	}else{
		web.err("Not Found Node In sql.xml"+file+"->"+name);
	}
	var sql=node.getTextContent();
	var more={};
	var simple=true;
	var href=node.getAttribute("href");
	if(href){href=eval(href);}
	var role=/\{\#def\.([a-zA-Z0-9_]+)\}/g;
	var part;
	while((part=role.exec(sql))!=null){
		var xml=href?new java.io.File(href[part[1]]):file;
		var tag=Tool.loadNode(xml,"sql","part",part[1]);
		web.out(Tool.strify(tag));
		more[part[1]]=tag.getTextContent();
		simple=false;
	}
	if(simple){
		sql=web.fillIN(sql,args,"sql");
	}else{
		more.$=sql;
		sql=web.fillIN(more,args,"sql");
	}
	web.out(sql);
	var alone=false;
	if(!conn){
		conn=web.takeConn(args._jdbc_name_||node.getAttribute("jdbc"),true);
		alone=true;
	}
	var result;
	var Jdbc=com.dymcat.lang.Jdbc;
	var type=args._return_type_||node.getAttribute("type");
	if(type=="bool"||type=="update"){
		result=Jdbc.update(conn,sql);
	}else if(type=="int"||type=="count"){
		result=Jdbc.count(conn,sql);
	}else if(type=="ints"||type=="batch"){
		result=Jdbc.batch(conn,sql);
	}else if(type=="obj"||type=="data"){
		result=Jdbc.data(conn,sql);
	}else{
		var keys=node.getAttribute("key");
		keys=keys?keys.split(","):[];
		if(type=="map"||type=="find"){
			result=Jdbc.find(conn,sql,node.getAttribute("sort")=="true",keys);
		}else if(type=="list"){
			result=Jdbc.list(conn,sql,node.getAttribute("sort")=="true",keys);
		}else if(type=="page"){
			result=Jdbc.page(conn,sql,parseInt(args["_page_size_"])||10,parseInt(args["_page_index_"])||1,node.getAttribute("sort")=="true",keys);
			if(result!=null){
				web.out(result["_sql_count_"]);
				web.out(result["_sql_page_"]);
				result.remove("_sql_count_");
				result.remove("_sql_page_");
			}
		}
	}
	if(result instanceof java.lang.Exception){
		result.printStackTrace();
		web.backConn(conn,args._jdbc_name_||node.getAttribute("jdbc"),false);
	}else if(alone){
		web.backConn(conn,args._jdbc_name_||node.getAttribute("jdbc"));
	}
	return result;
}

web.fillIN=function(view,data,type){
	if(!this.doT){
		load($.srcroot+($.server.getGlobal("config").doT||"/#/doT.min.js"));
		doT.templateSettings.varname="$";
		doT.templateSettings.strip=false;
	}
	var open="{{",close="}}";
	if(type=="shun"){
		open="[[";
		close="]]";
		doT.templateSettings.evaluate=/\[\[\%([\s\S]+?(\]?)+)\]\]/g;
		doT.templateSettings.interpolate=/\[\[\=([\s\S]+?)\]\]/g;
		doT.templateSettings.encode=/\[\[\!([\s\S]+?)\]\]/g;
		doT.templateSettings.use=/\[\[\#([\s\S]+?)\]\]/g;
		doT.templateSettings.useParams=/(^|[^\w$])def(?:\.|\[[\'\"])([\w$\.]+)(?:[\'\"]\])?\s*\:\s*([\w$\.]+|\"[^\"]+\"|\'[^\']+\'|\[[^\]]+\])/g;
		doT.templateSettings.define=/\[\[\#\#\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)\#\]\]/g;
		doT.templateSettings.defineParams=/^\s*([\w$]+):([\s\S]+)/;
		doT.templateSettings.conditional=/\[\[\?(\?)?\s*([\s\S]*?)\s*\]\]/g;
		doT.templateSettings.iterate=/\[\[\~\s*(?:\]\]|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\]\])/g;
	}else if(type=="sql"){
		open="{";
		close="}";
		doT.templateSettings.evaluate=/\{\%([\s\S]+?(\}?)+)\}/g;
		doT.templateSettings.interpolate=/\{\=([\s\S]+?)\}/g;
		doT.templateSettings.encode=/\{\!([\s\S]+?)\}/g;
		doT.templateSettings.use=/\{\#([\s\S]+?)\}/g;
		doT.templateSettings.useParams=/(^|[^\w$])def(?:\.|\[[\'\"])([\w$\.]+)(?:[\'\"]\])?\s*\:\s*([\w$\.]+|\"[^\"]+\"|\'[^\']+\'|\{[^\}]+\})/g;
		doT.templateSettings.define=/\{\#\#\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)\#\}/g;
		doT.templateSettings.defineParams=/^\s*([\w$]+):([\s\S]+)/;
		doT.templateSettings.conditional=/\{\?(\?)?\s*([\s\S]*?)\s*\}/g;
		doT.templateSettings.iterate=/\{\~\s*(?:\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\})/g;
		doT.encodeHTMLSource=function(){
			return function(code){
				return code?code.toString().replace(/'/g,function(char){return {"'":"''"}[char]||char;}):"";
			};
		};
	}else{
		open="{{";
		close="}}";
		doT.templateSettings.evaluate=/\{\{\%([\s\S]+?(\}?)+)\}\}/g;
		doT.templateSettings.interpolate=/\{\{\=([\s\S]+?)\}\}/g;
		doT.templateSettings.encode=/\{\{\!([\s\S]+?)\}\}/g;
		doT.templateSettings.use=/\{\{\#([\s\S]+?)\}\}/g;
		doT.templateSettings.useParams=/(^|[^\w$])def(?:\.|\[[\'\"])([\w$\.]+)(?:[\'\"]\])?\s*\:\s*([\w$\.]+|\"[^\"]+\"|\'[^\']+\'|\{[^\}]+\})/g;
		doT.templateSettings.define=/\{\{\#\#\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)\#\}\}/g;
		doT.templateSettings.defineParams=/^\s*([\w$]+):([\s\S]+)/;
		doT.templateSettings.conditional=/\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g;
		doT.templateSettings.iterate=/\{\{\~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g;
	}
	var sql="{%into('"+$.srcroot+($.server.getGlobal("config").sql||"/#/sql.js")+"');}\r\n";
	var text=null;
	if(typeof(view)=="string"){
		var fit_view=null;
		if(type!="shun"&&type!="sql"){
			var last=view.lastIndexOf(".");
			fit_view=last==-1?view+($.mobile?".m":".pc"):view.substring(0,last)+($.mobile?".m":".pc")+view.substring(last);
			if(!new java.io.File(fit_view).isFile()){fit_view=null;}
		}
		text=doT.template(type=="sql"?sql+view:Tool.readString(fit_view||view))(data);
	}else if(!view||typeof(view.$)!="string"){
		throw new Error("需要填充的模板丢失");
	}else{
		var part={};
		for(var key in view){
			if(key!="$"){
				var fit_view=null;
				if(type!="shun"&&type!="sql"){
					var last=view[key].lastIndexOf(".");
					fit_view=last==-1?view[key]+($.mobile?".m":".pc"):view[key].substring(0,last)+($.mobile?".m":".pc")+view[key].substring(last);
					if(!new java.io.File(fit_view).isFile()){fit_view=null;}
				}
				part[key]=type=="sql"?view[key]:Tool.readString(fit_view||view[key]);
			}
		}
		var fit_view=null;
		if(type!="shun"&&type!="sql"){
			var last=view.$.lastIndexOf(".");
			fit_view=last==-1?view.$+($.mobile?".m":".pc"):view.$.substring(0,last)+($.mobile?".m":".pc")+view.$.substring(last);
			if(!new java.io.File(fit_view).isFile()){fit_view=null;}
		}
		text=doT.template(open+"##def.$:"+(type=="sql"?sql+view.$:Tool.readString(fit_view||view.$))+"#"+close+open+"#def.$"+close,undefined,part)(data);
	}
	text=text.replace(/\r\n\s*\r\n/g,"\r\n").replace(/\n[ \t]*\n/g,"\n").replace(/\r[ \t]*\r/g,"\r");
	if(type=="sql"){
		text=text.replace(/\{\(\[\s*(where|group\s+by|having|order\s+by|limit)\s*\]\)\}/gi,"")
		.replace(/\{\(\[\s*(\(|values\b|set\b|select\b|where\b|group\s+by\b|having\b|order\s+by\b|limit\b)(\s*)(\,|and\b|or\b|not\b)/gi,"$1$2")
		.replace(/(\,|\band|\bor|\bnot)(\s*)(\;|\)|\)\s*\;|\bfrom|\bwhere)\s*\]\)\}/gi,"$2$3")
		.replace(/\{\(\[(\s*)(\,|and\b|or\b|not\b)?/gi,"$1")
		.replace(/(\,|\band|\bor|\bnot)?(\s*)\]\)\}/gi,"$2");
	}
	var edge=$.server.getGlobal("config").edge||[
		{bef:"/\\*\\*\\(",aft:"\\)\\*\\*/"}
		,{bef:"<!--\\(",aft:"\\)-->"}
	];
	for(var i=0;i<edge.length;i++){
		var data=null;
		var name;
		while((data=new RegExp(edge[i].bef+"<([^<\\(!\\)>]+)<"+edge[i].aft).exec(text))!=null){
			name=data[1];
			data=new RegExp(edge[i].bef+"<"+name+"<"+edge[i].aft+"([\\s\\S]*?)"+edge[i].bef+">"+name+">"+edge[i].aft,"m").exec(text);
			if(data){
				text=text.replace(new RegExp(edge[i].bef+"<"+name+"<"+edge[i].aft+"([\\s\\S]*?)"+edge[i].bef+">"+name+">"+edge[i].aft,"m"),"");
				text=text.replace(new RegExp("("+edge[i].bef+"<"+name+">"+edge[i].aft+")"),data[1].replace(/\$(?=[1&`'$])/g,"<<!!#@#@#!!>>")+"$1").replace(/<<!!#@#@#!!>>/g,"$");
			}else{
				text=text.replace(new RegExp(edge[i].bef+"<"+name+"<"+edge[i].aft),"");
			}
		}
		text=text.replace(new RegExp(edge[i].bef+"<[^<\\(!\\)>]+>"+edge[i].aft,"g"),"");
	}
	return text;
}

web.sendMail=function(user,title,content){
	Tool.loadJavaFiles("com.dymcat.mail.Mail",$.server.getGlobal("config").mail_java).static.sendOnlyText(
		$.server.debug()
		,$.server.getGlobal("config").mail_account
		,$.server.getGlobal("config").mail_password
		,0
		,null
		,$.charset
		,title
		,content
		,user
	);
}
web.sendSMS=function(user,content){
	web.out("发送短信。。。");
	/*
	Tool.loadJavaFiles("com.dymcat.sms.SMS",$.server.getGlobal("config").sms_java).static.sendOnlyText(
		$.server.debug()
		,$.charset
		,title
		,content
		,user
	);
	*/
}

var println="<--------------------------------------------------<";
for(var key in $){
	if(key=="request"||key=="decoder"||key=="websocket"||key=="content"){continue;}
	println+=(println==""?"":"\r\n")+"$."+key+"="+$[key];
}
web.out(println+"\r\n"+">-------------------------------------------------->");
