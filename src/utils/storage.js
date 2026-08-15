const STORAGE_KEYS = {
    QUESTIONS: 'neetpg_2026_custom_questions',
    BOOKMARKS: 'neetpg_2026_bookmarks',
    INCORRECT: 'neetpg_2026_incorrect',
    HISTORY: 'neetpg_2026_test_history',
    SETTINGS: 'neetpg_2026_settings'
  };
  
  export const getSavedQuestions = (defaultBank) => {
    try {
      const local = localStorage.getItem(STORAGE_KEYS.QUESTIONS);
      if (local) {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Failed to load custom questions from local storage:', e);
    }
    return defaultBank;
  };
  
  export const saveCustomQuestions = (questions) => {
    localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(questions));
  };
  
  export const getBookmarks = () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKMARKS) || '[]');
    } catch {
      return [];
    }
  };
  
  export const toggleBookmark = (id) => {
    const current = getBookmarks();
    const exists = current.includes(id);
    const updated = exists ? current.filter((x) => x !== id) : [...current, id];
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(updated));
    return updated;
  };
  
  export const getIncorrectQuestions = () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.INCORRECT) || '[]');
    } catch {
      return [];
    }
  };
  
  export const addIncorrectQuestion = (qId, selectedOption, correctOption) => {
    const current = getIncorrectQuestions();
    const existingIdx = current.findIndex(item => item.id === qId);
    const entry = {
      id: qId,
      selectedOption,
      correctOption,
      timestamp: new Date().toISOString()
    };
    if (existingIdx >= 0) {
      current[existingIdx] = entry;
    } else {
      current.push(entry);
    }
    localStorage.setItem(STORAGE_KEYS.INCORRECT, JSON.stringify(current));
  };
  
  export const removeIncorrectQuestion = (qId) => {
    const current = getIncorrectQuestions().filter(item => item.id !== qId);
    localStorage.setItem(STORAGE_KEYS.INCORRECT, JSON.stringify(current));
    return current;
  };
  
  export const getSettings = () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.SETTINGS) || '{"instantAnswer": true}');
    } catch {
      return { instantAnswer: true };
    }
  };
  
  export const saveSettings = (settings) => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  };
  
  export const getTestHistory = () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.HISTORY) || '[]');
    } catch {
      return [];
    }
  };
  
  export const saveTestHistory = (session) => {
    const current = getTestHistory();
    current.unshift(session);
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(current.slice(0, 50)));
  };