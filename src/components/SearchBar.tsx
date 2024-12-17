import React, { useState, useCallback } from 'react';
import { Search } from 'lucide-react';
// search through messages
interface SearchBarProps {
  onSearch: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  }, [query, onSearch]);

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto mb-4">
      <div className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search messages..."
          className="w-full px-4 py-2 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
        />
        <button
          type="submit"
          className="absolute right-2 p-2 text-gray-500 hover:text-green-500"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}