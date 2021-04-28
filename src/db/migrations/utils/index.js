function map(fn, iter) {
  const res = [];
  for (let i = 0; i < iter.length; i++) res.push(fn(iter[i], i, iter));
  return res;
}
module.exports.map = map;

module.exports.now = function now() {
  return new Date().toISOString().replace(/T/, " ").replace(/\..+/, "");
}

module.exports.fetchData = async function fetchData(sql, queryInterface) {
  const rawDataList = await queryInterface.sequelize.query(sql);
  return map((rawData) => { return { ...rawData } }, rawDataList[0]);
}
