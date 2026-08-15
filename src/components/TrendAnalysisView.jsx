import React from 'react';
import { BarChart2, TrendingUp, CheckCircle, Lightbulb } from 'lucide-react';
import { subjectTrendData } from '../data/trendData';

export default function TrendAnalysisView() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center space-x-3 mb-2">
          <div className="bg-brand-50 p-2 rounded-xl text-brand-600">
            <BarChart2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">NEET-PG Previous Years Recurring Concept Trends</h2>
            <p className="text-xs text-slate-500">
              Cross-examination synthesis of NEET-PG 2021-2025 question recalls & high-yield repetition patterns
            </p>
          </div>
        </div>
      </div>

      {/* Grid of Subject Trends */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {subjectTrendData.map((item, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:border-brand-300 transition-all">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <h3 className="font-extrabold text-base text-slate-900">{item.subject}</h3>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200">
                {item.weightageTrend}
              </span>
            </div>

            <div className="space-y-3 text-xs md:text-sm">
              <div>
                <span className="font-bold text-slate-700">Core High-Yield Focus: </span>
                <span className="text-slate-600">{item.coreFocus}</span>
              </div>

              <div>
                <span className="font-bold text-slate-700">Image / Visual Frequency: </span>
                <span className="text-slate-600">{item.imageFrequency}</span>
              </div>

              <div className="pt-2">
                <span className="font-bold text-slate-800 block mb-1.5 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-brand-600" />
                  Top Repeated Concepts:
                </span>
                <ul className="space-y-1.5 pl-2">
                  {item.recurringConcepts.map((c, ci) => (
                    <li key={ci} className="text-xs text-slate-600 flex items-start space-x-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}