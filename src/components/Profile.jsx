import React from 'react'

const Stat = ({ label, value }) => (
  <div className="text-center">
    <div className="text-xl font-bold text-gray-800">{value}</div>
    <div className="text-xs uppercase tracking-wide text-gray-500">{label}</div>
  </div>
)

export default function Profile({ user }) {
  if (!user) return null

  return (
    <div className="bg-white/70 backdrop-blur rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center gap-4">
        <img
          src={user.avatar_url}
          alt={user.login}
          className="w-20 h-20 rounded-full border border-gray-200"
        />
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900">{user.name || user.login}</h2>
          <a
            href={user.html_url}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-blue-600 hover:underline"
          >
            @{user.login}
          </a>
          {user.bio && <p className="mt-2 text-gray-600">{user.bio}</p>}
          <div className="mt-4 grid grid-cols-3 gap-4">
            <Stat label="Repos" value={user.public_repos ?? 0} />
            <Stat label="Followers" value={user.followers ?? 0} />
            <Stat label="Following" value={user.following ?? 0} />
          </div>
        </div>
      </div>
    </div>
  )
}
