import { useState } from 'react';
import { useUpdateEntryMutation } from '../../redux/api/entryApiSlice';
import ModalLayout from '../ModalLayout';

const MOODS = ['happy', 'sad', 'angry', 'anxious', 'calm', 'excited', 'neutral'];

const EditEntry = ({ entry, modalId }) => {
  const [form, setForm] = useState({
    title: entry.title,
    content: entry.content,
    mood: entry.mood,
    date: entry.date?.slice(0, 10), // ISO date to YYYY-MM-DD for input[type=date]
  });
  const [updateEntry, { isLoading }] = useUpdateEntryMutation();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateEntry({ id: entry._id, ...form }).unwrap();
      document.getElementById(modalId).close();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ModalLayout id={modalId} title="Edit Entry">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input name="title" placeholder="Title" className="input input-bordered" value={form.title} onChange={handleChange} required />
        <input name="date" type="date" className="input input-bordered" value={form.date} onChange={handleChange} required />
        <select name="mood" className="select select-bordered" value={form.mood} onChange={handleChange}>
          {MOODS.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
        <textarea name="content" className="textarea textarea-bordered h-36" value={form.content} onChange={handleChange} required />
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? <span className="loading loading-spinner" /> : 'Update Entry'}
        </button>
      </form>
    </ModalLayout>
  );
};
export default EditEntry;