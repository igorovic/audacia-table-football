import { serve } from '@hono/node-server'
import { cors } from 'hono/cors'
import { OpenAPIHono } from '@hono/zod-openapi'
import {
  getPlayerByIdRoute,
  listPlayers,
  createPlayerRoute,
} from './routes/player.route'
import { swaggerUI } from '@hono/swagger-ui'
import {
  createGame,
  createPlayer,
  getAllPlayers,
  getPlayerById,
  setPlayerGoals,
} from './database'
import { storeMatchResultsRoute, createGameRoute } from './routes/game.route'

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

api.openapi(createPlayerRoute, async (c) => {
  const { name } = c.req.valid('json')
  const player = await createPlayer(name)
  return c.json(player)
})

api.openapi(storeMatchResultsRoute, async (c) => {
  const { player1Id, player2Id, goalsPlayer1, goalsPlayer2 } =
    c.req.valid('json')
  const game = await createGame([player1Id, player2Id])
  await setPlayerGoals(game.id, player1Id, goalsPlayer1)
  await setPlayerGoals(game.id, player2Id, goalsPlayer2)
  const result = {
    player1Id,
    player2Id,
    goalsPlayer1,
    goalsPlayer2,
    gameId: game.id,
  }
  return c.json(result)
})

api.openapi(createGameRoute, async (c) => {
  const { player1Id, player2Id } = c.req.valid('json')
  const game = await createGame([player1Id, player2Id])
  return c.json({ gameId: game.id })
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
console.log(`Server is running on port ${port}`)
console.log(`Database file: ${process.env.DATABASE_URL}`)

serve({
  fetch: app.fetch,
  port,
})
