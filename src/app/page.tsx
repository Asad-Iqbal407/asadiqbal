'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Github, Linkedin, User, Code, Briefcase, GraduationCap, Award, Heart } from 'lucide-react';
import ContactForm from "@/components/ContactForm";
import ImageSlider from "@/components/ImageSlider";
import Navigation from "@/components/Navigation";

export default function Home() {
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Navigation />

      <div className="pt-16">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center section-bg-1 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-blue-900/30 to-pink-900/40"></div>
          <motion.div
            {...fadeInUp}
            className="text-center text-white relative z-10 px-4"
          >
            <motion.h1
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-8xl font-bold mb-4 text-white drop-shadow-2xl"
              style={{
                textShadow: '0 0 20px rgba(255,255,255,0.5), 0 0 40px rgba(255,255,255,0.3), 0 0 60px rgba(255,255,255,0.2)'
              }}
            >
              Asad Iqbal
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl mb-8 text-gray-200"
            >
              Computer Science Student & AI Enthusiast
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="animate-float"
            >
              <button
                onClick={() => {
                  const element = document.getElementById('projects');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="btn-primary text-lg px-8 py-4 cursor-pointer hover:scale-105 transition-transform duration-200"
              >
                Explore My Work
              </button>
            </motion.div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              {...fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">About Me</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <motion.div {...fadeInUp} className="space-y-6">
                <div className="flex items-center space-x-3">
                  <User className="text-purple-600" size={24} />
                  <h3 className="text-2xl font-semibold text-gray-800">Profile Summary</h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  I am an enthusiastic Computer Science student with a passion for web development and AI
                  integration. I have developed various websites using JavaScript, the MERN stack, and Flask. My
                  projects include integrating AI models into websites using Flask, showcasing my skills in both
                  frontend and backend development, as well as my ability to leverage machine learning for real-world applications.
                </p>
              </motion.div>

              <motion.div {...fadeInUp} className="glass rounded-2xl p-8 hover-lift">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">Quick Facts</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="text-blue-500" size={20} />
                    <span className="text-gray-700">Lisbon, Portugal</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="text-green-500" size={20} />
                    <span className="text-gray-700">+351 920 572 641</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="text-red-500" size={20} />
                    <span className="text-gray-700">measad408@gmail.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Github className="text-gray-700" size={20} />
                    <a href="https://github.com/Asad-Iqbal407" className="text-purple-600 hover:underline">GitHub Profile</a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Linkedin className="text-blue-600" size={20} />
                    <a href="https://www.linkedin.com/in/asad-iqbal-377655282" className="text-purple-600 hover:underline">LinkedIn Profile</a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>



        {/* Skills Section */}
        <section id="skills" className="py-20 px-4 section-bg-2">
          <div className="max-w-6xl mx-auto">
            <motion.div
              {...fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">Skills & Expertise</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8"
            >
              <motion.div {...fadeInUp} className="glass rounded-2xl p-8 hover-lift">
                <div className="flex items-center space-x-3 mb-6">
                  <Code className="text-purple-600" size={32} />
                  <h3 className="text-2xl font-semibold text-gray-800">Programming Languages</h3>
                </div>
                <div className="space-y-3">
                  {['Python', 'JavaScript', 'PHP', 'HTML/CSS'].map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-3"
                    >
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-gray-700 font-medium">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div {...fadeInUp} className="glass rounded-2xl p-8 hover-lift">
                <div className="flex items-center space-x-3 mb-6">
                  <Briefcase className="text-pink-600" size={32} />
                  <h3 className="text-2xl font-semibold text-gray-800">Frameworks & Tools</h3>
                </div>
                <div className="space-y-3">
                  {['Flask', 'React.js', 'Node.js', 'MERN Stack'].map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-3"
                    >
                      <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                      <span className="text-gray-700 font-medium">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div {...fadeInUp} className="glass rounded-2xl p-8 hover-lift">
                <div className="flex items-center space-x-3 mb-6">
                  <Award className="text-blue-600" size={32} />
                  <h3 className="text-2xl font-semibold text-gray-800">Other Skills</h3>
                </div>
                <div className="space-y-3">
                  {['Machine Learning', 'Computer Vision', 'Web Development'].map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-3"
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700 font-medium">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Projects Showcase */}
        <section id="projects" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              {...fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">Featured Projects</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="mb-16"
            >
              <ImageSlider />
            </motion.div>
          </div>
        </section>



        {/* Education Section */}
        <section id="education" className="py-20 px-4 section-bg-3">
          <div className="max-w-4xl mx-auto">
            <motion.div
              {...fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">Education</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
            </motion.div>

            <motion.div
              {...fadeInUp}
              className="glass rounded-2xl p-8 hover-lift"
            >
              <div className="flex items-center space-x-4 mb-6">
                <GraduationCap className="text-purple-600" size={48} />
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800">Bachelor of Science in Computer Science</h3>
                  <p className="text-purple-600 font-medium">Sep 2020 - July 2024</p>
                </div>
              </div>
              <p className="text-gray-700 text-lg mb-4">
                University of Gujrat Sub Campus Mandi Baha Uddin, Punjab, Pakistan
              </p>
              <div className="border-t pt-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Key Courses:</h4>
                <div className="grid md:grid-cols-2 gap-2">
                  {[
                    'Data Structures and Algorithms',
                    'Machine Learning',
                    'Database Management Systems',
                    'Artificial Intelligence',
                    'Web Development'
                  ].map((course, index) => (
                    <motion.div
                      key={course}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-2"
                    >
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-gray-700">{course}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Certifications Section */}
        <section id="certifications" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              {...fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">Certifications</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {[
                {
                  title: 'React.js',
                  issuer: 'LinkedIn Learning',
                  link: 'https://www.linkedin.com/learning/certificates/1a0836280fccd3487fca28edce2c52e949f9ef82b18196d88f849851b1f49b45?trk=share_certificate',
                  icon: '⚛️'
                },
                {
                  title: 'Node.js',
                  issuer: 'LinkedIn Learning',
                  link: 'https://www.linkedin.com/learning/certificates/ebfda41df6410f97ba15f155c1ffed28e257c0c96a4464c5e9df05871deb17e3?trk=share_certificate',
                  icon: '🟢'
                },
                {
                  title: 'PHP & MySQL',
                  issuer: 'LinkedIn Learning',
                  link: 'https://www.linkedin.com/learning/certificates/6e4138cd0737cc95f6ce73d8ef23dba53c961800fa01c9db09713d5fb490b117?trk=share_certificate',
                  icon: '🐘'
                },
                {
                  title: 'Flask',
                  issuer: 'LinkedIn Learning',
                  link: 'https://www.linkedin.com/learning/certificates/be3e2b2fbc3d16964905a846e9cade13a597934822560141bff571b96a2c13aa?trk=share_certificate',
                  icon: '🍶'
                },
                {
                  title: 'Machine Learning',
                  issuer: 'Great Learning',
                  link: 'https://www.mygreatlearning.com/certificate/FPMZDTXL',
                  icon: '🤖'
                }
              ].map((cert, index) => (
                <motion.div
                  key={cert.title}
                  {...fadeInUp}
                  whileHover={{ y: -5 }}
                  className="glass rounded-2xl p-6 hover-lift text-center"
                >
                  <div className="text-4xl mb-4">{cert.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{cert.title}</h3>
                  <p className="text-purple-600 font-medium mb-4">{cert.issuer}</p>
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-purple-600 hover:text-purple-800 font-medium transition-colors duration-200"
                  >
                    <span>View Certificate</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Interests Section */}
        <section id="interests" className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              {...fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">Interests & Hobbies</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8"
            >
              {[
                {
                  title: 'Reading Books',
                  description: 'Passionate about tech and self-development books that broaden my perspective and knowledge.',
                  icon: '📚',
                  color: 'text-blue-600'
                },
                {
                  title: 'Tech Enthusiast',
                  description: 'Constantly staying updated with emerging technologies and industry trends.',
                  icon: '🚀',
                  color: 'text-purple-600'
                },
                {
                  title: 'Artificial Intelligence',
                  description: 'Keen interest in the development and application of AI in various industries.',
                  icon: '🤖',
                  color: 'text-pink-600'
                }
              ].map((interest, index) => (
                <motion.div
                  key={interest.title}
                  {...fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  className="glass rounded-2xl p-8 hover-lift text-center"
                >
                  <div className="text-6xl mb-4 animate-float">{interest.icon}</div>
                  <h3 className={`text-2xl font-semibold mb-4 ${interest.color}`}>{interest.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{interest.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-4 section-bg-2">
          <div className="max-w-4xl mx-auto">
            <motion.div
              {...fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">Get In Touch</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
              <p className="text-gray-700 text-lg mt-4">I'd love to hear from you! Let's discuss your next project.</p>
            </motion.div>

            <motion.div
              {...fadeInUp}
              className="glass rounded-2xl p-8 hover-lift"
            >
              <ContactForm />
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
