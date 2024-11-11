export const metadata = {
  title: 'Lecturely',
  description: 'Lecturely is a platform for students to meaw meaw meaw',
}

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet"/>
      </head>
      <body>{children}</body>
      </html>
  )
}