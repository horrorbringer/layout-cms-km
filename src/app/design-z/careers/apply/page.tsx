'use client';

import React, { useState } from 'react';
import { ArrowLeft, Upload, Send } from 'lucide-react';
import Link from 'next/link';

import { useLanguage } from '../../context/LanguageContext';

export default function GeneralApplicationPage() {
    const { t, language, fontClassName } = useLanguage();
    // Form State
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        cv: null as File | null,
        interest: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [cvUrl, setCvUrl] = useState('');

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const uploadData = new FormData();
            uploadData.append('file', file);
            const res = await fetch('/api/cms/upload', { method: 'POST', body: uploadData });
            const data = await res.json();
            if (data.url) {
                setCvUrl(data.url);
                setFormData(prev => ({ ...prev, cv: file }));
            }
        } catch (err) {
            setSubmitError('Failed to upload CV');
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError('');

        try {
            const response = await fetch('/api/careers/apply', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    jobId: 'general',
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    phone: formData.phone,
                    cvUrl: cvUrl,
                    coverLetter: formData.interest
                })
            });

            if (!response.ok) throw new Error('Submission failed');

            setIsSubmitted(true);
        } catch (err) {
            setSubmitError('Failed to submit application. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={`bg-white min-h-screen text-titan-navy relative ${fontClassName}`}>
            {/* --- HEADER BACKGROUND SPACER --- */}
            <div className="absolute top-0 left-0 w-full h-32 bg-titan-navy z-0"></div>

            {/* --- HERO --- */}
            <section className="pt-40 pb-16 px-6 max-w-[800px] mx-auto relative z-10 text-center border-b border-gray-100">
                <Link href="/design-z/careers" className="inline-flex items-center gap-2 text-titan-navy-subtle hover:text-titan-red transition-colors font-bold uppercase tracking-widest text-xs mb-8">
                    <ArrowLeft size={14} /> {t('Back to Careers')}
                </Link>
                <h1 className="text-4xl md:text-5xl font-black text-titan-navy mb-6">{t('General Application')}</h1>
                <p className="text-lg text-titan-navy-subtle leading-relaxed">
                    {t('General Application Sub')}
                </p>
            </section>

            {/* --- CONTENT --- */}
            <div className="max-w-[800px] mx-auto px-6 py-16">

                {/* --- APPLY NOW FORM --- */}
                <div className="bg-white border border-gray-200 shadow-xl rounded-xl p-8 md:p-12 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-titan-red"></div>
                    {isSubmitted ? (
                        <div className="text-center py-10 space-y-6">
                            <h3 className="text-2xl font-black text-titan-navy">{t('Application Sent')}</h3>
                            <p className="text-titan-navy-subtle">Thank you for your interest. We will review your application and get back to you soon.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-titan-navy mb-2">{t('First Name')}</label>
                                    <input type="text" value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-sm p-3 text-titan-navy focus:border-titan-red focus:outline-none transition-colors" placeholder={language === 'kh' ? 'ឧ. សុខ' : 'John'} required />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-titan-navy mb-2">{t('Last Name')}</label>
                                    <input type="text" value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-sm p-3 text-titan-navy focus:border-titan-red focus:outline-none transition-colors" placeholder={language === 'kh' ? 'ឧ. ដារ៉ា' : 'Doe'} required />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-titan-navy mb-2">{t('Email Address')}</label>
                                    <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-sm p-3 text-titan-navy focus:border-titan-red focus:outline-none transition-colors" placeholder="john@example.com" required />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-titan-navy mb-2">{t('Phone Number required')}</label>
                                    <input type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-sm p-3 text-titan-navy focus:border-titan-red focus:outline-none transition-colors" placeholder="+855 ..." required />
                                </div>
                            </div>

                            <div className="mb-8">
                                <label className="block text-xs font-bold uppercase tracking-widest text-titan-navy mb-2">{t('Area of Interest')}</label>
                                <input type="text" value={formData.interest} onChange={e => setFormData({ ...formData, interest: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-sm p-3 text-titan-navy focus:border-titan-red focus:outline-none transition-colors" placeholder={language === 'kh' ? 'ឧ. គ្រប់គ្រងគម្រោង, វិស្វកម្ម...' : 'e.g. Project Management, Engineering...'} required />
                            </div>

                            <div className="mb-10">
                                <label className="block text-xs font-bold uppercase tracking-widest text-titan-navy mb-2">{t('Resume / CV')}</label>
                                <div className={`border-2 border-dashed ${cvUrl ? 'border-green-300' : 'border-gray-300'} rounded-lg p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer relative`}>
                                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileUpload} accept=".pdf,.doc,.docx" disabled={isUploading} />
                                    <Upload className={`mx-auto mb-3 ${cvUrl ? 'text-green-500' : 'text-titan-navy-subtle'}`} size={32} />
                                    <p className="text-sm font-bold text-titan-navy">
                                        {isUploading ? 'Uploading...' : cvUrl ? 'CV Uploaded' : t('Click to Upload or Drag & Drop')}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">{t('PDF, DOCX up to 5MB')}</p>
                                </div>
                            </div>

                            {submitError && (
                                <p className="text-titan-red text-xs font-bold mb-4 text-center">{submitError}</p>
                            )}

                            <button disabled={isSubmitting || isUploading} type="submit" className="w-full bg-titan-navy text-white font-bold uppercase tracking-widest py-4 rounded-sm hover:bg-titan-red transition-all shadow-lg flex items-center justify-center gap-2">
                                {isSubmitting ? 'Submitting...' : t('Submit Application')} <Send size={16} />
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
