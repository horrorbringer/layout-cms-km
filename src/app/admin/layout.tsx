'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    LayoutDashboard,
    Briefcase,
    Users,
    Settings,
    LogOut,
    Bell,
    Search,
    ChevronRight,
    UserCircle,
    Shield,
    ExternalLink,
    PanelLeftClose,
    PanelLeftOpen,
    ChevronDown,
    Chrome,
    Newspaper
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SubItem {
    id: string;
    label: string;
    href: string;
    subItems?: SubItem[];
}

interface SidebarItem {
    id: string;
    label: string;
    icon: any;
    href?: string;
    subItems?: SubItem[];
}

const sidebarItems: SidebarItem[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, href: '/admin' },
    { id: 'projects', label: 'Projects', icon: Briefcase, href: '/admin/projects' },
    { id: 'team', label: 'Team Members', icon: Users, href: '/admin/team' },
    { id: 'news', label: 'News & Updates', icon: Newspaper, href: '/admin/news' },
    {
        id: 'content',
        label: 'Site Content',
        icon: Chrome,
        subItems: [
            {
                id: 'home',
                label: 'Home Page',
                href: '/admin/content?section=home',
                subItems: [
                    { id: 'home_hero', label: 'Hero Section', href: '/admin/content?section=home#hero' },
                    { id: 'home_why', label: 'Why Choose Us', href: '/admin/content?section=home#why' },
                    { id: 'home_process', label: 'Working Process', href: '/admin/content?section=home#process' },
                ]
            },
            {
                id: 'about',
                label: 'About Us',
                href: '/admin/content?section=about',
                subItems: [
                    { id: 'about_story', label: 'Our Story', href: '/admin/content?section=about#story' },
                    { id: 'about_values', label: 'Core Values', href: '/admin/content?section=about#values' },
                ]
            },
            { id: 'careers', label: 'Careers', href: '/admin/content?section=careers' },
            { id: 'testimonials', label: 'Testimonials', href: '/admin/content?section=testimonials' },
            { id: 'org-chart', label: 'Org Chart (Design Z)', href: '/admin/org-chart' },
            { id: 'contact', label: 'Contact Info', href: '/admin/content?section=contact' },
        ]
    },
    { id: 'settings', label: 'Settings', icon: Settings, href: '/admin/settings' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [isLoaded, setIsLoaded] = useState(false);
    const [user, setUser] = useState<{ name: string, role: string, email: string } | null>(null);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [expandedItems, setExpandedItems] = useState<string[]>(['content']);

    useEffect(() => {
        const checkAuth = () => {
            const auth = localStorage.getItem('kimmex_admin_auth');
            const userData = localStorage.getItem('kimmex_admin_user');
            if (pathname !== '/admin/login' && auth !== 'true') {
                router.push('/admin/login');
            } else {
                if (userData) setUser(JSON.parse(userData));
                setIsLoaded(true);
            }
        };
        checkAuth();
    }, [pathname, router]);

    const handleLogout = () => {
        localStorage.removeItem('kimmex_admin_auth');
        localStorage.removeItem('kimmex_admin_user');
        router.push('/admin/login');
    };

    const toggleExpanded = (id: string) => {
        setExpandedItems(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const renderSubItems = (items: SubItem[], level: number = 0) => {
        return (
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className={`overflow-hidden space-y-0.5 mt-1 border-l border-slate-200 ml-4 pl-3`}
            >
                {items.map((sub) => {
                    const hasSub = sub.subItems && sub.subItems.length > 0;
                    const isExpanded = expandedItems.includes(sub.id);
                    const isSubActive = pathname + (typeof window !== 'undefined' ? window.location.search : '') === sub.href;

                    return (
                        <div key={sub.id} className="space-y-0.5">
                            {hasSub ? (
                                <button
                                    onClick={() => toggleExpanded(sub.id)}
                                    className={`w-full flex items-center justify-between py-1.5 px-2 rounded-md text-[13px] font-medium transition-colors ${isExpanded ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-900'
                                        }`}
                                >
                                    <span>{sub.label}</span>
                                    <ChevronDown size={14} className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                                </button>
                            ) : (
                                <Link
                                    href={sub.href}
                                    className={`block py-1.5 px-2 rounded-md text-[13px] font-medium transition-colors ${isSubActive
                                        ? 'text-indigo-600 bg-indigo-50/50 font-semibold'
                                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                                        }`}
                                >
                                    {sub.label}
                                </Link>
                            )}
                            <AnimatePresence>
                                {hasSub && isExpanded && renderSubItems(sub.subItems!, level + 1)}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </motion.div>
        );
    };

    if (pathname === '/admin/login') return <>{children}</>;
    if (!isLoaded) return null;

    return (
        <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
            {/* --- SIDEBAR --- */}
            <motion.aside
                animate={{ width: isCollapsed ? 80 : 280 }}
                className="bg-white border-r border-slate-200 flex flex-col fixed inset-y-0 z-50 overflow-hidden"
            >
                {/* Brand Section */}
                <div className="h-16 flex items-center px-6 border-b border-slate-50">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shrink-0">
                            <Shield className="text-white" size={18} />
                        </div>
                        {!isCollapsed && (
                            <span className="text-lg font-bold tracking-tight text-slate-800">
                                KIM MEX <span className="text-indigo-600 font-medium">CMS</span>
                            </span>
                        )}
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
                    {sidebarItems.map((item) => {
                        const hasSub = item.subItems && item.subItems.length > 0;
                        const isActive = pathname === item.href || (item.href !== '/admin' && pathname?.startsWith(item.href || ''));
                        const isExpanded = expandedItems.includes(item.id);

                        return (
                            <div key={item.id}>
                                {item.href ? (
                                    <Link
                                        href={item.href}
                                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${isActive
                                            ? 'bg-indigo-50 text-indigo-700'
                                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                            } ${isCollapsed ? 'justify-center px-0 h-10 w-10 mx-auto' : ''}`}
                                    >
                                        <item.icon size={18} className={isActive ? 'text-indigo-600' : 'text-slate-400'} />
                                        {!isCollapsed && <span>{item.label}</span>}
                                    </Link>
                                ) : (
                                    <div className="space-y-1">
                                        <button
                                            onClick={() => !isCollapsed && toggleExpanded(item.id)}
                                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${isExpanded && !isCollapsed ? 'text-indigo-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                                } ${isCollapsed ? 'justify-center px-0 h-10 w-10 mx-auto' : ''}`}
                                        >
                                            <item.icon size={18} className={isExpanded && !isCollapsed ? 'text-indigo-600' : 'text-slate-400'} />
                                            {!isCollapsed && (
                                                <>
                                                    <span className="flex-1 text-left">{item.label}</span>
                                                    <ChevronDown size={14} className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                                                </>
                                            )}
                                        </button>
                                        <AnimatePresence>
                                            {hasSub && isExpanded && !isCollapsed && renderSubItems(item.subItems!)}
                                        </AnimatePresence>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </nav>

                {/* Sidebar Footer */}
                <div className="p-4 border-t border-slate-100 flex flex-col gap-1">
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all"
                    >
                        {isCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
                        {!isCollapsed && <span>Collapse</span>}
                    </button>
                    <Link
                        href="/design-z"
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all"
                    >
                        <ExternalLink size={18} />
                        {!isCollapsed && <span>View Website</span>}
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-all mt-1"
                    >
                        <LogOut size={18} />
                        {!isCollapsed && <span>Sign Out</span>}
                    </button>
                </div>
            </motion.aside>

            {/* --- MAIN CONTENT --- */}
            <main
                className="flex-1 flex flex-col min-w-0"
                style={{ marginLeft: isCollapsed ? '80px' : '280px' }}
            >
                {/* Header */}
                <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-40 px-8 flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1 max-w-md">
                        <div className="w-full relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-600 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-semibold text-slate-900 leading-none">{user?.name || 'Admin User'}</p>
                                <p className="text-xs text-slate-500 mt-1">Administrator</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500">
                                <UserCircle size={24} />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="p-8 max-w-7xl mx-auto w-full">
                    {children}
                </div>
            </main>
        </div>
    );
}
