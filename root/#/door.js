var door={};

/*获取当前用户全部角色和职责*/
door.role_duty_func=function(){
	var role_duty="";
	var duty=web.exeSQL("sql.xml>duty")||[];
	for(var i=0;i<duty.length;i++){
		role_duty+=(i==0?"":",")+"'"+duty[i].id+"'";
	}
	return role_duty;
}

/*获取当前用户全部可访问链接*/
door.link_door_func=function(role_duty){
	var link_door="#";
	var door=web.exeSQL("sql.xml>door",{duty:role_duty})||[];
	for(var i=0;i<door.length;i++){
		link_door+=(!door[i].platePath||door[i].platePath=="web"?"":door[i].platePath+"/")+door[i].linkPath+"#";
	}
	return link_door;
}

/*获取当前用户指定板块头部菜单*/
door.head_menu_func=function(path,role_duty){
	return web.exeSQL("sql.xml>head_menu",{path:path,duty:role_duty})||[];
}

/*获取当前用户指定板块左边菜单*/
door.left_menu_func=function(path,role_duty){
	return web.exeSQL("sql.xml>left_menu",{path:path,duty:role_duty})||[];
}

door.power=function(path){
	var jsdb=$.server.getGlobal("jsdb");
	if(!jsdb){
		$.status=500;
		$.content="未获取到缓存系统，请联系开发者，责令修复。";
		return;
	}
	var owner=web.take("owner");
	var ownerLastTime=web.takeTime("owner");
	web.out("owner=>"+owner);
	web.out("ownerLastTime=>"+ownerLastTime);
	var update=false;
	var changeTime=web.takeTime("change=role","$$");
	var role_duty=owner?owner.role_duty:web.take("unknown_duty","$$");
	if(role_duty&&owner&&changeTime<=(owner?ownerLastTime:web.takeTime("unknown_duty","$$"))){
		if(web.take(owner.id,"$$[user_role#save=true]")!=null){
			web.dump(owner.id,"$$[user_role#save=true]");
			role_duty=null;
		}else if(web.take(owner.id,"$$[user$status=2]")!=null){
			web.dump(owner.id,"$$[user$status=2]");
			role_duty=null;
		}else if(web.take(owner.id,"$$[user#drop=true]")!=null){
			web.dump(owner.id,"$$[user#drop=true]");
			role_duty=null;
		}
	}
	if(!role_duty){
		role_duty=door.role_duty_func();
		if(role_duty==""){role_duty="'@@@'";}
		if(owner){
			owner.role_duty=role_duty;
			update=true;
		}else{
			web.join(role_duty,"unknown_duty","$$");
		}
	}
	web.out("role_duty=>"+role_duty);
	if(role_duty.indexOf("'@@@@@'")>-1){
		role_duty=null;
	}else if(role_duty.indexOf("'@@@'")==-1){
		role_duty="'@@@',"+role_duty;
	}
	changeTime=web.takeTime("change=link|role_link","$$");
	if(role_duty){
		var link_door=owner?owner.link_door:web.take("unknown_door","$$");
		if(!link_door||changeTime>(owner?ownerLastTime:web.takeTime("unknown_door","$$"))){
			link_door=door.link_door_func(role_duty);
			if(owner){
				link_door+="own.html#";
				if(role_duty.indexOf("'@@@@'")>-1){link_door+="sys.html#";}
				owner.link_door=link_door;
				update=true;
			}else{
				web.join(link_door,"unknown_door","$$");
			}
		}
		web.out("link_door=>"+link_door);
		if(link_door.indexOf("#"+$.uridoor+"#")==-1){
			if($.end=="html"){
				$.redirect="/login.html";
			}else{
				$.status=401;
				$.content="未获取到访问该链接的权限。";
			}
			if(update){web.join(owner,"owner");}
			return;
		}
	}
	var head_menu_name=(path+"_head_menu").toString();
	var head_menu=owner?owner[head_menu_name]:web.take(head_menu_name,"$$");
	if(!head_menu||changeTime>(owner?ownerLastTime:web.takeTime(head_menu_name,"$$"))){
		head_menu=door.head_menu_func(path,role_duty);
		if(owner){
			owner[head_menu_name]=head_menu;
			update=true;
		}else{
			web.join(head_menu,head_menu_name,"$$");
		}
	}
	var left_menu_name=(path+"_left_menu").toString();
	var left_menu=owner?owner[left_menu_name]:web.take(left_menu_name,"$$");
	if(!left_menu||changeTime>(owner?ownerLastTime:web.takeTime(left_menu_name,"$$"))){
		left_menu=door.left_menu_func(path,role_duty);
		if(owner){
			owner[left_menu_name]=left_menu;
			update=true;
		}else{
			web.join(left_menu,left_menu_name,"$$");
		}
	}
	web.out(path+"_head_menu=>"+head_menu);
	web.out(path+"_left_menu=>"+left_menu);
	if(head_menu==[]&&left_menu==[]){
		$.redirect="/";
	}else if($.end=="html"){
		update=door.skin(owner,update);
	}
	if(update){web.join(owner,"owner");}
	door.solid();
	if($.server.hasGlobal("proxy")){$.urlbase="/";}
	return owner;
}

