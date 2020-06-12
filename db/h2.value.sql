
delete from tb_user_role;



replace into tb_role(id,name,status,modifyUser,modifyTime,createUser,createTime)
values('@@@','未知访客',1,null,null,'@@@@@@@@',now());

replace into tb_user(id,login,email,phone,idCard,password,loginTime,loginCount,skin,status,modifyUser,modifyTime,createUser,createTime)
values('@@@@@@',null,null,null,null,'',null,0,null,1,null,null,'@@@@@@@@',now());

insert into tb_user_role(user,role,createUser,createTime)
values('@@@@@@','@@@','@@@@@@@@',now());



replace into tb_role(id,name,status,modifyUser,modifyTime,createUser,createTime)
values('@@@@','工作人员',1,null,null,'@@@@@@@@',now());

insert into tb_user_role(user,role,createUser,createTime)
values('@@@@@@@','@@@@','@@@@@@@@',now());



replace into tb_role(id,name,status,modifyUser,modifyTime,createUser,createTime)
values('@@@@@','开发人员',1,null,null,'@@@@@@@@',now());

replace into tb_user(id,login,email,phone,idCard,password,loginTime,loginCount,skin,status,modifyUser,modifyTime,createUser,createTime)
values('@@@@@@@@','developer',null,null,null,'e807f1fcf82d132f9bb018ca6738a19f',null,0,null,1,null,null,'@@@@@@@@',now());

insert into tb_user_role(user,role,createUser,createTime)
values('@@@@@@@@','@@@@','@@@@@@@@',now());
insert into tb_user_role(user,role,createUser,createTime)
values('@@@@@@@@','@@@@@','@@@@@@@@',now());



replace into tb_role(id,name,status,modifyUser,modifyTime,createUser,createTime)
values('6c1fc29b-d1b0-46df-858c-cf11c5d42efa','系统管理员',1,null,null,'@@@@@@@@',now());

replace into tb_user(id,login,email,phone,idCard,password,loginTime,loginCount,skin,status,modifyUser,modifyTime,createUser,createTime)
values('4c05b5a2-8628-4350-bc6b-0efb1bd30e97','sysoper',null,null,null,'fcea920f7412b5da7be0cf42b8c93759',null,0,null,1,null,null,'@@@@@@@@',now());

insert into tb_user_role(user,role,createUser,createTime)
values('4c05b5a2-8628-4350-bc6b-0efb1bd30e97','@@@@','@@@@@@@@',now());
insert into tb_user_role(user,role,createUser,createTime)
values('4c05b5a2-8628-4350-bc6b-0efb1bd30e97','6c1fc29b-d1b0-46df-858c-cf11c5d42efa','@@@@@@@@',now());



replace into tb_role(id,name,status,modifyUser,modifyTime,createUser,createTime)
values('97f38a7e-be9b-4baa-b641-d4e205e947ae','业务经理',1,null,null,'@@@@@@@@',now());

replace into tb_user(id,login,email,phone,idCard,password,loginTime,loginCount,skin,status,modifyUser,modifyTime,createUser,createTime)
values('dc2f1dc4-b11d-4eaa-8fa6-a3d87e2bdc7a','manager',null,null,null,'fcea920f7412b5da7be0cf42b8c93759',null,0,null,1,null,null,'@@@@@@@@',now());

insert into tb_user_role(user,role,createUser,createTime)
values('dc2f1dc4-b11d-4eaa-8fa6-a3d87e2bdc7a','@@@@','@@@@@@@@',now());
insert into tb_user_role(user,role,createUser,createTime)
values('dc2f1dc4-b11d-4eaa-8fa6-a3d87e2bdc7a','97f38a7e-be9b-4baa-b641-d4e205e947ae','@@@@@@@@',now());



replace into tb_role(id,name,status,modifyUser,modifyTime,createUser,createTime)
values('36a5e799-9d01-4944-a2d6-e516357963f4','普通员工',1,null,null,'@@@@@@@@',now());

