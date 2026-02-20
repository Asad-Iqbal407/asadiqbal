import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import Certificate from '@/models/Certificate';

export async function GET() {
  try {
    // Connect to database
    await dbConnect();
    
    // Test fetching data from different collections
    const projectsCount = await Project.countDocuments();
    const certificatesCount = await Certificate.countDocuments();
    
    // Fetch sample data
    const projects = await Project.find({}).limit(3).select('title description');
    const certificates = await Certificate.find({}).limit(3).select('title issuer');
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      database: 'asadiqbalprofile',
      stats: {
        projects: projectsCount,
        certificates: certificatesCount
      },
      sampleData: {
        projects,
        certificates
      }
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json({
      success: false,
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
