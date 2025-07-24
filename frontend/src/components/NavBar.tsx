import type { FC } from 'react';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

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
    <nav className="bg-background text-text px-6 py-3 flex items-center justify-between shadow-md">
      <div className="flex items-center space-x-2">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `px-5 py-2 rounded-full font-sans text-base font-semibold transition border-2 ${
              isActive
                ? 'bg-green-900 text-white border-green-900'
                : 'bg-transparent text-green-900 border-green-900 hover:bg-green-900/10'
            }`
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/players"
          className={({ isActive }) =>
            `px-5 py-2 rounded-full font-sans text-base font-semibold transition border-2 ${
              isActive
                ? 'bg-green-900 text-white border-green-900'
                : 'bg-transparent text-green-900 border-green-900 hover:bg-green-900/10'
            }`
          }
        >
          Players
        </NavLink>
      </div>
      <form onSubmit={handleSearch} className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Search player..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="px-3 py-1 rounded bg-background outline outline-2 outline-green-600 focus:outline-none focus:ring focus:ring-green-400"
        />
        <button type="submit" className="bg-green-700 hover:bg-green-600 px-3 py-1 rounded text-neutral-100 font-medium">Go</button>
      </form>
    </nav>
  );
};

export default NavBar; 