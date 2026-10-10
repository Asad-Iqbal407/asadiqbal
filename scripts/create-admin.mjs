// Creates the admin account, or resets its password if it already exists.
//
//   ADMIN_EMAIL=you@example.com ADMIN_PASSWORD='a long unique passphrase' \
//     node --env-file=.env.local scripts/create-admin.mjs
//
// Credentials come only from the environment, never from source code.
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const { MONGODB_URI, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

if (!MONGODB_URI || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error('MONGODB_URI, ADMIN_EMAIL and ADMIN_PASSWORD must all be set.');
  process.exit(1);
}

if (ADMIN_PASSWORD.length < 12) {
  console.error('ADMIN_PASSWORD must be at least 12 characters.');
  process.exit(1);
}

try {
  await mongoose.connect(MONGODB_URI, { dbName: 'asadiqbalprofile', serverSelectionTimeoutMS: 5000 });

  const users = mongoose.connection.db.collection('users');
  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);
  const now = new Date();

  const result = await users.updateOne(
    { email: ADMIN_EMAIL },
    {
      $set: { password: passwordHash, updatedAt: now },
      $setOnInsert: { email: ADMIN_EMAIL, createdAt: now },
    },
    { upsert: true }
  );

  console.log(result.upsertedCount ? 'Admin account created.' : 'Admin password updated.');
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
