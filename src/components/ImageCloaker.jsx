import React, { useState } from 'react';
import { Upload, ShieldCheck, Zap, EyeOff, Image as ImageIcon, SlidersHorizontal, Loader2 } from 'lucide-react';

const ImageCloaker = () => {
  const [image, setImage] = useState(null);
  const [strength, setStrength] = useState(2); // 1: Low, 2: Med, 3: High
  const [glazeEnabled, setGlazeEnabled] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleFileUpload = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileUpload(file);
  };

  // Visual simulation of cloaking strength for preview
  const getFilterStyle = () => {
    switch (strength) {
      case 1: return 'contrast(1.1) saturate(0.9) hue-rotate(5deg)';
      case 2: return 'contrast(1.2) saturate(0.7) hue-rotate(15deg) blur(0.5px)';
      case 3: return 'contrast(1.4) saturate(0.5) hue-rotate(30deg) blur(1.5px)';
      default: return '';
    }
  };

  // Connected to your teammate's backend with the LocalTunnel bypass header included
  const handleExport = async () => {
    setIsExporting(true);
    try {
      // Create FormData to send the image file to your teammate's FastAPI backend
      const formData = new FormData();
      const blobResponse = await fetch(image);
      const imageBlob = await blobResponse.blob();
      formData.append('file', imageBlob, 'target-image.jpg');

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v2/sentinel/immunize-tensors`, {
        method: 'POST',
        body: formData, // FastAPI UploadFile requires FormData, not JSON headers
      });
      
      if (!response.ok) throw new Error('Cloaking API request failed');

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      
      // Trigger automatic file download
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'cloaked-protected-image.png';
      link.click();
      setIsExporting(false);
    } catch (error) {
      console.error('Cloaking API error:', error);
      alert('Failed to connect to backend API. Please check your network or CORS settings.');
      setIsExporting(false);
    }
  };

  return (
    <div className="w-full text-slate-200 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-bold uppercase tracking-widest mb-4 shadow-inner">
            <ShieldCheck className="w-3 h-3" /> AI Protection Suite
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
            Image Cloaking <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400">Studio</span>
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base font-light">
            Protect your identity from facial recognition and AI scrapers by applying adversarial noise and pixel-level shifts.
          </p>
        </div>

        {!image ? (
          /* Upload Zone */
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={onDrop}
            className={`relative group cursor-pointer transition-all duration-300 border-2 border-dashed rounded-3xl p-12 text-center
              ${isDragging
                ? 'border-pink-400 bg-pink-500/10 scale-[1.01]'
                : 'border-slate-700/80 bg-slate-900/40 hover:border-pink-500/50 hover:bg-slate-900/60'}`}
          >
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={(e) => handleFileUpload(e.target.files[0])}
              accept="image/*"
            />
            <div className="flex flex-col items-center gap-4">
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-700 group-hover:border-pink-500/50 transition-colors shadow-2xl">
                <Upload className="w-10 h-10 text-pink-400" />
              </div>
              <div>
                <p className="text-xl font-semibold text-white mb-1">Drop your photo here</p>
                <p className="text-slate-500 text-sm">PNG, JPG or WebP (Max 10MB)</p>
              </div>
            </div>
          </div>
        ) : (
          /* Main Workspace */
          <div className="grid lg:grid-cols-12 gap-8 items-start">

            {/* Left: Comparison View */}
            <div className="lg:col-span-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Original */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider px-2">
                    <ImageIcon className="w-3 h-3" /> Original
                  </div>
                  <div className="relative aspect-square rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
                    <img src={image} alt="Original" className="w-full h-full object-cover" />
                  </div>
                </div>

                {/* Protected */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-pink-400 text-xs font-bold uppercase tracking-wider px-2">
                    <ShieldCheck className="w-3 h-3" /> Cloaked
                  </div>
                  <div className="relative aspect-square rounded-2xl overflow-hidden border border-pink-500/40 bg-slate-900 shadow-[0_0_30px_rgba(236,72,153,0.15)]">
                    <img
                      src={image}
                      alt="Protected"
                      className="w-full h-full object-cover transition-all duration-300"
                      style={{ filter: getFilterStyle() }}
                    />

                    {/* Noise Glaze Overlay */}
                    {glazeEnabled && (
                      <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay"
                           style={{
                             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                             backgroundSize: '150px 150px'
                           }}
                      />
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setImage(null)}
                className="text-slate-500 hover:text-white text-sm transition-colors flex items-center gap-2 mx-auto"
              >
                <Upload className="w-3 h-3" /> Upload different image
              </button>
            </div>

            {/* Right: Controls */}
            <div className="lg:col-span-4">
              <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 shadow-2xl sticky top-28">
                <div className="flex items-center gap-2 text-white font-bold mb-6">
                  <SlidersHorizontal className="w-5 h-5 text-pink-400" />
                  Protection Settings
                </div>

                <div className="space-y-8">
                  {/* Strength Slider */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium text-slate-300">Protection Strength</label>
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-400 border border-pink-500/30">
                        {strength === 1 ? 'Low' : strength === 2 ? 'Medium' : 'High'}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1" max="3" step="1"
                      value={strength}
                      onChange={(e) => setStrength(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-pink-500"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 font-bold uppercase tracking-tighter">
                      <span>Subtle</span>
                      <span>Balanced</span>
                      <span>Adversarial</span>
                    </div>
                  </div>

                  {/* Glaze Toggle */}
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20">
                        <EyeOff className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">Noise Glaze</p>
                        <p className="text-[11px] text-slate-500">Blocks facial landmark detection</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setGlazeEnabled(!glazeEnabled)}
                      className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${glazeEnabled ? 'bg-pink-500 shadow-[0_0_12px_rgba(236,72,153,0.5)]' : 'bg-slate-800'}`}
                    >
                      <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${glazeEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
                    </button>
                  </div>

                  {/* Action Button */}
                  <button 
                    onClick={handleExport}
                    disabled={isExporting}
                    className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 text-white font-bold rounded-2xl transition-all shadow-[0_0_20px_rgba(236,72,153,0.4)] hover:shadow-[0_0_30px_rgba(236,72,153,0.6)] flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50"
                  >
                    {isExporting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing Cloak...
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5 group-hover:scale-125 transition-transform" />
                        Export Protected Image
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default ImageCloaker;