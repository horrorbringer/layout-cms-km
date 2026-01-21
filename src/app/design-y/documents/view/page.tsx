  'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { Download, ArrowLeft, Maximize2 } from 'lucide-react';
import Link from 'next/link';

function SimplePdfViewerContent() {
    const searchParams = useSearchParams();
    const docTitle = searchParams.get('title') || 'Document';

    // In a real app, this would be the actual PDF URL. 
    // For demo, we use a sample PDF or a placeholder if none provided.
    const pdfUrl = "https://pdfobject.com/pdf/sample.pdf";

    return (
        <div className="bg-titan-navy/90 fixed inset-0 z-[200] flex flex-col">

            {/* Header / Toolbar */}
            <div className="bg-white px-6 py-4 flex justify-between items-center shadow-md z-10">
                <div className="flex items-center gap-4">
                    <Link href="/design-y/structure" className="p-2 hover:bg-gray-100 rounded-full transition-colors text-titan-navy">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-lg font-bold text-titan-navy leading-none">{docTitle}</h1>
                        <span className="text-[10px] uppercase font-mono text-titan-navy/50 tracking-widest">
                            ReadOnly Mode // Secure View
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <a href={pdfUrl} download className="flex items-center gap-2 px-4 py-2 bg-titan-navy text-white text-xs font-bold uppercase tracking-wide hover:bg-titan-red transition-colors rounded-sm">
                        <Download size={14} /> Download
                    </a>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex overflow-hidden">

                {/* PDF VIEWER (Left/Center) */}
                <div className="flex-1 bg-gray-100 relative p-4 md:p-8 flex justify-center overflow-auto">
                    <div className="bg-white shadow-2xl w-full max-w-5xl h-full rounded-sm overflow-hidden border border-gray-300 relative flex flex-col">
                        <iframe
                            src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1`}
                            className="w-full h-full flex-1"
                            title="PDF Viewer"
                        >
                        </iframe>
                    </div>
                </div>

                {/* RELATED DOCS SIDEBAR (Right) */}
                <div className="w-80 bg-white border-l border-gray-200 shadow-xl hidden lg:flex flex-col z-20">
                    <div className="p-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                        <span className="text-xs font-bold uppercase tracking-widest text-titan-navy">Related Files</span>
                        <span className="text-[10px] font-mono text-gray-400">3 FOUND</span>
                    </div>

                    <div className="flex-1 overflow-y-auto p-2 space-y-1">
                        {[
                            'Safety Protocols v2.pdf',
                            'Architectural Blueprints.pdf',
                            'Material Specs 2026.pdf',
                            'Site Inspection Report.docx'
                        ].map((file, i) => (
                            <Link
                                key={i}
                                href={`/design-y/documents/view?title=${encodeURIComponent(file)}`}
                                className="block p-3 rounded-sm hover:bg-titan-bg group transition-colors border border-transparent hover:border-titan-navy/5"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="mt-1 w-2 h-2 rounded-full bg-titan-navy/20 group-hover:bg-titan-red transition-colors"></div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-bold text-titan-navy group-hover:text-titan-red truncate transition-colors leading-tight mb-1">
                                            {file}
                                        </p>
                                        <p className="text-[10px] text-gray-400 font-mono">PDF • 2.4 MB</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="p-4 border-t border-gray-100 bg-gray-50 text-center">
                        <Link href="/design-y/documents" className="text-[10px] font-bold uppercase tracking-widest text-titan-navy hover:text-titan-red transition-colors">
                            Return to Library
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function SimplePdfViewer() {
    return (
        <React.Suspense fallback={<div className="flex items-center justify-center min-h-screen bg-titan-bg text-titan-navy/50 font-mono uppercase tracking-widest">Loading Document Viewer...</div>}>
            <SimplePdfViewerContent />
        </React.Suspense>
    );
}
