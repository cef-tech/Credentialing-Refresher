'use client'

import { useState } from 'react'
import type { UserData } from '@/app/page'
import { MODULES } from '@/lib/modules'
import TrackXLogo from './TrackXLogo'

interface Props {
  onStart: (data: UserData) => void
}

export default function Landing({ onStart }: Props) {
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [repId, setRepId] = useState('')

  function handleSubmit() {
    if (!name.trim()) {
      alert('Please enter your full name to begin.')
      return
    }
    onStart({ name: name.trim(), company: company.trim(), repId: repId.trim() })
  }

  return (
    <div className="landing">
      <div className="trackxLogoWrap">
        <TrackXLogo size="large" />
      </div>

      <div className="badge">Annual Compliance Credentialing Refresher</div>

      <h1 className="heroTitle">
        Eight Modules. One Certificate.<br />
        <em>Full Compliance, Done Right.</em>
      </h1>

      <p className="heroSub">
        A streamlined read-and-acknowledge refresher covering all core compliance and clinical
        credentialing requirements for TrackX Technology field representatives.
        Estimated time: 35–45 minutes.
      </p>

      <div className="moduleCards">
        {MODULES.map(m => (
          <div key={m.id} className="moduleCard">
            <span className="moduleIcon">{m.emoji}</span>
            <h3>Module {m.id}</h3>
            <p>{m.shortTitle}</p>
          </div>
        ))}
      </div>

      <div className="nameForm">
        <label htmlFor="input-name">Your Full Name</label>
        <input
          id="input-name"
          type="text"
          placeholder="First and Last Name"
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
        />
        <div className="nameFormRow">
          <input
            type="text"
            placeholder="Territory / Region"
            value={company}
            onChange={e => setCompany(e.target.value)}
          />
          <input
            type="text"
            placeholder="Rep ID (optional)"
            value={repId}
            onChange={e => setRepId(e.target.value)}
          />
        </div>
        <button
          className="btn btnPrimary btnFull"
          onClick={handleSubmit}
          style={{ marginTop: 8 }}
        >
          Begin Course →
        </button>
        <p style={{ fontSize: 11.5, color: 'var(--text-muted)', marginTop: 4 }}>
          8 modules · Estimated 35–45 minutes · Certificate issued upon completion
        </p>
      </div>
    </div>
  )
}
