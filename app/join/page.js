'use client'

import { useState } from 'react'

export default function JoinPage() {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    bio: '',
    video_url: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'name' && {
        slug: value.toLowerCase().replace(/\s+/g, '-')
      })
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    const res = await fetch('/api/join', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })

    if (res.ok) {
      setSubmitted(true)
    }
    setLoading(false)
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">you're on unhinged.</h1>
          <p className="text-zinc-400">your profile is live at /creator/{formData.slug}</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white px-4 py-12 max-w-xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">join unhinged</h1>
        <p className="text-zinc-400 text-sm mt-1">real creators only. no algorithm.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">

        <div>
          <label className="text-sm text-zinc-400 mb-1 block">your name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ahmed"
            required
            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-400"
          />
        </div>

        <div>
          <label className="text-sm text-zinc-400 mb-1 block">your url</label>
          <div className="flex items-center bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3">
            <span className="text-zinc-500 text-sm mr-1">unhinged.com/creator/</span>
            <input
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="ahmed"
              required
              className="flex-1 bg-transparent text-white placeholder-zinc-600 focus:outline-none text-sm"
            />
          </div>
        </div>

        <div>
          <label className="text-sm text-zinc-400 mb-1 block">who are you</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Tell people why they should watch you."
            required
            rows={3}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-400 resize-none"
          />
        </div>

        <div>
          <label className="text-sm text-zinc-400 mb-1 block">a video url</label>
          <input
            name="video_url"
            value={formData.video_url}
            onChange={handleChange}
            placeholder="https://youtu.be/..."
            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-400"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-white text-black font-semibold py-3 rounded-xl hover:bg-zinc-200 transition-colors disabled:opacity-50"
        >
          {loading ? 'joining...' : 'join unhinged'}
        </button>

      </form>
    </main>
  )
}