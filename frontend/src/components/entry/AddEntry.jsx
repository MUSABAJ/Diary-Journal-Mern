import { useState } from 'react';
import { useCreateEntryMutation } from '../../redux/api/entryApiSlice';
import ModalLayout from '../ModalLayout';

const MOODS = ['happy', 'sad', 'angry', 'anxious', 'calm', 'excited', 'neutral'];

const AddEntry = () => {
  const [form, setForm] = useState({ title: '', content: '', mood: 'neutral', date: '' });
  const [createEntry, { isLoading }] = useCreateEntryMutation();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEntry(form).unwrap();
      // invalidatesTags: ['Entry'] in the slice triggers refetch of getEntries automatically
      document.getElementById('add-entry-modal').close();
      setForm({ title: '', content: '', mood: 'neutral', date: '' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ModalLayout id="add-entry-modal" title="New Entry">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input name="title" placeholder="Title" className="input input-bordered" value={form.title} onChange={handleChange} required />
        <input name="date" type="date" className="input input-bordered" value={form.date} onChange={handleChange} required />
        <select name="mood" className="select select-bordered" value={form.mood} onChange={handleChange}>
          {MOODS.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
        <textarea name="content" placeholder="Write your entry..." className="textarea textarea-bordered h-36" value={form.content} onChange={handleChange} required />
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? <span className="loading loading-spinner" /> : 'Save Entry'}
        </button>
      </form>
    </ModalLayout>
  );
};
export default AddEntry;