import { AppDataSource } from './dataSource';
import { SportEvent } from './entities';

const sampleEvents = [
  {
    eventName: 'Soccer: Manchester United vs Liverpool',
    odds: 2.5,
  },
  {
    eventName: 'Basketball: Lakers vs Celtics',
    odds: 1.75,
  },
  {
    eventName: 'Tennis: Djokovic vs Nadal',
    odds: 1.95,
  },
  {
    eventName: 'Boxing: Fury vs Joshua',
    odds: 1.5,
  },
  {
    eventName: 'Formula 1: Monaco Grand Prix',
    odds: 3.25,
  },
];

async function seed() {
  try {
    await AppDataSource.initialize();
    console.log('Database connection established');

    const sportEventRepository = AppDataSource.getRepository(SportEvent);

    await sportEventRepository.clear();

    for (const event of sampleEvents) {
      const sportEvent = sportEventRepository.create(event);
      await sportEventRepository.save(sportEvent);
    }

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();