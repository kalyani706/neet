import React from 'react';
import { 
  Bookmark, CheckCircle2, XCircle, HelpCircle, 
  Sparkles, Layers, ChevronRight, ChevronLeft, RotateCcw 
} from 'lucide-react';
import VisualViewer from './VisualViewer';

export default function QuestionCard({
  question,
  currentIndex,
  totalQuestions,
  userSelected,
  onSelectOption,
  instantAnswer,
  isBookmarked,
  onToggleBookmark,
  onNext,
  onPrev,
  onClear,
  isMarkedForReview,
  onToggleReview
}) {
  if (!question) return null;

  const isAnswered = userSelected !== undefined && userSelected !== null;
  const optionLabels = ['A', 'B', 'C', 'D'];

  const getProbabilityBadge = (prob) => {
    switch (prob) {
      case 'Very High Probability':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'High Probability':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-amber-50 text-amber-700 border-amber-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 max-w-4xl mx-auto">
      {/* Header Metadata Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 mb-6">
        <div className="flex items-center space-x-2">
          <span className="bg-brand-600 text-white font-extrabold text-xs px-2.5 py-1 rounded-md">
            Q {currentIndex + 1} / {totalQuestions}
          </span>
          <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
            {question.subject}
          </span>
          <span className="hidden sm:inline-block text-xs text-slate-500 font-medium bg-slate-50 border border-slate-200 px-2 py-0.5 rounded">
            {question.topic}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${getProbabilityBadge(question.probability)}`}>
            {question.probability || 'High Probability'}
          </span>
          <button
            onClick={() => onToggleBookmark(question.id)}
            className={`p-1.5 rounded-lg border transition-colors ${
              isBookmarked
                ? 'bg-amber-50 text-amber-600 border-amber-300'
                : 'text-slate-400 hover:text-slate-600 border-slate-200'
            }`}
            title="Bookmark this Question"
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Clinical Scenario Vignette */}
      {question.clinicalScenario && (
        <div className="bg-slate-50/80 border-l-4 border-brand-500 p-4 rounded-r-xl mb-5 text-slate-800 text-sm md:text-base leading-relaxed font-normal">
          {question.clinicalScenario}
        </div>
      )}

      {/* Question Stem */}
      <h3 className="text-base md:text-lg font-bold text-slate-900 mb-5 leading-snug">
        {question.question}
      </h3>

      {/* Visual / Image / Video Component */}
      <VisualViewer question={question} />

      {/* 4 Options Grid */}
      <div className="space-y-3 mb-6">
        {question.options.map((opt, idx) => {
          const isSelected = userSelected === idx;
          const isCorrect = idx === question.correctAnswer;
          
          let stateStyle = "border-slate-200 hover:border-brand-300 hover:bg-slate-50/80 text-slate-800 bg-white";
          let badgeStyle = "bg-slate-100 text-slate-700 border-slate-300";

          if (isAnswered && instantAnswer) {
            if (isCorrect) {
              stateStyle = "border-emerald-500 bg-emerald-50/70 text-emerald-950 font-medium ring-1 ring-emerald-500";
              badgeStyle = "bg-emerald-600 text-white border-emerald-600";
            } else if (isSelected && !isCorrect) {
              stateStyle = "border-rose-500 bg-rose-50/70 text-rose-950 font-medium ring-1 ring-rose-500";
              badgeStyle = "bg-rose-600 text-white border-rose-600";
            } else {
              stateStyle = "border-slate-200 text-slate-400 bg-slate-50/30 opacity-60";
            }
          } else if (isSelected) {
            stateStyle = "border-brand-600 bg-brand-50/60 text-brand-950 font-medium ring-1 ring-brand-600";
            badgeStyle = "bg-brand-600 text-white border-brand-600";
          }

          return (
            <button
              key={idx}
              onClick={() => onSelectOption(idx)}
              className={`w-full text-left p-4 rounded-xl border transition-all flex items-start space-x-3.5 ${stateStyle}`}
            >
              <span className={`w-7 h-7 rounded-lg border flex items-center justify-center text-xs font-bold shrink-0 ${badgeStyle}`}>
                {optionLabels[idx]}
              </span>
              <span className="text-sm md:text-base leading-snug flex-1 pt-0.5">{opt}</span>
              {isAnswered && instantAnswer && (
                <span className="shrink-0 pt-0.5">
                  {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                  {isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-600" />}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Immediate Instant Answer Explanation Box */}
      {isAnswered && instantAnswer && (
        <div className="mt-6 pt-6 border-t border-slate-200 animate-fadeIn">
          <div className={`p-4 rounded-xl mb-4 border ${
            userSelected === question.correctAnswer
              ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950'
              : 'bg-rose-50/90 border-rose-300 text-rose-950'
          }`}>
            <div className="flex items-center space-x-2 font-bold text-sm mb-1">
              {userSelected === question.correctAnswer ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Correct! (+4 Marks Awarded)</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-rose-600" />
                  <span>Incorrect (-1 Mark Deducted)</span>
                </>
              )}
            </div>
            <p className="text-xs md:text-sm font-semibold">
              Correct Answer: Option {optionLabels[question.correctAnswer]} — {question.options[question.correctAnswer]}
            </p>
          </div>

          {/* High-Yield Pedagogical Explanation */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-1 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-brand-600" />
                Comprehensive Clinical Rationale
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed">
                {question.explanation}
              </p>
            </div>

            {question.keyLearningPoint && (
              <div className="bg-amber-50/80 border-l-4 border-amber-500 p-3 rounded-r-lg">
                <h5 className="text-xs font-bold text-amber-900">High-Yield NEET-PG Takeaway:</h5>
                <p className="text-xs text-amber-950 font-medium mt-0.5">{question.keyLearningPoint}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom Navigation Buttons */}
      <div className="mt-8 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <button
            onClick={onPrev}
            disabled={currentIndex === 0}
            className="flex items-center space-x-1 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>
          <button
            onClick={onClear}
            disabled={!isAnswered}
            className="flex items-center space-x-1 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 disabled:opacity-40"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        </div>

        <div className="flex items-center space-x-2">
          {onToggleReview && (
            <button
              onClick={onToggleReview}
              className={`px-3 py-2 rounded-xl text-xs font-bold border transition-colors ${
                isMarkedForReview
                  ? 'bg-purple-100 text-purple-700 border-purple-300'
                  : 'text-slate-600 border-slate-300 hover:bg-slate-50'
              }`}
            >
              {isMarkedForReview ? 'Marked for Review' : 'Mark for Review'}
            </button>
          )}
          <button
            onClick={onNext}
            disabled={currentIndex === totalQuestions - 1}
            className="flex items-center space-x-1 px-5 py-2 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm transition-all"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}