import React from 'react';
import { Download, RefreshCw, AlertCircle } from 'lucide-react';
import { PhotoStyle, GeneratedImage } from '../types';

interface ResultCardProps {
  style: PhotoStyle;
  data: GeneratedImage;
  onRetry: (styleId: string) => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({ style, data, onRetry }) => {
  const { imageUrl, loading, error } = data;

  const handleDownload = () => {
    if (!imageUrl) return;
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `ai-studio-${style.id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-slate-800 rounded-2xl overflow-hidden shadow-lg border border-slate-700/50 flex flex-col h-full group">
      
      {/* Header */}
      <div className="p-4 border-b border-slate-700/50 bg-slate-900/30">
        <h3 className="text-lg font-bold text-slate-100">{style.title}</h3>
        <p className="text-xs text-slate-400 truncate">{style.description}</p>
      </div>

      {/* Image Container */}
      <div className="relative aspect-[3/4] bg-slate-900 w-full overflow-hidden">
        {loading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3 p-6">
            <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-purple-400 font-medium animate-pulse">
              正在生成...
            </p>
            <p className="text-xs text-slate-500 text-center px-4">
              AI 正在构思 {style.title} 风格
            </p>
          </div>
        ) : error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <AlertCircle className="w-10 h-10 text-red-400 mb-2" />
            <p className="text-sm text-slate-300 mb-4 px-2 break-words w-full">
              {error || '生成失败'}
            </p>
            <button 
              onClick={() => onRetry(style.id)}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-xs rounded-full transition-colors flex items-center gap-2"
            >
              <RefreshCw size={12} /> 重试
            </button>
          </div>
        ) : imageUrl ? (
          <>
            <img 
              src={imageUrl} 
              alt={style.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Overlay Actions */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-[2px]">
              <button 
                onClick={handleDownload}
                className="p-3 bg-white text-slate-900 rounded-full hover:bg-purple-50 hover:text-purple-600 transition-all transform hover:scale-110 shadow-xl"
                title="下载原图"
              >
                <Download size={20} />
              </button>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-slate-600">
             <span className="text-sm">等待开始...</span>
          </div>
        )}
      </div>
    </div>
  );
};