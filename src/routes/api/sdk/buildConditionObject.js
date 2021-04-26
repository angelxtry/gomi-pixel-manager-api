
export default function buildConditionObject(queryObject, modelName, valueMap = {}, level = 0) {
  let lines = [];
  for (let [ key, val ] of Object.entries(queryObject)) {
    if (typeof val === 'object' && !(val instanceof Array)) {
      const [ clause, vMap ] = buildConditionObject(val, key, valueMap, level + 1)
      valueMap = vMap;
      lines.push(clause);
    } else {
      const searchKey = `${modelName}_${key}`;
      valueMap[searchKey] = val;
      lines.push(`${modelName}.${key} = :${searchKey}`);
    }
  }

  lines = lines.join("\r\n    AND ");

  return [
    level ? `(${lines})` : lines,
    valueMap
  ]
}
