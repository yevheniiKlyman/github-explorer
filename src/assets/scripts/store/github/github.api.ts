import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IServerResponse, IUser } from '../../types/userTypes';
import { IRepo } from '../../types/repoTypes';

export const githubApi = createApi({
  reducerPath: 'github/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.github.com'
  }),
  refetchOnFocus: true,
  endpoints: build => ({
    searchUsers: build.query<IUser[], string>({
      query: (search: string) => ({
        url: 'search/users',
        params: {
          q: search,
          per_page: 10
        }
      }),
      transformResponse: (response: IServerResponse<IUser>) => response.items
    }),
    getUserRepos: build.query<IRepo[], string>({
      query: (username: string) => ({
        url: `users/${username}/repos`
      })
    })
  })
})

export const { useSearchUsersQuery, useLazyGetUserReposQuery } = githubApi
