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
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      padding: '8px 16px 12px'
    }}>

      <Link href="/" style={{color: active('/'), textAlign: 'center', textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px'}}>
        <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </svg>
        <span style={{fontSize: 10}}>home</span>
      </Link>

      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Link href="/dashboard" style={{
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '44px',
          height: '44px',
          backgroundColor: '#ffffff',
          borderRadius: '50%',
          marginTop: '-16px',
          boxShadow: '0 0 0 4px #09090b'
        }}>
          <svg width="22" height="22" fill="none" stroke="#000" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M12 5v14M5 12h14"/>
          </svg>
        </Link>
      </div>

      <Link href="/login" style={{color: active('/login'), textAlign: 'center', textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px'}}>
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="8" r="4"/>
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
        </svg>
        <span style={{fontSize: 10}}>profile</span>
      </Link>

    </nav>
  )
}