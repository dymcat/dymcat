var init_script=["h2.table.sql","h2.value.sql"];
var insert_count=1000;
var nation_list=["汉族","壮族","回族","满族","维吾尔族","苗族","彝族","土家族","藏族","蒙古族","侗族","布依族","瑶族","白族","朝鲜族","哈尼族","黎族","哈萨克族","傣族","畲族","傈僳族","东乡族","仡佬族","拉祜族","佤族","水族","纳西族","羌族","土族","仫佬族","锡伯族","柯尔克孜族","景颇族","达斡尔族","撒拉族","布朗族","毛南族","塔吉克族","普米族","阿昌族","怒族","鄂温克族","京族","基诺族","德昂族","保安族","俄罗斯族","裕固族","乌孜别克族","门巴族","鄂伦春族","独龙族","赫哲族","高山族","珞巴族","塔塔尔族"];
var browser=true;

initDB(Tool.mapify(Tool.readString("HttpServer.json")).jdbc);

function initDB(list){
	for(var i=0;i<list.length;i++){
		if(!list[i].status){continue;}
		if(list[i].name=="h2"){
			new java.io.File(list[i].root+"h2.mv.db").delete();
			var driver=Tool.loadJavaFiles("org.h2.Driver",list[i].jar).newInstance();
			var url=(list[i].tcpHost?"tcp://"+list[i].tcpHost+(list[i].tcpPort?":"+list[i].tcpPort:"")+"/":"")+list[i].root+list[i].name+";database_to_upper=false;auto_reconnect=true;mode=mysql";
			var map=list[i].user==null&&list[i].pwd==null?null:{};
			if(list[i].user!=null){map.user=list[i].user;}
			if(list[i].pwd!=null){map.password=list[i].pwd;}
			for(var j=0;j<init_script.length;j++){driver.connect("jdbc:h2:"+url+";init=runscript from '"+list[i].root+init_script[j]+"'",map).close();}
			var conn=driver.connect("jdbc:h2:"+url,map);
			var stat=conn.createStatement();
			for(var j=0;j<insert_count;j++){
				var name=Tool.randomGB3755(parseInt(Math.random()*3+2));
				if(stat.executeQuery("select * from tb_demo where name='"+name+"'").next()){
					j--;
					continue;
				}
				var sex=Math.random()<0.5?"男":"女";
				var age=parseInt(Math.random()*90+10);
				var birth=new Date().getFullYear()-age+"-"+parseInt(Math.random()*12+1)+"-"+parseInt(Math.random()*28+1);
				var nation=nation_list[Math.random()<0.2?0:parseInt(Math.random()*nation_list.length)];
				var createTime=Tool.strify(new Date(new Date().getTime()-parseInt(1000*60*60*24*365*10*Math.random())));
				stat.addBatch("insert into tb_demo(name,sex,age,birth,nation,createTime) values('"+name+"','"+sex+"',"+age+",'"+birth+"','"+nation+"','"+createTime+"')");
			}
			if(insert_count>0){
				stat.executeBatch();
				stat.close();
				conn.close();
			}
			if(browser){
				var array=Tool.useField(org.h2.server.web.WebServer.class,"GENERIC");
				var length=array.length;
				array[length-1]=array[length-1].replace("~/test",url+"|"+(list[i].user||""));
				array[length-2]=array[length-2].replace("localhost/~/test",(java.net.InetAddress.getLocalHost().getHostAddress()||java.net.InetAddress.getLoopbackAddress().getHostAddress()||"localhost")+":"+list[i].tcpPort+"/"+url+"|"+(list[i].user||""));
				Tool.useField(org.h2.server.web.WebServer.class,"GENERIC",array);
				array=["-ifExists"/*,"-browser"*/];
				if(list[i].webPort){
					array.push("-web");
					array.push("-webPort");
					array.push((list[i].webPort=Tool.portify(list[i].webPort))+"");
					array.push("-webAllowOthers");
				}
				if(list[i].tcpPort&&!list[i].tcpHost){
					array.push("-tcp");
					array.push("-tcpPort");
					array.push((list[i].tcpPort=Tool.portify(list[i].tcpPort))+"");
					array.push("-tcpAllowOthers");
				}
				org.h2.tools.Console.main(array);
				url="http://localhost:"+list[i].webPort+"?language="+java.util.Locale.getDefault();
				new java.lang.Thread(function(){Tool.commandLine((java.lang.System.getProperty("os.name").startsWith("Windows ")?"start ":"xdg-open ")+url,"GBK");}).start();
			}
		}else{}
	}
}