import React from 'react';

export const TopNavBar = ({ currentView, handleNavigate }) => {
  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'vault', label: 'Vault' },
    { id: 'gallery', label: 'Gallery' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-background/90 backdrop-blur-md border-b-2 border-on-surface shadow-solid-sm">
      <nav className="flex justify-between items-center max-w-7xl mx-auto px-6 h-16">
        <div className="text-xl font-bold tracking-tight text-on-surface font-serif cursor-pointer hover:-translate-y-0.5 hover:text-primary transition-all" onClick={() => handleNavigate('home')}>
          Mysterious learner
        </div>
        <div className="hidden md:flex items-center gap-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => handleNavigate(tab.id)}
              className={`text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm px-1 ${
                currentView === tab.id
                  ? 'text-primary border-b-2 border-primary pb-1 font-bold'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <button className="bg-primary text-on-primary px-6 py-2 rounded-lg border-2 border-on-surface shadow-solid-sm font-bold hover:shadow-solid hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 active:shadow-solid-sm transition-all text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface">
          Connect
        </button>
      </nav>
    </header>
  );
};

export const BottomNavBar = ({ currentView, handleNavigate }) => {
  const tabs = [
    { id: 'home', icon: 'home' },
    { id: 'about', icon: 'eco' },
    { id: 'timeline', icon: 'business_center' },
    { id: 'vault', icon: 'library_books' },
    { id: 'gallery', icon: 'photo_library' },
  ];

  return (
    <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 bg-surface/95 backdrop-blur-xl px-6 py-4 rounded-xl shadow-solid-lg border-2 border-on-surface flex gap-8 items-center z-50">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => handleNavigate(tab.id)}
          className={`flex items-center justify-center min-w-[44px] min-h-[44px] outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full transition-colors ${
            currentView === tab.id ? 'text-primary' : 'text-on-surface-variant hover:text-primary'
          }`}
          aria-label={tab.id}
        >
          <span className="material-symbols-outlined" style={currentView === tab.id ? { fontVariationSettings: "'FILL' 1" } : {}}>
            {tab.icon}
          </span>
        </button>
      ))}
    </div>
  );
};
