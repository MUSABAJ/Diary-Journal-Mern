import { useState } from 'react';

const SearchBox = ({ onSearch }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) onSearch(text.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        placeholder="Search entries..."
        className="input input-bordered input-sm w-48"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" className="btn btn-sm btn-primary">Search</button>
    </form>
  );
};
export default SearchBox;
