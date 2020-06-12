var sql={};

sql.full=function(data,out){
	return !!data?out||"":"";
}
sql.num=function(bef,data,aft,none){
	return lang.isNumber(data)?(bef||"")+data+(aft||""):data==""&&none!=undefined?none:"";
}
sql.str=function(bef,data,aft,none){
	return lang.isString(data)?(bef||"")+data.replace(/'/g,"''")+(aft||""):data==""&&none!=undefined?none:"";
}
sql.text=function(bef,data,aft,none){
	return lang.isString(data)?(bef||"")+data+(aft||""):data==""&&none!=undefined?none:"";
}
sql.num_arr=function(bef,data,aft,none){
	var out="";
	if(lang.isArray(data)){
		for(var i=0;i<data.length;i++){
			out+=(bef||"")+(lang.isNumber(data[i])?data[i]:"")+(aft||"");
		}
	}else if(data==""&&none!=undefined){
		return none;
	}
	return out;
}
sql.str_arr=function(bef,data,aft,none){
	var out="";
	if(lang.isArray(data)){
		for(var i=0;i<data.length;i++){
			out+=(bef||"")+(lang.isString(data[i])?data[i].replace(/'/g,"''"):"")+(aft||"");
		}
	}else if(data==""&&none!=undefined){
		return none;
	}
	return out;
}
sql.year=function(bef,data,aft,none){
	var test=lang.testDT(data);
	if(test==0){return data==""&&none!=undefined?none:"";}
	if(test>1){data=data.substring(0,4);}
	return (bef||"")+data+(aft||"");
}
sql.date=function(bef,data,aft,none){
	var test=lang.testDT(data);
	if(test==0){return data==""&&none!=undefined?none:"";}
	if(test>3){
		data=data.substring(0,10);
	}else{
		if(test<2){data+="-01";}
		if(test<3){data+="-01";}
	}
	return (bef||"")+data+(aft||"");
}
sql.time=function(bef,data,aft,none){
	var test=lang.testDT(data);
	if(test>5){
		if(test==6){data+=".000";}
		data=data.substring(11);
	}else if(/[012]\d\:[0-5]\d:[0-5]\d(\.[0-9]{1,3})?/.test(data)){
		if(data.length==8){data+=".000";}
	}else{
		return data==""&&none!=undefined?none:"";
	}
	return (bef||"")+data+(aft||"");
}
sql.dt=function(bef,data,aft,none){
	var test=lang.testDT(data);
	if(test==0){return data==""&&none!=undefined?none:"";}
	data=data.replace(/[Tt]/," ");
	if(test<2){data+="-01";}
	if(test<3){data+="-01";}
	if(test<4){data+=" 00";}
	if(test<5){data+=":00";}
	if(test<6){data+=":00";}
	if(test<7){data+=".000";}
	return (bef||"")+data+(aft||"");
}