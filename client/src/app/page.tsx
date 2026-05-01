"use client";

import { useState } from "react";
import {
  Bell, User, Search, Star, MapPin, CheckCircle, RefreshCw,
  Package, Zap, ChevronRight, Award, Archive, Cpu, Coffee,
  History, Home, BookOpen, ArrowRight, ShieldCheck, Leaf, Filter,
} from "lucide-react";
import Link from "next/link";

// ─── MOCK DATA ────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: 1, Icon: Archive,   label: "Kardus",     price: "Rp 1.500–2.500/kg", bg: "bg-[#ff90e8]" },
  { id: 2, Icon: RefreshCw, label: "Plastik",    price: "Rp 2.000–4.000/kg", bg: "bg-[#90e0ff]" },
  { id: 3, Icon: Package,   label: "Besi/Logam", price: "Rp 3.500–6.000/kg", bg: "bg-[#c9f21d]" },
  { id: 4, Icon: BookOpen,  label: "Kertas",     price: "Rp 1.000–1.500/kg", bg: "bg-[#ffde59]" },
  { id: 5, Icon: Coffee,    label: "Botol Kaca", price: "Rp 500–800/kg",     bg: "bg-[#ffa869]" },
  { id: 6, Icon: Cpu,       label: "Elektronik", price: "Rp 5.000–15.000/kg",bg: "bg-[#b9a9ff]" },
];

const COLLECTORS = [
  {
    id: 1, name: "Pak Budi", lapakName: "Lapak Budi Jaya",
    distance: "0.8 km", rating: 4.9, reviewCount: 142, isPremium: true, isOpen: true,
    categories: ["Kardus", "Plastik", "Kertas"], eta: "15–30 mnt", avatar: "B", bg: "bg-[#ff90e8]",
  },
  {
    id: 2, name: "Ibu Sari", lapakName: "UD Sari Jaya",
    distance: "1.2 km", rating: 4.7, reviewCount: 89, isPremium: false, isOpen: true,
    categories: ["Besi/Logam", "Plastik"], eta: "30–45 mnt", avatar: "S", bg: "bg-[#c9f21d]",
  },
  {
    id: 3, name: "Mas Agung", lapakName: "Rongsok Agung",
    distance: "2.1 km", rating: 4.5, reviewCount: 213, isPremium: true, isOpen: false,
    categories: ["Kardus", "Botol Kaca"], eta: "Tutup", avatar: "A", bg: "bg-[#b9a9ff]",
  },
  {
    id: 4, name: "Pak Tanto", lapakName: "Lapak Tanto",
    distance: "2.8 km", rating: 4.6, reviewCount: 57, isPremium: false, isOpen: true,
    categories: ["Besi/Logam", "Elektronik"], eta: "45–60 mnt", avatar: "T", bg: "bg-[#ffa869]",
  },
];

const TRANSACTIONS = [
  { id: 1, Icon: Archive,   label: "Kardus",  weight: "4.2 kg", amount: "Rp 8.400",  date: "Kemarin" },
  { id: 2, Icon: RefreshCw, label: "Plastik", weight: "1.8 kg", amount: "Rp 5.400",  date: "3 hari lalu" },
];

// ─── COLLECTOR CARD ──────────────────────────────────────────────────────────

