"use client"
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface AudioWaveformProps {
    isPlaying: boolean;
}

export default function AudioWaveform({ isPlaying }: AudioWaveformProps) {
    return (
        <DotLottieReact
            src="/waveform.lottie"
            loop
            autoplay={isPlaying}
            
        />
    )
}