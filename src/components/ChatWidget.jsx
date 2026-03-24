import React from 'react';
import { Send, BrainCircuit, RotateCcw, X, MessageSquare } from 'lucide-react';
import { TypewriterMessage } from './TypewriterMessage';

export const ChatWidget = ({
  isChatOpen, setIsChatOpen, isLight, messages, isTyping, inputValue, setInputValue,
  chatInputRef, messagesEndRef, handleSubmit, handleResetChat, avatarUrl, chatWidgetRef
}) => (
  <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 flex flex-col items-end" ref={chatWidgetRef}>
    {isChatOpen && (
      <div className={`mb-4 w-[calc(100vw-3rem)] sm:w-[400px] h-[550px] max-h-[75vh] rounded-2xl flex flex-col overflow-hidden shadow-2xl ${isLight ? 'bg-white border border-slate-200' : 'bg-slate-900/95 border border-slate-700 backdrop-blur-md'}`}>
        <div className={`px-4 py-3 border-b flex items-center justify-between ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border overflow-hidden ${isLight ? 'bg-slate-200 border-slate-300' : 'bg-[var(--primary-alpha)] border-[var(--primary)]/30'}`}>
                {avatarUrl ? <img src={avatarUrl} className="w-full h-full object-cover" /> : <BrainCircuit size={16} className="text-[var(--primary)]" />}
              </div>
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-slate-900"></div>
            </div>
            <div>
              <h2 className={`text-sm font-semibold ${isLight ? 'text-slate-800' : 'text-white'}`}>Phong's Digital Twin</h2>
              <p className="text-[10px] text-slate-500">Online</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={handleResetChat} className={`p-1.5 rounded-lg transition-colors ${isLight ? 'hover:bg-slate-200 text-slate-500' : 'hover:bg-slate-800 text-slate-400'}`}><RotateCcw size={16} /></button>
            <button onClick={() => setIsChatOpen(false)} className={`p-1.5 rounded-lg transition-colors ${isLight ? 'hover:bg-slate-200 text-slate-500' : 'hover:bg-slate-800 text-slate-400'}`}><X size={18} /></button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-700">
          {messages.map((msg, index) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${msg.sender === 'user' ? 'bg-[var(--primary)] rounded-br-sm text-white' : `${isLight ? 'bg-slate-100 text-slate-800 border-slate-200' : 'bg-slate-800 text-slate-200 border-slate-700'} rounded-bl-sm border`}`} style={msg.sender === 'user' ? { color: 'var(--primary-text)' } : {}}>
                {msg.sender === 'ai' ? <TypewriterMessage text={msg.text} isLatest={index === messages.length - 1} scrollRef={messagesEndRef} /> : msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className={`${isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-800 border-slate-700'} border rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5 w-14`}>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className={`p-3 sm:p-4 border-t ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
          <form onSubmit={handleSubmit} className="relative flex items-center">
            <input ref={chatInputRef} type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Hỏi AI của Phong..." className={`w-full text-sm rounded-full pl-4 pr-11 py-2.5 sm:py-3 focus:outline-none focus:ring-1 focus:ring-[var(--primary)] border ${isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-700 text-white'}`} />
            <button type="submit" disabled={!inputValue.trim() || isTyping} className="absolute right-1.5 p-1.5 sm:p-2 bg-[var(--primary)] disabled:opacity-50 rounded-full flex items-center justify-center" style={{ color: 'var(--primary-text)' }}><Send size={14} /></button>
          </form>
        </div>
      </div>
    )}

    <button onClick={() => setIsChatOpen(!isChatOpen)} className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-xl hover:-translate-y-1 transition-all bg-[var(--primary)] border-2 border-white/20`} style={{ color: 'var(--primary-text)' }}>
      <MessageSquare size={26} />
      {/* Cảnh báo có tin nhắn */}
      {!isChatOpen && messages.length > 0 && messages[messages.length-1].sender === 'ai' && (
        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-[var(--primary)] rounded-full animate-pulse"></span>
      )}
    </button>
  </div>
);
