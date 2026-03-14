"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { NeonOrbs } from "@/components/neon-orbs";

const word = "CKETLOOM";

const sideImages = [
  {
    src: "/images/hero-side-1.jpg",
    alt: "E-invoicing platform dashboard",
    position: "left",
    span: 1,
  },
  {
    src: "/images/hero-side-1.jpg",
    alt: "API integration workflow",
    position: "left",
    span: 1,
  },
  {
    src: "/images/hero-side-1.jpg",
    alt: "XML document generation",
    position: "right",
    span: 1,
  },
  {
    src: "/images/hero-side-1.jpg",
    alt: "PDF/A-3 hybrid invoice",
    position: "right",
    span: 1,
  },
];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollableHeight = window.innerHeight * 2;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight));
      
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Text fades out first (0 to 0.2)
  const textOpacity = Math.max(0, 1 - (scrollProgress / 1));
  
  // Image transforms start after text fades (0.2 to 1)
  const imageProgress = Math.max(0, Math.min(1, (scrollProgress - 1) / 0.8));
  
  // Smooth interpolations - More balanced distribution
  const centerWidth = 100 - (imageProgress * 80); // 100% to 20% (same as each side image)
  const centerHeight = 100; // Always 100% height
  const sideWidth = imageProgress * 40; // 0% to 40% (20% per image, 2 images = 40%)
  const sideOpacity = imageProgress;
  const sideTranslateLeft = -100 + (imageProgress * 100); // -100% to 0%
  const sideTranslateRight = 100 - (imageProgress * 100); // 100% to 0%
  const borderRadius = 0; // No border radius
  const gap = imageProgress * 8; // 0px to 8px
  
  // Vertical offset for side columns to move them up on mobile
  const sideTranslateY = -(imageProgress * 15); // Move up by 15% when fully expanded

  return (
    <section ref={sectionRef} className="relative bg-background">
      {/* Sticky container for scroll animation */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* NeonOrbs background - fades out with text */}
        <div
          className="absolute inset-0 z-0"
          style={{ opacity: textOpacity }}
        >
          <NeonOrbs />
        </div>
        <div className="relative z-[1] flex h-full w-full items-center justify-center">
          {/* Bento Grid Container */}
          <div 
            className="relative flex h-full w-full items-stretch justify-center"
            style={{ gap: `${gap}px` }}
          >
            
            {/* Left Column */}
            {/* <div 
              className="flex h-full flex-row will-change-transform"
              style={{
                width: `${sideWidth}%`,
                gap: `${gap}px`,
                transform: `translateX(${sideTranslateLeft}%) translateY(${sideTranslateY}%)`,
                opacity: sideOpacity,
              }}
            >
              {sideImages.filter(img => img.position === "left").map((img, idx) => (
                <div 
                  key={idx} 
                  className="relative h-full overflow-hidden will-change-transform"
                  style={{
                    flex: img.span,
                    borderRadius: `${borderRadius}px`,
                  }}
                >
                  <Image
                    src={img.src || "/placeholder.svg"}
                    alt={img.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div> */}

            {/* Main Hero Image - Center */}
            <div 
              className="relative overflow-hidden will-change-transform"
              style={{
                width: `${centerWidth}%`,
                height: `${centerHeight}%`,
                flex: "0 0 auto",
                borderRadius: `${borderRadius}px`,
              }}
            >
              {/* Text Behind - Fades out first */}
              <div 
                className="absolute inset-0 z-0 flex items-center justify-center"
                style={{ opacity: textOpacity, transform: 'translateY(-200px)' }}
              >
                <h1 className="whitespace-nowrap text-[18vw] font-bold leading-[0.8] tracking-tighter text-black">
                  {word.split("").map((letter, index) => (
                    <span
                      key={index}
                      className="inline-block animate-[slideUp_0.8s_ease-out_forwards] opacity-0"
                      style={{
                        animationDelay: `${index * 0.08}s`,
                        transition: 'all 1.5s',
                        transitionTimingFunction: 'cubic-bezier(0.86, 0, 0.07, 1)',
                      }}
                    >
                      {letter}
                    </span>
                  ))}
                </h1>
              </div>
              
              {/* <Image
                src="/images/hero-mono.png"
                alt="E-invoicing platform hero"
                fill
                className="absolute inset-0 z-10 object-cover"
                priority
              /> */}
            </div>

            {/* Right Column */}
            {/* <div 
              className="flex h-full flex-row will-change-transform"
              style={{
                width: `${sideWidth}%`,
                gap: `${gap}px`,
                transform: `translateX(${sideTranslateRight}%) translateY(${sideTranslateY}%)`,
                opacity: sideOpacity,
              }}
            >
              {sideImages.filter(img => img.position === "right").map((img, idx) => (
                <div 
                  key={idx} 
                  className="relative h-full overflow-hidden will-change-transform"
                  style={{
                    flex: img.span,
                    borderRadius: `${borderRadius}px`,
                  }}
                >
                  <Image
                    src={img.src || "/placeholder.svg"}
                    alt={img.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div> */}

          </div>
        </div>
      </div>

      {/* Tagline + Waitlist Section - Fixed at bottom */}
      <div
        className="pointer-events-none fixed bottom-0 left-0 right-0 z-10 px-6 pb-12 md:px-12 md:pb-16 lg:px-20 lg:pb-20"
        style={{ opacity: textOpacity }}
      >
        <p className="mx-auto max-w-2xl text-center text-2xl leading-relaxed text-black md:text-3xl lg:text-[2.5rem] lg:leading-snug">
          โครงสร้างพื้นฐาน e-Tax Invoice
          <br />
          สำหรับประเทศไทย เพียง API เดียว
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const email = new FormData(form).get("email") as string;
            if (email) {
              // TODO: wire up to your API endpoint
              alert(`ขอบคุณ! ${email} ถูกเพิ่มเข้า waitlist เรียบร้อยแล้ว`);
              form.reset();
            }
          }}
          className="pointer-events-auto mx-auto mt-6 flex max-w-md items-center rounded-full border border-black/20 bg-white/90 p-1.5 shadow-lg backdrop-blur-sm dark:border-white/20 dark:bg-black/60 md:mt-8"
        >
          <input
            type="email"
            name="email"
            required
            placeholder="กรอกอีเมลของคุณ"
            className="flex-1 bg-transparent px-4 py-2.5 text-sm text-black outline-none placeholder:text-black/50 dark:text-white dark:placeholder:text-white/50 md:text-base"
          />
          <button
            type="submit"
            className="whitespace-nowrap rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80 md:text-base"
          >
            เข้าร่วม Waitlist
          </button>
        </form>
      </div>

      {/* Scroll space to enable animation */}
      <div className="h-[200vh]" />
    </section>
  );
}
