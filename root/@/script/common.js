
/***<polyfill<***/
if(!window.JSON){document.write("<script src='资源库/@/polyfill/json3/json3.min.js'></script>");}
if(!Array.isArray){
	document.write("<script src='资源库/@/polyfill/es5/es5-shim.min.js'></script>");
	document.write("<script src='资源库/@/polyfill/es5/es5-sham.min.js'></script>");
}
if(!Array.from||!Array.of){
	document.write("<script src='资源库/@/polyfill/es6/es6-shim.min.js'></script>");
	document.write("<script src='资源库/@/polyfill/es6/es6-sham.min.js'></script>");
}
/***>polyfill>***/

/***<lang<***/
Function.prototype.note=function(index){
	var text=this.toString();
	var first=-1;
	var last=-2;
	var note=[];
	for(var i=1;i<Number.MAX_VALUE;i++){
		first=text.indexOf("/*",last+2);
		if(first==-1){
			if(note.length==0){throw new Error(text);}
			return note;
		}
		last=text.indexOf("*/",first+2);
		if(last==-1){throw new Error(text);}
		if(typeof(index)=="number"&&index>0){
			if(i==index){return text.substring(first+2,last);}
		}else{
			note.push(text.substring(first+2,last));
		}
	}
};
/***>lang>***/

