

drop type arr_class;
drop type class_type;
drop type arr_users;
drop type user_type;

create table TBL_CLASS (num_class number, desc_class varchar(100));
/
alter table TBL_CLASS add primary key(num_class);
/
create table TBL_USER(user_name varchar2(100), height number, b_date date, num_class number);
/
alter table TBL_USER add constraint FK_CLASS foreign key(num_class) references tbl_class(num_class);
/
create or replace type user_type as object (user_name varchar2(100), height number, birth_date date);
/
create or replace type arr_users as table of user_type;
/
create or replace type class_type as object (num_class number, desc_class varchar2(100), users arr_users);
/
create or replace type arr_class as table of class_type;
/

create or replace package PAC_BEAN is
  type ref_cur is ref cursor;
  
  procedure pro_insert_user(usu in user_type);
    
  procedure pro_select_user(usu in user_type, user_return in out arr_users);
  
  procedure pro_select_class(clas in class_type, class_return in out arr_class);
end PAC_BEAN;
/
create or replace package body PAC_BEAN is
    procedure pro_insert_user(usu in user_type) is
      begin
        insert into tbl_user (user_name, height, b_date)
        values (usu.user_name, usu.height, usu.birth_date);
        
        commit;
        exception
          when others then
            rollback;
    end pro_insert_user;
    
    procedure pro_select_user(usu in user_type, user_return in out arr_users)is
      user_ref_cur ref_cur;
      
      users arr_users := arr_users();
      
      begin
        open user_ref_cur for
          select cast(
                   multiset(
                     select user_name,
                            height,
                            b_date
                     from tbl_user
                     where user_name like '%'||usu.user_name||'%'
                   ) as arr_users
                ) arr
          from dual;
          
        fetch user_ref_cur into users;
        
        user_return := users;
    end pro_select_user;
    
    procedure pro_select_class(clas in class_type, class_return in out arr_class)is
      class_ref_cur ref_cur;
      
      classes arr_class := arr_class();
      
      begin
        open class_ref_cur for
          select cast(
                    multiset(
                      select num_class,
                             desc_class,
                             (select cast(
                                      multiset(
                                        select user_name,
                                               height,
                                               b_date
                                        from tbl_user 
                                        where tbl_user.num_class = tbl_class.num_class
                                      ) as arr_users)
                              from dual) users
                      from tbl_class
                      where num_class = clas.num_class) as arr_class
          ) classes
        from dual;
        
        fetch class_ref_cur into classes;
        
        class_return := classes;
    end pro_select_class;
end PAC_BEAN;
/ 