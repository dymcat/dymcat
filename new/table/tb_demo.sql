
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
