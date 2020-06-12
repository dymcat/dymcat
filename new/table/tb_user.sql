
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
