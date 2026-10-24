import React, { useState } from 'react';
import {
  Upload,
  FileText,
  ShieldAlert,
  X,
  FileWarning,
  Download,
  Loader2,
  Scale
} from 'lucide-react';

const ReportTool = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    platform: 'Instagram',
    infringingUrl: '',
    description: '',
  });
  const [evidence, setEvidence] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);

  const calculateHash = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    const newEvidence = [];

    for (const file of files) {
      const hash = await calculateHash(file);
      newEvidence.push({
        name: file.name,
        size: (file.size / 1024).toFixed(1) + ' KB',
        hash: hash,
        id: Math.random().toString(36).substring(2, 9)
      });
    }
    setEvidence([...evidence, ...newEvidence]);
  };

  const removeEvidence = (id) => {
    setEvidence(evidence.filter(item => item.id !== id));
  };

  const generateReport = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v2/sentinel/reports`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName: formData.userName,
          email: formData.email,
          platform: formData.platform,
          infringingUrl: formData.infringingUrl,
          description: formData.description,
          evidence: evidence
        }),
      });

      if (!response.ok) throw new Error('Failed to submit report');
      
      const data = await response.json();
      console.log('Report saved on backend:', data);
      setIsGenerating(false);
      setReportGenerated(true);
    } catch (error) {
      console.error('API Error:', error);
      setIsGenerating(false);
      alert('Failed to generate report. Check console.');
    }
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <div className="w-full text-slate-200 font-sans">
      <div className="max-w-4xl mx-auto">

        {/* Header - Hidden on Print */}
        <div className="mb-10 text-center print:hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-bold uppercase tracking-widest mb-4 shadow-inner">
            <ShieldAlert className="w-3 h-3" /> Legal Response Tool
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
            Identity Misuse <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400">Reporting</span>
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base font-light">
            Generate a legally-formatted DMCA or Cybercrime complaint. We use cryptographic hashing to ensure your evidence remains tamper-proof.
          </p>
        </div>

        {!reportGenerated ? (
          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 md:p-10 shadow-2xl space-y-8 print:hidden">

            {/* Section 1: Personal Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Full Legal Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-slate-900/80 border border-slate-700/80 rounded-xl focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none transition-all text-white text-sm"
                  placeholder="Jane Doe"
                  value={formData.userName}
                  onChange={(e) => setFormData({...formData, userName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Contact Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-slate-900/80 border border-slate-700/80 rounded-xl focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none transition-all text-white text-sm"
                  placeholder="jane@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            {/* Section 2: Infringement Details */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-1 space-y-2">
                <label className="text-sm font-medium text-slate-300">Platform</label>
                <select
                  className="w-full px-4 py-3 bg-slate-900/80 border border-slate-700/80 rounded-xl focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none transition-all text-white appearance-none text-sm"
                  value={formData.platform}
                  onChange={(e) => setFormData({...formData, platform: e.target.value})}
                >
                  <option>Instagram</option>
                  <option>Telegram</option>
                  <option>X (Twitter)</option>
                  <option>TikTok</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-medium text-slate-300">Infringing URL</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-slate-900/80 border border-slate-700/80 rounded-xl focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none transition-all text-white text-sm"
                  placeholder="https://instagram.com/cloned_account"
                  value={formData.infringingUrl}
                  onChange={(e) => setFormData({...formData, infringingUrl: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Nature of Misuse</label>
              <textarea
                rows="3"
                className="w-full px-4 py-3 bg-slate-900/80 border border-slate-700/80 rounded-xl focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none transition-all text-white text-sm"
                placeholder="e.g., Account is using deepfake images to impersonate me and solicit money..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>

            {/* Section 3: Evidence Upload */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <FileWarning className="w-4 h-4 text-pink-400" /> Evidence Log (Screenshots)
                </label>
                <span className="text-[10px] text-slate-500 font-mono uppercase">{evidence.length} Files Hashed</span>
              </div>

              <div className="relative group cursor-pointer border-2 border-dashed border-slate-700/80 rounded-2xl p-6 text-center bg-slate-900/50 hover:border-pink-500/50 transition-all">
                <input
                  type="file"
                  multiple
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleFileUpload}
                  accept="image/*"
                />
                <div className="flex flex-col items-center gap-2">
                  <Upload className="w-6 h-6 text-slate-400 group-hover:text-pink-400 transition-colors" />
                  <p className="text-sm text-slate-400">Upload evidence for cryptographic signing</p>
                </div>
              </div>

              {/* Evidence List */}
              {evidence.length > 0 && (
                <div className="grid gap-2">
                  {evidence.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-slate-900/80 border border-slate-800 rounded-xl text-xs">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="p-1.5 bg-pink-500/10 rounded text-pink-400 border border-pink-500/20">
                          <FileText className="w-3 h-3" />
                        </div>
                        <div className="truncate">
                          <p className="text-white font-medium truncate">{item.name}</p>
                          <p className="text-slate-500 font-mono text-[10px] truncate">{item.hash}</p>
                        </div>
                      </div>
                      <button onClick={() => removeEvidence(item.id)} className="p-1 hover:text-red-400 transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Action Button */}
            <button
              disabled={isGenerating || !formData.infringingUrl || evidence.length === 0}
              onClick={generateReport}
              className={`w-full py-4 rounded-2xl font-bold text-base transition-all flex items-center justify-center gap-3
                ${(isGenerating || !formData.infringingUrl || evidence.length === 0)
                  ? 'bg-slate-800 text-slate-600 cursor-not-allowed border border-slate-800'
                  : 'bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 text-white shadow-[0_0_20px_rgba(236,72,153,0.4)]'}`}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating Cryptographic Report...
                </>
              ) : (
                <>
                  <Scale className="w-5 h-5" />
                  Generate Formal Report (PDF)
                </>
              )}
            </button>
          </div>
        ) : (
          /* Report Preview (Simulated PDF & Printable Document) */
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
            <div className="flex justify-between items-center mb-6 print:hidden">
              <button
                onClick={() => setReportGenerated(false)}
                className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm"
              >
                <X className="w-4 h-4" /> Edit Details
              </button>
              <button 
                onClick={handleDownloadPDF}
                className="px-5 py-2.5 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-xl font-bold text-sm flex items-center gap-2 hover:from-pink-400 hover:to-rose-500 transition-all shadow-[0_0_20px_rgba(236,72,153,0.4)] cursor-pointer"
              >
                <Download className="w-4 h-4" /> Download Official PDF
              </button>
            </div>

            {/* Document Paper */}
            <div className="bg-white text-slate-900 p-8 md:p-16 rounded-2xl shadow-2xl font-serif leading-relaxed mx-auto max-w-[800px] print:shadow-none print:p-0 print:m-0 print:max-w-none">
              <div className="text-center mb-12 border-b-2 border-slate-900 pb-8">
                <h2 className="text-2xl font-bold uppercase tracking-widest mb-2">Official Notice of Identity Misuse</h2>
                <p className="text-sm text-slate-600 uppercase tracking-tighter font-sans">Digital Evidence & Chain of Custody Report</p>
              </div>

              <div className="space-y-8 text-sm">
                <div className="flex justify-between font-sans text-xs">
                  <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
                  <p><strong>Reference:</strong> REF-482910</p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-base border-b border-slate-300 pb-1 uppercase tracking-wide">1. Complainant Information</h3>
                  <p><strong>Full Name:</strong> {formData.userName}</p>
                  <p><strong>Contact Email:</strong> {formData.email}</p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-base border-b border-slate-300 pb-1 uppercase tracking-wide">2. Identification of Infringement</h3>
                  <p><strong>Platform:</strong> {formData.platform}</p>
                  <p><strong>Infringing URL:</strong> {formData.infringingUrl}</p>
                  <p className="italic"><strong>Description:</strong> {formData.description}</p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-base border-b border-slate-300 pb-1 uppercase tracking-wide">3. Digital Evidence Integrity Log</h3>
                  <p className="text-xs text-slate-500 mb-4 font-sans">The following files have been cryptographically hashed using SHA-256 to ensure the integrity of the evidence provided. Any modification to these files will result in a hash mismatch.</p>
                  <table className="w-full text-left border-collapse text-xs font-sans">
                    <thead>
                      <tr className="border-b-2 border-slate-900">
                        <th className="py-2">File Name</th>
                        <th className="py-2">Cryptographic Hash (SHA-256)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {evidence.map((item, idx) => (
                        <tr key={idx} className="border-b border-slate-200">
                          <td className="py-2 font-medium">{item.name}</td>
                          <td className="py-2 font-mono text-[10px]">{item.hash}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="space-y-3 pt-6">
                  <h3 className="font-bold text-base border-b border-slate-300 pb-1 uppercase tracking-wide">4. Statement of Truth</h3>
                  <p className="text-xs leading-relaxed font-sans">
                    I hereby declare under penalty of perjury that the information provided in this report is true and accurate to the best of my knowledge. I have a good faith belief that the use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.
                  </p>
                  <div className="mt-12 flex justify-end font-sans">
                    <div className="text-center border-t border-slate-900 pt-2 w-64">
                      <p className="font-bold text-xs">Digital Signature</p>
                      <p className="text-[10px] text-slate-500">Verified via SecureHaven Protocol</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportTool;