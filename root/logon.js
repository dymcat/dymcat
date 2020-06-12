into($.srcroot+"/#/web.js");
if($.end=="html"){
	$.content=web.fillIN({
		$:$.srcpath+"/login.html"
		,body:$.srcpath+"/login&logon&reset.html"
	},lang.copy($,{
		body_color_style:web.own("body_color_style")||web.take("body_color_style","$$")
		,area_color_style:web.own("area_color_style")||web.take("area_color_style","$$")
		,level:0
		,title:"注册"
	}));
}else if($.end=="submit"){
	if(!$.pars.account){
		web.iframe({logon_account:"账号不能为空"});
	}else if(($.pars.type=="email"||$.pars.type=="phone")&&!$.pars.checkCode){
		web.iframe({logon_checkCode:"验证码不能为空"});
	}else if(!$.pars.password){
		web.iframe({logon_password:"密码不能为空"});
	}else if(!$.pars.confirmPassword){
		web.iframe({logon_confirmPassword:"确认密码不能为空"});
	}else if($.pars.account.length<5||$.pars.account.length>32){
		web.iframe({logon_account:"账号长度需在5到32个字符之间"});
	}else if($.pars.type=="email"&&!/^[^\@]+\@[^\@\.]+\.[^\@]+$/.test($.pars.account)){
		web.iframe({logon_account:"邮箱格式错误"});
	}else if($.pars.type=="phone"&&!/^1\d{10}$/.test($.pars.account)){
		web.iframe({logon_account:"手机号格式错误"});
	}else if(($.pars.type=="email"||$.pars.type=="phone")&&!/^\d{6}$/.test($.pars.checkCode)){
		web.iframe({logon_checkCode:"验证码只能为6个数字"});
	}else if($.pars.type=="email"&&$.pars.checkCode!=web.take("logon_email_code")["code"]){
		web.iframe({logon_checkCode:"邮箱验证码错误"});
	}else if($.pars.type=="phone"&&$.pars.checkCode!=web.take("logon_phone_code")["code"]){
		web.iframe({logon_checkCode:"手机验证码错误"});
	}else if($.pars.password.length<6||$.pars.password.length>255){
		web.iframe({logon_password:"密码长度需在6到255个字符之间"});
	}else if($.pars.confirmPassword!=$.pars.password){
		web.iframe({logon_confirmPassword:"确认密码与密码不一致"});
	}else{
		if($.pars.type!="email"&&$.pars.type!="phone"){$.pars.type="login";}
		$.pars.password=lang.md5($.pars.password);
		var logon=web.exeSQL("sql.xml>logon");
		if(logon){
			var owner=web.exeSQL("sql.xml>login");
			if(owner&&owner.id){
				web.join(owner,"owner");
				web.iframe(/(\/login.html|\/logon.html|\/reset.html)$/.test($.request.headers().get("Referer"))?($.pars.user=="user"?"/sys.html":"/own.html"):"");
			}else{
				web.iframe({logon_account:"账号注册成功，登录失败"});
			}
		}else{
			web.iframe({logon_account:"注册账号失败"});
		}
	}
}else if($.end=="json"){
	var type=$.pars.type;
	var account=$.pars.account;
	if(type==""){
		var owner=web.exeSQL("sql.xml>login",{account:account});
		var flag=!owner||!owner.id;
		web.out("logon,username=>"+account+" -> "+flag);
		$.content={flag:flag};
	}else{
		var code=lang.random(100000,999999);
		web.out("logon,"+type+"=>"+account+" -> "+code);
		if(type=="email"){
			web.sendMail(account,"注册验证码",web.fillIN($.srcroot+"/logon.email.code.html",{
				email:account
				,site:"本网站"
				,code:code
				,tel:"400-600-1314"
			}));
			web.join({code:code},"logon_email_code");
		}else if(type=="phone"){
			web.sendSMS(account,web.fillIN($.srcroot+"/logon.phone.code.html",{
				phone:account
				,site:"本网站"
				,code:code
				,tel:"400-600-1314"
			}));
			web.join({code:code},"logon_phone_code");
		}
		$.content={flag:true,msg:"注册验证码已发往到您的邮箱，请及时查收，填写邮箱验证码。"};
	}
}