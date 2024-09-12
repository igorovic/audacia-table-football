import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';

const execAsync = promisify(exec);

export async function initializeDatabase() {
    try {
        const databaseUrl = process.env.DATABASE_URL;
        if (!databaseUrl) {
            throw new Error('DATABASE_URL environment variable is not set');
        }

        // Extract the file path from the DATABASE_URL
        const filePath = databaseUrl.replace(/^file:/, '');

        // Check if the database file already exists
        if (fs.existsSync(filePath)) {
            console.log('Database file already exists. Skipping initialization.');
            return;
        }

        console.log('Initializing database...');
        const { stdout, stderr } = await execAsync('npx prisma db push');
        if (stderr) {
            console.error('Error output:', stderr);
        }
        console.log('Prisma push output:', stdout);
        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
        throw error;
    }
}