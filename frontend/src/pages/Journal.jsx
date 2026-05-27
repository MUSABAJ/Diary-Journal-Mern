import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useGetEntryQuery } from '../redux/api/entryApiSlice';
import Loader from '../components/Loader';

const MOODS = ['happy', 'sad', 'angry', 'anxious', 'calm', 'excited', 'neutral'];

const Journal = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: entry, isLoading: fetching } = useGetEntryQuery(id);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ title: '', content: '', mood: 'neutral', date: '' });

  // Populate form once the entry loads from the API/cache
  useEffect(() => {
    if (entry) {
      setForm({
        title:   entry.title,
        content: entry.content,
        mood:    entry.mood,
        date:    entry.date?.slice(0, 10),
      });
    }
  }, [entry]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateEntry({ id, ...form }).unwrap();
      navigate(`/entries/${id}`); // Go back to the entry view after saving
    } catch (err) {
      console.error(err);
    }
  };

  if (fetching) return <Loader />;

  return (
 <div className="h-screen mx-auto px-4 py-6">
  {/* Header */}
  <div className="flex items-center justify-between mb-5">
    <div className="flex items-center gap-3">
      <Link
        to={`/entries/${id}`}
        className="text-sm text-zinc-500 hover:text-zinc-800 transition"
      >
        ← Back
      </Link>

      <h1 className="text-lg font-semibold text-zinc-800">
        Journal Entry
      </h1>
    </div>

    <button
      type="button"
      onClick={() => setIsEditing(!isEditing)}
      className="px-3 py-1.5 text-xs rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 transition"
    >
      {isEditing ? "Done" : "Edit"}
    </button>
  </div>

  {/* Card */}
  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 space-y-5 shadow-sm">
    
    {/* Title */}
    <input
      name="title"
      placeholder="Entry title"
      value={form.title}
      onChange={handleChange}
      disabled={!isEditing}
      required
      className="
        w-full bg-transparent
        text-lg font-semibold text-zinc-800
        placeholder:text-zinc-400
        focus:outline-none
        disabled:cursor-default
      "
    />

    {/* Meta */}
    <div className="flex gap-3">
      <input
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
        disabled={!isEditing}
        className="
          flex-1 px-3 py-2 rounded-xl
          bg-zinc-50 text-sm text-zinc-700
          focus:outline-none focus:ring-2 focus:ring-zinc-200
          disabled:opacity-80
        "
      />

      <select
        name="mood"
        value={form.mood}
        onChange={handleChange}
        disabled={!isEditing}
        className="
          flex-1 px-3 py-2 rounded-xl
          bg-zinc-50 text-sm text-zinc-700
          focus:outline-none focus:ring-2 focus:ring-zinc-200
          disabled:opacity-80
        "
      >
        {MOODS.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
    </div>

    {/* Content */}
    <textarea
      name="content"
      value={form.content}
      onChange={handleChange}
      disabled={!isEditing}
      required
      className="
        w-full min-h-[400px]
        bg-transparent resize-none
        text-sm leading-7 text-zinc-700
        placeholder:text-zinc-400
        focus:outline-none
        disabled:cursor-default
      "
    />

    {/* Actions */}
    <div className="flex justify-end gap-2 pt-2">
      <Link
        to={`/entries/${id}`}
        className="px-4 py-2 text-xs text-zinc-500 hover:text-zinc-800 transition"
      >
        Cancel
      </Link>

      {isEditing && (
        <button
          onClick={handleSubmit}
          className="
            px-5 py-2 rounded-xl
            text-xs font-medium
            bg-zinc-900 text-white
            hover:bg-zinc-800
            transition
          "
        >
          Save Changes
        </button>
      )}
    </div>
  </div>
</div>
  );
};

export default Journal;