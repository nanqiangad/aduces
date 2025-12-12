import React, { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { UploadArea } from './components/UploadArea';
import { ResultCard } from './components/ResultCard';
import { PHOTO_STYLES } from './constants';
import { GeneratedImage, GenerationStatusMap } from './types';
import { generatePhoto, fileToGenerativePart } from './services/gemini';
import { Wand2, User } from 'lucide-react';

const App: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [age, setAge] = useState<string>('');
  const [results, setResults] = useState<GenerationStatusMap>({});
  const [isGeneratingGlobal, setIsGeneratingGlobal] = useState(false);

  // Initialize results state
  useEffect(() => {
    const initialStatus: GenerationStatusMap = {};
    PHOTO_STYLES.forEach(style => {
      initialStatus[style.id] = {
        styleId: style.id,
        imageUrl: null,
        loading: false,
        error: null
      };
    });
    setResults(initialStatus);
  }, []);

  const handleFileSelect = async (file: File) => {
    setSelectedFile(file);
    try {
      const base64 = await fileToGenerativePart(file);
      setBase64Image(base64);
      // Reset results when new file is chosen
      const resetStatus: GenerationStatusMap = {};
      PHOTO_STYLES.forEach(style => {
        resetStatus[style.id] = {
          styleId: style.id,
          imageUrl: null,
          loading: false,
          error: null
        };
      });
      setResults(resetStatus);
    } catch (e) {
      console.error("Failed to process file", e);
      alert("无法处理该图片，请重试");
      setSelectedFile(null);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setBase64Image(null);
    setAge('');
    const resetStatus: GenerationStatusMap = {};
    PHOTO_STYLES.forEach(style => {
      resetStatus[style.id] = {
        styleId: style.id,
        imageUrl: null,
        loading: false,
        error: null
      };
    });
    setResults(resetStatus);
    setIsGeneratingGlobal(false);
  };

  const generateSingleImage = async (styleId: string) => {
    if (!base64Image || !selectedFile) return;

    const style = PHOTO_STYLES.find(s => s.id === styleId);
    if (!style) return;

    setResults(prev => ({
      ...prev,
      [styleId]: { ...prev[styleId], loading: true, error: null }
    }));

    try {
      // Pass age to the generation service
      const imageUrl = await generatePhoto(base64Image, style.prompt, selectedFile.type, age);
      setResults(prev => ({
        ...prev,
        [styleId]: { ...prev[styleId], loading: false, imageUrl }
      }));
    } catch (error: any) {
      let errorMessage = '生成失败';
      // Enhance error message for user
      if (error.message) {
        const msg = error.message.toLowerCase();
        if (msg.includes('429') || msg.includes('quota')) {
          errorMessage = '今日额度已耗尽，请明天再试';
        } else if (msg.includes('503') || msg.includes('overloaded')) {
          errorMessage = '服务繁忙，请稍后重试';
        } else {
          // Truncate very long error messages
          errorMessage = error.message.length > 50 ? error.message.substring(0, 50) + '...' : error.message;
        }
      }
      
      setResults(prev => ({
        ...prev,
        [styleId]: { ...prev[styleId], loading: false, error: errorMessage }
      }));
    }
  };

  const startAllGenerations = async () => {
    if (!base64Image) return;
    setIsGeneratingGlobal(true);

    // Fire all requests essentially in parallel but mapped.
    // In a real production app, we might want a queue to avoid rate limits,
    // but for this demo, we'll trigger them.
    const promises = PHOTO_STYLES.map(style => generateSingleImage(style.id));
    
    await Promise.allSettled(promises);
    setIsGeneratingGlobal(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 selection:bg-purple-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        
        <Hero />

        <div className="flex flex-col items-center">
            <UploadArea 
              onFileSelect={handleFileSelect} 
              selectedFile={selectedFile} 
              onClear={handleClear}
              isGenerating={isGeneratingGlobal}
            />

            {selectedFile && !isGeneratingGlobal && (
              <div className="w-full max-w-sm mb-8 animate-fade-in-up">
                <label htmlFor="age" className="block text-sm font-medium text-slate-400 mb-2 text-center flex items-center justify-center gap-2">
                  <User size={14} /> 设定年龄 (可选)
                </label>
                <div className="relative group">
                  <input
                    type="number"
                    id="age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="例如: 25"
                    min="1"
                    max="100"
                    className="block w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-slate-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none text-center placeholder-slate-600 backdrop-blur-sm group-hover:bg-slate-800"
                  />
                  <div className="absolute inset-0 rounded-xl pointer-events-none border border-white/5"></div>
                </div>
                <p className="text-xs text-slate-500 text-center mt-2">
                  留空则使用原图年龄
                </p>
              </div>
            )}

            {selectedFile && !isGeneratingGlobal && Object.values(results).every((r: GeneratedImage) => !r.imageUrl && !r.loading) && (
              <button
                onClick={startAllGenerations}
                className="mb-12 group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-purple-600 font-lg rounded-full hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-600 ring-offset-slate-900 shadow-[0_0_20px_rgba(147,51,234,0.5)] hover:shadow-[0_0_30px_rgba(147,51,234,0.7)]"
              >
                 <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
                 <span className="relative flex items-center gap-3">
                   <Wand2 className="w-5 h-5 animate-pulse" /> 
                   立即生成全套写真 (Generate All)
                 </span>
              </button>
            )}
        </div>

        {selectedFile && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up">
            {PHOTO_STYLES.map(style => (
              <div key={style.id} className="transition-all duration-500">
                <ResultCard 
                  style={style} 
                  data={results[style.id] || { styleId: style.id, imageUrl: null, loading: false, error: null }} 
                  onRetry={generateSingleImage}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 text-center text-slate-500 text-sm">
        <p>© 2024 AI Photo Studio. Generated with Gemini Nano Banana.</p>
      </footer>
    </div>
  );
};

export default App;