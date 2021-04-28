import qs from 'qs';
import { QueryTypes } from "sequelize";
import { SEARCH_QUERY_BASE, findPixelCodeListByRawQuery } from "./queryObjects";
import buildConditionObject from "./buildConditionObject";


export default async function SDKRouter(app, options) {

  /**
   * 상품에 따른 픽셀 조회 - 일반조건
   *
   * { 구조 }
   * GET /api/sdk/pixelCode/findAll
   *
   * { 개념 }
   * 픽셀 코드 레코드를 획득하기 위한 조건을 Client side 에서 동적으로 구성 할 수 있습니다.
   * 스키마의 구조를 알고 있다면, 문법에 따라 자유롭게 질의할 수 있습니다.
   *
   * { 주의 }
   * 1.
   * 일반 조건 빌더는 일반적인 조건조회 상황을 대처할 수 있도록 미리 만들어 둔 라우터 입니다.
   * 다만, 스키마를 모르거나 HTTP QueryString DSL 에 익숙하지 않다면 러닝커브가 있을 수 있습니다.
   * 따라서 본 라우터인 '일반조건' 대신에 '특수조건' 으로 처리가 가능한 경우,
   * 이 라우터 아래에 바로 이어지는 '특수조건' 라우터의 사용을 권장합니다.
   *
   * 2.
   * 조건에 해당하는 픽셀이 경우에 따라 복수개를
   * 반환하는 예외적인 시나리오를 처리할 수 있어야 하기
   * 때문에, 이 요청의 응답은 배열이 됩니다.
   *
   * Client 작업 시 응답에 대하여 기대되는 오브젝트가 명확한 경우,
   * 구조분해 등을 활용하여 FE 기술로 처리할 것을 요청드립니다.
   *
   * ===
   * Example:
   *
   * 요청:
   *  GET /api/sdk/pixelCode/findAll?shopName=haravan&ProductPage[uniqueNumber]=92256
   *  qs(request.query)   // => { shopName: 'haravan', ProductPage: { uniqueNumber: '92256' } }
   *
   *  GET /api/sdk/pixelCode/findAll?id=1&Brand[name]=Gomi&ProductPage[uniqueNumber]=92256
   *  qs(request.query)   // => { id: '1', Brand: { name: 'Gomi' }, ProductPage: { uniqueNumber: '92256' } }
   *
   * 응답:
   *  [
   *    {
   *       "id": 1,
   *       "code": "40293783694",
   *       "Shop": {
   *           "id": 67,
   *           "name": "haravan"
   *       },
   *       "Brand": {
   *           "id": 1,
   *           "name": "Gomi",
   *           "platformApiId": null,
   *           "ProductPage": {
   *               "id": 1,
   *               "title": "Unbranded Plastic Chair",
   *               "uniqueNumber": 6569
   *           }
   *       }
   *     }
   *  ]
   */
  app.get('/pixelCode/findAll', async (request, reply) => {
    app.log.info("request.query", request.query);
    const query = qs.parse(request.query);
    console.log(query);
    const [ whereClause, whereQuery ] = buildConditionObject(query, 'PixelCode')

    return await findPixelCodeListByRawQuery(app, { whereClause, whereQuery });
  });


  /**
   * 상품에 따른 픽셀 조회 - 특수조건
   *
   * { 구조 }
   * GET /api/sdk/pixelCode/findByProductPage/:shopName/:uniqueNumber
   *
   * { 개념 }
   * 요청하는 SDK 가 현재 웹 페이지로부터
   *    - 상품페이지의 uniqueNumber
   *    - 브랜드의 shopName
   * 두 가지를 알면, 픽셀 코드 레코드를 획득할 수 있습니다.
   *
   * { 주의 }
   * 조건에 해당하는 픽셀이 경우에 따라 복수개를
   * 반환하는 예외적인 시나리오를 처리할 수 있어야 하기
   * 때문에, 이 요청의 응답은 배열이 됩니다.
   *
   * Client 작업 시 응답에 대하여 기대되는 오브젝트가 명확한 경우,
   * 구조분해 등을 활용하여 FE 기술로 처리할 것을 요청드립니다.
   *
   * ===
   * Example:
   *
   * 요청:
   *  GET /api/sdk/pixelCode/findByProductPage/haravan/92256
   *  request.params  // => { shopName: 'haravan', uniqueNumber: '92256' }
   *
   * 응답:
   *  [
   *    {
   *       "id": 1,
   *       "code": "40293783694",
   *       "Shop": {
   *           "id": 67,
   *           "name": "haravan"
   *       },
   *       "Brand": {
   *           "id": 1,
   *           "name": "Gomi",
   *           "platformApiId": null,
   *           "ProductPage": {
   *               "id": 1,
   *               "title": "Unbranded Plastic Chair",
   *               "uniqueNumber": 6569
   *           }
   *       }
   *     }
   *  ]
   */
  app.get('/pixelCode/findByProductPage/:shopName/:uniqueNumber', async (request, reply) => {
    app.log.info("request.query", request.query);
    console.log(request.params);
    const { shopName, uniqueNumber } = request.params;
    const { PixelCode } = app.db;

    const RAW_QUERY = `${SEARCH_QUERY_BASE} Shop.name = :shopName AND (ProductPage.uniqueNumber = :uniqueNumber)`
    return await app.db.sequelize.query(RAW_QUERY, {
      type: QueryTypes.SELECT,
      replacements: { shopName, uniqueNumber },
      model: PixelCode,
      mapToModel: true,
      nest: true,
      raw: true,
    })
  })
}
