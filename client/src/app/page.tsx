"use client";

import { useState } from "react";
import {
  Bell, User, Star, MapPin, CheckCircle, RefreshCw,
  Package, Zap, ChevronRight, Award, Archive, Cpu, Coffee,
  History, Home, BookOpen, ArrowRight, ShieldCheck, Clock, Leaf, Filter, Truck, Search
} from "lucide-react";
import Link from "next/link";

// ─── MOCK DATA ────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: 1, image: "/assets/kardus.png",          label: "Kardus",     priceRange: "Rp 1.500–2.500/kg",  color: "bg-amber-100/50" },
  { id: 2, image: "/assets/botol plastik.png",   label: "Plastik",    priceRange: "Rp 2.000–4.000/kg",  color: "bg-blue-100/50" },
  { id: 3, image: "/assets/besi bekas.jpg",      label: "Besi/Logam", priceRange: "Rp 3.500–6.000/kg",  color: "bg-slate-100/50" },
  { id: 4, image: "/assets/koran.png",           label: "Kertas",     priceRange: "Rp 1.000–1.500/kg",  color: "bg-orange-100/50" },
  { id: 5, image: "/assets/botol kaca.jpg",      label: "Botol Kaca", priceRange: "Rp 500–800/kg",      color: "bg-green-100/50" },
  { id: 6, image: "/assets/motherboard.jpg",     label: "Elektronik", priceRange: "Rp 5.000–15.000/kg", color: "bg-purple-100/50" },
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
      className="group flex-shrink-0 w-[260px] md:w-auto bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-sky-50 overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300"
    >
      <div className="p-4 relative">
        {/* Status Indicator */}
        <div className="absolute top-4 right-4 flex items-center gap-1.5">
          {c.isOpen && <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />}
          <span className={`text-[10px] font-bold tracking-wide uppercase ${c.isOpen ? "text-green-600" : "text-gray-400"}`}>
            {c.isOpen ? "Buka" : "Tutup"}
          </span>
        </div>

        <div className="flex items-start gap-3 mt-1">
          <div className={`w-12 h-12 rounded-2xl ${c.color} flex items-center justify-center text-white font-bold text-lg shadow-inner shrink-0`}>
            {c.avatar}
          </div>
          <div className="min-w-0 pr-12">
            <div className="flex items-center gap-1.5 flex-wrap">
              <p className="font-bold text-sm text-gray-800 truncate">{c.lapakName}</p>
              {c.isPremium && (
                <span className="inline-flex items-center gap-0.5 bg-amber-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md shrink-0 shadow-sm">
                  <Award size={10} /> PRO
                </span>
              )}
            </div>
            <p className="text-xs text-gray-400 mt-0.5">{c.name}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-4 text-xs text-gray-500 bg-gray-50/50 p-2 rounded-xl">
          <span className="flex items-center gap-1">
            <Star size={12} className="fill-amber-400 text-amber-400" />
            <span className="font-semibold text-gray-700">{c.rating}</span>
          </span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span className="flex items-center gap-1">
            <MapPin size={12} className="text-sky-500" />
            {c.distance}
          </span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span className="flex items-center gap-1 text-sky-600 font-medium">
            <Zap size={12} /> {c.eta}
          </span>
        </div>

        <div className="flex gap-1.5 flex-wrap mt-3">
          {c.categories.map((cat) => (
            <span key={cat} className="bg-sky-50 border border-sky-100 text-sky-700 text-[10px] font-semibold px-2 py-1 rounded-lg">
              {cat}
            </span>
          ))}
        </div>
      </div>
      
      <div className="px-4 pb-4">
        <div className="bg-gray-50 group-hover:bg-sky-500 group-hover:text-white group-hover:shadow-md transition-all duration-300 text-sky-600 text-xs font-bold text-center py-2.5 rounded-xl flex items-center justify-center gap-1.5">
          Minta Jemput <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}

// ─── SIDEBAR (DESKTOP) ───────────────────────────────────────────────────────

