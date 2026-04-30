"use client";

import { useState } from "react";
import { Bell, User, Search, Star, MapPin, CheckCircle, Recycle, Package, Zap, ChevronRight, Sparkles } from "lucide-react";
import Link from "next/link";

// ─── MOCK DATA ────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: 1, emoji: "📦", label: "Kardus", priceRange: "Rp 1.500–2.500/kg" },
  { id: 2, emoji: "♻️", label: "Plastik", priceRange: "Rp 2.000–4.000/kg" },
  { id: 3, emoji: "🔩", label: "Besi/Logam", priceRange: "Rp 3.500–6.000/kg" },
  { id: 4, emoji: "📰", label: "Kertas", priceRange: "Rp 1.000–1.500/kg" },
  { id: 5, emoji: "🫙", label: "Botol Kaca", priceRange: "Rp 500–800/kg" },
  { id: 6, emoji: "💻", label: "Elektronik", priceRange: "Rp 5.000–15.000/kg" },
];

const COLLECTORS = [
  {
    id: 1,
    name: "Pak Budi Rongsok",
    lapakName: "Lapak Budi Jaya",
    distance: "0.8 km",
    rating: 4.9,
    reviewCount: 142,
    isPremium: true,
    isOpen: true,
    categories: ["Kardus", "Plastik", "Kertas"],
    minOrder: 5,
    eta: "15–30 menit",
    avatar: "B",
    color: "bg-sky-500",
  },
  {
    id: 2,
    name: "Ibu Sari Sampah",
    lapakName: "UD Sari Jaya",
    distance: "1.2 km",
    rating: 4.7,
    reviewCount: 89,
    isPremium: false,
    isOpen: true,
    categories: ["Besi/Logam", "Plastik", "Elektronik"],
    minOrder: 3,
    eta: "30–45 menit",
    avatar: "S",
    color: "bg-emerald-500",
  },
  {
    id: 3,
    name: "Mas Agung Rongsok",
    lapakName: "Rongsok Agung",
    distance: "2.1 km",
    rating: 4.5,
    reviewCount: 213,
    isPremium: true,
    isOpen: false,
    categories: ["Kardus", "Botol Kaca", "Kertas"],
    minOrder: 2,
    eta: "Tutup sekarang",
    avatar: "A",
    color: "bg-violet-500",
  },
  {
    id: 4,
    name: "Pak Tanto",
    lapakName: "Lapak Tanto & Sons",
    distance: "2.8 km",
    rating: 4.6,
    reviewCount: 57,
    isPremium: false,
    isOpen: true,
    categories: ["Besi/Logam", "Elektronik"],
    minOrder: 10,
    eta: "45–60 menit",
    avatar: "T",
    color: "bg-orange-500",
  },
];

const RECENT_TRANSACTIONS = [
  { id: 1, category: "📦 Kardus", weight: "4.2 kg", amount: "Rp 8.400", date: "Kemarin", status: "done" },
  { id: 2, category: "♻️ Plastik", weight: "1.8 kg", amount: "Rp 5.400", date: "3 hari lalu", status: "done" },
];

// ─── COMPONENT: CollectorCard ─────────────────────────────────────────────────

