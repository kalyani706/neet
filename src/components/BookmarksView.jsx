import React from 'react';
import { Bookmark, AlertTriangle, Trash2, ArrowRight } from 'lucide-react';
import QuestionCard from './QuestionCard';

export default function BookmarksView({ 
  bookmarkedIds, 
  allQuestions, 
  onToggleBookmark, 
  instantAnswer,
  isIncorrectVault = false,
  onRemoveIncorrect
}) {
  const [selectedIdx, setSelectedIdx] = React.useState(0);
  const targetQuestions = allQuestions.filter(q => bookmarkedIds.includes(q.id));

  if (targetQuestions.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
        <div className="p-4 bg-slate-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-slate-400">
          {isIncorrectVault ? <AlertTriangle className="w-8 h-8" /> : <Bookmark className="w-8 h-8" />}
        </div>
        <h3 className="text-base font-bold text-slate-900 mb-1">
          {isIncorrectVault ? 'No Incorrect Questions Recorded!' : 'No Bookmarked Questions Yet'}
        </h3>
        <p className="text-xs text-slate-500">
          {isIncorrectVault 
            ? 'Any question answered incorrectly during practice or mock tests will automatically be logged here for high-yield revision.' 
            : 'Click the bookmark icon on any question to save it for quick review.'}
        </p>
      </div>
    );
  }

  const currentQ = targetQuestions[selectedIdx];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-base font-extrabold text-slate-900">
            {isIncorrectVault ? 'My Incorrect Questions Vault' : 'Bookmarked Questions'}
          </h2>
          <p className="text-xs text-slate-500">Total Saved Items: {targetQuestions.length}</p>
        </div>

        {isIncorrectVault && (
          <button
            onClick={() => onRemoveIncorrect(currentQ?.id)}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 hover:bg-rose-100"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Mark Mastered & Remove</span>
          </button>
        )}
      </div>

      <QuestionCard
        question={currentQ}
        currentIndex={selectedIdx}
        totalQuestions={targetQuestions.length}
        userSelected={null}
        onSelectOption={() => {}}
        instantAnswer={true}
        isBookmarked={!isIncorrectVault}
        onToggleBookmark={onToggleBookmark}
        onNext={() => setSelectedIdx(prev => Math.min(prev + 1, targetQuestions.length - 1))}
        onPrev={() => setSelectedIdx(prev => Math.max(prev - 1, 0))}
        onClear={() => {}}
      />
    </div>
  );
}