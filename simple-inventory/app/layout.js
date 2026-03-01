import './globals.css'

export const metadata = {
  title: 'Sistem Inventory Saya',
  description: 'Dibuat dengan Next.js dan Firebase',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-white text-gray-900">
        {/* Kamu bisa menambah Navbar di sini nanti */}
        {children}
      </body>
    </html>
  )
}