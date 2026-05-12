"use client";

import {
  Star, MapPin, Zap, ChevronLeft, Phone, MessageSquare,
  Clock, ShieldCheck, Info, Package, ArrowRight, Share2, Heart
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

// Mock data to match the home page
const COLLECTORS = [
  {
    id: 1, name: "Pak Budi", lapakName: "Lapak Budi Jaya",
    distance: "0.8 km", rating: 4.9, reviewCount: 142, isPremium: true, isOpen: true,
    categories: [
      { name: "Kardus", price: "Rp 2.500/kg", icon: "📦" },
      { name: "Plastik", price: "Rp 4.000/kg", icon: "♻️" },
      { name: "Kertas", price: "Rp 1.500/kg", icon: "📄" },
      { name: "Besi", price: "Rp 6.000/kg", icon: "🏗️" }
    ],
    eta: "15–30 menit", avatar: "B", color: "bg-sky-500",
    address: "Jl. Kaliurang KM 5, Sleman, Yogyakarta",
    description: "Spesialis kardus dan plastik. Melayani penjemputan area kos-kosan dengan timbangan digital akurat. Kami juga menerima barang elektronik bekas dan logam lainnya dengan harga kompetitif.",
    image: "/assets/lapak-1.png"
  },
  {
    id: 2, name: "Ibu Sari", lapakName: "UD Sari Jaya",
    distance: "1.2 km", rating: 4.7, reviewCount: 89, isPremium: false, isOpen: true,
    categories: [
      { name: "Besi/Logam", price: "Rp 5.500/kg", icon: "🏗️" },
      { name: "Plastik", price: "Rp 3.500/kg", icon: "♻️" },
      { name: "Elektronik", price: "Rp 12.000/kg", icon: "💻" }
    ],
    eta: "30–45 menit", avatar: "S", color: "bg-emerald-500",
    address: "Jl. Gejayan No. 12, Yogyakarta",
    description: "Menerima segala jenis logam dan barang elektronik. Jemputan cepat untuk area Depok dan sekitarnya.",
    image: "/assets/lapak-1.png" // Using same for now
  }
];

export default function CollectorDetail() {
  const params = useParams();
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);

  const collector = COLLECTORS.find(c => c.id === Number(params.id)) || COLLECTORS[0];

  return (
    <main className="min-h-screen bg-white pb-24 pt-20 lg:pt-32">
      {/* Floating Back Button (Mobile) */}
      <div className="fixed top-24 left-4 z-40 lg:hidden">
        <button
          onClick={() => router.back()}
          className="w-12 h-12 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-xl border border-gray-100 text-gray-800 active:scale-95 transition-all"
        >
          <ChevronLeft size={24} />
        </button>
      </div>

      <div className="max-w-6xl mx-auto lg:pt-32 px-0 lg:px-6">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* Left Column: Image & Info */}
          <div className="flex-1">
            <div className="relative h-[350px] lg:h-[500px] w-full lg:rounded-[2.5rem] overflow-hidden shadow-2xl group">
              <img
                src={collector.image}
                alt={collector.lapakName}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Desktop Back Button */}
              <div className="absolute top-6 left-6 hidden lg:block">
                <button
                  onClick={() => router.back()}
                  className="bg-white hover:bg-gray-50 p-3 rounded-2xl shadow-xl transition-all active:scale-95"
                >
                  <ChevronLeft size={24} className="text-gray-800" />
                </button>
              </div>

              {/* Overlay Content */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-sky-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                    <Zap size={12} /> TERVERIFIKASI
                  </div>
                  {collector.isPremium && (
                    <div className="bg-amber-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                      <Star size={12} fill="white" /> PREMIUM
                    </div>
                  )}
                </div>
                <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                  {collector.lapakName}
                </h1>
                <p className="text-white/80 text-lg mt-2 flex items-center gap-2">
                  <MapPin size={18} className="text-sky-400" /> {collector.address}
                </p>
              </div>
            </div>

            <div className="bg-white p-8 lg:p-10">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 ${collector.color} rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg`}>
                    {collector.avatar}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{collector.name}</h2>
                    <p className="text-gray-500 font-medium tracking-wide">Pengepul Tingkat Gold</p>
                  </div>
                </div>
                <div className="bg-amber-50 px-5 py-3 rounded-2xl border border-amber-100">
                  <div className="flex items-center gap-1.5 text-amber-500">
                    <Star size={24} className="fill-current" />
                    <span className="text-2xl font-black text-amber-600">{collector.rating}</span>
                  </div>
                  <p className="text-[10px] text-amber-700 font-bold text-center mt-1 uppercase tracking-tighter">{collector.reviewCount} ulasan</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                <div className="bg-sky-50 p-5 rounded-3xl border border-sky-100 flex flex-col items-center text-center">
                  <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center text-white mb-3 shadow-md shadow-sky-100">
                    <Clock size={20} />
                  </div>
                  <p className="text-[10px] text-sky-700 font-extrabold uppercase tracking-widest mb-1">Status</p>
                  <p className={`text-sm font-bold ${collector.isOpen ? "text-emerald-600" : "text-red-500"}`}>
                    {collector.isOpen ? "Buka Sekarang" : "Tutup"}
                  </p>
                </div>
                <div className="bg-emerald-50 p-5 rounded-3xl border border-emerald-100 flex flex-col items-center text-center">
                  <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white mb-3 shadow-md shadow-emerald-100">
                    <MapPin size={20} />
                  </div>
                  <p className="text-[10px] text-emerald-700 font-extrabold uppercase tracking-widest mb-1">Jarak</p>
                  <p className="text-sm font-bold text-gray-800">{collector.distance}</p>
                </div>
                <div className="bg-blue-50 p-5 rounded-3xl border border-blue-100 flex flex-col items-center text-center">
                  <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white mb-3 shadow-md shadow-blue-100">
                    <ShieldCheck size={20} />
                  </div>
                  <p className="text-[10px] text-blue-700 font-extrabold uppercase tracking-widest mb-1">Kualitas</p>
                  <p className="text-sm font-bold text-gray-800">Unggul</p>
                </div>
                <div className="bg-amber-50 p-5 rounded-3xl border border-amber-100 flex flex-col items-center text-center">
                  <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-white mb-3 shadow-md shadow-amber-100">
                    <Zap size={20} />
                  </div>
                  <p className="text-[10px] text-amber-700 font-extrabold uppercase tracking-widest mb-1">Respon</p>
                  <p className="text-sm font-bold text-gray-800">Kilat</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-1.5 bg-sky-500 rounded-full" />
                  <h3 className="font-bold text-xl text-gray-800 tracking-tight">Tentang Lapak</h3>
                </div>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {collector.description}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Pricing & CTA */}
          <div className="w-full lg:w-[400px] space-y-6 px-4 lg:px-0">
            <div className="bg-white rounded-[2.5rem] p-8 lg:p-10 shadow-2xl border border-gray-100 lg:sticky lg:top-32 slide-up">
              <h3 className="text-xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                <Package size={24} className="text-sky-500" /> Daftar Harga Hari Ini
              </h3>

              <div className="space-y-4 mb-10">
                {collector.categories.map((cat, i) => (
                  <div key={i} className="flex items-center justify-between p-5 rounded-3xl bg-gray-50 border border-gray-100 hover:border-sky-500/30 hover:bg-sky-50/30 transition-all cursor-default group/item">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm border border-gray-100 group-hover/item:scale-110 transition-transform">
                        {cat.icon}
                      </div>
                      <span className="font-bold text-gray-700 text-lg">{cat.name}</span>
                    </div>
                    <span className="font-black text-sky-600 text-lg tracking-tight">{cat.price}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <button className="w-full bg-sky-500 hover:bg-sky-600 text-white font-black py-5 rounded-[2rem] shadow-xl shadow-sky-100 transition-all flex items-center justify-center gap-3 active:scale-[0.98] text-lg">
                  Minta Penjemputan <ArrowRight size={20} />
                </button>
                <div className="grid grid-cols-2 gap-4">
                  <button className="flex items-center justify-center gap-3 bg-white border-2 border-gray-100 hover:border-sky-200 hover:bg-sky-50/30 text-gray-800 font-bold py-4 rounded-[1.5rem] transition-all">
                    <Phone size={20} className="text-sky-500" /> Telp
                  </button>
                  <button className="flex items-center justify-center gap-3 bg-white border-2 border-gray-100 hover:border-sky-200 hover:bg-sky-50/30 text-gray-800 font-bold py-4 rounded-[1.5rem] transition-all">
                    <MessageSquare size={20} className="text-sky-500" /> Chat
                  </button>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-3 text-emerald-600 bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
                <ShieldCheck size={20} />
                <p className="text-xs font-bold leading-tight">Transaksi aman & harga transparan melalui Rongsok.in</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
