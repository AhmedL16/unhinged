'use client'

import { useState, useEffect } from 'react'

const ADMIN_PASSWORD = 'unhinged2026'

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const [creators, setCreators] = useState([])
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('add')
  const [form, setForm] = useState({
    name: '',
    slug: '',
    bio: '',
    tags: '',
    videos: [
      { title: '', url: '' },
      { title: '', url: '' },
      { title: '', url: '' },
      { title: '', url: '' },
      { title: '', url: '' }
    ]
  })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  function handleLogin(e) {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true)
    } else {
      alert('wrong password')
    }
  }

  useEffect(() => {
    if (authenticated) fetchCreators()
  }, [authenticated])

  async function fetchCreators() {
    setLoading(true)
    const res = await fetch('/api/admin/submissions')
    const data = await res.json()
    setCreators(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  async function handleApprove(id) {
    await fetch('/api/admin/approve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
    fetchCreators()
  }

  async function handleReject(id) {
    await fetch('/api/admin/reject', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
    fetchCreators()
  }

  function handleFormChange(field, value) {
    setForm(prev => ({
      ...prev,
      [field]: value,
      ...(field === 'name' && {
        slug: value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      })
    }))
  }

  function handleVideoChange(index, field, value) {
    setForm(prev => {
      const videos = [...prev.videos]
      videos[index] = { ...videos[index], [field]: value }
      return { ...prev, videos }
    })
  }

  async function handleAddCreator(e) {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    setSuccess('')

    const tags = form.tags.split(',').map(t => t.trim()).filter(Boolean)
    const videos = form.videos.filter(v => v.url)

    const res = await fetch('/api/admin/creator', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        slug: form.slug,
        bio: form.bio,
        tags,
        videos
      })
    })

    const data = await res.json()

    if (res.ok) {
      setSuccess(`creator added — live at /creator/${data.slug}`)
      setForm({
        name: '',
        slug: '',
        bio: '',
        tags: '',
        videos: [
          { title: '', url: '' },
          { title: '', url: '' },
          { title: '', url: '' },
          { title: '', url: '' },
          { title: '', url: '' }
        ]
      })
      fetchCreators()
    } else {
      setError('something went wrong — try again')
    }

    setSubmitting(false)
  }

  const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    backgroundColor: '#111',
    border: '1px solid #2a2a2a',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box'
  }

  const labelStyle = {
    color: '#888',
    fontSize: '12px',
    marginBottom: '6px',
    display: 'block',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  }

  if (!authenticated) {
    return (
      <main style={{backgroundColor: '#0a0a0a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <form onSubmit={handleLogin} style={{width: '320px', display: 'flex', flexDirection: 'column', gap: '12px'}}>
          <h1 style={{color: '#fff', fontSize: '24px', fontWeight: 700, margin: '0 0 8px'}}>unhinged admin</h1>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="password" style={inputStyle} />
          <button type="submit" style={{padding: '10px', backgroundColor: '#fff', color: '#000', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer'}}>
            enter
          </button>
        </form>
      </main>
    )
  }

  return (
    <main style={{backgroundColor: '#0a0a0a', minHeight: '100vh', display: 'flex'}}>

      <div style={{width: '220px', borderRight: '1px solid #1f1f1f', padding: '24px 16px', flexShrink: 0}}>
        <p style={{color: '#fff', fontSize: '16px', fontWeight: 700, margin: '0 0 32px'}}>unhinged admin</p>
        <div style={{display: 'flex', flexDirection: 'column', gap: '4px'}}>
          <button onClick={() => setActiveTab('add')} style={{padding: '10px 14px', backgroundColor: activeTab === 'add' ? '#1a1a1a' : 'transparent', border: 'none', borderRadius: '8px', color: activeTab === 'add' ? '#fff' : '#666', fontSize: '14px', cursor: 'pointer', textAlign: 'left'}}>
            + add creator
          </button>
          <button onClick={() => setActiveTab('creators')} style={{padding: '10px 14px', backgroundColor: activeTab === 'creators' ? '#1a1a1a' : 'transparent', border: 'none', borderRadius: '8px', color: activeTab === 'creators' ? '#fff' : '#666', fontSize: '14px', cursor: 'pointer', textAlign: 'left'}}>
            creators ({creators.length})
          </button>
        </div>
      </div>

      <div style={{flex: 1, padding: '32px', overflowY: 'auto'}}>

        {activeTab === 'add' && (
          <div style={{maxWidth: '700px'}}>
            <h2 style={{color: '#fff', fontSize: '20px', fontWeight: 600, margin: '0 0 24px'}}>add a creator</h2>

            {success && (
              <div style={{padding: '12px 16px', backgroundColor: '#14532d', borderRadius: '8px', marginBottom: '20px'}}>
                <p style={{color: '#86efac', fontSize: '13px', margin: 0}}>{success}</p>
              </div>
            )}
            {error && (
              <div style={{padding: '12px 16px', backgroundColor: '#450a0a', borderRadius: '8px', marginBottom: '20px'}}>
                <p style={{color: '#fca5a5', fontSize: '13px', margin: 0}}>{error}</p>
              </div>
            )}

            <form onSubmit={handleAddCreator} style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>

              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>
                <div>
                  <label style={labelStyle}>creator name</label>
                  <input value={form.name} onChange={e => handleFormChange('name', e.target.value)} placeholder="Casey Neistat" required style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>url slug</label>
                  <input value={form.slug} onChange={e => handleFormChange('slug', e.target.value)} placeholder="casey-neistat" required style={inputStyle} />
                </div>
              </div>

              <div>
                <label style={labelStyle}>bio — your editorial voice</label>
                <textarea value={form.bio} onChange={e => handleFormChange('bio', e.target.value)} placeholder="Why does this creator belong on Unhinged? Write it in your own voice." required rows={4} style={{...inputStyle, resize: 'vertical'}} />
              </div>

              <div>
                <label style={labelStyle}>tags — comma separated</label>
                <input value={form.tags} onChange={e => handleFormChange('tags', e.target.value)} placeholder="lets plays, game reviews, vlogs" style={inputStyle} />
              </div>

              <div>
                <label style={labelStyle}>videos — up to 5</label>
                <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                  {form.videos.map((video, i) => (
                    <div key={i} style={{display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '8px'}}>
                      <input
                        value={video.title}
                        onChange={e => handleVideoChange(i, 'title', e.target.value)}
                        placeholder={`title ${i + 1}`}
                        style={inputStyle}
                      />
                      <input
                        value={video.url}
                        onChange={e => handleVideoChange(i, 'url', e.target.value)}
                        placeholder="https://youtu.be/..."
                        style={inputStyle}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                style={{padding: '12px 24px', backgroundColor: '#fff', color: '#000', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', opacity: submitting ? 0.5 : 1, alignSelf: 'flex-start'}}
              >
                {submitting ? 'adding...' : 'add creator →'}
              </button>

            </form>
          </div>
        )}

        {activeTab === 'creators' && (
          <div>
            <h2 style={{color: '#fff', fontSize: '20px', fontWeight: 600, margin: '0 0 24px'}}>all creators</h2>
            {loading ? (
              <p style={{color: '#666'}}>loading...</p>
            ) : (
              <table style={{width: '100%', borderCollapse: 'collapse'}}>
                <thead>
                  <tr style={{borderBottom: '1px solid #1f1f1f'}}>
                    <th style={{color: '#666', fontSize: '12px', textAlign: 'left', padding: '8px 12px', fontWeight: 500}}>name</th>
                    <th style={{color: '#666', fontSize: '12px', textAlign: 'left', padding: '8px 12px', fontWeight: 500}}>slug</th>
                    <th style={{color: '#666', fontSize: '12px', textAlign: 'left', padding: '8px 12px', fontWeight: 500}}>status</th>
                    <th style={{color: '#666', fontSize: '12px', textAlign: 'left', padding: '8px 12px', fontWeight: 500}}>actions</th>
                  </tr>
                </thead>
                <tbody>
                  {creators.map(creator => (
                    <tr key={creator.id} style={{borderBottom: '1px solid #1a1a1a'}}>
                      <td style={{color: '#fff', fontSize: '14px', padding: '12px'}}>{creator.name}</td>
                      <td style={{color: '#666', fontSize: '13px', padding: '12px'}}>/{creator.slug}</td>
                      <td style={{padding: '12px'}}>
                        <span style={{fontSize: '11px', padding: '3px 10px', borderRadius: '99px', backgroundColor: creator.approved ? '#14532d' : '#431407', color: creator.approved ? '#86efac' : '#fdba74'}}>
                          {creator.approved ? 'approved' : 'pending'}
                        </span>
                      </td>
                      <td style={{padding: '12px', display: 'flex', gap: '8px'}}>
                        {!creator.approved && (
                          <button onClick={() => handleApprove(creator.id)} style={{padding: '4px 12px', backgroundColor: '#14532d', color: '#86efac', border: 'none', borderRadius: '6px', fontSize: '12px', cursor: 'pointer'}}>
                            approve
                          </button>
                        )}
                        <button onClick={() => handleReject(creator.id)} style={{padding: '4px 12px', backgroundColor: '#450a0a', color: '#fca5a5', border: 'none', borderRadius: '6px', fontSize: '12px', cursor: 'pointer'}}>
                          remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

      </div>
    </main>
  )
}