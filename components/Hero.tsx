import React from 'react';
import { Camera, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="text-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl opacity-20 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-10 right-10 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="relative z-10">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4 tracking-tight">
          AI 瞬息写真馆
        </h1>
        <p className="mt-4 text-xl text-slate-400 max-w-2xl mx-auto">
          上传一张照片，一键生成六种风格大片。
          <br />
          <span className="text-sm text-slate-500 flex items-center justify-center gap-2 mt-2">
            <Sparkles size={14} /> Powered by Gemini Nano Banana
          </span>
        </p>
      </div>
    </div>
  );
};