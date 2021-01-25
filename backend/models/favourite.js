var { exec } = require('../config/database');

exports.addProduct = function ({ uid, pid }) {
    let qry = `
  insert into favourites (uid, pid) values ('${uid}', '${pid}') ;`;
    return exec(qry);
}


exports.removeProduct = function ({ uid, pid }) {
    let qry = `
     delete from favourites where uid='${uid}' and pid='${pid}'
    `;
    return exec(qry);
}

exports.getProduct = function ({ uid, pid }, sort, order, cat) {
    let qry = `
    select * from favourites where uid='${uid}' and pid='${pid}'`;
    return exec(qry);
}

exports.listProduct = function ({ uid }, sort, order, cat, start, limit) {
   let qry
    if (cat != '') {
        qry = `
        select * from favourites left join products on favourites.pid = products.id where products.uid='${uid}' && products.category ='${cat}' order by products.${sort} ${order} limit ${start}, ${limit}
        
        `;
    } else {
        qry = `
        select * from favourites left join products on favourites.pid = products.id where products.uid='${uid}' order by products.${sort} ${order}  limit ${start}, ${limit}
        `;
    }
    console.log(qry)
 
    return exec(qry);
}

exports.listProduct_count = function ({ uid }, sort, order, cat) {
    let qry
     if (cat != '') {
         qry = `
         select * from favourites left join products on favourites.pid = products.id where products.uid='${uid}' && products.category ='${cat}' order by products.${sort} ${order}
         `;
     } else {
         qry = `
         select * from favourites left join products on favourites.pid = products.id where products.uid='${uid}' order by products.${sort} ${order}
         `;
     }
     console.log(qry)
  
     return exec(qry);
 }
 

