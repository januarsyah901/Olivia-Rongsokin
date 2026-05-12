"use client";

import { useEffect, useState } from 'react';
import { 
  Package, MapPin, Clock, CheckCircle2, XCircle, 
  ArrowRight, Loader2, Bell, TrendingUp, Users, Trash2
} from 'lucide-react';
import Link from 'next/link';
import io from 'socket.io-client';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
const SOCKET_URL = 'http://localhost:3001';

export default function CollectorDashboard() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalOrders: 0, pendingOrders: 0, earnings: 0 });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${API_URL}/orders/me`);
        const data = await res.json();
        if (data.status === 'success') {
          setOrders(data.data);
          // Simple stats calculation
          const pending = data.data.filter((o: any) => o.status === 'PENDING').length;
          const completed = data.data.filter((o: any) => o.status === 'COMPLETED');
          const earnings = completed.reduce((acc: number, o: any) => acc + (o.totalPrice || 0), 0);
          setStats({ totalOrders: data.data.length, pendingOrders: pending, earnings });
        }
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();

    // Socket for new order notifications
    const socket = io(SOCKET_URL);
    // In real app, we get collectorId from user profile
    // For now, let's assume we join a general room or specific one if we had the ID
    // socket.emit('join_room', `collector:${user.id}`);

    socket.on('new_order', (newOrder) => {
      setOrders(prev => [newOrder, ...prev]);
      setStats(prev => ({ ...prev, totalOrders: prev.totalOrders + 1, pendingOrders: prev.pendingOrders + 1 }));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-sky-500 animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dashboard Header */}
        <div className="mb-10 slide-up">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Dashboard Pengepul</h1>
          <p className="text-gray-500 font-medium">Kelola pesanan dan pantau pendapatanmu hari ini.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-sky-50">
             <div className="w-12 h-12 bg-sky-500 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg shadow-sky-100">
               <Package size={24} />
             </div>
             <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Total Pesanan</p>
             <h2 className="text-4xl font-black text-gray-900">{stats.totalOrders}</h2>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-amber-50">
             <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg shadow-amber-100">
               <Bell size={24} />
             </div>
             <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Menunggu</p>
             <h2 className="text-4xl font-black text-gray-900">{stats.pendingOrders}</h2>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-emerald-50">
             <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg shadow-emerald-100">
               <TrendingUp size={24} />
             </div>
             <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Pendapatan</p>
             <h2 className="text-4xl font-black text-emerald-600">Rp {stats.earnings.toLocaleString()}</h2>
          </div>
        </div>

        {/* Orders List */}
        <div className="bg-white rounded-[3rem] p-8 lg:p-10 shadow-2xl border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-gray-900">Pesanan Terbaru</h3>
            <button className="text-sky-600 font-bold hover:underline">Lihat Semua</button>
          </div>

          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="text-center py-20 bg-gray-50 rounded-[2rem] border border-dashed border-gray-200">
                <Trash2 size={48} className="text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 font-bold">Belum ada pesanan masuk.</p>
              </div>
            ) : (
              orders.map((order) => (
                <Link 
                  key={order.id} 
                  href={`/orders/${order.id}`}
                  className="flex flex-col sm:flex-row items-center justify-between p-6 rounded-[2rem] bg-gray-50 border border-gray-100 hover:border-sky-500/30 hover:bg-sky-50/50 transition-all group"
                >
                  <div className="flex items-center gap-6 mb-4 sm:mb-0">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm border border-gray-100 group-hover:scale-110 transition-transform">
                      📦
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900 text-lg">{order.category.name}</h4>
                      <p className="text-sm text-gray-500 font-medium">Dari: <span className="font-bold text-gray-800">{order.customer.name}</span></p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <p className="text-sm font-black text-sky-600">{order.status}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-sky-500 shadow-sm group-hover:bg-sky-500 group-hover:text-white transition-all">
                      <ArrowRight size={20} />
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

      </div>
    </main>
  );
}
