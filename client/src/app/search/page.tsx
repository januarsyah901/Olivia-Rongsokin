"use client";

import { useState, useEffect } from "react";
import { 
  Search, Filter, Star, MapPin, Zap, ArrowRight, Award, 
  SlidersHorizontal, ChevronDown, LayoutGrid, List as ListIcon,
  Loader2
} from "lucide-react";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [categories, setCategories] = useState<any[]>([]);
  const [collectors, setCollectors] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState("Terdekat");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_URL}/discovery/categories`);
        const data = await res.json();
        if (data.status === 'success') {
          setCategories(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    fetchCategories();
  }, []);

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        },
        (err) => {
          console.error("Geolocation error", err);
          // Default to Jogja if failed
          setUserLocation({ lat: -7.7956, lng: 110.3695 });
        }
      );
    }
  }, []);

  // Fetch collectors based on location and search query
  useEffect(() => {
    if (!userLocation) return;

    const fetchCollectors = async () => {
      setLoading(true);
      try {
        let url = `${API_URL}/discovery/search?lat=${userLocation.lat}&lng=${userLocation.lng}`;
        if (activeCategory !== "Semua") {
          const cat = categories.find(c => c.name === activeCategory);
          if (cat) url += `&categoryId=${cat.id}`;
        }
        
        const res = await fetch(url);
        const data = await res.json();
        if (data.status === 'success') {
          setCollectors(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch collectors", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCollectors();
  }, [userLocation, activeCategory, categories]);

  const filteredCollectors = collectors.filter(c => {
    const matchesSearch = c.shopName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
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
          <button
            onClick={() => setActiveCategory("Semua")}
            className={`flex-shrink-0 px-6 py-3 rounded-2xl font-bold text-sm transition-all shadow-sm ${
              activeCategory === "Semua" 
                ? "bg-sky-500 text-white shadow-sky-200 shadow-lg scale-105" 
                : "bg-white text-gray-500 hover:bg-gray-50 border border-transparent"
            }`}
          >
            Semua
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.name)}
              className={`flex-shrink-0 px-6 py-3 rounded-2xl font-bold text-sm transition-all shadow-sm ${
                activeCategory === cat.name 
                  ? "bg-sky-500 text-white shadow-sky-200 shadow-lg scale-105" 
                  : "bg-white text-gray-500 hover:bg-gray-50 border border-transparent"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* View Mode & Results Count */}
        <div className="flex items-center justify-between mb-8 px-2">
          <p className="text-sm font-bold text-gray-500">
            {loading ? "Mencari pengepul..." : (
              <>Menampilkan <span className="text-sky-600">{filteredCollectors.length}</span> pengepul</>
            )}
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

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-sky-500 animate-spin mb-4" />
            <p className="text-gray-500 font-bold">Mencari mitra di sekitarmu...</p>
          </div>
        )}

        {/* Collector List/Grid */}
        {!loading && (
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
                    <div className={`w-14 h-14 bg-sky-500 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg shrink-0 group-hover:scale-110 transition-transform`}>
                      {c.shopName.charAt(0)}
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-amber-500 justify-end">
                        <Star size={16} className="fill-current" />
                        <span className="font-black text-gray-800">4.5</span>
                      </div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Baru</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-extrabold text-gray-900 text-lg group-hover:text-sky-600 transition-colors">{c.shopName}</h3>
                      {c.isPremium && (
                        <span className="bg-amber-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded-md shadow-sm">PRO</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 font-medium">{c.name}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-600 bg-gray-50 px-3 py-2 rounded-xl border border-gray-100">
                      <MapPin size={14} className="text-emerald-500" /> {(c.distance / 1000).toFixed(1)} km
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-sky-600 bg-sky-50 px-3 py-2 rounded-xl border border-sky-100">
                      <Zap size={14} /> Aktif
                    </div>
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
        )}

        {/* Empty State */}
        {!loading && filteredCollectors.length === 0 && (
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
