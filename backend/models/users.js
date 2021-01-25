var { exec } = require('../config/database');

exports.do_register = function (data) {
  let qry = `
  insert into users (name, phone, email, password, token, type) values ('${data.name}', '${data.phone}', '${data.email}', '${data.password}', '${data.token}','${data.type}');
  `;
  return exec(qry);
}


exports.check_register = function (data) {
  let qry = `
    select * from  users  where email = '${data.email}';
  `;
  return exec(qry);
}

exports.check_exitence = function (data) {
  let qry = `
    select * from  users  where email = '${data.userinfo}' or phone = '${data.userinfo}' ;
  `;
  return exec(qry);
}

exports.make_login =  function (data) {
  let qry = `
    select * from  users  where (email = '${data.userinfo}' and password = '${data.password}') or  (phone = '${data.userinfo}' and password = '${data.password}') ;
  `;
  console.log(qry)
  return exec(qry);
}


exports.update_token =  function (data) {
  let qry = `
    update  users  set token = '${data.token}' where id = '${data.uid}' ;
  `;
  
  return exec(qry);
}

exports.update_otp =  function (data) {
  let qry = `
    update  users  set otp = '${data.otp}' where id = '${data.uid}' ;
  `;
  
  return exec(qry);
}

exports.update_password_otp =  function (data) {
  let qry = `
    update  users  set password = '${data.password}' where email = '${data.userinfo}' and otp = '${data.otp}' ;
  `; 
  return exec(qry);
}

exports.userinfo = function(data) {
  let qry = `
    select * from  users  where token = '${data.token}' ;
  `; 
  return exec(qry);
}

exports.verify_old_password = function(data) {
  let qry = `
    select * from  users  where id = '${data.uid}' and password = '${data.opassword}' ;
  `; 
  return exec(qry);
}

exports.update_password = function(data) {
  let qry = `
    update users set password= '${data.password}'  where id = '${data.uid}' ;
  `; 
  return exec(qry);
}


exports.check_otp =  function(data) {
  let qry = `
    select * from  users  where email = '${data.userinfo}' and otp = '${data.otp}' ;
  `; 
  return exec(qry);
}


exports.update_profile = function(data) {
  let qry = `
    update users set name='${data.name}' , phone='${data.phone}', address='${data.address}', city='${data.city}', state='${data.state}', zipcode='${data.zipcode}', update_time='${Date()}'  where id = '${data.uid}' ;
  `; 
  return exec(qry);

}

exports.update_profile_pic   = function(data) {
  let qry = `
    update users set pic='${data.pic}'  where id = '${data.uid}' ;
  `; 
  return exec(qry);

}

exports.remove_profile = function(data) {
  let qry = `
    update users set is_active='0'  where id = '${data.uid}' ;
  `; 
  return exec(qry);

}