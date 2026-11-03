"use client";

import * as React from "react";
import { motion } from "motion/react";
import {
  Code2,
  Bot,
  TrendingUp,
  ShoppingBag,
  Globe,
  Truck,
  Sparkles
} from "lucide-react";

export function HeroConnectedDiagram() {
  const [hoveredNode, setHoveredNode] = React.useState<string | null>(null);

  // 6 Ecosystem Nodes radiating around the central logo
  const nodes = [
    {
      id: "code",
      label: "Next.js & Web",
      sub: "Ultra-fast website",
      icon: <Code2 className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />,
      color: "#5B5BF7",
      side: "left",
      top: "16%",
      left: "8%"
    },
    {
      id: "ecom",
      label: "bKash & E-Commerce",
      sub: "Automated checkout",
      icon: <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-400" />,
      color: "#22C55E",
      side: "left",
      top: "50%",
      left: "4%"
    },
    {
      id: "seo",
      label: "Google SEO",
      sub: "Lighthouse 95+ score",
      icon: <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-amber-400" />,
      color: "#F59E0B",
      side: "left",
      top: "84%",
      left: "10%"
    },
    {
      id: "ads",
      label: "Meta Ads & CAPI",
      sub: "Server-side tracking",
      icon: <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />,
      color: "#22D3EE",
      side: "right",
      top: "16%",
      right: "8%"
    },
    {
      id: "bot",
      label: "AI Chatbot & n8n",
      sub: "24/7 Bangla & English",
      icon: <Bot className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />,
      color: "#A855F7",
      side: "right",
      top: "50%",
      right: "4%"
    },
    {
      id: "courier",
      label: "Steadfast / Pathao",
      sub: "Courier auto-sync",
      icon: <Truck className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />,
      color: "#3B82F6",
      side: "right",
      top: "84%",
      right: "10%"
    }
  ];

  return (
    <div className="relative mx-auto flex h-[400px] sm:h-[440px] w-full max-w-[500px] items-center justify-center select-none bg-transparent">
      {/* Subtle radial center ambient glow only */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[220px] w-[220px] rounded-full bg-accent/15 blur-[70px]" />

      {/* SVG Connecting Curved Beams */}
      <svg
        viewBox="0 0 500 440"
        className="pointer-events-none absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Base connecting curved lines (Connecting to Center: 250, 220) */}
        {/* Left 1: Code */}
        <path
          d="M 65 75 C 135 75, 180 210, 215 220"
          fill="none"
          stroke="var(--border-strong)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        {/* Left 2: Ecom */}
        <path
          d="M 45 220 L 215 220"
          fill="none"
          stroke="var(--border-strong)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        {/* Left 3: SEO */}
        <path
          d="M 75 365 C 135 365, 180 230, 215 220"
          fill="none"
          stroke="var(--border-strong)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />

        {/* Right 1: Ads */}
        <path
          d="M 435 75 C 365 75, 320 210, 285 220"
          fill="none"
          stroke="var(--border-strong)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        {/* Right 2: Bot */}
        <path
          d="M 455 220 L 285 220"
          fill="none"
          stroke="var(--border-strong)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        {/* Right 3: Courier */}
        <path
          d="M 425 365 C 365 365, 320 230, 285 220"
          fill="none"
          stroke="var(--border-strong)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />

        {/* 21st.dev Traveling Animated Pulse Beams */}
        <motion.circle
          r="3.5"
          fill="#5B5BF7"
          filter="drop-shadow(0 0 6px #5B5BF7)"
          initial={{ offsetDistance: "0%" }}
          animate={{ offsetDistance: "100%" }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          style={{ offsetPath: `path("M 65 75 C 135 75, 180 210, 215 220")` }}
        />

        <motion.circle
          r="4"
          fill="#22C55E"
          filter="drop-shadow(0 0 6px #22C55E)"
          initial={{ offsetDistance: "0%" }}
          animate={{ offsetDistance: "100%" }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "linear", delay: 0.4 }}
          style={{ offsetPath: `path("M 45 220 L 215 220")` }}
        />

        <motion.circle
          r="3.5"
          fill="#F59E0B"
          filter="drop-shadow(0 0 6px #F59E0B)"
          initial={{ offsetDistance: "0%" }}
          animate={{ offsetDistance: "100%" }}
          transition={{ duration: 2.7, repeat: Infinity, ease: "linear", delay: 0.9 }}
          style={{ offsetPath: `path("M 75 365 C 135 365, 180 230, 215 220")` }}
        />

        <motion.circle
          r="3.5"
          fill="#22D3EE"
          filter="drop-shadow(0 0 6px #22D3EE)"
          initial={{ offsetDistance: "0%" }}
          animate={{ offsetDistance: "100%" }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "linear", delay: 0.2 }}
          style={{ offsetPath: `path("M 435 75 C 365 75, 320 210, 285 220")` }}
        />

        <motion.circle
          r="4"
          fill="#A855F7"
          filter="drop-shadow(0 0 6px #A855F7)"
          initial={{ offsetDistance: "0%" }}
          animate={{ offsetDistance: "100%" }}
          transition={{ duration: 2.1, repeat: Infinity, ease: "linear", delay: 0.7 }}
          style={{ offsetPath: `path("M 455 220 L 285 220")` }}
        />

        <motion.circle
          r="3.5"
          fill="#3B82F6"
          filter="drop-shadow(0 0 6px #3B82F6)"
          initial={{ offsetDistance: "0%" }}
          animate={{ offsetDistance: "100%" }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "linear", delay: 1.2 }}
          style={{ offsetPath: `path("M 425 365 C 365 365, 320 230, 285 220")` }}
        />
      </svg>

      {/* Outer Nodes on Left */}
      {nodes.slice(0, 3).map((node) => (
        <div
          key={node.id}
          style={{ top: node.top, left: node.left }}
          onMouseEnter={() => setHoveredNode(node.id)}
          onMouseLeave={() => setHoveredNode(null)}
          className="group absolute z-20 flex items-center gap-2 cursor-pointer -translate-y-1/2 transition-transform duration-300 hover:scale-110"
        >
          <div
            className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl border bg-[var(--surface-elevated)] p-2.5 shadow-md backdrop-blur-md transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(91,91,247,0.35)]"
            style={{ borderColor: hoveredNode === node.id ? node.color : "var(--border)" }}
          >
            {node.icon}
          </div>
          {hoveredNode === node.id && (
            <motion.div
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden sm:block rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] px-2.5 py-1 text-[11px] shadow-xl text-[var(--foreground)] whitespace-nowrap"
            >
              <div className="font-semibold">{node.label}</div>
              <div className="text-[10px] text-[var(--muted)]">{node.sub}</div>
            </motion.div>
          )}
        </div>
      ))}

      {/* Outer Nodes on Right */}
      {nodes.slice(3, 6).map((node) => (
        <div
          key={node.id}
          style={{ top: node.top, right: node.right }}
          onMouseEnter={() => setHoveredNode(node.id)}
          onMouseLeave={() => setHoveredNode(null)}
          className="group absolute z-20 flex flex-row-reverse items-center gap-2 cursor-pointer -translate-y-1/2 transition-transform duration-300 hover:scale-110"
        >
          <div
            className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl border bg-[var(--surface-elevated)] p-2.5 shadow-md backdrop-blur-md transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.35)]"
            style={{ borderColor: hoveredNode === node.id ? node.color : "var(--border)" }}
          >
            {node.icon}
          </div>
          {hoveredNode === node.id && (
            <motion.div
              initial={{ opacity: 0, x: 6 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden sm:block rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] px-2.5 py-1 text-[11px] shadow-xl text-[var(--foreground)] text-right whitespace-nowrap"
            >
              <div className="font-semibold">{node.label}</div>
              <div className="text-[10px] text-[var(--muted)]">{node.sub}</div>
            </motion.div>
          )}
        </div>
      ))}

      {/* Central Compact Brand Logo (Clean, No Box Shape, No Green Dot) */}
      <div className="relative z-10 flex items-center justify-center">
        {/* Subtle breathing glow */}
        <span className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-accent/30 to-accent/30 blur-md animate-pulse" />

        <motion.div
          whileHover={{ scale: 1.08 }}
          transition={{ type: "spring", stiffness: 350, damping: 22 }}
          className="relative flex h-18 w-18 sm:h-20 sm:w-20 items-center justify-center rounded-2xl border border-accent/40 bg-[var(--surface-elevated)] p-1.5 shadow-xl shadow-accent/25"
        >
          {/* Brand Logo Inner Badge */}
          <div className="flex h-full w-full flex-col items-center justify-center rounded-xl bg-accent p-2 text-fg shadow-inner">
            <Sparkles className="h-6 w-6 sm:h-7 sm:w-7 text-fg drop-shadow-sm" />
            <span className="mt-0.5 text-[9px] sm:text-[10px] font-semibold tracking-tight uppercase">
              ScaleUp
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
