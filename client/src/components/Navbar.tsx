"use client";

import { RefreshCw, Bell, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="w-full flex justify-center pt-6 px-4 fixed top-0 left-0 z-[100] pointer-events-none">
      <nav className="bg-white rounded-full p-2 flex items-center shadow-[0_20px_50px_rgba(14,165,233,0.15)] border border-sky-100 pointer-events-auto w-full max-w-6xl">
        {/* Logo & Brand */}
        <Link 
          href="/" 
          className="flex items-center gap-3 pl-1 pr-4 hover:opacity-80 transition-opacity group shrink-0"
        >
          <div className="w-11 h-11 bg-sky-500 rounded-full flex items-center justify-center shadow-lg shadow-sky-200 transition-transform group-hover:scale-105">
            <RefreshCw className="text-white w-6 h-6 group-hover:rotate-180 transition-transform duration-700" />
          </div>
          <span className="font-extrabold text-sky-600 text-xl tracking-tight hidden xl:block">Rongsok.in</span>
        </Link>

        {/* Nav Links */}
        <div className="hidden lg:flex items-center px-4 gap-6 shrink-0">
          <Link href="/search" className="text-gray-500 hover:text-sky-600 text-sm font-bold transition-colors">Pengepul</Link>
          <Link href="/categories" className="text-gray-500 hover:text-sky-600 text-sm font-bold transition-colors">Kategori</Link>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-4 relative group">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-sky-500 transition-colors" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari kardus, plastik..."
            className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-full text-sm text-gray-700 placeholder-gray-400 outline-none focus:bg-white focus:border-sky-200 focus:ring-4 focus:ring-sky-500/5 transition-all shadow-inner"
          />
        </div>

        {/* Right Section: Notif & Profile */}
        <div className="flex items-center gap-3 ml-auto pr-1 shrink-0">
          <button className="relative w-10 h-10 bg-sky-50 text-sky-500 rounded-full flex items-center justify-center hover:bg-sky-100 transition-colors border border-sky-100">
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
          </button>
          
          <Link href="/profile" className="flex items-center gap-3 bg-sky-500 hover:bg-sky-600 text-white rounded-full pl-1.5 pr-5 py-1.5 transition-all shadow-lg shadow-sky-200 hover:shadow-sky-300">
            <div className="w-8 h-8 bg-sky-400 rounded-full overflow-hidden border border-white">
              <img src="/assets/rizky profile.jpg" alt="Rizky" className="w-full h-full object-cover" />
            </div>
            <div className="hidden sm:block">
              <p className="text-[10px] text-sky-100 font-medium leading-none mb-0.5 uppercase tracking-wider">Member</p>
              <p className="text-sm font-bold leading-none">Rizky</p>
            </div>
          </Link>
        </div>
      </nav>
    </div>
  );
}
