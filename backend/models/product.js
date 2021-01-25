var { exec } = require('../config/database');

exports.insertProduct = function (data) {
  let qry = `
  insert into products (uid, title, description, fields, is_featured, price, tags, images, category, address, city, state, pincode, contact_no) values ('${data.uid}', '${data.title}', '${data.description}', '${data.fields}', '${data.is_featured}', '${data.price}', '${data.tags}', '${data.images}', '${data.category}', '${data.address}', '${data.city}', '${data.state}', '${data.pincode}', '${data.contact_no}');
  `;
  return exec(qry);
}


exports.get_own_products =  function (uid, sort, order, cat, start, limit) {
  let qry
  if(cat!=''){
    qry = `
    select * from  products where uid='${uid}' && is_active=1 && category ='${cat}' order by ${sort} ${order} limit ${start}, ${limit};
    `;
  } else {
    qry = `
    select * from  products where uid='${uid}' && is_active=1 order by ${sort} ${order} limit ${start}, ${limit};
    `;
  }
  return exec(qry);
}

exports.get_own_products_count =  function (uid, sort, order, cat) {
  let qry
  if(cat!=''){
    qry = `
    select * from  products where uid='${uid}' && is_active=1 && category ='${cat}' order by ${sort} ${order};
    `;
  } else {
    qry = `
    select * from  products where uid='${uid}' && is_active=1 order by ${sort} ${order};
    `;
  }
  return exec(qry);
}

exports.remove_products=  function (uid,pid) {
  let qry = `
  update products set is_active=0 where uid='${uid}' && id='${pid}' && is_active=true;
  `;
  return exec(qry);
}

exports.get_product =  function (pid) {
  let qry = `
  select * from  products where id='${pid}' && is_active=true order by id desc;
  `;
  return exec(qry);
}

exports.get_product_category=  function (cat) {
  let qry = `
  select * from  products where category='${cat}' && is_active=true order by id desc limit 0,4;
  `;
  return exec(qry);
}

exports.get_products =  function (sort, order, cat, start, limit) {
  if(cat!=''){
    qry = `
    select * from  products where  is_active=1 && category ='${cat}' order by ${sort} ${order} limit ${start}, ${limit};
    `;
  } else {
    qry = `
    select * from  products where is_active=1 order by ${sort} ${order} limit ${start}, ${limit};
    `;
  }
  return exec(qry);
}

  exports.get_products_count =  function (sort, order, cat) {
    if(cat!=''){
      qry = `
      select * from  products where  is_active=1 && category ='${cat}' order by ${sort} ${order};
      `;
    } else {
      qry = `
      select * from  products where is_active=1 order by ${sort} ${order} ;
      `;
    }
  return exec(qry);
}


exports.get_search_products =  function (sort, order, cat, start, limit, search, loc) {
  if(cat!=''){
    qry = `
    select * from  products where  is_active=1 && category ='${cat}' && ( 
      (title like '%${search}%' ||	description like '%${search}%') &&
      ( city like '%${loc}%'  || state like '%${loc}%' || address like '%${loc}%' || pincode like '%${loc}%' )
      ) order by ${sort} ${order} limit ${start}, ${limit};
    `;
  } else {
    qry = `
    select * from  products where is_active=1 && ( 
      (title like '%${search}%' ||	description like '%${search}%') &&
      ( city like '%${loc}%'  || state like '%${loc}%' || address like '%${loc}%' || pincode like '%${loc}%' )
      ) order by ${sort} ${order} limit ${start}, ${limit};
    `;
  }
  return exec(qry);
}

  exports.get_search_products_count =  function (sort, order, cat, search, loc) {
    if(cat!=''){
      qry = `
      select * from  products where  is_active=1 && category ='${cat}' && ( 
        (title like '%${search}%' ||	description like '%${search}%') &&
        ( city like '%${loc}%'  || state like '%${loc}%' || address like '%${loc}%' || pincode like '%${loc}%' )
        ) order by ${sort} ${order};
      `;
    } else {
      qry = `
      select * from  products where is_active=1 && ( 
        (title like '%${search}%' ||	description like '%${search}%') &&
        ( city like '%${loc}%'  || state like '%${loc}%' || address like '%${loc}%' || pincode like '%${loc}%' )
        ) order by ${sort} ${order} ;
      `;
    }
  return exec(qry);
}