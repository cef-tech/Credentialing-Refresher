'use client'

import { useState } from 'react'

interface Props {
  size?: 'large' | 'small'
  dark?: boolean
}

export default function TrackXLogo({ size = 'small', dark = false }: Props) {
  const [imgError, setImgError] = useState(false)
  const src = dark
    ? 'https://www.trackx.tech/images/logo.png'
    : 'https://www.trackx.tech/images/logoW.png'

  const height = size === 'large' ? 48 : 28

  if (imgError) {
    return (
      <div
        className="trackxWordmark"
        style={{ fontSize: size === 'large' ? 26 : 16, color: dark ? '#0A1628' : '#fff' }}
      >
        Track<span style={{ color: '#00AEEF' }}>X</span>
      </div>
    )
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="TrackX Technology"
      height={height}
      style={{
        height,
        filter: dark ? 'none' : 'brightness(0) invert(1)',
        display: 'block',
      }}
      onError={() => setImgError(true)}
    />
  )
}
