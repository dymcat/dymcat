into($.srcroot+"/#/web.js");
into($.srcroot+"/#/door.js");
if(!door.power("sys")||(web.own("role_duty")||"").indexOf("'@@@@'")==-1){
	if($.end=="html"){
		$.redirect="/login.html";
	}else{
		$.status=401;
		$.content="未获取到访问该链接的权限。";
	}
}