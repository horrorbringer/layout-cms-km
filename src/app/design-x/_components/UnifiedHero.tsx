'use client';

import React from 'react';
import HeroVideo from './Hero';
import HeroCarousel from './HeroCarousel';

export type HeroMode = 'video' | 'carousel';

interface UnifiedHeroProps {
    mode?: HeroMode;
}

/**
 * UnifiedHero Component
 * 
 * This component serves as a switch between the Video Hero and the Carousel Hero.
 * Pass the `mode` prop to choose which version to render.
 * 
 * @param {HeroMode} mode - 'video' | 'carousel' (default: 'carousel')
 */
export default function UnifiedHero({ mode = 'carousel' }: UnifiedHeroProps) {
    if (mode === 'video') {
        return <HeroVideo />;
    }

    return <HeroCarousel />;
}
