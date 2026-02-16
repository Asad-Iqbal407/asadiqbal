'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitMessage('Thank you for your message! I will get back to you soon.');
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitMessage('Failed to send message. Please try again.');
        setSubmitStatus('error');
      }
    } catch {
      setSubmitMessage('An error occurred. Please try again.');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="glass p-8 rounded-3xl shadow-xl border border-white/20">
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-8 text-center"
      >
        Let&apos;s Connect
      </motion.h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 ml-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-5 py-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 placeholder:text-gray-400"
              placeholder="John Doe"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 ml-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-5 py-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 placeholder:text-gray-400"
              placeholder="john@example.com"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 ml-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-5 py-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 placeholder:text-gray-400 resize-none"
            placeholder="Tell me about your project..."
          />
        </motion.div>

        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02, translateY: -2 }}
          whileTap={{ scale: 0.98 }}
          className="w-full relative group overflow-hidden py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold text-lg shadow-lg shadow-purple-500/30 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <div className="relative flex items-center justify-center space-x-2">
            {isSubmitting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full"
                />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Send size={22} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                <span>Send Message</span>
              </>
            )}
          </div>
        </motion.button>

        <AnimatePresence>
          {submitMessage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className={`flex items-center space-x-3 p-5 rounded-2xl border ${
                submitStatus === 'success'
                  ? 'bg-green-500/10 text-green-600 border-green-500/20'
                  : 'bg-red-500/10 text-red-600 border-red-500/20'
              }`}
            >
              {submitStatus === 'success' ? (
                <CheckCircle size={24} />
              ) : (
                <AlertCircle size={24} />
              )}
              <p className="font-semibold">{submitMessage}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
