
drop table if exists tb_role_link;
create table if not exists tb_role_link(
	role varchar(36) not null comment '角色'
	,link varchar(36) not null comment '链接'
	,createUser varchar(36) not null comment '创建者'
	,createTime datetime not null default now() comment '创建时间'
)comment='角色链接';
select * from tb_role_link;
