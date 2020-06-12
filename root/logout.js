into($.srcroot+"/#/web.js");
if($.end=="html"){
	web.dump("owner");
	$.redirect="/login.html";
}