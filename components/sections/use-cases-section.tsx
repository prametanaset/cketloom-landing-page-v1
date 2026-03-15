"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";

/* ─── Invoice dataset types & data ─── */

interface InvoiceTheme {
  accentFrom: string;
  accentTo: string;
  companyColor: string;
  companyColorDark: string;
  badge1Bg: string;
  badge1BgDark: string;
  badge1Text: string;
  badge1TextDark: string;
  badge1Label: string;
  badge2Bg: string;
  badge2BgDark: string;
  badge2Text: string;
  badge2TextDark: string;
  badge2Label: string;
  totalBg: string;
  totalBgDark: string;
  totalAccent: string;
  totalAccentDark: string;
}

interface InvoiceDataset {
  company: string;
  docTitle: string;
  invNo: string;
  date: string;
  labelNo: string;
  labelDate: string;
  labelSeller: string;
  labelBuyer: string;
  seller: string;
  buyer: string;
  labelItem: string;
  labelPrice: string;
  items: { name: string; qty?: string; price: string }[];
  labelSubtotal: string;
  subtotal: string;
  labelVat: string;
  vat: string;
  labelTotal: string;
  total: string;
  theme: InvoiceTheme;
  layout: 0 | 1 | 2 | 3;
  css: {
    selector: string;
    prop: string;
    value: string;
    selector2: string;
    prop2: string;
    value2: string;
  };
  taxId?: string;
  labelTaxId?: string;
  address?: string;
  buyerAddress?: string;
  paymentNote?: string;
  labelQty?: string;
}

const THEMES: InvoiceTheme[] = [
  // Thai — violet/indigo (original)
  {
    accentFrom: "from-violet-400",
    accentTo: "to-indigo-500",
    companyColor: "text-indigo-600",
    companyColorDark: "dark:text-indigo-400",
    badge1Bg: "bg-violet-100",
    badge1BgDark: "dark:bg-violet-900/40",
    badge1Text: "text-violet-600",
    badge1TextDark: "dark:text-violet-300",
    badge1Label: "PDF/A-3",
    badge2Bg: "bg-sky-100",
    badge2BgDark: "dark:bg-sky-900/40",
    badge2Text: "text-sky-600",
    badge2TextDark: "dark:text-sky-300",
    badge2Label: "XML",
    totalBg: "bg-indigo-50",
    totalBgDark: "dark:bg-indigo-900/20",
    totalAccent: "text-indigo-600",
    totalAccentDark: "dark:text-indigo-400",
  },
  // English — teal/slate corporate
  {
    accentFrom: "from-teal-400",
    accentTo: "to-cyan-600",
    companyColor: "text-teal-700",
    companyColorDark: "dark:text-teal-400",
    badge1Bg: "bg-teal-100",
    badge1BgDark: "dark:bg-teal-900/40",
    badge1Text: "text-teal-700",
    badge1TextDark: "dark:text-teal-300",
    badge1Label: "UBL",
    badge2Bg: "bg-emerald-100",
    badge2BgDark: "dark:bg-emerald-900/40",
    badge2Text: "text-emerald-700",
    badge2TextDark: "dark:text-emerald-300",
    badge2Label: "JSON",
    totalBg: "bg-teal-50",
    totalBgDark: "dark:bg-teal-900/20",
    totalAccent: "text-teal-700",
    totalAccentDark: "dark:text-teal-400",
  },
  // Japanese — rose/crimson elegant
  {
    accentFrom: "from-rose-400",
    accentTo: "to-red-600",
    companyColor: "text-rose-700",
    companyColorDark: "dark:text-rose-400",
    badge1Bg: "bg-rose-100",
    badge1BgDark: "dark:bg-rose-900/40",
    badge1Text: "text-rose-700",
    badge1TextDark: "dark:text-rose-300",
    badge1Label: "Peppol",
    badge2Bg: "bg-orange-100",
    badge2BgDark: "dark:bg-orange-900/40",
    badge2Text: "text-orange-700",
    badge2TextDark: "dark:text-orange-300",
    badge2Label: "適格",
    totalBg: "bg-rose-50",
    totalBgDark: "dark:bg-rose-900/20",
    totalAccent: "text-rose-700",
    totalAccentDark: "dark:text-rose-400",
  },
  // Thai #2 — amber/warm gold
  {
    accentFrom: "from-amber-400",
    accentTo: "to-orange-500",
    companyColor: "text-amber-700",
    companyColorDark: "dark:text-amber-400",
    badge1Bg: "bg-amber-100",
    badge1BgDark: "dark:bg-amber-900/40",
    badge1Text: "text-amber-700",
    badge1TextDark: "dark:text-amber-300",
    badge1Label: "ETDA",
    badge2Bg: "bg-yellow-100",
    badge2BgDark: "dark:bg-yellow-900/40",
    badge2Text: "text-yellow-700",
    badge2TextDark: "dark:text-yellow-300",
    badge2Label: "e-Tax",
    totalBg: "bg-amber-50",
    totalBgDark: "dark:bg-amber-900/20",
    totalAccent: "text-amber-700",
    totalAccentDark: "dark:text-amber-400",
  },
];

const INVOICE_DATASETS: InvoiceDataset[] = [
  {
    company: "บริษัท สยาม เทคโนโลยี จำกัด",
    docTitle: "ใบกำกับภาษี",
    invNo: "INV-2025-0042",
    date: "15 มี.ค. 2568",
    labelNo: "เลขที่",
    labelDate: "วันที่",
    labelSeller: "ผู้ขาย",
    labelBuyer: "ผู้ซื้อ",
    seller: "บริษัท สยาม เทคโนโลยี จำกัด",
    buyer: "บริษัท ไทย คอมเมิร์ซ จำกัด",
    labelItem: "รายการ",
    labelPrice: "ราคา",
    labelQty: "จำนวน",
    items: [
      { name: "บริการ API Pro", qty: "1", price: "฿15,000" },
      { name: "ค่า Support", qty: "12", price: "฿3,000" },
      { name: "ค่า Setup", qty: "1", price: "฿5,000" },
      { name: "SSL Certificate", qty: "2", price: "฿2,500" },
    ],
    labelSubtotal: "ก่อน VAT",
    subtotal: "฿25,500",
    labelVat: "VAT 7%",
    vat: "฿1,785",
    labelTotal: "รวมทั้งสิ้น",
    total: "฿27,285",
    taxId: "0105556012345",
    labelTaxId: "เลขประจำตัวผู้เสียภาษี",
    address: "123 ถ.สีลม แขวงสีลม เขตบางรัก กทม.",
    buyerAddress: "456 ถ.สุขุมวิท แขวงคลองเตย กทม.",
    theme: THEMES[0],
    layout: 0,
    css: {
      selector: ".invoice",
      prop: "font-family",
      value: "Sarabun, sans-serif",
      selector2: ".total",
      prop2: "color",
      value2: "#4f46e5",
    },
  },
  {
    company: "GLOBEX INC.",
    docTitle: "INVOICE",
    invNo: "INV-2025-1087",
    date: "15 Mar 2025",
    labelNo: "Invoice No.",
    labelDate: "Issue Date",
    labelSeller: "From",
    labelBuyer: "Bill To",
    seller: "Globex Inc.",
    buyer: "Stark Industries",
    labelItem: "Description",
    labelPrice: "Amount",
    labelQty: "Qty",
    items: [
      { name: "Cloud Hosting", qty: "1", price: "$2,400" },
      { name: "SSL Certificate", qty: "3", price: "$120" },
      { name: "CDN Bandwidth", qty: "1", price: "$350" },
      { name: "Monitoring", qty: "12", price: "$89" },
    ],
    labelSubtotal: "Subtotal",
    subtotal: "$2,959",
    labelVat: "Tax (7%)",
    vat: "$207",
    labelTotal: "Amount Due",
    total: "$3,166",
    address: "350 Fifth Ave, New York, NY 10118",
    buyerAddress: "200 Park Ave, New York, NY 10166",
    paymentNote: "Payment due within 30 days",
    theme: THEMES[1],
    layout: 1,
    css: {
      selector: ".invoice",
      prop: "max-width",
      value: "800px",
      selector2: ".total",
      prop2: "background",
      value2: "#0d9488",
    },
  },
  {
    company: "東京テック株式会社",
    docTitle: "請求書",
    invNo: "INV-2025-3391",
    date: "2025年3月15日",
    labelNo: "請求番号",
    labelDate: "発行日",
    labelSeller: "販売者",
    labelBuyer: "購入者",
    seller: "東京テック株式会社",
    buyer: "大阪商事株式会社",
    labelItem: "品目",
    labelPrice: "金額",
    labelQty: "数量",
    items: [
      { name: "SaaSライセンス", qty: "1", price: "¥350,000" },
      { name: "導入サポート", qty: "1", price: "¥80,000" },
      { name: "カスタム開発", qty: "2", price: "¥150,000" },
    ],
    labelSubtotal: "小計",
    subtotal: "¥580,000",
    labelVat: "消費税 10%",
    vat: "¥58,000",
    labelTotal: "合計",
    total: "¥638,000",
    address: "東京都渋谷区神宮前1-2-3",
    paymentNote: "お振込先：三菱UFJ銀行 渋谷支店",
    theme: THEMES[2],
    layout: 2,
    css: {
      selector: ".invoice",
      prop: "border",
      value: "1px solid #e5e7eb",
      selector2: ".hanko",
      prop2: "border-radius",
      value2: "50%",
    },
  },
  {
    company: "สยาม ดิจิทัล จำกัด",
    docTitle: "ใบกำกับภาษี",
    invNo: "INV-2568-0199",
    date: "15 มี.ค. 2568",
    labelNo: "เลขที่",
    labelDate: "วันที่",
    labelSeller: "ผู้ขาย",
    labelBuyer: "ผู้ซื้อ",
    seller: "สยาม ดิจิทัล จำกัด",
    buyer: "บจก. กรุงเทพ ซอฟต์",
    labelItem: "รายการ",
    labelPrice: "ราคา",
    labelQty: "จำนวน",
    items: [
      { name: "ระบบ e-Tax", qty: "1", price: "฿45,000" },
      { name: "ฝึกอบรม", qty: "3", price: "฿8,500" },
      { name: "บำรุงรักษา", qty: "12", price: "฿12,000" },
      { name: "API Gateway", qty: "1", price: "฿6,800" },
    ],
    labelSubtotal: "ก่อน VAT",
    subtotal: "฿72,300",
    labelVat: "VAT 7%",
    vat: "฿5,061",
    labelTotal: "รวมทั้งสิ้น",
    total: "฿77,361",
    taxId: "0105561234567",
    labelTaxId: "เลขประจำตัวผู้เสียภาษี",
    address: "789 ถ.พระราม 9 แขวงห้วยขวาง กทม.",
    buyerAddress: "321 ถ.รัชดาภิเษก แขวงดินแดง กทม.",
    paymentNote: "หมายเหตุ: ชำระภายใน 30 วัน",
    theme: THEMES[3],
    layout: 3,
    css: {
      selector: "table",
      prop: "width",
      value: "100%",
      selector2: ".total",
      prop2: "font-weight",
      value2: "bold",
    },
  },
];