function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col gap-5 w-72 shrink-0">
      {/* How It Works */}
      <div className="bg-white rounded-3xl border border-sky-50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6">
        <h3 className="font-bold text-gray-800 text-sm mb-5 flex items-center gap-2">
          <ShieldCheck className="text-sky-500" size={18} /> Cara Kerja
        </h3>
        <div className="space-y-5 relative before:absolute before:inset-0 before:ml-3.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-sky-100">
          {[
            { n: "1", title: "Temukan Pengepul", desc: "Cari terdekat dari kos" },
            { n: "2", title: "Pilih & Jual", desc: "Minta pickup sekarang" },
            { n: "3", title: "Timbang & Bayar", desc: "Dapat cash di tempat" },
          ].map((s, i) => (
            <div key={s.n} className="relative flex items-start gap-4">
              <div className="w-7 h-7 bg-white border-2 border-sky-500 text-sky-600 rounded-full flex items-center justify-center text-xs font-bold shrink-0 shadow-sm z-10">{s.n}</div>
              <div className="pt-1">
                <p className="text-sm font-bold text-gray-700">{s.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return "Selamat Pagi";
    if (h < 16) return "Selamat Siang";
    if (h < 19) return "Selamat Sore";
    return "Selamat Malam";
  })();

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-sky-200">
      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <header className="relative bg-sky-500 text-white shadow-sm border-b border-sky-400/50 pt-24 pb-12 rounded-b-[3rem]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-sky-100 text-sm font-medium tracking-wide">{greeting},</p>
          <h1 className="text-2xl md:text-3xl font-extrabold mt-1 tracking-tight">Rizky! Mau jual apa hari ini?</h1>
        </div>
      </header>

      {/* ── MAIN CONTENT ─────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 lg:py-8 flex gap-8">
        <Sidebar />

        <div className="flex-1 min-w-0 space-y-8 pb-32 lg:pb-8">
          {/* CTA BANNER */}
        <div className="bg-sky-500 rounded-3xl p-6 md:p-8 flex items-center justify-between text-white shadow-lg shadow-sky-200/50 overflow-hidden relative group">
          <div className="relative z-10 max-w-sm">
            <p className="font-extrabold text-xl md:text-2xl leading-tight">Ubah Rongsok Jadi Cuan Sekarang!</p>
            <p className="text-sm text-sky-50 mt-2 opacity-90">Pengepul terdekat siap datang menjemput ke lokasi kosmu tanpa ribet.</p>
          </div>
          
          {/* IMPROVED ASSET SECTION */}
          <div className="absolute -right-16 -bottom-16 w-80 h-80 opacity-60 pointer-events-none hidden md:block group-hover:scale-105 group-hover:-rotate-3 transition-transform duration-500">
            <img 
              src={"/assets/people-angkat kardus.png"} 
              alt="Dapur Recycling Center" 
              className="w-full h-full object-cover rounded-full shadow-2xl border-4 border-white" 
            />
            {/* Highlight the cardboard/person part */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full overflow-hidden border-4 border-emerald-400 shadow-inner">
              <img 
                  src={"/assets/people-angkat kardus.png"} 
                  alt="Close up of cardboard collector" 
                  className="w-full h-full object-cover scale-[1.8] translate-x-[20%] translate-y-[10%]" 
                />
            </div>
            <div className="absolute bottom-20 left-12 bg-white text-gray-900 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5">
              <Truck size={14} className="text-blue-500" />
              Penjemputan Aktif
            </div>
          </div>
          
          <Link href="/search" className="relative z-10 shrink-0 bg-white text-sky-600 font-bold text-sm px-6 py-3.5 rounded-xl shadow-[0_8px_20px_rgb(255,255,255,0.3)] hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2">
            Mulai Jual <ArrowRight size={16} />
          </Link>
        </div>
          {/* CATEGORIES */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-extrabold text-gray-800 text-lg">Kategori Sampah</h2>
              <Link href="/categories" className="text-sm text-sky-600 font-bold hover:text-sky-700 flex items-center gap-1 transition-colors">
                Lihat semua <ChevronRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
              {CATEGORIES.map(({ id, image, label, priceRange, color }) => (
                <button
                  key={id}
                  onClick={() => setActiveCategory(activeCategory === id ? null : id)}
                  className={`group bg-white rounded-2xl p-4 text-center border-2 transition-all duration-300 ${
                    activeCategory === id 
                      ? "border-sky-500 shadow-[0_8px_20px_rgb(14,165,233,0.15)] scale-[0.98] bg-sky-50/50" 
                      : "border-transparent shadow-[0_4px_12px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_20px_rgb(0,0,0,0.06)] hover:-translate-y-1"
                  }`}
                >
                  <div className={`w-14 h-14 rounded-2xl mx-auto flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${color} overflow-hidden`}>
                    <img src={image} alt={label} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-sm font-bold text-gray-800 mt-3">{label}</p>
                  <p className="text-[10px] font-medium text-gray-500 mt-1">{priceRange}</p>
                </button>
              ))}
            </div>
          </section>

          {/* COLLECTORS */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-extrabold text-gray-800 text-lg">Pengepul Terdekat</h2>
                <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                  <MapPin size={12} className="text-sky-500" /> Sekitar kosmu, Sleman
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-gray-600 bg-white border border-gray-200 shadow-sm rounded-xl px-3 py-2 hover:bg-gray-50 transition-colors">
                  <Filter size={14} /> Filter
                </button>
                <Link href="/search" className="text-sm font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1 group">
                  Lihat Semua <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 md:grid md:grid-cols-2 md:overflow-visible -mx-4 px-4 md:mx-0 md:px-0">
              {COLLECTORS.map((c) => <CollectorCard key={c.id} c={c} />)}
            </div>
          </section>

          {/* TRANSACTIONS */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-extrabold text-gray-800 text-lg">Aktivitas Terakhir</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {TRANSACTIONS.map(({ id, Icon, label, weight, amount, date }) => (
                <div key={id} className="bg-white rounded-2xl border border-sky-50 shadow-[0_4px_12px_rgb(0,0,0,0.02)] p-4 flex items-center justify-between hover:shadow-md transition-shadow group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-sky-50 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Icon size={20} className="text-sky-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">{label}</p>
                      <p className="text-xs text-gray-500 font-medium mt-0.5">{weight} • {date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-extrabold text-emerald-600">{amount}</p>
                    <div className="inline-flex items-center gap-1 mt-1.5 bg-emerald-50 px-2 py-0.5 rounded-md">
                      <CheckCircle size={10} className="text-emerald-500" />
                      <span className="text-[10px] text-emerald-600 font-bold uppercase">Selesai</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ECO IMPACT (Mobile) */}
          <section className="lg:hidden relative overflow-hidden bg-emerald-500 rounded-3xl p-6 text-white shadow-lg shadow-emerald-200/50">
            <Leaf size={100} className="absolute -right-6 -top-6 text-white/10 -rotate-12" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2 bg-emerald-400 inline-flex px-3 py-1.5 rounded-lg">
                <Leaf size={16} />
                <p className="font-bold text-xs uppercase tracking-wider">Dampak Lingkungan</p>
              </div>
              <p className="text-4xl font-black mt-2">6.0 kg</p>
              <p className="text-emerald-50 text-sm mt-1 font-medium">Sampah berhasil didaur ulang. Terus semangat!</p>
            </div>
          </section>
        </div>
      </div>

      {/* ── BOTTOM NAV (Floating Pill style for Mobile) ──────────────────── */}
      <nav className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md bg-white/90 backdrop-blur-xl border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-3xl px-2 py-2">
        <div className="flex justify-between items-center">
          {[
            { href: "/", Icon: Home, label: "Beranda", active: true },
            { href: "/search", Icon: Search, label: "Cari", active: false },
            { href: "/history", Icon: History, label: "Riwayat", active: false },
            { href: "/profile", Icon: User, label: "Profil", active: false },
          ].map(({ href, Icon: NavIcon, label, active }) => (
            <Link key={href} href={href} className={`relative flex items-center justify-center px-4 py-2.5 rounded-2xl transition-all duration-300 ${active ? "bg-sky-50 text-sky-600" : "text-gray-400 hover:text-gray-600"}`}>
              <div className="flex flex-col items-center gap-1 relative z-10">
                {label === "Profil" ? (
                  <div className={`w-5 h-5 rounded-md overflow-hidden border ${active ? "border-sky-500" : "border-gray-400"}`}>
                    <img src="/assets/rizky profile.jpg" alt="Profile" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <NavIcon size={20} strokeWidth={active ? 2.5 : 2} className={active ? "scale-110 transition-transform" : ""} />
                )}
                {active && <span className="text-[10px] font-bold tracking-wide">{label}</span>}
              </div>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}