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