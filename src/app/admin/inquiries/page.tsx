'use client';

import React, { useState, useEffect } from 'react';
import {
    MessageSquare,
    Trash2,
    Eye,
    CheckCircle,
    Clock,
    User,
    Mail,
    Phone,
    Calendar,
    Search,
    ChevronRight,
    X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { allMessages, ContactMessage } from '@/app/design-z/data/messagesData';

export default function InquiriesAdmin() {
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    useEffect(() => {
        setMessages(allMessages);
    }, []);

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this inquiry?')) {
            const updatedMessages = messages.filter(m => m.id !== id);
            setMessages(updatedMessages);

            try {
                await fetch('/api/cms/save', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        fileName: 'messagesData.ts',
                        data: updatedMessages
                    })
                });
            } catch (error) {
                console.error('Failed to delete message:', error);
            }
        }
    };

    const handleUpdateStatus = async (id: string, status: ContactMessage['status']) => {
        const updatedMessages = messages.map(m => m.id === id ? { ...m, status } : m);
        setMessages(updatedMessages);

        if (selectedMessage?.id === id) {
            setSelectedMessage({ ...selectedMessage, status });
        }

        try {
            await fetch('/api/cms/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fileName: 'messagesData.ts',
                    data: updatedMessages
                })
            });
        } catch (error) {
            console.error('Failed to update status:', error);
        }
    };

    const filteredMessages = messages.filter(m =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const openDetails = (msg: ContactMessage) => {
        setSelectedMessage(msg);
        setIsDetailOpen(true);
        if (msg.status === 'new') {
            handleUpdateStatus(msg.id, 'read');
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                        <MessageSquare className="text-indigo-600" />
                        Contact Inquiries
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">Manage messages received from the contact forms.</p>
                </div>
            </div>

            {/* Stats & Search */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Total</p>
                    <p className="text-2xl font-bold text-slate-900">{messages.length}</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">New</p>
                    <p className="text-2xl font-bold text-indigo-600">{messages.filter(m => m.status === 'new').length}</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 md:col-span-2">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Search</p>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search by name, email or subject..."
                            className="w-full pl-10 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Message List */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Sender</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Subject</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Date</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-center">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredMessages.length > 0 ? filteredMessages.map((msg) => (
                                <tr key={msg.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.status === 'new' ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-500'
                                                }`}>
                                                <User size={14} />
                                            </div>
                                            <div>
                                                <p className={`text-sm font-semibold transition-colors ${msg.status === 'new' ? 'text-indigo-700' : 'text-slate-900'}`}>{msg.name}</p>
                                                <p className="text-xs text-slate-500">{msg.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-medium text-slate-800 line-clamp-1">{msg.subject}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1.5 text-slate-500">
                                            <Calendar size={12} />
                                            <span className="text-xs">{msg.date.split(',')[0]}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center">
                                            {msg.status === 'new' && (
                                                <span className="px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                                                    <Clock size={10} /> New
                                                </span>
                                            )}
                                            {msg.status === 'read' && (
                                                <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                                                    <CheckCircle size={10} /> Read
                                                </span>
                                            )}
                                            {msg.status === 'replied' && (
                                                <span className="px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                                                    <CheckCircle size={10} /> Replied
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => openDetails(msg)}
                                                className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                                                title="View Details"
                                            >
                                                <Eye size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(msg.id)}
                                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                                title="Delete"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center gap-2 text-slate-400">
                                            <MessageSquare size={32} strokeWidth={1} />
                                            <p className="text-sm">No inquiries found matching your search.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Details Modal */}
            <AnimatePresence>
                {isDetailOpen && selectedMessage && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-end p-4 md:p-6 bg-slate-900/40 backdrop-blur-sm">
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="bg-white w-full max-w-xl h-full rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                        >
                            {/* Modal Header */}
                            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                                        <MessageSquare size={20} />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-slate-900">Inquiry Details</h2>
                                        <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-0.5">ID: {selectedMessage.id}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsDetailOpen(false)}
                                    className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-all"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="flex-1 overflow-y-auto p-8 space-y-8">
                                {/* Sender Info */}
                                <div className="space-y-4">
                                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Sender Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="p-4 bg-slate-50 rounded-xl space-y-1">
                                            <div className="flex items-center gap-2 text-slate-500 mb-1">
                                                <User size={14} />
                                                <span className="text-[10px] font-bold uppercase tracking-wider">Name</span>
                                            </div>
                                            <p className="text-sm font-bold text-slate-900">{selectedMessage.name}</p>
                                        </div>
                                        <div className="p-4 bg-slate-50 rounded-xl space-y-1">
                                            <div className="flex items-center gap-2 text-slate-500 mb-1">
                                                <Mail size={14} />
                                                <span className="text-[10px] font-bold uppercase tracking-wider">Email</span>
                                            </div>
                                            <p className="text-sm font-bold text-slate-900">{selectedMessage.email}</p>
                                        </div>
                                        <div className="p-4 bg-slate-50 rounded-xl space-y-1">
                                            <div className="flex items-center gap-2 text-slate-500 mb-1">
                                                <Phone size={14} />
                                                <span className="text-[10px] font-bold uppercase tracking-wider">Phone</span>
                                            </div>
                                            <p className="text-sm font-bold text-slate-900">{selectedMessage.phone || 'N/A'}</p>
                                        </div>
                                        <div className="p-4 bg-slate-50 rounded-xl space-y-1">
                                            <div className="flex items-center gap-2 text-slate-500 mb-1">
                                                <Calendar size={14} />
                                                <span className="text-[10px] font-bold uppercase tracking-wider">Date Received</span>
                                            </div>
                                            <p className="text-sm font-bold text-slate-900">{selectedMessage.date}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Message Content */}
                                <div className="space-y-4">
                                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Message</h3>
                                    <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl relative">
                                        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                                            <MessageSquare size={120} />
                                        </div>
                                        <div className="relative z-10">
                                            <div className="mb-4">
                                                <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block mb-1">Subject</span>
                                                <p className="text-lg font-bold text-slate-900">{selectedMessage.subject}</p>
                                            </div>
                                            <div className="prose prose-sm max-w-none text-slate-600 leading-relaxed whitespace-pre-wrap">
                                                {selectedMessage.message}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="px-8 py-6 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-slate-500">Status:</span>
                                    <select
                                        className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700 focus:ring-1 focus:ring-indigo-500 outline-none transition-all shadow-sm"
                                        value={selectedMessage.status}
                                        onChange={(e) => handleUpdateStatus(selectedMessage.id, e.target.value as any)}
                                    >
                                        <option value="new">Mark as New</option>
                                        <option value="read">Mark as Read</option>
                                        <option value="replied">Mark as Replied</option>
                                    </select>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => handleDelete(selectedMessage.id)}
                                        className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 font-bold rounded-lg text-xs transition-all"
                                    >
                                        <Trash2 size={14} /> Delete
                                    </button>
                                    <a
                                        href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                                        className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white font-bold rounded-lg text-xs hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all"
                                    >
                                        Reply via Email
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
