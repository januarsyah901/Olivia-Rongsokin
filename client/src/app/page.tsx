"use client";

import { useState } from "react";
import {
  Bell, User, Search, Star, MapPin, CheckCircle, RefreshCw,
  Package, Zap, ChevronRight, Award, Archive, Cpu, Coffee,
  LayoutGrid, History, Home, BookOpen, ArrowRight,
  ShieldCheck, Clock, Leaf, Filter,
} from "lucide-react";
import Link from "next/link";

// ─── MOCK DATA ────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: 1, Icon: Archive,    label: "Kardus",     priceRange: "Rp 1.500–2.500/kg",  color: "bg-amber-50 text-amber-600 border-amber-200" },
  { id: 2, Icon: RefreshCw,  label: "Plastik",    priceRange: "Rp 2.000–4.000/kg",  color: "bg-blue-50 text-blue-600 border-blue-200" },
  { id: 3, Icon: Package,    label: "Besi/Logam", priceRange: "Rp 3.500–6.000/kg",  color: "bg-slate-50 text-slate-600 border-slate-200" },
  { id: 4, Icon: BookOpen,   label: "Kertas",     priceRange: "Rp 1.000–1.500/kg",  color: "bg-orange-50 text-orange-600 border-orange-200" },
  { id: 5, Icon: Coffee,     label: "Botol Kaca", priceRange: "Rp 500–800/kg",      color: "bg-green-50 text-green-600 border-green-200" },
  { id: 6, Icon: Cpu,        label: "Elektronik", priceRange: "Rp 5.000–15.000/kg", color: "bg-purple-50 text-purple-600 border-purple-200" },
];

const COLLECTORS = [
  {
    id: 1, name: "Pak Budi", lapakName: "Lapak Budi Jaya",
    distance: "0.8 km", rating: 4.9, reviewCount: 142, isPremium: true, isOpen: true,
    categories: ["Kardus", "Plastik", "Kertas"], eta: "15–30 menit", avatar: "B", color: "bg-sky-500",
  },
  {
    id: 2, name: "Ibu Sari", lapakName: "UD Sari Jaya",
    distance: "1.2 km", rating: 4.7, reviewCount: 89, isPremium: false, isOpen: true,
    categories: ["Besi/Logam", "Plastik", "Elektronik"], eta: "30–45 menit", avatar: "S", color: "bg-emerald-500",
  },
  {
    id: 3, name: "Mas Agung", lapakName: "Rongsok Agung",
    distance: "2.1 km", rating: 4.5, reviewCount: 213, isPremium: true, isOpen: false,
    categories: ["Kardus", "Botol Kaca"], eta: "Tutup sekarang", avatar: "A", color: "bg-violet-500",
  },
  {
    id: 4, name: "Pak Tanto", lapakName: "Lapak Tanto",
    distance: "2.8 km", rating: 4.6, reviewCount: 57, isPremium: false, isOpen: true,
    categories: ["Besi/Logam", "Elektronik"], eta: "45–60 menit", avatar: "T", color: "bg-orange-500",
  },
];

const TRANSACTIONS = [
  { id: 1, label: "Kardus", Icon: Archive, weight: "4.2 kg", amount: "Rp 8.400", date: "Kemarin" },
  { id: 2, label: "Plastik", Icon: RefreshCw, weight: "1.8 kg", amount: "Rp 5.400", date: "3 hari lalu" },
];

// ─── COLLECTOR CARD ──────────────────────────────────────────────────────────

