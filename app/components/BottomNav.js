'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function BottomNav() {
  const pathname = usePathname()

  const active = (path) => pathname === path ? '#ffffff' : '#71717a'

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#09090b',
      borderTop: '1px solid #27272a',
      zIndex: 9999,
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: '8px 0 12px'
    }}>
      <Link href="/" style={{color: active('/'), textAlign: 'center', textDecoration: 'none'}}>
        <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24" style={{display: 'block', margin: '0 auto'}}>
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </svg>
        <span style={{fontSize: 10}}>home</span>
      </Link>

      <Link href="/search" style={{color: active('/search'), textAlign: 'center', textDecoration: 'none'}}>
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{display: 'block', margin: '0 auto'}}>
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
        <span style={{fontSize: 10}}>search</span>
      </Link>

      <Link href="/join" style={{color: active('/join'), textAlign: 'center', textDecoration: 'none'}}>
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{display: 'block', margin: '0 auto'}}>
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 8v8M8 12h8"/>
        </svg>
        <span style={{fontSize: 10}}>join</span>
      </Link>

      <Link href="/admin" style={{color: active('/admin'), textAlign: 'center', textDecoration: 'none'}}>
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{display: 'block', margin: '0 auto'}}>
          <circle cx="12" cy="8" r="4"/>
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
        </svg>
        <span style={{fontSize: 10}}>admin</span>
      </Link>

    </nav>
  )
}