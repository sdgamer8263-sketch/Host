import React, { useState } from 'react';
import { 
  Server, 
  LayoutDashboard, 
  Receipt, 
  Users, 
  Settings, 
  LogOut, 
  Bell, 
  Search,
  ArrowUpRight,
  Plus
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Mock Data
const revenueData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 5500 },
  { name: 'Jul', value: 7000 },
];

const recentInvoices = [
  { id: 'INV-1990', client: 'Acme Corp', amount: '$4,500.00', date: 'Oct 23, 2026', status: 'Paid' },
  { id: 'INV-1991', client: 'Globex Inc', amount: '$1,250.00', date: 'Oct 24, 2026', status: 'Pending' },
  { id: 'INV-1992', client: 'Soylent Corp', amount: '$8,900.00', date: 'Oct 25, 2026', status: 'Paid' },
  { id: 'INV-1993', client: 'Initech', amount: '$340.00', date: 'Oct 28, 2026', status: 'Overdue' },
  { id: 'INV-1994', client: 'Umbrella Corp', amount: '$12,000.00', date: 'Oct 29, 2026', status: 'Draft' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');

  return (
    <div className="min-h-screen flex w-full">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col hidden md:flex shrink-0">
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 font-bold flex items-center justify-center text-white">
              E
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white uppercase">Etalemc</h1>
          </div>
          <div className="mt-1 text-xs font-mono text-slate-500 uppercase tracking-widest pl-11">
            Billing Portal
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-6">
          {[
            { icon: LayoutDashboard, label: 'Dashboard' },
            { icon: Receipt, label: 'Invoices' },
            { icon: Users, label: 'Clients' },
            { icon: Settings, label: 'Settings' },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveTab(item.label)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                activeTab === item.label
                  ? "bg-blue-600/10 text-blue-400"
                  : "hover:bg-slate-800 hover:text-white"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 px-3 py-3 rounded-lg bg-slate-800/50 mb-3 shadow-inner">
            <Server className="w-5 h-5 text-blue-400" />
            <div>
              <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mb-0.5">Powered by</p>
              <p className="text-xs text-white font-medium">SKA Hosting</p>
            </div>
          </div>
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
            <LogOut className="w-4 h-4" />
            Log out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#f5f6f8]">
        {/* Top Header */}
        <header className="h-16 px-8 flex items-center justify-between border-b border-slate-200 bg-white sticky top-0 z-10">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search invoices, clients..." 
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 outline-none rounded-lg text-sm focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-900 shadow-sm"
              />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button className="relative text-slate-400 hover:text-slate-600 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
            </button>
            <div className="flex items-center gap-3 border-l border-slate-200 pl-6">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-700">Admin User</p>
                <p className="text-xs text-slate-500">admin@etalemc.com</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-slate-200 border-2 border-white shadow-sm flex items-center justify-center font-bold text-slate-600 text-sm overflow-hidden">
                <img src="https://picsum.photos/seed/admin/100/100" alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 p-8 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Page Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard</h2>
                <p className="text-sm text-slate-500 mt-1">Welcome back. Here's what's happening today.</p>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-sm">
                <Plus className="w-4 h-4" />
                New Invoice
              </button>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Total Revenue', value: '$84,250.00', trend: '+14.5%', trendUp: true },
                { label: 'Outstanding Invoices', value: '$12,400.00', trend: '-2.4%', trendUp: false },
                { label: 'Active Subscriptions', value: '142', trend: '+12', trendUp: true },
              ].map((stat) => (
                <div key={stat.label} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                  <div className="mt-4 flex items-end justify-between">
                    <h3 className="text-3xl font-light text-slate-900">{stat.value}</h3>
                    <div className={cn(
                      "flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-md",
                      stat.trendUp ? "text-emerald-700 bg-emerald-50" : "text-rose-700 bg-rose-50"
                    )}>
                      {stat.trendUp ? <ArrowUpRight className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4 rotate-90" />}
                      {stat.trend}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Chart & Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Revenue Chart */}
              <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-base font-semibold text-slate-900">Revenue Overview</h3>
                  <select className="bg-transparent text-sm font-medium text-slate-500 outline-none cursor-pointer hover:text-slate-900 transition-colors">
                    <option>Last 7 months</option>
                    <option>This Year</option>
                    <option>All Time</option>
                  </select>
                </div>
                <div className="flex-1 min-h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        labelStyle={{ color: '#64748b', fontSize: '12px' }}
                        itemStyle={{ color: '#0f172a', fontWeight: 'bold' }}
                      />
                      <Area type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Recent Invoices */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-base font-semibold text-slate-900">Recent Invoices</h3>
                  <button className="text-sm font-medium text-blue-600 hover:text-blue-700">View all</button>
                </div>
                <div className="flex-1 flex flex-col gap-4">
                  {recentInvoices.map((inv) => (
                    <div key={inv.id} className="flex items-center justify-between group py-1">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 font-medium text-xs">
                          {inv.client.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer">{inv.client}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{inv.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-slate-900">{inv.amount}</p>
                        <p className={cn(
                          "text-xs font-medium mt-0.5",
                          inv.status === 'Paid' ? "text-emerald-600" :
                          inv.status === 'Overdue' ? "text-rose-600" :
                          inv.status === 'Pending' ? "text-amber-600" : "text-slate-500"
                        )}>{inv.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
