import { createRoute, z } from '@hono/zod-openapi'

const getPlayerByIdSchema = z.object({
    id: z
        .string()
        .min(1)
        .openapi({
            param: {
                name: 'id',
                in: 'path',
            },
            example: '123',
        }),
})

const PlayerSchema = z.object({
    id: z.number().openapi({
        example: 123,
    }),
    name: z.string().openapi({
        example: 'John Doe',
    }),
}).openapi('Player')
const allPlayersSchema = z.array(PlayerSchema).openapi('Players')

const PlayerStatsSchema = z.object({
    gamesPlayed: z.number(),
    gamesWon: z.number(),
    gamesLost: z.number(),
    winRatio: z.number(),
    goalsFor: z.number(),
    goalsAgainst: z.number(),
    goalsDifference: z.number()
}).openapi('PlayerStats')

export const listPlayers = createRoute({
    method: 'get',
    path: '/players',
    responses: {
        200: {
            content: {
                'application/json': {
                    schema: allPlayersSchema,
                },
            },
            description: 'Retrieve the players',
        },
    },
})


export const getPlayerByIdRoute = createRoute({
    method: 'get',
    path: '/players/{id}',
    request: {
        params: getPlayerByIdSchema,
    },
    responses: {
        200: {
            content: {
                'application/json': {
                    schema: z.union([PlayerSchema, z.null()]),
                },
            },
            description: 'Retrieve the player by id',
        },
    },
})

export const createPlayerRoute = createRoute({
    method: 'post',
    path: '/players',
    request: {
        body: {
            content: {
                'application/json': {
                    schema: z.object({
                        name: z.string().min(1),
                    }),
                },
            },
            required: true,
            type: 'json',
            description: 'The player name to create',
        },
    },
    responses: {
        200: {
            content: {
                'application/json': {
                    schema: PlayerSchema,
                },
            },
            description: 'Create a new player',
        },
    },
})

export const getPlayerStatsRoute = createRoute({
    method: 'get',
    path: '/players/{id}/stats',
    request: {
        params: getPlayerByIdSchema,
    },
    responses: {
        200: {
            content: {
                'application/json': {
                    schema: PlayerStatsSchema,
                },
            },
            description: 'Retrieve the player stats',
        },
    },
})