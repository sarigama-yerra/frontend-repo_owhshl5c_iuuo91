import { useState } from 'react'

function Header({ onSearch, initialUsername }) {
  const [value, setValue] = useState(initialUsername || '')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!value.trim()) return
    onSearch(value.trim())
  }

  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-white/70 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center text-white font-bold">G</div>
          <div>
            <h1 className="text-xl font-semibold text-gray-800">GitHub Portfolio</h1>
            <p className="text-xs text-gray-500">Explore public repositories by username</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full max-w-md">
          <input
            type="text"
            placeholder="Enter GitHub username (e.g. torvalds)"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="flex-1 h-10 rounded-md border border-gray-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="h-10 px-4 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
          >
            Search
          </button>
        </form>
      </div>
    </header>
  )
}

export default Header
