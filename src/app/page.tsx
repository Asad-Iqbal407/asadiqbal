'use client';

import { motion, useScroll, useAnimation } from 'framer-motion';
import { MapPin, Phone, Mail, Github, Linkedin, User, Code, Briefcase, GraduationCap, Award, ArrowUp, Grid3X3 } from 'lucide-react';
import ContactForm from "@/components/ContactForm";
import ImageSlider from "@/components/ImageSlider";
import ProjectsGrid from "@/components/ProjectsGrid";
import { useEffect, useState } from 'react';
import Image from 'next/image';


export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [certificates, setCertificates] = useState<any[]>([
    {
      year: "2024",
      title: "BS Computer Science",
      subtitle: "University of Gujrat",
      description: "Graduated with honors, specializing in AI and Data Science.",
      type: "education",
      icon: GraduationCap,
      href: "https://uog.edu.pk/"
    },
    {
      year: "2024",
      title: "React.js Certification",
      subtitle: "LinkedIn Learning",
      description: "Advanced concepts including Hooks, Context API, and performance optimization.",
      type: "certification",
      icon: Code,
      href: "https://www.linkedin.com/learning/"
    },
    {
      year: "2024",
      title: "Machine Learning Certification",
      subtitle: "Great Learning",
      description: "Comprehensive ML course covering supervised and unsupervised learning.",
      type: "certification",
      icon: Award,
      href: "https://www.mygreatlearning.com/"
    }
  ]);
  const [loadingCertificates, setLoadingCertificates] = useState(true);


  const roles = [
    "Computer Science Student",
    "AI Enthusiast",
    "Full Stack Developer",
    "Problem Solver"
  ];

  useEffect(() => {
    let isMounted = true;
    
    const fetchCertificates = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        const response = await fetch('/api/certificates', {
          signal: controller.signal,
          headers: {
            'Accept': 'application/json',
          },
        });
        
        clearTimeout(timeoutId);
        
        if (!isMounted) return;
        
        if (response.ok) {
          const data = await response.json();
          // Transform data to match UI requirements
          const formattedData = data.map((cert: any) => ({
            year: new Date(cert.date).getFullYear().toString(),
            title: cert.title,
            subtitle: cert.issuer,
            description: cert.description,
            type: cert.type,
            icon: cert.type === 'education' ? GraduationCap : (cert.title.includes('Machine Learning') ? Award : Code),
            href: cert.link
          }));
          setCertificates(formattedData);
        }
      } catch (error) {
        if (!isMounted) return;
        
        if (error instanceof Error && error.name === 'AbortError') {
          console.warn('Certificates fetch timed out, using fallback data');
        } else {
          console.warn('Failed to fetch certificates:', error);
        }
        // Keep using fallback data
      } finally {
        if (isMounted) {
          setLoadingCertificates(false);
        }
      }
    };

    fetchCertificates();
    
    return () => {
      isMounted = false;
    };
  }, []);


  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-purple-500/30">
      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: showScrollTop ? 1 : 0, scale: showScrollTop ? 1 : 0 }}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-xl hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 hover:scale-110 border border-white/20"
      >
        <ArrowUp size={24} />
      </motion.button>

      <div className="pt-0">
        {/* Hero Section */}
        <section id="home" className="min-h-[90vh] flex items-center justify-center relative overflow-hidden px-4">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse-slow"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px] animate-float"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05)_0%,transparent_70%)]"></div>
          </div>

          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass mb-6"
              >
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
                </span>
                <span className="text-sm font-medium">Available for new opportunities</span>
              </motion.div>
              
              <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">
                Hi, I&apos;m <br />
                <span className="gradient-text animate-background-pan bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-[length:200%_auto]">
                  Asad Iqbal
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-xl leading-relaxed h-24">
                A passionate{' '}
                <span className="block text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 bg-clip-text text-transparent mt-2">
                  <motion.span
                    key={roleIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    {roles[roleIndex]}
                  </motion.span>
                </span>
                <span className="block mt-2 text-lg">
                  crafting modern digital experiences with cutting-edge technology.
                </span>
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-primary text-lg group flex items-center space-x-2 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
                >
                  <span>View My Projects</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-secondary text-lg hover:bg-foreground/5 backdrop-blur-sm"
                >
                  Let&apos;s Talk
                </button>
              </div>

              <div className="mt-12 flex items-center space-x-8">
                <a href="https://github.com/Asad-Iqbal407" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-purple-500 transition-colors transform hover:scale-110">
                  <Github size={28} />
                </a>
                <a href="https://linkedin.com/in/asad-iqbal" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-blue-500 transition-colors transform hover:scale-110">
                  <Linkedin size={28} />
                </a>
                <a href="mailto:measad408@gmail.com" className="text-muted-foreground hover:text-red-500 transition-colors transform hover:scale-110">
                  <Mail size={28} />
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10 w-full aspect-square rounded-full overflow-hidden p-2 flex items-center justify-center border-4 border-white/10 glass shadow-2xl shadow-purple-500/20">
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&h=800&fit=crop"
                    alt="Asad Iqbal - Developer"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-transparent mix-blend-overlay"></div>
                </div>
              </div>
              
              {/* Floating tech icons */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 glass p-4 rounded-2xl z-20"
              >
                <Code className="text-purple-500 w-8 h-8" />
              </motion.div>
              
              <motion.div 
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-10 -left-10 glass p-4 rounded-2xl z-20"
              >
                <Briefcase className="text-blue-500 w-8 h-8" />
              </motion.div>

              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-indigo-500/30 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
            </motion.div>
          </div>
        </section>

        {/* Wave Separator */}
        <div className="w-full overflow-hidden leading-[0] transform translate-y-1">
          <svg className="relative block w-[calc(100%+1.3px)] h-[50px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-purple-500/10"></path>
          </svg>
        </div>

        {/* Stats Section */}
        <section className="py-20 px-4 bg-purple-500/10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { number: "3+", label: "Years Experience", color: "from-blue-400 to-cyan-300" },
                { number: "15+", label: "Projects Built", color: "from-purple-400 to-pink-300" },
                { number: "5+", label: "AI Models Trained", color: "from-orange-400 to-red-300" },
                { number: "100%", label: "Client Satisfaction", color: "from-green-400 to-emerald-300" }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
                  className="relative group"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-2xl blur opacity-25 group-hover:opacity-50 transition-opacity duration-500`}></div>
                  <div className="relative glass rounded-2xl p-6 text-center hover-lift border border-white/10 group-hover:border-white/20 transition-colors bg-black/40 backdrop-blur-xl">
                    <div className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                      {stat.number}
                    </div>
                    <div className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Inverted Wave Separator */}
        <div className="w-full overflow-hidden leading-[0] transform rotate-180 -translate-y-1">
          <svg className="relative block w-[calc(100%+1.3px)] h-[50px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-purple-500/10"></path>
          </svg>
        </div>

        {/* About Section */}
        <section id="about" className="py-32 px-4 relative overflow-hidden">
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-6">About <span className="gradient-text">Me</span></h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Dedicated to solving complex problems through elegant code and intelligent algorithms.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="glass rounded-3xl p-8 space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                      <User size={24} />
                    </div>
                    <h3 className="text-2xl font-bold">The Journey</h3>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    I am an enthusiastic Computer Science student with a passion for web development and AI
                    integration. I have developed various websites using JavaScript, the MERN stack, and Flask. 
                    My projects include integrating AI models into websites using Flask, showcasing my skills 
                    in both frontend and backend development.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="grid sm:grid-cols-2 gap-6"
              >
                {[
                  { icon: MapPin, label: "Location", value: "Lisbon, Portugal", color: "text-blue-500", href: "https://www.google.com/maps/search/?api=1&query=Lisbon,+Portugal" },
                  { icon: Phone, label: "Phone", value: "+351 920 572 641", color: "text-green-500", href: "tel:+351920572641" },
                  { icon: Mail, label: "Email", value: "measad408@gmail.com", color: "text-red-500", href: "mailto:measad408@gmail.com" },
                  { icon: Github, label: "GitHub", value: "Asad-Iqbal407", color: "text-purple-500", href: "https://github.com/Asad-Iqbal407" },
                ].map((item, i) => (
                  <a
                    key={i}
                    href={item.href}
                    target={item.label === "Location" || item.label === "GitHub" ? "_blank" : undefined}
                    rel={item.label === "Location" || item.label === "GitHub" ? "noopener noreferrer" : undefined}
                    className="glass rounded-2xl p-6 hover-lift hover:bg-white/5 transition-colors block"
                  >
                    <item.icon className={`${item.color} mb-4`} size={24} />
                    <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                    <p className="font-semibold truncate hover:text-purple-500 transition-colors">{item.value}</p>
                  </a>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Wave Separator before Skills */}
        <div className="w-full overflow-hidden leading-[0] transform translate-y-1 bg-background">
          <svg className="relative block w-[calc(100%+1.3px)] h-[50px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-purple-500/5"></path>
          </svg>
        </div>

        {/* Skills Section */}
        <section id="skills" className="py-32 px-4 bg-purple-500/5 relative">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-6">Expertise <span className="gradient-text">Areas</span></h2>
              <p className="text-xl text-muted-foreground">The tools and technologies I use to bring ideas to life.</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  icon: Code, 
                  title: "Development", 
                  skills: ['Python', 'JavaScript', 'React.js', 'Node.js'],
                  gradient: "from-indigo-500 to-purple-500"
                },
                { 
                  icon: Briefcase, 
                  title: "Frameworks", 
                  skills: ['Flask', 'MERN Stack', 'Tailwind CSS', 'Next.js'],
                  gradient: "from-pink-500 to-rose-500"
                },
                { 
                  icon: Award, 
                  title: "Specialization", 
                  skills: ['Machine Learning', 'Computer Vision', 'AI Integration', 'Web App Architecture'],
                  gradient: "from-blue-500 to-cyan-500"
                }
              ].map((category, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-3xl p-8 hover-lift group relative overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-300"
                >
                  <div className={`absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br ${category.gradient} rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.gradient} p-4 mb-8 text-white shadow-lg group-hover:scale-110 transition-transform relative z-10`}>
                    <category.icon size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-6 relative z-10">{category.title}</h3>
                  <div className="flex flex-wrap gap-2 relative z-10">
                    {category.skills.map((skill) => (
                      <span key={skill} className="px-3 py-1 rounded-lg bg-foreground/5 text-sm font-medium hover:bg-foreground/10 transition-colors cursor-default">
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Wave Separator after Skills */}
        <div className="w-full overflow-hidden leading-[0] transform rotate-180 -translate-y-1 bg-background">
          <svg className="relative block w-[calc(100%+1.3px)] h-[50px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-purple-500/5"></path>
          </svg>
        </div>

        {/* Projects Section */}
        <section id="projects" className="py-32 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-6">Featured <span className="gradient-text">Work</span></h2>
              <p className="text-xl text-muted-foreground">A collection of projects that showcase my technical capabilities.</p>
            </motion.div>

            <ImageSlider />

            {/* All Projects Grid */}
            <div className="mt-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass mb-6">
                  <Grid3X3 className="w-5 h-5 text-purple-500" />
                  <span className="text-sm font-medium">Browse All Projects</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4">Project Gallery</h3>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Explore the complete collection of my work. Each project represents a unique challenge and solution.
                </p>
              </motion.div>

              <ProjectsGrid />
            </div>
          </div>
        </section>


        {/* Wave Separator before Education */}
        <div className="w-full overflow-hidden leading-[0] transform translate-y-1 bg-background">
          <svg className="relative block w-[calc(100%+1.3px)] h-[50px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-blue-500/5"></path>
          </svg>
        </div>

        {/* Experience & Education Timeline */}
        <section id="education" className="py-32 px-4 bg-blue-500/5">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-6">My <span className="gradient-text">Journey</span></h2>
              <p className="text-xl text-muted-foreground">The path that led me to where I am today.</p>
            </motion.div>

            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-purple-500/50 to-transparent"></div>

              {loadingCertificates ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
                </div>
              ) : (
                <div className="space-y-12">
                  {certificates.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`relative flex flex-col md:flex-row gap-8 ${
                        index % 2 === 0 ? 'md:flex-row-reverse' : ''
                      }`}
                    >
                      <div className="flex-1"></div>
                      
                      {/* Timeline Dot */}
                      <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-background border-4 border-purple-500 z-10 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                      </div>

                      <div className={`flex-1 md:text-${index % 2 === 0 ? 'left' : 'right'} pl-10 md:pl-0`}>
                        <a 
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="glass p-6 rounded-2xl hover-lift relative overflow-hidden group block hover:bg-white/5 transition-all"
                        >
                          <div className={`absolute top-0 ${index % 2 === 0 ? 'left-0' : 'right-0'} w-1 h-full bg-gradient-to-b from-purple-500 to-indigo-500`}></div>
                          <span className="inline-block px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 text-sm font-bold mb-2">
                            {item.year}
                          </span>
                          <h3 className="text-xl font-bold mb-1 flex items-center gap-2 md:justify-start group-hover:text-purple-500 transition-colors">
                            {item.title}
                            <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </h3>
                          <p className="text-indigo-500 font-medium mb-2">{item.subtitle}</p>
                          <p className="text-muted-foreground text-sm">{item.description}</p>
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </section>

        {/* Wave Separator after Education */}
        <div className="w-full overflow-hidden leading-[0] transform rotate-180 -translate-y-1 bg-background">
          <svg className="relative block w-[calc(100%+1.3px)] h-[50px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-blue-500/5"></path>
          </svg>
        </div>

        {/* Contact Section */}
        <section id="contact" className="py-32 px-4 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-[120px] -z-10"></div>
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-6">Get <span className="gradient-text">In Touch</span></h2>
              <p className="text-xl text-muted-foreground">Let&apos;s build something extraordinary together.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <ContactForm />
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 border-t border-white/10 bg-black/5 backdrop-blur-sm relative overflow-hidden">
          {/* Decorative background for footer */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                Asad Iqbal
              </div>
              <p className="text-muted-foreground text-sm text-center md:text-left max-w-xs">
                Crafting digital experiences with passion and precision.
              </p>
              <p className="text-muted-foreground text-xs text-center md:text-left mt-2">
                © {new Date().getFullYear()} Asad Iqbal. All rights reserved.
              </p>
            </div>

            <div className="flex flex-col items-center md:items-end gap-4">
              <div className="flex items-center space-x-6">
                {[
                  { icon: Github, href: "https://github.com/Asad-Iqbal407" },
                  { icon: Linkedin, href: "https://linkedin.com/in/asad-iqbal" },
                  { icon: Mail, href: "mailto:measad408@gmail.com" }
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-xl glass flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-purple-500 transition-colors shadow-sm"
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                Made with <span className="text-red-500 animate-pulse">❤️</span> using Next.js & Tailwind
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
