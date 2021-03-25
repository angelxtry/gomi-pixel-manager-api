export class ResourceCRUDService {
  /**
   * Creates an instance of ResourceCRUDService.
   * @param {object} app fastify app
   * @memberof ResourceCRUDService
   */
  constructor(app, subjectName, resourceVar) {
    if (!app.ready) throw new Error(`can't get .ready from fastify app.`);
    this.app = app;
    this.subjectName = subjectName;
    this.resourceVar = resourceVar;

    this.db = this.app.db;
    if (!this.db) throw new Error("cant get db from fastify app.");

    this.err = new Error();
    this[subjectName] = this.db[subjectName];
  }

  /**
   * function to get all
   *
   * @param { filter: object } { filter = {} }
   * @returns {Promise<{ id: number }>[]} array
   * @memberof ResourceCRUDService
   */
  async getAll({ filter = {} }) {
    const resources = await this[this.subjectName].findAll();

    return resources;
  }

  /**
   * function to get one
   *
   * @param { { id: number } } { id }
   * @returns {Promise<{id: number}>} object
   * @memberof ResourceCRUDService
   */
  async getOne({ id }) {
    this.__error(() => !id, 400, "id is needed");

    const resource = await this.__getResource(id);

    return resource;
  }

  /**
   * function to create one
   *
   * @param { {resourceData: object} } { resourceData }
   * @returns {Promise<number>} created id
   * @memberof ResourceCRUDService
   */
  async create({ resourceData }) {
    const Model = this[this.subjectName];
    this.__error(() => !resourceData, 400, `${this.resourceVar} is needed`);

    console.log("create service", Model);
    const createdResource = await Model.create(resourceData);
    console.log(createdResource);

    return createdResource;
  }

  /**
   * function to update one
   *
   * @param { { id: number, resourceData: object } } { id, resourceData = {} }
   * @returns {Promise<{ id: number }>} updated
   * @memberof ResourceCRUDService
   */
  async update({ id, resourceData = {} }) {
    const resourceBefore = await this.__getResource(id);

    const updatedResource = await resourceBefore.update(resourceData);

    return updatedResource;
  }

  /**
   * function to destroy one
   *
   * @param { { id: number } } { id }
   * @returns {Promise<object>} destroyed
   * @memberof ResourceCRUDService
   */
  async destroy({ id }) {
    const resourceBefore = await this.__getResource(id);

    return await resourceBefore.destroy();
  }

  /**********************
   * PRIVATE
   **********************/

  async __getResource(id) {
    const checkDataIsEmpty = (data) =>
      data instanceof Array ? data.length : data;
    const resourceData = await this[this.subjectName].findByPk(id);

    this.__error(
      () => !checkDataIsEmpty(resourceData),
      412,
      `can't get the ${this.resourceVar} ${id}`
    );

    return resourceData;
  }

  /**
   * Throw error to response error.
   *
   * @param {*} condition
   * @param {*} code
   * @param {*} msg
   */
  __error(condition, code, msg) {
    if (condition()) {
      this.err.statusCode = code;
      this.err.message = msg;
      throw this.err;
    }
  }
}
