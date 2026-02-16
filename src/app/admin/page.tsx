'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, User, MessageSquare, Calendar, Bell, BellOff, LogOut } from 'lucide-react';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  read?: boolean;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const lastMessageIdRef = useRef<string | null>(null);
  const router = useRouter();

  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
      alert('This browser does not support desktop notifications');
      return;
    }

    const permission = await Notification.requestPermission();
    setNotificationsEnabled(permission === 'granted');
    
    if (permission === 'granted') {
      new Notification('Notifications Enabled', {
        body: 'You will be notified when new messages arrive.',
        icon: '/favicon.ico'
      });
    }
  };

  const fetchMessages = useCallback(async (authToken: string, silent = false) => {
    if (!silent) setLoading(true);
    try {
      const response = await fetch('/api/admin/messages', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response.ok) {
        const data: ContactMessage[] = await response.json();
        
        // Check for new messages
        if (data.length > 0) {
          const latestId = data[0].id;
          
          // If we have a previous reference and the latest ID is different/newer
          if (lastMessageIdRef.current && lastMessageIdRef.current !== latestId) {
            // Find how many new messages
            const newCount = data.findIndex(m => m.id === lastMessageIdRef.current);
            const actualNewCount = newCount === -1 ? data.length : newCount;
            
            if (actualNewCount > 0 && document.hidden) {
              if (Notification.permission === 'granted') {
                new Notification(`New Message from ${data[0].name}`, {
                  body: data[0].message.substring(0, 50) + '...',
                  icon: '/favicon.ico'
                });
              }
              document.title = `(${actualNewCount}) New Messages - Admin`;
            }
          }
          lastMessageIdRef.current = latestId;
        }

        setMessages(data);
        setIsAuthenticated(true);
      } else if (response.status === 401) {
        window.sessionStorage.removeItem('adminToken');
        window.sessionStorage.removeItem('adminUser');
        router.push('/admin/login');
      }
    } catch {
      console.error('Error fetching messages');
    } finally {
      if (!silent) setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    const storedToken =
      typeof window !== 'undefined' ? window.sessionStorage.getItem('adminToken') : null;
    
    if (!storedToken) {
      router.push('/admin/login');
      return;
    }

    fetchMessages(storedToken);

    // Check notification permission status
    if ('Notification' in window && Notification.permission === 'granted') {
      setNotificationsEnabled(true);
    }

    // Polling for new messages every 30 seconds
    const interval = setInterval(() => {
      const currentToken = window.sessionStorage.getItem('adminToken');
      if (currentToken) {
        fetchMessages(currentToken, true);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [fetchMessages, router]);

  // Reset title when page becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        document.title = 'Admin Dashboard';
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const handleLogout = () => {
    window.sessionStorage.removeItem('adminToken');
    window.sessionStorage.removeItem('adminUser');
    router.push('/admin/login');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (!isAuthenticated && loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) return null; // Should redirect

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4"
        >
          <div>
            <h1 className="text-4xl font-bold gradient-text mb-2">Contact Messages</h1>
            <p className="text-gray-600">View all messages submitted through your contact form</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={requestNotificationPermission}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${
                notificationsEnabled 
                  ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                  : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
              }`}
            >
              {notificationsEnabled ? <Bell size={18} /> : <BellOff size={18} />}
              <span className="text-sm font-medium">
                {notificationsEnabled ? 'Notifications On' : 'Enable Notifications'}
              </span>
            </button>
            
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-full transition-all"
            >
              <LogOut size={18} />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </motion.div>

        {loading && messages.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <div className="grid gap-6">
            <AnimatePresence>
              {messages.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass rounded-2xl p-8 text-center"
                >
                  <MessageSquare className="mx-auto text-gray-400 mb-4" size={48} />
                  <p className="text-gray-600">No messages yet</p>
                </motion.div>
              ) : (
                messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass rounded-2xl p-6 hover-lift border border-white/20"
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div className="flex items-center space-x-3 mb-2 md:mb-0">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/20">
                          <User className="text-white" size={20} />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800 text-lg">{message.name}</h3>
                          <div className="flex items-center space-x-2 text-gray-600 text-sm">
                            <Mail size={14} className="text-purple-500" />
                            <a href={`mailto:${message.email}`} className="hover:text-purple-600 transition-colors">
                              {message.email}
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-500 text-sm bg-white/30 px-3 py-1 rounded-full">
                        <Calendar size={14} />
                        <span>{formatDate(message.createdAt)}</span>
                      </div>
                    </div>

                    <div className="bg-white/40 rounded-xl p-5 border border-white/10">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{message.message}</p>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
