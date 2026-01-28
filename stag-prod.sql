delete
from user_activity
where activity_type = 'level_up';

alter table user_activity
    drop column activity_type;

alter table user_activity
    drop column reference_type;

alter table user_activity
    rename reference_id to video_id;

create table subscription_tiers
(
    id                serial  not null
        constraint subscription_tiers_pk
            primary key,
    stripe_identifier varchar,
    name              varchar not null,
    price             integer not null
);

insert into subscription_tiers (name, price)
values ('free', 0),
       ('premium', 10);

alter table users
    add subscription_tier integer default 1 not null
        constraint users_subscription_tier_id_fk
            references subscription_tiers
            on update cascade on delete set default;

alter table videos
    add subscription_tier integer default 1 not null
        constraint videos_subscription_tier_id_fk
            references subscription_tiers
            on update cascade on delete set default;

alter table videos
    add series integer
        constraint videos_series_id_fk
            references series
            on update cascade on delete set null;

alter table users
    add stripe_cus_id varchar;

alter table users
    add stripe_sub_id varchar;

alter table users
    add payment_info varchar;