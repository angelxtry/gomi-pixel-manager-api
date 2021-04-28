import { QueryTypes } from "sequelize";

export const SEARCH_QUERY_BASE = `
SELECT
  PixelCode.id                  AS \`id\`
  , PixelCode.code              AS \`code\`
  
  , Shop.id                     AS \`Shop.id\`
  , Shop.name                   AS \`Shop.name\`

  , Brand.id                    AS \`Brand.id\`
  , Brand.name                  AS \`Brand.name\`
  , Brand.platformApiId         AS \`Brand.platformApiId\`

  , ProductPage.id              AS \`Brand.ProductPage.id\`
  , ProductPage.title           AS \`Brand.ProductPage.title\`
  , ProductPage.uniqueNumber    AS \`Brand.ProductPage.uniqueNumber\`
FROM PixelCodes AS PixelCode
INNER JOIN Brands AS Brand ON Brand.id = PixelCode.BrandId
INNER JOIN Shops AS Shop ON Shop.id = PixelCode.shopId
INNER JOIN ProductPages AS ProductPage ON ProductPage.BrandId = Brand.id
WHERE
`;

export function findPixelCodeListByRawQuery(app, { whereClause, whereQuery }) {
  const { sequelize, PixelCode } = app.db;

  return sequelize.query(`${SEARCH_QUERY_BASE} ${whereClause}`, {
    type: QueryTypes.SELECT,
    replacements: whereQuery,
    model: PixelCode,
    mapToModel: true,
    nest: true,
    raw: true,
  });
}
