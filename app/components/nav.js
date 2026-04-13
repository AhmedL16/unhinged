'use client'

import Link from 'next/link'

export default function Nav() {
  return (
    <header style={{
      width: '100%',
      padding: '12px 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid #1f1f1f',
      backgroundColor: '#0a0a0a',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      <Link href="/" style={{color: '#fff', fontWeight: 700, fontSize: '20px', textDecoration: 'none', letterSpacing: '-0.5px'}}>
        unhinged
      </Link>
      <Link href="/search" style={{color: '#888', textDecoration: 'none'}}>
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
      </Link>
    </header>
  )
}