$(function(){

/***<laydate<***/
	var laydate_click_done=function(value,date){
		if(lay(this.elem[0]).attr("value_data")==value){
			lay(this.elem[0]).removeAttr("name");
		}else{
			lay(this.elem[0]).attr("name",lay(this.elem[0]).attr("name_data"));
		}
	};
	var laydate_init_eval=function(laydate){
		lay("input[type=year]").each(function(){
			this.type="text";
			laydate.render({elem:this,trigger:"click",type:"year",done:laydate_click_done});
		});
		lay("input[type=month]").each(function(){
			this.type="text";
			laydate.render({elem:this,trigger:"click",type:"month",done:laydate_click_done});
		});
		lay("input[type=date]").each(function(){
			this.type="text";
			laydate.render({elem:this,trigger:"click",type:"date",done:laydate_click_done});
		});
		lay("input[type=datetime],input[type=datetime-local]").each(function(){
			this.type="text";
			laydate.render({elem:this,trigger:"click",type:"datetime",done:laydate_click_done});
		});
		lay("input[type=time]").each(function(){
			this.type="text";
			laydate.render({elem:this,trigger:"click",type:"time",done:laydate_click_done});
		});
	};
	if(window.laydate){
		laydate_init_eval(laydate);
	}else if(window.layui){
		layui.use(["laydate"],function(){
			laydate_init_eval(layui.laydate);
		});
	}
/***>laydate>***/

/***<tab<***/
	$(".tab-th").on("click",".tab",function(){
		$(this).parent().parent().find(".now").removeClass("now");
		$(this).addClass("now");
		var now=this;
		var index=0;
		$(this).parent().find(".tab").each(function(i){
			if(this==now){index=i;}
			var run=$(this).attr("run");
			if(run){eval(run);}
		});
		$(this).parent().parent().find(".tab-td .tab").eq(index).addClass("now");
	});
/***>tab>***/

/***<menu-left<***/
	$(".link-menu").click(function(e){
		var $page=$($(this).attr("data"));
		if($page.is(":visible")){
			$page.slideUp(200);
		}else{
			$page.slideDown(200);
		}
		e.stopPropagation();
	});
	$(".menu-left li .th").click(function(e){
		var visible=$(this).parent().find("ul").is(":visible");
		$(this).parent().parent().find("ul").slideUp(200);
		$(this).parent().parent().find("b").removeClass("sfont-down").addClass("sfont-next");
		if(!visible){
			$(this).parent().find("ul").slideDown(200);
			$(this).parent().find("b").removeClass("sfont-next").addClass("sfont-down");
		}
		e.stopPropagation();
	});
	$(".menu-left li ul a[href]").each(function(){
		if($(this).attr("href").replace(/\/[^\/]*\/\.\./,"").replace(/\.[^\.]*$/,"")==$(this).parent().parent().parent().attr("data")){
			$(this).parent().show();
			$(this).parent().prev().find("b").removeClass("sfont-next").addClass("sfont-down");
		}
	});
/***>menu-left>***/

/***<page-left,page-right<***/
	$(window).on("resize",function(){
		$("#page-left,#page-right").css("display","");
	});
	$(document.body).click(function(){
		$("#page-left,#page-right").css("display","");
	});
/***>page-left,page-right>***/

/***<tinyint<***/
	$(".tinyint").each(function(){
		if($(this).is("select")){
			var html=getOptionsHtml($(this).attr("tinyint"),$(this).attr("text")!="false",$(this).attr("data"),$(this).attr("readonly"),$(this).attr("disabled"));
			if(html.indexOf("<option")==0||html.indexOf("<optgroup")==0){
				$(this).html(html);
			}else if(html.indexOf("<label><input type='radio'")==0){
				$(this).parent().html(html.replace(/<name>/g,$(this).attr("name")));
			}
		}else if($(this).is("input")){
			$(this).val(getOptionText($(this).attr("tinyint"),$(this).val()));
		}else if($(this).is("td")){
			$(this).html(getOptionText($(this).attr("tinyint"),$(this).text()));
		}
	});
/***>tinyint>***/

/***<readonly<***/
	$("select[readonly='readonly']").focus(function(){
		this.defaultIndex=this.selectedIndex;
	}).change(function(){
		this.selectedIndex=this.defaultIndex;
	});
	$("input[type='checkbox'][readonly='readonly']").focus(function(){
		this.defaultChecked=this.checked;
	}).change(function(){
		this.checked=this.defaultChecked;
	});
	$("input[type='radio'][readonly='readonly']").focus(function(){
		$(this).parent().parent().find("input[type='radio'][name='"+$(this).attr("name")+"']").each(function(){
			this.defaultChecked=this.checked;
		});
	}).change(function(){
		$(this).parent().parent().find("input[type='radio'][name='"+$(this).attr("name")+"']").each(function(){
			this.checked=this.defaultChecked;
		});
	});
/***>readonly>***/

/***<textarea<***/
	var $inputext=$("<input type='text' style='display:none;font-size:inherit;'/>");
	var $textarea=$("<textarea style='display:none;font-size:inherit;'></textarea>");
	$(document.body).append($inputext).append($textarea);
	if(parseInt($inputext.css("font-size"))>parseInt($textarea.css("font-size"))){
		$(document.head).append("<style>.area input[type='month'],.area input[type='week'],.area input[type='date'],.area input[type='time'],.area input[type='datetime'],.area input[type='datetime-local'],.area textarea{font-size:larger;}</style>");
	}
	$inputext.remove();
	$textarea.remove();
	$(".data-info dl dd textarea").on("focus input propertychange",function(){
		$(this).css("height","auto");
		$(this).scrollTop(0);
		$(this).css("height",(navigator.userAgent.indexOf("JavaFX")==-1?this.scrollHeight+2:(this.scrollHeight-64)/30*19+44)+"px");
	}).blur(function(){
		$(this).css("height","30px");
	});
	$(".data-info dl dd textarea").css("resize","none");
/***>textarea>***/

/***<datetime<***/
	$("input[type='datetime-local']").each(function(){
		var index=$(this).val().indexOf(" ");
		if(index==10){$(this).val($(this).val().substring(0,10)+"T"+$(this).val().substring(11));}
	}).change(function(){
		if($(this).val().length==10){
			if($(this).attr("name").indexOf("_query_min_")==0){
				$(this).val($(this).val()+"T00:00");
			}else if($(this).attr("name").indexOf("_query_max_")==0){
				$(this).val($(this).val()+"T23:59");
			}else{
				var now=new Date();
				$(this).val($(this).val()+"T"+("0"+now.getHours()).slice(-2)+":"+("0"+now.getMinutes()).slice(-2));
			}
		}
	});
/***>datetime>***/

/***<edit-form<***/
	$("form.edit-form").find("input[name][type!='radio'][type!='checkbox'],select[name],textarea[name]").each(function(){
		if($(this).attr("readonly")||$(this).attr("disabled")||$(this).is(":hidden")||$(this).parent().is(":hidden")||$(this).parent().parent().is(":hidden")){return true;}
		$(this).attr("value_data",$(this).val());
		$(this).attr("name_data",$(this).attr("name"));
		$(this).removeAttr("name");
	}).change(function(){
		if($(this).val()==$(this).attr("value_data")){
			$(this).removeAttr("name");
		}else{
			$(this).attr("name",$(this).attr("name_data"));
		}
	});
/***>edit-form>***/

/***<stop-more-submit<***/
	$("form").submit(function(e){
		if($(this).attr("stop")){
			e.preventDefault();
		}else{
			$(this).attr("stop","stop");
		}
	}).change(function(){
		if($(this).attr("stop")){$(this).removeAttr("stop");}
	});
/***>stop-more-submit>***/

/***<link-bread<***/
	var link_bread_html=null;
	if(sessionStorage){
		var title=document.getElementsByTagName("title");
		if(title){
			title=title[0];
			var level=title.getAttribute("level")||"0";
			if(parseInt(level)>0){
				sessionStorage.setItem("page_level",level);
				sessionStorage.setItem("page_link_"+level,location.pathname);
				sessionStorage.setItem("page_name_"+level,title.innerHTML);
			}else{
				if("##/#/index.html#/sys.html#/own.html#/you.html#".indexOf("#"+location.pathname+"#")>-1){
					sessionStorage.setItem("page_level","1");
					sessionStorage.setItem("page_link_1",location.pathname);
					sessionStorage.setItem("page_name_1",title.innerHTML);
				}else if(location.pathname=="/"+$("#page-left .menu-left").attr("data")+".html"){
					sessionStorage.setItem("page_level","2");
					sessionStorage.setItem("page_link_2",location.pathname);
					sessionStorage.setItem("page_name_2",title.innerHTML);
				}else{
					sessionStorage.setItem("page_level","3");
					sessionStorage.setItem("page_link_3",location.pathname);
					sessionStorage.setItem("page_name_3",title.innerHTML);
				}
			}
			link_bread_html="";
			level=parseInt(sessionStorage.getItem("page_level"));
			for(var i=1;i<=level;i++){
				var path=sessionStorage.getItem("page_link_"+i);
				if(!path){continue;}
				var back=false;
				if(i==level-1&&document.referrer){
					var index=document.referrer.length-path.length;
					if(path==document.referrer.substring(index>0?index:0)){back=true;}
				}
				//if(link_bread_html!=""){link_bread_html+="<i>⋙</i>";}
				if(link_bread_html!=""){link_bread_html+="<i>»</i>";}
				link_bread_html+="<a"+(i==level?" class='now'":"")+(back?" onclick='history.back();'":" href='"+path+"'")+">"+sessionStorage.getItem("page_name_"+i)+"</a>";
			}
		}
	}
	if(link_bread_html){
		$("#page-main .link-bread").append(link_bread_html);
	}else{
		$("#page-main .link-bread").hide();
	}
/***>link-bread>***/

});

