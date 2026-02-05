'use client';

import React from 'react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="pt-20 md:pt-32 pb-12 px-6 md:px-12 bg-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 mb-20">
                <div>
                    <h2 className="text-5xl md:text-8xl font-bold tracking-tight mb-8 text-titan-navy">
                        KIMMEX
                    </h2>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button className="bg-titan-navy text-white px-8 py-4 rounded-full font-bold hover:bg-titan-red transition-colors shadow-lg shadow-titan-navy/20">Start Project</button>
                        <button className="bg-gray-100 text-titan-navy px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition-colors">Contact Us</button>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 text-sm text-gray-500">
                    <div>
                        <h4 className="font-bold text-titan-navy uppercase tracking-widest mb-4">Office</h4>
                        <p>Kim Mex Tower, L5</p>
                        <p>St. 590, Phnom Penh</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-titan-navy uppercase tracking-widest mb-4">Connect</h4>
                        <p>+855 23 999 999</p>
                        <p>info@kimmex.com</p>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold uppercase tracking-widest text-gray-400">
                <p>© 2026 Kimmex Construction</p>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-titan-navy">Privacy</a>
                    <a href="#" className="hover:text-titan-navy">Terms</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
