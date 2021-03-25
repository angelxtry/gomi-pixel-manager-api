const pixelCodeProperties = {
  id: { type: "number" },
  brandId: { type: "number" },
  Brand: {
    type: "object",
    properties: {
      id: { type: "number" },
      name: { type: "string" },
    },
  },
  code: { type: "string" },
  shopName: { type: "string", nullable: true },
  createdAt: { type: "string" },
  updatedAt: { type: "string" },
};

const tags = ["pixelCode"];

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
  properties: pixelCodeProperties,
  required: ["brandId", "code"],
};

const bodyUpdateJsonSchema = {
  type: "object",
  properties: pixelCodeProperties,
};

export const getAllSchema = {
  tags,
  querystring: queryStringJsonSchema,
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: pixelCodeProperties,
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
      properties: pixelCodeProperties,
    },
  },
};

export const createSchema = {
  tags,
  body: bodyCreateJsonSchema,
  response: {
    201: {
      type: "object",
      properties: pixelCodeProperties,
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
      properties: pixelCodeProperties,
    },
  },
};

export const deleteSchema = {
  tags,
  params: paramsJsonSchema,
  response: {
    200: {
      type: "object",
      properties: pixelCodeProperties,
    },
  },
};
