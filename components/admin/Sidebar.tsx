"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  CreditCard,
  Gauge,
  LayoutDashboard,
  MessageSquare,
  MonitorSmartphone,
  Receipt,
  Settings,
  Star,
  Users,
  WalletCards,
} from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/leads", label: "Заявки", icon: MessageSquare },
  { href: "/admin/clients", label: "Клиенты", icon: Users },
  { href: "/admin/projects", label: "Проекты / сайты", icon: MonitorSmartphone },
  { href: "/admin/payments", label: "Оплаты", icon: CreditCard },
  { href: "/admin/expenses", label: "Расходы", icon: Receipt },
  { href: "/admin/subscriptions", label: "Обслуживание", icon: WalletCards },
  { href: "/admin/reminders", label: "Напоминания", icon: Bell },
  { href: "/admin/reviews", label: "Отзывы", icon: Star },
  { href: "/admin/settings", label: "Настройки", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-screen w-72 shrink-0 border-r border-black/5 bg-white/85 p-4 backdrop-blur lg:block">
      <Link href="/admin" className="mb-8 flex items-center gap-3 rounded-3xl bg-brand-ink p-3 text-white">
        <span className="flex size-11 items-center justify-center rounded-2xl bg-brand">
          <Gauge className="size-5" />
        </span>
        <span>
          <span className="block text-lg font-black">WebTap</span>
          <span className="text-xs text-white/55">CRM dashboard</span>
        </span>
      </Link>
      <nav className="space-y-1">
        {links.map((item) => {
          const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-black/58 transition hover:bg-brand-mist hover:text-brand-dark",
                active && "bg-brand text-white shadow-glow hover:bg-brand hover:text-white",
              )}
            >
              <item.icon className="size-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
