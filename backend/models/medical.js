var { exec } = require('../config/database');



exports.getinfo = function(data) {
  let qry = `
    select * from  doctors  where did = '${data.id}' ;
  `; 
  return exec(qry);
}


exports.update_medical = async function(data) {
  let qry1 = `
    delete from doctors where did = '${data.did}' ;
  `; 

  let qry = `
    insert into doctors set title='${data.title}' ,degree='${data.degree}', experience='${data.experience}', biography='${data.biography}', tags='${JSON.stringify(data.tags)}', appointments='${JSON.stringify(data.appointments)}', did = '${data.did}' ;
  `; 
  await exec(qry1);
  return exec(qry);
}
