'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Project {
  _id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
  featured: boolean;
}

const fallbackImages = [
  {
    _id: '1',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop',
    title: 'Video Downloader',
    description: 'Seamlessly save high-quality videos from YouTube & TikTok. Fast, free, and unlimited.',
    link: 'https://videodownloader-nu-six.vercel.app/',
    tags: [],
    featured: true
  },
  {
    _id: '2',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop',
    title: 'TG Accessories',
    description: 'Premium tech accessories for your digital life. Power solutions, cables, and more.',
    link: 'https://tgaccessories.vercel.app/',
    tags: [],
    featured: true
  },
  {
    _id: '3',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop',
    title: 'Pixel Arcade',
    description: 'A curated collection of timeless games reimagined with modern performance.',
    link: 'https://gamestudio-woad.vercel.app/',
    tags: [],
    featured: true
  },
  {
    _id: '4',
    image: 'https://images.unsplash.com/photo-1514328826658-e4b7b2575791?w=800&h=600&fit=crop',
    title: '3D Archery Duck Hunter',
    description: 'Master the bow and conquer the seasons in this immersive 3D archery game.',
    link: 'https://duckshooting.vercel.app/',
    tags: [],
    featured: true
  },
  {
    _id: '5',
    image: 'https://images.unsplash.com/photo-1596742578443-7682ef5251cd?w=800&h=600&fit=crop',
    title: 'Tertulia Impulsiva',
    description: 'Specialized mobile phone repair services. Fast, reliable, and affordable repairs for all brands.',
    link: 'https://imobilerepairing-tau.vercel.app/',
    tags: [],
    featured: true
  },
  {
    _id: '6',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop',
    title: 'BombSquad',
    description: 'Strategic arcade game. Survive, destroy, and conquer in this explosive space adventure.',
    link: 'https://bombsquad-tau.vercel.app/',
    tags: [],
    featured: true
  }
];

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [projects, setProjects] = useState<Project[]>(fallbackImages);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setProjects(data);
          }
        }
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
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
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 1.2,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
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
      <div className="w-full h-[400px] md:h-[600px] flex items-center justify-center bg-gray-900/50 rounded-3xl backdrop-blur-sm">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  const currentProject = projects[currentIndex];

  return (
    <div className="relative w-full h-[400px] md:h-[600px] overflow-hidden rounded-3xl shadow-2xl glass group">
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
            scale: { duration: 0.8 },
          }}
          className="absolute inset-0"
        >
          <div className="relative w-full h-full overflow-hidden">
            <motion.div
              initial={{ scale: 1.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 6 }}
              className="w-full h-full"
            >
              <Image
                src={currentProject.image}
                alt={currentProject.title}
                fill
                className="object-cover"
                sizes="100vw"
                priority={currentIndex === 0}
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8 md:p-16">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="max-w-3xl"
              >
                <motion.span 
                  className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-sm font-medium mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  Featured Project
                </motion.span>
                <h2 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
                  {currentProject.title}
                </h2>
                <p className="text-xl md:text-2xl text-gray-200 leading-relaxed max-w-2xl drop-shadow-md">
                  {currentProject.description}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-8 btn-primary"
                  onClick={() => window.open(currentProject.link, '_blank')}
                >
                  Visit Project
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows */}
      <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
        <button
          onClick={prevSlide}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-all pointer-events-auto shadow-lg"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-all pointer-events-auto shadow-lg"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Progress indicators (Dots) */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
