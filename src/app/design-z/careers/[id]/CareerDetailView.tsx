'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, MapPin, Briefcase, Clock, CheckCircle, Upload, Send, Share2, Printer, Building, UserCheck, Heart, Sparkles, Award, DollarSign } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

import { Job } from '../../data/jobData';
import { useLanguage, getLocalizedText } from '../../context/LanguageContext';

interface Props {
    job: Job;
}

export default function CareerDetailView({ job }: Props) {
    const { t, language, fontClassName } = useLanguage();

    // Form State
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        cvUrl: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [isUploading, setIsUploading] = useState(false);

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
                setFormData(prev => ({ ...prev, cvUrl: data.url }));
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
                    jobId: job.id,
                    ...formData
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
        <div className={`bg-gray-50 min-h-screen text-titan-navy relative ${fontClassName}`}>
            {/* --- HERO / HEADER --- */}
            <section className="relative h-[60vh] bg-titan-navy flex items-end overflow-hidden pb-12">
                <div className="absolute inset-0">
                    <Image
                        src="/images/projects/Thumbnail-1.jpg"
                        alt="Careers Hero"
                        fill
                        className="object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-titan-navy via-titan-navy/60 to-transparent"></div>
                </div>

                <div className="max-w-[1200px] w-full mx-auto relative z-10 px-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <Link href="/design-z/careers" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors font-bold uppercase tracking-widest text-xs mb-8 hover:-translate-x-1 duration-300">
                            <ArrowLeft size={14} /> {t('Back to Careers')}
                        </Link>

                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                            <div>
                                <h1 className={`font-black mb-6 leading-tight text-white ${language === 'kh' ? 'text-3xl md:text-5xl' : 'text-4xl md:text-6xl'}`}>
                                    {getLocalizedText(job.title, language)}
                                </h1>
                                <div className="flex flex-wrap gap-4 text-sm font-bold uppercase tracking-wide text-white/90">
                                    <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg border border-white/10 backdrop-blur-sm"><Briefcase size={16} className="text-titan-red" /> {t(job.dept)}</span>
                                    <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg border border-white/10 backdrop-blur-sm"><MapPin size={16} className="text-titan-red" /> {getLocalizedText(job.loc, language)}</span>
                                    <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg border border-white/10 backdrop-blur-sm"><Clock size={16} className="text-titan-red" /> {getLocalizedText(job.type, language)}</span>

                                </div>
                            </div>

                            <button
                                onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
                                className="hidden md:flex bg-titan-red text-white px-8 py-4 rounded-lg font-bold uppercase tracking-widest hover:bg-white hover:text-titan-red transition-all shadow-lg hover:shadow-titan-red/20 items-center gap-2"
                            >
                                {t('Apply Now')} <ArrowRight size={16} />
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- CONTENT --- */}
            <div className="max-w-[1200px] mx-auto px-6 py-16 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* LEFT COLUMN: JOB DETAILS */}
                    <div className="lg:col-span-7 space-y-12">
                        {/* Snapshot */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-8">
                            <div className="space-y-1">
                                <span className="block text-[10px] font-black uppercase tracking-widest text-titan-navy/40">{t('Salary')}</span>
                                <div className="flex items-center gap-2 text-titan-navy font-bold text-sm">
                                    <DollarSign size={14} className="text-titan-red" /> {getLocalizedText(job.salary, language)}
                                </div>
                            </div>
                            <div className="space-y-1 border-l border-gray-100 pl-4">
                                <span className="block text-[10px] font-black uppercase tracking-widest text-titan-navy/40">{t('Experience')}</span>
                                <div className="flex items-center gap-2 text-titan-navy font-bold text-sm">
                                    <Award size={14} className="text-titan-red" /> {getLocalizedText(job.experience, language)}
                                </div>
                            </div>
                            <div className="space-y-1 border-l border-gray-100 pl-4">
                                <span className="block text-[10px] font-black uppercase tracking-widest text-titan-navy/40">{t('Location')}</span>
                                <div className="flex items-center gap-2 text-titan-navy font-bold text-sm">
                                    <MapPin size={14} className="text-titan-red" /> {getLocalizedText(job.loc, language)}
                                </div>
                            </div>
                            <div className="space-y-1 border-l border-gray-100 pl-4">
                                <span className="block text-[10px] font-black uppercase tracking-widest text-titan-navy/40">{t('Job Type')}</span>
                                <div className="flex items-center gap-2 text-titan-navy font-bold text-sm">
                                    <Clock size={14} className="text-titan-red" /> {getLocalizedText(job.type, language)}
                                </div>
                            </div>
                        </div>

                        {/* Summary */}
                        <div className="prose prose-lg text-titan-navy-subtle max-w-none">
                            <h3 className="text-xl font-black text-titan-navy mb-4 flex items-center gap-2">
                                <Sparkles size={20} className="text-titan-red" /> {t('Job Description')}
                            </h3>
                            <p className="text-lg leading-relaxed">{getLocalizedText(job.summary, language)}</p>
                        </div>

                        {/* Responsibilities */}
                        <div>
                            <h3 className="text-xl font-black text-titan-navy mb-6 flex items-center gap-2 pb-4 border-b border-gray-100">
                                <Briefcase size={20} className="text-titan-red" /> {t('Job Responsibility')}
                            </h3>
                            <ul className="space-y-4">
                                {job.responsibilities.map((item, i) => (
                                    <li key={i} className="flex items-start gap-4 p-4 rounded-lg hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-gray-100">
                                        <div className="mt-1.5 w-6 h-6 rounded-full bg-titan-red/10 flex items-center justify-center flex-shrink-0 text-titan-red">
                                            <span className="text-xs font-bold">{i + 1}</span>
                                        </div>
                                        <span className="text-titan-navy-subtle font-medium leading-relaxed">{getLocalizedText(item, language)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Requirements */}
                        <div>
                            <h3 className="text-xl font-black text-titan-navy mb-6 flex items-center gap-2 pb-4 border-b border-gray-100">
                                <UserCheck size={20} className="text-titan-red" /> {t('Job Requirement')}
                            </h3>
                            <div className="grid grid-cols-1 gap-3">
                                {job.requirements.map((item, i) => (
                                    <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                                        <CheckCircle size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
                                        <span className="text-titan-navy-subtle text-sm font-medium">{getLocalizedText(item, language)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Benefits */}
                        {job.benefits && job.benefits.length > 0 && (
                            <div className="bg-titan-navy rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-titan-red rounded-full blur-3xl opacity-20 -mr-10 -mt-10"></div>
                                <h3 className="text-xl font-black mb-6 flex items-center gap-2 relative z-10">
                                    <Heart size={20} className="text-titan-red" /> {t('Benefits & Perks')}
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 relative z-10">
                                    {job.benefits.map((item, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 bg-titan-red rounded-full"></div>
                                            <span className="font-medium text-sm text-white/90">{getLocalizedText(item, language)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* RIGHT COLUMN: APPLICATION FORM (Sticky) */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-24 space-y-6" id="application-form">
                            {/* Application Card */}
                            <div className="bg-white border border-gray-200 shadow-2xl rounded-2xl p-8 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-titan-navy to-titan-red"></div>

                                {isSubmitted ? (
                                    <div className="text-center py-10 space-y-6">
                                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <CheckCircle size={32} />
                                        </div>
                                        <h3 className="text-2xl font-black text-titan-navy">{t('Application Sent')}</h3>
                                        <p className="text-titan-navy-subtle">{t('Application Success Note') || 'Thank you for your interest. We will review your application and get back to you soon.'}</p>
                                        <button onClick={() => setIsSubmitted(false)} className="text-titan-red font-bold uppercase tracking-widest text-xs hover:underline mt-4">
                                            {t('Back to Form') || 'Back to Form'}
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit}>
                                        <div className="space-y-5 mb-8">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-titan-navy mb-1.5">{t('First Name')}</label>
                                                    <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-titan-navy focus:border-titan-red focus:ring-1 focus:ring-titan-red focus:outline-none transition-all" placeholder={language === 'kh' ? 'ឧ. សុខ' : 'John'} value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} required />
                                                </div>
                                                <div>
                                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-titan-navy mb-1.5">{t('Last Name')}</label>
                                                    <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-titan-navy focus:border-titan-red focus:ring-1 focus:ring-titan-red focus:outline-none transition-all" placeholder={language === 'kh' ? 'ឧ. ដារ៉ា' : 'Doe'} value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} required />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-[10px] font-bold uppercase tracking-widest text-titan-navy mb-1.5">{t('Email Address')}</label>
                                                <input type="email" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-titan-navy focus:border-titan-red focus:ring-1 focus:ring-titan-red focus:outline-none transition-all" placeholder="john@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                                            </div>

                                            <div>
                                                <label className="block text-[10px] font-bold uppercase tracking-widest text-titan-navy mb-1.5">{t('Phone Number')}</label>
                                                <input type="tel" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-titan-navy focus:border-titan-red focus:ring-1 focus:ring-titan-red focus:outline-none transition-all" placeholder="+855 ..." value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
                                            </div>

                                            <div>
                                                <label className="block text-[10px] font-bold uppercase tracking-widest text-titan-navy mb-1.5">{t('Resume / CV')}</label>
                                                <div className={`border-2 border-dashed ${formData.cvUrl ? 'border-green-300' : 'border-gray-300'} rounded-xl p-6 text-center hover:bg-gray-50 hover:border-titan-red/50 transition-colors cursor-pointer relative group`}>
                                                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer z-10" onChange={handleFileUpload} accept=".pdf,.doc,.docx" disabled={isUploading} />
                                                    <div className={`w-10 h-10 ${formData.cvUrl ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'} rounded-full flex items-center justify-center mx-auto mb-2 group-hover:text-titan-red group-hover:bg-red-50 transition-colors`}>
                                                        {isUploading ? <Sparkles size={18} className="animate-pulse" /> : <Upload size={18} />}
                                                    </div>
                                                    <p className="text-xs font-bold text-titan-navy group-hover:text-titan-red transition-colors">
                                                        {isUploading ? 'Uploading...' : formData.cvUrl ? 'CV Uploaded' : t('Click to Upload or Drag & Drop')}
                                                    </p>
                                                    <p className="text-[10px] text-gray-400 mt-1">{t('PDF, DOCX up to 5MB')}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {submitError && (
                                            <p className="text-titan-red text-xs font-bold mb-4 text-center">{submitError}</p>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={isSubmitting || isUploading}
                                            className="w-full bg-titan-navy text-white font-bold uppercase tracking-widest py-4 rounded-lg hover:bg-titan-red transition-all shadow-lg flex items-center justify-center gap-2 text-xs group disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting ? 'Submitting...' : t('Submit Application')}
                                            {!isSubmitting && <Send size={14} className="group-hover:translate-x-1 transition-transform" />}
                                        </button>
                                    </form>
                                )}
                            </div>

                            {/* Share / Print Actions */}
                            <div className="grid grid-cols-2 gap-4">
                                <button className="flex items-center justify-center gap-2 py-3 bg-white border border-gray-200 rounded-xl text-xs font-bold uppercase tracking-widest text-titan-navy-subtle hover:text-titan-navy hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
                                    <Share2 size={14} /> {t('Share')}
                                </button>
                                <button className="flex items-center justify-center gap-2 py-3 bg-white border border-gray-200 rounded-xl text-xs font-bold uppercase tracking-widest text-titan-navy-subtle hover:text-titan-navy hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
                                    <Printer size={14} /> {t('Print')}
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
