"use client";

import { useState } from "react";
import { 
  Search, Filter, Star, MapPin, Zap, ArrowRight, Award, 
  SlidersHorizontal, ChevronDown, LayoutGrid, List as ListIcon 
} from "lucide-react";
import Link from "next/link";

const CATEGORIES = ["Semua", "Kardus", "Plastik", "Besi/Logam", "Kertas", "Botol Kaca", "Elektronik"];

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
    categories: ["Kardus", "Botol Kaca"], eta: "Tutup", avatar: "A", color: "bg-violet-500",
  },
  {
    id: 4, name: "Pak Tanto", lapakName: "Lapak Tanto",
    distance: "2.8 km", rating: 4.6, reviewCount: 57, isPremium: false, isOpen: true,
    categories: ["Besi/Logam", "Elektronik"], eta: "45–60 menit", avatar: "T", color: "bg-orange-500",
  },
  {
    id: 5, name: "Mbak Ani", lapakName: "Ani Recycle",
    distance: "3.5 km", rating: 4.8, reviewCount: 120, isPremium: true, isOpen: true,
    categories: ["Plastik", "Kertas"], eta: "20–40 menit", avatar: "A", color: "bg-blue-500",
  },
  {
    id: 6, name: "Haji Yusuf", lapakName: "Barokah Rongsok",
    distance: "4.2 km", rating: 4.9, reviewCount: 310, isPremium: true, isOpen: true,
    categories: ["Besi/Logam", "Kardus", "Elektronik"], eta: "15–25 menit", avatar: "Y", color: "bg-sky-600",
  }
];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [sortBy, setSortBy] = useState("Terdekat");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredCollectors = COLLECTORS.filter(c => {
    const matchesSearch = c.lapakName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "Semua" || c.categories.includes(activeCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-[#F8FAFC] pb-24 pt-24 lg:pt-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header Section */}
        <div className="mb-8 slide-up">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Pengepul Terdekat</h1>
          <p className="text-gray-500 font-medium">Temukan mitra pengepul terpercaya di sekitarmu.</p>
        </div>

        {/* Toolbar: Search & Filter */}
        <div className="bg-white rounded-[2.5rem] p-4 lg:p-6 shadow-xl shadow-sky-100/50 border border-sky-50 mb-10 flex flex-col lg:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text"
              placeholder="Cari nama lapak atau pengepul..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-gray-50 rounded-3xl border border-transparent focus:bg-white focus:border-sky-200 focus:ring-4 focus:ring-sky-500/5 outline-none transition-all font-medium"
            />
          </div>
          
          <div className="flex gap-3 w-full lg:w-auto">
            <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-4 bg-white border border-gray-100 rounded-3xl hover:border-sky-200 hover:bg-sky-50/30 transition-all font-bold text-gray-700">
              <SlidersHorizontal size={18} className="text-sky-500" />
              Filter
            </button>
            <div className="relative flex-1 lg:flex-none">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full appearance-none pl-6 pr-12 py-4 bg-white border border-gray-100 rounded-3xl hover:border-sky-200 hover:bg-sky-50/30 transition-all font-bold text-gray-700 outline-none cursor-pointer"
              >
                <option>Terdekat</option>
                <option>Rating Tertinggi</option>
                <option>Harga Terbaik</option>
              </select>
              <ChevronDown size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Categories Horizontal Scroll */}
        <div className="flex gap-3 overflow-x-auto pb-6 hide-scrollbar mb-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-6 py-3 rounded-2xl font-bold text-sm transition-all shadow-sm ${
                activeCategory === cat 
                  ? "bg-sky-500 text-white shadow-sky-200 shadow-lg scale-105" 
                  : "bg-white text-gray-500 hover:bg-gray-50 border border-transparent"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* View Mode & Results Count */}
        <div className="flex items-center justify-between mb-8 px-2">
          <p className="text-sm font-bold text-gray-500">
            Menampilkan <span className="text-sky-600">{filteredCollectors.length}</span> pengepul
          </p>
          <div className="flex bg-gray-100 p-1 rounded-xl">
            <button 
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-white shadow-sm text-sky-600" : "text-gray-400"}`}
            >
              <LayoutGrid size={18} />
            </button>
            <button 
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-white shadow-sm text-sky-600" : "text-gray-400"}`}
            >
              <ListIcon size={18} />
            </button>
          </div>
        </div>

        {/* Collector List/Grid */}
        <div className={
          viewMode === "grid" 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" 
            : "flex flex-col gap-4"
        }>
          {filteredCollectors.map((c) => (
            <Link
              key={c.id}
              href={`/collector/${c.id}`}
              className={`group bg-white rounded-3xl border border-sky-50 overflow-hidden hover:shadow-2xl hover:shadow-sky-100/50 hover:-translate-y-1.5 transition-all duration-300 ${
                viewMode === "list" ? "flex flex-col sm:flex-row p-4 gap-6" : ""
              }`}
            >
              <div className={viewMode === "grid" ? "p-6" : "p-2 flex-1"}>
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 ${c.color} rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg shrink-0 group-hover:scale-110 transition-transform`}>
                    {c.avatar}
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-amber-500 justify-end">
                      <Star size={16} className="fill-current" />
                      <span className="font-black text-gray-800">{c.rating}</span>
                    </div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">{c.reviewCount} ulasan</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-extrabold text-gray-900 text-lg group-hover:text-sky-600 transition-colors">{c.lapakName}</h3>
                    {c.isPremium && (
                      <span className="bg-amber-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded-md shadow-sm">PRO</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 font-medium">{c.name}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-600 bg-gray-50 px-3 py-2 rounded-xl border border-gray-100">
                    <MapPin size={14} className="text-emerald-500" /> {c.distance}
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-sky-600 bg-sky-50 px-3 py-2 rounded-xl border border-sky-100">
                    <Zap size={14} /> {c.eta}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {c.categories.map(cat => (
                    <span key={cat} className="text-[10px] font-bold px-2.5 py-1.5 bg-white border border-gray-200 text-gray-500 rounded-xl">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              <div className={`${viewMode === "grid" ? "px-6 pb-6" : "sm:w-48 flex items-center justify-center p-4 border-t sm:border-t-0 sm:border-l border-gray-50"}`}>
                <div className="w-full bg-sky-50 text-sky-600 font-black text-xs py-3.5 rounded-2xl flex items-center justify-center gap-2 group-hover:bg-sky-500 group-hover:text-white group-hover:shadow-lg transition-all">
                  Lihat Detail <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredCollectors.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-sky-200">
             <div className="w-20 h-20 bg-sky-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search size={32} className="text-sky-300" />
             </div>
             <h3 className="text-xl font-bold text-gray-800 mb-2">Pengepul Tidak Ditemukan</h3>
             <p className="text-gray-500">Coba gunakan kata kunci lain atau pilih kategori berbeda.</p>
             <button 
              onClick={() => {setSearchQuery(""); setActiveCategory("Semua");}}
              className="mt-6 text-sky-600 font-bold hover:underline"
             >
               Hapus semua filter
             </button>
          </div>
        )}

      </div>
    </main>
  );
}
