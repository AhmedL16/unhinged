'use client'

import { useState, useEffect } from 'react'

const ADMIN_PASSWORD = 'unhinged2026'

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(false)

  function handleLogin(e) {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true)
    } else {
      alert('wrong password')
    }
  }

  useEffect(() => {
    if (authenticated) fetchSubmissions()
  }, [authenticated])

  async function fetchSubmissions() {
    setLoading(true)
    const res = await fetch('/api/admin/submissions', {
  cache: 'no-store'
})
    const data = await res.json()
    setSubmissions(data)
    setLoading(false)
  }

  async function handleApprove(id) {
    await fetch('/api/admin/approve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
    fetchSubmissions()
  }

  async function handleReject(id) {
    await fetch('/api/admin/reject', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
    fetchSubmissions()
  }

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-4">
        <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full max-w-sm">
          <h1 className="text-2xl font-bold">admin</h1>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="password"
            className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-400"
          />
          <button
            type="submit"
            className="bg-white text-black font-semibold py-3 rounded-xl hover:bg-zinc-200 transition-colors"
          >
            enter
          </button>
        </form>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white px-4 py-12 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">admin panel</h1>
        <p className="text-zinc-400 text-sm mt-1">{submissions.length} creators on the platform</p>
      </div>

      {loading ? (
        <p className="text-zinc-500">loading...</p>
      ) : submissions.length === 0 ? (
        <p className="text-zinc-500">no creators yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {submissions.map(creator => (
            <div
              key={creator.id}
              className="p-4 bg-zinc-900 rounded-xl border border-zinc-800"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold">{creator.name}</p>
                  <p className="text-zinc-500 text-xs mt-0.5">/{creator.slug}</p>
                  <p className="text-zinc-400 text-sm mt-2">{creator.bio}</p>
                </div>
                <div className="flex flex-col gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleApprove(creator.id)}
                    className="px-3 py-1.5 bg-green-900 text-green-300 text-xs rounded-lg hover:bg-green-800 transition-colors"
                  >
                    approve
                  </button>
                  <button
                    onClick={() => handleReject(creator.id)}
                    className="px-3 py-1.5 bg-red-900 text-red-300 text-xs rounded-lg hover:bg-red-800 transition-colors"
                  >
                    reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}