function CollectorCard({ c }: { c: (typeof COLLECTORS)[0] }) {
  return (
    <Link
      href={`/collector/${c.id}`}
      className="nb-card flex-shrink-0 w-[260px] md:w-auto flex flex-col overflow-hidden"
    >
      {/* Color header strip */}
      <div className={`${c.bg} px-4 pt-4 pb-3 border-b-2 border-black`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center font-black text-lg">
              {c.avatar}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <p className="font-black text-sm text-black leading-tight">{c.lapakName}</p>
                {c.isPremium && (
                  <span className="bg-black text-white text-[9px] font-black px-1.5 py-0.5 rounded flex items-center gap-0.5 uppercase tracking-wider">
                    <Award size={8} /> Pro
                  </span>
                )}
              </div>
              <p className="text-xs text-black/70 font-medium">{c.name}</p>
            </div>
          </div>
          <span className={`text-[10px] font-black uppercase border-2 border-black px-2 py-0.5 rounded-md ${c.isOpen ? "bg-white" : "bg-black text-white"}`}>
            {c.isOpen ? "BUKA" : "TUTUP"}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div className="flex items-center gap-3 text-xs font-semibold">
          <span className="flex items-center gap-1">
            <Star size={12} className="fill-black text-black" />
            {c.rating} <span className="text-gray-500 font-normal">({c.reviewCount})</span>
          </span>
          <span className="flex items-center gap-1 text-gray-600">
            <MapPin size={12} /> {c.distance}
          </span>
          <span className="flex items-center gap-1">
            <Zap size={12} /> {c.eta}
          </span>
        </div>

        <div className="flex gap-1.5 flex-wrap">
          {c.categories.map((cat) => (
            <span key={cat} className="text-[10px] font-bold border-2 border-black px-2 py-0.5 rounded-md">
              {cat}
            </span>
          ))}
        </div>

        <button className="nb-btn w-full bg-black text-white mt-auto text-xs">
          Minta Jemput <ArrowRight size={13} />
        </button>
      </div>
    </Link>
  );
}

// ─── SIDEBAR ─────────────────────────────────────────────────────────────────

function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col gap-5 w-72 shrink-0">
      {/* Profile */}
      <div className="nb-card p-5">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 bg-[#ff90e8] border-2 border-black rounded-xl flex items-center justify-center font-black text-2xl text-black">
            R
          </div>
          <div>
            <p className="font-black text-lg text-black leading-tight">Rizky</p>
            <p className="text-xs text-gray-500 font-medium flex items-center gap-1 mt-0.5">
              <MapPin size={10} /> Anak Kos · Sleman
            </p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="border-2 border-black rounded-xl p-3 text-center bg-[#90e0ff]">
            <p className="font-black text-2xl text-black">2</p>
            <p className="text-[10px] font-bold text-black uppercase tracking-wider mt-1">Pesanan</p>
          </div>
          <div className="border-2 border-black rounded-xl p-3 text-center bg-[#c9f21d]">
            <p className="font-black text-xl text-black">13.8K</p>
            <p className="text-[10px] font-bold text-black uppercase tracking-wider mt-1">Rupiah</p>
          </div>
        </div>
        <Link href="/profile" className="nb-btn w-full mt-4 bg-black text-white text-sm">
          <User size={14} /> Kelola Profil
        </Link>
      </div>

      {/* Steps */}
      <div className="nb-card p-5">
        <h3 className="font-black text-sm uppercase tracking-wider mb-4">Cara Kerja</h3>
        <div className="space-y-4">
          {[
            { n: "01", title: "Temukan Pengepul", desc: "Cari terdekat dari kos", bg: "bg-[#ff90e8]" },
            { n: "02", title: "Pilih & Jual",     desc: "Minta dijemput sekarang", bg: "bg-[#c9f21d]" },
            { n: "03", title: "Timbang & Bayar",  desc: "Cash langsung di tempat", bg: "bg-[#90e0ff]" },
            { n: "04", title: "Beri Rating",       desc: "Dapat digital receipt",  bg: "bg-[#ffde59]" },
          ].map((s) => (
            <div key={s.n} className="flex items-start gap-3">
              <div className={`w-8 h-8 ${s.bg} border-2 border-black rounded-lg flex items-center justify-center font-black text-xs shrink-0`}>{s.n}</div>
              <div>
                <p className="text-sm font-bold text-black">{s.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Eco */}
      <div className="nb-card p-5 bg-[#c9f21d]">
        <div className="flex items-center gap-2 mb-2">
          <Leaf size={18} className="text-black" />
          <p className="font-black text-sm uppercase tracking-wider">Eco Impact</p>
        </div>
        <p className="font-black text-4xl text-black">6.0 kg</p>
        <p className="text-xs font-semibold text-black/70 mt-1">Sampah berhasil kamu daur ulang!</p>
      </div>
    </aside>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

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
    <div className="min-h-screen bg-white">

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-white border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 bg-black rounded-xl flex items-center justify-center">
              <RefreshCw size={18} className="text-white" />
            </div>
            <span className="font-black text-xl tracking-tight text-black">Rongsok.in</span>
          </Link>

          {/* Desktop search */}
          <div className="hidden md:flex flex-1 max-w-lg relative">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari pengepul atau jenis sampah..."
              className="nb-input pl-10"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button className="nb-btn bg-white w-10 h-10 p-0 relative">
              <Bell size={17} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
            </button>
            <Link href="/profile" className="nb-btn bg-[#ff90e8] hidden md:flex text-black text-sm gap-2">
              <User size={15} />
              <span>Rizky</span>
            </Link>
            <Link href="/profile" className="md:hidden nb-btn bg-[#ff90e8] w-10 h-10 p-0 font-black text-black">
              R
            </Link>
          </div>
        </div>
      </header>

      {/* ── HERO BANNER ─────────────────────────────────────────────────────── */}
      <div className="bg-[#ff90e8] border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-sm font-bold text-black/70 uppercase tracking-widest">{greeting}, Rizky! 👋</p>
            <h1 className="font-black text-3xl md:text-5xl text-black mt-1 leading-tight tracking-tight">
              Ubah Rongsok<br className="hidden md:block" /> Jadi Cuan!
            </h1>
            <p className="text-sm font-semibold text-black/70 mt-3 max-w-md">
              Pengepul terdekat siap datang menjemput sampahmu. Transparan, cepat, dan terpercaya.
            </p>
            <div className="flex gap-3 mt-5 flex-wrap">
              <Link href="/search" className="nb-btn bg-black text-white">
                Cari Pengepul <ArrowRight size={15} />
              </Link>
              <Link href="/how-it-works" className="nb-btn bg-white text-black">
                Cara Kerja
              </Link>
            </div>
          </div>
          {/* Stats strip (desktop) */}
          <div className="hidden md:flex gap-4 shrink-0">
            {[
              { label: "Pengepul Aktif", value: "4", bg: "bg-[#c9f21d]" },
              { label: "Pesananmu",      value: "2", bg: "bg-[#90e0ff]" },
              { label: "Total Cuan",     value: "13.8K", bg: "bg-[#ffde59]" },
            ].map((s) => (
              <div key={s.label} className={`nb-card ${s.bg} p-4 text-center min-w-[90px]`}>
                <p className="font-black text-3xl text-black">{s.value}</p>
                <p className="text-[10px] font-bold text-black/70 uppercase tracking-wider mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile search */}
      <div className="md:hidden px-4 pt-4 border-b-2 border-black pb-4 bg-white">
        <div className="relative">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari pengepul atau jenis sampah..."
            className="nb-input pl-10"
          />
        </div>
      </div>

      {/* ── BODY ────────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex gap-8">
        <Sidebar />

        <div className="flex-1 min-w-0 space-y-10 pb-32 lg:pb-8">

          {/* CATEGORIES */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="section-title">Kategori Sampah</h2>
              <Link href="/categories" className="text-sm font-bold flex items-center gap-1 hover:underline underline-offset-4">
                Lihat semua <ChevronRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {CATEGORIES.map(({ id, Icon, label, price, bg }) => (
                <button
                  key={id}
                  onClick={() => setActiveCategory(activeCategory === id ? null : id)}
                  className={`nb-card p-3 text-center ${bg} ${activeCategory === id ? "translate-x-[2px] translate-y-[2px] shadow-[2px_2px_0_#000]" : ""}`}
                >
                  <div className="w-10 h-10 bg-black rounded-xl mx-auto flex items-center justify-center">
                    <Icon size={20} className="text-white" />
                  </div>
                  <p className="text-xs font-black text-black mt-2">{label}</p>
                  <p className="text-[9px] font-semibold text-black/60 mt-0.5 leading-tight">{price}</p>
                </button>
              ))}
            </div>
          </section>

          {/* COLLECTORS */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="section-title">Pengepul Terdekat</h2>
                <p className="text-xs font-semibold text-gray-500 mt-1 flex items-center gap-1">
                  <MapPin size={11} /> Sekitar Sleman
                </p>
              </div>
              <button className="nb-btn bg-white text-black text-xs">
                <Filter size={13} /> Filter
              </button>
            </div>
            {/* Mobile: horizontal scroll | Desktop: 2-col grid */}
            <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-2 md:overflow-visible">
              {COLLECTORS.map((c) => <CollectorCard key={c.id} c={c} />)}
            </div>
          </section>

          {/* TRANSACTIONS */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="section-title">Aktivitas Terakhir</h2>
              <Link href="/history" className="text-sm font-bold flex items-center gap-1 hover:underline underline-offset-4">
                Semua <ChevronRight size={14} />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {TRANSACTIONS.map(({ id, Icon, label, weight, amount, date }) => (
                <div key={id} className="nb-card p-4 flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-[#90e0ff] border-2 border-black rounded-xl flex items-center justify-center">
                      <Icon size={18} className="text-black" />
                    </div>
                    <div>
                      <p className="font-black text-sm text-black">{label}</p>
                      <p className="text-xs text-gray-500 font-medium mt-0.5">{weight} · {date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-black">{amount}</p>
                    <div className="flex items-center justify-end gap-1 mt-1.5 bg-[#c9f21d] border border-black rounded px-1.5 py-0.5">
                      <CheckCircle size={10} className="text-black" />
                      <span className="text-[9px] text-black font-black uppercase">Selesai</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ECO IMPACT (mobile) */}
          <section className="lg:hidden nb-card p-5 bg-[#c9f21d]">
            <div className="flex items-center gap-2 mb-2">
              <Leaf size={18} />
              <p className="font-black text-sm uppercase tracking-wider">Eco Impact Kamu</p>
            </div>
            <p className="font-black text-4xl text-black">6.0 kg</p>
            <p className="text-xs font-semibold text-black/70 mt-1">Sampah berhasil didaur ulang. Terus semangat!</p>
          </section>

          {/* HOW IT WORKS (mobile) */}
          <section className="lg:hidden nb-card p-5">
            <h3 className="font-black text-sm uppercase tracking-wider mb-4">Cara Kerja Rongsok.in</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { n: "01", title: "Temukan",  desc: "Cari pengepul terdekat", bg: "bg-[#ff90e8]" },
                { n: "02", title: "Jual",     desc: "Minta pickup sekarang",  bg: "bg-[#c9f21d]" },
                { n: "03", title: "Bayar",    desc: "Cash langsung di lokasi", bg: "bg-[#90e0ff]" },
                { n: "04", title: "Rating",   desc: "Dapat digital receipt",  bg: "bg-[#ffde59]" },
              ].map((s) => (
                <div key={s.n} className={`nb-card ${s.bg} p-3`}>
                  <p className="font-black text-xs text-black/50 uppercase tracking-wider">{s.n}</p>
                  <p className="font-black text-sm text-black mt-1">{s.title}</p>
                  <p className="text-[10px] font-semibold text-black/70 mt-0.5">{s.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* ── BOTTOM NAV (Mobile) ─────────────────────────────────────────────── */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-black">
        <div className="flex justify-around items-center max-w-lg mx-auto py-2 px-4">
          {[
            { href: "/", Icon: Home, label: "Beranda", active: true },
            { href: "/search", Icon: Search, label: "Cari", active: false },
            { href: "/history", Icon: History, label: "Riwayat", active: false },
            { href: "/profile", Icon: User, label: "Profil", active: false },
          ].map(({ href, Icon: NavIcon, label, active }) => (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-colors ${active ? "bg-black text-white" : "text-gray-400 hover:text-black"}`}
            >
              <NavIcon size={20} strokeWidth={active ? 2.5 : 2} />
              <span className="text-[10px] font-bold">{label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}