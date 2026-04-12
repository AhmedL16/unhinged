import { Outfit } from 'next/font/google'
import './globals.css'
import Nav from './components/nav'
import BottomNav from './components/BottomNav'

const OutfitFont = Outfit({ subsets: ['latin'] })

export const metadata = {
  title: 'unhinged',
  description: 'real creators, no algorithm',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={OutfitFont.className} style={{margin: 0, padding: 0, backgroundColor: '#0a0a0a', overflowX: 'hidden'}}>
        <Nav />
        <div style={{paddingBottom: '80px'}}>
          {children}
        </div>
        <BottomNav />
      </body>
    </html>
  )
}