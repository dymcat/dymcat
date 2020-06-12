into(__DIR__+"polyfill.string.js");
into(__DIR__+"polyfill.array.js");

var clearTimer=function(timer){
	if(timer instanceof java.util.Timer){
		timer.cancel();
		timer=null;
	}
};
var clearInterval=clearTimer;
var clearTimeout=clearTimer;
var clearImmediate=clearTimer;
var setTimer=function(callback,delay,interval){
	if(typeof(callback)!="function"){return null;}
	var task=new java.util.TimerTask(function(){callback();});
	delay=delay||0;
	interval=interval||0;
	var timer=new java.util.Timer(true);
	if(interval>0){
		timer.schedule(task,delay,interval);
	}else{
		timer.schedule(task,delay);
	}
	return timer;
};
var setInterval=function(callback,interval){
	return setTimer(callback,interval,interval);
};
var setTimeout=function(callback,delay){
	return setTimer(callback,delay);
};
var setImmediate=function(callback){
	return setTimer(callback);
};

var lang={};

lang.isEmpty=function(data){
	if(data==null){return true;}
	if(typeof(data)=="number"||typeof(data)=="boolean"||typeof(data)=="function"){return false;}
	if(typeof(data)=="string"){return data.replace(/^\s+|\s+$/g,"")=="";}
	if(Array.isArray(data)){return data.length==0;}
	for(var item in data){
		return false;
	}
	return true;
}
lang.isNumber=function(data){
	return typeof(data)=="number"||!!data&&!isNaN(data);
}
lang.isString=function(data){
	return typeof(data)=="string"&&!!data;
}
lang.isArray=function(data){
	return !!data&&(Array.isArray(data)||data instanceof java.util.Collection||typeof(data.getClass)=="function"&&data.getClass().isArray());
}
lang.testDT=function(data){
	if(lang.isString(data)){
		if(/\d{4}\-[01]\d\-[0123]\d[ Tt][012]\d\:[0-5]\d:[0-5]\d\.\d{1,3}/.test(data)){return 7;}
		if(/\d{4}\-[01]\d\-[0123]\d[ Tt][012]\d\:[0-5]\d:[0-5]\d/.test(data)){return 6;}
		if(/\d{4}\-[01]\d\-[0123]\d[ Tt][012]\d\:[0-5]\d/.test(data)){return 5;}
		if(/\d{4}\-[01]\d\-[0123]\d[ Tt][012]\d/.test(data)){return 4;}
		if(/\d{4}\-[01]\d\-[0123]\d/.test(data)){return 3;}
		if(/\d{4}\-[01]\d/.test(data)){return 2;}
		if(/\d{4}/.test(data)){return 1;}
	}
	return 0;
}

lang.stringify=function(data){
	if(data==null||typeof(data)=="boolean"||typeof(data)=="number"){return data;}
	if(data instanceof java.util.Map){
		if(Array.isArray(data)){return JSON.stringify(data);}
		var json="";
		for(var key in data){
			json+=(json==""?"":",")+lang.stringify(key)+":"+lang.stringify(data[key]);
		}
		return "{"+json+"}";
	}
	if(data instanceof java.util.Collection||typeof(data.getClass)=="function"&&data.getClass().isArray()){
		var json="";
		if(data instanceof java.util.Collection){
			data.forEach(function(item){
				json+=(json==""?"":",")+lang.stringify(item);
			});
		}else{
			for(var i=0;i<data.length;i++){
				json+=(json==""?"":",")+lang.stringify(data[i]);
			}
		}
		return "["+json+"]";
	}
	if(data instanceof java.util.Date||data.constructor==Date){data=lang.strify(data);}
	if(typeof(data)=="object"){return JSON.stringify(data);}
	return '"'+data.replace(/\"/g,"\\\"")+'"';
}
lang.strify=function(data){
	if(data==null){return null;}
	if(data instanceof java.util.Date){return Tool.strify(data);}
	if(data.constructor==Date){return data.getFullYear()+"-"+("0"+(data.getMonth()+1)).slice(-2)+"-"+("0"+data.getDate()).slice(-2)+" "+("0"+data.getHours()).slice(-2)+":"+("0"+data.getMinutes()).slice(-2)+":"+("0"+data.getSeconds()).slice(-2)+"."+("00"+data.getMilliseconds()).slice(-3);}
	if(data instanceof java.util.Map||data instanceof java.util.Collection||typeof(data.getClass)=="function"&&data.getClass().isArray()){return lang.stringify(data).replace(/\\(?!\")/g,"\\\\").replace(/\r/g,"\\r").replace(/\n/g,"\\n").replace(/\t/g,"\\t").replace(/\f/g,"\\f");}
	if(typeof(data)=="object"){return lang.stringify(data);}
	return data;
}
lang.copy=function(){
	var data={};
	for(var i=0;i<arguments.length;i++){
		if(arguments[i]){
			for(var key in arguments[i]){
				data[key]=arguments[i][key];
			}
		}
	}
	return data;
}

lang.uuid=function(){
	return java.util.UUID.randomUUID()+"";
}
lang.now=function(format){
	return format?new java.text.SimpleDateFormat(format).format(new java.util.Date()):lang.strify(new Date());
}
lang.random=function(min,max){
	return parseInt(Math.random()*(max-min+(min<0&&max>-1?2:1))+min+(min<0?-1:0));
}
lang.md5=function(text){
	return text?Tool.digest(Tool.DigestMD5,text):text;
}