import './globals.css'

export const metadata = {
  title: 'Mayavi Test Examples',
  description: 'Testing the Mayavi package functionality',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">{children}</body>
    </html>
  )
} 