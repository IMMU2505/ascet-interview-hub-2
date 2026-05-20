import './globals.css'

export const metadata = {
  title: 'ASCET Interview Hub',
  description: 'Practice coding interviews',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}