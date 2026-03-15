"use client";

import { useEffect, useRef, useState } from "react";
import { NeonOrbs } from "@/components/neon-orbs";

export function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = new FormData(form).get("email") as string;
    if (!email) return;

    setSubmitting(true);
    // TODO: wire up to your API endpoint
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    setSubmitted(true);
    form.reset();

    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-background">
      {/* NeonOrbs background */}
      <div className="absolute inset-0 z-0">
        <NeonOrbs />
      </div>

      {/* Big brand name */}
      <div className="pointer-events-none absolute inset-0 z-[1] flex items-start justify-center pt-[12vh] md:pt-[10vh]">
        <h2 className="whitespace-nowrap text-[18vw] font-bold leading-[0.85] tracking-tighter text-black dark:text-white">
          {"CKETLOOM".split("").map((letter, index) => (
            <span
              key={index}
              className="inline-block animate-[slideUp_0.8s_ease-out_forwards] opacity-0"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              {letter}
            </span>
          ))}
        </h2>
      </div>

      {/* Main content */}
      <div className="relative z-[2] flex min-h-[100svh] flex-col items-center justify-end px-6 pb-12 pt-32 md:px-12 md:pb-16 lg:px-20 lg:pb-20">
        {/* Headline — value proposition first */}
        <h1
          className={`max-w-4xl text-center font-medium text-4xl font-light leading-tight tracking-tight text-black transition-all duration-700 delay-100 ease-out dark:text-white md:text-5xl lg:text-5xl lg:leading-[0.8] ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          โครงสร้างพื้นฐานในการสร้าง e-Tax
        </h1>

        {/* Subtitle */}
        <p
          className={`mt-6 max-w-4xl text-center text-base font-medium leading-[1.2] text-black/60 transition-all duration-700 delay-200 ease-out dark:text-white/50 sm:text-xl md:text-4xl ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          สร้างและจัดการใบกำกับภาษีอิเล็กทรอนิกส์ผ่าน API เดียว รองรับตามมาตรฐาน
          กรมสรรพากร
        </p>

        {/* Waitlist form — inline */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className={`mt-10 flex w-full max-w-md items-center rounded-full border border-black/10 bg-white/80 p-1.5 shadow-lg backdrop-blur-md transition-all duration-700 delay-300 ease-out dark:border-white/15 dark:bg-white/5 md:mt-9 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <label htmlFor="hero-email" className="sr-only">
            อีเมล
          </label>
          <input
            id="hero-email"
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="กรอกอีเมลของคุณ"
            className="min-h-[44px] flex-1 bg-transparent px-4 text-sm text-black outline-none placeholder:text-black/40 dark:text-white dark:placeholder:text-white/40 md:text-base"
          />
          <button
            type="submit"
            disabled={submitting}
            className="min-h-[44px] cursor-pointer whitespace-nowrap rounded-full bg-black px-6 text-sm font-medium text-white transition-all duration-200 hover:bg-black/80 active:scale-[0.97] disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-white/80 md:text-base"
          >
            {submitting ? (
              <span className="inline-flex items-center gap-2">
                <svg
                  className="h-4 w-4 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="opacity-25"
                  />
                  <path
                    d="M4 12a8 8 0 018-8"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
                กำลังส่ง...
              </span>
            ) : submitted ? (
              <span className="inline-flex items-center gap-1.5">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                สำเร็จ!
              </span>
            ) : (
              "เข้าร่วม Waitlist"
            )}
          </button>
        </form>

        {/* Success message */}
        {submitted && (
          <p
            className="mt-3 text-sm text-emerald-600 dark:text-emerald-400"
            role="status"
            aria-live="polite"
          >
            ขอบคุณ! อีเมลของคุณถูกเพิ่มเข้า waitlist เรียบร้อยแล้ว
          </p>
        )}

        {/* Trust signals */}
        <div
          className={`mt-8 md:mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-black/50 transition-all duration-700 delay-500 ease-out dark:text-white/30 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <span className="flex items-center gap-1.5">
            <svg
              className="h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            XML ตามมาตรฐาน กรมสรรพากร
          </span>

          <span className="flex items-center gap-1.5">
            <svg
              className="h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
            PDF/A-3 ISO 19005-3
          </span>
          <span className="flex items-center gap-1.5">
            <svg
              className="h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
            RESTful API
          </span>
        </div>
      </div>
    </section>
  );
}
