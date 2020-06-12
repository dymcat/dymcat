
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
