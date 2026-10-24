import React, { useState } from 'react';
import { Upload, ShieldCheck, AlertTriangle, MapPin, Cpu, FileSearch, Loader2, X } from 'lucide-react';

const MetadataInspector = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file.');
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setAnalysisResult(null);
    setError(null);

    // Automatically trigger audit
    await auditImage(file);
  };

  const auditImage = async (file) => {
    setIsAnalyzing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v2/sentinel/audit-binary`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to audit binary telemetry.');
      }

      const data = await response.json();
      setAnalysisResult(data);
    } catch (err) {
      console.error('Metadata Audit Error:', err);
      setError('Could not connect to the telemetry engine or parse image metadata.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearImage = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setAnalysisResult(null);
    setError(null);
  };

  return (
    <div className="w-full text-slate-200 font-sans">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-bold uppercase tracking-widest mb-3 shadow-inner">
            <FileSearch className="w-3 h-3" /> Privacy Audit
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
            Metadata <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400">Inspector</span>
          </h1>
          <p className="text-slate-400 max-w-lg mx-auto text-sm font-light">
            Discover hidden telemetry embedded in your photos. See exactly what platforms and trackers can extract from your location and device.
          </p>
        </div>

        {!previewUrl ? (
          /* Upload Box */
          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-8 md:p-12 shadow-2xl text-center">
            <div className="relative group cursor-pointer border-2 border-dashed border-slate-700/80 rounded-2xl p-10 bg-slate-950/50 hover:border-pink-500/50 transition-all">
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleFileChange}
                accept="image/*"
              />
              <div className="flex flex-col items-center gap-3">
                <div className="p-4 bg-pink-500/10 text-pink-400 rounded-full border border-pink-500/20 shadow-lg">
                  <Upload className="w-6 h-6" />
                </div>
                <h3 className="text-base font-semibold text-white">Upload photo for audit</h3>
                <p className="text-xs text-slate-400">We analyze EXIF, GPS telemetry, and perceptual hashes securely.</p>
              </div>
            </div>
          </div>
        ) : (
          /* Results View */
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Left: Image Preview & Status */}
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 shadow-2xl flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-mono text-slate-400 truncate max-w-[200px]">{selectedFile?.name}</span>
                  <button onClick={clearImage} className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-black/40 aspect-video flex items-center justify-center mb-4">
                  <img src={previewUrl} alt="Audit Target" className="max-h-full max-w-full object-contain" />
                  {isAnalyzing && (
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center gap-2 text-pink-400 font-medium text-xs">
                      <Loader2 className="w-6 h-6 animate-spin" />
                      Parsing Telemetry Vectors...
                    </div>
                  )}
                </div>
              </div>

              {analysisResult && (
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Vulnerability Score:</span>
                    <span className={`font-bold font-mono px-2 py-0.5 rounded ${analysisResult.vulnerability_index > 50 ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'}`}>
                      {analysisResult.vulnerability_index}/100
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Perceptual Hash:</span>
                    <span className="font-mono text-[10px] text-slate-300">{analysisResult.perceptual_hash}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Detailed Telemetry Breakdown */}
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 shadow-2xl flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-pink-400" /> Extracted Metadata Telemetry
                </h3>

                {error && (
                  <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-xl mb-4">
                    {error}
                  </div>
                )}

                {analysisResult?.metadata_telemetry ? (
                  <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                    <div className={`p-3 rounded-xl border text-xs flex items-center justify-between ${
                      analysisResult.metadata_telemetry.status === 'EXPOSED' 
                        ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' 
                        : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                    }`}>
                      <span className="font-bold">Status: {analysisResult.metadata_telemetry.status}</span>
                      <span>{analysisResult.metadata_telemetry.status === 'EXPOSED' ? <AlertTriangle className="w-4 h-4 inline" /> : <ShieldCheck className="w-4 h-4 inline" />}</span>
                    </div>

                    {analysisResult.metadata_telemetry.payload && typeof analysisResult.metadata_telemetry.payload === 'object' ? (
                      Object.entries(analysisResult.metadata_telemetry.payload).map(([key, value]) => (
                        <div key={key} className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl text-xs space-y-1">
                          <p className="text-slate-400 font-mono text-[10px] uppercase">{key}</p>
                          <p className="text-slate-200 font-mono break-all">
                            {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-slate-400 italic p-4 text-center">
                        {analysisResult.metadata_telemetry.message || "No telemetry vectors discovered."}
                      </p>
                    )}
                  </div>
                ) : !isAnalyzing && !error ? (
                  <div className="text-center py-16 text-slate-500 text-xs">
                    Upload an image to run deep telemetry extraction.
                  </div>
                ) : null}
              </div>

              <button
                onClick={clearImage}
                className="mt-6 w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-bold text-xs transition-all border border-slate-700"
              >
                Inspect Another Image
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default MetadataInspector;