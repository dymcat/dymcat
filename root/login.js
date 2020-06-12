into($.srcroot+"/#/web.js");
if($.end=="html"){
	$.content=web.fillIN({
		$:$.srcview
		,body:$.srcpath+"/login&logon&reset.html"
	},lang.copy($,{
		body_color_style:web.own("body_color_style")||web.take("body_color_style","$$")
		,area_color_style:web.own("area_color_style")||web.take("area_color_style","$$")
		,level:0
		,title:"登录"
	}));
}else if($.end=="submit"){
	if(!$.pars.account){
		web.iframe({login_account:"账号不能为空"});
	}else if(!$.pars.password){
		web.iframe({login_password:"密码不能为空"});
	}else if($.pars.account.length<5||$.pars.account.length>32){
		web.iframe({login_account:"账号长度需在5到32个字符之间"});
	}else if($.pars.password.length<6||$.pars.password.length>255){
		web.iframe({login_password:"密码长度需在6到255个字符之间"});
	}else{
		$.pars.password=lang.md5($.pars.password);
		var owner=web.exeSQL("sql.xml>login");
		if(owner&&owner.id){
			web.join(owner,"owner");
			web.exeSQL("sql.xml>last",{id:owner.id});
			web.iframe(/(\/login.html|\/logon.html|\/reset.html)$/.test($.request.headers().get("Referer"))?($.pars.user=="user"?"/sys.html":"/own.html"):"");
		}else{
			web.iframe({login_password:"账号或密码错误"});
		}
	}
}