import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/search?query=${searchQuery}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="p-8 border-4 border-black shadow-brutal bg-yellow-200">
        <h1 className="text-4xl font-bold mb-6">Find Your Master</h1>
        <form onSubmit={handleSearch} className="space-y-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-4 border-4 border-black text-xl"
            placeholder="What do you want to learn?"
          />
          <button
            type="submit"
            className="w-full p-4 bg-blue-500 border-4 border-black text-white text-xl font-bold 
                     hover:translate-x-1 hover:-translate-y-1 transition-transform"
          >
            Search Masters
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {searchResults.map((master) => (
          <div
            key={master.id}
            className="p-6 border-4 border-black shadow-brutal bg-white hover:translate-x-1 
                     hover:-translate-y-1 transition-transform cursor-pointer"
            onClick={() => navigate(`/master/${master.id}`)}
          >
            <img
              src={master.avatar}
              alt={master.name}
              className="w-32 h-32 border-4 border-black mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">{master.name}</h2>
            <p className="text-xl mb-2">{master.expertise}</p>
            <div className="flex items-center mb-2">
              <span className="text-xl mr-2">Rating:</span>
              <span className="text-xl font-bold">{master.rating}/5</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;