/***<select option radio<***/
	function getOptionText(name,value){
		var tree=tinyint_data_config[name]||tinyint_data_config[name.replace(/^[a-zA-Z0-9_]*\$/,"")];
		return tree&&typeof(tree)=="object"?tree[value+""]||"":"";
	}
	function getOptionsHtml(name,text,value,readonly,disabled){
		var html="";
		var tree=tinyint_data_config[name]||tinyint_data_config[name.replace(/^[a-zA-Z0-9_]*\$/,"")];
		if(tree&&typeof(tree)=="object"){
			if(Object.keys(tree).length==3&&/^<[^<>]*>$/.test(tree["0"]+"")){
				for(var key in tree){
					if(key=="0"){continue;}
					if(html==""){
						html+="<label><input type='radio' name='<name>' value='"+key+"'"+(key==value+""||!value&&typeof(text)=="boolean"&&!text?" checked='checked'":"")+(readonly?" readonly='readonly'":"")+(disabled?" disabled='disabled'":"")+"/>"+tree[key]+"</label>";
					}else{
						html+="<label style='float:right;'>"+tree[key]+"<input type='radio' name='<name>' value='"+key+"'"+(key==value+""?" checked='checked'":"")+(readonly?" readonly='readonly'":"")+(disabled?" disabled='disabled'":"")+"/></label>";
					}
				}
			}else{
				if(typeof(text)=="string"){html+="<option value=''>"+text+"</option>";}
				var group=null;
				var team=null;
				for(var key in tree){
					var display=tree[key];
					if(key=="0"){
						if(typeof(text)=="boolean"&&text){html+="<option value=''>请选择"+display+"</option>";}
					}else{
						var result=/^<<([^<>]*)>>$/.exec(display);
						if(result&&result.length==2){
							html+="<optgroup label='"+result[1]+"'></optgroup>";
							group=true;
							team=false;
							continue;
						}
						result=/^<([^<>]*)>$/.exec(display);
						if(result&&result.length==2){
							if(team){html+="</optgroup>";}
							html+="<optgroup label='"+(group?"&nbsp;&nbsp;&nbsp;&nbsp;":"")+result[1]+"'>";
							team=true;
							continue;
						}
						html+="<option value='"+key+"'"+(key==value+""?" selected='selected'":"")+">"+(group&&team?"&nbsp;&nbsp;&nbsp;&nbsp;":"")+display+"</option>";
					}
				}
				if(team){html+="</optgroup>";}
			}
		}
		return html;
	}
/***>select option radio>***/

/***<parse template<***/
	function parseTemplate(view,data){
		if(window.doT){
			doT.templateSettings.varname="$";
			doT.templateSettings.strip=false;
			doT.templateSettings.evaluate=/\<\<\%([\s\S]+?(\}?)+)\>\>/g;
			doT.templateSettings.interpolate=/\<\<\=([\s\S]+?)\>\>/g;
			doT.templateSettings.encode=/\<\<\!([\s\S]+?)\>\>/g;
			doT.templateSettings.use=/\<\<\#([\s\S]+?)\>\>/g;
			doT.templateSettings.useParams=/(^|[^\w$])def(?:\.|\[[\'\"])([\w$\.]+)(?:[\'\"]\])?\s*\:\s*([\w$\.]+|\"[^\"]+\"|\'[^\']+\'|\{[^\}]+\})/g;
			doT.templateSettings.define=/\<\<\#\#\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)\#\>\>/g;
			doT.templateSettings.defineParams=/^\s*([\w$]+):([\s\S]+)/;
			doT.templateSettings.conditional=/\<\<\?(\?)?\s*([\s\S]*?)\s*\>\>/g;
			doT.templateSettings.iterate=/\<\<\~\s*(?:\>\>|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\>\>)/g;
			view=doT.template(view)(data);
		}
		return view;
	}
/***>parse template>***/

/***<form error message<***/
	function showErrorMessage(message){
		for(var name in message){
			$("em#_error_"+name+"_").html(message[name]);
		}
	}
/***>form error message>***/
