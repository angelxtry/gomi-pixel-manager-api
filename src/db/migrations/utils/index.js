function each(fn, iter) {
  for (let i = 0; i < iter.length; i++) fn(iter[i], i, iter);
  return iter;
}
module.exports.each = each;

function map(fn, iter) {
  const res = [];
  for (let i = 0; i < iter.length; i++) res.push(fn(iter[i], i, iter));
  return res;
}
module.exports.map = map;

function filter(fn, iter) {
  const res = [];
  for (let i = 0; i < iter.length; i++) {
    if (fn(iter[i], i, iter)) res.push(iter[i]);
  }
  return res;
}
module.exports.filter = filter;

function now() {
  return new Date().toISOString().replace(/T/, " ").replace(/\..+/, "");
}
module.exports.now = now;

module.exports.fetchData = async function fetchData(sql, queryInterface) {
  const rawDataList = await queryInterface.sequelize.query(sql);
  return map((rawData) => {
    return { ...rawData }
  }, rawDataList[0]);
}

module.exports.findRecord = async function findRecord(q, tableName, id) {
  const [ dataList ] = await q.sequelize.query(`SELECT * FROM ${tableName} WHERE id = ${id} LIMIT 1;`);
  return dataList[0];
}

module.exports.createRecord = async function createRecord(q, tableName, data) {
  const dateTime = now();
  // const [ id, _count ] = await q.insert(null, tableName, {
  //   ...data,
  //   createdAt: dateTime,
  //   updatedAt: dateTime,
  // });
  const id = await q.bulkInsert(tableName, [{
    ...data,
    createdAt: dateTime,
    updatedAt: dateTime,
  }], {});

  const [ dataList ] = await q.sequelize.query(`SELECT * FROM ${tableName} WHERE id = ${id} LIMIT 1;`);
  return dataList[0];
}

module.exports.deleteRecord = async function deleteRecord(q, tableName, id, whereString) {
  if (!id) {
    const [ dataList ] = await q.sequelize.query(`SELECT * FROM ${tableName} ${whereString}`);
    const data = dataList[0];
    id = data.id;
  }

  return await q.bulkDelete(tableName, { id });
}
