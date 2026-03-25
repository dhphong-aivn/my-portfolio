import React from 'react';
import { Send, BrainCircuit, RotateCcw, X, MessageSquare } from 'lucide-react';
import { TypewriterMessage } from './TypewriterMessage';

export const ChatWidget = ({
  isChatOpen, setIsChatOpen, isLight, messages, isTyping, inputValue, setInputValue,
  chatInputRef, messagesEndRef, handleSubmit, handleResetChat, avatarUrl, chatWidgetRef
}) => (
  <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 flex flex-col items-end" ref={chatWidgetRef}>
    {isChatOpen && (
      <div className={`mb-6 w-[calc(100vw-3rem)] sm:w-[420px] h-[600px] max-h-[75vh] rounded-xl flex flex-col overflow-hidden shadow-solid-lg bg-surface-container-lowest border-2 border-on-surface animate-in fade-in slide-in-from-bottom-8 duration-300`}>
        <div className={`px-6 py-4 border-b-2 border-on-surface bg-surface-container flex items-center justify-between`}>
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 overflow-hidden bg-primary/10 border-primary/30`}>
                {avatarUrl ? <img src={avatarUrl} className="w-full h-full object-cover" /> : <BrainCircuit size={20} className="text-primary" />}
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-surface-container-lowest shadow-sm"></div>
            </div>
            <div>
              <h2 className={`text-base font-bold text-on-surface font-serif`}>Phong's Digital Twin</h2>
              <p className="text-xs font-medium text-on-surface-variant flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> Online
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button onClick={handleResetChat} className={`p-2 rounded-xl transition-colors hover:bg-surface-container-high text-on-surface-variant hover:text-primary outline-none focus-visible:ring-2 focus-visible:ring-primary`}><RotateCcw size={16} /></button>
            <button onClick={() => setIsChatOpen(false)} className={`p-2 rounded-xl transition-colors hover:bg-surface-container-high text-on-surface-variant hover:text-error outline-none focus-visible:ring-2 focus-visible:ring-error`}><X size={20} /></button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 scrollbar-thin scrollbar-thumb-outline-variant/30 scrollbar-track-transparent">
          {messages.map((msg, index) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-xl px-5 py-3.5 text-sm leading-relaxed ${
                msg.sender === 'user' 
                  ? 'bg-primary text-on-primary rounded-br-none shadow-solid-sm border-2 border-primary' 
                  : 'bg-surface text-on-surface rounded-bl-none border-2 border-on-surface shadow-solid-sm'
              }`}>
                {msg.sender === 'ai' ? <TypewriterMessage text={msg.text} isLatest={index === messages.length - 1} scrollRef={messagesEndRef} /> : msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className={`bg-surface-container text-on-surface border border-outline-variant/20 shadow-sm rounded-[1.5rem] rounded-bl-sm px-5 py-4 flex gap-1.5 w-16`}>
                <span className="w-2 h-2 bg-on-surface-variant/50 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-on-surface-variant/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 bg-on-surface-variant/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className={`p-4 sm:p-5 border-t-2 border-on-surface bg-surface-container-lowest`}>
          <form onSubmit={handleSubmit} className="relative flex items-center">
            <input ref={chatInputRef} type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Ask my AI anything..." className={`w-full text-base font-medium rounded-lg pl-5 pr-14 py-3 sm:py-3.5 outline-none focus-visible:ring-2 focus-visible:ring-primary border-2 border-on-surface bg-surface text-on-surface placeholder-on-surface-variant/50 shadow-solid-sm`} />
            <button type="submit" disabled={!inputValue.trim() || isTyping} className="absolute right-2 p-2.5 bg-primary hover:bg-primary/90 disabled:opacity-50 rounded-md flex items-center justify-center text-on-primary shadow-solid hover:shadow-solid-sm active:translate-x-0.5 active:translate-y-0.5 transition-all outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-container-lowest focus-visible:ring-primary"><Send size={16} className="-ml-0.5 mt-0.5" /></button>
          </form>
        </div>
      </div>
    )}

    <button onClick={() => setIsChatOpen(!isChatOpen)} className={`w-16 h-16 rounded-xl flex items-center justify-center shadow-solid-lg hover:shadow-solid border-2 border-on-surface hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-300 bg-primary text-on-primary outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-offset-background focus-visible:ring-primary z-50`}>
      <MessageSquare size={28} />
      {/* Cảnh báo có tin nhắn */}
      {!isChatOpen && messages.length > 0 && messages[messages.length-1].sender === 'ai' && (
        <span className="absolute -top-2 -right-2 w-4 h-4 bg-tertiary border-2 border-on-surface animate-pulse shadow-solid-sm"></span>
      )}
    </button>
  </div>
);
