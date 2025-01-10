import { useAppSelector } from '../hooks/useAppSelector'

export function FavoritesPage() {
  const { favorites } = useAppSelector(state => state.github)

  if (favorites.length === 0) {
    return <p className="text-center mt-5">No items.</p>
  }

  return (
    <div className="container flex flex-col items-center mt-10 px-5 mx-auto w-screen">
      <ul className="list-none">
        {favorites.map(f => (
          <li key={f}>
            <a href={f} target="_blank">{f}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
