function setHtmlContent(view,data,info,body1,body2,body3,body4,body5){
	var body={_page_info_:(info instanceof java.util.Map)?info:{}};
	$.content=web.fillIN(lang.copy({
		$:$.srcbase+"/&.html"
		,right:$.srcbase+"/right.html"
		,login:$.srcbase+"/login&logon&reset.html"
		,body:$.srcview
	},view),lang.copy($,{
		owner:web.take("owner")
		,head_menu:web.own("web_head_menu")||web.take("web_head_menu","$$")
		,left_menu:web.own("web_left_menu")||web.take("web_left_menu","$$")
		,body_color_style:web.own("body_color_style")||web.take("body_color_style","$$")
		,area_color_style:web.own("area_color_style")||web.take("area_color_style","$$")
		,level:0
	},data,body,body1,body2,body3,body4,body5));
}
function setListHtmlContent(view,data,list,body1,body2,body3,body4,body5){
	var hasPage=list instanceof java.util.Map;
	var body=hasPage?list:{_page_list_:list};
	if((body.hasPage=hasPage)&&(!data||!data.pageId)){body.pageId="box_page";}
	if(!data||!data.queryId){body.queryId="box_query";}
	if($.pars._order_by_){body._order_by_=$.pars._order_by_;}
	if($.pars._order_sort_){body._order_sort_=$.pars._order_sort_;}
	if($.pars._query_search_){body._query_search_=$.pars._query_search_;}
	$.content=web.fillIN(lang.copy({
		$:$.srcbase+"/&.html"
		,right:$.srcbase+"/right.html"
		,login:$.srcbase+"/login&logon&reset.html"
		,body:$.srcbase+"/list.html"
		,table:$.srcpath+"/table.html"
		,query:$.srcpath+"/query.html"
	},view),lang.copy($,{
		owner:web.take("owner")
		,head_menu:web.own("web_head_menu")||web.take("web_head_menu","$$")
		,left_menu:web.own("web_left_menu")||web.take("web_left_menu","$$")
		,body_color_style:web.own("body_color_style")||web.take("body_color_style","$$")
		,area_color_style:web.own("area_color_style")||web.take("area_color_style","$$")
		,level:0
	},data,body,body1,body2,body3,body4,body5));
}