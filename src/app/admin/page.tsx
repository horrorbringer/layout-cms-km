'use client';

import React from 'react';
import {
    Briefcase,
    Users,
    CheckCircle2,
    Clock,
    TrendingUp,
    Plus,
    ArrowUpRight,
    ArrowDownRight,
    Search,
    Filter,
    MoreVertical
} from 'lucide-react';
import { motion } from 'framer-motion';

const stats = [
    { label: 'Total Projects', value: '15', icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-50', change: '+2', trend: 'up' },
    { label: 'Active Team', value: '10', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50', change: '0', trend: 'neutral' },
    { label: 'Completed', value: '12', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50', change: '+3', trend: 'up' },
    { label: 'Pending', value: '3', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', change: '-1', trend: 'down' },
];

const recentProjects = [
    { title: 'Ministry of Interior HQ', category: 'Government', status: 'Completed', date: '2 hours ago' },
    { title: 'Phum Prek WTP Expansion', category: 'Infrastructure', status: 'In Progress', date: '5 hours ago' },
    { title: 'Royal University Stadium', category: 'Education', status: 'In Progress', date: '1 day ago' },
];

export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
                    <p className="text-sm text-slate-500 mt-1">Key metrics and recent activity for KIM MEX CMS.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm active:scale-[0.98]">
                    <Plus size={18} />
                    New Project
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        key={stat.label}
                        className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-slate-300 transition-colors group"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`${stat.bg} ${stat.color} p-2.5 rounded-lg border border-transparent group-hover:border-current/10 transition-colors`}>
                                <stat.icon size={20} />
                            </div>
                            <div className={`flex items-center gap-1.5 text-xs font-bold px-2 py-1 rounded-md ${stat.trend === 'up' ? 'text-emerald-600 bg-emerald-50' :
                                    stat.trend === 'down' ? 'text-red-500 bg-red-50' :
                                        'text-slate-500 bg-slate-100'
                                }`}>
                                {stat.trend === 'up' && <ArrowUpRight size={14} />}
                                {stat.trend === 'down' && <ArrowDownRight size={14} />}
                                {stat.change}
                            </div>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                            <h3 className="text-3xl font-bold text-slate-900 mt-1 leading-none">{stat.value}</h3>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity Area */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="font-bold text-slate-900">Recent Projects</h3>
                            <button className="text-xs font-bold text-indigo-600 hover:text-indigo-700">View All Projects</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/50">
                                        <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Project Details</th>
                                        <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Category</th>
                                        <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                                        <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Activity</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {recentProjects.map((project, i) => (
                                        <tr key={i} className="hover:bg-slate-50 transition-colors group cursor-pointer">
                                            <td className="px-6 py-4">
                                                <p className="text-sm font-bold text-slate-900">{project.title}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-2 py-0.5 bg-slate-100 rounded text-[10px] font-bold text-slate-600 uppercase">
                                                    {project.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-1.5 h-1.5 rounded-full ${project.status === 'Completed' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                                                    <span className={`text-xs font-semibold ${project.status === 'Completed' ? 'text-emerald-700' : 'text-amber-700'}`}>
                                                        {project.status}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <span className="text-xs font-medium text-slate-400">{project.date}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Performance Analytics Sidebar */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-slate-900">Project Distribution</h3>
                            <button className="p-1 hover:bg-slate-50 rounded text-slate-400"><MoreVertical size={16} /></button>
                        </div>

                        <div className="space-y-5">
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                                    <span className="text-slate-500">Infrastructure</span>
                                    <span className="text-slate-900">45%</span>
                                </div>
                                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                    <motion.div initial={{ width: 0 }} animate={{ width: '45%' }} className="h-full bg-indigo-500" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                                    <span className="text-slate-500">Government</span>
                                    <span className="text-slate-900">35%</span>
                                </div>
                                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                    <motion.div initial={{ width: 0 }} animate={{ width: '35%' }} className="h-full bg-blue-500" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                                    <span className="text-slate-500">Commercial</span>
                                    <span className="text-slate-900">20%</span>
                                </div>
                                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                    <motion.div initial={{ width: 0 }} animate={{ width: '20%' }} className="h-full bg-emerald-500" />
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                                    <TrendingUp size={18} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Monthly Growth</p>
                                    <p className="text-sm font-bold text-slate-900">+12.5% vs last month</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 text-white relative overflow-hidden group shadow-lg">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="relative z-10 flex flex-col gap-4">
                            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                                <TrendingUp size={16} className="text-indigo-400" />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm">System Status</h4>
                                <p className="text-xs text-slate-400 leading-relaxed mt-1">All systems operational. Content cache synced.</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Live Sync Active</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
