"use client";

import Image from "next/image";
import { Menu, X } from "lucide-react";
import type { RefObject } from "react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import newLogo from "@/images/assets/new-logo.webp";

const navLinks = [
  ["Кейсы", "#cases"],
  ["Услуги", "#services"],
  ["О студии", "#studio"],
  ["Процесс", "#process"],
  ["Контакты", "#contacts"],
] as const;

type HeaderProps = {
  whatsappHref: string;
};

export function Header({ whatsappHref }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 24);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    if (menuOpen) {
      window.setTimeout(() => firstMobileLinkRef.current?.focus(), 80);
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition duration-300",
        isScrolled || menuOpen
          ? "border-white/10 bg-[#0a0a0a]/88 backdrop-blur-xl"
          : "border-white/0 bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-[90rem] items-center justify-between px-5 sm:px-8 lg:h-[4.75rem] lg:px-14">
        <a
          href="#home"
          className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-white outline-none transition hover:text-white/72 focus-visible:ring-2 focus-visible:ring-white"
          onClick={closeMenu}
        >
          <Image src={newLogo} alt="" className="size-11 object-contain sm:size-12" priority />
          <span>WebTap</span>
        </a>

        <nav className="hidden items-center gap-8 text-sm text-white/62 lg:flex" aria-label="Основная навигация">
          {navLinks.map(([label, href]) => (
            <a key={label} href={href} className="transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#lead-form"
            className="hidden min-h-10 items-center justify-center rounded border border-white/16 px-4 text-sm font-semibold text-white transition hover:bg-white hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:inline-flex"
          >
            Обсудить проект
          </a>
          <a className="sr-only" href={whatsappHref} target="_blank" rel="noreferrer">
            Написать в WhatsApp
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="absolute left-[9rem] top-4 z-[60] inline-flex size-11 items-center justify-center rounded border border-white/16 bg-[#0a0a0a]/70 text-white backdrop-blur transition hover:bg-white hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white lg:static lg:hidden"
            onClick={() => setMenuOpen((current) => !current)}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={closeMenu} firstLinkRef={firstMobileLinkRef} />
    </header>
  );
}

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  firstLinkRef: RefObject<HTMLAnchorElement | null>;
};

export function MobileMenu({ open, onClose, firstLinkRef }: MobileMenuProps) {
  return (
    <div
      id="mobile-menu"
      className={cn(
        "grid overflow-hidden border-t border-white/10 bg-[#0a0a0a] px-5 transition-[grid-template-rows,opacity] duration-300 lg:hidden",
        open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
      )}
    >
      <nav className="min-h-0 overflow-hidden py-5" aria-label="Мобильная навигация">
        <div className="grid gap-1">
          {navLinks.map(([label, href], index) => (
            <a
              key={label}
              ref={index === 0 ? firstLinkRef : undefined}
              href={href}
              className="rounded px-1 py-4 text-2xl font-semibold tracking-[-0.02em] text-white outline-none transition hover:text-white/66 focus-visible:ring-2 focus-visible:ring-white"
              onClick={onClose}
            >
              {label}
            </a>
          ))}
          <a
            href="#lead-form"
            className="mt-4 inline-flex min-h-12 items-center justify-center rounded bg-white px-5 text-sm font-semibold text-black outline-none transition hover:bg-brand focus-visible:ring-2 focus-visible:ring-white"
            onClick={onClose}
          >
            Обсудить проект
          </a>
        </div>
      </nav>
    </div>
  );
}
