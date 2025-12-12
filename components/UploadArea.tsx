import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, X } from 'lucide-react';

interface UploadAreaProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  onClear: () => void;
  isGenerating: boolean;
}

export const UploadArea: React.FC<UploadAreaProps> = ({ onFileSelect, selectedFile, onClear, isGenerating }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Handle file selection via input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  // Handle Drag & Drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!isGenerating) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (isGenerating) return;
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('请上传图片文件');
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    onFileSelect(file);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    onClear();
  };

  return (
    <div className="w-full max-w-md mx-auto mb-12">
      <div
        onClick={() => !selectedFile && fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative group cursor-pointer
          border-2 border-dashed rounded-2xl p-8
          transition-all duration-300 ease-in-out
          flex flex-col items-center justify-center
          bg-slate-800/50 backdrop-blur-sm
          ${isDragging ? 'border-purple-500 bg-slate-800/80 scale-105' : 'border-slate-600 hover:border-slate-500'}
          ${selectedFile ? 'border-solid border-purple-500/50 p-2' : ''}
          ${isGenerating ? 'cursor-not-allowed opacity-80' : ''}
        `}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleInputChange}
          className="hidden"
          accept="image/*"
          disabled={!!selectedFile || isGenerating}
        />

        {selectedFile && previewUrl ? (
          <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden shadow-2xl">
            <img 
              src={previewUrl} 
              alt="Preview" 
              className="w-full h-full object-cover"
            />
            {!isGenerating && (
              <button 
                onClick={handleClear}
                className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-red-500/80 text-white rounded-full transition-colors backdrop-blur-md"
              >
                <X size={16} />
              </button>
            )}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
               <p className="text-white text-sm font-medium truncate">{selectedFile.name}</p>
               <p className="text-xs text-slate-300">原图参考</p>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className={`
              w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center
              bg-slate-700 group-hover:bg-slate-600 transition-colors
              ${isDragging ? 'bg-purple-500/20 text-purple-400' : 'text-slate-400'}
            `}>
              <Upload size={32} />
            </div>
            <h3 className="text-lg font-semibold text-slate-200">点击上传或拖拽图片</h3>
            <p className="text-slate-500 text-sm mt-2 max-w-xs mx-auto">
              支持 JPG, PNG. 建议上传清晰的半身或全身照.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};