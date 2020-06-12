var sb=new java.lang.StringBuilder();
var date=new Date();
date.setFullYear(2019,0,1);
while(date.getFullYear()<2029){
	sb.append("insert into tb_date(yom,isWeekend,createUser) values('"+date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+"',"+(date.getDay()==0||date.getDay()==6?2:1)+",'@@@@@@@@');").append("\r\n");
	date.setDate(date.getDate()+1);
}
Tool.writeString("d:/date.sql",sb);