"use client";

import Image from "next/image";

export function TestimonialsSection() {
  return (
    <section id="about" className="bg-background">
      {/* About Image with Text Overlay */}
      <div className="relative aspect-[16/9] w-full">
        <Image
          src="/images/testimonial-house.png"
          alt="E-invoicing platform infrastructure"
          fill
          className="object-cover"
        />
        {/* Fade gradient overlay - dark at bottom fading to transparent at top */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        
        {/* Text Overlay */}
        <div className="absolute inset-0 flex items-end justify-center px-6 pb-10 sm:pb-16 md:px-12 md:pb-24 lg:px-20 lg:pb-32">
          <p className="mx-auto max-w-5xl text-xl sm:text-2xl leading-relaxed text-white md:text-3xl lg:text-[2.5rem] lg:leading-snug text-center">
            API สำหรับ e-invoicing ที่แปลงกฎระเบียบภาษีไทยที่ซับซ้อนให้เป็น REST call ง่ายๆ —
            สร้างมาเพื่อนักพัฒนาที่ไม่ยอมเลือกระหว่างความเร็วกับความถูกต้อง
          </p>
        </div>
      </div>
    </section>
  );
}
