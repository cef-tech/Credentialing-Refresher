import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TrackX Technology | Annual Compliance Credentialing Refresher',
  description: 'Annual compliance credentialing refresher for TrackX Technology field representatives. Covers HIPAA, Bloodborne Pathogens, Radiation Safety, OR Protocols, Fire Safety, Patient Safety Goals, Compliance & Ethics, and Aseptic Awareness.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
