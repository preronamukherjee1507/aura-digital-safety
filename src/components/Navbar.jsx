import React, { useState } from 'react';
import { Shield, X, Lock, BookOpen, Cpu } from 'lucide-react';

const Navbar = () => {
  const [activeModal, setActiveModal] = useState(null); // 'privacy' | 'resources' | null

  const scrollToToolkit = () => {
    const toolkitElement = document.getElementById('security-toolkit');
    if (toolkitElement) {
      toolkitElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className="w-full py-4 px-6 flex items-center justify-between border-b border-slate-800/80 bg-[#03050b]/80 backdrop-blur-md sticky top-0 z-50">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-pink-500/10 border border-pink-500/30 rounded-xl text-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.3)]">
            <Shield className="w-5 h-5" />
          </div>
          <span className="font-black text-lg tracking-wider text-white">AURA</span>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8 text-xs font-medium text-slate-400">
          <button onClick={scrollToToolkit} className="hover:text-white transition-colors cursor-pointer">
            Features
          </button>
          <button onClick={() => setActiveModal('privacy')} className="hover:text-white transition-colors cursor-pointer">
            Privacy Policy
          </button>
          <button onClick={() => setActiveModal('resources')} className="hover:text-white transition-colors cursor-pointer">
            Resources
          </button>
        </div>

        {/* CTA Button */}
        <div>
          <button 
            onClick={scrollToToolkit}
            className="px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 text-white font-bold text-xs rounded-xl shadow-[0_0_20px_rgba(236,72,153,0.4)] transition-all cursor-pointer"
          >
            Get Protected
          </button>
        </div>
      </nav>

      {/* --- MODALS FOR PRIVACY POLICY & RESOURCES --- */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#0b101d] border border-slate-800 rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative text-slate-200">
            
            {/* Close Button */}
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 p-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Content: Privacy Policy */}
            {activeModal === 'privacy' && (
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-bold uppercase tracking-widest">
                  <Lock className="w-3 h-3" /> Zero-Telemetry Guarantee
                </div>
                <h2 className="text-xl font-bold text-white">Privacy Policy</h2>
                <p className="text-xs text-slate-400 leading-relaxed">
                  At AURA, we believe digital privacy is a fundamental human right. Our architecture is designed with a strict **local-first execution model**:
                </p>
                <ul className="space-y-2 text-xs text-slate-300 list-disc pl-4">
                  <li><strong>Client-Side Processing:</strong> Your images and metadata analysis run directly in your browser sandbox or through your secure local backend node.</li>
                  <li><strong>No Data Harvesting:</strong> We do not store, log, or sell your personal photographs, biometric hashes, or location telemetry.</li>
                  <li><strong>Cryptographic Chain of Custody:</strong> Evidence logs are hashed locally using SHA-256, ensuring absolute tamper-proofing without third-party cloud exposure.</li>
                </ul>
              </div>
            )}

            {/* Modal Content: Resources */}
            {activeModal === 'resources' && (
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-widest">
                  <BookOpen className="w-3 h-3" /> Technical Documentation
                </div>
                <h2 className="text-xl font-bold text-white">Resources & Architecture</h2>
                <p className="text-xs text-slate-400 leading-relaxed">
                  AURA is engineered as a high-performance digital safety suite built for modern security challenges:
                </p>
                <div className="space-y-3">
                  <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl text-xs space-y-1">
                    <p className="font-bold text-white flex items-center gap-2"><Cpu className="w-3 h-3 text-pink-400" /> Adversarial Tensor Immunization</p>
                    <p className="text-slate-400">Injects controlled Gaussian noise arrays into pixel matrices to break facial recognition vector extraction.</p>
                  </div>
                  <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl text-xs space-y-1">
                    <p className="font-bold text-white flex items-center gap-2"><Lock className="w-3 h-3 text-cyan-400" /> Cryptographic Chain of Custody</p>
                    <p className="text-slate-400">Generates verifiable SHA-256 evidence logs optimized for formal legal takedown submissions and DMCA complaints.</p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
              <button 
                onClick={() => setActiveModal(null)}
                className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-all"
              >
                Close Window
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;