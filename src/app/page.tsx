
import Link from 'next/link';
import { ArrowRight, Layout, Monitor, Image, Building, Ruler, Box, Star } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-20 px-4 font-sans text-slate-800">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-16">
          <div className="inline-block bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-widest px-4 py-1 rounded-full mb-4">Internal Review</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">KIM MEX Design Concepts</h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">Select a design direction below to launch the interactive prototype.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Option A */}
          <Link href="/design-a" className="group block bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-slate-100 ring-2 ring-transparent hover:ring-titan-navy">
            <div className="h-2 bg-titan-navy w-full"></div>
            <div className="p-8">
              <div className="mb-6 bg-slate-100 w-14 h-14 rounded-lg flex items-center justify-center text-titan-navy group-hover:bg-titan-navy group-hover:text-white transition-colors">
                <Layout size={28} />
              </div>
              <h2 className="text-2xl font-bold mb-2 text-slate-900">A. The Titan</h2>
              <p className="text-slate-500 text-sm mb-6 h-10">High-impact corporate presence with parallax effects and bold branding.</p>
              <div className="flex items-center text-titan-navy font-bold text-sm uppercase tracking-wide">
                View Prototype <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Option X - The Final */}
          <Link href="/design-x" className="group block bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-slate-100 ring-2 ring-transparent hover:ring-titan-red">
            <div className="h-2 bg-gradient-to-r from-titan-navy via-titan-red to-titan-navy w-full"></div>
            <div className="p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 bg-titan-red text-white text-xs font-bold uppercase tracking-widest rounded-bl-xl shadow-md">Selected</div>

              <div className="mb-6 bg-titan-bg w-14 h-14 rounded-lg flex items-center justify-center text-titan-red group-hover:bg-titan-red group-hover:text-white transition-colors">
                <Star size={28} />
              </div>
              <h2 className="text-2xl font-black mb-2 text-slate-900">X. The Premium</h2>
              <p className="text-slate-500 text-sm mb-6 h-10">Sophisticated blend of corporate authority and modern elegance.</p>

              <div className="flex items-center text-titan-red font-bold text-sm uppercase tracking-wide">
                View X <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Option Y - The Visionary */}
          <Link href="/design-y" className="group block bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-slate-100 ring-2 ring-transparent hover:ring-titan-gold">
            <div className="h-2 bg-gradient-to-r from-titan-navy via-titan-gold to-titan-navy w-full"></div>
            <div className="p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 bg-titan-gold text-white text-xs font-bold uppercase tracking-widest rounded-bl-xl shadow-md">New</div>

              <div className="mb-6 bg-titan-bg w-14 h-14 rounded-lg flex items-center justify-center text-titan-gold group-hover:bg-titan-gold group-hover:text-white transition-colors">
                <Image size={28} />
              </div>
              <h2 className="text-2xl font-black mb-2 text-slate-900">Y. The Visionary</h2>
              <p className="text-slate-500 text-sm mb-6 h-10">Ultra-clean, editorial aesthetic with bold typography and heavy use of white space.</p>

              <div className="flex items-center text-titan-gold font-bold text-sm uppercase tracking-wide">
                View Y <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
