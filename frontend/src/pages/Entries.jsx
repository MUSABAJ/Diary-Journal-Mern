import { useState } from 'react';
import { useGetEntriesQuery, useSearchEntriesQuery } from '../redux/api/entryApiSlice';
import EntryCard from '../components/entry/EntryCard';
import AddEntry from '../components/entry/AddEntry';
import Loader from '../components/Loader';
import SearchBox from '../components/navbar/SearchBox';

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
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Entries</h1>
        <div className="flex gap-3 items-center">
          <SearchBox onSearch={setSearchText} />
          {searchText && (
            <button className="btn btn-ghost btn-sm" onClick={() => setSearchText('')}>
              Clear
            </button>
          )}
          <button
            className="btn btn-primary"
            onClick={() => document.getElementById('add-entry-modal').showModal()}
          >
            + New Entry
          </button>
        </div>
      </div>

      {isLoading ? (
        <Loader />
      ) : entries?.length === 0 ? (
        <div className="text-center py-20 text-base-content/50">
          <p className="text-5xl mb-4">📝</p>
          <p className="text-xl">{searchText ? 'No entries match your search.' : "You haven't written anything yet."}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {entries?.map((entry) => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </div>
      )}

      <AddEntry />
    </div>
  );
};
export default Entries;