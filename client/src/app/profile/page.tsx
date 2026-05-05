"use client";

import { 
  User, Settings, MapPin, CreditCard, History, ShieldCheck, 
  LogOut, ChevronRight, Award, Leaf, Zap, Heart, Camera
} from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const user = {
    name: "Rizky Ramadhan",
    email: "rizky.rama@email.com",
    avatar: "/assets/rizky profile.jpg",
    joined: "Member sejak Jan 2024",
    level: "Eco Hero",
    points: 1250,
    stats: [
      { label: "Total Terjual", value: "124 kg", icon: <Zap className="text-amber-500" /> },
      { label: "Cuan Didapat", value: "Rp 450rb", icon: <CreditCard className="text-emerald-500" /> },
      { label: "Pohon Diselamatkan", value: "12", icon: <Leaf className="text-green-500" /> },
    ]
  };

  const menuItems = [
    { label: "Riwayat Transaksi", icon: <History size={20} />, href: "/history", color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Alamat Tersimpan", icon: <MapPin size={20} />, href: "/addresses", color: "text-emerald-500", bg: "bg-emerald-50" },
    { label: "Metode Pembayaran", icon: <CreditCard size={20} />, href: "/payments", color: "text-purple-500", bg: "bg-purple-50" },
    { label: "Keamanan Akun", icon: <ShieldCheck size={20} />, href: "/security", color: "text-orange-500", bg: "bg-orange-50" },
    { label: "Pusat Bantuan", icon: <Heart size={20} />, href: "/help", color: "text-red-500", bg: "bg-red-50" },
    { label: "Pengaturan", icon: <Settings size={20} />, href: "/settings", color: "text-gray-500", bg: "bg-gray-50" },
  ];

  return (
    <main className="min-h-screen bg-[#F8FAFC] pb-24 pt-24 lg:pt-36">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Profile Hero */}
        <div className="bg-white rounded-[2.5rem] p-8 lg:p-10 shadow-xl shadow-sky-100/50 border border-sky-50 mb-8 slide-up">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative group">
              <div className="w-32 h-32 rounded-[2rem] overflow-hidden border-4 border-sky-50 shadow-lg">
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
              </div>
              <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-sky-500 text-white rounded-xl flex items-center justify-center shadow-lg border-2 border-white hover:bg-sky-600 transition-colors">
                <Camera size={18} />
              </button>
            </div>
            
            <div className="text-center md:text-left flex-1">
              <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">{user.name}</h1>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500 text-white text-[10px] font-black rounded-full shadow-lg shadow-amber-100 mx-auto md:mx-0 w-fit">
                  <Award size={12} fill="white" /> {user.level}
                </span>
              </div>
              <p className="text-gray-500 font-medium mb-4">{user.email}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <div className="px-4 py-2 bg-sky-50 text-sky-600 rounded-xl text-xs font-bold border border-sky-100">
                  {user.joined}
                </div>
                <div className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-xs font-bold border border-emerald-100">
                  {user.points} R-Points
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {user.stats.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-[2rem] shadow-lg shadow-gray-100 border border-gray-50 flex items-center gap-4 hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-2xl shadow-inner">
                {stat.icon}
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{stat.label}</p>
                <p className="text-xl font-black text-gray-800">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Environmental Impact Banner */}
        <div className="bg-emerald-500 rounded-[2.5rem] p-8 text-white mb-8 relative overflow-hidden shadow-xl shadow-emerald-100 group">
          <Leaf size={120} className="absolute -right-8 -top-8 text-white/10 -rotate-12 group-hover:rotate-0 transition-transform duration-700" />
          <div className="relative z-10 max-w-lg">
            <h3 className="text-2xl font-black mb-2 tracking-tight">Eco Impact Kamu</h3>
            <p className="text-emerald-50 font-medium opacity-90 leading-relaxed">
              Kamu telah membantu mengurangi sampah di Yogyakarta sebanyak 124 kg! Teruskan kontribusimu untuk bumi yang lebih hijau.
            </p>
            <button className="mt-6 bg-white text-emerald-600 font-black px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-95 text-sm">
              Lihat Sertifikat Eco
            </button>
          </div>
        </div>

        {/* Menu List */}
        <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-gray-100 border border-gray-50 mb-8">
          {menuItems.map((item, i) => (
            <Link 
              key={i} 
              href={item.href}
              className={`flex items-center justify-between p-6 hover:bg-gray-50 transition-all border-b border-gray-50 last:border-0 group`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <span className="font-bold text-gray-700">{item.label}</span>
              </div>
              <ChevronRight size={20} className="text-gray-300 group-hover:text-sky-500 group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>

        {/* Logout Button */}
        <button className="w-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white font-black py-5 rounded-[2rem] transition-all flex items-center justify-center gap-3 active:scale-[0.98] border-2 border-red-100 mb-12 group">
          <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" /> Keluar dari Akun
        </button>

      </div>
    </main>
  );
}
