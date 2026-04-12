import { Inter } from 'next/font/google'
import './globals.css'
import Nav from './components/nav'
import BottomNav from './components/BottomNav'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'unhinged',
  description: 'real creators, no algorithm',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className + ' bg-zinc-950'}>
        <Nav />
        <div className="pb-20">
          {children}
        </div>
        <BottomNav />
      </body>
    </html>
  )
}