function CollectorCard({ c }: { c: (typeof COLLECTORS)[0] }) {
  return (
    <Link
      href={`/collector/${c.id}`}
      className="flex-shrink-0 w-64 md:w-auto bg-white rounded-2xl shadow-sm border border-sky-100 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
    >
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-xl ${c.color} flex items-center justify-center text-white font-bold text-base shrink-0`}>
              {c.avatar}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <p className="font-semibold text-sm text-gray-800 truncate">{c.lapakName}</p>
                {c.isPremium && (
                  <span className="inline-flex items-center gap-1 bg-amber-400 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0">
                    <Award size={8} /> PRO
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-400">{c.name}</p>
            </div>
          </div>
          <span className={`shrink-0 text-[11px] font-medium px-2 py-0.5 rounded-full ${c.isOpen ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-400"}`}>
            {c.isOpen ? "Buka" : "Tutup"}
          </span>
        </div>

        <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Star size={11} className="fill-amber-400 text-amber-400" />
            <span className="font-semibold text-gray-700">{c.rating}</span>
            <span>({c.reviewCount})</span>
          </span>
          <span className="text-gray-200">·</span>
          <span className="flex items-center gap-1">
            <MapPin size={11} className="text-sky-400" />
            {c.distance}
          </span>
          <span className="text-gray-200">·</span>
          <span className="flex items-center gap-1 text-sky-600 font-medium">
            <Zap size={11} /> {c.eta}
          </span>
        </div>

        <div className="flex gap-1 flex-wrap mt-3">
          {c.categories.map((cat) => (
            <span key={cat} className="bg-sky-50 text-sky-700 text-[10px] font-medium px-2 py-0.5 rounded-full">
              {cat}
            </span>
          ))}
        </div>
      </div>
      <div className="px-4 pb-4">
        <div className="bg-sky-500 hover:bg-sky-600 transition-colors text-white text-xs font-semibold text-center py-2 rounded-xl flex items-center justify-center gap-1">
          Minta Jemput <ArrowRight size={12} />
        </div>
      </div>
    </Link>
  );
}

// ─── SIDEBAR (DESKTOP) ───────────────────────────────────────────────────────

function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col gap-4 w-64 shrink-0">
      {/* Profile Card */}
      <div className="bg-white rounded-2xl border border-sky-100 shadow-sm p-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-sky-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">R</div>
          <div>
            <p className="font-bold text-gray-800">Rizky</p>
            <p className="text-xs text-gray-400">Anak Kos · Sleman</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 divide-x divide-gray-100 bg-sky-50 rounded-xl">
          <div className="text-center py-3">
            <p className="font-bold text-sky-600">2</p>
            <p className="text-[10px] text-gray-500 mt-0.5">Pesanan</p>
          </div>
          <div className="text-center py-3">
            <p className="font-bold text-emerald-600">Rp 13.8K</p>
            <p className="text-[10px] text-gray-500 mt-0.5">Pendapatan</p>
          </div>
        </div>
        <Link href="/profile" className="mt-3 flex items-center justify-center gap-1 text-xs font-medium text-sky-600 border border-sky-200 rounded-xl py-2 hover:bg-sky-50 transition-colors">
          <User size={12} /> Lihat Profil
        </Link>
      </div>

      {/* How It Works */}
      <div className="bg-white rounded-2xl border border-sky-100 shadow-sm p-5">
        <h3 className="font-bold text-gray-800 text-sm mb-4">Cara Kerja</h3>
        <div className="space-y-4">
          {[
            { n: "1", Icon: Search, title: "Temukan Pengepul", desc: "Cari pengepul di sekitar kos" },
            { n: "2", Icon: Package, title: "Pilih & Jual", desc: "Pilih sampah & minta dijemput" },
            { n: "3", Icon: ShieldCheck, title: "Timbang & Bayar", desc: "Pengepul datang & bayar cash" },
            { n: "4", Icon: Star, title: "Beri Rating", desc: "Rate & dapatkan digital receipt" },
          ].map((s) => (
            <div key={s.n} className="flex items-start gap-3">
              <div className="w-7 h-7 bg-sky-500 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">{s.n}</div>
              <div>
                <p className="text-sm font-semibold text-gray-700">{s.title}</p>
                <p className="text-xs text-gray-400">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Eco Impact */}
      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-5 text-white">
        <div className="flex items-center gap-2 mb-3">
          <Leaf size={16} />
          <p className="font-bold text-sm">Dampak Lingkungan</p>
        </div>
        <p className="text-2xl font-extrabold">6.0 kg</p>
        <p className="text-emerald-100 text-xs mt-1">Sampah berhasil kamu daur ulang</p>
      </div>
    </aside>
  );
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return "Selamat Pagi";
    if (h < 16) return "Selamat Siang";
    if (h < 19) return "Selamat Sore";
    return "Selamat Malam";
  })();

  return (
    <div className="min-h-screen bg-[#f0f9ff]">
      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-sky-500 text-white shadow-md shadow-sky-200/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
              <RefreshCw size={16} className="text-white" />
            </div>
            <span className="font-extrabold text-lg tracking-tight">Rongsok.in</span>
          </Link>

          {/* Desktop search */}
          <div className="hidden md:flex flex-1 max-w-md mx-6 relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-300" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari pengepul atau jenis sampah..."
              className="w-full pl-9 pr-4 py-2 bg-white/15 border border-white/25 rounded-xl text-sm text-white placeholder-sky-200 outline-none focus:bg-white/25 transition-colors"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button className="relative w-9 h-9 bg-white/15 rounded-xl flex items-center justify-center hover:bg-white/25 transition-colors">
              <Bell size={17} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-400 rounded-full" />
            </button>
            <Link href="/profile" className="hidden md:flex items-center gap-2 bg-white/15 hover:bg-white/25 transition-colors rounded-xl px-3 py-2">
              <User size={15} />
              <span className="text-sm font-medium">Rizky</span>
            </Link>
            <Link href="/profile" className="md:hidden w-9 h-9 bg-white/15 rounded-xl flex items-center justify-center hover:bg-white/25 transition-colors font-bold text-sm">
              R
            </Link>
          </div>
        </div>

        {/* Hero sub-bar */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-1 pb-5">
          <p className="text-sky-100 text-sm">{greeting},</p>
          <h1 className="text-xl font-bold">Rizky! Mau jual apa hari ini?</h1>

          {/* Mobile search */}
          <div className="md:hidden mt-3 relative">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari pengepul atau jenis sampah..."
              className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl text-sm text-gray-700 outline-none shadow-sm placeholder-gray-400"
            />
          </div>
        </div>
      </header>

      {/* ── MAIN CONTENT ─────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex gap-6">
        {/* ── SIDEBAR ── */}
        <Sidebar />

        {/* ── FEED ── */}
        <div className="flex-1 min-w-0 space-y-6 pb-28 lg:pb-6">

          {/* STATS STRIP */}
          <div className="bg-white rounded-2xl shadow-sm border border-sky-100 p-4 grid grid-cols-3 divide-x divide-gray-100">
            <div className="text-center px-2">
              <p className="text-xl font-bold text-sky-600">4</p>
              <p className="text-[11px] text-gray-500 mt-0.5">Pengepul Dekat</p>
            </div>
            <div className="text-center px-2">
              <p className="text-xl font-bold text-emerald-600">2</p>
              <p className="text-[11px] text-gray-500 mt-0.5">Pesanan Selesai</p>
            </div>
            <div className="text-center px-2">
              <p className="text-xl font-bold text-amber-500">Rp 13.8K</p>
              <p className="text-[11px] text-gray-500 mt-0.5">Total Pendapatan</p>
            </div>
          </div>

          {/* CTA BANNER */}
          <div className="bg-gradient-to-r from-sky-500 to-sky-600 rounded-2xl p-5 flex items-center justify-between text-white shadow-md shadow-sky-200 overflow-hidden relative">
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full" />
            <div className="absolute -right-2 bottom-0 w-20 h-20 bg-white/10 rounded-full" />
            <div className="relative z-10">
              <p className="text-xs text-sky-100 font-medium">Siap jual rongsok?</p>
              <p className="font-bold text-lg mt-0.5">Minta Jemput Sekarang!</p>
              <p className="text-[12px] text-sky-100 mt-1">Pengepul terdekat siap datang ke kosmu</p>
            </div>
            <Link href="/search" className="relative z-10 shrink-0 bg-white text-sky-600 font-bold text-sm px-5 py-2.5 rounded-xl shadow hover:bg-sky-50 transition-colors flex items-center gap-1">
              Mulai <ArrowRight size={14} />
            </Link>
          </div>

          {/* CATEGORIES */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-gray-800">Kategori Sampah</h2>
              <Link href="/categories" className="text-xs text-sky-500 font-medium flex items-center gap-0.5">
                Lihat semua <ChevronRight size={12} />
              </Link>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {CATEGORIES.map(({ id, Icon, label, priceRange, color }) => (
                <button
                  key={id}
                  onClick={() => setActiveCategory(activeCategory === id ? null : id)}
                  className={`bg-white rounded-2xl p-3 text-center border transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${
                    activeCategory === id ? "border-sky-400 shadow-sky-100 shadow-md scale-[0.98]" : "border-sky-100"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl mx-auto flex items-center justify-center border ${color}`}>
                    <Icon size={20} />
                  </div>
                  <p className="text-xs font-semibold text-gray-700 mt-2">{label}</p>
                  <p className="text-[9px] text-gray-400 mt-0.5 leading-tight">{priceRange}</p>
                </button>
              ))}
            </div>
          </section>

          {/* COLLECTORS */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="font-bold text-gray-800">Pengepul Terdekat</h2>
                <p className="text-[11px] text-gray-400">Sekitar lokasi Kos-mu · Sleman</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1 text-xs text-gray-500 border border-gray-200 rounded-lg px-2.5 py-1.5 hover:bg-gray-50 transition-colors">
                  <Filter size={11} /> Filter
                </button>
                <Link href="/search" className="text-xs text-sky-500 font-medium flex items-center gap-0.5">
                  Semua <ChevronRight size={12} />
                </Link>
              </div>
            </div>

            {/* Mobile: horizontal scroll | Desktop: grid */}
            <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1 md:grid md:grid-cols-2 md:overflow-visible">
              {COLLECTORS.map((c) => <CollectorCard key={c.id} c={c} />)}
            </div>
          </section>

          {/* TRANSACTIONS */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-gray-800">Transaksi Terakhir</h2>
              <Link href="/history" className="text-xs text-sky-500 font-medium flex items-center gap-0.5">
                Semua <ChevronRight size={12} />
              </Link>
            </div>
            <div className="space-y-3">
              {TRANSACTIONS.map(({ id, Icon, label, weight, amount, date }) => (
                <div key={id} className="bg-white rounded-2xl border border-sky-100 shadow-sm p-4 flex items-center justify-between hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center">
                      <Icon size={18} className="text-sky-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-gray-800">{label}</p>
                      <p className="text-xs text-gray-400">{weight} · {date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm text-emerald-600">{amount}</p>
                    <div className="flex items-center justify-end gap-1 mt-1">
                      <CheckCircle size={11} className="text-emerald-500" />
                      <span className="text-[10px] text-emerald-500 font-medium">Selesai</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ECO IMPACT (mobile only) */}
          <section className="lg:hidden">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-5 text-white">
              <div className="flex items-center gap-2 mb-2">
                <Leaf size={16} />
                <p className="font-bold text-sm">Dampak Lingkungan Kamu</p>
              </div>
              <p className="text-3xl font-extrabold">6.0 kg</p>
              <p className="text-emerald-100 text-xs mt-1">Sampah telah kamu daur ulang. Terus semangat!</p>
            </div>
          </section>

          {/* HOW IT WORKS (mobile only) */}
          <section className="lg:hidden bg-white rounded-2xl border border-sky-100 shadow-sm p-5">
            <h3 className="font-bold text-gray-800 text-sm mb-4">Cara Kerja Rongsok.in</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { n: "1", Icon: Search, title: "Temukan Pengepul", desc: "Cari di sekitar kosmu" },
                { n: "2", Icon: Package, title: "Pilih & Jual", desc: "Minta dijemput langsung" },
                { n: "3", Icon: Clock, title: "Timbang & Bayar", desc: "Bayar cash di tempat" },
                { n: "4", Icon: Star, title: "Beri Rating", desc: "Dapat digital receipt" },
              ].map((s) => (
                <div key={s.n} className="bg-sky-50 rounded-xl p-3">
                  <div className="w-7 h-7 bg-sky-500 text-white rounded-full flex items-center justify-center text-xs font-bold mb-2">{s.n}</div>
                  <p className="text-xs font-semibold text-gray-700">{s.title}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{s.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* ── BOTTOM NAV (mobile only) ─────────────────────────────────────── */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <div className="max-w-lg mx-auto grid grid-cols-4">
          {[
            { href: "/", Icon: Home, label: "Beranda", active: true },
            { href: "/search", Icon: Search, label: "Cari", active: false },
            { href: "/history", Icon: History, label: "Riwayat", active: false },
            { href: "/profile", Icon: User, label: "Profil", active: false },
          ].map(({ href, Icon: NavIcon, label, active }) => (
            <Link key={href} href={href} className={`flex flex-col items-center gap-1 py-3 transition-colors ${active ? "text-sky-500" : "text-gray-400"}`}>
              <NavIcon size={20} />
              <span className={`text-[10px] font-medium ${active ? "text-sky-500" : "text-gray-400"}`}>{label}</span>
              {active && <span className="w-4 h-0.5 bg-sky-500 rounded-full" />}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
