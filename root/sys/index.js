into($.srcroot+"/#/web.js");
if($.end=="html"){
	if($.uripath=="sys"){
		into($.srcpath+"/&.js");
		setHtmlContent({
			$:$.srcpath+"/&.html"
		},{
			title:"管理平台"
		});
	}
}