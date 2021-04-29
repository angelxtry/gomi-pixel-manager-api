const productPageProperties = {
  id: { type: "number" },
  brandId: { type: "number" },
  Brand: {
    type: "object",
    properties: {
      id: { type: "number" },
      name: { type: "string" },
      PixelCodes: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "number" },
            code: { type: "string" },
            shopId: { type: "number" },
            brandId: { type: "number" },
          }
        }
      }
    },
  },
  title: { type: "string" },
  uniqueNumber: { type: "string", nullable: true },
  sourceUrl: { type: "string", nullable: true },
  createdAt: { type: "string" },
  updatedAt: { type: "string" },
};

const tags = ["productPage"];

const paramsJsonSchema = {
  type: "object",
  properties: {
    id: { type: "number" },
  },
  required: ["id"],
};

const queryStringJsonSchema = {
  type: "object",
  properties: {
    filter: { type: "string" },
  },
  required: [],
};

const bodyCreateJsonSchema = {
  type: "object",
  properties: productPageProperties,
  required: ["brandId", "title"],
};

const bodyUpdateJsonSchema = {
  type: "object",
  properties: productPageProperties,
};

export const getAllSchema = {
  tags,
  querystring: queryStringJsonSchema,
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: productPageProperties,
      },
    },
  },
};

export const getOneSchema = {
  tags,
  params: paramsJsonSchema,
  querystring: queryStringJsonSchema,
  response: {
    200: {
      type: "object",
      properties: productPageProperties,
    },
  },
};

export const createSchema = {
  tags,
  body: bodyCreateJsonSchema,
  response: {
    201: {
      type: "object",
      properties: productPageProperties,
    },
  },
};

export const updateSchema = {
  tags,
  params: paramsJsonSchema,
  body: bodyUpdateJsonSchema,
  response: {
    200: {
      type: "object",
      properties: productPageProperties,
    },
  },
};

export const destroySchema = {
  tags,
  params: paramsJsonSchema,
  response: {
    200: {
      type: "object",
      properties: productPageProperties,
    },
  },
};
