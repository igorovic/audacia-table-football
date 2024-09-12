import { serve } from '@hono/node-server'
import { cors } from 'hono/cors'
import { OpenAPIHono } from '@hono/zod-openapi'
import { getPlayerByIdRoute, listPlayers } from './routes/player.route'
import { swaggerUI } from '@hono/swagger-ui'
import { getAllPlayers, getPlayerById } from './database'
import { initializeDatabase } from './initdb'
//  import { Hono } from 'hono'

// const app = new Hono()
const app = new OpenAPIHono()
const api = new OpenAPIHono()
app.use(cors())


api.openapi(listPlayers, async (c) => {
  const players = await getAllPlayers()
  return c.json(players)
})

api.openapi(getPlayerByIdRoute, async (c) => {
  const { id } = c.req.valid('param')
  const player = await getPlayerById(Number(id))
  return c.json(player)
})

// The OpenAPI documentation will be available at /openapi.json
api.doc('/openapi.json', {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'Table football API',
  },
})

app.route('/api', api)
app.get('/', swaggerUI({ url: '/api/openapi.json' }))

const port = 3022

initializeDatabase().finally(() => {
  serve({
    fetch: app.fetch,
    port
  })
  console.log(`Server is running on port ${port}`)
})


