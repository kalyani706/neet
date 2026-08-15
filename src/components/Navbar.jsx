import React from 'react';
import { 
  Stethoscope, BookOpen, Layers, Award, 
  Image as ImageIcon, Video, FileText, Bookmark, 
  AlertTriangle, Settings, BarChart2 
} from 'lucide-react';

export default function Navbar({ currentMode, setMode, counts, instantAnswer, setInstantAnswer }) {
  const navItems = [
    { id: 'practice', label: 'Practice Mode', icon: BookOpen },
    { id: 'mock', label: 'Full Mock (180 Qs)', icon: Award, badge: 'Official 2026' },
    { id: 'subject', label: 'Subject Tests', icon: Layers },
    { id: 'expected', label: 'High-Yield Expected', icon: FileText },
    { id: 'image', label: 'Image Challenge', icon: ImageIcon },
    { id: 'video', label: 'Video Challenge', icon: Video },
    { id: 'incorrect', label: 'Incorrect Vault', icon: AlertTriangle, count: counts.incorrect },
    { id: 'bookmarks', label: 'Bookmarks', icon: Bookmark, count: counts.bookmarks },
    { id: 'trends', label: 'PYQ Trends', icon: BarChart2 },
    { id: 'admin', label: 'Manage Bank', icon: Settings }
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
      {/* Top Brand Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setMode('practice')}>
          <div className="bg-brand-600 p-2.5 rounded-xl text-white shadow-md shadow-brand-500/20">
            <Stethoscope className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-xl text-slate-900 tracking-tight">NEET-PG <span className="text-brand-600">2026</span></span>
              <span className="bg-brand-100 text-brand-700 text-xs font-semibold px-2 py-0.5 rounded-full border border-brand-200">
                Self-Paced Mastery
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">NBEMS Pattern (180 Qs / 720 Marks) • Zero-Timer Practice</p>
          </div>
        </div>

        {/* Global Instant Answer Toggle */}
        <div className="flex items-center space-x-3 bg-slate-50 px-3.5 py-1.5 rounded-lg border border-slate-200">
          <span className="text-xs font-medium text-slate-700">Instant Answer Mode</span>
          <button
            onClick={() => setInstantAnswer(!instantAnswer)}
            className={`relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              instantAnswer ? 'bg-medteal-500' : 'bg-slate-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                instantAnswer ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
          <span className={`text-xs font-bold ${instantAnswer ? 'text-medteal-600' : 'text-slate-400'}`}>
            {instantAnswer ? 'ON' : 'OFF'}
          </span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-1 overflow-x-auto py-2 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentMode === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setMode(item.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{item.label}</span>
                {item.count !== undefined && item.count > 0 && (
                  <span className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                    isActive ? 'bg-white text-brand-700' : 'bg-rose-100 text-rose-700'
                  }`}>
                    {item.count}
                  </span>
                )}
                {item.badge && (
                  <span className={`ml-1 px-1.5 py-0.2 rounded text-[9px] uppercase tracking-wider font-extrabold ${
                    isActive ? 'bg-amber-400 text-slate-900' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}