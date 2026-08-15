import React, { useState } from 'react';
import { PlusCircle, Download, Upload, Trash2, CheckCircle, AlertCircle } from 'lucide-react';
import { validateQuestionBank, validateQuestion } from '../utils/validator';

export default function AdminView({ questions, onUpdateQuestions }) {
  const [jsonText, setJsonText] = useState('');
  const [statusMsg, setStatusMsg] = useState(null);

  // New Question State
  const [newQ, setNewQ] = useState({
    id: `NPG-2026-CUSTOM-${Date.now().toString().slice(-4)}`,
    subject: 'General Medicine',
    system: 'Cardiovascular System',
    topic: '',
    subtopic: '',
    questionType: 'Clinical',
    clinicalScenario: '',
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    explanation: '',
    keyLearningPoint: '',
    difficulty: 'Moderate',
    probability: 'Very High Probability',
    sourceType: 'Original Expected'
  });

  const handleAddQuestion = (e) => {
    e.preventDefault();
    const validation = validateQuestion(newQ);
    if (!validation.valid) {
      setStatusMsg({ type: 'error', text: validation.error });
      return;
    }

    const updated = [newQ, ...questions];
    onUpdateQuestions(updated);
    setStatusMsg({ type: 'success', text: `Question ${newQ.id} added successfully!` });
    
    // Reset form
    setNewQ({
      id: `NPG-2026-CUSTOM-${Date.now().toString().slice(-4)}`,
      subject: 'General Medicine',
      system: 'Cardiovascular System',
      topic: '',
      subtopic: '',
      questionType: 'Clinical',
      clinicalScenario: '',
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      explanation: '',
      keyLearningPoint: '',
      difficulty: 'Moderate',
      probability: 'Very High Probability',
      sourceType: 'Original Expected'
    });
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(questions, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `neet_pg_2026_bank_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJSON = () => {
    try {
      const parsed = JSON.parse(jsonText);
      const validation = validateQuestionBank(parsed);
      if (!validation.valid) {
        setStatusMsg({ type: 'error', text: `Import Failed: ${validation.errors.join(', ')}` });
        return;
      }
      onUpdateQuestions(parsed);
      setStatusMsg({ type: 'success', text: `Successfully imported ${parsed.length} questions into local bank!` });
      setJsonText('');
    } catch (e) {
      setStatusMsg({ type: 'error', text: `Invalid JSON syntax: ${e.message}` });
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">Question Bank Manager (Offline Storage)</h2>
          <p className="text-xs text-slate-500">Current Local Bank Size: {questions.length} Items</p>
        </div>
        <button
          onClick={handleExportJSON}
          className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-brand-600 text-white hover:bg-brand-700 shadow-sm"
        >
          <Download className="w-4 h-4" />
          <span>Export Entire Bank (JSON)</span>
        </button>
      </div>

      {statusMsg && (
        <div className={`p-4 rounded-xl text-xs font-bold flex items-center space-x-2 ${
          statusMsg.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-300' : 'bg-rose-50 text-rose-800 border border-rose-300'
        }`}>
          {statusMsg.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{statusMsg.text}</span>
        </div>
      )}

      {/* Manual Question Creator Form */}
      <form onSubmit={handleAddQuestion} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-base font-extrabold text-slate-900">Add New NEET-PG Item</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Subject</label>
            <input
              type="text"
              required
              value={newQ.subject}
              onChange={(e) => setNewQ({ ...newQ, subject: e.target.value })}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Topic</label>
            <input
              type="text"
              required
              value={newQ.topic}
              onChange={(e) => setNewQ({ ...newQ, topic: e.target.value })}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Question Type</label>
            <select
              value={newQ.questionType}
              onChange={(e) => setNewQ({ ...newQ, questionType: e.target.value })}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300"
            >
              <option value="Clinical">Clinical Vignette</option>
              <option value="MCQ">Standard MCQ</option>
              <option value="Image">Image-Based</option>
              <option value="Video">Video-Based</option>
              <option value="ECG">ECG Interpretation</option>
              <option value="Pathology">Pathology</option>
              <option value="Integrated">Integrated Multi-Subject</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Clinical Vignette (Optional)</label>
          <textarea
            rows="2"
            value={newQ.clinicalScenario}
            onChange={(e) => setNewQ({ ...newQ, clinicalScenario: e.target.value })}
            className="w-full text-xs p-2.5 rounded-lg border border-slate-300"
            placeholder="A 45-year-old female presents with..."
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Question Stem</label>
          <input
            type="text"
            required
            value={newQ.question}
            onChange={(e) => setNewQ({ ...newQ, question: e.target.value })}
            className="w-full text-xs p-2.5 rounded-lg border border-slate-300"
            placeholder="What is the most likely diagnosis?"
          />
        </div>

        {/* 4 Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {newQ.options.map((opt, i) => (
            <div key={i}>
              <label className="text-xs font-bold text-slate-700 block mb-1">Option {String.fromCharCode(65 + i)}</label>
              <input
                type="text"
                required
                value={opt}
                onChange={(e) => {
                  const opts = [...newQ.options];
                  opts[i] = e.target.value;
                  setNewQ({ ...newQ, options: opts });
                }}
                className="w-full text-xs p-2 rounded-lg border border-slate-300"
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Correct Answer</label>
            <select
              value={newQ.correctAnswer}
              onChange={(e) => setNewQ({ ...newQ, correctAnswer: parseInt(e.target.value) })}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 font-bold text-emerald-700"
            >
              <option value={0}>Option A</option>
              <option value={1}>Option B</option>
              <option value={2}>Option C</option>
              <option value={3}>Option D</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Probability Category</label>
            <select
              value={newQ.probability}
              onChange={(e) => setNewQ({ ...newQ, probability: e.target.value })}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300"
            >
              <option value="Very High Probability">Very High Probability</option>
              <option value="High Probability">High Probability</option>
              <option value="Moderate Probability">Moderate Probability</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Explanation & Rationale</label>
          <textarea
            rows="3"
            required
            value={newQ.explanation}
            onChange={(e) => setNewQ({ ...newQ, explanation: e.target.value })}
            className="w-full text-xs p-2.5 rounded-lg border border-slate-300"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">High-Yield Takeaway</label>
          <input
            type="text"
            value={newQ.keyLearningPoint}
            onChange={(e) => setNewQ({ ...newQ, keyLearningPoint: e.target.value })}
            className="w-full text-xs p-2.5 rounded-lg border border-slate-300"
          />
        </div>

        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm flex items-center space-x-1.5"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Save Question to Bank</span>
        </button>
      </form>

      {/* JSON Import Section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <h3 className="text-base font-extrabold text-slate-900">Bulk Import Questions (JSON Array)</h3>
        <textarea
          rows="4"
          value={jsonText}
          onChange={(e) => setJsonText(e.target.value)}
          placeholder="Paste structured JSON array of questions here..."
          className="w-full text-xs font-mono p-3 rounded-lg border border-slate-300 bg-slate-50"
        />
        <button
          onClick={handleImportJSON}
          disabled={!jsonText.trim()}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-900 text-white disabled:opacity-40 flex items-center space-x-1.5"
        >
          <Upload className="w-4 h-4" />
          <span>Validate & Import JSON</span>
        </button>
      </div>
    </div>
  );
}