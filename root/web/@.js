function back($,root,func){
	var path=$_FILE_PATH_$.substring(new java.io.File($.srcroot).getCanonicalPath().length+1)+(func?" -> "+func:"");
	path+="<br/>"+Tool.strify($.args);
	path+="<br/>"+Tool.strify($.pars);
	print(path);
	return Tool.readString($.srcroot+"/web/@.html").replace(/{root}/g,root).replace(/{path}/g,path);
}