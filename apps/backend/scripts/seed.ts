import { seedDatabase } from '../tests/database/seed';

seedDatabase().then(() => {
    console.log('Database seeded');
}).catch((error) => {
    console.error('Error seeding database:', error);
});