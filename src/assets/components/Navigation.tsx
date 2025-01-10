import { Link } from 'react-router-dom';

export function Navigation() {
  return (
    <nav className="flex justify-center items-center h-[50px] px-5 shadow-md bg-gray-500 text-white">
      <div className="flex justify-between w-full max-w-screen-2xl">
        <h3 className="font-bold">GitHub Explorer</h3>
        <div>
          <Link to="/" className="mr-5">Home</Link>
          <Link to="/favorites">Favorites</Link>
        </div>
      </div>
    </nav>
  )
}
