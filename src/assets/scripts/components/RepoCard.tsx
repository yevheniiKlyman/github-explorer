import React, { useState } from 'react';
import { IRepo, FavoriteRepo } from '../types/repoTypes';
import { useActions } from '../hooks/useActions';
import { useAppSelector } from '../hooks/useAppSelector';

export function RepoCard({ repo }: {repo: IRepo | FavoriteRepo}) {
  const { full_name, html_url, description, watchers, forks } = repo
  const { addFavorite, removeFavorite } = useActions()
  const { favorites } = useAppSelector(state => state.github)
  const [isFav, setIsFav] = useState(!!favorites.filter(i => i.full_name === full_name).length);

  const addToFavorites = (event: React.MouseEvent) => {
    event.preventDefault()
    addFavorite({ full_name, html_url, description, watchers, forks })
    setIsFav(true)
  }

  const removeFromFavorites = (event: React.MouseEvent) => {
    event.preventDefault()
    removeFavorite(full_name)
    setIsFav(false)
  }

  return (
    <div className="border border-slate-300 rounded mb-3 hover:shadow-md hover:bg-gray-100 transition-all">
      <a href={html_url} target="_blank" className='block w-full py-3 px-5'>
        <h2 className="text-lg font-bold border-b pb-1 mb-1">{full_name}</h2>
        <p className="text-sm">
          Forks: <span className="font-bold mr-2">{forks}</span>
          Watchers: <span className="font-bold">{watchers}</span>
        </p>
        <p className="mt-2 text-sm font-thin">{description}</p>
        {!isFav && <button
          className="mt-4 py-2 px-4 bg-yellow-300 rounded hover:shadow-md transition-all"
          onClick={addToFavorites}
        >Add to favorites</button>}
        {isFav && <button
          className="mt-4 py-2 px-4 bg-red-300 rounded hover:shadow-md transition-all"
          onClick={removeFromFavorites}
        >Remove from favorites</button>}
      </a>
    </div>
  )
}
