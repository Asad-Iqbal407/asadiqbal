import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import { projectCatalog } from '@/data/projects';

export async function GET() {
  try {
    await dbConnect();
    // Fetch from database but only use metadata, keep catalog images
    const dbProjects = await Project.find({}).sort({ createdAt: -1 });
    
    // Merge database data with catalog images
    const mergedProjects = projectCatalog.map(catalogItem => {
      const dbMatch = dbProjects.find((p: any) => 
        p.link === catalogItem.link || p.title === catalogItem.title
      );
      
      if (dbMatch) {
        return {
          ...catalogItem,
          // Use database fields except for image (keep catalog image)
          title: dbMatch.title || catalogItem.title,
          description: dbMatch.description || catalogItem.description,
          link: dbMatch.link || catalogItem.link,
          tags: dbMatch.tags?.length ? dbMatch.tags : catalogItem.tags,
          featured: dbMatch.featured ?? catalogItem.featured,
          // Keep the catalog image
          image: catalogItem.image,
        };
      }
      
      return catalogItem;
    });
    
    return NextResponse.json(mergedProjects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    // Return hardcoded catalog as fallback
    return NextResponse.json(projectCatalog);
  }
}
