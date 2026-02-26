'use client';

import React, { useState } from 'react';
import { teamMembers as initialMembers, TeamMember } from '@/app/design-z/data/teamData';
import {
    Search,
    Plus,
    Edit2,
    Trash2,
    Award,
    X,
    Camera,
    MapPin,
    Shield,
    MoreHorizontal
} from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function TeamAdmin() {
    const [members, setMembers] = useState<TeamMember[]>(initialMembers);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

    // Form State
    const [formData, setFormData] = useState<TeamMember>({
        name: '',
        role: { en: '', kh: '' },
        image: '',
        bio: { en: '', kh: '' },
        experience: '',
        location: { en: '', kh: '' },
        specialization: { en: '', kh: '' }
    });

    const filteredMembers = members.filter(m =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (m.role.en?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
        (m.role.kh?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
    );

    const handleOpenModal = (member?: TeamMember) => {
        if (member) {
            setEditingMember(member);
            setFormData(member);
        } else {
            setEditingMember(null);
            setFormData({
                name: '',
                role: { en: '', kh: '' },
                image: '',
                bio: { en: '', kh: '' },
                experience: '',
                location: { en: '', kh: '' },
                specialization: { en: '', kh: '' }
            });
        }
        setIsModalOpen(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        let newMembers;
        if (editingMember) {
            newMembers = members.map(m => m.name === editingMember.name ? formData : m);
        } else {
            newMembers = [...members, formData];
        }

        setMembers(newMembers);
        setIsModalOpen(false);

        // Persistent save
        try {
            await fetch('/api/cms/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    data: newMembers,
                    fileName: 'teamData.ts'
                })
            });
        } catch (error) {
            console.error('Failed to persist team changes:', error);
        }
    };

    const handleDelete = async (name: string) => {
        if (confirm(`Are you sure you want to remove ${name}?`)) {
            const newMembers = members.filter(m => m.name !== name);
            setMembers(newMembers);

            // Persistent save
            try {
                await fetch('/api/cms/save', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        data: newMembers,
                        fileName: 'teamData.ts'
                    })
                });
            } catch (error) {
                console.error('Failed to persist team deletion:', error);
            }
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Team Management</h1>
                    <p className="text-sm text-slate-500 mt-1">Manage leadership profiles and operational staff.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm"
                >
                    <Plus size={18} />
                    Add Member
                </button>
            </div>

            {/* Toolbar */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                        type="text"
                        placeholder="Search team..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg">
                    <Shield size={16} className="text-indigo-600" />
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">{members.length} Members Total</span>
                </div>
            </div>

            {/* Member List */}
            <div className="grid grid-cols-1 gap-4">
                <AnimatePresence mode='popLayout'>
                    {filteredMembers.map((member) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            key={member.name}
                            className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-slate-300 transition-colors flex items-center gap-6"
                        >
                            <div className="w-16 h-16 rounded-lg bg-slate-100 overflow-hidden relative border border-slate-200 shrink-0">
                                <Image
                                    src={member.image || '/images/team-leadership-professional/touch_kim.jpg'}
                                    alt={member.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="text-base font-bold text-slate-900 truncate">{member.name}</h3>
                                    <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded text-[10px] font-bold uppercase tracking-wider">
                                        {member.specialization.en.split(',')[0]}
                                    </span>
                                </div>
                                <p className="text-sm text-slate-500 font-medium">{member.role.en}</p>
                            </div>

                            <div className="flex items-center gap-8 shrink-0">
                                <div className="hidden md:flex items-center gap-2 text-slate-400">
                                    <Award size={14} />
                                    <span className="text-xs font-semibold">{member.experience}</span>
                                </div>
                                <div className="hidden md:flex items-center gap-2 text-slate-400">
                                    <MapPin size={14} />
                                    <span className="text-xs font-semibold">{member.location.en}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => handleOpenModal(member)}
                                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                    >
                                        <Edit2 size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(member.name)}
                                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl relative z-10"
                        >
                            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
                                <h2 className="text-xl font-bold text-slate-900">{editingMember ? 'Edit Profile' : 'Add New Member'}</h2>
                                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
                            </div>

                            <form onSubmit={handleSave} className="p-8 space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                                        <input
                                            required
                                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Designation</label>
                                        <input
                                            required
                                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                                            value={formData.role.en}
                                            onChange={(e) => setFormData({ ...formData, role: { ...formData.role, en: e.target.value } })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Professional Bio</label>
                                    <textarea
                                        rows={4}
                                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all resize-none"
                                        value={formData.bio.en}
                                        onChange={(e) => setFormData({ ...formData, bio: { ...formData.bio, en: e.target.value } })}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Specialization</label>
                                        <input
                                            required
                                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                                            value={formData.specialization.en}
                                            onChange={(e) => setFormData({ ...formData, specialization: { ...formData.specialization, en: e.target.value } })}
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Location</label>
                                        <input
                                            required
                                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                                            value={formData.location.en}
                                            onChange={(e) => setFormData({ ...formData, location: { ...formData.location, en: e.target.value } })}
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-end gap-3 pt-4">
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-bold text-slate-500 hover:bg-slate-50 rounded-lg transition-colors">Cancel</button>
                                    <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors shadow-sm">Save Profile</button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
