"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

const navLinks = [
  { href: "#technology", label: "ผลิตภัณฑ์" },
  { href: "#gallery", label: "ฟีเจอร์" },
  { href: "#accessories", label: "ราคา" },
  { href: "#about", label: "เกี่ยวกับเรา" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-3xl transition-all duration-300 ${isScrolled ? "bg-background/80 backdrop-blur-md rounded-full" : "bg-transparent"}`}
        style={{
          boxShadow: isScrolled ? "rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px" : "none"
        }}
      >
        <div className="flex items-center justify-between transition-all duration-300 px-2 pl-5 py-2">
          {/* Logo */}
          <Link href="#hero" className="text-lg font-medium tracking-tight transition-colors duration-300 text-foreground">
            cketloom
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm transition-colors text-muted-foreground hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden items-center gap-6 md:flex">
            <Link
              href="#reserve"
              className="px-4 py-2 text-sm font-medium transition-all rounded-full bg-foreground text-background hover:opacity-80"
            >
              รับ API Key
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className="transition-colors md:hidden text-foreground"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Mobile Menu Dialog */}
      <Dialog open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <DialogContent
          showCloseButton={false}
          className="fixed inset-0 top-0 left-0 translate-x-0 translate-y-0 max-w-none w-full h-[100dvh] rounded-none border-none p-0 bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:slide-in-from-top-2 data-[state=closed]:slide-out-to-top-2 duration-300 data-[state=closed]:zoom-out-100 data-[state=open]:zoom-in-100"
        >
          <DialogTitle className="sr-only">Navigation Menu</DialogTitle>

          {/* Dialog Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-border">
            <Link
              href="#hero"
              className="text-lg font-medium tracking-tight text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              cketloom
            </Link>
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              className="text-foreground p-1 transition-opacity hover:opacity-60"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col px-6 pt-8 pb-6 flex-1">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-center justify-between py-5 border-b border-border/50 text-foreground transition-colors hover:text-muted-foreground"
                onClick={() => setIsMenuOpen(false)}
                style={{ animationDelay: `${(i + 1) * 60}ms` }}
              >
                <span className="text-2xl font-light tracking-tight">
                  {link.label}
                </span>
                <ArrowUpRight
                  size={20}
                  className="text-muted-foreground opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0"
                />
              </Link>
            ))}

            {/* CTA Button */}
            <div className="mt-auto pt-10">
              <Link
                href="#reserve"
                className="flex items-center justify-center w-full py-4 text-base font-medium rounded-full bg-foreground text-background transition-opacity hover:opacity-80"
                onClick={() => setIsMenuOpen(false)}
              >
                รับ API Key
              </Link>
            </div>
          </nav>
        </DialogContent>
      </Dialog>
    </>
  );
}