replace into tb_user(id,login,email,phone,idCard,password,loginTime,loginCount,skin,status,modifyUser,modifyTime,createUser,createTime)
values('f16bbe4b-772e-4a89-a183-091bffbe2fce','worker',null,null,null,'fcea920f7412b5da7be0cf42b8c93759',null,0,null,1,null,null,'@@@@@@@@',now());

insert into tb_user_role(user,role,createUser,createTime)
values('f16bbe4b-772e-4a89-a183-091bffbe2fce','@@@@','@@@@@@@@',now());
insert into tb_user_role(user,role,createUser,createTime)
values('f16bbe4b-772e-4a89-a183-091bffbe2fce','36a5e799-9d01-4944-a2d6-e516357963f4','@@@@@@@@',now());



delete from tb_role_link;



replace into tb_link(id,rank,lead,path,name,icon,sort,status,modifyUser,modifyTime,createUser,createTime)
values('@@',1,'@',null,'页面导航',null,0,1,null,null,'@@@@@@@@',now());

	replace into tb_link(id,rank,lead,path,name,icon,sort,status,modifyUser,modifyTime,createUser,createTime)
	values('1e5510eb-97d3-4564-a138-73fbdc2fc7b6',2,'@@','web','展示平台导航',null,1,1,null,null,'@@@@@@@@',now());

		replace into tb_link(id,rank,lead,path,name,icon,sort,status,modifyUser,modifyTime,createUser,createTime)
		values('714257db-dc94-4b6d-bc3f-89584bfbd4d4',3,'1e5510eb-97d3-4564-a138-73fbdc2fc7b6','index.html','首页',null,1,1,null,null,'@@@@@@@@',now());
		insert into tb_role_link(role,link,createUser,createTime)
		values('@@@','714257db-dc94-4b6d-bc3f-89584bfbd4d4','@@@@@@@@',now());

			replace into tb_link(id,rank,lead,path,name,icon,sort,status,modifyUser,modifyTime,createUser,createTime)
			values('690d9d5c-ec03-4bb8-8401-7af5da5234f6',4,'714257db-dc94-4b6d-bc3f-89584bfbd4d4','login.html','登录',null,1,1,null,null,'@@@@@@@@',now());
			insert into tb_role_link(role,link,createUser,createTime)
			values('@@@','690d9d5c-ec03-4bb8-8401-7af5da5234f6','@@@@@@@@',now());

			replace into tb_link(id,rank,lead,path,name,icon,sort,status,modifyUser,modifyTime,createUser,createTime)
			values('945bba5b-7ccc-4623-a142-d9f45f97f55f',4,'714257db-dc94-4b6d-bc3f-89584bfbd4d4','login.submit','登录提交',null,2,1,null,null,'@@@@@@@@',now());
			insert into tb_role_link(role,link,createUser,createTime)
			values('@@@','945bba5b-7ccc-4623-a142-d9f45f97f55f','@@@@@@@@',now());

			replace into tb_link(id,rank,lead,path,name,icon,sort,status,modifyUser,modifyTime,createUser,createTime)
			values('17594afd-fde1-476f-8a0c-19cc16f2a370',4,'714257db-dc94-4b6d-bc3f-89584bfbd4d4','logout.html','退出',null,3,1,null,null,'@@@@@@@@',now());
			insert into tb_role_link(role,link,createUser,createTime)
			values('@@@','17594afd-fde1-476f-8a0c-19cc16f2a370','@@@@@@@@',now());

			replace into tb_link(id,rank,lead,path,name,icon,sort,status,modifyUser,modifyTime,createUser,createTime)
			values('08a6f441-ec79-4a27-ae81-8b323d9fe582',4,'714257db-dc94-4b6d-bc3f-89584bfbd4d4','logon.html','注册',null,4,1,null,null,'@@@@@@@@',now());
			insert into tb_role_link(role,link,createUser,createTime)
			values('@@@','08a6f441-ec79-4a27-ae81-8b323d9fe582','@@@@@@@@',now());

			replace into tb_link(id,rank,lead,path,name,icon,sort,status,modifyUser,modifyTime,createUser,createTime)
			values('e35038aa-94ee-4da4-9289-d196d095b213',4,'714257db-dc94-4b6d-bc3f-89584bfbd4d4','logon.submit','注册提交',null,5,1,null,null,'@@@@@@@@',now());
			insert into tb_role_link(role,link,createUser,createTime)
			values('@@@','e35038aa-94ee-4da4-9289-d196d095b213','@@@@@@@@',now());

			replace into tb_link(id,rank,lead,path,name,icon,sort,status,modifyUser,modifyTime,createUser,createTime)
			values('7d9aea20-bad2-4407-a3d5-2cfdc1e68160',4,'714257db-dc94-4b6d-bc3f-89584bfbd4d4','logon.json','发送注册验证码',null,6,1,null,null,'@@@@@@@@',now());
			insert into tb_role_link(role,link,createUser,createTime)
			values('@@@','7d9aea20-bad2-4407-a3d5-2cfdc1e68160','@@@@@@@@',now());

			replace into tb_link(id,rank,lead,path,name,icon,sort,status,modifyUser,modifyTime,createUser,createTime)
			values('5a50ab6c-b7d7-4838-a4be-c6268a35f1f3',4,'714257db-dc94-4b6d-bc3f-89584bfbd4d4','reset.html','重置密码',null,7,1,null,null,'@@@@@@@@',now());
			insert into tb_role_link(role,link,createUser,createTime)
			values('@@@','5a50ab6c-b7d7-4838-a4be-c6268a35f1f3','@@@@@@@@',now());

			replace into tb_link(id,rank,lead,path,name,icon,sort,status,modifyUser,modifyTime,createUser,createTime)
			values('029abd36-eb34-40dd-876c-f18434f17c8c',4,'714257db-dc94-4b6d-bc3f-89584bfbd4d4','reset.submit','重置密码提交',null,8,1,null,null,'@@@@@@@@',now());
			insert into tb_role_link(role,link,createUser,createTime)
			values('@@@','029abd36-eb34-40dd-876c-f18434f17c8c','@@@@@@@@',now());

			replace into tb_link(id,rank,lead,path,name,icon,sort,status,modifyUser,modifyTime,createUser,createTime)
			values('cb1d993d-9d06-49bc-a833-b7b2b7abf4b7',4,'714257db-dc94-4b6d-bc3f-89584bfbd4d4','reset.json','发送重置密码验证码',null,9,1,null,null,'@@@@@@@@',now());
			insert into tb_role_link(role,link,createUser,createTime)
			values('@@@','cb1d993d-9d06-49bc-a833-b7b2b7abf4b7','@@@@@@@@',now());

		replace into tb_link(id,rank,lead,path,name,icon,sort,status,modifyUser,modifyTime,createUser,createTime)
		values('12c0dd6d-f9fe-4ea7-8b17-4a918eedd70f',3,'1e5510eb-97d3-4564-a138-73fbdc2fc7b6','view.html','发现',null,2,1,null,null,'@@@@@@@@',now());
		insert into tb_role_link(role,link,createUser,createTime)
		values('@@@','12c0dd6d-f9fe-4ea7-8b17-4a918eedd70f','@@@@@@@@',now());

		replace into tb_link(id,rank,lead,path,name,icon,sort,status,modifyUser,modifyTime,createUser,createTime)
		values('ea9fb86f-d13e-42ff-bcf5-19e445cb1e95',3,'1e5510eb-97d3-4564-a138-73fbdc2fc7b6','help.html','帮助',null,3,1,null,null,'@@@@@@@@',now());
		insert into tb_role_link(role,link,createUser,createTime)
		values('@@@','ea9fb86f-d13e-42ff-bcf5-19e445cb1e95','@@@@@@@@',now());

		replace into tb_link(id,rank,lead,path,name,icon,sort,status,modifyUser,modifyTime,createUser,createTime)
		values('129b71a0-ecd1-46ea-b25d-5b9155482927',3,'1e5510eb-97d3-4564-a138-73fbdc2fc7b6','own.html','我的',null,4,1,null,null,'@@@@@@@@',now());
		insert into tb_role_link(role,link,createUser,createTime)
		values('@@@','129b71a0-ecd1-46ea-b25d-5b9155482927','@@@@@@@@',now());

	replace into tb_link(id,rank,lead,path,name,icon,sort,status,modifyUser,modifyTime,createUser,createTime)
	values('db81e4c3-fc84-44cd-94c2-d7b9b1c6f067',2,'@@','sys','管理平台导航',null,2,1,null,null,'@@@@@@@@',now());

		replace into tb_link(id,rank,lead,path,name,icon,sort,status,modifyUser,modifyTime,createUser,createTime)
		values('b206ca58-c19f-45c2-913c-8cf263ff420b',3,'db81e4c3-fc84-44cd-94c2-d7b9b1c6f067','index.html','首页',null,1,1,null,null,'@@@@@@@@',now());
		insert into tb_role_link(role,link,createUser,createTime)
		values('@@@@','b206ca58-c19f-45c2-913c-8cf263ff420b','@@@@@@@@',now());

		replace into tb_link(id,rank,lead,path,name,icon,sort,status,modifyUser,modifyTime,createUser,createTime)
		values('28673d59-c770-4236-8334-66a0e28b8985',3,'db81e4c3-fc84-44cd-94c2-d7b9b1c6f067','view.html','发现',null,2,1,null,null,'@@@@@@@@',now());
		insert into tb_role_link(role,link,createUser,createTime)
		values('@@@@','28673d59-c770-4236-8334-66a0e28b8985','@@@@@@@@',now());

		replace into tb_link(id,rank,lead,path,name,icon,sort,status,modifyUser,modifyTime,createUser,createTime)
		values('8cbc0a2f-9ccb-418e-81aa-42f6f02382d7',3,'db81e4c3-fc84-44cd-94c2-d7b9b1c6f067','help.html','帮助',null,3,1,null,null,'@@@@@@@@',now());
		insert into tb_role_link(role,link,createUser,createTime)
		values('@@@@','8cbc0a2f-9ccb-418e-81aa-42f6f02382d7','@@@@@@@@',now());

		replace into tb_link(id,rank,lead,path,name,icon,sort,status,modifyUser,modifyTime,createUser,createTime)
		values('2fdae9a9-e5f0-45e2-87aa-a6499955267f',3,'db81e4c3-fc84-44cd-94c2-d7b9b1c6f067','own.html','我的',null,4,1,null,null,'@@@@@@@@',now());
		insert into tb_role_link(role,link,createUser,createTime)
		values('@@@@','2fdae9a9-e5f0-45e2-87aa-a6499955267f','@@@@@@@@',now());

	replace into tb_link(id,rank,lead,path,name,icon,sort,status,modifyUser,modifyTime,createUser,createTime)
	values('ade22e2b-ce5f-428d-88bb-38be8ce12cb8',2,'@@','own','个人中心导航',null,3,1,null,null,'@@@@@@@@',now());

		replace into tb_link(id,rank,lead,path,name,icon,sort,status,modifyUser,modifyTime,createUser,createTime)
		values('900bd976-2f33-47a0-b77a-ead31ef5f88e',3,'ade22e2b-ce5f-428d-88bb-38be8ce12cb8','index.html','首页',null,1,1,null,null,'@@@@@@@@',now());
		insert into tb_role_link(role,link,createUser,createTime)
		values('@@@','900bd976-2f33-47a0-b77a-ead31ef5f88e','@@@@@@@@',now());

		replace into tb_link(id,rank,lead,path,name,icon,sort,status,modifyUser,modifyTime,createUser,createTime)
		values('269fe37b-1943-4a1f-9582-f0e66fa521ad',3,'ade22e2b-ce5f-428d-88bb-38be8ce12cb8','view.html','发现',null,2,1,null,null,'@@@@@@@@',now());
		insert into tb_role_link(role,link,createUser,createTime)
		values('@@@','269fe37b-1943-4a1f-9582-f0e66fa521ad','@@@@@@@@',now());

		replace into tb_link(id,rank,lead,path,name,icon,sort,status,modifyUser,modifyTime,createUser,createTime)
		values('55f19368-0748-4d38-a011-030381266ba1',3,'ade22e2b-ce5f-428d-88bb-38be8ce12cb8','help.html','帮助',null,3,1,null,null,'@@@@@@@@',now());
		insert into tb_role_link(role,link,createUser,createTime)
		values('@@@','55f19368-0748-4d38-a011-030381266ba1','@@@@@@@@',now());

		replace into tb_link(id,rank,lead,path,name,icon,sort,status,modifyUser,modifyTime,createUser,createTime)
		values('63fc763f-e2e3-4bcc-9741-bc4d747c95d9',3,'ade22e2b-ce5f-428d-88bb-38be8ce12cb8','own.html','我的',null,4,1,null,null,'@@@@@@@@',now());
		insert into tb_role_link(role,link,createUser,createTime)
		values('@@@','63fc763f-e2e3-4bcc-9741-bc4d747c95d9','@@@@@@@@',now());

	replace into tb_link(id,rank,lead,path,name,icon,sort,status,modifyUser,modifyTime,createUser,createTime)
	values('d67ece5f-faac-4c06-b7df-bf18a5260ca7',2,'@@','you','对方空间导航',null,4,1,null,null,'@@@@@@@@',now());

		replace into tb_link(id,rank,lead,path,name,icon,sort,status,modifyUser,modifyTime,createUser,createTime)
		values('e7801b54-645e-436c-a3a6-d0582d7cd87c',3,'d67ece5f-faac-4c06-b7df-bf18a5260ca7','index.html','首页',null,1,1,null,null,'@@@@@@@@',now());
		insert into tb_role_link(role,link,createUser,createTime)
		values('@@@','e7801b54-645e-436c-a3a6-d0582d7cd87c','@@@@@@@@',now());

		replace into tb_link(id,rank,lead,path,name,icon,sort,status,modifyUser,modifyTime,createUser,createTime)
		values('4da291f2-1c0e-4e97-aa50-2bb76f88ec69',3,'d67ece5f-faac-4c06-b7df-bf18a5260ca7','view.html','发现',null,2,1,null,null,'@@@@@@@@',now());
		insert into tb_role_link(role,link,createUser,createTime)
		values('@@@','4da291f2-1c0e-4e97-aa50-2bb76f88ec69','@@@@@@@@',now());

		replace into tb_link(id,rank,lead,path,name,icon,sort,status,modifyUser,modifyTime,createUser,createTime)
		values('c518962b-8a7e-47f1-99eb-80d3cbdd7c3a',3,'d67ece5f-faac-4c06-b7df-bf18a5260ca7','help.html','帮助',null,3,1,null,null,'@@@@@@@@',now());
		insert into tb_role_link(role,link,createUser,createTime)
		values('@@@','c518962b-8a7e-47f1-99eb-80d3cbdd7c3a','@@@@@@@@',now());

		replace into tb_link(id,rank,lead,path,name,icon,sort,status,modifyUser,modifyTime,createUser,createTime)
		values('385ff69e-dc5a-4e3e-b216-7307b897a3b0',3,'d67ece5f-faac-4c06-b7df-bf18a5260ca7','own.html','我的',null,4,1,null,null,'@@@@@@@@',now());
		insert into tb_role_link(role,link,createUser,createTime)
		values('@@@','385ff69e-dc5a-4e3e-b216-7307b897a3b0','@@@@@@@@',now());

