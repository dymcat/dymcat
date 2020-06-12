
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
