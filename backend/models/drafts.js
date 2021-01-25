var { exec } = require('../config/database');

exports.start_draft = function (uid) {
  let qry = `
  insert into drafts (uid) values ('${uid}');
  `;
  return exec(qry);
}

exports.delete_old_draft = function (uid) {
  let qry = `
  delete from drafts where uid='${uid}';
  `;
  return exec(qry);
}


exports.getImages  = function (uid) {
  let qry = `
  select * from drafts where uid='${uid}';
  `;
  return exec(qry);
}

exports.addImage  = function (uid,arr) {
  let qry = `
  update drafts set images= '${JSON.stringify(arr)}' where uid='${uid}';
  `;
  return exec(qry);
}