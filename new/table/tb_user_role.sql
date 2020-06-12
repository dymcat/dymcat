
drop table if exists tb_user_role;
create table if not exists tb_user_role(
	user varchar(36) not null comment '用户'
	,role varchar(36) not null comment '角色'
	,createUser varchar(36) not null comment '创建者'
	,createTime datetime not null default now() comment '创建时间'
)comment='用户角色';
select * from tb_user_role;
