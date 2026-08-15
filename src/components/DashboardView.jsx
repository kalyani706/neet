import React from 'react';
import { 
  Award, CheckCircle, XCircle, HelpCircle, 
  BarChart, TrendingUp, AlertTriangle, BookOpen, RotateCcw 
} from 'lucide-react';

export default function DashboardView({ results, questions, onRetry, onPracticeIncorrect }) {
  if (!results) return null;

  const { correct, incorrect, unattempted, score, maxScore, accuracy, subjectBreakdown, missedTopics } = results;

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn pb-12">
      {/* Primary Scorecard Banner */}
      <div className="bg-gradient-to-br from-brand-700 via-brand-800 to-slate-900 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Award className="w-6 h-6 text-amber-400" />
              <span className="text-xs font-bold text-brand-200 uppercase tracking-widest">
                NEET-PG 2026 Assessment Dashboard
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Test Score: <span className="text-amber-400">{score}</span> / {maxScore}
            </h2>
            <p className="text-sm text-brand-100 mt-1 font-medium">
              Formula: (+4 × {correct}) - (1 × {incorrect}) | No penalty for {unattempted} unattempted
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
            <div className="text-center px-4 border-r border-white/10">
              <div className="text-2xl font-black text-emerald-400">{accuracy}%</div>
              <div className="text-[11px] font-semibold text-slate-300 uppercase">Accuracy</div>
            </div>
            <div className="text-center px-4">
              <div className="text-2xl font-black text-white">{correct + incorrect} / {questions.length}</div>
              <div className="text-[11px] font-semibold text-slate-300 uppercase">Attempted</div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Statistics 4-Card Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm flex items-center space-x-3">
          <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900">{correct}</div>
            <div className="text-xs font-semibold text-emerald-700">Correct (+{correct * 4})</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-rose-100 shadow-sm flex items-center space-x-3">
          <div className="p-3 bg-rose-100 text-rose-600 rounded-xl">
            <XCircle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900">{incorrect}</div>
            <div className="text-xs font-semibold text-rose-700">Incorrect (-{incorrect})</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-3">
          <div className="p-3 bg-slate-100 text-slate-600 rounded-xl">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900">{unattempted}</div>
            <div className="text-xs font-semibold text-slate-500">Unattempted (0)</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-brand-100 shadow-sm flex items-center space-x-3">
          <div className="p-3 bg-brand-100 text-brand-600 rounded-xl">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900">{accuracy}%</div>
            <div className="text-xs font-semibold text-brand-700">Strike Rate</div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 items-center justify-between bg-slate-100 p-4 rounded-2xl">
        <div className="text-xs font-bold text-slate-700">Recommended Post-Test Remediation:</div>
        <div className="flex gap-3">
          {incorrect > 0 && (
            <button
              onClick={onPracticeIncorrect}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 text-white hover:bg-rose-700 shadow-sm transition-all"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Practice {incorrect} Incorrect Questions</span>
            </button>
          )}
          <button
            onClick={onRetry}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-white text-slate-800 border border-slate-300 hover:bg-slate-50 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake Exam</span>
          </button>
        </div>
      </div>

      {/* Subject-Wise Granular Performance Breakdown */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h3 className="text-base font-extrabold text-slate-900 mb-4 flex items-center space-x-2">
          <BarChart className="w-5 h-5 text-brand-600" />
          <span>Subject-Wise Performance & Accuracy Analysis</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs md:text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-bold bg-slate-50">
                <th className="p-3">Subject</th>
                <th className="p-3 text-center">Attempted</th>
                <th className="p-3 text-center">Correct</th>
                <th className="p-3 text-center">Incorrect</th>
                <th className="p-3 text-center">Accuracy</th>
                <th className="p-3 text-right">Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {Object.entries(subjectBreakdown).map(([subj, stats]) => {
                const subjAcc = stats.attempted > 0 ? Math.round((stats.correct / stats.attempted) * 100) : 0;
                return (
                  <tr key={subj} className="hover:bg-slate-50/50">
                    <td className="p-3 font-bold text-slate-800">{subj}</td>
                    <td className="p-3 text-center text-slate-600">{stats.attempted} / {stats.total}</td>
                    <td className="p-3 text-center font-bold text-emerald-600">+{stats.correct}</td>
                    <td className="p-3 text-center font-bold text-rose-600">-{stats.incorrect}</td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                        subjAcc >= 75 ? 'bg-emerald-100 text-emerald-800' :
                        subjAcc >= 50 ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {subjAcc}%
                      </span>
                    </td>
                    <td className="p-3 text-right font-extrabold text-slate-900">
                      {(stats.correct * 4) - stats.incorrect}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* High-Yield Topics Missed & Targeted Revision Directives */}
      {missedTopics && missedTopics.length > 0 && (
        <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-6">
          <h4 className="text-sm font-extrabold text-amber-900 uppercase tracking-wider mb-3 flex items-center space-x-2">
            <BookOpen className="w-4 h-4 text-amber-700" />
            <span>High-Yield Topics Missed — Priority Revision Recommendations</span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {missedTopics.map((topic, i) => (
              <div key={i} className="bg-white p-3.5 rounded-xl border border-amber-200/80 shadow-xs flex items-start space-x-2">
                <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-slate-900">{topic.subject}: {topic.topic}</div>
                  <div className="text-[11px] text-slate-600 mt-0.5">{topic.keyPoint}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}