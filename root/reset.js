into($.srcroot+"/#/web.js");
if($.end=="html"){
	$.content=web.fillIN({
		$:$.srcpath+"/login.html"
		,body:$.srcpath+"/login&logon&reset.html"
	},lang.copy($,{
		body_color_style:web.own("body_color_style")||web.take("body_color_style","$$")
		,area_color_style:web.own("area_color_style")||web.take("area_color_style","$$")
		,level:0
		,title:"重置密码"
	}));
}else if($.end=="submit"){
	if(!$.pars.account){
		web.iframe({reset_account:"账号不能为空"});
	}else if(!$.pars.checkCode){
		web.iframe({reset_checkCode:"验证码不能为空"});
	}else if(!$.pars.password){
		web.iframe({reset_password:"新密码不能为空"});
	}else if(!$.pars.confirmPassword){
		web.iframe({reset_confirmPassword:"确认密码不能为空"});
	}else if($.pars.account.length<5||$.pars.account.length>32){
		web.iframe({reset_account:"账号长度需在5到32个字符之间"});
	}else if($.pars.type!="email"&&$.pars.type!="phone"){
		web.iframe({reset_account:"账号只能是邮箱或手机号"});
	}else if($.pars.type=="email"&&!/^[^\@]+\@[^\@\.]+\.[^\@]+$/.test($.pars.account)){
		web.iframe({reset_account:"邮箱格式错误"});
	}else if($.pars.type=="phone"&&!/^1\d{10}$/.test($.pars.account)){
		web.iframe({reset_account:"手机号格式错误"});
	}else if(!/^\d{6}$/.test($.pars.checkCode)){
		web.iframe({reset_checkCode:"验证码只能为6个数字"});
	}else if($.pars.type=="email"&&$.pars.checkCode!=web.take("reset_email_code")["code"]){
		web.iframe({reset_checkCode:"邮箱验证码错误"});
	}else if($.pars.type=="phone"&&$.pars.checkCode!=web.take("reset_phone_code")["code"]){
		web.iframe({reset_checkCode:"手机验证码错误"});
	}else if($.pars.password.length<6||$.pars.password.length>255){
		web.iframe({reset_password:"新密码长度需在6到255个字符之间"});
	}else if($.pars.confirmPassword!=$.pars.password){
		web.iframe({reset_confirmPassword:"确认密码与新密码不一致"});
	}else{
		$.pars.password=lang.md5($.pars.password);
		var reset=web.exeSQL("sql.xml>reset");
		if(reset){
			web.iframe("/login.html");
		}else{
			web.iframe({reset_password:"重置密码失败"});
		}
	}
}else if($.end=="json"){
	var type=$.pars.type;
	var account=$.pars.account;
	var code=lang.random(100000,999999);
	web.out("reset,"+type+"=>"+account+" -> "+code);
	if(type=="email"){
		web.sendMail(account,"重置密码验证码",web.fillIN($.srcroot+"/reset.email.code.html",{
			email:account
			,site:"本网站"
			,code:code
			,tel:"400-600-1314"
		}));
		web.join({code:code},"reset_email_code");
	}else if(type=="phone"){
		web.sendSMS(account,web.fillIN($.srcroot+"/reset.phone.code.html",{
			phone:account
			,site:"本网站"
			,code:code
			,tel:"400-600-1314"
		}));
		web.join({code:code},"reset_phone_code");
	}
	$.content={flag:true,msg:"重置密码验证码已发往到您的邮箱，请及时查收，填写邮箱验证码。"};
}