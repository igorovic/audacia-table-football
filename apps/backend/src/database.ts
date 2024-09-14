import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Function to get all players
export async function getAllPlayers() {
    return await prisma.player.findMany();
}

// Function to get a player by ID
export async function getPlayerById(id: number) {
    return await prisma.player.findUnique({
        where: { id },
    });
}

// Function to create a new player
export async function createPlayer(name: string) {
    return await prisma.player.create({
        data: {
            name,
        },
    });
}

// Function to get all games
export async function getAllGames() {
    return await prisma.game.findMany({
        include: { participants: true },
    });
}

// Function to get a game by ID with participants
export async function getGameById(id: number) {
    return await prisma.game.findUnique({
        where: { id },
        include: { participants: { include: { player: true } } },
    });
}

// Function to get top scorers
export async function getTopScorers(limit: number = 5) {
    return await prisma.gameParticipant.groupBy({
        by: ['playerId'],
        _sum: {
            goals: true,
        },
        orderBy: {
            _sum: {
                goals: 'desc',
            },
        },
        take: limit,
    });
}

// Function to create a new game with participants
export async function createGame(playerIds: number[]) {
    return await prisma.game.create({
        data: {
            participants: {
                create: playerIds.map(playerId => ({
                    player: { connect: { id: playerId } },
                    goals: 0,
                })),
            },
        },
        include: { participants: { include: { player: true } } },
    });
}

// Function to get the current goals for a player in a game
export async function getPlayerGoals(gameId: number, playerId: number) {
    const gameParticipant = await prisma.gameParticipant.findUnique({
        where: {
            playerId_gameId: {
                playerId,
                gameId,
            },
        },
        select: {
            goals: true,
        },
    });

    if (!gameParticipant) {
        throw new Error("Player is not a participant in this game");
    }

    return gameParticipant.goals;
}


// Function to increment goals for a player in a game
export async function incrementPlayerGoals(gameId: number, playerId: number) {
    return await prisma.gameParticipant.update({
        where: {
            playerId_gameId: {
                playerId,
                gameId,
            },
        },
        data: {
            goals: {
                increment: 1,
            },
        },
    });
}

// Function to decrement goals for a player in a game
export async function decrementPlayerGoals(gameId: number, playerId: number) {
    const gameParticipant = await prisma.gameParticipant.findUnique({
        where: {
            playerId_gameId: {
                playerId,
                gameId,
            },
        },
    });
    if (gameParticipant?.goals === 0) {
        throw new Error("Cannot decrement goals below zero");
    }

    return await prisma.gameParticipant.update({
        where: {
            playerId_gameId: {
                playerId,
                gameId,
            },
        },
        data: {
            goals: {
                decrement: 1,
            },
        },
    });
}

// Function to set goals directly for a player in a game
export async function setPlayerGoals(gameId: number, playerId: number, goals: number) {
    let _goals = goals;
    if (_goals < 0) {
        _goals = 0;
    }

    return await prisma.gameParticipant.update({
        where: {
            playerId_gameId: {
                playerId,
                gameId,
            },
        },
        data: {
            goals: _goals,
        },
    });
}

// Function to get player's total goals and goals against
export async function getPlayerTotalGoals(playerId: number) {
    const playerGames = await prisma.gameParticipant.findMany({
        where: { playerId },
        include: {
            game: {
                include: {
                    participants: true
                }
            }
        }
    });

    let totalGoals = 0;
    let totalGoalsAgainst = 0;

    playerGames.forEach(game => {
        totalGoals += game.goals;
        game.game.participants.forEach(participant => {
            if (participant.playerId !== playerId) {
                totalGoalsAgainst += participant.goals;
            }
        });
    });

    return { totalGoals, totalGoalsAgainst };
}

// Don't forget to close the Prisma client when your app shuts down
process.on('beforeExit', () => {
    prisma.$disconnect();
});
