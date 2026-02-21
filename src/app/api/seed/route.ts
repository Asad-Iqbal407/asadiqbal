import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Project from '@/models/Project';
import Certificate from '@/models/Certificate';
import bcrypt from 'bcryptjs';
import { projectCatalog } from '@/data/projects';
import { certificateCatalog } from '@/data/certificates';

export async function GET() {
  try {
    await dbConnect();

    // 1. Create Admin User
    const email = 'measad408@gmail.com';
    const password = 'Iqbal2002';
    
    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user = await User.create({
        email,
        password: hashedPassword,
      });
      console.log('Admin user created');
    } else {
      console.log('Admin user already exists');
    }

    // 2. Seed Projects
    const projects = projectCatalog.map(({ id, ...project }) => project);

    // Clear existing projects to avoid duplicates (optional, but good for seeding)
    await Project.deleteMany({});
    await Project.insertMany(projects);
    console.log('Projects seeded');

    // 3. Seed Certificates
    const certificates = certificateCatalog.map((certificate) => ({
      ...certificate,
      date: new Date(certificate.date),
      image: ''
    }));

    await Certificate.deleteMany({});
    await Certificate.insertMany(certificates);
    console.log('Certificates seeded');

    return NextResponse.json({ message: 'Database seeded successfully' });
  } catch (error) {
    console.error('Seeding error:', error);
    return NextResponse.json({ error: 'Failed to seed database' }, { status: 500 });
  }
}

