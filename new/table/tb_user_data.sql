
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
