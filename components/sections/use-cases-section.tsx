"use client";

import { ArrowUpRight } from "lucide-react";

/* ─── Inline mock illustrations ─── */

function CodeToInvoiceIllustration() {
  return (
    <div className="flex h-full items-end gap-3 px-4 pb-4">
      {/* Code snippet side */}
      <div className="flex-1 overflow-hidden rounded-lg border border-border bg-[#1e1e2e] p-3 shadow-lg">
        <div className="mb-2 flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <pre className="font-mono text-[10px] leading-relaxed text-white/80 md:text-xs">
          <code>
            <span className="text-gray-500">&lt;</span>
            <span className="text-red-400">div</span>{" "}
            <span className="text-sky-300">class</span>=<span className="text-amber-300">&quot;invoice&quot;</span>
            <span className="text-gray-500">&gt;</span>
            {"\n"}
            {"  "}<span className="text-gray-500">&lt;</span>
            <span className="text-red-400">h1</span>
            <span className="text-gray-500">&gt;</span>
            <span className="text-green-400">ใบกำกับภาษี</span>
            <span className="text-gray-500">&lt;/</span>
            <span className="text-red-400">h1</span>
            <span className="text-gray-500">&gt;</span>
            {"\n"}
            {"  "}<span className="text-gray-500">&lt;</span>
            <span className="text-red-400">p</span>{" "}
            <span className="text-sky-300">id</span>=<span className="text-amber-300">&quot;tax&quot;</span>
            <span className="text-gray-500">&gt;</span>
            <span className="text-green-400">0105...</span>
            <span className="text-gray-500">&lt;/</span>
            <span className="text-red-400">p</span>
            <span className="text-gray-500">&gt;</span>
            {"\n"}
            {"  "}<span className="text-gray-500">&lt;</span>
            <span className="text-red-400">table</span>
            <span className="text-gray-500">&gt;</span>
            {"\n"}
            {"    "}<span className="text-gray-500">&lt;</span>
            <span className="text-red-400">td</span>
            <span className="text-gray-500">&gt;</span>
            <span className="text-green-400">SaaS Pro</span>
            <span className="text-gray-500">&lt;/</span>
            <span className="text-red-400">td</span>
            <span className="text-gray-500">&gt;</span>
            {"\n"}
            {"    "}<span className="text-gray-500">&lt;</span>
            <span className="text-red-400">td</span>
            <span className="text-gray-500">&gt;</span>
            <span className="text-orange-300">15,000</span>
            <span className="text-gray-500">&lt;/</span>
            <span className="text-red-400">td</span>
            <span className="text-gray-500">&gt;</span>
            {"\n"}
            {"  "}<span className="text-gray-500">&lt;/</span>
            <span className="text-red-400">table</span>
            <span className="text-gray-500">&gt;</span>
            {"\n"}
            <span className="text-gray-500">&lt;/</span>
            <span className="text-red-400">div</span>
            <span className="text-gray-500">&gt;</span>
          </code>
        </pre>
      </div>
      {/* Arrow */}
      <div className="flex flex-col items-center gap-1 py-8">
        <div className="h-px w-6 bg-muted-foreground/40" />
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-muted-foreground/60">
          <path d="M8 2L14 8L8 14" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>
      {/* PDF document side */}
      <div className="flex-1 overflow-hidden rounded-lg border border-border bg-white p-3 shadow-lg dark:bg-neutral-900">
        <div className="mb-2 flex items-center justify-between">
          <span className="rounded bg-red-100 px-1.5 py-0.5 text-[9px] font-semibold text-red-600 dark:bg-red-900/30 dark:text-red-400">PDF/A-3</span>
          <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">XML</span>
        </div>
        <div className="space-y-1.5">
          <div className="h-2 w-3/4 rounded bg-muted" />
          <div className="h-2 w-1/2 rounded bg-muted" />
          <div className="mt-3 border-t border-dashed border-border pt-2">
            <div className="flex justify-between text-[9px] text-muted-foreground">
              <span>ภาษีมูลค่าเพิ่ม 7%</span>
              <span>1,050.00</span>
            </div>
            <div className="mt-1 flex justify-between text-[10px] font-semibold text-foreground">
              <span>รวม</span>
              <span>16,050.00</span>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-1">
            <svg className="h-3 w-3 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
            <span className="text-[9px] text-emerald-600 dark:text-emerald-400">Schema ถูกต้อง</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SubscriptionChartIllustration() {
  const months = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย."];
  const values = [32, 45, 58, 72, 89, 105];
  const maxVal = Math.max(...values);

  return (
    <div className="flex h-full flex-col justify-end px-4 pb-4">
      <div className="overflow-hidden rounded-lg border border-border bg-white p-4 shadow-lg dark:bg-neutral-900">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-xs font-medium text-foreground">เอกสารที่สร้างแล้ว</span>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">+18%</span>
        </div>
        <p className="mb-3 text-[10px] text-muted-foreground">สร้างอัตโนมัติตามรอบบิล</p>
        <div className="flex items-end gap-2">
          {values.map((v, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1">
              <div
                className="w-full rounded-sm bg-foreground/90 transition-all"
                style={{ height: `${(v / maxVal) * 60}px` }}
              />
              <span className="text-[8px] text-muted-foreground">{months[i]}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2 border-t border-border pt-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted">
            <svg className="h-3 w-3 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div>
            <p className="text-[10px] font-medium text-foreground">รอบถัดไป: 1 เม.ย. 2569</p>
            <p className="text-[9px] text-muted-foreground">105 ใบแจ้งหนี้ในคิว</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MarketplaceIllustration() {
  const merchants = [
    { name: "Store Alpha", docs: 1240, color: "bg-blue-500" },
    { name: "Store Beta", docs: 856, color: "bg-violet-500" },
    { name: "Store Gamma", docs: 2103, color: "bg-amber-500" },
  ];

  return (
    <div className="flex h-full flex-col justify-end px-4 pb-4">
      <div className="overflow-hidden rounded-lg border border-border bg-white p-3 shadow-lg dark:bg-neutral-900">
        <div className="mb-2 flex items-center gap-2">
          <div className="flex h-5 w-5 items-center justify-center rounded bg-foreground">
            <svg className="h-3 w-3 text-background" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
          </div>
          <span className="text-[11px] font-medium text-foreground">มัลติเทแนนท์</span>
        </div>
        <div className="space-y-2">
          {merchants.map((m, i) => (
            <div key={i} className="flex items-center gap-2 rounded-md border border-border p-2">
              <div className={`h-6 w-6 rounded-md ${m.color} flex items-center justify-center text-[9px] font-bold text-white`}>
                {m.name.charAt(6)}
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-medium text-foreground">{m.name}</p>
                <p className="text-[9px] text-muted-foreground">{m.docs.toLocaleString()} docs</p>
              </div>
              <svg className="h-3 w-3 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function POSIllustration() {
  return (
    <div className="flex h-full flex-col justify-end px-4 pb-4">
      <div className="overflow-hidden rounded-lg border border-border bg-white shadow-lg dark:bg-neutral-900">
        {/* POS header */}
        <div className="border-b border-border bg-muted/50 px-3 py-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-medium text-foreground">เครื่อง POS</span>
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
          </div>
        </div>
        <div className="p-3">
          <div className="space-y-1.5">
            <div className="flex justify-between text-[10px]">
              <span className="text-muted-foreground">Americano x2</span>
              <span className="text-foreground">160.00</span>
            </div>
            <div className="flex justify-between text-[10px]">
              <span className="text-muted-foreground">Croissant x1</span>
              <span className="text-foreground">85.00</span>
            </div>
            <div className="border-t border-dashed border-border pt-1.5">
              <div className="flex justify-between text-[11px] font-semibold">
                <span className="text-foreground">รวม</span>
                <span className="text-foreground">245.00</span>
              </div>
            </div>
          </div>
          <button className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-md bg-foreground py-2 text-[10px] font-medium text-background">
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            ขอ e-Tax Invoice
          </button>
          {/* QR */}
          <div className="mt-2 flex items-center gap-2 rounded-md border border-border p-2">
            <div className="grid h-8 w-8 grid-cols-4 grid-rows-4 gap-px">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className={`${[0,1,4,5,2,8,10,3,12,13,15,7].includes(i) ? "bg-foreground" : "bg-transparent"}`} />
              ))}
            </div>
            <div>
              <p className="text-[9px] font-medium text-foreground">สแกนเพื่อรับ e-Receipt</p>
              <p className="text-[8px] text-muted-foreground">ใช้ได้ภายใน 24 ชั่วโมง</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function IntegrationIllustration() {
  const systems = [
    { name: "SAP", short: "SAP" },
    { name: "Xero", short: "XR" },
    { name: "QBO", short: "QB" },
    { name: "MYOB", short: "MY" },
  ];

  return (
    <div className="flex h-full items-center justify-center px-4 pb-4 pt-2">
      <div className="relative flex w-full items-center justify-center">
        {/* Center node */}
        <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-xl border-2 border-foreground/20 bg-foreground shadow-lg">
          <span className="text-[10px] font-bold text-background">API</span>
        </div>
        {/* Connecting lines + system nodes */}
        {systems.map((sys, i) => {
          const angle = (i / systems.length) * 360 - 90;
          const rad = (angle * Math.PI) / 180;
          const radius = 70;
          const x = Math.cos(rad) * radius;
          const y = Math.sin(rad) * radius;

          return (
            <div key={i}>
              {/* Line */}
              <svg className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" width="200" height="200" viewBox="-100 -100 200 200">
                <line x1="0" y1="0" x2={x} y2={y} stroke="currentColor" strokeWidth="1" className="text-border" strokeDasharray="3 3" />
              </svg>
              {/* Node */}
              <div
                className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg border border-border bg-white shadow-md dark:bg-neutral-800"
                style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
              >
                <span className="text-[8px] font-semibold text-foreground">{sys.short}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DashboardIllustration() {
  const rows = [
    { id: "INV-2026-0341", buyer: "ABC Corp", amount: "53,500.00", status: "valid" },
    { id: "INV-2026-0340", buyer: "XYZ Ltd", amount: "128,000.00", status: "valid" },
    { id: "INV-2026-0339", buyer: "DEF Inc", amount: "21,400.00", status: "pending" },
    { id: "INV-2026-0338", buyer: "GHI Co", amount: "87,250.00", status: "valid" },
    { id: "INV-2026-0337", buyer: "JKL Corp", amount: "45,800.00", status: "valid" },
  ];

  return (
    <div className="flex h-full flex-col justify-end px-4 pb-4">
      <div className="overflow-hidden rounded-lg border border-border bg-white shadow-lg dark:bg-neutral-900">
        {/* Toolbar */}
        <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-medium text-foreground">ใบแจ้งหนี้ทั้งหมด</span>
            <span className="rounded-full bg-muted px-2 py-0.5 text-[9px] text-muted-foreground">2,847</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="rounded-md border border-border px-2 py-1 text-[9px] text-muted-foreground">ค้นหา...</div>
            <div className="rounded-md bg-foreground px-2.5 py-1 text-[9px] font-medium text-background">ส่งออก</div>
          </div>
        </div>
        {/* Table header */}
        <div className="grid grid-cols-[1fr_1fr_0.8fr_0.6fr] gap-2 border-b border-border px-4 py-2 text-[9px] font-medium text-muted-foreground">
          <span>เลขที่ใบแจ้งหนี้</span>
          <span>ผู้ซื้อ</span>
          <span className="text-right">จำนวน (บาท)</span>
          <span className="text-center">Schema</span>
        </div>
        {/* Rows */}
        {rows.map((row, i) => (
          <div key={i} className="grid grid-cols-[1fr_1fr_0.8fr_0.6fr] gap-2 border-b border-border px-4 py-2 text-[10px] last:border-0">
            <span className="font-mono text-foreground">{row.id}</span>
            <span className="text-muted-foreground">{row.buyer}</span>
            <span className="text-right font-mono text-foreground">{row.amount}</span>
            <span className="flex items-center justify-center">
              {row.status === "valid" ? (
                <svg className="h-3.5 w-3.5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
              ) : (
                <span className="rounded-full bg-amber-100 px-1.5 py-0.5 text-[8px] font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">รอดำเนินการ</span>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main Section ─── */

const useCases = [
  {
    title: "ออกแบบหน้าตาใบกำกับภาษีได้เองด้วย HTML Template",
    description:
      "สร้างเทมเพลต HTML ตามแบรนด์และธุรกิจของคุณ แล้วให้ API ของเราแปลงเป็น e-Tax Invoice ที่ได้มาตรฐาน ISO โดยอัตโนมัติ ไม่ต้องง้อดีไซเนอร์",
    illustration: CodeToInvoiceIllustration,
    className: "md:col-span-7 md:row-span-2",
  },
  {
    title: "ออกเอกสารอัตโนมัติสำหรับโมเดล Subscription",
    description:
      "หมดปัญหาแอดมินต้องมานั่งกดพิมพ์เอกสารทุกเดือน ระบบจะเจน XML และ PDF ส่งให้ลูกค้าสมาชิกของคุณอัตโนมัติตามรอบบิล",
    illustration: SubscriptionChartIllustration,
    className: "md:col-span-5 md:row-span-2",
  },
  {
    title: "โซลูชันสำหรับแพลตฟอร์มและมาร์เก็ตเพลส",
    description:
      "จัดการเอกสาร e-Tax ให้ร้านค้าย่อย (Merchants) นับหมื่นบนแพลตฟอร์มของคุณได้อย่างไร้รอยต่อ ผ่านสถาปัตยกรรมแบบ Multi-tenant",
    illustration: MarketplaceIllustration,
    className: "md:col-span-4 md:row-span-2",
  },
  {
    title: "เปลี่ยนสลิปหน้าร้านเป็น e-Tax ได้ทันที",
    description:
      "เชื่อมต่อ API ของเราเข้ากับระบบ Point-of-Sale เดิมของคุณ เพื่อออกใบกำกับภาษีอิเล็กทรอนิกส์ให้ลูกค้าหน้าร้านได้ภายใน 1 วินาที",
    illustration: POSIllustration,
    className: "md:col-span-4 md:row-span-2",
  },
  {
    title: "เชื่อมต่อข้อมูลไร้รอยต่อกับ ERP และระบบบัญชี",
    description:
      "ส่งโครงสร้างข้อมูล XML ที่แม่นยำ 100% เข้าสู่ระบบหลังบ้านขององค์กรทันที ลดงานคีย์ข้อมูลซ้ำซ้อนและป้องกัน Human Error",
    illustration: IntegrationIllustration,
    className: "md:col-span-4 md:row-span-2",
  },
  {
    title: "แดชบอร์ดตรวจสอบสถานะและบริหารจัดการที่ครบวงจร",
    description:
      "ติดตามทุกความเคลื่อนไหว ตรวจสอบความถูกต้องของ Schema ล่วงหน้าก่อนนำส่งจริง และจัดการสิทธิ์ผู้ใช้งานได้ง่ายๆ ในแดชบอร์ดเดียว",
    illustration: DashboardIllustration,
    className: "md:col-span-12 md:row-span-2",
  },
];

export function UseCasesSection() {
  return (
    <section className="relative bg-background py-20 md:py-32">
      <div className="px-6 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-12 max-w-3xl md:mb-16">
            <h2 className="text-3xl font-medium leading-tight tracking-tight text-foreground md:text-4xl lg:text-5xl">
              โซลูชัน API โครงสร้างพื้นฐานเอกสารภาษี
              <br className="hidden md:block" />
              ที่ยืดหยุ่นสำหรับทุกโมเดลธุรกิจ
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground md:mt-6 md:text-lg">
              ขยายขีดความสามารถซอฟต์แวร์ของคุณด้วยชุดเครื่องมือสร้าง e-Tax Invoice
              และ Hybrid Document ที่ครอบคลุม ออกแบบมาให้ Integrate ง่าย
              และจัดการความซับซ้อนของ Schema สรรพากรให้คุณทั้งหมด
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid auto-rows-[200px] grid-cols-1 gap-4 md:auto-rows-[180px] md:grid-cols-12">
            {useCases.map((useCase, index) => {
              const Illustration = useCase.illustration;
              return (
                <div
                  key={index}
                  className={`group relative overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-foreground/20 ${useCase.className}`}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between p-4 pb-0 md:p-5 md:pb-0">
                    <h3 className="max-w-[85%] text-sm font-medium leading-snug text-foreground md:text-base">
                      {useCase.title}
                    </h3>
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors group-hover:border-foreground/30 group-hover:text-foreground">
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                  {/* Description - visible on larger cards */}
                  <p className="px-4 pt-1 text-xs leading-relaxed text-muted-foreground md:px-5 md:text-[13px]">
                    {useCase.description}
                  </p>
                  {/* Illustration */}
                  <div className="flex-1">
                    <Illustration />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
