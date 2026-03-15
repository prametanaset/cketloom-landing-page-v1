"use client"

import { useEffect, useState } from "react"

export function NeonOrbs() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="neon-orbs-container absolute inset-0 overflow-hidden">
      {/* Top-left orb */}
      <div
        className={`neon-orb neon-orb--top-left absolute transition-all duration-1000 ease-out ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
        }`}
      >
        <div className="orb-light relative h-full w-full rounded-full">
          <div className="beam-container beam-spin-8">
            <div className="beam-light" />
          </div>
        </div>
      </div>

      {/* Bottom-center orb */}
      <div
        className={`neon-orb neon-orb--bottom-center absolute transition-all duration-1000 ease-out delay-300 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="orb-light relative h-full w-full rounded-full">
          <div className="beam-container beam-spin-10-reverse">
            <div className="beam-light" />
          </div>
        </div>
      </div>

      {/* Top-right orb (hidden on mobile) */}
      <div
        className={`neon-orb neon-orb--top-right neon-orb--desktop-only absolute transition-all duration-1000 ease-out delay-500 ${
          mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
        }`}
      >
        <div className="orb-light relative h-full w-full rounded-full">
          <div className="beam-container beam-spin-6">
            <div className="beam-light" />
          </div>
        </div>
      </div>

      {/* Bottom-right orb (hidden on mobile) */}
      <div
        className={`neon-orb neon-orb--bottom-right neon-orb--desktop-only absolute transition-all duration-1000 ease-out delay-700 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="orb-light relative h-full w-full rounded-full">
          <div className="beam-container beam-spin-7-reverse">
            <div className="beam-light" />
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* Container isolation for paint containment */
        .neon-orbs-container {
          contain: layout style paint;
        }

        /* ===== ORB POSITIONING — CSS media queries replace JS resize ===== */
        .neon-orb--top-left {
          top: -20%;
          left: -15%;
          width: 120vw;
          height: 120vw;
          max-width: 800px;
          max-height: 800px;
        }
        .neon-orb--bottom-center {
          bottom: -30%;
          left: 50%;
          transform: translateX(-50%);
          width: 140vw;
          height: 140vw;
          max-width: 1000px;
          max-height: 1000px;
        }
        .neon-orb--top-right {
          top: -15%;
          right: -15%;
          width: 100vw;
          height: 100vw;
          max-width: 700px;
          max-height: 700px;
        }
        .neon-orb--bottom-right {
          bottom: -20%;
          right: -5%;
          width: 110vw;
          height: 110vw;
          max-width: 750px;
          max-height: 750px;
        }

        /* Hide 2 orbs on mobile to cut GPU work in half */
        @media (max-width: 767px) {
          .neon-orb--desktop-only {
            display: none !important;
          }
        }

        @media (min-width: 768px) {
          .neon-orb--top-left {
            top: -40%;
            left: -20%;
            width: 80vw;
            height: 80vw;
          }
          .neon-orb--bottom-center {
            bottom: -50%;
            width: 100vw;
            height: 100vw;
          }
          .neon-orb--top-right {
            top: -30%;
            right: -25%;
            width: 70vw;
            height: 70vw;
          }
          .neon-orb--bottom-right {
            bottom: -35%;
            right: -15%;
            width: 75vw;
            height: 75vw;
          }
        }

        /* ===== BEAM CONTAINER ===== */
        .beam-container {
          position: absolute;
          inset: -2px;
          border-radius: 50%;
          will-change: transform;
          backface-visibility: hidden;
          transform: translateZ(0);
        }

        /* ===== BEAM LIGHT ===== */
        .beam-light {
          position: absolute;
          top: 0;
          left: 50%;
          width: 60px;
          height: 4px;
          margin-left: -30px;
          border-radius: 2px;
          transform: translateY(-50%) translateZ(0);
          backface-visibility: hidden;
          background: linear-gradient(90deg, transparent 0%, rgba(99, 102, 241, 0.5) 30%, rgba(129, 140, 248, 0.9) 70%, rgba(99, 102, 241, 1) 100%);
          box-shadow: 0 0 20px 4px rgba(99, 102, 241, 0.6), 0 0 40px 8px rgba(129, 140, 248, 0.3);
        }

        .dark .beam-light {
          background: linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.5) 30%, rgba(150, 200, 255, 0.9) 70%, white 100%);
          box-shadow: 0 0 20px 4px rgba(100, 180, 255, 0.8), 0 0 40px 8px rgba(59, 130, 246, 0.4);
        }

        /* Simplified beam shadow on mobile */
        @media (max-width: 767px) {
          .beam-light {
            width: 40px;
            margin-left: -20px;
            box-shadow: 0 0 12px 2px rgba(99, 102, 241, 0.4);
          }
          .dark .beam-light {
            box-shadow: 0 0 12px 2px rgba(100, 180, 255, 0.5);
          }
        }

        /* ===== ORB LIGHT ===== */
        .orb-light {
          background: radial-gradient(circle at 50% 50%, #f0f4ff 0%, #f0f4ff 90%, transparent 100%);
          box-shadow:
            0 0 60px 2px rgba(99, 102, 241, 0.3),
            0 0 100px 5px rgba(99, 102, 241, 0.15),
            inset 0 0 60px 2px rgba(99, 102, 241, 0.08);
          border: 1px solid rgba(99, 102, 241, 0.4);
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        .dark .orb-light {
          background: radial-gradient(circle at 50% 50%, #050a18 0%, #050a18 90%, transparent 100%);
          box-shadow:
            0 0 60px 2px rgba(59, 130, 246, 0.4),
            0 0 100px 5px rgba(59, 130, 246, 0.2),
            inset 0 0 60px 2px rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(100, 180, 255, 0.3);
        }

        /* Simplified orb shadow on mobile — single layer instead of 3 */
        @media (max-width: 767px) {
          .orb-light {
            box-shadow: 0 0 40px 2px rgba(99, 102, 241, 0.2);
          }
          .dark .orb-light {
            box-shadow: 0 0 40px 2px rgba(59, 130, 246, 0.3);
          }
        }

        /* ===== SPIN ANIMATIONS ===== */
        .beam-spin-6 {
          animation: neon-spin 6s linear infinite;
        }
        .beam-spin-7-reverse {
          animation: neon-spin-reverse 7s linear infinite;
        }
        .beam-spin-8 {
          animation: neon-spin 8s linear infinite;
        }
        .beam-spin-10-reverse {
          animation: neon-spin-reverse 10s linear infinite;
        }

        @keyframes neon-spin {
          from { transform: rotate(0deg) translateZ(0); }
          to { transform: rotate(360deg) translateZ(0); }
        }

        @keyframes neon-spin-reverse {
          from { transform: rotate(360deg) translateZ(0); }
          to { transform: rotate(0deg) translateZ(0); }
        }

        /* Respect reduced motion preference */
        @media (prefers-reduced-motion: reduce) {
          .beam-container {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  )
}
