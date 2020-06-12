into($.srcroot+"/#/web.js");
var type=$.pars.type;
if(type=="sjs"){
	try{
		var engine=Tool.ScriptEngineFactory.getScriptEngine(Tool.ScriptEngineBuildOption);
		engine.eval(Tool.DefaultEvalIntoCode);
		if($.server.into()){engine.eval($.server.into());}
		engine.eval("var _alert_print={_alert:[],_print:''};function alert(msg){_alert_print._alert.push(msg);}function print(msg,byView){msg=(msg+'').replace(/[\\r\\n]+/g,'<br/>');if(!byView){msg=msg.replace(/\\</g,'&lt;').replace(/\\>/g,'&gt;');}_alert_print._print+=msg+'<br/>';}");
		engine.put("$",$);
		engine.eval("into($.srcroot+'/#/web.js');");
		engine.eval($.server.babel()?Tool.getBabelScriptEngine().invokeFunction("transform",$.pars.code):$.pars.code);
		engine.eval("\r\nvar _alert_print_result=JSON.stringify(_alert_print);");
		$.content=engine.get("_alert_print_result");
	}catch(e){
		$.content={_alert:[e.toString()],_print:""};
	}
}else if(type=="sql"){
	var tb="";
	try{
		var sqls=($.pars.code.replace(/\/\*[\s\S]*?\*\//g,"")+"\n").replace(/\/\/[^\r\n]*[\r\n]/g,"").replace(/^[\s;]+|[\s;]+$/g,"").split(";");
		for(var i=0;i<sqls.length;i++){
			var sql=sqls[i].replace(/^\s+|\s+$/g,"");
			if(sql.toLowerCase().indexOf("select")==0||sql.toLowerCase().indexOf("show")==0){
				var list=$.server.getGlobal("jdbc").list($.pars.jdbc,sql,true);
				if(list){
					tb+="<table width='100%'>";
					for(var j=0;j<list.length;j++){
						if(j==0){
							tb+="<tr>";
							for(var key in list[j]){
								tb+="<th align='left' style='padding:5px;'>"+key+"</th>";
							}
							tb+="</tr>";
						}
						tb+="<tr>";
						for(var key in list[j]){
							tb+="<td style='padding:5px;'>"+list[j][key]+"</td>";
						}
						tb+="</tr>";
					}
					tb+="</table>";
				}else{
					tb+="<table width='100%'><tr><th align='left' style='padding:5px;color:red;'>SqlError</th></tr></table>";
				}
			}else if(sql.toLowerCase().indexOf("call")==0){
				var map=$.server.getGlobal("jdbc").call($.pars.jdbc,sql,true);
				if(map){
					tb+="<table width='100%'>";
					tb+="<tr>";
					for(var key in map){
						tb+="<th align='left' style='padding:5px;'>"+key+"</th>";
					}
					tb+="</tr>";
					tb+="<tr>";
					for(var key in map){
						tb+="<td style='padding:5px;'>"+map[key]+"</td>";
					}
					tb+="</tr>";
					tb+="</table>";
				}else{
					tb+="<table width='100%'><tr><th align='left' style='padding:5px;color:red;'>SqlError</th></tr></table>";
				}
			}else{
				var count=$.server.getGlobal("jdbc").count($.pars.jdbc,sql);
				if(count){
					tb+="<table width='100%'><tr><th align='left' style='padding:5px;'>"+count+"条数据受影响</th></tr></table>";
				}else{
					tb+="<table width='100%'><tr><th align='left' style='padding:5px;color:red;'>SqlError</th></tr></table>";
				}
			}
		}
	}catch(e){
		tb+="<table width='100%'><tr><th align='left' style='padding:5px;color:red;'>"+e+"</th></tr></table>";
	}
	$.content={_alert:[],_print:tb.replace(/[\r\n]+/g,"<br/>")};
}else if(type=="cmd"){
	try{
		var outs="";
		var result=Tool.commandLine($.pars.code,"GBK",true);
		for(var i=0;i<result.length;i++){
			var out=result[i];
			if(out.indexOf("ok:")==0){
				out="<span>"+out.substring(3)+"</span>";
			}else if(out.indexOf("err:")==0){
				out="<span style='color:red;'>"+out.substring(4).replace(/[\r\n]+/g,"")+"</span>";
			}
			outs+=out;
		}
		$.content={_alert:[],_print:outs.replace(/[\r\n]+/g,"<br/>")};
	}catch(e){
		$.content={_alert:[e.toString()],_print:""};
	}
}else{
	$.content={_alert:[],_print:""};
}