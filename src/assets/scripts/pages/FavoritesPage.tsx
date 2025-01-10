import { Link } from 'react-router-dom'
import { useAppSelector } from '../hooks/useAppSelector'
import { RepoCard } from '../components/RepoCard';

export function FavoritesPage() {
  const { favorites } = useAppSelector(state => state.github)

  if (favorites.length === 0) {
    return <p className="text-center mt-6"><span className='font-semibold'>No favorites added yet.</span> <Link to="/" className='text-blue-600'>Shall we start exploring?</Link></p>
  }

  return (
    <div className="container flex flex-col items-center mt-3 px-5 mx-auto w-screen">
      <div className="relative w-full sm:w-[560px]">
        <h1 className="text-3xl text-center font-bold mb-5">Favorite repositories</h1>
        {favorites.map(repo => <RepoCard repo={repo} key={repo.full_name} />)}
      </div>
    </div>
  )
}
