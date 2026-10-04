import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getQuestionsByExamId, addQuestion, getExamById } from '../services/examService';
import { Plus, Trash2, Edit, ArrowLeft } from 'lucide-react';

const ManageQuestionsPage = () => {
  const { examId } = useParams();
  const [exam, setExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState({
    questionText: '', optionA: '', optionB: '', optionC: '', optionD: '', correctAnswer: 'A', marks: 1
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [examData, qData] = await Promise.all([
          getExamById(examId),
          getQuestionsByExamId(examId)
        ]);
        setExam(examData);
        setQuestions(qData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [examId]);

  const handleChange = (e) => {
    const val = e.target.name === 'marks' ? parseInt(e.target.value) : e.target.value;
    setFormData({ ...formData, [e.target.name]: val });
  };

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    try {
      const newQ = await addQuestion(examId, formData);
      setQuestions([...questions, newQ]);
      setShowForm(false);
      setFormData({ questionText: '', optionA: '', optionB: '', optionC: '', optionD: '', correctAnswer: 'A', marks: 1 });
    } catch (err) {
      alert('Failed to add question');
    }
  };

  if (loading) return <div className="container">Loading questions...</div>;

  return (
    <div className="container">
      <Link to="/admin/exams" className="d-flex align-items-center gap-1 mb-4 text-light">
        <ArrowLeft size={16} /> Back to Exams
      </Link>
      
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Manage Questions</h2>
          <p className="text-light">Exam: {exam?.title}</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn btn-primary d-flex align-items-center gap-2">
          {showForm ? 'Cancel' : <><Plus size={18} /> Add Question</>}
        </button>
      </div>

      {showForm && (
        <div className="card mb-4" style={{ border: '2px solid var(--primary-color)' }}>
          <h4 className="mb-3">New Question</h4>
          <form onSubmit={handleAddQuestion}>
            <div className="form-group">
              <label className="form-label">Question Text</label>
              <textarea name="questionText" value={formData.questionText} onChange={handleChange} className="form-control" rows="3" required></textarea>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Option A</label>
                <input type="text" name="optionA" value={formData.optionA} onChange={handleChange} className="form-control" required />
              </div>
              <div className="form-group">
                <label className="form-label">Option B</label>
                <input type="text" name="optionB" value={formData.optionB} onChange={handleChange} className="form-control" required />
              </div>
              <div className="form-group">
                <label className="form-label">Option C</label>
                <input type="text" name="optionC" value={formData.optionC} onChange={handleChange} className="form-control" required />
              </div>
              <div className="form-group">
                <label className="form-label">Option D</label>
                <input type="text" name="optionD" value={formData.optionD} onChange={handleChange} className="form-control" required />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Correct Answer</label>
                <select name="correctAnswer" value={formData.correctAnswer} onChange={handleChange} className="form-control" required>
                  <option value="A">Option A</option>
                  <option value="B">Option B</option>
                  <option value="C">Option C</option>
                  <option value="D">Option D</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Marks</label>
                <input type="number" name="marks" value={formData.marks} onChange={handleChange} className="form-control" min="1" required />
              </div>
            </div>
            <div className="d-flex justify-content-end mt-2">
              <button type="submit" className="btn btn-primary">Save Question</button>
            </div>
          </form>
        </div>
      )}

      <div className="questions-list d-flex flex-column gap-3">
        {questions.map((q, idx) => (
          <div key={q.id} className="card">
            <div className="d-flex justify-content-between mb-3">
              <div style={{ fontWeight: '600' }}>Q{idx + 1}. {q.questionText}</div>
              <div className="d-flex gap-2">
                <span className="badge bg-light" style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '0.875rem' }}>{q.marks} Marks</span>
                <button className="btn btn-secondary btn-sm" title="Edit"><Edit size={14} /></button>
                <button className="btn btn-danger btn-sm" title="Delete"><Trash2 size={14} /></button>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.875rem' }}>
              <div style={{ padding: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '4px', backgroundColor: q.correctAnswer === 'A' ? 'rgba(16, 185, 129, 0.1)' : 'transparent', borderColor: q.correctAnswer === 'A' ? 'var(--success-color)' : 'var(--border-color)' }}>A) {q.optionA}</div>
              <div style={{ padding: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '4px', backgroundColor: q.correctAnswer === 'B' ? 'rgba(16, 185, 129, 0.1)' : 'transparent', borderColor: q.correctAnswer === 'B' ? 'var(--success-color)' : 'var(--border-color)' }}>B) {q.optionB}</div>
              <div style={{ padding: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '4px', backgroundColor: q.correctAnswer === 'C' ? 'rgba(16, 185, 129, 0.1)' : 'transparent', borderColor: q.correctAnswer === 'C' ? 'var(--success-color)' : 'var(--border-color)' }}>C) {q.optionC}</div>
              <div style={{ padding: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '4px', backgroundColor: q.correctAnswer === 'D' ? 'rgba(16, 185, 129, 0.1)' : 'transparent', borderColor: q.correctAnswer === 'D' ? 'var(--success-color)' : 'var(--border-color)' }}>D) {q.optionD}</div>
            </div>
          </div>
        ))}
        {questions.length === 0 && <div className="card text-center text-light py-5">No questions added yet.</div>}
      </div>
    </div>
  );
};

export default ManageQuestionsPage;
