import { useEffect, useState } from 'react';
import { useLazyGetUserReposQuery, useSearchUsersQuery } from '../store/github/github.api'
import { useDebounce } from '../hooks/useDebounce';
import { RepoCard } from '../components/RepoCard';
import { Loader } from '../components/Loader';

export function HomePage() {
  const [search, setSearch] = useState('')
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)
  const debounced = useDebounce(search)
  const { isLoading, isError, data } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
    refetchOnFocus: true
  })

  const [fetchRepos, { isFetching, data: repos }] = useLazyGetUserReposQuery()

  const clickHandler = (username: string) => {
    fetchRepos(username)
    setIsDropdownVisible(false)
  }

  useEffect(() => {
    setIsDropdownVisible(debounced.length > 3 && !!data?.length)
  }, [debounced, data])

  return (
    <div className="container flex flex-col items-center mt-10 px-5 mx-auto w-screen">
      {isError && <p className="text-center text-red-600">Something went wrong</p>}
      <div className="relative w-full sm:w-[560px]">
        <input
          type="text"
          className="border border-slate-300 py-2 px-4 w-full h-[45px] mb-2"
          placeholder="Search for GitHub username..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {isDropdownVisible && <ul className="list-none absolute top-[45px] left-0 right-0 max-h-[200px] overflow-y-scroll shadow-md bg-white">
          {isLoading && <Loader size={8} wrapcClasses='h-12' />}
          {data?.map(user => (
            <li
              key={user.id}
              onClick={() => clickHandler(user.login)}
              className="py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer"
            >{user.login}</li>
          ))}
        </ul>}
        {isFetching && <Loader size={10} wrapcClasses='mt-5' />}
        {!isFetching && repos?.map(repo => <RepoCard repo={repo} key={repo.id} />)}
        <div>
        </div>
      </div>
    </div>
  )
}
