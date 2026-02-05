'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface FeatureCardProps {
    title: string;
    desc: string;
    icon: any;
    index: number;
}

const FeatureCard = ({ title, desc, icon: Icon, index }: FeatureCardProps) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true, margin: "-50px" }}
        className="bg-[#F5F5F7] p-8 md:p-10 rounded-[2rem] hover:bg-titan-navy hover:text-white transition-all duration-500 group cursor-default h-full flex flex-col justify-between"
    >
        <div>
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-white/10 group-hover:text-white text-titan-navy transition-colors">
                <Icon size={28} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-4">{title}</h3>
            <p className="text-gray-500 group-hover:text-white/60 leading-relaxed transition-colors text-sm md:text-base">
                {desc}
            </p>
        </div>
        <div className="mt-8 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
            <ArrowRight size={20} />
        </div>
    </motion.div>
);

export default FeatureCard;
