
drop table if exists tb_demo;
create table if not exists tb_demo(
	id int comment 'ID' primary key auto_increment
	,name char(32) not null comment '名称'
	,sex varchar(255) not null default '男' comment '性别'
	,age int comment '年龄'
	,birth date not null comment '生日'
	,nation varchar(255) not null default '汉族' comment '民族'
	,createTime datetime not null default now() comment '创建时间'
)comment='示例';
create index demo_name on tb_demo(name);
select * from tb_demo;

drop table if exists tb_link;
create table if not exists tb_link(
	id varchar(36) default uuid() comment 'ID' primary key
	,rank tinyint unsigned not null default 1 comment '阶层'
	,lead varchar(36) not null comment '领导'
	,path varchar(255) comment '路径'
	,name char(32) not null comment '名称'
	,icon varchar(255) comment '图标'
	,sort int not null default 0 comment '排序'
	,status tinyint unsigned not null default 1 comment '状态'
	,modifyUser varchar(36) comment '修改者'
	,modifyTime datetime comment '修改时间'
	,createUser varchar(36) not null comment '创建者'
	,createTime datetime not null default now() comment '创建时间'
)comment='链接';
create index link_name on tb_link(name);
select * from tb_link;

drop table if exists tb_role;
create table if not exists tb_role(
	id varchar(36) default uuid() comment 'ID' primary key
	,name char(32) not null comment '名称'
	,status tinyint unsigned not null default 1 comment '状态'
	,modifyUser varchar(36) comment '修改者'
	,modifyTime datetime comment '修改时间'
	,createUser varchar(36) not null comment '创建者'
	,createTime datetime not null default now() comment '创建时间'
)comment='角色';
create index role_name on tb_role(name);
select * from tb_role;

drop table if exists tb_role_link;
create table if not exists tb_role_link(
	role varchar(36) not null comment '角色'
	,link varchar(36) not null comment '链接'
	,createUser varchar(36) not null comment '创建者'
	,createTime datetime not null default now() comment '创建时间'
)comment='角色链接';
select * from tb_role_link;

drop table if exists tb_user;
create table if not exists tb_user(
	id varchar(36) default uuid() comment 'ID' primary key
	,login char(32) comment '登录名' unique
	,email char(32) comment '邮箱' unique
	,phone char(32) comment '手机号' unique
	,idCard char(32) comment '身份证' unique
	,password varchar(255) not null comment '密码'
	,loginTime datetime comment '登录时间'
	,loginCount int default 0 comment '登录次数'
	,name char(32) comment '姓名'
	,sex tinyint unsigned comment '性别'
	,birth date comment '生日'
	,nick char(32) comment '昵称'
	,info text comment '简介'
	,photo varchar(255) comment '形象照'
	,scene varchar(255) comment '背景图'
	,skin varchar(255) comment '皮肤'
	,status tinyint unsigned not null default 1 comment '状态'
	,modifyUser varchar(36) comment '修改者'
	,modifyTime datetime comment '修改时间'
	,createUser varchar(36) not null comment '创建者'
	,createTime datetime not null default now() comment '创建时间'
)comment='用户';
create index user_login on tb_user(login);
create index user_email on tb_user(email);
create index user_phone on tb_user(phone);
create index user_idCard on tb_user(idCard);
create index user_name on tb_user(name);
create index user_nick on tb_user(nick);
select * from tb_user;

drop table if exists tb_user_data;
create table if not exists tb_user_data(
	saveTime datetime not null default now() comment '保存时间'
	,user varchar(36) not null comment '用户' unique
	,nation tinyint unsigned comment '民族'
	,blood tinyint unsigned comment '血型'
	,zodiac tinyint unsigned comment '生肖'
	,constellation tinyint unsigned comment '星座'
	,character tinyint unsigned comment '性格'
	,marital tinyint unsigned comment '婚况'
	,height int comment '身高'
	,weight int comment '体重'
	,habit varchar(255) comment '习惯'
	,hobby varchar(255) comment '爱好'
	,pet tinyint unsigned comment '宠物'
	,city char(32) comment '城市'
	,school char(32) comment '学校'
	,education tinyint unsigned comment '学历'
	,company char(32) comment '公司'
	,vocation char(32) comment '职业'
	,income int comment '收入'
	,house tinyint unsigned comment '房产'
	,car tinyint unsigned comment '汽车'
	,address varchar(255) comment '地址'
	,position varchar(255) comment '位置'
	,postal char(32) comment '邮编'
	,weibo char(32) comment '微博'
	,wechat char(32) comment '微信'
	,qq char(32) comment 'QQ'
	,msn char(32) comment 'MSN'
)comment='用户资料';
create index user_data_city on tb_user_data(city);
create index user_data_school on tb_user_data(school);
create index user_data_company on tb_user_data(company);
create index user_data_vocation on tb_user_data(vocation);
create index user_data_postal on tb_user_data(postal);
create index user_data_weibo on tb_user_data(weibo);
create index user_data_wechat on tb_user_data(wechat);
create index user_data_qq on tb_user_data(qq);
create index user_data_msn on tb_user_data(msn);
select * from tb_user_data;

drop table if exists tb_user_role;
create table if not exists tb_user_role(
	user varchar(36) not null comment '用户'
	,role varchar(36) not null comment '角色'
	,createUser varchar(36) not null comment '创建者'
	,createTime datetime not null default now() comment '创建时间'
)comment='用户角色';
select * from tb_user_role;
