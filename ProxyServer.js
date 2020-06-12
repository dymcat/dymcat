var config=Tool.mapify(Tool.readString("ProxyServer.json"));
var ProxyServer=Java.extend(com.dymcat.netty.ProxyServer);
var server=new ProxyServer(){
	http:function(){return config.http==undefined?Java.super(server).http():config.http;}
	,https:function(){return config.https==undefined?Java.super(server).https():config.https;}
	,level:function(){return config.level==undefined?Java.super(server).level():config.level;}
	,setup:function(){return config.setup==undefined?Java.super(server).setup():config.setup;}
	,delay:function(){return config.delay==undefined?Java.super(server).delay():config.delay;}
	,period:function(){return config.period==undefined?Java.super(server).period():config.period;}
	,timeout:function(){return config.timeout==undefined?Java.super(server).timeout():config.timeout;}
	,login:function(){return config.login==undefined?Java.super(server).login():config.login;}
	,mingle:function(){return config.mingle==undefined?Java.super(server).mingle():config.mingle;}
	,remote:function(){return config.remote==undefined?Java.super(server).remote():config.remote;}
	,init:function(ssl,host,port){Java.super(server).init(ssl,host,port);}
	,done:function(ssl,host,port){Java.super(server).done(ssl,host,port);}
	,logging:function(context,channel){Java.super(server).logging(context,channel);}
	,selector:function(ssl){return Java.super(server).selector(ssl);}
};
new java.lang.Thread(function(){server.start();}).start();