function RepoCard({ repo }) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
      className="block group rounded-xl border border-gray-200 hover:border-gray-300 bg-white p-5 shadow-sm hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
            {repo.name}
          </h3>
          {repo.description && (
            <p className="mt-1 line-clamp-2 text-sm text-gray-600">{repo.description}</p>
          )}
        </div>
        <span className="ml-3 inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700">
          {repo.language || 'N/A'}
        </span>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-gray-600">
        <span>⭐ {repo.stargazers_count}</span>
        <span>🍴 {repo.forks_count}</span>
        {repo.license && <span className="rounded bg-gray-100 px-2 py-0.5">{repo.license}</span>}
        {repo.topics && repo.topics.slice(0, 3).map((t) => (
          <span key={t} className="rounded bg-blue-50 text-blue-700 px-2 py-0.5">{t}</span>
        ))}
      </div>
      <div className="mt-3 text-[11px] text-gray-500">
        Updated: {new Date(repo.updated_at).toLocaleString()}
      </div>
    </a>
  )
}

export default RepoCard
