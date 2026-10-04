import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createExam } from '../services/examService';

const CreateExamPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: 60,
    totalMarks: 100,
    questionCount: 0
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const value = e.target.type === 'number' ? parseInt(e.target.value) : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const newExam = await createExam(formData);
      navigate(`/admin/exams/${newExam.id}/questions`);
    } catch (err) {
      alert('Failed to create exam');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4">Create New Exam</h2>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Exam Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} className="form-control" required />
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} className="form-control" rows="4" required></textarea>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Duration (minutes)</label>
              <input type="number" name="duration" value={formData.duration} onChange={handleChange} className="form-control" min="1" required />
            </div>
            <div className="form-group">
              <label className="form-label">Total Marks</label>
              <input type="number" name="totalMarks" value={formData.totalMarks} onChange={handleChange} className="form-control" min="1" required />
            </div>
          </div>
          <div className="mt-4 d-flex justify-content-end gap-3">
            <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Creating...' : 'Create Exam & Add Questions'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateExamPage;
