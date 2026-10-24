import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ImageCloaker from './components/ImageCloaker';
import MetadataInspector from './components/MetadataInspector';
import ReportTool from './components/ReportTool';

const App = () => {
  const [activeTab, setActiveTab] = useState('cloak');

  const tabs = [
    { id: 'cloak', label: '1. Anti-AI Cloak' },
    { id: 'metadata', label: '2. GPS Metadata Cleaner' },
    { id: 'legal', label: '3. Legal Takedown' },
  ];

  return (
    <div className="min-h-screen w-full overflow-y-auto bg-[#03050b] text-slate-200 selection:bg-pink-500/30 font-sans flex flex-col justify-between">
      
      {/* --- TRUE BLACK & VIBRANT NEON MAGENTA MESH BACKGROUND --- */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {/* Top Center Vivid Neon Magenta Glow */}
        <div 
          className="absolute -top-20 left-1/2 -translate-x-1/2 w-[800px] h-[350px] rounded-full opacity-60 blur-[100px]"
          style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.95) 0%, rgba(217,70,239,0.5) 40%, transparent 70%)' }}
        />
        
        {/* Subtle Ambient Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]" 
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        />
      </div>

      {/* Main Container Content */}
      <div className="relative z-10 flex flex-col min-h-full justify-between pb-8">
        <Navbar />

        {/* Compact Header & Tab Navigation */}
        <div className="pt-3 pb-2 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-tight mb-1">
              Security <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-500 drop-shadow-[0_0_20px_rgba(236,72,153,0.5)]">Toolkit</span>
            </h1>
            <p className="text-slate-400 max-w-sm mx-auto text-xs font-light mb-3">
              Professional digital safety tools to protect privacy and combat identity misuse.
            </p>

            {/* Custom Tab Bar */}
            <div className="inline-flex flex-wrap justify-center gap-2 p-1 bg-[#0b101d]/90 backdrop-blur-xl border border-slate-800 rounded-xl shadow-lg">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {activeTab === tab.id && (
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500/30 to-rose-500/30 border border-pink-500/60 rounded-lg shadow-[0_0_15px_rgba(236,72,153,0.4)]" />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Component Render Area */}
        <main className="max-w-5xl w-full mx-auto px-4 my-auto flex items-center justify-center">
          <div className="w-full bg-[#070b16]/80 backdrop-blur-2xl border border-slate-800/90 rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            {activeTab === 'cloak' && <ImageCloaker />}
            {activeTab === 'metadata' && <MetadataInspector />}
            {activeTab === 'legal' && <ReportTool />}
          </div>
        </main>

        {/* Compact Footer */}
        <footer className="py-3 mt-4 border-t border-slate-800/80 text-center">
          <p className="text-slate-500 text-[10px] font-light">
            &copy; 2026 Digital Safety Initiative. All tools run client-side.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;