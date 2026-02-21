'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { mergeProjects, projectCatalog, ProjectCatalogItem } from '@/data/projects';
import { ExternalLink, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [projects, setProjects] = useState<ProjectCatalogItem[]>(projectCatalog);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    if (projects.length === 0) return;
    
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [projects.length]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1200 : -1200,
      opacity: 0,
      scale: 1.1,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1200 : -1200,
      opacity: 0,
      scale: 0.9,
    }),
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
  };

  if (loading && projects.length === 0) {
    return (
      <div className="w-full h-[400px] md:h-[600px] flex items-center justify-center bg-gradient-to-br from-indigo-900/30 via-purple-900/30 to-pink-900/30 rounded-3xl backdrop-blur-sm">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  const currentProject = projects[currentIndex];

  return (
    <div className="relative w-full h-[400px] md:h-[550px] overflow-hidden rounded-3xl shadow-2xl group">
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 },
            scale: { duration: 0.5 }
          }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div className="relative w-full h-full">
            <Image
              src={currentProject.image}
              alt={currentProject.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 80vw"
              className="object-cover"
            />
            
            {/* Rich Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-purple-950 via-purple-900/50 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-purple-950/50" />
            
            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="max-w-2xl"
              >
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {currentProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-lg shadow-purple-500/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-3 tracking-tight drop-shadow-xl">
                  {currentProject.title}
                </h2>
                
                {/* Description */}
                <p className="text-base md:text-xl text-gray-200 leading-relaxed mb-6 max-w-xl drop-shadow-lg">
                  {currentProject.description}
                </p>
                
                {/* CTA Button */}
                <button
                  onClick={() => window.open(currentProject.link, '_blank')}
                  className="group/btn inline-flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white font-bold rounded-full shadow-xl shadow-purple-600/40 hover:shadow-2xl hover:shadow-purple-600/50 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                >
                  <Sparkles className="w-5 h-5 group-hover/btn:animate-pulse" />
                  <span>Visit Project</span>
                  <ExternalLink className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
        <button
          onClick={prevSlide}
          className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md text-white hover:bg-white/30 transition-all duration-300 pointer-events-auto shadow-2xl border border-white/20 hover:scale-110"
        >
          <ChevronLeft className="w-7 h-7" />
        </button>
        <button
          onClick={nextSlide}
          className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md text-white hover:bg-white/30 transition-all duration-300 pointer-events-auto shadow-2xl border border-white/20 hover:scale-110"
        >
          <ChevronRight className="w-7 h-7" />
        </button>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`h-2 rounded-full transition-all duration-500 ${
              index === currentIndex 
                ? 'w-12 bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50' 
                : 'w-2 bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Project Counter */}
      <div className="absolute top-6 right-6 px-5 py-2.5 bg-gradient-to-r from-purple-600/90 to-pink-600/90 backdrop-blur-md rounded-full text-white text-sm font-bold shadow-lg shadow-purple-500/30 border border-white/20 z-20">
        {currentIndex + 1} / {projects.length}
      </div>

      {/* Featured Badge */}
      <div className="absolute top-6 left-6 px-4 py-2 bg-black/40 backdrop-blur-md rounded-full text-white text-xs font-semibold flex items-center gap-2 border border-white/10 z-20">
        <Sparkles className="w-3 h-3 text-purple-400" />
        <span>Featured Project</span>
      </div>
    </div>
  );
}
