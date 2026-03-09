'use client';

import React, { useState, useRef } from 'react';
import { Upload, X, ImageIcon, Loader2 } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadProps {
    value: string;
    onChange: (url: string) => void;
    label?: string;
    description?: string;
}

export default function ImageUpload({ value, onChange, label, description }: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);

            const res = await fetch('/api/cms/upload', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) throw new Error('Upload failed');

            const data = await res.json();
            onChange(data.url);
        } catch (error) {
            console.error('Upload Error:', error);
            alert('Failed to upload image. Please try again.');
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    return (
        <div className="space-y-1.5 w-full">
            {label && <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">{label}</label>}

            <div className="flex items-start gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                {/* Preview Area */}
                <div className="relative w-24 h-24 bg-white border border-slate-200 rounded-lg overflow-hidden shrink-0 group">
                    {value ? (
                        <>
                            <Image src={value} alt="Preview" fill className="object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <button
                                    type="button"
                                    onClick={() => onChange('')}
                                    className="p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300">
                            <ImageIcon size={32} />
                            <span className="text-[10px] uppercase font-bold tracking-tighter mt-1">NO PHOTO</span>
                        </div>
                    )}

                    {isUploading && (
                        <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                            <Loader2 size={24} className="text-indigo-600 animate-spin" />
                        </div>
                    )}
                </div>

                {/* Upload Controls */}
                <div className="flex-1 flex flex-col justify-center min-h-[96px]">
                    {description && <p className="text-[10px] text-slate-400 mb-3">{description}</p>}

                    <div className="flex gap-2">
                        <button
                            type="button"
                            disabled={isUploading}
                            onClick={() => fileInputRef.current?.click()}
                            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 transition-all shadow-sm active:scale-95 disabled:opacity-50"
                        >
                            <Upload size={14} />
                            {isUploading ? 'Uploading...' : 'Choose File'}
                        </button>

                        <input
                            type="file"
                            hidden
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                        />

                        {/* URL Manual Input Toggle would go here if needed, but keeping it simple */}
                    </div>

                    {!value && !isUploading && (
                        <p className="text-[10px] text-slate-400 mt-2 italic">Standard square aspect ratio recommended.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