replace into tb_link(id,rank,lead,path,name,icon,sort,status,modifyUser,modifyTime,createUser,createTime)
values('543ed990-86a6-4f4e-8add-1484211786c1',1,'@','sys','管理平台',null,1,1,null,null,'@@@@@@@@',now());

	replace into tb_link(id,rank,lead,path,name,icon,sort,status,modifyUser,modifyTime,createUser,createTime)
	values('a9dc1ef2-9bec-4e79-bb54-17a2390b9560',2,'543ed990-86a6-4f4e-8add-1484211786c1',null,'开发辅助',null,1,1,null,null,'@@@@@@@@',now());

		replace into tb_link(id,rank,lead,path,name,icon,sort,status,modifyUser,modifyTime,createUser,createTime)
		values('5d9101cc-f571-4483-90e1-a87db4a45590',3,'a9dc1ef2-9bec-4e79-bb54-17a2390b9560','source.html','应用源代码',null,1,1,null,null,'@@@@@@@@',now());

		replace into tb_link(id,rank,lead,path,name,icon,sort,status,modifyUser,modifyTime,createUser,createTime)
		values('c119cb5b-0cd8-4566-8a54-9a0db392e828',3,'a9dc1ef2-9bec-4e79-bb54-17a2390b9560','script.html','预编译脚本',null,2,1,null,null,'@@@@@@@@',now());

		replace into tb_link(id,rank,lead,path,name,icon,sort,status,modifyUser,modifyTime,createUser,createTime)
		values('fcfa33b0-edd5-49e3-9190-32b45e36d4e2',3,'a9dc1ef2-9bec-4e79-bb54-17a2390b9560','create.html','代码生成器',null,3,1,null,null,'@@@@@@@@',now());

		replace into tb_link(id,rank,lead,path,name,icon,sort,status,modifyUser,modifyTime,createUser,createTime)
		values('ea612cbf-73d6-49c0-9499-b6132f66b69f',3,'a9dc1ef2-9bec-4e79-bb54-17a2390b9560','dbinfo.html','数据库信息',null,4,1,null,null,'@@@@@@@@',now());

		replace into tb_link(id,rank,lead,path,name,icon,sort,status,modifyUser,modifyTime,createUser,createTime)
		values('31fa34dc-8f49-4a54-8b7f-6dced749f4ca',3,'a9dc1ef2-9bec-4e79-bb54-17a2390b9560','console.html','H2控制台',null,5,1,null,null,'@@@@@@@@',now());

	replace into tb_link(id,rank,lead,path,name,icon,sort,status,modifyUser,modifyTime,createUser,createTime)
	values('b2538b3a-fe8a-440f-8869-7fe65eec4433',2,'543ed990-86a6-4f4e-8add-1484211786c1',null,'链接访问',null,2,1,null,null,'@@@@@@@@',now());

		replace into tb_link(id,rank,lead,path,name,icon,sort,status,modifyUser,modifyTime,createUser,createTime)
		values('5438214b-c524-4578-80b2-d53a1b550398',3,'b2538b3a-fe8a-440f-8869-7fe65eec4433','link/plate.html','板块管理',null,1,1,null,null,'@@@@@@@@',now());

		replace into tb_link(id,rank,lead,path,name,icon,sort,status,modifyUser,modifyTime,createUser,createTime)
		values('642de3f3-deb4-4915-bbd0-a4cdffaa7c5f',3,'b2538b3a-fe8a-440f-8869-7fe65eec4433','link/group.html','群组管理',null,2,1,null,null,'@@@@@@@@',now());

		replace into tb_link(id,rank,lead,path,name,icon,sort,status,modifyUser,modifyTime,createUser,createTime)
		values('7b47c6a9-a941-46e5-a232-edb45149f679',3,'b2538b3a-fe8a-440f-8869-7fe65eec4433','link/entry.html','条目管理',null,3,1,null,null,'@@@@@@@@',now());

		replace into tb_link(id,rank,lead,path,name,icon,sort,status,modifyUser,modifyTime,createUser,createTime)
		values('7dab76f8-dc29-49ff-a67b-d795e845f97a',3,'b2538b3a-fe8a-440f-8869-7fe65eec4433','link/action.html','功能管理',null,4,1,null,null,'@@@@@@@@',now());

	replace into tb_link(id,rank,lead,path,name,icon,sort,status,modifyUser,modifyTime,createUser,createTime)
	values('f3eb47e6-8cda-4472-8bb3-2649cf6d274e',2,'543ed990-86a6-4f4e-8add-1484211786c1',null,'用户授权',null,3,1,null,null,'@@@@@@@@',now());

		replace into tb_link(id,rank,lead,path,name,icon,sort,status,modifyUser,modifyTime,createUser,createTime)
		values('ce0b720b-e34b-43fb-bba1-fb4737bbf8aa',3,'f3eb47e6-8cda-4472-8bb3-2649cf6d274e','role.html','角色管理',null,1,1,null,null,'@@@@@@@@',now());

		replace into tb_link(id,rank,lead,path,name,icon,sort,status,modifyUser,modifyTime,createUser,createTime)
		values('3d20bb03-8d05-42a4-9830-15fa3d8c77d4',3,'f3eb47e6-8cda-4472-8bb3-2649cf6d274e','user.html','用户管理',null,2,1,null,null,'@@@@@@@@',now());

	replace into tb_link(id,rank,lead,path,name,icon,sort,status,modifyUser,modifyTime,createUser,createTime)
	values('28140180-129d-494c-a1a2-a2c5ea388c7d',2,'543ed990-86a6-4f4e-8add-1484211786c1',null,'示例模块',null,101,1,null,null,'@@@@@@@@',now());

		replace into tb_link(id,rank,lead,path,name,icon,sort,status,modifyUser,modifyTime,createUser,createTime)
		values('206921a4-fa2a-4d06-9810-029f989ac613',3,'28140180-129d-494c-a1a2-a2c5ea388c7d','demo.html','示例模块',null,1,1,null,null,'@@@@@@@@',now());
		insert into tb_role_link(role,link,createUser,createTime)
		values('@@@@','206921a4-fa2a-4d06-9810-029f989ac613','@@@@@@@@',now());