/* ─── Shuffle text hook & component ─── */

const SHUFFLE_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789日月火水木金土";

interface ShuffleCharState {
  char: string;
  resolved: boolean;
}

function useShuffleChars(
  targetText: string,
  animKey: number,
): ShuffleCharState[] {
  const [chars, setChars] = useState<ShuffleCharState[]>(() =>
    Array.from(targetText).map((ch) => ({ char: ch, resolved: true })),
  );
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const len = targetText.length;

    if (animKey === 0) {
      setChars(
        Array.from(targetText).map((ch) => ({ char: ch, resolved: true })),
      );
      return;
    }

    const resolvedFlags = new Array(len).fill(false);
    const charBuf: string[] = [];
    for (let i = 0; i < len; i++) {
      if (targetText[i] === " ") {
        charBuf[i] = " ";
        resolvedFlags[i] = true;
      } else {
        charBuf[i] =
          SHUFFLE_CHARS[Math.floor(Math.random() * SHUFFLE_CHARS.length)];
      }
    }

    // Eased resolve timing — ease-out wave (fast start, slow tail)
    const waveDuration = Math.max(len * 25, 300);
    const resolveTimes: number[] = [];
    for (let i = 0; i < len; i++) {
      const t = len > 1 ? i / (len - 1) : 0;
      const eased = 1 - Math.pow(1 - t, 2.5);
      resolveTimes[i] = 100 + eased * waveDuration;
    }

    const lastScramble = new Array(len).fill(0);
    const startTime = performance.now();

    setChars(
      charBuf.map((ch, i) => ({ char: ch, resolved: resolvedFlags[i] })),
    );

    const tick = (now: number) => {
      const elapsed = now - startTime;
      let allDone = true;

      for (let i = 0; i < len; i++) {
        if (resolvedFlags[i]) continue;

        if (elapsed >= resolveTimes[i]) {
          resolvedFlags[i] = true;
          charBuf[i] = targetText[i];
          continue;
        }

        allDone = false;

        // Settling: scramble rate decelerates as char nears resolution
        const progress = elapsed / resolveTimes[i];
        const interval = progress > 0.8 ? 75 : progress > 0.5 ? 45 : 25;

        if (elapsed - lastScramble[i] >= interval) {
          charBuf[i] =
            SHUFFLE_CHARS[Math.floor(Math.random() * SHUFFLE_CHARS.length)];
          lastScramble[i] = elapsed;
        }
      }

      setChars(
        charBuf.map((ch, i) => ({ char: ch, resolved: resolvedFlags[i] })),
      );

      if (!allDone) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [targetText, animKey]);

  return chars;
}

function ShuffleText({ text, animKey }: { text: string; animKey: number }) {
  const chars = useShuffleChars(text, animKey);
  return (
    <>
      {chars.map((c, i) => (
        <span
          key={i}
          style={{
            opacity: c.resolved ? 1 : 0.4,
            transition: c.resolved ? "opacity 200ms ease-out" : "none",
          }}
        >
          {c.char}
        </span>
      ))}
    </>
  );
}

/* ─── Invoice paper layout components ─── */

interface InvoicePaperProps {
  d: InvoiceDataset;
  t: InvoiceTheme;
  animKey: number;
}

