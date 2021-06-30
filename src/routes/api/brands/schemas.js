const brandProperties = {
  id: { type: "number" },
  name: { type: "string" },
  platformApiId: { type: "number", nullable: true },
  createdAt: { type: "string" },
  updatedAt: { type: "string" },
  PixelCodes: {
    type: "array",
    items: {
      type: "object",
      properties: {
        id: { type: "number" },
        code: { type: "string" },
        name: { type: "string" },
        shopId: { type: "number" },
        brandId: { type: "number" },
      },
    },
  },
};

const tags = ["brand"];

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
  properties: brandProperties,
  required: ["name"],
};

const bodyUpdateJsonSchema = {
  type: "object",
  properties: brandProperties,
};

export const getAllSchema = {
  tags,
  querystring: queryStringJsonSchema,
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: brandProperties,
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
      properties: brandProperties,
    },
  },
};

export const createSchema = {
  tags,
  body: bodyCreateJsonSchema,
  response: {
    201: {
      type: "object",
      properties: brandProperties,
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
      properties: brandProperties,
    },
  },
};

export const destroySchema = {
  tags,
  params: paramsJsonSchema,
  response: {
    200: {
      type: "object",
      properties: brandProperties,
    },
  },
};
