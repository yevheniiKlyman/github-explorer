import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FavoriteRepo } from '../../types/repoTypes'
import { IGithubState } from '../../types/storeTypes'

const LS_FAV_KEY = 'ge_fk'

const initialState: IGithubState = {
  favorites: JSON.parse(localStorage.getItem(LS_FAV_KEY) ?? '[]')
}

const sortByName = (a: FavoriteRepo, b: FavoriteRepo): number => {
  const nameA = a.full_name
  const nameB = b.full_name

  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  return 0;
}

export const githubSlice = createSlice({
  name: 'github',
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<FavoriteRepo>) {
      state.favorites.push(action.payload)
      state.favorites.sort(sortByName)
      localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favorites))
    },
    removeFavorite(state, action: PayloadAction<string>) {
      state.favorites = state.favorites.filter(f => f.full_name !== action.payload)
      localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favorites))
    }
  }
})


export const githubActions = githubSlice.actions
export const githubReducer = githubSlice.reducer
