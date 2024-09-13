import { createRoute, z } from '@hono/zod-openapi'

export const storeMatchResultsRoute = createRoute({
  method: 'post',
  path: '/games/store-match-results',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z.object({
            player1Id: z.number(),
            player2Id: z.number(),
            goalsPlayer1: z.number(),
            goalsPlayer2: z.number(),
          }),
        },
      },
    },
    required: true,
    type: 'json',
    description: 'The match results to store',
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            player1Id: z.number(),
            player2Id: z.number(),
            goalsPlayer1: z.number(),
            goalsPlayer2: z.number(),
            gameId: z.number(),
          }),
        },
      },
      description: 'Store match results',
    },
  },
})

export const createGameRoute = createRoute({
  method: 'post',
  path: '/games',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z.object({
            player1Id: z.number(),
            player2Id: z.number(),
          }),
        },
      },
    },
    required: true,
    type: 'json',
    description: 'The game to create',
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            gameId: z.number(),
          }),
        },
      },
      description: 'Create a game',
    },
  },
})
