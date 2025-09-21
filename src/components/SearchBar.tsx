import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className="w-full max-w-lg mb-4">
      <input
        type="text"
        placeholder="Search for a movie..."
        value={value}
        onChange={onChange}
        className="
          w-full p-3 rounded-full text-black
          bg-gray-200 focus:outline-none focus:ring-2
          focus:ring-blue-500
        "
      />
    </div>
  );
};

export default SearchBar;