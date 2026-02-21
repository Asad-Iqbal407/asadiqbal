const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;
const dbName = 'asadiqbalprofile';

if (!uri) {
  console.error('MONGODB_URI missing');
  process.exit(1);
}

const newProjects = [
  {
    title: 'Crypto Market Prediction',
    description: 'ML-powered crypto insights with trend visualization and predictive analytics.',
    image: 'https://images.unsplash.com/photo-1518544887879-1fe89f9d4d43?w=800&h=600&fit=crop',
    link: 'https://cryptomarketprediction-wz63.vercel.app/',
    tags: ['FinTech', 'Machine Learning', 'Charts'],
    featured: true
  },
  {
    title: 'LMS Platform',
    description: 'Modern learning management system with courses, progress tracking, and admin controls.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
    link: 'https://lms-jet-theta.vercel.app/',
    tags: ['Education', 'Next.js', 'Dashboard'],
    featured: true
  },
  {
    title: 'Stock Market Prediction',
    description: 'Data-driven stock forecasting with market signals and performance insights.',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop',
    link: 'https://stockmarketprediction-phi.vercel.app/',
    tags: ['Finance', 'Analytics', 'ML'],
    featured: true
  }
];

mongoose
  .connect(uri, { dbName, serverSelectionTimeoutMS: 5000 })
  .then(async () => {
    const col = mongoose.connection.db.collection('projects');
    const ops = newProjects.map((project) => ({
      updateOne: {
        filter: { link: project.link },
        update: { $setOnInsert: project },
        upsert: true
      }
    }));

    const result = await col.bulkWrite(ops);
    const total = await col.countDocuments();

    console.log(JSON.stringify({ inserted: result.upsertedCount, total }, null, 2));

    await mongoose.disconnect();
    process.exit(0);
  })
  .catch((error) => {
    console.error(error && error.message ? error.message : error);
    process.exit(1);
  });
