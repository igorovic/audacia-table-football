import { describe, it, expect, beforeEach } from 'vitest';
import { createPlayer, getAllPlayers, getPlayerById } from '../../src/database';
import { clearAllTables } from './seed';

describe('Player Database Operations', () => {
    beforeEach(async () => {
        await clearAllTables();
    });

    it('should create a new player', async () => {
        const playerName = 'Test Player';
        const newPlayer = await createPlayer(playerName);

        expect(newPlayer).toBeDefined();
        expect(newPlayer.id).toBeDefined();
        expect(newPlayer.name).toBe(playerName);

        // Verify that the player was actually created in the database
        const retrievedPlayer = await getPlayerById(newPlayer.id);
        expect(retrievedPlayer).toBeDefined();
        expect(retrievedPlayer?.id).toBe(newPlayer.id);
        expect(retrievedPlayer?.name).toBe(playerName);
    });

    it('should not allow creating a player with a duplicate name', async () => {
        const playerName = 'Unique Player';

        // Create the first player
        const firstPlayer = await createPlayer(playerName);
        expect(firstPlayer).toBeDefined();
        expect(firstPlayer.name).toBe(playerName);

        // Attempt to create a second player with the same name
        try {
            await createPlayer(playerName);
            // If the creation succeeds, fail the test
            expect.fail('Should have thrown an error for duplicate player name');
        } catch (error) {
            // Expect an error to be thrown
            expect(error).toBeDefined();
            expect(error instanceof Error).toBe(true);
            expect(String(error)).toContain('Unique constraint failed on the fields: (`name`)');
        }

        // Verify that only one player with this name exists in the database
        const allPlayers = await getAllPlayers();
        const playersWithName = allPlayers.filter(player => player.name === playerName);
        expect(playersWithName.length).toBe(1);
    });
});
