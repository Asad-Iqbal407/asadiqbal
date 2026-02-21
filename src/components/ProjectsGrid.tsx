'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { mergeProjects, projectCatalog, ProjectCatalogItem } from '@/data/projects';
import { ExternalLink, Sparkles, Layers, Zap } from 'lucide-react';

// Fallback image for failed project previews
const FALLBACK_IMAGE = 'https://placehold.co/800x600/1a1a2e/FFF?text=Project+Preview&font=montserrat';

export default function ProjectsGrid() {
  const [projects, setProjects] = useState<ProjectCatalogItem[]>(projectCatalog);
  const [loading, setLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  useEffect(() => {
    let isMounted = true;
    
    const fetchProjects = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        const response = await fetch('/api/projects', {
          signal: controller.signal,
          headers: {
            'Accept': 'application/json',
          },
        });
        
        clearTimeout(timeoutId);
        
        if (!isMounted) return;
        
        if (response.ok) {
          const data = await response.json();
          setProjects(mergeProjects(data));
        }
      } catch (error) {
        if (!isMounted) return;
        
        if (error instanceof Error && error.name === 'AbortError') {
          console.warn('Projects fetch timed out, using fallback data');
        } else {
          console.warn('Failed to fetch projects:', error);
        }
        // Keep using projectCatalog as fallback
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProjects();
    
    return () => {
      isMounted = false;
    };
  }, []);

  const handleImageError = (projectId: string) => {
    setImageErrors(prev => new Set(prev).add(projectId));
  };

  if (loading && projects.length === 0) {
    return (
      <div className="w-full h-[320px] flex items-center justify-center bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-pink-900/20 rounded-3xl backdrop-blur-sm">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <motion.a
          key={project.id ?? `${project.title}-${index}`}
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.08 }}
          className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2"
        >
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Image container */}
          <div className="relative h-44 overflow-hidden">
            <Image
              src={imageErrors.has(project.id) ? FALLBACK_IMAGE : project.image}
              alt={project.title}
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              onError={() => handleImageError(project.id)}
              unoptimized={imageErrors.has(project.id)}
            />
            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
            
            {/* Floating icon */}
            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-purple-600/80 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <ExternalLink className="w-4 h-4" />
            </div>
          </div>
          
          {/* Content */}
          <div className="relative p-5 space-y-3">
            {/* Title */}
            <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors line-clamp-1">
              {project.title}
            </h3>
            
            {/* Description */}
            <p className="text-sm text-gray-400 leading-relaxed line-clamp-2 group-hover:text-gray-300 transition-colors">
              {project.description}
            </p>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {project.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-xs font-medium bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-purple-300 rounded-full border border-purple-500/30"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            {/* Visit link indicator */}
            <div className="flex items-center gap-1.5 pt-2 text-xs font-medium text-purple-400 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <Zap className="w-3 h-3" />
              <span>Visit Project</span>
            </div>
          </div>
          
          {/* Corner accent */}
          <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-purple-600/30 to-transparent rounded-bl-full"></div>
          </div>
        </motion.a>
      ))}
    </div>
  );
}
