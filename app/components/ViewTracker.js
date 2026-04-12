'use client'

import { useEffect } from 'react'

export default function ViewTracker({ videoId }) {
  useEffect(() => {
    fetch('/api/views', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ videoId })
    })
  }, [])

  return null
}