function CollectorCard({ c }: { c: (typeof COLLECTORS)[0] }) {
  return (
    <Link
      href={`/collector/${c.id}`}
      className="card-press flex-shrink-0 w-64 bg-white rounded-2xl shadow-sm border border-sky-50 overflow-hidden block"
    >
      {/* Card Header */}
      <div className="p-4 pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-xl ${c.color} flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}
            >
              {c.avatar}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <p className="font-semibold text-sm text-gray-800 truncate">{c.lapakName}</p>
                {c.isPremium && (
                  <span className="pulse-badge inline-flex items-center gap-0.5 bg-amber-400 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0">
                    <Sparkles size={8} />
                    PRO
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 truncate">{c.name}</p>
            </div>
          </div>
          <div
            className={`flex-shrink-0 text-xs font-medium px-2 py-1 rounded-full ${
              c.isOpen ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-400"
            }`}
          >
            {c.isOpen ? "Buka" : "Tutup"}
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3 mt-3">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Star size={11} className="fill-amber-400 text-amber-400" />
            <span className="font-semibold text-gray-700">{c.rating}</span>
            <span>({c.reviewCount})</span>
          </div>
          <span className="text-gray-200">·</span>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <MapPin size={11} className="text-sky-400" />
            <span>{c.distance}</span>
          </div>
          <span className="text-gray-200">·</span>
          <div className="flex items-center gap-1 text-xs text-sky-600 font-medium">
            <Zap size={11} />
            <span>{c.eta}</span>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 pb-3 flex gap-1 flex-wrap">
        {c.categories.map((cat) => (
          <span key={cat} className="bg-sky-50 text-sky-700 text-[10px] font-medium px-2 py-0.5 rounded-full">
            {cat}
          </span>
        ))}
      </div>

      {/* CTA */}
      <div className="px-4 pb-4">
        <div className="bg-sky-500 text-white text-xs font-semibold text-center py-2 rounded-xl">
          Minta Jemput →
        </div>
      </div>
    </Link>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  const greeting = (() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Selamat Pagi";
    if (hour < 16) return "Selamat Siang";
    if (hour < 19) return "Selamat Sore";
    return "Selamat Malam";
  })();

  return (
    <div className="min-h-screen bg-[#f0f9ff]">
      {/* ── TOP APP BAR ─────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-sky-500 text-white safe-area-top">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
              <Recycle size={18} className="text-white" />
            </div>
            <span className="font-extrabold text-lg tracking-tight">Rongsok.in</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative w-9 h-9 bg-white/15 rounded-xl flex items-center justify-center hover:bg-white/25 transition-colors">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-400 rounded-full border border-sky-500" />
            </button>
            <Link
              href="/profile"
              className="w-9 h-9 bg-white/15 rounded-xl flex items-center justify-center hover:bg-white/25 transition-colors font-bold text-sm"
            >
              R
            </Link>
          </div>
        </div>

        {/* ── HERO SECTION ── */}
        <div className="max-w-lg mx-auto px-4 pt-1 pb-5">
          <p className="text-sky-100 text-sm">{greeting},</p>
          <h1 className="text-xl font-bold">Rizky! 👋</h1>
          <p className="text-sky-100 text-xs mt-0.5">Jual rongsokmu dengan harga terbaik hari ini</p>

          {/* ── SEARCH BAR ── */}
          <div className="mt-4 relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari pengepul atau jenis sampah..."
              className="w-full pl-10 pr-4 py-3 bg-white rounded-xl text-sm text-gray-700 outline-none shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-sky-200"
            />
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto pb-28">
        {/* ── QUICK STATS STRIP ─────────────────────────────────────────── */}
        <div className="slide-up mx-4 mt-4 bg-white rounded-2xl shadow-sm border border-sky-50 p-4 grid grid-cols-3 divide-x divide-gray-100">
          <div className="text-center px-2">
            <p className="text-xl font-bold text-sky-600">4</p>
            <p className="text-[10px] text-gray-500 mt-0.5">Pengepul Dekat</p>
          </div>
          <div className="text-center px-2">
            <p className="text-xl font-bold text-emerald-600">2</p>
            <p className="text-[10px] text-gray-500 mt-0.5">Pesanan Selesai</p>
          </div>
          <div className="text-center px-2">
            <p className="text-xl font-bold text-amber-500">Rp 13.8K</p>
            <p className="text-[10px] text-gray-500 mt-0.5">Total Pendapatan</p>
          </div>
        </div>

        {/* ── QUICK ACTION BANNER ───────────────────────────────────────── */}
        <div className="slide-up mx-4 mt-4 bg-gradient-to-r from-sky-500 to-sky-600 rounded-2xl p-4 flex items-center justify-between text-white shadow-md shadow-sky-200 overflow-hidden relative">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full" />
          <div className="absolute -right-2 bottom-0 w-16 h-16 bg-white/10 rounded-full" />
          <div className="relative z-10">
            <p className="text-xs text-sky-100 font-medium">Siap jual rongsok?</p>
            <p className="font-bold text-base mt-0.5">Minta Jemput Sekarang!</p>
            <p className="text-[11px] text-sky-100 mt-1">Pengepul terdekat siap datang ke kosmu</p>
          </div>
          <Link
            href="/search"
            className="relative z-10 flex-shrink-0 bg-white text-sky-600 font-bold text-xs px-4 py-2 rounded-xl shadow hover:bg-sky-50 transition-colors"
          >
            Mulai →
          </Link>
        </div>

        {/* ── KATEGORI SAMPAH ───────────────────────────────────────────── */}
        <section className="mt-6">
          <div className="flex items-center justify-between px-4 mb-3">
            <h2 className="font-bold text-gray-800">Kategori Sampah</h2>
            <Link href="/categories" className="text-xs text-sky-500 font-medium flex items-center gap-0.5">
              Lihat semua <ChevronRight size={12} />
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-3 px-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                className={`card-press bg-white rounded-2xl p-3 text-center border transition-all shadow-sm ${
                  activeCategory === cat.id
                    ? "border-sky-400 bg-sky-50 shadow-sky-100 shadow-md"
                    : "border-sky-50"
                }`}
              >
                <span className="text-2xl">{cat.emoji}</span>
                <p className="text-xs font-semibold text-gray-700 mt-1">{cat.label}</p>
                <p className="text-[9px] text-gray-400 mt-0.5 leading-tight">{cat.priceRange}</p>
              </button>
            ))}
          </div>
        </section>

        {/* ── PENGEPUL TERDEKAT ─────────────────────────────────────────── */}
        <section className="mt-6">
          <div className="flex items-center justify-between px-4 mb-3">
            <div>
              <h2 className="font-bold text-gray-800">Pengepul Terdekat</h2>
              <p className="text-[11px] text-gray-400">Sekitar lokasi Kos-mu</p>
            </div>
            <Link href="/search" className="text-xs text-sky-500 font-medium flex items-center gap-0.5">
              Lihat semua <ChevronRight size={12} />
            </Link>
          </div>
          <div className="pl-4 flex gap-3 overflow-x-auto hide-scrollbar pb-2 pr-4">
            {COLLECTORS.map((c) => (
              <CollectorCard key={c.id} c={c} />
            ))}
          </div>
        </section>

        {/* ── RIWAYAT TRANSAKSI ─────────────────────────────────────────── */}
        <section className="mt-6 px-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-gray-800">Transaksi Terakhir</h2>
            <Link href="/history" className="text-xs text-sky-500 font-medium flex items-center gap-0.5">
              Semua riwayat <ChevronRight size={12} />
            </Link>
          </div>
          <div className="space-y-3">
            {RECENT_TRANSACTIONS.map((tx) => (
              <div
                key={tx.id}
                className="card-press bg-white rounded-2xl border border-sky-50 shadow-sm p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center">
                    <Package size={18} className="text-sky-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-gray-800">{tx.category}</p>
                    <p className="text-xs text-gray-400">
                      {tx.weight} · {tx.date}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm text-emerald-600">{tx.amount}</p>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <CheckCircle size={11} className="text-emerald-500" />
                    <span className="text-[10px] text-emerald-500 font-medium">Selesai</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── INFO BANNER: HOW IT WORKS ─────────────────────────────────── */}
        <section className="mt-6 mx-4">
          <div className="bg-white rounded-2xl border border-sky-50 shadow-sm p-4">
            <h3 className="font-bold text-gray-800 text-sm mb-3">Cara Kerja Rongsok.in</h3>
            <div className="space-y-3">
              {[
                { step: "1", icon: "📍", title: "Temukan Pengepul", desc: "Cari pengepul di sekitar lokasi kosmu" },
                { step: "2", icon: "📦", title: "Pilih & Jual", desc: "Pilih kategori sampah dan minta dijemput" },
                { step: "3", icon: "⚖️", title: "Timbang & Bayar", desc: "Pengepul datang, timbang, dan bayar langsung" },
                { step: "4", icon: "⭐", title: "Beri Rating", desc: "Rate pengepul dan dapatkan digital receipt" },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-sky-500 text-white rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">
                      {item.icon} {item.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ── BOTTOM NAV ───────────────────────────────────────────────────── */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] safe-area-bottom">
        <div className="max-w-lg mx-auto grid grid-cols-4">
          {[
            { href: "/", icon: "🏠", label: "Beranda", active: true },
            { href: "/search", icon: "🔍", label: "Cari", active: false },
            { href: "/history", icon: "📋", label: "Riwayat", active: false },
            { href: "/profile", icon: "👤", label: "Profil", active: false },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 py-3 transition-colors ${
                item.active ? "text-sky-500" : "text-gray-400"
              }`}
            >
              <span className="text-xl leading-none">{item.icon}</span>
              <span className={`text-[10px] font-medium ${item.active ? "text-sky-500" : "text-gray-400"}`}>
                {item.label}
              </span>
              {item.active && <span className="w-4 h-0.5 bg-sky-500 rounded-full" />}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
