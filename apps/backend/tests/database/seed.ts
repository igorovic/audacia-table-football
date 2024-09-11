import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function clearAllTables() {
    await prisma.gameParticipant.deleteMany({});
    await prisma.player.deleteMany({});
    await prisma.game.deleteMany({});

    // Reset auto-increment counters
    await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name IN ('GameParticipant', 'Player', 'Game');`;
    await prisma.$executeRaw`VACUUM;`;
}

const players = [
    { name: 'Player 1' },
    { name: 'Player 2' },
    { name: 'Player 3' },
    { name: 'Player 4' },
];

export async function seedDatabase() {
    await clearAllTables();
    for await (const player of players) {
        await prisma.player.create({
            data: player,
        });
    }
}