replace into tb_link(id,rank,lead,path,name,icon,sort,status,modifyUser,modifyTime,createUser,createTime)
values('c880eb93-d4fa-4d8d-bf42-1c9bd8e0b90b',1,'@','own','个人中心',null,2,1,null,null,'@@@@@@@@',now());

	replace into tb_link(id,rank,lead,path,name,icon,sort,status,modifyUser,modifyTime,createUser,createTime)
	values('9f1c5a04-38e1-4427-a2b1-bd20b5bd6046',2,'c880eb93-d4fa-4d8d-bf42-1c9bd8e0b90b',null,'资料',null,101,1,null,null,'@@@@@@@@',now());

		replace into tb_link(id,rank,lead,path,name,icon,sort,status,modifyUser,modifyTime,createUser,createTime)
		values('454e3e8a-8029-4dba-a0ef-d8d8bf072042',3,'9f1c5a04-38e1-4427-a2b1-bd20b5bd6046','data.html','资料',null,1,1,null,null,'@@@@@@@@',now());
		insert into tb_role_link(role,link,createUser,createTime)
		values('@@@','454e3e8a-8029-4dba-a0ef-d8d8bf072042','@@@@@@@@',now());

			replace into tb_link(id,rank,lead,path,name,icon,sort,status,modifyUser,modifyTime,createUser,createTime)
			values('5384fef5-ed86-449f-925c-55168e7b3cf6',4,'454e3e8a-8029-4dba-a0ef-d8d8bf072042','data.submit','资料提交',null,1,1,null,null,'@@@@@@@@',now());
			insert into tb_role_link(role,link,createUser,createTime)
			values('@@@','5384fef5-ed86-449f-925c-55168e7b3cf6','@@@@@@@@',now());

	replace into tb_link(id,rank,lead,path,name,icon,sort,status,modifyUser,modifyTime,createUser,createTime)
	values('5ebf0bd8-654d-41df-81b0-4f86f8848d38',2,'c880eb93-d4fa-4d8d-bf42-1c9bd8e0b90b',null,'皮肤',null,102,1,null,null,'@@@@@@@@',now());

		replace into tb_link(id,rank,lead,path,name,icon,sort,status,modifyUser,modifyTime,createUser,createTime)
		values('bdd86054-536c-4260-b285-96c3c9c0a69f',3,'5ebf0bd8-654d-41df-81b0-4f86f8848d38','skin.html','皮肤',null,1,1,null,null,'@@@@@@@@',now());
		insert into tb_role_link(role,link,createUser,createTime)
		values('@@@','bdd86054-536c-4260-b285-96c3c9c0a69f','@@@@@@@@',now());

			replace into tb_link(id,rank,lead,path,name,icon,sort,status,modifyUser,modifyTime,createUser,createTime)
			values('363c9476-2ab3-4be0-8c61-4e66731b5e03',4,'bdd86054-536c-4260-b285-96c3c9c0a69f','skin.json','皮肤存档',null,1,1,null,null,'@@@@@@@@',now());
			insert into tb_role_link(role,link,createUser,createTime)
			values('@@@','363c9476-2ab3-4be0-8c61-4e66731b5e03','@@@@@@@@',now());

	replace into tb_link(id,rank,lead,path,name,icon,sort,status,modifyUser,modifyTime,createUser,createTime)
	values('1103242d-18b3-4d7c-b18b-a767074d2f71',2,'c880eb93-d4fa-4d8d-bf42-1c9bd8e0b90b',null,'设置',null,103,1,null,null,'@@@@@@@@',now());

		replace into tb_link(id,rank,lead,path,name,icon,sort,status,modifyUser,modifyTime,createUser,createTime)
		values('48339d66-369a-4b7e-a05a-386448396f8d',3,'1103242d-18b3-4d7c-b18b-a767074d2f71','config.html','设置',null,1,1,null,null,'@@@@@@@@',now());
		insert into tb_role_link(role,link,createUser,createTime)
		values('@@@','48339d66-369a-4b7e-a05a-386448396f8d','@@@@@@@@',now());

			replace into tb_link(id,rank,lead,path,name,icon,sort,status,modifyUser,modifyTime,createUser,createTime)
			values('3529bb29-097b-4a1a-aa55-b28f154d508c',4,'48339d66-369a-4b7e-a05a-386448396f8d','config.json','设置存档',null,1,1,null,null,'@@@@@@@@',now());
			insert into tb_role_link(role,link,createUser,createTime)
			values('@@@','3529bb29-097b-4a1a-aa55-b28f154d508c','@@@@@@@@',now());

