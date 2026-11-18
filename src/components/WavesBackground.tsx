"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function WavesBackground() {
  const vantaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let vantaEffect: { destroy: () => void } | null = null;

    import("vanta/dist/vanta.waves.min").then((VANTA) => {
      if (vantaRef.current) {
        vantaEffect = VANTA.default({
          el: vantaRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x38,
          shininess: 31.0,
          waveHeight: 26.0,
          waveSpeed: 0.5,
          zoom: 1.37,
        });
      }
    });

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return <div ref={vantaRef} className="absolute inset-0 h-full w-full" />;
}