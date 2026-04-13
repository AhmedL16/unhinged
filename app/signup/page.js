'use client'

import { useState } from 'react'
import { createClient } from '../lib/auth'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

  async function handleSignup(e) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const slug = name.toLowerCase().replace(/\s+/g, '-')

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password
    })

    if (signUpError) {
      setError(signUpError.message)
      setLoading(false)
      return
    }

    const userId = data.user.id

    const res = await fetch('/api/creators/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, slug, userId })
    })

    if (res.ok) {
      router.push('/dashboard')
    } else {
      setError('account created but profile setup failed. please contact support.')
      setLoading(false)
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
          join unhinged
        </h1>
        <p style={{color: '#666', fontSize: '14px', margin: '0 0 32px'}}>
          real creators only. no algorithm.
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

        <form onSubmit={handleSignup} style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
          {error && (
            <p style={{color: '#ef4444', fontSize: '13px', margin: 0}}>{error}</p>
          )}

          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="your name"
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
            {loading ? 'creating account...' : 'create account'}
          </button>
        </form>

        <p style={{color: '#666', fontSize: '13px', textAlign: 'center', marginTop: '24px'}}>
          already have an account?{' '}
          <Link href="/login" style={{color: '#fff', textDecoration: 'none'}}>
            sign in
          </Link>
        </p>
      </div>
    </main>
  )
}