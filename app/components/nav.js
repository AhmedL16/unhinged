'use client'

import Link from 'next/link'

export default function Nav() {
  return (
    <header style={{
      width: '100%',
      padding: '12px 16px',
      display: 'flex',
      alignItems: 'center',
      borderBottom: '1px solid #1f1f1f',
      backgroundColor: '#0a0a0a',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      <Link href="/" style={{color: '#fff', fontWeight: 700, fontSize: '20px', textDecoration: 'none', letterSpacing: '-0.5px'}}>
        unhinged
      </Link>
    </header>
  )
}