into($.srcroot+"/"+$.server.air()+"/lang.js");

if($.JdbcConnMapper){
	for(var jchc in $.JdbcConnMapper){
		var jdbc_conn=$.JdbcConnMapper[jchc];
		$.server.getGlobal("jdbc").toWait(jdbc_conn[0]||"",jdbc_conn[1],false);
		delete $.JdbcConnMapper[jchc];
	}
}

if($.solid&&$.content){
	Tool.writeString($.solid,$.content);
}