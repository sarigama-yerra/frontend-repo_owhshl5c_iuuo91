import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import RepoGrid from './components/RepoGrid'

function App() {
  const [username, setUsername] = useState('')
  const [queryUser, setQueryUser] = useState('')
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(30)
  const [sort, setSort] = useState('updated')
  const [direction, setDirection] = useState('desc')

  const backend = useMemo(() => {
    return import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  }, [])

  useEffect(() => {
    if (!queryUser) return
    fetchRepos(1)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryUser, perPage, sort, direction])

  const onSearch = (value) => {
    setUsername(value)
    setQueryUser(value)
  }

  const fetchRepos = async (targetPage) => {
    setLoading(true)
    setError('')
    try {
      const params = new URLSearchParams({
        username: queryUser,
        page: String(targetPage || page),
        per_page: String(perPage),
        sort,
        direction,
      })
      const res = await fetch(`${backend}/api/github/repos?${params.toString()}`)
      if (!res.ok) {
        const text = await res.text()
        throw new Error(text || `Request failed: ${res.status}`)
      }
      const data = await res.json()
      setRepos(data.items || [])
      setPage(targetPage || page)
    } catch (e) {
      setError(e.message || 'Something went wrong fetching repositories')
      setRepos([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header onSearch={onSearch} initialUsername={username} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {!queryUser ? (
          <div className="text-center py-20">
            <h2 className="text-3xl font-semibold text-gray-800">Showcase your GitHub work</h2>
            <p className="mt-2 text-gray-600">Enter your username above to load your public repositories.</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="text-gray-700">
                <span className="font-medium">{queryUser}</span>'s repositories
              </div>
              <div className="flex items-center gap-2 text-sm">
                <label className="text-gray-600">Sort</label>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="h-9 rounded-md border border-gray-300 bg-white px-2"
                >
                  <option value="created">created</option>
                  <option value="updated">updated</option>
                  <option value="pushed">pushed</option>
                  <option value="full_name">name</option>
                </select>
                <select
                  value={direction}
                  onChange={(e) => setDirection(e.target.value)}
                  className="h-9 rounded-md border border-gray-300 bg-white px-2"
                >
                  <option value="desc">desc</option>
                  <option value="asc">asc</option>
                </select>
                <select
                  value={perPage}
                  onChange={(e) => setPerPage(Number(e.target.value))}
                  className="h-9 rounded-md border border-gray-300 bg-white px-2"
                >
                  {[10, 20, 30, 50, 100].map((n) => (
                    <option key={n} value={n}>{n}/page</option>
                  ))}
                </select>
              </div>
            </div>

            <RepoGrid items={repos} isLoading={loading} error={error} />

            {queryUser && (
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => fetchRepos(Math.max(1, page - 1))}
                  disabled={page === 1 || loading}
                  className="h-10 px-4 rounded-md border border-gray-300 bg-white disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="text-sm text-gray-600">Page {page}</span>
                <button
                  onClick={() => fetchRepos(page + 1)}
                  disabled={loading}
                  className="h-10 px-4 rounded-md border border-gray-300 bg-white"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}

export default App
