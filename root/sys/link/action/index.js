into($.srcroot+"/#/web.js");
if($.end=="html"){
	web.arg2par($.args.length==1?"lead":null);
	$.pars.rank=4;
	into($.srcbase+"/&.js");
	setListHtmlContent(null,{
		title:"功能级链接列表"
	},web.exeSQL("list"));
}