replace into tb_link(id,rank,lead,path,name,icon,sort,status,modifyUser,modifyTime,createUser,createTime)
values('c09cec59-80df-40a1-9557-91e73692453c',1,'@','you','对方空间',null,3,1,null,null,'@@@@@@@@',now());

	replace into tb_link(id,rank,lead,path,name,icon,sort,status,modifyUser,modifyTime,createUser,createTime)
	values('8012cbe2-8e76-4432-b204-afaeea1c9dcc',2,'c09cec59-80df-40a1-9557-91e73692453c',null,'动态',null,101,1,null,null,'@@@@@@@@',now());

		replace into tb_link(id,rank,lead,path,name,icon,sort,status,modifyUser,modifyTime,createUser,createTime)
		values('34c2bdac-c798-4677-947d-683841a51093',3,'8012cbe2-8e76-4432-b204-afaeea1c9dcc','live.html','动态',null,1,1,null,null,'@@@@@@@@',now());
		insert into tb_role_link(role,link,createUser,createTime)
		values('@@@','34c2bdac-c798-4677-947d-683841a51093','@@@@@@@@',now());

	replace into tb_link(id,rank,lead,path,name,icon,sort,status,modifyUser,modifyTime,createUser,createTime)
	values('722de613-0ea4-4c1d-8c85-4f77ead890ce',2,'c09cec59-80df-40a1-9557-91e73692453c',null,'资料',null,102,1,null,null,'@@@@@@@@',now());

		replace into tb_link(id,rank,lead,path,name,icon,sort,status,modifyUser,modifyTime,createUser,createTime)
		values('87fd0336-265f-4994-8c03-573752539fa7',3,'722de613-0ea4-4c1d-8c85-4f77ead890ce','data.html','资料',null,1,1,null,null,'@@@@@@@@',now());
		insert into tb_role_link(role,link,createUser,createTime)
		values('@@@','87fd0336-265f-4994-8c03-573752539fa7','@@@@@@@@',now());
