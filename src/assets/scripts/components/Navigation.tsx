import { NavLink, Link } from 'react-router-dom';

export function Navigation() {
  return (
    <nav className="flex justify-center items-center h-[50px] px-5 shadow-md bg-gray-500 text-white">
      <div className="flex justify-between w-full max-w-screen-2xl">
        <Link to="/"><h3 className="font-bold">GitHub Explorer</h3></Link>
        <div>
          <NavLink
            to="/"
            className={({ isActive }) => `mr-5 ${isActive ? 'underline' : ''}`}
          >Home</NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) => isActive ? 'underline' : ''}
          >Favorites</NavLink>
        </div>
      </div>
    </nav>
  )
}
