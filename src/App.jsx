import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import QuestionCard from './components/QuestionCard';
import MockTestView from './components/MockTestView';
import TrendAnalysisView from './components/TrendAnalysisView';
import AdminView from './components/AdminView';
import BookmarksView from './components/BookmarksView';
import { masterQuestionBank } from './data/questionsData';
import { 
  getSavedQuestions, saveCustomQuestions, 
  getBookmarks, toggleBookmark, 
  getIncorrectQuestions, removeIncorrectQuestion,
  getSettings, saveSettings, addIncorrectQuestion
} from './utils/storage';
import { Filter, Play, Award, Sparkles, Layers } from 'lucide-react';

export default function App() {
  const [questions, setQuestions] = useState(() => getSavedQuestions(masterQuestionBank));
  const [mode, setMode] = useState('practice'); // 'practice', 'mock', 'subject', 'expected', 'image', 'video', 'incorrect', 'bookmarks', 'trends', 'admin'
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userSelected, setUserSelected] = useState(null);
  const [instantAnswer, setInstantAnswer] = useState(() => getSettings().instantAnswer ?? true);
  const [bookmarks, setBookmarks] = useState(getBookmarks());
  const [incorrectList, setIncorrectList] = useState(getIncorrectQuestions());
  
  // Filters
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  useEffect(() => {
    saveSettings({ instantAnswer });
  }, [instantAnswer]);

  const handleUpdateQuestions = (newBank) => {
    setQuestions(newBank);
    saveCustomQuestions(newBank);
  };

  const handleToggleBookmark = (id) => {
    const updated = toggleBookmark(id);
    setBookmarks(updated);
  };

  const handleRemoveIncorrect = (id) => {
    const updated = removeIncorrectQuestion(id);
    setIncorrectList(updated);
  };

  // Filter questions based on current view & subject
  const getFilteredQuestions = () => {
    let list = [...questions];
    if (mode === 'expected') {
      list = list.filter(q => q.probability === 'Very High Probability');
    } else if (mode === 'image') {
      list = list.filter(q => q.imageType || q.image || q.questionType === 'Image' || q.questionType === 'Radiology' || q.questionType === 'Pathology' || q.questionType === 'ECG');
    } else if (mode === 'video') {
      list = list.filter(q => q.questionType === 'Video' || q.video);
    } else if (mode === 'subject' && selectedSubject !== 'All') {
      list = list.filter(q => q.subject === selectedSubject);
    }

    if (selectedDifficulty !== 'All') {
      list = list.filter(q => q.difficulty === selectedDifficulty);
    }

    return list.length > 0 ? list : questions;
  };

  const activeQuestionList = getFilteredQuestions();
  const currentQ = activeQuestionList[currentIdx] || activeQuestionList[0];

  const handleOptionSelect = (idx) => {
    setUserSelected(idx);
    if (idx !== currentQ.correctAnswer) {
      addIncorrectQuestion(currentQ.id, idx, currentQ.correctAnswer);
      setIncorrectList(getIncorrectQuestions());
    }
  };

  const allSubjects = ['All', ...new Set(questions.map(q => q.subject))];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar
        currentMode={mode}
        setMode={(m) => {
          setMode(m);
          setCurrentIdx(0);
          setUserSelected(null);
        }}
        counts={{
          bookmarks: bookmarks.length,
          incorrect: incorrectList.length
        }}
        instantAnswer={instantAnswer}
        setInstantAnswer={setInstantAnswer}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Full Mock Test Mode (180 Questions format) */}
        {mode === 'mock' && (
          <MockTestView
            questions={questions}
            isBookmarked={(id) => bookmarks.includes(id)}
            onToggleBookmark={handleToggleBookmark}
            instantAnswer={instantAnswer}
          />
        )}

        {/* PYQ Trend Analysis */}
        {mode === 'trends' && <TrendAnalysisView />}

        {/* Question Bank Manager / Admin */}
        {mode === 'admin' && (
          <AdminView questions={questions} onUpdateQuestions={handleUpdateQuestions} />
        )}

        {/* Bookmarks Screen */}
        {mode === 'bookmarks' && (
          <BookmarksView
            bookmarkedIds={bookmarks}
            allQuestions={questions}
            onToggleBookmark={handleToggleBookmark}
            instantAnswer={instantAnswer}
          />
        )}

        {/* Incorrect Questions Vault */}
        {mode === 'incorrect' && (
          <BookmarksView
            bookmarkedIds={incorrectList.map(i => i.id)}
            allQuestions={questions}
            onToggleBookmark={handleToggleBookmark}
            instantAnswer={instantAnswer}
            isIncorrectVault={true}
            onRemoveIncorrect={handleRemoveIncorrect}
          />
        )}

        {/* Standard Practice & Filtered Modes */}
        {['practice', 'subject', 'expected', 'image', 'video'].includes(mode) && (
          <div className="space-y-6">
            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-brand-600" />
                <span className="text-xs font-bold text-slate-700">Filter Practice Bank:</span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {mode === 'subject' && (
                  <select
                    value={selectedSubject}
                    onChange={(e) => { setSelectedSubject(e.target.value); setCurrentIdx(0); setUserSelected(null); }}
                    className="text-xs font-semibold p-2 rounded-lg border border-slate-300 bg-slate-50"
                  >
                    {allSubjects.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                )}

                <select
                  value={selectedDifficulty}
                  onChange={(e) => { setSelectedDifficulty(e.target.value); setCurrentIdx(0); setUserSelected(null); }}
                  className="text-xs font-semibold p-2 rounded-lg border border-slate-300 bg-slate-50"
                >
                  <option value="All">All Difficulties</option>
                  <option value="Easy">Easy</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Difficult">Difficult</option>
                </select>

                <div className="text-xs text-slate-500 font-medium pl-2">
                  Showing <span className="font-bold text-slate-800">{activeQuestionList.length}</span> questions
                </div>
              </div>
            </div>

            {/* Main Interactive Question Card */}
            <QuestionCard
              question={currentQ}
              currentIndex={currentIdx}
              totalQuestions={activeQuestionList.length}
              userSelected={userSelected}
              onSelectOption={handleOptionSelect}
              instantAnswer={instantAnswer}
              isBookmarked={bookmarks.includes(currentQ?.id)}
              onToggleBookmark={handleToggleBookmark}
              onNext={() => {
                setCurrentIdx(prev => Math.min(prev + 1, activeQuestionList.length - 1));
                setUserSelected(null);
              }}
              onPrev={() => {
                setCurrentIdx(prev => Math.max(prev - 1, 0));
                setUserSelected(null);
              }}
              onClear={() => setUserSelected(null)}
            />
          </div>
        )}
      </main>

      {/* Footer Legal & Medical Disclaimer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-1">
          <p className="font-medium text-slate-700">
            NEET-PG 2026 High-Yield Examination Preparation & Analysis Engine
          </p>
          <p>
            Educational preparation tool only. Not an official application of NBEMS / NMC. Formatted for the 180-Question / 720-Mark pattern.
          </p>
        </div>
      </footer>
    </div>
  );
}