door.skin=function(owner,update){
	var body_color_style=owner?owner.body_color_style:web.take("body_color_style","$$");
	if(!body_color_style){
		var skin=owner?owner.skin:null;
		if(skin){skin=skin.split(",");}
		if(!skin||skin.length!=8){skin=$.server.getGlobal("config").default_skin;}
		body_color_style=eval($.server.getGlobal("config").body_color_style.toString()).note(1)
		.replace(/<rgb lt>/g,skin[0]+","+skin[1]+","+skin[2]+",1.0")
		.replace(/<rgb rb>/g,skin[3]+","+skin[4]+","+skin[5]+",1.0");
		var area_color_style=eval((skin[6]<128?$.server.getGlobal("config").area_glass_style:$.server.getGlobal("config").area_cloud_style).toString()).note(1)
		.replace(/<rgba>/,skin[6]+","+skin[6]+","+skin[6]+","+skin[7]/10)
		.replace(/<rgb\-64>/g,(skin[6]-64)+","+(skin[6]-64)+","+(skin[6]-64))
		.replace(/<rgb\+64>/g,(skin[6]+64)+","+(skin[6]+64)+","+(skin[6]+64));
		if(owner){
			owner.body_color_style=body_color_style;
			owner.area_color_style=area_color_style;
			return true;
		}else{
			web.join(body_color_style,"body_color_style","$$");
			web.join(area_color_style,"area_color_style","$$");
		}
	}
	return update;
}

door.solid=function(){
	var solid=$.server.getGlobal("config").solid;
	if(solid&&solid.status){
		var root=solid["#root"];
		var time=solid["#time"];
		var view=$.srcview.indexOf($.srcroot+"/")==0?$.srcview.substring($.srcroot.length+1):$.srcview;
		solid=solid[view];
		if(solid){
			if(!solid.root){solid.root=root;}
			if(!solid.root){return;}
			if(!solid.time){solid.time=time;}
			if(typeof(solid.time)=="string"){solid.time=Tool.timeify(solid.time);}
			if(lang.isArray(solid.args)){
				var map={};
				var length=solid.args.length;
				if(length==0){
					map["0"]=[];
				}else{
					for(var i=0;i<length;i++){
						var keys=solid.args[i].replace(/\/{2,}/g,"/").replace(/^\/|\/$/g,"").split("\/");
						map[keys.length+""]=keys;
					}
				}
				solid.args=map;
			}
			var keys=null;
			var length=$.args.length;
			while(!keys&&length>0){
				keys=solid.args[length+""];
				if(!keys){length--;}
			}
			var pars=JSON.parse(lang.strify(solid.pars));
			if(keys){
				for(var i=0;i<keys.length;i++){
					if(keys[i] in pars){pars[keys[i]]=$.args[i];}
				}
			}
			if($.end){view=view.substring(0,view.length-$.end.length-1);}
			view+="/";
			for(var key in pars){
				view+="#"+(pars[key]||"");
			}
			view=solid.root+"/"+view+"."+$.end;
			var file=new java.io.File(view);
			if(file.isFile()&&java.lang.System.currentTimeMillis()-file.lastModified()<(solid.time||Number.MAX_VALUE)){
				$.content=file;
			}else{
				$.solid=file;
			}
		}
	}
}