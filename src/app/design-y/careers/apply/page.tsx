'use client';

import React, { useState } from 'react';
import { ArrowLeft, Upload, Send } from 'lucide-react';
import Link from 'next/link';

export default function GeneralApplicationPage() {
    // Form State
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        cv: null as File | null,
        interest: ''
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData({ ...formData, cv: e.target.files[0] });
        }
    };

    return (
        <div className="bg-white min-h-screen font-sans text-titan-navy relative">
            {/* --- HEADER BACKGROUND SPACER --- */}
            <div className="absolute top-0 left-0 w-full h-32 bg-titan-navy z-0"></div>

            {/* --- HERO --- */}
            <section className="pt-40 pb-16 px-6 max-w-[800px] mx-auto relative z-10 text-center border-b border-gray-100">
                <Link href="/design-y/careers" className="inline-flex items-center gap-2 text-titan-navy-subtle hover:text-titan-red transition-colors font-bold uppercase tracking-widest text-xs mb-8">
                    <ArrowLeft size={14} /> Back to Careers
                </Link>
                <h1 className="text-4xl md:text-5xl font-black text-titan-navy mb-6">General Application</h1>
                <p className="text-lg text-titan-navy-subtle leading-relaxed">
                    Don't see a role that fits? We are always looking for exceptional talent. Submit your CV and let us know how you can contribute to Kimmex.
                </p>
            </section>

            {/* --- CONTENT --- */}
            <div className="max-w-[800px] mx-auto px-6 py-16">

                {/* --- APPLY NOW FORM --- */}
                <div className="bg-white border border-gray-200 shadow-xl rounded-xl p-8 md:p-12 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-titan-red"></div>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-titan-navy mb-2">First Name *</label>
                                <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-sm p-3 text-titan-navy focus:border-titan-red focus:outline-none transition-colors" placeholder="John" required />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-titan-navy mb-2">Last Name *</label>
                                <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-sm p-3 text-titan-navy focus:border-titan-red focus:outline-none transition-colors" placeholder="Doe" required />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-titan-navy mb-2">Email Address *</label>
                                <input type="email" className="w-full bg-gray-50 border border-gray-200 rounded-sm p-3 text-titan-navy focus:border-titan-red focus:outline-none transition-colors" placeholder="john@example.com" required />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-titan-navy mb-2">Phone Number *</label>
                                <input type="tel" className="w-full bg-gray-50 border border-gray-200 rounded-sm p-3 text-titan-navy focus:border-titan-red focus:outline-none transition-colors" placeholder="+855 ..." required />
                            </div>
                        </div>

                        <div className="mb-8">
                            <label className="block text-xs font-bold uppercase tracking-widest text-titan-navy mb-2">Area of Interest / Expertise *</label>
                            <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-sm p-3 text-titan-navy focus:border-titan-red focus:outline-none transition-colors" placeholder="e.g. Project Management, Engineering, HR..." required />
                        </div>

                        <div className="mb-10">
                            <label className="block text-xs font-bold uppercase tracking-widest text-titan-navy mb-2">Resume / CV *</label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
                                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
                                <Upload className="mx-auto text-titan-navy-subtle mb-3" size={32} />
                                <p className="text-sm font-bold text-titan-navy">
                                    {formData.cv ? formData.cv.name : 'Click to Upload or Drag & Drop'}
                                </p>
                                <p className="text-xs text-gray-400 mt-1">PDF, DOCX up to 5MB</p>
                            </div>
                        </div>

                        <button className="w-full bg-titan-navy text-white font-bold uppercase tracking-widest py-4 rounded-sm hover:bg-titan-red transition-all shadow-lg flex items-center justify-center gap-2">
                            Submit General Application <Send size={16} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
