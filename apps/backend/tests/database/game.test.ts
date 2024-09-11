import { describe, it, expect, beforeAll } from 'vitest';
import { createGame, getGameById, incrementPlayerGoals, decrementPlayerGoals, createPlayer } from '../../src/database';
import { clearAllTables } from './seed';
import { faker } from '@faker-js/faker';

describe('Game Database Operations', () => {
    beforeAll(async () => {
        await clearAllTables();
    });

    it('should create a new game with participants', async () => {
        const player1Name = faker.person.firstName();
        const player2Name = faker.person.firstName();
        // Create test players
        const player1 = await createPlayer(player1Name);
        const player2 = await createPlayer(player2Name);

        const newGame = await createGame([player1.id, player2.id]);

        expect(newGame).toBeDefined();
        expect(newGame.id).toBeDefined();
        expect(newGame.participants).toHaveLength(2);
        expect(newGame.participants[0].player.name).toBe(player2Name);
        expect(newGame.participants[1].player.name).toBe(player1Name);
        expect(newGame.participants[0].goals).toBe(0);
        expect(newGame.participants[1].goals).toBe(0);
    });

    it('should retrieve a game by ID with participants', async () => {
        const player1Name = faker.person.firstName();
        const player2Name = faker.person.firstName();
        const player1 = await createPlayer(player1Name);
        const player2 = await createPlayer(player2Name);

        const createdGame = await createGame([player1.id, player2.id]);
        const retrievedGame = await getGameById(createdGame.id);

        expect(retrievedGame).toBeDefined();
        expect(retrievedGame?.id).toBe(createdGame.id);
        expect(retrievedGame?.participants).toHaveLength(2);
        expect(retrievedGame?.participants[0].player.name).toBe(player2Name);
        expect(retrievedGame?.participants[1].player.name).toBe(player1Name);
    });

    it('should increment and decrement player goals', async () => {
        const player = await createPlayer('Goal Scorer');
        const game = await createGame([player.id]);

        // Increment goals
        await incrementPlayerGoals(game.id, player.id);
        let updatedGame = await getGameById(game.id);
        expect(updatedGame?.participants[0].goals).toBe(1);

        // Increment again
        await incrementPlayerGoals(game.id, player.id);
        updatedGame = await getGameById(game.id);
        expect(updatedGame?.participants[0].goals).toBe(2);

        // Decrement goals
        await decrementPlayerGoals(game.id, player.id);
        updatedGame = await getGameById(game.id);
        expect(updatedGame?.participants[0].goals).toBe(1);
    });

    it('should not allow decrementing goals below zero', async () => {
        const player = await createPlayer('Zero Goal Player');
        const game = await createGame([player.id]);

        // Attempt to decrement goals when it's already zero
        try {
            await decrementPlayerGoals(game.id, player.id);
            // If decrement succeeds, fail the test
            expect.fail('Should have thrown an error for negative goals');
        } catch (error) {
            expect(error).toBeDefined();
            expect(error instanceof Error).toBe(true);
            // The exact error message might depend on your implementation
            expect(String(error)).toContain('Cannot decrement goals below zero');
        }

        // Verify that goals are still zero
        const updatedGame = await getGameById(game.id);
        expect(updatedGame?.participants[0].goals).toBe(0);
    });
});
