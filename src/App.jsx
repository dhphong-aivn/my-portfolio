import React, { useState, useEffect, useRef } from 'react';
import { Command, Moon, Sun, Palette, User, Briefcase, FileText, Image as ImageIcon } from 'lucide-react';
import { DEFAULT_AVATAR_URL } from './constants/data';
import { generateAIResponse } from './services/ai';
import { Header } from './components/Header';
import { CommandMenu } from './components/CommandMenu';
import { ChatWidget } from './components/ChatWidget';
import { HomeView } from './views/HomeView';
import { TimelineView } from './views/TimelineView';
import { VaultView } from './views/VaultView';
import { GalleryView } from './views/GalleryView';

const App = () => {
  // Navigation State
  const [currentView, setCurrentView] = useState('home'); 
  const [isCmdOpen, setIsCmdOpen] = useState(false);
  const [cmdSearch, setCmdSearch] = useState('');

  // UI & Theme State
  const [theme, setTheme] = useState('dark');
  const [isColorLight, setIsColorLight] = useState(false);
  const [isMounted, setIsMounted] = useState(false); 
  const [toast, setToast] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(DEFAULT_AVATAR_URL);
  const [avatarColor, setAvatarColor] = useState(null);

  // Chat State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([{ id: 1, sender: 'ai', text: "Chào bạn, mình là trợ lý ảo của Phong. Bạn có thể gõ phím Cmd+K (hoặc Ctrl+K) để mở bảng điều hướng nhanh nhé!" }]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Refs
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const chatWidgetRef = useRef(null);
  const chatInputRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 150);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isChatOpen && chatWidgetRef.current && !chatWidgetRef.current.contains(event.target)) {
        setIsChatOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isChatOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCmdOpen(prev => !prev);
      }
      if (e.key === 'Escape' && isCmdOpen) setIsCmdOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isCmdOpen]);

  useEffect(() => {
    if (isChatOpen) setTimeout(() => chatInputRef.current?.focus(), 300);
  }, [isChatOpen]);

  const handleLinkClick = (e, url, platformName) => {
    e.preventDefault(); 
    setToast(`Đang kết nối đến ${platformName}...`);
    setTimeout(() => setToast(null), 3000);
    setTimeout(() => {
      try { window.open(url, '_blank', 'noopener,noreferrer'); } 
      catch (err) { console.log("Iframe chặn mở tab mới."); }
    }, 800);
  };

  const handleNavigate = (view) => {
    setCurrentView(view);
    setIsCmdOpen(false);
    setCmdSearch('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const extractColorFromImage = (url) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      try {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        let r = 0, g = 0, b = 0, count = 0;
        for (let i = 0; i < imageData.length; i += 16) {
           if (imageData[i] > 240 && imageData[i+1] > 240 && imageData[i+2] > 240) continue;
           if (imageData[i] < 15 && imageData[i+1] < 15 && imageData[i+2] < 15) continue;
           r += imageData[i]; g += imageData[i+1]; b += imageData[i+2]; count++;
        }
        if (count > 0) {
          const avgR = Math.floor(r / count); const avgG = Math.floor(g / count); const avgB = Math.floor(b / count);
          setAvatarColor({ r: avgR, g: avgG, b: avgB });
          const yiq = ((avgR * 299) + (avgG * 587) + (avgB * 114)) / 1000;
          setIsColorLight(yiq >= 128); 
          setTheme('auto');
        }
      } catch (error) { console.warn("CORS Error"); }
    };
    img.src = url;
  };

  useEffect(() => {
    if (DEFAULT_AVATAR_URL) extractColorFromImage(DEFAULT_AVATAR_URL);
  }, []);

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text }]);
    setInputValue('');
    setIsTyping(true);
    const responseText = await generateAIResponse(text, messages);
    setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: responseText }]);
    setIsTyping(false);
  };

  const handleSubmit = (e) => { e.preventDefault(); handleSendMessage(inputValue); };
  const handleResetChat = () => { setMessages([{ id: Date.now(), sender: 'ai', text: "Trí nhớ đã được làm mới!" }]); chatInputRef.current?.focus(); };
  
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarUrl(url); extractColorFromImage(url);
    }
  };

  // Nav Config
  const navOptions = [
    { id: 'home', icon: <User size={16}/>, title: "Trang chủ", desc: "Thông tin cốt lõi" },
    { id: 'timeline', icon: <Briefcase size={16}/>, title: "Hành trình sự nghiệp", desc: "Kinh nghiệm & Dự án Github" },
    { id: 'vault', icon: <FileText size={16}/>, title: "Kho tri thức", desc: "Các bài viết Blog & Case Study" },
    { id: 'gallery', icon: <ImageIcon size={16}/>, title: "Thư viện ảnh", desc: "Du lịch & Cuộc sống" },
  ];

  // Theming Logic
  const isLight = theme === 'light';
  let primaryR = 59, primaryG = 130, primaryB = 246; 
  if (theme === 'auto' && avatarColor) { primaryR = avatarColor.r; primaryG = avatarColor.g; primaryB = avatarColor.b; }
  
  const cssVariables = {
    '--primary': `rgb(${primaryR}, ${primaryG}, ${primaryB})`,
    '--primary-alpha': `rgba(${primaryR}, ${primaryG}, ${primaryB}, 0.2)`,
    '--primary-glow': `rgba(${primaryR}, ${primaryG}, ${primaryB}, 0.4)`,
    '--primary-text': (theme === 'auto' && isColorLight) ? '#0f172a' : '#ffffff', 
  };

  const uiClasses = {
    app: isLight ? 'bg-slate-50 text-slate-800' : 'bg-slate-950 text-slate-200',
    card: isLight ? 'bg-white border-slate-200 shadow-sm hover:border-slate-300' : 'bg-slate-900/60 border-slate-800 hover:border-slate-700',
    textMuted: isLight ? 'text-slate-500' : 'text-slate-400',
  };

  return (
    <div style={cssVariables} className={`min-h-screen font-sans selection:bg-[var(--primary-alpha)] selection:text-[var(--primary)] pb-12 transition-colors duration-500 ${uiClasses.app}`}>
      
      {/* Toast Notification */}
      <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] transition-all duration-300 ${toast ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
        <div className="bg-slate-800 text-white px-5 py-2.5 rounded-full shadow-2xl border border-slate-700 flex items-center gap-3 text-sm font-medium">
          <span className="relative flex h-2.5 w-2.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span></span>
          {toast}
        </div>
      </div>

      {/* Floating Buttons */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-40">
        <button onClick={() => setIsCmdOpen(true)} className={`flex items-center gap-2 px-4 py-2 rounded-full border shadow-lg backdrop-blur-md transition-all hover:scale-105 ${isLight ? 'bg-white/80 border-slate-200 text-slate-600 hover:border-[var(--primary)] hover:text-[var(--primary)]' : 'bg-slate-900/80 border-slate-700 text-slate-300 hover:border-[var(--primary)] hover:text-[var(--primary)]'}`}>
          <Command size={14} />
          <span className="text-xs font-mono font-medium">Bấm Cmd + K để điều hướng</span>
        </button>
      </div>

      <div className="fixed top-4 right-4 z-40 flex bg-slate-800/80 backdrop-blur-md rounded-full border border-slate-700 p-1.5 gap-1 shadow-lg">
        <button onClick={() => setTheme('dark')} className={`p-2 rounded-full transition-all ${theme === 'dark' ? 'bg-slate-950 text-white shadow' : 'text-slate-400 hover:text-white'}`}><Moon size={16} /></button>
        <button onClick={() => setTheme('light')} className={`p-2 rounded-full transition-all ${theme === 'light' ? 'bg-white text-slate-900 shadow' : 'text-slate-400 hover:text-white'}`}><Sun size={16} /></button>
        <button onClick={() => setTheme('auto')} className={`p-2 rounded-full transition-all relative overflow-hidden ${theme === 'auto' ? 'text-white' : 'text-slate-400 hover:text-white'}`}>
          {theme === 'auto' && <div className="absolute inset-0 bg-[var(--primary)] opacity-100"></div>}
          <Palette size={16} className="relative z-10" />
        </button>
      </div>

      <CommandMenu isCmdOpen={isCmdOpen} setIsCmdOpen={setIsCmdOpen} isLight={isLight} cmdSearch={cmdSearch} setCmdSearch={setCmdSearch} handleNavigate={handleNavigate} navOptions={navOptions} currentView={currentView} uiClasses={uiClasses} />

      {/* Decorative Background */}
      {!isLight && (
        <div className={`fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none transition-all duration-1000 ${isMounted ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[var(--primary-alpha)] blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] rounded-full bg-slate-800/30 blur-[100px]"></div>
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28">
        
        <Header isLight={isLight} isMounted={isMounted} uiClasses={uiClasses} handleFileChange={handleFileChange} fileInputRef={fileInputRef} avatarUrl={avatarUrl} handleLinkClick={handleLinkClick} />

        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {currentView === 'home' && <HomeView isLight={isLight} uiClasses={uiClasses} />}
          {currentView === 'timeline' && <TimelineView isLight={isLight} uiClasses={uiClasses} handleLinkClick={handleLinkClick} />}
          {currentView === 'vault' && <VaultView isLight={isLight} uiClasses={uiClasses} />}
          {currentView === 'gallery' && <GalleryView isLight={isLight} uiClasses={uiClasses} />}
        </div>

        <footer className={`mt-20 pt-8 border-t border-slate-800/20 flex flex-col items-center justify-between text-slate-500 text-xs font-mono`}>
          <p>© {new Date().getFullYear()} Dinh Hong Phong. All rights reserved.</p>
        </footer>

      </div>

      <ChatWidget 
        isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} isLight={isLight} messages={messages}
        isTyping={isTyping} inputValue={inputValue} setInputValue={setInputValue} chatInputRef={chatInputRef}
        messagesEndRef={messagesEndRef} handleSubmit={handleSubmit} handleResetChat={handleResetChat}
        avatarUrl={avatarUrl} chatWidgetRef={chatWidgetRef}
      />
    </div>
  );
};

export default App;
