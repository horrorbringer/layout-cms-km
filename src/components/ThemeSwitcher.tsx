'use client';

import React, { useEffect, useState } from 'react';
import { Palette } from 'lucide-react';

export default function ThemeSwitcher() {
    const [isOpen, setIsOpen] = useState(false);

    const themes = [
        { name: 'Royal Gold', navy: '#0A192F', red: '#C5A059' }, // Navy & Gold
        { name: 'Corporate Red', navy: '#0A192F', red: '#E31E24' }, // Navy & Red (Current)
        { name: 'Industrial', navy: '#1a1a1a', red: '#fbbf24' },   // Charcoal & Yellow
        { name: 'Eco/Green', navy: '#0f172a', red: '#10b981' },    // Dark Slate & Green
    ];

    const setTheme = (navy: string, red: string) => {
        const targets = [document.documentElement, document.body];
        console.log('Switching Theme:', { navy, red });

        targets.forEach(target => {
            target.style.setProperty('--color-titan-navy', navy);
            target.style.setProperty('--color-titan-red', red);
            target.style.setProperty('--color-titan-gold', red);
            target.style.setProperty('--color-titan-lightNavy', navy);
        });
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100] font-sans">
            <div className={`bg-white rounded-lg shadow-2xl border border-gray-200 p-4 mb-4 transition-all origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-75 opacity-0 pointer-events-none absolute bottom-0 right-0'}`}>
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Select Accent Color</h3>
                <div className="space-y-2">
                    {themes.map(t => (
                        <button
                            key={t.name}
                            onClick={() => setTheme(t.navy, t.red)}
                            className="flex items-center gap-3 w-full p-2 hover:bg-slate-50 rounded transition-colors text-left"
                        >
                            <div className="flex gap-1">
                                <div className="w-4 h-4 rounded-full" style={{ background: t.navy }}></div>
                                <div className="w-4 h-4 rounded-full" style={{ background: t.red }}></div>
                            </div>
                            <span className="text-sm font-bold text-slate-700">{t.name}</span>
                        </button>
                    ))}
                </div>
            </div>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-white text-slate-800 p-4 rounded-full shadow-xl hover:scale-110 transition-transform border border-gray-200"
            >
                <Palette size={24} />
            </button>
        </div>
    );
}
