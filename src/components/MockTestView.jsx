import React, { useState } from 'react';
import QuestionCard from './QuestionCard';
import DashboardView from './DashboardView';
import { saveTestHistory, addIncorrectQuestion } from '../utils/storage';
import { Award, CheckSquare, Layers, Send } from 'lucide-react';

export default function MockTestView({ questions, isBookmarked, onToggleBookmark, instantAnswer }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [reviewedQuestions, setReviewedQuestions] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [testResults, setTestResults] = useState(null);

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentIndex];

  const handleSelectOption = (optIndex) => {
    const updated = { ...userAnswers, [currentQuestion.id]: optIndex };
    setUserAnswers(updated);

    if (optIndex !== currentQuestion.correctAnswer) {
      addIncorrectQuestion(currentQuestion.id, optIndex, currentQuestion.correctAnswer);
    }
  };

  const handleClearResponse = () => {
    const updated = { ...userAnswers };
    delete updated[currentQuestion.id];
    setUserAnswers(updated);
  };

  const handleToggleReview = () => {
    setReviewedQuestions(prev => ({
      ...prev,
      [currentQuestion.id]: !prev[currentQuestion.id]
    }));
  };

  const handleSubmitTest = () => {
    if (!window.confirm('Are you sure you want to submit your mock examination and generate the performance analytics?')) {
      return;
    }

    let correct = 0;
    let incorrect = 0;
    const subjectBreakdown = {};
    const missedTopics = [];

    questions.forEach((q) => {
      if (!subjectBreakdown[q.subject]) {
        subjectBreakdown[q.subject] = { attempted: 0, correct: 0, incorrect: 0, total: 0 };
      }
      subjectBreakdown[q.subject].total += 1;

      const answered = userAnswers[q.id];
      if (answered !== undefined && answered !== null) {
        subjectBreakdown[q.subject].attempted += 1;
        if (answered === q.correctAnswer) {
          correct += 1;
          subjectBreakdown[q.subject].correct += 1;
        } else {
          incorrect += 1;
          subjectBreakdown[q.subject].incorrect += 1;
          missedTopics.push({ subject: q.subject, topic: q.topic, keyPoint: q.keyLearningPoint });
        }
      }
    });

    const unattempted = totalQuestions - (correct + incorrect);
    const score = (correct * 4) - (incorrect * 1);
    const maxScore = totalQuestions * 4;
    const accuracy = (correct + incorrect) > 0 ? Math.round((correct / (correct + incorrect)) * 100) : 0;

    const resultPayload = {
      timestamp: new Date().toISOString(),
      totalQuestions,
      correct,
      incorrect,
      unattempted,
      score,
      maxScore,
      accuracy,
      subjectBreakdown,
      missedTopics
    };

    saveTestHistory(resultPayload);
    setTestResults(resultPayload);
    setIsSubmitted(true);
  };

  if (isSubmitted && testResults) {
    return (
      <DashboardView
        results={testResults}
        questions={questions}
        onRetry={() => {
          setUserAnswers({});
          setReviewedQuestions({});
          setIsSubmitted(false);
          setCurrentIndex(0);
        }}
      />
    );
  }

  const answeredCount = Object.keys(userAnswers).length;
  const reviewCount = Object.values(reviewedQuestions).filter(Boolean).length;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Mock Header Info Banner */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-brand-600" />
            <h2 className="text-base font-extrabold text-slate-900">NEET-PG 2026 Mock Test (Self-Paced)</h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            +4 / -1 Marking • Instant Feedback: {instantAnswer ? 'ON' : 'OFF'}
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="text-xs font-semibold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
            Attempted: <span className="text-brand-600 font-bold">{answeredCount}</span> / {totalQuestions}
          </div>
          <button
            onClick={handleSubmitTest}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-extrabold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit Exam</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Center Stage Question Vignette */}
        <div className="lg:col-span-3">
          <QuestionCard
            question={currentQuestion}
            currentIndex={currentIndex}
            totalQuestions={totalQuestions}
            userSelected={userAnswers[currentQuestion?.id]}
            onSelectOption={handleSelectOption}
            instantAnswer={instantAnswer}
            isBookmarked={isBookmarked(currentQuestion?.id)}
            onToggleBookmark={onToggleBookmark}
            onNext={() => setCurrentIndex(prev => Math.min(prev + 1, totalQuestions - 1))}
            onPrev={() => setCurrentIndex(prev => Math.max(prev - 1, 0))}
            onClear={handleClearResponse}
            isMarkedForReview={reviewedQuestions[currentQuestion?.id]}
            onToggleReview={handleToggleReview}
          />
        </div>

        {/* Right Palette Quick-Navigation Matrix */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm h-fit space-y-4">
          <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center justify-between">
            <span>Question Palette</span>
            <span className="text-slate-400 font-medium text-[11px]">{totalQuestions} Items</span>
          </h4>

          <div className="grid grid-cols-5 gap-2 max-h-[380px] overflow-y-auto pr-1">
            {questions.map((q, idx) => {
              const isAnswered = userAnswers[q.id] !== undefined;
              const isReview = reviewedQuestions[q.id];
              const isCurrent = idx === currentIndex;

              let btnClass = "bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200";
              if (isReview) btnClass = "bg-purple-600 text-white border-purple-600";
              else if (isAnswered) btnClass = "bg-emerald-600 text-white border-emerald-600";

              if (isCurrent) {
                btnClass += " ring-2 ring-brand-500 ring-offset-1 font-black";
              }

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-9 rounded-lg text-xs font-bold border transition-all ${btnClass}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 text-[11px] space-y-1.5 text-slate-600 font-medium">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded bg-emerald-600 inline-block" />
              <span>Answered ({answeredCount})</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded bg-purple-600 inline-block" />
              <span>Marked for Review ({reviewCount})</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded bg-slate-200 inline-block" />
              <span>Unattempted ({totalQuestions - answeredCount})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}