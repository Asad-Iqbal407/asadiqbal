import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Certificate from '@/models/Certificate';
import { certificateCatalog, mergeCertificates } from '@/data/certificates';

export async function GET() {
  try {
    await dbConnect();
    const certificates = await Certificate.find({}).sort({ date: -1 });
    const mergedCertificates = mergeCertificates(certificates);
    
    return NextResponse.json(mergedCertificates, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    console.error('Error fetching certificates from database:', error);
    
    // Return fallback catalog data with 200 status so UI doesn't break
    return NextResponse.json(certificateCatalog, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  }
}
