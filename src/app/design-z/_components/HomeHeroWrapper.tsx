'use client';

import React, { useState } from 'react';
import UnifiedHero, { HeroMode } from './UnifiedHero';

export default function HomeHeroWrapper({ initialData }: { initialData?: any }) {
    const [heroMode, setHeroMode] = useState<HeroMode>('carousel');

    return (
        <UnifiedHero mode={heroMode} onToggle={(mode) => setHeroMode(mode)} initialData={initialData} />
    );
}
