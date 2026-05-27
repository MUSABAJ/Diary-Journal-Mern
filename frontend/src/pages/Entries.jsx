import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useGetEntriesQuery, useSearchEntriesQuery } from '../redux/api/entryApiSlice'; 
import Loader from '../components/Loader';

const Entries = () => {
  const [searchText, setSearchText] = useState('');

  // When searchText is empty, skip the search query and use getEntries
  const { data: allEntries, isLoading: loadingAll } = useGetEntriesQuery(undefined, {
    skip: !!searchText, // skip this query when searchText has a value
  });
  const { data: searchResults, isLoading: loadingSearch } = useSearchEntriesQuery(searchText, {
    skip: !searchText, // skip this query when searchText is empty
  });

  const entries = searchText ? searchResults : allEntries;
  const isLoading = loadingAll || loadingSearch;
 

  return ( 

 <main className="flex-1 h-screen bg-[#f6f7fb] flex flex-col overflow-hidden">

  {/* HEADER */}
  <div className="px-6 pt-6 pb-4 shrink-0">

    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

      <div>
        <h2 className="text-xl font-semibold text-gray-900">
          All entries
        </h2>

        <p className="text-xs text-gray-400 mt-1">
          Capture thoughts and track your writing history
        </p>
      </div>

      <div className="flex items-center gap-2 flex-wrap">

        {/* SEARCH */}
        <div className="bg-white border border-gray-100 rounded-lg px-3 py-2 w-[220px]">
          <input
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full bg-transparent outline-none text-xs"
          />
        </div>

        {/* FILTER */}
        <select className="bg-white border border-gray-100 rounded-lg px-3 py-2 text-xs outline-none">
          <option>All moods</option>
          <option>Happy</option>
          <option>Calm</option>
          <option>Sad</option>
        </select>

        {/* NEW */}
        <button className="bg-gray-900 text-white px-4 py-2 text-xs rounded-lg hover:opacity-90 transition">
          <Link to="/entries/create">+ New Entry</Link>
        </button>

      </div>

    </div>
  </div>

  {/* TABS */}
  <div className="px-6 pb-3 shrink-0">
    <div className="flex items-center gap-2">

      <button className="bg-gray-900 text-white px-3 py-1.5 text-xs rounded-md">
        All
      </button>

      <button className="bg-white border border-gray-100 text-gray-600 px-3 py-1.5 text-xs rounded-md">
        Week
      </button>

      <button className="bg-white border border-gray-100 text-gray-600 px-3 py-1.5 text-xs rounded-md">
        Month
      </button>

      <button className="bg-white border border-gray-100 text-gray-600 px-3 py-1.5 text-xs rounded-md">
        Favorites
      </button>

    </div>
  </div>

  {/* LIST */}
  <div className="flex-1 overflow-y-auto px-6 pb-6">

    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">

      {entries?.map((entry, index) => (
        <div
          key={index}
          className="flex items-center justify-between px-4 py-4 border-b last:border-none border-gray-100 hover:bg-gray-50 transition"
        >

          {/* DATE */}
          <div className="w-12 text-center">
            <p className="text-lg font-semibold text-gray-900 leading-none">
              {new Date(entry.date).getDate()}
            </p>
            <p className="text-[10px] text-gray-400 uppercase mt-1">
              May
            </p>
          </div>

          {/* CONTENT */}
          <div className="flex-1 min-w-0 px-4">

            <div className="flex items-center gap-2">
              <h3 className="text-sm font-medium text-gray-900 truncate">
                {entry.title}
              </h3>

              <span className="text-xs">😊</span>
            </div>

            <p className="text-xs text-gray-400 truncate mt-1">
              {entry.content.slice(0, 20)}
            </p>

          </div>

          {/* TIME */}
          <div className="text-[11px] px-12 text-gray-400 whitespace-nowrap">
            <div className="text-[11px] text-gray-400 whitespace-nowrap">
              {(() => {
                const date = new Date(entry.date);
                return date.toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true
                });
                  })()}
                </div>
          </div>

          {/* MENU */}
          <Link to={`/entries/${entry._id}`}>
            <button className="text-xs px-3 py-1.5 rounded-md border border-gray-200 hover:bg-gray-100 transition">
              open
            </button>
          </Link>

        </div>
      ))}

    </div>

    {/* EMPTY STATE */}
    {entries?.length === 0 && (
      <section className="bg-white border border-gray-100 rounded-xl p-10 text-center">

        <div className="text-3xl mb-3">📝</div>

        <h3 className="text-lg font-semibold text-gray-900">
          No entries yet
        </h3>

        <p className="text-xs text-gray-400 mt-2 max-w-sm mx-auto">
          Start writing your thoughts. Even messy ones count.
        </p>

        <Link to="/entries/create">
            <button className="mt-5 bg-gray-900 text-white px-4 py-2 text-xs rounded-lg">
              Create entry

            </button>
        </Link>
      </section>
    )}

  </div>
</main>
   )
}
export default Entries;