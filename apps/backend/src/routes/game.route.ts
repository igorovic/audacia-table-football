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

export const incrementGameGoalsRoute = createRoute({
  method: 'put',
  path: '/games/{gameId}/increment-goals',
  request: {
    params: z.object({
      gameId: z.number(),
    }),
    body: {
      content: {
        'application/json': {
          schema: z.object({
            playerId: z.number(),
          }),
        },
      },
    },
    required: true,
    type: 'json',
    description: 'Increment the goals of a player in a game',
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            gameId: z.number(),
            playerId: z.number(),
            goals: z.number(),
          }),
        },
      },
      description: 'Increment the goals of a player in a game',
    },
  },
})

export const decrementGameGoalsRoute = createRoute({
  method: 'put',
  path: '/games/{gameId}/decrement-goals',
  request: {
    params: z.object({
      gameId: z.number(),
    }),
    body: {
      content: {
        'application/json': {
          schema: z.object({
            playerId: z.number(),
          }),
        },
      },
    },
    required: true,
    type: 'json',
    description: 'Decrement the goals of a player in a game',
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            gameId: z.number(),
            playerId: z.number(),
            goals: z.number(),
          }),
        },
      },
      description: 'Decrement the goals of a player in a game',
    },
  },
})

export const setGameGoalsRoute = createRoute({
  method: 'put',
  path: '/games/{gameId}/set-goals',
  request: {
    params: z.object({
      gameId: z.number(),
    }),
    body: {
      content: {
        'application/json': {
          schema: z.object({
            playerId: z.number(),
            goals: z.number(),
          }),
        },
      },
    },
    required: true,
    type: 'json',
    description: 'Set the goals of a player in a game',
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            gameId: z.number(),
            playerId: z.number(),
            goals: z.number(),
          }),
        },
      },
      description: 'Set the goals of a player in a game',
    },
  },
})
