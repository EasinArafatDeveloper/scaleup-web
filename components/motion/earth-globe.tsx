"use client";

import * as React from "react";
import createGlobe, { type COBEOptions } from "cobe";
import { useReducedMotion } from "motion/react";
import { useTheme } from "@/components/layout/theme-provider";
import { cn } from "@/lib/utils";

const DHAKA: [number, number] = [23.8103, 90.4125];
const CHITTAGONG: [number, number] = [22.3569, 91.7832];

// cobe's helper formula: longitude → rotation so that point faces the viewer.
const phiFor = (lon: number) => Math.PI - ((lon * Math.PI) / 180 - Math.PI / 2);

const palettes: Record<"dark" | "light", Pick<COBEOptions, "dark" | "baseColor" | "markerColor" | "glowColor" | "mapBrightness" | "diffuse" | "mapBaseBrightness">> = {
  dark: {
    dark: 1,
    diffuse: 1.4,
    mapBrightness: 7,
    mapBaseBrightness: 0.04,
    baseColor: [0.16, 0.24, 0.5],
    markerColor: [0.55, 0.7, 1],
    glowColor: [0.22, 0.38, 0.95]
  },
  light: {
    dark: 0,
    diffuse: 1.3,
    mapBrightness: 5,
    mapBaseBrightness: 0.02,
    baseColor: [0.92, 0.94, 1],
    markerColor: [0.14, 0.29, 0.91],
    glowColor: [0.72, 0.8, 1]
  }
};

/** Slowly rotating dotted Earth (WebGL via cobe), with Dhaka marked. */
export function EarthGlobe({ className, theta = -0.32 }: { className?: string; theta?: number }) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const reduce = useReducedMotion();
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const size = canvas.offsetWidth;
    // Start a little east of Dhaka so it drifts into the centre.
    let phi = phiFor(DHAKA[1]) + 0.55;
    let raf = 0;

    const globe = createGlobe(canvas, {
      devicePixelRatio: dpr,
      width: size * dpr,
      height: size * dpr,
      phi,
      theta,
      mapSamples: 20000,
      markers: [
        { location: DHAKA, size: 0.035, id: "dhaka" },
        { location: CHITTAGONG, size: 0.02 }
      ],
      markerElevation: 0.01,
      ...palettes[theme]
    });

    const tick = () => {
      phi -= 0.0016;
      globe.update({ phi });
      raf = requestAnimationFrame(tick);
    };
    if (!reduce) raf = requestAnimationFrame(tick);

    const fadeIn = setTimeout(() => setReady(true), 50);

    return () => {
      clearTimeout(fadeIn);
      cancelAnimationFrame(raf);
      globe.destroy();
    };
  }, [theme, theta, reduce]);

  return (
    <div className={cn("relative aspect-square", className)}>
      <canvas
        ref={canvasRef}
        aria-hidden
        className={cn(
          "h-full w-full transition-opacity duration-[1600ms] ease-out",
          ready ? "opacity-100" : "opacity-0"
        )}
      />
      {/* Floating label pinned to the Dhaka marker (where CSS anchor positioning is supported) */}
      <span className="globe-label" aria-hidden>
        <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Dhaka HQ
      </span>
    </div>
  );
}
