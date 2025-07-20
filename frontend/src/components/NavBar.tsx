import type { FC } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar: FC = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/player/${encodeURIComponent(search.trim())}`);
      setSearch('');
    }
  };

  return (
    <nav className="bg-green-950 text-neutral-100 px-6 py-3 flex items-center justify-between shadow-md">
      <div className="flex items-center space-x-6">
        <Link to="/" className="text-2xl font-bold text-green-300 hover:text-green-200 transition">Tennis Dashboard</Link>
      </div>
      <form onSubmit={handleSearch} className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Search player..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="px-3 py-1 rounded bg-green-900 text-neutral-100 focus:outline-none focus:ring focus:ring-green-400"
        />
        <button type="submit" className="bg-green-700 hover:bg-green-600 px-3 py-1 rounded text-neutral-100 font-medium">Go</button>
      </form>
    </nav>
  );
};

export default NavBar; 