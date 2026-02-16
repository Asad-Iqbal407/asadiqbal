import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Project from '@/models/Project';
import Certificate from '@/models/Certificate';
import bcrypt from 'bcryptjs';

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
    const projects = [
      {
        title: 'Video Downloader',
        description: 'Seamlessly save high-quality videos from YouTube & TikTok. Fast, free, and unlimited.',
        image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop',
        link: 'https://videodownloader-nu-six.vercel.app/',
        tags: ['React', 'Next.js', 'API'],
        featured: true,
      },
      {
        title: 'TG Accessories',
        description: 'Premium tech accessories for your digital life. Power solutions, cables, and more.',
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop',
        link: 'https://tgaccessories.vercel.app/',
        tags: ['E-commerce', 'React', 'Tailwind'],
        featured: true,
      },
      {
        title: 'Pixel Arcade',
        description: 'A curated collection of timeless games reimagined with modern performance.',
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop',
        link: 'https://gamestudio-woad.vercel.app/',
        tags: ['Gaming', 'React', 'Canvas'],
        featured: true,
      },
      {
        title: '3D Archery Duck Hunter',
        description: 'Master the bow and conquer the seasons in this immersive 3D archery game.',
        image: 'https://images.unsplash.com/photo-1514328826658-e4b7b2575791?w=800&h=600&fit=crop',
        link: 'https://duckshooting.vercel.app/',
        tags: ['3D', 'Three.js', 'Game'],
        featured: true,
      },
      {
        title: 'Tertulia Impulsiva',
        description: 'Specialized mobile phone repair services. Fast, reliable, and affordable repairs for all brands.',
        image: 'https://images.unsplash.com/photo-1596742578443-7682ef5251cd?w=800&h=600&fit=crop',
        link: 'https://imobilerepairing-tau.vercel.app/',
        tags: ['Service', 'Business', 'React'],
        featured: true,
      },
      {
        title: 'BombSquad',
        description: 'Strategic arcade game. Survive, destroy, and conquer in this explosive space adventure.',
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop',
        link: 'https://bombsquad-tau.vercel.app/',
        tags: ['Game', 'Action', 'React'],
        featured: true,
      }
    ];

    // Clear existing projects to avoid duplicates (optional, but good for seeding)
    await Project.deleteMany({});
    await Project.insertMany(projects);
    console.log('Projects seeded');

    // 3. Seed Certificates
    const certificates = [
      {
        title: 'BS Computer Science',
        issuer: 'University of Gujrat',
        date: new Date('2024-01-01'),
        description: 'Graduated with honors, specializing in AI and Data Science. Completed capstone project on Neural Networks.',
        type: 'education',
        link: 'https://uog.edu.pk/',
        image: ''
      },
      {
        title: 'React.js Certification',
        issuer: 'LinkedIn Learning',
        date: new Date('2024-01-01'),
        description: 'Advanced concepts including Hooks, Context API, and performance optimization for modern web apps.',
        type: 'certification',
        link: 'https://www.linkedin.com/learning/certificates/1a0836280fccd3487fca28edce2c52e949f9ef82b18196d88f849851b1f49b45?trk=share_certificate',
        image: ''
      },
      {
        title: 'Node.js Certification',
        issuer: 'LinkedIn Learning',
        date: new Date('2024-01-01'),
        description: 'Backend development mastery covering event-driven architecture, streams, and RESTful API design.',
        type: 'certification',
        link: 'https://www.linkedin.com/learning/certificates/ebfda41df6410f97ba15f155c1ffed28e257c0c96a4464c5e9df05871deb17e3?trk=share_certificate',
        image: ''
      },
      {
        title: 'PHP & MySQL Certification',
        issuer: 'LinkedIn Learning',
        date: new Date('2024-01-01'),
        description: 'Comprehensive guide to server-side scripting and database management for dynamic websites.',
        type: 'certification',
        link: 'https://www.linkedin.com/learning/certificates/6e4138cd0737cc95f6ce73d8ef23dba53c961800fa01c9db09713d5fb490b117?trk=share_certificate',
        image: ''
      },
      {
        title: 'Flask Certification',
        issuer: 'LinkedIn Learning',
        date: new Date('2024-01-01'),
        description: 'Building scalable web applications with Python using the Flask microframework.',
        type: 'certification',
        link: 'https://www.linkedin.com/learning/certificates/be3e2b2fbc3d16964905a846e9cade13a597934822560141bff571b96a2c13aa?trk=share_certificate',
        image: ''
      },
      {
        title: 'Machine Learning Certification',
        issuer: 'Great Learning',
        date: new Date('2023-01-01'),
        description: 'Intensive course covering supervised/unsupervised learning, neural networks, and deep learning architectures.',
        type: 'certification',
        link: 'https://www.mygreatlearning.com/certificate/FPMZDTXL',
        image: ''
      }
    ];

    await Certificate.deleteMany({});
    await Certificate.insertMany(certificates);
    console.log('Certificates seeded');

    return NextResponse.json({ message: 'Database seeded successfully' });
  } catch (error) {
    console.error('Seeding error:', error);
    return NextResponse.json({ error: 'Failed to seed database' }, { status: 500 });
  }
}

