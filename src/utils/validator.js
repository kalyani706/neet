export function validateQuestion(q) {
    if (!q) return { valid: false, error: 'Question is empty' };
    if (!q.id) return { valid: false, error: 'Missing ID' };
    if (!q.subject || !q.topic) return { valid: false, error: 'Missing Subject or Topic' };
    if (!q.question && !q.clinicalScenario) return { valid: false, error: 'Missing Question Text' };
    if (!Array.isArray(q.options) || q.options.length !== 4) {
      return { valid: false, error: 'Question must have exactly 4 options' };
    }
    if (typeof q.correctAnswer !== 'number' || q.correctAnswer < 0 || q.correctAnswer > 3) {
      return { valid: false, error: 'Valid zero-indexed correctAnswer (0 to 3) required' };
    }
    if (!q.explanation) return { valid: false, error: 'Missing Explanation' };
    return { valid: true };
  }
  
  export function validateQuestionBank(bank) {
    if (!Array.isArray(bank)) return { valid: false, count: 0, errors: ['Dataset is not an array'] };
    const errors = [];
    bank.forEach((q, idx) => {
      const res = validateQuestion(q);
      if (!res.valid) {
        errors.push(`Item #${idx + 1} (ID: ${q?.id || 'N/A'}): ${res.error}`);
      }
    });
    return {
      valid: errors.length === 0,
      count: bank.length,
      errors
    };
  }