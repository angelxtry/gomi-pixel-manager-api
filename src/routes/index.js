import fastifyRoutes from 'fastify-routes'
import oas from 'fastify-swagger'
import docs from './docs'

// Draw Routes
export default async function routes(app, options) {
  app.register(fastifyRoutes)
  app.register(oas, docs)

  app.get('/', async (request, reply) => {
    console.log(app.printRoutes())
    return { hello: 'world5' }
  })

  await app.register(require('./api'), { prefix: 'api' })
}