/** Layout 0: Thai Tax Invoice (ใบกำกับภาษี) — Revenue Department format */
function InvoicePaperClassic({ d, t, animKey }: InvoicePaperProps) {
  return (
    <>
      <div
        className={`absolute bottom-0 left-0 top-0 w-0.5 bg-gradient-to-b transition-colors duration-700 ${t.accentFrom} ${t.accentTo}`}
      />
      {/* "ต้นฉบับ" watermark at top-right */}
      <div className="absolute right-2 top-1.5 text-[7px] font-bold tracking-wider text-neutral-300 dark:text-neutral-700">
        ต้นฉบับ
      </div>
      <div className="p-3 pl-4">
        {/* Header */}
        <div className="flex items-start justify-between pr-8">
          <div>
            <p
              className={`text-[11px] font-normal tracking-wider transition-colors duration-700 ${t.companyColor} ${t.companyColorDark}`}
            >
              <ShuffleText text={d.company} animKey={animKey} />
            </p>
            <p className="mt-0.5 text-[14px] font-extrabold tracking-tight text-neutral-900 dark:text-white">
              <ShuffleText text={d.docTitle} animKey={animKey} />
            </p>
            {d.taxId && (
              <p className="mt-0.5 text-[7px] text-neutral-400">
                <ShuffleText text={`${d.labelTaxId}: ${d.taxId}`} animKey={animKey} />
              </p>
            )}
          </div>
          {/* <div className="flex items-center gap-1">
            <span
              className={`rounded-full px-1.5 py-0.5 text-center text-[6.5px] font-bold transition-colors duration-700 ${t.badge1Bg} ${t.badge1BgDark} ${t.badge1Text} ${t.badge1TextDark}`}
            >
              {t.badge1Label}
            </span>
            <span
              className={`rounded-full px-1.5 py-0.5 text-center text-[6.5px] font-bold transition-colors duration-700 ${t.badge2Bg} ${t.badge2BgDark} ${t.badge2Text} ${t.badge2TextDark}`}
            >
              {t.badge2Label}
            </span>
          </div> */}
        </div>
        {/* Divider */}
        <div className="my-1.5 h-px bg-neutral-200 dark:bg-neutral-700" />
        {/* Info grid */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-1">
          <div>
            <p className="text-[6.5px] font-semibold uppercase tracking-[0.1em] text-neutral-400">
              <ShuffleText text={d.labelNo} animKey={animKey} />
            </p>
            <p className="text-[9.5px] font-semibold text-neutral-700 dark:text-neutral-300">
              <ShuffleText text={d.invNo} animKey={animKey} />
            </p>
          </div>
          <div>
            <p className="text-[6.5px] font-semibold uppercase tracking-[0.1em] text-neutral-400">
              <ShuffleText text={d.labelDate} animKey={animKey} />
            </p>
            <p className="text-[9.5px] font-semibold text-neutral-700 dark:text-neutral-300">
              <ShuffleText text={d.date} animKey={animKey} />
            </p>
          </div>
          <div>
            <p className="text-[6.5px] font-semibold uppercase tracking-[0.1em] text-neutral-400">
              <ShuffleText text={d.labelSeller} animKey={animKey} />
            </p>
            <p className="text-[9px] text-neutral-600 dark:text-neutral-400">
              <ShuffleText text={d.seller} animKey={animKey} />
            </p>
            {d.address && (
              <p className="text-[7px] text-neutral-400 dark:text-neutral-500">
                <ShuffleText text={d.address} animKey={animKey} />
              </p>
            )}
          </div>
          <div>
            <p className="text-[6.5px] font-semibold uppercase tracking-[0.1em] text-neutral-400">
              <ShuffleText text={d.labelBuyer} animKey={animKey} />
            </p>
            <p className="text-[9px] text-neutral-600 dark:text-neutral-400">
              <ShuffleText text={d.buyer} animKey={animKey} />
            </p>
            {d.buyerAddress && (
              <p className="text-[7px] text-neutral-400 dark:text-neutral-500">
                <ShuffleText text={d.buyerAddress} animKey={animKey} />
              </p>
            )}
          </div>
        </div>
        {/* 3-column items table */}
        <div className="mt-2">
          <div className="grid grid-cols-[1fr_auto_auto] gap-x-3 border-b-2 border-neutral-200 pb-1 text-[6.5px] font-bold uppercase tracking-[0.1em] text-neutral-400 dark:border-neutral-700">
            <span>
              <ShuffleText text={d.labelItem} animKey={animKey} />
            </span>
            <span className="text-center">
              <ShuffleText text={d.labelQty || "Qty"} animKey={animKey} />
            </span>
            <span className="text-right">
              <ShuffleText text={d.labelPrice} animKey={animKey} />
            </span>
          </div>
          {d.items.map((item, i) => (
            <div
              key={i}
              className="grid grid-cols-[1fr_auto_auto] gap-x-3 border-b border-neutral-100 py-1 text-[9.5px] dark:border-neutral-800"
            >
              <span className="font-medium text-neutral-700 dark:text-neutral-300">
                <ShuffleText text={item.name} animKey={animKey} />
              </span>
              <span className="text-center tabular-nums text-neutral-500 dark:text-neutral-400">
                <ShuffleText text={item.qty || "1"} animKey={animKey} />
              </span>
              <span className="text-right tabular-nums text-neutral-800 dark:text-neutral-200">
                <ShuffleText text={item.price} animKey={animKey} />
              </span>
            </div>
          ))}
        </div>
        {/* Totals */}
        <div className="mt-1.5 space-y-0.5 border-t border-neutral-200 pt-1 dark:border-neutral-700">
          <div className="flex justify-between text-[8.5px]">
            <span className="text-neutral-400">
              <ShuffleText text={d.labelSubtotal} animKey={animKey} />
            </span>
            <span className="tabular-nums text-neutral-600 dark:text-neutral-400">
              <ShuffleText text={d.subtotal} animKey={animKey} />
            </span>
          </div>
          <div className="flex justify-between text-[8.5px]">
            <span className="text-neutral-400">
              <ShuffleText text={d.labelVat} animKey={animKey} />
            </span>
            <span className="tabular-nums text-neutral-600 dark:text-neutral-400">
              <ShuffleText text={d.vat} animKey={animKey} />
            </span>
          </div>
          <div
            className={`flex justify-between rounded px-2 py-1 text-[11px] font-bold transition-colors duration-700 ${t.totalBg} ${t.totalBgDark}`}
          >
            <span className="text-neutral-900 dark:text-white">
              <ShuffleText text={d.labelTotal} animKey={animKey} />
            </span>
            <span
              className={`tabular-nums transition-colors duration-700 ${t.totalAccent} ${t.totalAccentDark}`}
            >
              <ShuffleText text={d.total} animKey={animKey} />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

/** Layout 1: Western B2B Invoice — Stripe/AWS style */
function InvoicePaperBanner({ d, t, animKey }: InvoicePaperProps) {
  return (
    <>
      {/* Clean top section — company left, INVOICE right */}
      <div className="flex items-start justify-between border-b border-neutral-200 px-3 pb-2 pt-3 dark:border-neutral-700">
        <div>
          <p
            className={`text-[11px] font-normal tracking-wider transition-colors duration-700 ${t.companyColor} ${t.companyColorDark}`}
          >
            <ShuffleText text={d.company} animKey={animKey} />
          </p>
          {d.address && (
            <p className="mt-0.5 text-[7px] text-neutral-400 dark:text-neutral-500">
              <ShuffleText text={d.address} animKey={animKey} />
            </p>
          )}
        </div>
        <div className="flex flex-col items-end gap-0.5">
          <p className="text-[14px] font-extrabold tracking-wider text-neutral-200 dark:text-neutral-700">
            <ShuffleText text={d.docTitle} animKey={animKey} />
          </p>
          {/* <div className="flex gap-1">
            <span
              className={`rounded-full px-1.5 py-0.5 text-[6.5px] font-bold transition-colors duration-700 ${t.badge1Bg} ${t.badge1BgDark} ${t.badge1Text} ${t.badge1TextDark}`}
            >
              {t.badge1Label}
            </span>
            <span
              className={`rounded-full px-1.5 py-0.5 text-[6.5px] font-bold transition-colors duration-700 ${t.badge2Bg} ${t.badge2BgDark} ${t.badge2Text} ${t.badge2TextDark}`}
            >
              {t.badge2Label}
            </span>
          </div> */}
        </div>
      </div>
      <div className="p-3">
        {/* Invoice details + Bill To */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-1">
          <div>
            <p className="text-[6.5px] font-semibold uppercase tracking-[0.1em] text-neutral-400">
              <ShuffleText text={d.labelNo} animKey={animKey} />
            </p>
            <p className="text-[9.5px] font-semibold text-neutral-700 dark:text-neutral-300">
              <ShuffleText text={d.invNo} animKey={animKey} />
            </p>
          </div>
          <div>
            <p className="text-[6.5px] font-semibold uppercase tracking-[0.1em] text-neutral-400">
              <ShuffleText text={d.labelDate} animKey={animKey} />
            </p>
            <p className="text-[9.5px] font-semibold text-neutral-700 dark:text-neutral-300">
              <ShuffleText text={d.date} animKey={animKey} />
            </p>
          </div>
          <div>
            <p className="text-[6.5px] font-semibold uppercase tracking-[0.1em] text-neutral-400">
              <ShuffleText text={d.labelBuyer} animKey={animKey} />
            </p>
            <p className="text-[9px] text-neutral-600 dark:text-neutral-400">
              <ShuffleText text={d.buyer} animKey={animKey} />
            </p>
            {d.buyerAddress && (
              <p className="text-[7px] text-neutral-400 dark:text-neutral-500">
                <ShuffleText text={d.buyerAddress} animKey={animKey} />
              </p>
            )}
          </div>
          <div>
            <p className="text-[6.5px] font-semibold uppercase tracking-[0.1em] text-neutral-400">
              Terms
            </p>
            <p className="text-[9px] text-neutral-600 dark:text-neutral-400">
              Net 30
            </p>
          </div>
        </div>
        {/* 3-column items table with header bg */}
        <div className="mt-2">
          <div className="grid grid-cols-[1fr_auto_auto] gap-x-3 rounded-t bg-neutral-100 px-1.5 py-1 text-[6.5px] font-bold uppercase tracking-[0.1em] text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400">
            <span>
              <ShuffleText text={d.labelItem} animKey={animKey} />
            </span>
            <span className="text-center">
              <ShuffleText text={d.labelQty || "Qty"} animKey={animKey} />
            </span>
            <span className="text-right">
              <ShuffleText text={d.labelPrice} animKey={animKey} />
            </span>
          </div>
          {d.items.map((item, i) => (
            <div
              key={i}
              className="grid grid-cols-[1fr_auto_auto] gap-x-3 border-b border-neutral-100 px-1.5 py-1 text-[9.5px] dark:border-neutral-800"
            >
              <span className="font-medium text-neutral-700 dark:text-neutral-300">
                <ShuffleText text={item.name} animKey={animKey} />
              </span>
              <span className="text-center tabular-nums text-neutral-500 dark:text-neutral-400">
                <ShuffleText text={item.qty || "1"} animKey={animKey} />
              </span>
              <span className="text-right tabular-nums text-neutral-800 dark:text-neutral-200">
                <ShuffleText text={item.price} animKey={animKey} />
              </span>
            </div>
          ))}
        </div>
        {/* Totals */}
        <div className="mt-1.5 space-y-0.5 pt-1">
          <div className="flex justify-between text-[8.5px]">
            <span className="text-neutral-400">
              <ShuffleText text={d.labelSubtotal} animKey={animKey} />
            </span>
            <span className="tabular-nums text-neutral-600 dark:text-neutral-400">
              <ShuffleText text={d.subtotal} animKey={animKey} />
            </span>
          </div>
          <div className="flex justify-between text-[8.5px]">
            <span className="text-neutral-400">
              <ShuffleText text={d.labelVat} animKey={animKey} />
            </span>
            <span className="tabular-nums text-neutral-600 dark:text-neutral-400">
              <ShuffleText text={d.vat} animKey={animKey} />
            </span>
          </div>
          <div className="flex items-center justify-between border-t-2 border-neutral-300 pt-1 dark:border-neutral-600">
            <span className="text-[9.5px] font-bold text-neutral-900 dark:text-white">
              <ShuffleText text={d.labelTotal} animKey={animKey} />
            </span>
            <span
              className={`text-[12px] font-extrabold tabular-nums transition-colors duration-700 ${t.totalAccent} ${t.totalAccentDark}`}
            >
              <ShuffleText text={d.total} animKey={animKey} />
            </span>
          </div>
        </div>
        {/* Payment note */}
        {d.paymentNote && (
          <p className="mt-1.5 text-center text-[7px] text-neutral-400 dark:text-neutral-500">
            <ShuffleText text={d.paymentNote} animKey={animKey} />
          </p>
        )}
      </div>
    </>
  );
}

/** Layout 2: Japanese Invoice (請求書) — seikyu-sho format */
function InvoicePaperMinimal({ d, t, animKey }: InvoicePaperProps) {
  return (
    <div className="p-3">
      {/* Title centered — formal Japanese style */}
      <p className="text-center text-[15px] font-extrabold tracking-wider text-neutral-900 dark:text-white">
        <ShuffleText text={d.docTitle} animKey={animKey} />
      </p>
      {/* Invoice no. + date right-aligned (Japanese convention) */}
      <div className="mt-1 flex justify-end gap-3 text-[7.5px] text-neutral-500 dark:text-neutral-400">
        <span>
          <ShuffleText text={`${d.labelNo}: ${d.invNo}`} animKey={animKey} />
        </span>
        <span>
          <ShuffleText text={`${d.labelDate}: ${d.date}`} animKey={animKey} />
        </span>
      </div>
      {/* Buyer with 御中 + seller with hanko */}
      <div className="mt-1.5 flex items-start justify-between">
        <div>
          <p className="text-[10px] font-bold text-neutral-800 dark:text-neutral-200">
            <ShuffleText text={d.buyer} animKey={animKey} />
            <span className="ml-1 text-[9px] font-normal text-neutral-500">御中</span>
          </p>
          {/* <div className="mt-0.5 flex gap-1">
            <span
              className={`rounded-full px-1.5 py-0.5 text-[6.5px] font-bold transition-colors duration-700 ${t.badge1Bg} ${t.badge1BgDark} ${t.badge1Text} ${t.badge1TextDark}`}
            >
              {t.badge1Label}
            </span>
            <span
              className={`rounded-full px-1.5 py-0.5 text-[6.5px] font-bold transition-colors duration-700 ${t.badge2Bg} ${t.badge2BgDark} ${t.badge2Text} ${t.badge2TextDark}`}
            >
              {t.badge2Label}
            </span>
          </div> */}
        </div>
        <div className="flex items-start gap-1.5">
          <div className="text-right">
            <p
              className={`text-[8px] font-semibold tracking-wider transition-colors duration-700 ${t.companyColor} ${t.companyColorDark}`}
            >
              <ShuffleText text={d.company} animKey={animKey} />
            </p>
            {d.address && (
              <p className="text-[6.5px] text-neutral-400 dark:text-neutral-500">
                <ShuffleText text={d.address} animKey={animKey} />
              </p>
            )}
          </div>
          {/* Hanko seal — right side near company name */}
          <div className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white ring-2 ring-red-400/40 ring-offset-1 ring-offset-white shadow-md dark:ring-offset-neutral-900">
            {d.company.charAt(0)}
          </div>
        </div>
      </div>
      {/* Bordered table — Japanese invoices use visible borders */}
      <div className="mt-2 border border-neutral-300 dark:border-neutral-600">
        <div className="grid grid-cols-[1fr_auto_auto] gap-x-2 border-b border-neutral-300 bg-neutral-50 px-1.5 py-1 text-[6.5px] font-bold text-neutral-500 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
          <span>
            <ShuffleText text={d.labelItem} animKey={animKey} />
          </span>
          <span className="text-center">
            <ShuffleText text={d.labelQty || "数量"} animKey={animKey} />
          </span>
          <span className="text-right">
            <ShuffleText text={d.labelPrice} animKey={animKey} />
          </span>
        </div>
        {d.items.map((item, i) => (
          <div
            key={i}
            className={`grid grid-cols-[1fr_auto_auto] gap-x-2 px-1.5 py-1 text-[9.5px] ${i < d.items.length - 1 ? "border-b border-neutral-200 dark:border-neutral-700" : ""}`}
          >
            <span className="font-medium text-neutral-700 dark:text-neutral-300">
              <ShuffleText text={item.name} animKey={animKey} />
            </span>
            <span className="text-center tabular-nums text-neutral-500 dark:text-neutral-400">
              <ShuffleText text={item.qty || "1"} animKey={animKey} />
            </span>
            <span className="text-right tabular-nums text-neutral-800 dark:text-neutral-200">
              <ShuffleText text={item.price} animKey={animKey} />
            </span>
          </div>
        ))}
      </div>
      {/* Totals with 税込 note */}
      <div className="mt-1.5 space-y-0.5">
        <div className="flex justify-between text-[8.5px]">
          <span className="text-neutral-400">
            <ShuffleText text={d.labelSubtotal} animKey={animKey} />
          </span>
          <span className="tabular-nums text-neutral-600 dark:text-neutral-400">
            <ShuffleText text={d.subtotal} animKey={animKey} />
          </span>
        </div>
        <div className="flex justify-between text-[8.5px]">
          <span className="text-neutral-400">
            <ShuffleText text={d.labelVat} animKey={animKey} />
          </span>
          <span className="tabular-nums text-neutral-600 dark:text-neutral-400">
            <ShuffleText text={d.vat} animKey={animKey} />
          </span>
        </div>
        <div className="flex items-baseline justify-between border-t-2 border-neutral-300 pt-1 dark:border-neutral-600">
          <span className="text-[9.5px] font-semibold text-neutral-900 dark:text-white">
            <ShuffleText text={d.labelTotal} animKey={animKey} />
            <span className="ml-1 text-[7px] font-normal text-neutral-400">（税込）</span>
          </span>
          <span
            className={`text-[14px] font-extrabold tabular-nums tracking-tight transition-colors duration-700 ${t.totalAccent} ${t.totalAccentDark}`}
          >
            <ShuffleText text={d.total} animKey={animKey} />
          </span>
        </div>
      </div>
      {/* Bank transfer info — ubiquitous on Japanese invoices */}
      {d.paymentNote && (
        <p className="mt-1.5 border-t border-dashed border-neutral-200 pt-1 text-[7px] text-neutral-400 dark:border-neutral-700 dark:text-neutral-500">
          <ShuffleText text={d.paymentNote} animKey={animKey} />
        </p>
      )}
    </div>
  );
}

/** Layout 3: Thai e-Tax Invoice — modern fintech (Leceipt/FlowAccount style) */
function InvoicePaperSplit({ d, t, animKey }: InvoicePaperProps) {
  return (
    <>
      {/* Top gradient stripe */}
      <div
        className={`h-0.5 bg-gradient-to-r transition-colors duration-700 ${t.accentFrom} ${t.accentTo}`}
      />
      {/* Split header with QR code placeholder */}
      <div className="bg-amber-50/80 px-3 py-2 dark:bg-amber-900/15">
        <div className="flex items-center justify-between">
          <div>
            <p
              className={`text-[10px] font-normal tracking-wider transition-colors duration-700 ${t.companyColor} ${t.companyColorDark}`}
            >
              <ShuffleText text={d.company} animKey={animKey} />
            </p>
            <p className="text-[13px] font-extrabold tracking-tight text-neutral-900 dark:text-white">
              <ShuffleText text={d.docTitle} animKey={animKey} />
            </p>
            {d.taxId && (
              <p className="text-[6.5px] text-neutral-500 dark:text-neutral-400">
                <ShuffleText text={`${d.labelTaxId}: ${d.taxId}`} animKey={animKey} />
              </p>
            )}
          </div>
          <div className="flex items-start gap-1.5">
            <div className="flex flex-col gap-0.5">
              {/* <div className="flex gap-1">
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[6.5px] font-bold transition-colors duration-700 ${t.badge1Bg} ${t.badge1BgDark} ${t.badge1Text} ${t.badge1TextDark}`}
                >
                  {t.badge1Label}
                </span>
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[6.5px] font-bold transition-colors duration-700 ${t.badge2Bg} ${t.badge2BgDark} ${t.badge2Text} ${t.badge2TextDark}`}
                >
                  {t.badge2Label}
                </span>
              </div> */}
            </div>
            {/* QR code placeholder — e-Tax invoices always have QR */}
            <div className="grid h-[20px] w-[20px] shrink-0 grid-cols-4 grid-rows-4 gap-[1px] rounded-sm border border-neutral-300 p-[2px] dark:border-neutral-600">
              {Array.from({ length: 16 }).map((_, i) => (
                <div
                  key={i}
                  className={`${[0, 1, 3, 4, 5, 7, 8, 11, 12, 13, 15].includes(i) ? "bg-neutral-800 dark:bg-neutral-300" : "bg-transparent"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="px-3 pb-0">
        {/* Invoice number + date row */}
        <div className="mt-1.5 flex gap-4 text-[8.5px]">
          <div>
            <span className="text-[6.5px] font-semibold uppercase tracking-[0.1em] text-neutral-400">
              <ShuffleText text={d.labelNo} animKey={animKey} />
            </span>
            <p className="font-semibold text-neutral-700 dark:text-neutral-300">
              <ShuffleText text={d.invNo} animKey={animKey} />
            </p>
          </div>
          <div>
            <span className="text-[6.5px] font-semibold uppercase tracking-[0.1em] text-neutral-400">
              <ShuffleText text={d.labelDate} animKey={animKey} />
            </span>
            <p className="font-semibold text-neutral-700 dark:text-neutral-300">
              <ShuffleText text={d.date} animKey={animKey} />
            </p>
          </div>
        </div>
        {/* Seller / Buyer two columns with Tax IDs */}
        <div className="mt-1.5 flex divide-x divide-neutral-200 dark:divide-neutral-700">
          <div className="flex-1 pr-2">
            <p className="text-[6.5px] font-semibold uppercase tracking-[0.1em] text-neutral-400">
              <ShuffleText text={d.labelSeller} animKey={animKey} />
            </p>
            <p className="text-[9px] text-neutral-600 dark:text-neutral-400">
              <ShuffleText text={d.seller} animKey={animKey} />
            </p>
            {d.address && (
              <p className="text-[6.5px] text-neutral-400 dark:text-neutral-500">
                <ShuffleText text={d.address} animKey={animKey} />
              </p>
            )}
          </div>
          <div className="flex-1 pl-2">
            <p className="text-[6.5px] font-semibold uppercase tracking-[0.1em] text-neutral-400">
              <ShuffleText text={d.labelBuyer} animKey={animKey} />
            </p>
            <p className="text-[9px] text-neutral-600 dark:text-neutral-400">
              <ShuffleText text={d.buyer} animKey={animKey} />
            </p>
            {d.buyerAddress && (
              <p className="text-[6.5px] text-neutral-400 dark:text-neutral-500">
                <ShuffleText text={d.buyerAddress} animKey={animKey} />
              </p>
            )}
          </div>
        </div>
        {/* 3-column items table with alternating rows */}
        <div className="mt-2">
          <div className="grid grid-cols-[1fr_auto_auto] gap-x-2 border-b-2 border-neutral-200 pb-1 text-[6.5px] font-bold uppercase tracking-[0.1em] text-neutral-400 dark:border-neutral-700">
            <span>
              <ShuffleText text={d.labelItem} animKey={animKey} />
            </span>
            <span className="text-center">
              <ShuffleText text={d.labelQty || "จำนวน"} animKey={animKey} />
            </span>
            <span className="text-right">
              <ShuffleText text={d.labelPrice} animKey={animKey} />
            </span>
          </div>
          {d.items.map((item, i) => (
            <div
              key={i}
              className={`grid grid-cols-[1fr_auto_auto] gap-x-2 rounded py-1 text-[9.5px] ${i % 2 === 0 ? "bg-neutral-50 dark:bg-neutral-800/50" : ""} -mx-1.5 px-1.5`}
            >
              <span className="font-medium text-neutral-700 dark:text-neutral-300">
                <ShuffleText text={item.name} animKey={animKey} />
              </span>
              <span className="text-center tabular-nums text-neutral-500 dark:text-neutral-400">
                <ShuffleText text={item.qty || "1"} animKey={animKey} />
              </span>
              <span className="text-right tabular-nums text-neutral-800 dark:text-neutral-200">
                <ShuffleText text={item.price} animKey={animKey} />
              </span>
            </div>
          ))}
        </div>
        {/* Totals */}
        <div className="mt-1.5 space-y-0.5">
          <div className="flex justify-between text-[8.5px]">
            <span className="text-neutral-400">
              <ShuffleText text={d.labelSubtotal} animKey={animKey} />
            </span>
            <span className="tabular-nums text-neutral-600 dark:text-neutral-400">
              <ShuffleText text={d.subtotal} animKey={animKey} />
            </span>
          </div>
          <div className="flex justify-between text-[8.5px]">
            <span className="text-neutral-400">
              <ShuffleText text={d.labelVat} animKey={animKey} />
            </span>
            <span className="tabular-nums text-neutral-600 dark:text-neutral-400">
              <ShuffleText text={d.vat} animKey={animKey} />
            </span>
          </div>
        </div>
      </div>
      {/* Full-bleed total bar */}
      <div
        className={`mt-1 flex items-center justify-between px-3 py-1.5 text-[11px] font-bold transition-colors duration-700 ${t.totalBg} ${t.totalBgDark}`}
      >
        <span className="text-neutral-900 dark:text-white">
          <ShuffleText text={d.labelTotal} animKey={animKey} />
        </span>
        <span
          className={`tabular-nums tracking-tight transition-colors duration-700 ${t.totalAccent} ${t.totalAccentDark}`}
        >
          <ShuffleText text={d.total} animKey={animKey} />
        </span>
      </div>
      {/* Payment note */}
      {d.paymentNote && (
        <p className="px-3 py-1 text-[6.5px] text-neutral-400 dark:text-neutral-500">
          <ShuffleText text={d.paymentNote} animKey={animKey} />
        </p>
      )}
    </>
  );
}

const INVOICE_LAYOUTS = [
  InvoicePaperClassic,
  InvoicePaperBanner,
  InvoicePaperMinimal,
  InvoicePaperSplit,
];

/* ─── Inline mock illustrations ─── */

function CodeToInvoiceIllustration() {
  const [datasetIndex, setDatasetIndex] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    let iv: ReturnType<typeof setInterval>;

    const start = () => {
      iv = setInterval(() => {
        setDatasetIndex((prev) => (prev + 1) % INVOICE_DATASETS.length);
        setAnimKey((prev) => prev + 1);
      }, 5500);
    };

    const handleVisibility = () => {
      if (document.hidden) {
        clearInterval(iv);
      } else {
        start();
      }
    };

    start();
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      clearInterval(iv);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  const d = INVOICE_DATASETS[datasetIndex];
  const t = d.theme;

  return (
    <div className="relative h-full">
      {/* Left — HTML code editor (absolute, overflows and gets clipped by card) */}
      <div className="absolute left-2 top-10 z-10 w-[46%] overflow-hidden rounded-t-xl border border-b-0 border-neutral-200 bg-neutral-50 shadow-lg md:left-10 md:top-10 md:w-[48%] dark:border-neutral-700 dark:bg-[#1a1b2e]">
        {/* Window chrome */}
        <div className="flex items-center gap-1.5 border-b border-neutral-200 bg-neutral-100/80 px-2.5 py-1.5 dark:border-white/[0.06] dark:bg-[#16172a]">
          <div className="flex gap-1">
            <span className="h-[5px] w-[5px] rounded-full bg-neutral-300 dark:bg-[#ff5f57]" />
            <span className="h-[5px] w-[5px] rounded-full bg-neutral-300 dark:bg-[#febc2e]" />
            <span className="h-[5px] w-[5px] rounded-full bg-neutral-300 dark:bg-[#28c840]" />
          </div>
        </div>
        {/* Code lines — use inline-block spans for visible indentation */}
        <div className="space-y-[1px] p-2 font-mono text-[8px] leading-[1.7] md:text-[9.5px]">
          <p className="flex">
            <span className="mr-2 inline-block w-3 shrink-0 text-right text-neutral-400 dark:text-neutral-600">
              1
            </span>
            <span className="text-rose-600 dark:text-pink-400">
              &lt;style&gt;
            </span>
          </p>
          <p className="flex">
            <span className="mr-2 inline-block w-3 shrink-0 text-right text-neutral-400 dark:text-neutral-600">
              2
            </span>
            <span className="inline-block w-2 shrink-0" />
            <span className="text-sky-600 dark:text-sky-300">
              <ShuffleText text={d.css.selector} animKey={animKey} />
            </span>
            {"\u00A0"}
            <span className="text-neutral-500 dark:text-neutral-400">
              {"{"}
            </span>
            {"\u00A0"}
            <span className="text-violet-600 dark:text-violet-300">
              <ShuffleText text={d.css.prop} animKey={animKey} />
            </span>
            <span className="text-neutral-500 dark:text-neutral-400">:</span>
            {"\u00A0"}
            <span className="text-emerald-600 dark:text-emerald-300">
              <ShuffleText text={d.css.value} animKey={animKey} />
            </span>
            <span className="text-neutral-500 dark:text-neutral-400">;</span>
            {"\u00A0"}
            <span className="text-neutral-500 dark:text-neutral-400">
              {"}"}
            </span>
          </p>
          <p className="flex">
            <span className="mr-2 inline-block w-3 shrink-0 text-right text-neutral-400 dark:text-neutral-600">
              3
            </span>
            <span className="inline-block w-2 shrink-0" />
            <span className="text-sky-600 dark:text-sky-300">
              <ShuffleText text={d.css.selector2} animKey={animKey} />
            </span>
            {"\u00A0"}
            <span className="text-neutral-500 dark:text-neutral-400">
              {"{"}
            </span>
            {"\u00A0"}
            <span className="text-violet-600 dark:text-violet-300">
              <ShuffleText text={d.css.prop2} animKey={animKey} />
            </span>
            <span className="text-neutral-500 dark:text-neutral-400">:</span>
            {"\u00A0"}
            <span className="text-emerald-600 dark:text-emerald-300">
              <ShuffleText text={d.css.value2} animKey={animKey} />
            </span>
            <span className="text-neutral-500 dark:text-neutral-400">;</span>
            {"\u00A0"}
            <span className="text-neutral-500 dark:text-neutral-400">
              {"}"}
            </span>
          </p>
          <p className="flex">
            <span className="mr-2 inline-block w-3 shrink-0 text-right text-neutral-400 dark:text-neutral-600">
              4
            </span>
            <span className="text-rose-600 dark:text-pink-400">
              &lt;/style&gt;
            </span>
          </p>
          <p className="flex">
            <span className="mr-2 inline-block w-3 shrink-0 text-right text-neutral-400 dark:text-neutral-600">
              5
            </span>
            <span className="text-rose-600 dark:text-pink-400">&lt;div</span>
            {"\u00A0"}
            <span className="text-violet-600 dark:text-violet-300">class</span>
            <span className="text-neutral-500 dark:text-neutral-400">=</span>
            <span className="text-emerald-600 dark:text-emerald-300">
              &quot;invoice&quot;
            </span>
            <span className="text-rose-600 dark:text-pink-400">&gt;</span>
          </p>
          <p className="flex">
            <span className="mr-2 inline-block w-3 shrink-0 text-right text-neutral-400 dark:text-neutral-600">
              6
            </span>
            <span className="inline-block w-2 shrink-0" />
            <span className="text-rose-600 dark:text-pink-400">
              &lt;header&gt;
            </span>
          </p>
          <p className="flex">
            <span className="mr-2 inline-block w-3 shrink-0 text-right text-neutral-400 dark:text-neutral-600">
              7
            </span>
            <span className="inline-block w-4 shrink-0" />
            <span className="text-rose-600 dark:text-pink-400">&lt;h1&gt;</span>
            <span className="text-amber-600 dark:text-amber-300">
              <ShuffleText text={d.company} animKey={animKey} />
            </span>
            <span className="text-rose-600 dark:text-pink-400">
              &lt;/h1&gt;
            </span>
          </p>
          <p className="flex">
            <span className="mr-2 inline-block w-3 shrink-0 text-right text-neutral-400 dark:text-neutral-600">
              8
            </span>
            <span className="inline-block w-4 shrink-0" />
            <span className="text-rose-600 dark:text-pink-400">
              &lt;span&gt;
            </span>
            <span className="text-amber-600 dark:text-amber-300">
              <ShuffleText text={d.invNo} animKey={animKey} />
            </span>
            <span className="text-rose-600 dark:text-pink-400">
              &lt;/span&gt;
            </span>
          </p>
          <p className="flex">
            <span className="mr-2 inline-block w-3 shrink-0 text-right text-neutral-400 dark:text-neutral-600">
              9
            </span>
            <span className="inline-block w-2 shrink-0" />
            <span className="text-rose-600 dark:text-pink-400">
              &lt;/header&gt;
            </span>
          </p>
          <p className="flex">
            <span className="mr-2 inline-block w-3 shrink-0 text-right text-neutral-400 dark:text-neutral-600">
              10
            </span>
            <span className="inline-block w-2 shrink-0" />
            <span className="text-rose-600 dark:text-pink-400">
              &lt;table&gt;
            </span>
          </p>
          <p className="flex rounded bg-violet-50 dark:bg-white/[0.04]">
            <span className="mr-2 inline-block w-3 shrink-0 text-right text-neutral-400 dark:text-neutral-600">
              11
            </span>
            <span className="inline-block w-4 shrink-0" />
            <span className="text-rose-600 dark:text-pink-400">&lt;tr</span>
            {"\u00A0"}
            <span className="text-violet-600 dark:text-violet-300">each</span>
            <span className="text-neutral-500 dark:text-neutral-400">=</span>
            <span className="text-emerald-600 dark:text-emerald-300">
              &quot;items&quot;
            </span>
            <span className="text-rose-600 dark:text-pink-400">&gt;</span>
          </p>
          <p className="flex rounded bg-violet-50 dark:bg-white/[0.04]">
            <span className="mr-2 inline-block w-3 shrink-0 text-right text-neutral-400 dark:text-neutral-600">
              12
            </span>
            <span className="inline-block w-6 shrink-0" />
            <span className="text-rose-600 dark:text-pink-400">&lt;td&gt;</span>
            <span className="text-amber-600 dark:text-amber-300">
              <ShuffleText text={d.items[0].name} animKey={animKey} />
            </span>
            <span className="text-rose-600 dark:text-pink-400">
              &lt;/td&gt;
            </span>
          </p>
          <p className="flex rounded bg-violet-50 dark:bg-white/[0.04]">
            <span className="mr-2 inline-block w-3 shrink-0 text-right text-neutral-400 dark:text-neutral-600">
              13
            </span>
            <span className="inline-block w-6 shrink-0" />
            <span className="text-rose-600 dark:text-pink-400">&lt;td&gt;</span>
            <span className="text-amber-600 dark:text-amber-300">
              <ShuffleText text={d.items[0].price} animKey={animKey} />
            </span>
            <span className="text-rose-600 dark:text-pink-400">
              &lt;/td&gt;
            </span>
          </p>
          <p className="flex">
            <span className="mr-2 inline-block w-3 shrink-0 text-right text-neutral-400 dark:text-neutral-600">
              14
            </span>
            <span className="inline-block w-4 shrink-0" />
            <span className="text-rose-600 dark:text-pink-400">
              &lt;/tr&gt;
            </span>
          </p>
          <p className="flex">
            <span className="mr-2 inline-block w-3 shrink-0 text-right text-neutral-400 dark:text-neutral-600">
              15
            </span>
            <span className="inline-block w-2 shrink-0" />
            <span className="text-rose-600 dark:text-pink-400">
              &lt;/table&gt;
            </span>
          </p>
          <p className="flex">
            <span className="mr-2 inline-block w-3 shrink-0 text-right text-neutral-400 dark:text-neutral-600">
              16
            </span>
            <span className="inline-block w-2 shrink-0" />
            <span className="text-rose-600 dark:text-pink-400">&lt;div</span>
            {"\u00A0"}
            <span className="text-violet-600 dark:text-violet-300">class</span>
            <span className="text-neutral-500 dark:text-neutral-400">=</span>
            <span className="text-emerald-600 dark:text-emerald-300">
              &quot;total&quot;
            </span>
            <span className="text-rose-600 dark:text-pink-400">&gt;</span>
          </p>
          <p className="flex">
            <span className="mr-2 inline-block w-3 shrink-0 text-right text-neutral-400 dark:text-neutral-600">
              17
            </span>
            <span className="inline-block w-4 shrink-0" />
            <span className="text-amber-600 dark:text-amber-300">
              <ShuffleText text={d.total} animKey={animKey} />
            </span>
          </p>
          <p className="flex">
            <span className="mr-2 inline-block w-3 shrink-0 text-right text-neutral-400 dark:text-neutral-600">
              18
            </span>
            <span className="inline-block w-2 shrink-0" />
            <span className="text-rose-600 dark:text-pink-400">
              &lt;/div&gt;
            </span>
          </p>
          <p className="flex">
            <span className="mr-2 inline-block w-3 shrink-0 text-right text-neutral-400 dark:text-neutral-600">
              19
            </span>
            <span className="text-rose-600 dark:text-pink-400">
              &lt;/div&gt;
            </span>
          </p>
        </div>
      </div>

      {/* Right — Rendered invoice document (absolute, starts slightly lower, overlaps code editor) */}
      <div className="absolute right-2 top-16 z-20 w-[54%] md:right-10 md:top-25 md:w-[52%]">
        {/* Outer frosted bezel */}
        <div className="h-full rounded-t-xl border border-b-0 border-white/10 bg-neutral-300/40 p-1.5 pb-0 shadow-2xl backdrop-blur-xl dark:bg-white/[0.08]">
          {/* Inner paper */}
          <div className="relative h-full overflow-hidden rounded-t-lg bg-white dark:bg-neutral-900">
            {(() => {
              const PaperLayout = INVOICE_LAYOUTS[d.layout];
              return <PaperLayout d={d} t={t} animKey={animKey} />;
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}

function SubscriptionChartIllustration() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 overflow-hidden px-4">
      {/* ──── Row 1: Package Info Card ──── */}
      <div className="w-full max-w-[320px] rounded-xl border border-neutral-200 bg-white p-5 shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
        {/* Plan header with icon */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 dark:bg-violet-900/40">
            <svg className="h-5 w-5 text-violet-600 dark:text-violet-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-bold text-neutral-900 dark:text-white">แพ็กเกจ Pro</p>
            <p className="text-xs text-neutral-400">เรียกเก็บเงินรายเดือน</p>
          </div>
        </div>

        {/* Token pricing */}
        <div className="mt-4">
          <p className="text-[13px] font-semibold text-neutral-700 dark:text-neutral-300">โทเค็น</p>
          <p className="text-xs text-neutral-400">฿0.35 ต่อ 1,000 หน่วย</p>
        </div>

        {/* Usage meter */}
        <div className="mt-4">
          <div className="flex items-center gap-1.5">
            <svg className="h-4 w-4 text-neutral-500 dark:text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20V10" /><path d="M18 20V4" /><path d="M6 20v-4" />
            </svg>
            <p className="text-xs font-medium text-neutral-600 dark:text-neutral-400">ตัววัดการใช้งาน</p>
          </div>
          <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
            <div className="h-full w-[65%] rounded-full bg-gradient-to-r from-violet-500 via-orange-400 to-rose-400" />
          </div>
        </div>
      </div>

      {/* ──── Row 2: e-Tax Email Alert Card ──── */}
      <div className="w-full max-w-[320px] rounded-xl border border-neutral-200 bg-white p-5 shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
        {/* Alert header */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
            <svg className="h-4.5 w-4.5 text-neutral-600 dark:text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-bold text-neutral-900 dark:text-white">ส่ง e-Tax Invoice ทางอีเมลแล้ว</p>
            <p className="text-[11px] text-neutral-400">เมื่อ 2 นาทีที่แล้ว</p>
          </div>
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500">
            <svg className="h-3.5 w-3.5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {/* Email details */}
        <div className="mt-3 rounded-lg bg-neutral-50 p-3 dark:bg-neutral-800">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-medium uppercase tracking-wider text-neutral-400">เอกสาร</p>
            <p className="text-[10px] font-medium uppercase tracking-wider text-neutral-400">ผู้รับ</p>
          </div>
          <div className="mt-1 flex items-center justify-between">
            <p className="text-[13px] font-semibold text-neutral-900 dark:text-white">INV-2568-0042</p>
            <p className="text-xs text-neutral-600 dark:text-neutral-300">finance@abc.co.th</p>
          </div>
        </div>

        {/* Amount */}
        <div className="mt-3 flex items-center justify-between">
          <p className="text-xs text-neutral-500 dark:text-neutral-400">จำนวนเงินรวม VAT</p>
          <p className="text-base font-bold text-neutral-900 dark:text-white">฿18,725.00</p>
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
            <svg
              className="h-3 w-3 text-background"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <span className="text-[11px] font-medium text-foreground">
            มัลติเทแนนท์
          </span>
        </div>
        <div className="space-y-2">
          {merchants.map((m, i) => (
            <div
              key={i}
              className="flex items-center gap-2 rounded-md border border-border p-2"
            >
              <div
                className={`h-6 w-6 rounded-md ${m.color} flex items-center justify-center text-[9px] font-bold text-white`}
              >
                {m.name.charAt(6)}
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-medium text-foreground">
                  {m.name}
                </p>
                <p className="text-[9px] text-muted-foreground">
                  {m.docs.toLocaleString()} docs
                </p>
              </div>
              <svg
                className="h-3 w-3 text-emerald-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function POSIllustration() {
  return (
    <div className="flex h-full items-center justify-center">
      {/* iPhone 15 Pro frame with overlaid app content */}
      <div className="relative w-[220px]" style={{ aspectRatio: "433 / 882" }}>
        {/* Layer 1: iPhone 15 Pro SVG frame (base) */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 433 882"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer body */}
          <path
            d="M2 73C2 32.6832 34.6832 0 75 0H357C397.317 0 430 32.6832 430 73V809C430 849.317 397.317 882 357 882H75C34.6832 882 2 849.317 2 809V73Z"
            className="fill-[#E5E5E5] dark:fill-[#404040]"
          />
          {/* Left buttons */}
          <path
            d="M0 171C0 170.448 0.447715 170 1 170H3V204H1C0.447715 204 0 203.552 0 203V171Z"
            className="fill-[#E5E5E5] dark:fill-[#404040]"
          />
          <path
            d="M1 234C1 233.448 1.44772 233 2 233H3.5V300H2C1.44772 300 1 299.552 1 299V234Z"
            className="fill-[#E5E5E5] dark:fill-[#404040]"
          />
          <path
            d="M1 319C1 318.448 1.44772 318 2 318H3.5V385H2C1.44772 385 1 384.552 1 384V319Z"
            className="fill-[#E5E5E5] dark:fill-[#404040]"
          />
          {/* Right button */}
          <path
            d="M430 279H432C432.552 279 433 279.448 433 280V384C433 384.552 432.552 385 432 385H430V279Z"
            className="fill-[#E5E5E5] dark:fill-[#404040]"
          />
          {/* Inner bezel */}
          <path
            d="M6 74C6 35.3401 37.3401 4 76 4H356C394.66 4 426 35.3401 426 74V808C426 846.66 394.66 878 356 878H76C37.3401 878 6 846.66 6 808V74Z"
            className="dark:fill-[#262626] fill-white"
          />
          {/* Top notch accent */}
          <path
            opacity="0.5"
            d="M174 5H258V5.5C258 6.60457 257.105 7.5 256 7.5H176C174.895 7.5 174 6.60457 174 5.5V5Z"
            className="fill-[#E5E5E5] dark:fill-[#404040]"
          />
          {/* Screen area background */}
          <path
            d="M21.25 75C21.25 44.2101 46.2101 19.25 77 19.25H355C385.79 19.25 410.75 44.2101 410.75 75V807C410.75 837.79 385.79 862.75 355 862.75H77C46.2101 862.75 21.25 837.79 21.25 807V75Z"
            className="fill-[#E5E5E5] dark:fill-[#404040] stroke-[#E5E5E5] dark:stroke-[#404040]"
            strokeWidth="0.5"
          />
        </svg>

        {/* Layer 2: App screen content (on top of SVG frame, below dynamic island) */}
        <div
          className="absolute z-10 overflow-hidden bg-[#C8E64A] dark:bg-[#3a4a10]"
          style={{
            left: "4.9%",
            top: "2.18%",
            width: "89.95%",
            height: "95.63%",
            borderRadius: "12.87% / 6.6%",
          }}
        >
          {/* Decorative diagonal lines */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-[20%] top-0 h-[200%] w-px origin-top rotate-[25deg] bg-[#b8d63a] dark:bg-[#4a5a18]" />
            <div className="absolute left-[55%] top-0 h-[200%] w-px origin-top rotate-[25deg] bg-[#b8d63a] dark:bg-[#4a5a18]" />
            <div className="absolute left-[80%] top-0 h-[200%] w-px origin-top rotate-[25deg] bg-[#b8d63a] dark:bg-[#4a5a18]" />
          </div>

          {/* Status bar */}
          <div className="relative z-10 flex items-center justify-between px-5 pt-[18%] pb-1">
            <span className="text-[7px] font-medium text-neutral-800 dark:text-neutral-300">9:41</span>
            <div className="flex items-center gap-1">
              <svg className="h-[7px] w-[14px] text-neutral-800 dark:text-neutral-300" fill="currentColor" viewBox="0 0 20 10">
                <rect x="0" y="4" width="3" height="6" rx="0.5" />
                <rect x="4" y="2" width="3" height="8" rx="0.5" />
                <rect x="8" y="0" width="3" height="10" rx="0.5" />
                <rect x="13" y="1" width="6" height="8" rx="1" stroke="currentColor" strokeWidth="0.5" fill="none" />
                <rect x="14" y="2.5" width="4" height="5" rx="0.5" />
                <rect x="19" y="3.5" width="1" height="3" rx="0.5" />
              </svg>
            </div>
          </div>

          {/* App content */}
          <div className="relative z-10 flex flex-col px-5 pt-3">
            {/* App icon */}
            <div className="mb-6">
              <svg className="h-8 w-8 text-neutral-900 dark:text-neutral-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 2v5a1 1 0 001 1h5" />
              </svg>
            </div>

            {/* Large title */}
            <h3 className="text-[20px] font-extrabold leading-tight text-neutral-900 dark:text-neutral-100">
              e-Tax
              <br />
              Invoice
            </h3>

            {/* Subtitle */}
            <p className="mt-2 text-[9px] leading-relaxed text-neutral-700 dark:text-neutral-300">
              ออกใบกำกับภาษีอิเล็กทรอนิกส์
              <br />
              ภายใน 2 นาที
            </p>

            {/* Buttons */}
            <div className="mt-6 flex flex-col items-center gap-2">
              {/* Sign in with Apple */}
              <button className="flex w-full items-center justify-center gap-1.5 rounded-full bg-white py-2 text-[9px] font-medium text-neutral-900 dark:bg-neutral-200">
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                Sign in with Apple
              </button>

              {/* Get started */}
              <button className="flex w-full items-center justify-center rounded-full bg-neutral-900 py-2 text-[9px] font-medium text-white dark:bg-neutral-100 dark:text-neutral-900">
                เริ่มต้นใช้งาน
              </button>
            </div>

            {/* by cketloom */}
            <p className="mt-4 pb-2 text-center text-[7px] text-neutral-600 dark:text-neutral-400">
              by cketloom
            </p>
          </div>
        </div>

        {/* Layer 3: Dynamic island (topmost, above content) */}
        <svg
          className="pointer-events-none absolute inset-0 z-20 h-full w-full"
          viewBox="0 0 433 882"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M154 48.5C154 38.2827 162.283 30 172.5 30H259.5C269.717 30 278 38.2827 278 48.5C278 58.7173 269.717 67 259.5 67H172.5C162.283 67 154 58.7173 154 48.5Z"
            className="dark:fill-[#262626] fill-[#F5F5F5]"
          />
          <path
            d="M249 48.5C249 42.701 253.701 38 259.5 38C265.299 38 270 42.701 270 48.5C270 54.299 265.299 59 259.5 59C253.701 59 249 54.299 249 48.5Z"
            className="dark:fill-[#262626] fill-[#F5F5F5]"
          />
          <path
            d="M254 48.5C254 45.4624 256.462 43 259.5 43C262.538 43 265 45.4624 265 48.5C265 51.5376 262.538 54 259.5 54C256.462 54 254 51.5376 254 48.5Z"
            className="fill-[#E5E5E5] dark:fill-[#404040]"
          />
        </svg>
      </div>
    </div>
  );
}

function GlobalNetworkIllustration() {
  const nodes: [number, number][] = [
    [85, 55],
    [95, 72],
    [110, 45],
    [130, 68],
    [148, 52],
    [100, 88],
    [120, 105],
    [142, 82],
    [158, 98],
    [88, 108],
    [72, 85],
    [162, 72],
    [105, 122],
    [138, 118],
    [115, 62],
    [128, 42],
    [68, 78],
    [155, 108],
    [82, 102],
    [168, 88],
  ];
  const lines: [number, number, number, number][] = [
    [85, 55, 110, 45],
    [110, 45, 130, 68],
    [130, 68, 148, 52],
    [95, 72, 120, 105],
    [100, 88, 142, 82],
    [120, 105, 138, 118],
    [72, 85, 88, 108],
    [158, 98, 162, 72],
    [115, 62, 128, 42],
    [85, 55, 95, 72],
    [130, 68, 142, 82],
    [100, 88, 88, 108],
    [148, 52, 162, 72],
    [82, 102, 72, 85],
    [155, 108, 138, 118],
  ];

  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden">
      <svg
        viewBox="40 20 160 130"
        className="absolute h-[130%] w-[130%] translate-x-[10%] translate-y-[5%]"
      >
        {/* Globe arcs */}
        <circle
          cx="120"
          cy="80"
          r="55"
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="0.5"
        />
        <ellipse
          cx="120"
          cy="80"
          rx="55"
          ry="25"
          fill="none"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="0.5"
          transform="rotate(-25 120 80)"
        />
        <ellipse
          cx="120"
          cy="80"
          rx="25"
          ry="55"
          fill="none"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="0.5"
        />
        {/* Highlight arc */}
        <path
          d="M 78 58 A 48 48 0 0 1 162 58"
          fill="none"
          stroke="rgba(236,72,153,0.25)"
          strokeWidth="0.8"
          strokeDasharray="3 2"
        />
        {/* Lines */}
        {lines.map(([x1, y1, x2, y2], i) => (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="0.4"
          />
        ))}
        {/* Dots */}
        {nodes.map(([cx, cy], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={i < 5 ? 2.2 : i < 10 ? 1.4 : 0.8}
            fill={
              i < 2
                ? "rgba(167,139,250,0.8)"
                : i < 6
                  ? "rgba(255,255,255,0.45)"
                  : "rgba(255,255,255,0.15)"
            }
          />
        ))}
        {/* Labeled nodes */}
        {[
          { x: 110, y: 45, label: "SAP" },
          { x: 142, y: 82, label: "ERP" },
          { x: 88, y: 108, label: "QBO" },
        ].map((n, i) => (
          <g key={`label-${i}`}>
            <circle
              cx={n.x}
              cy={n.y}
              r="6"
              fill="rgba(139,92,246,0.3)"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="0.4"
            />
            <text
              x={n.x}
              y={n.y + 1}
              textAnchor="middle"
              fill="white"
              fontSize="3.5"
              fontWeight="600"
              fontFamily="system-ui"
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ─── Main Section ─── */

const useCases = [
  {
    title: "ออกแบบหน้าตาใบกำกับภาษีได้เองด้วย HTML Template",
    illustration: CodeToInvoiceIllustration,
    className: "md:col-span-8 md:row-span-2",
    dark: false,
  },
  {
    title: "ออกเอกสารอัตโนมัติสำหรับโมเดล Subscription",
    illustration: SubscriptionChartIllustration,
    className: "md:col-span-4 md:row-span-2",
    dark: false,
  },
  {
    title: "โซลูชันสำหรับแพลตฟอร์มและมาร์เก็ตเพลส",
    illustration: MarketplaceIllustration,
    className: "md:col-span-4 md:row-span-2",
    dark: false,
  },
  {
    title: "สร้างโปรแกรมออกใบกำกับภาษี",
    illustration: POSIllustration,
    className: "md:col-span-4 md:row-span-2",
    dark: false,
  },
  {
    title: "เชื่อมต่อข้อมูลไร้รอยต่อกับ ERP และระบบบัญชี",
    illustration: GlobalNetworkIllustration,
    className: "md:col-span-4 md:row-span-2",
    dark: true,
  },
];

export function UseCasesSection() {
  return (
    <section className="relative bg-background py-20 md:py-32">
      <div className="px-6 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          {/* Bento Grid */}
          <div className="grid auto-rows-[300px] grid-cols-1 gap-3 md:auto-rows-[280px] md:grid-cols-12">
            {useCases.map((useCase, index) => {
              const Illustration = useCase.illustration;
              return (
                <div
                  key={index}
                  className={`group relative rounded-xl transition-transform duration-300 ease-out hover:scale-[1.01] ${useCase.className}`}
                >
                  <GlowingEffect
                    spread={40}
                    glow
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                    borderWidth={1}
                  />
                  <div
                    className={`relative flex h-full flex-col overflow-hidden rounded-[inherit] border transition-all duration-300 ${
                      useCase.dark
                        ? "border-white/[0.06] bg-gradient-to-br from-[#1a0533] via-[#2d1b69] to-[#1a1145]"
                        : "border-neutral-200/80 bg-white dark:border-neutral-800 dark:bg-neutral-900"
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between p-5 pb-0 md:p-6 md:pb-0">
                      <h3
                        className={`max-w-[100%] text-lg font-normal leading-[1.25] md:text-xl lg:text-[26px] ${
                          useCase.dark
                            ? "text-white"
                            : "text-neutral-900 dark:text-white"
                        }`}
                      >
                        {useCase.title}
                      </h3>
                    </div>
                    {/* Illustration */}
                    <div className="min-h-0 flex-1">
                      <Illustration />
                    </div>
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
