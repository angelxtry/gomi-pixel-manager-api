const productPageProperties = {
  id: { type: "number" },
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
  required: ["title"],
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

export const deleteSchema = {
  tags,
  params: paramsJsonSchema,
  response: {
    200: {
      type: "object",
      properties: productPageProperties,
    },
  },
};
