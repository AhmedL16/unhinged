'use client'

import { useState } from 'react'
import { createClient } from '../lib/auth'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/dashboard')
    }
  }

  async function handleGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    })
  }

  return (
    <main style={{backgroundColor: '#0a0a0a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px'}}>
      <div style={{width: '100%', maxWidth: '380px'}}>
        <h1 style={{color: '#fff', fontSize: '24px', fontWeight: 700, margin: '0 0 8px'}}>
          welcome back
        </h1>
        <p style={{color: '#666', fontSize: '14px', margin: '0 0 32px'}}>
          sign in to manage your profile
        </p>

        <button
          onClick={handleGoogle}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#fff',
            color: '#000',
            border: 'none',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            marginBottom: '16px'
          }}
        >
          continue with google
        </button>

        <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px'}}>
          <div style={{flex: 1, height: '1px', backgroundColor: '#1f1f1f'}} />
          <span style={{color: '#444', fontSize: '12px'}}>or</span>
          <div style={{flex: 1, height: '1px', backgroundColor: '#1f1f1f'}} />
        </div>

        <form onSubmit={handleLogin} style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
          {error && (
            <p style={{color: '#ef4444', fontSize: '13px', margin: 0}}>{error}</p>
          )}

          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="email"
            required
            style={{
              width: '100%',
              padding: '12px 16px',
              backgroundColor: '#141414',
              border: '1px solid #1f1f1f',
              borderRadius: '12px',
              color: '#fff',
              fontSize: '14px',
              outline: 'none'
            }}
          />

          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="password"
            required
            style={{
              width: '100%',
              padding: '12px 16px',
              backgroundColor: '#141414',
              border: '1px solid #1f1f1f',
              borderRadius: '12px',
              color: '#fff',
              fontSize: '14px',
              outline: 'none'
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#fff',
              color: '#000',
              border: 'none',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              opacity: loading ? 0.5 : 1
            }}
          >
            {loading ? 'signing in...' : 'sign in'}
          </button>
        </form>

        <p style={{color: '#666', fontSize: '13px', textAlign: 'center', marginTop: '24px'}}>
          no account?{' '}
          <Link href="/signup" style={{color: '#fff', textDecoration: 'none'}}>
            join unhinged
          </Link>
        </p>
      </div>
    </main>
  )
}