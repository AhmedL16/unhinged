'use client'

import Link from 'next/link'

export default function BottomNav() {
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
      padding: '8px 0'
    }}>
      <Link href="/" style={{color: 'white', textAlign: 'center', fontSize: 12}}>
        <div>🏠</div>
        <div>home</div>
      </Link>
      <Link href="/search" style={{color: '#71717a', textAlign: 'center', fontSize: 12}}>
        <div>🔍</div>
        <div>search</div>
      </Link>
      <Link href="/join" style={{color: '#71717a', textAlign: 'center', fontSize: 12}}>
        <div>➕</div>
        <div>join</div>
      </Link>
      <Link href="/admin" style={{color: '#71717a', textAlign: 'center', fontSize: 12}}>
        <div>👤</div>
        <div>admin</div>
      </Link>
    </nav>
  )
}