
var $$={};
for(var key in $){
	$$[key]=$[key];
}
function callback(){
	print(1234567890);
	for(var key in $$){
		print(key+"="+$$[key]);
	}
	var s=Tool.readString("console.cmd");
	var j=Tool.mapify(Tool.strify({text:s}));
	var a=Tool.strify(j);
	var b=Tool.parse(a);
	print("---------------111----------------");
	print(lang.strify(j));
	print("----------------222---------------");
	print(lang.strify(b));
}

var timer=setTimeout(function(){
	callback();
	clearTimer(timer);
},3000);
