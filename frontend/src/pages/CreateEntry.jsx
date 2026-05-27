import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateEntryMutation } from '../redux/api/entryApiSlice';

export const CreateEntry = () => {
  const moods = {
    happy: '😄', sad: '😢',
    angry: '😠', anxious: '😰',
    calm: '😌', excited: '🤩',
    neutral: '😐',
  };

  const navigate = useNavigate();
  const [mood, setMood] = useState('neutral')
  const [form, setForm] = useState({
    title: '',
    content: '',
    mood: 'neutral',
    date: new Date().toISOString().slice(0, 10) //  default today
  })

  const [createEntry, { isLoading, isError, error }] = useCreateEntryMutation()

  const handleChange = (e) => setForm({
    ...form, [e.target.name]: e.target.value
  })
  const handleMoodChange = (e) => setMood(e.target.value)
  const handleSubmit = async (e) => {
    
    e.preventDefault();
    
    try {
      const newEntry = await createEntry(form).unwrap();
      console.error(newEntry);

      navigate(`/entries/${newEntry._id}`);
    } catch (error) {
     }

  }

  return (
    <div className="min-h-screen bg-[#f6f7fb] flex text-gray-800">

      <main className="flex-1 p-6 overflow-y-auto">

        {/* HEADER */}
        <section className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-semibold">
              New Entry
            </h2>

            <p className="text-xs text-gray-400 mt-1">
  {new Date().toDateString()}
</p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* <button className="px-4 py-2 text-xs rounded-md border border-gray-200 bg-white hover:bg-gray-50 transition">
              Save Draft
            </button> */}

            <button className="px-4 py-2 text-xs rounded-md bg-[#1e1b3a] text-white hover:opacity-90 transition"
             onClick={handleSubmit}
               disabled={isLoading}
            >
              {isLoading ? <span className="loading loading-spinner" /> : 'Save Entry'}

            </button>
          </div>
        </section>

        {/* GRID */}
        <div className="grid grid-cols-1 2xl:grid-cols-4 gap-6">

          {/* MAIN EDITOR */}
          <section className="2xl:col-span-3 bg-white rounded-xl p-5 border border-gray-100">

            {/* TITLE */}
            <div className="mb-5">
              <label className="text-xs text-gray-400 font-medium">
                Title
              </label>

              <input
                type="text"
                placeholder="Today felt different..."
                className="w-full mt-2 px-4 py-2 text-sm rounded-lg bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                value={form.title}
                name='title'
                onChange={handleChange}
                required
              />
            </div>

            {/* MOOD */}
            <div className="mb-5">
              <label className="text-xs text-gray-400 font-medium">
                How are you felling?
              </label>

              <div className="flex gap-3 mt-3 flex-wrap">
                {Object.entries(moods).map(([key, value], index) => (
                  <button
                    key={key} // Use the unique key from the object
                    className={`w-10 h-10 rounded-lg text-lg transition
    
                      ${key === mood
                        ? "bg-gray-900 text-white"
                        : "bg-gray-100e hover:bg-gray-200"
                      }`}
                    value={key}
                    onClick={handleMoodChange}
                  >
                    {value} {/* Render the value inside the button */}
                  </button>
                  
                ))}
                    <input type=" " 
                    disabled 
                className="   px-4 p=y-2 text-sm rounded-lg bg-gray-50  focus:outline-none  focus:ring-gray-200"
                    name="mood" value={mood} onChange={handleChange} />


              </div>
            </div>

            {/* TEXT AREA */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs text-gray-400 uppercase">
                  Content
                </label>

                <p className="text-[11px] text-gray-400">
                  0 words · 0 min read
                </p>
              </div>

              <textarea
                rows={12}
                placeholder="Start writing..."
                className="w-full px-4 py-4 text-sm rounded-xl bg-gray-50 border border-gray-100 resize-none leading-relaxed focus:outline-none focus:ring-2 focus:ring-gray-200"
                value={form.content}
                name='content'
                onChange={handleChange}
                required
              />
            </div>

            {/* TOOLBAR */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mt-6 pt-5 border-t border-gray-100">

              <div className="flex gap-2 flex-wrap">
                {["Add Image", "Add Tag", "Markdown"].map((btn) => (
                  <button
                    key={btn}
                    className="px-3 py-1.5 text-xs rounded-md bg-gray-100 hover:bg-gray-200 transition"
                  >
                    {btn}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Auto-saving
              </div>
            </div>
          </section>

          {/* RIGHT SIDEBAR */}
          <aside className="space-y-5">

            {/* PROMPT */}
            <div className="bg-[#1e1b3a] text-white rounded-xl p-5">
              <h3 className="text-sm font-semibold mb-2">
                Writing Prompt
              </h3>

              <p className="text-xs text-gray-300 mb-4 leading-relaxed">
                What’s something small that made you smile recently?
              </p>

              <button className="w-full text-xs px-3 py-2 bg-white text-[#1e1b3a] rounded-md hover:bg-gray-200 transition">
                New Prompt
              </button>
            </div>

            {/* STATS */}
            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <h3 className="text-sm font-semibold mb-4">
                Stats
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">Streak</span>
                  <span className="font-medium">7</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">This week</span>
                  <span className="font-medium">4</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Mood</span>
                  <span className="font-medium">😊</span>
                </div>
              </div>
            </div>

            {/* CALENDAR */}
            <div className="bg-white rounded-xl p-5 border border-gray-100">

              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold">May 2026</h3>
                <button className="text-xs text-gray-400 hover:text-gray-600">
                  View
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 text-xs text-center text-gray-400 mb-2">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
                  <div key={d}>{d}</div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1 text-xs">
                {Array.from({ length: 31 }).map((_, i) => (
                  <div
                    key={i}
                    className={`aspect-square flex items-center justify-center rounded-md cursor-pointer
                  ${i === 23
                        ? "bg-gray-900 text-white"
                        : "hover:bg-gray-100 text-gray-600"
                      }`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>

          </aside>
        </div>
      </main>
    </div>
  )
}
export default CreateEntry;