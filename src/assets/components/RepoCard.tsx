import React, { useState } from 'react';
import { IRepo } from '../types/repoTypes';
import { useActions } from '../hooks/useActions';
import { useAppSelector } from '../hooks/useAppSelector';

export function RepoCard({ repo }: {repo: IRepo}) {
  const { addFavorite, removeFavorite } = useActions()
  const { favorites } = useAppSelector(state => state.github)
  const [isFav, setIsFav] = useState(favorites.includes(repo.html_url));

  const addToFavorites = (event: React.MouseEvent) => {
    event.preventDefault()
    addFavorite(repo.html_url)
    setIsFav(true)
  }

  const removeFromFavorites = (event: React.MouseEvent) => {
    event.preventDefault()
    removeFavorite(repo.html_url)
    setIsFav(false)
  }

  return (
    <div className="border py-3 px-5 rounded mb-2 hover:shadow-md hover:bg-gray-100 transition-all">
      <a href={repo.html_url} target="_blank">
        <h2 className="text-lg font-bold">{repo.full_name}</h2>
        <p className="text-sm">
          Forks: <span className="font-bold mr-2">{repo.forks}</span>
          Watchers: <span className="font-bold">{repo.watchers}</span>
        </p>
        <p className="text-sm font-thin">{repo?.description}</p>
        {!isFav && <button
          className="py-2 px-4 bg-yellow-400 rounded hover:shadow-md transition-all"
          onClick={addToFavorites}
        >Add to favorites</button>}
        {isFav && <button
          className="py-2 px-4 bg-red-400 rounded hover:shadow-md transition-all"
          onClick={removeFromFavorites}
        >Remove from favorites</button>}
      </a>
    </div>
  )
}
