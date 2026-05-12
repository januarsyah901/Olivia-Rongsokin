import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const categories = [
  { name: 'Kardus', iconUrl: '📦' },
  { name: 'Plastik', iconUrl: '♻️' },
  { name: 'Besi/Logam', iconUrl: '🏗️' },
  { name: 'Kertas', iconUrl: '📄' },
  { name: 'Botol Kaca', iconUrl: '🍾' },
  { name: 'Elektronik', iconUrl: '💻' },
];

async function main() {
  console.log('Seeding waste categories...');
  for (const cat of categories) {
    await prisma.wasteCategory.upsert({
      where: { name: cat.name },
      update: {},
      create: cat,
    });
  }
  console.log('Seed completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
