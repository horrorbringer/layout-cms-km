'use client';

import React, { useEffect, useState } from 'react';
import { Palette, Check } from 'lucide-react';

// Theme definitions - 5 attractive options
const themes = [
    {
        id: 'corporate',
        name: 'Corporate',
        description: 'Classic Navy & Red',
        colors: {
            navy: '#2D3E6F',
            navyLight: '#4A5B8C',
            navyLighter: '#6B7AAA',
            navySubtle: '#8B97B8',
            red: '#ED1C24',
            redHover: '#D91B22',
        }
    },
    {
        id: 'executive',
        name: 'Executive',
        description: 'Premium Navy & Gold',
        colors: {
            navy: '#1E2A4A',
            navyLight: '#2D3D5E',
            navyLighter: '#3D4D6E',
            navySubtle: '#7A8599',
            red: '#C5A059',
            redHover: '#B08D45',
        }
    },
    {
        id: 'modern',
        name: 'Modern',
        description: 'Deep Blue & Teal',
        colors: {
            navy: '#0F2942',
            navyLight: '#1A3A55',
            navyLighter: '#2A4A65',
            navySubtle: '#6B8299',
            red: '#0891B2',
            redHover: '#0E7490',
        }
    },
    {
        id: 'sunset',
        name: 'Sunset',
        description: 'Warm Charcoal & Orange',
        colors: {
            navy: '#292524',
            navyLight: '#44403C',
            navyLighter: '#57534E',
            navySubtle: '#A8A29E',
            red: '#F97316',
            redHover: '#EA580C',
        }
    },
    {
        id: 'royal',
        name: 'Royal',
        description: 'Deep Purple & Violet',
        colors: {
            navy: '#1E1B4B',
            navyLight: '#312E81',
            navyLighter: '#4338CA',
            navySubtle: '#A5B4FC',
            red: '#8B5CF6',
            redHover: '#7C3AED',
        }
    },
    {
        id: 'lightblue',
        name: 'Light Blue',
        description: 'Navy & Sky Blue (Logo Match)',
        colors: {
            navy: '#1a1a2e',
            navyLight: '#2d2d44',
            navyLighter: '#4a4a6a',
            navySubtle: '#6b7280',
            red: '#5B8DEE',
            redHover: '#4A7CD6',
        }
    }
];

export default function ThemeSwitcher() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTheme, setActiveTheme] = useState('corporate');

    // Load saved theme on mount
    useEffect(() => {
        const savedTheme = localStorage.getItem('kimmex-theme');
        if (savedTheme && themes.find(t => t.id === savedTheme)) {
            setActiveTheme(savedTheme);
            applyTheme(savedTheme);
        }
    }, []);

    const applyTheme = (themeId: string) => {
        const theme = themes.find(t => t.id === themeId);
        if (!theme) return;

        const root = document.documentElement;
        root.style.setProperty('--color-titan-navy', theme.colors.navy);
        root.style.setProperty('--color-titan-navy-light', theme.colors.navyLight);
        root.style.setProperty('--color-titan-navy-lighter', theme.colors.navyLighter);
        root.style.setProperty('--color-titan-navy-subtle', theme.colors.navySubtle);
        root.style.setProperty('--color-titan-red', theme.colors.red);
        root.style.setProperty('--color-titan-red-hover', theme.colors.redHover);
    };

    const handleThemeChange = (themeId: string) => {
        setActiveTheme(themeId);
        applyTheme(themeId);
        localStorage.setItem('kimmex-theme', themeId);
    };

    return (
        <div className="fixed bottom-6 right-6 z-[200] font-sans">
            {/* Theme Panel */}
            <div
                className={`absolute bottom-16 right-0 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 ${
                    isOpen
                        ? 'opacity-100 translate-y-0 pointer-events-auto'
                        : 'opacity-0 translate-y-4 pointer-events-none'
                }`}
                style={{ width: '300px' }}
            >
                {/* Header */}
                <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-100">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">
                        Choose Theme
                    </h3>
                </div>

                {/* Theme Options */}
                <div className="p-2 max-h-[400px] overflow-y-auto">
                    {themes.map((theme) => (
                        <button
                            key={theme.id}
                            onClick={() => handleThemeChange(theme.id)}
                            className={`flex items-center gap-3 w-full p-3 rounded-lg transition-all text-left group ${
                                activeTheme === theme.id
                                    ? 'bg-gray-100'
                                    : 'hover:bg-gray-50'
                            }`}
                            style={
                                activeTheme === theme.id 
                                    ? { boxShadow: `0 0 0 2px ${theme.colors.red}` } 
                                    : undefined
                            }
                        >
                            {/* Color Preview - Gradient Style */}
                            <div 
                                className="w-10 h-10 rounded-lg shadow-md border border-black/10 flex-shrink-0"
                                style={{ 
                                    background: `linear-gradient(135deg, ${theme.colors.navy} 50%, ${theme.colors.red} 50%)` 
                                }}
                            />

                            {/* Theme Info */}
                            <div className="flex-1 min-w-0">
                                <div className="font-bold text-sm text-gray-800">
                                    {theme.name}
                                </div>
                                <div className="text-xs text-gray-500 truncate">
                                    {theme.description}
                                </div>
                            </div>

                            {/* Active Indicator */}
                            {activeTheme === theme.id && (
                                <div
                                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm"
                                    style={{ background: theme.colors.red }}
                                >
                                    <Check size={14} className="text-white" />
                                </div>
                            )}
                        </button>
                    ))}
                </div>

                {/* Footer */}
                <div className="px-4 py-2 bg-gray-50 border-t border-gray-100">
                    <p className="text-[10px] text-gray-400 text-center">
                        Theme preference is saved automatically
                    </p>
                </div>
            </div>

            {/* Toggle Button - Animated */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-4 rounded-full shadow-xl transition-all duration-300 border-2 ${
                    isOpen
                        ? 'bg-gray-800 text-white border-gray-700 rotate-180 scale-90'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:scale-110 hover:shadow-2xl'
                }`}
                aria-label="Toggle theme switcher"
            >
                <Palette size={22} />
            </button>
        </div>
    );
}
