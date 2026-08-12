'use client'

import { useState } from 'react'
import type { UserData, CertData } from '@/app/page'

interface Props {
  userData: UserData
  onGenerate: (data: CertData) => void
}

export default function Completion({ userData, onGenerate }: Props) {
  const [name, setName] = useState(userData.name)
  const [company, setCompany] = useState(userData.company)
  const [repId, setRepId] = useState(userData.repId)
  const [esig, setEsig] = useState('')
  const [agreed, setAgreed] = useState(false)

  const date = new Date().toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  const canGenerate = agreed && esig.trim().length > 2

  function handleGenerate() {
    onGenerate({ name, company, repId, esig, date })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const MODULES_LIST = [
    'Module 1 – HIPAA',
    'Module 2 – Bloodborne Pathogens & Universal Precautions',
    'Module 3 – X-Ray & Radiation Safety',
    'Module 4 – OR Protocols',
    'Module 5 – Fire Safety',
    'Module 6 – National Patient Safety Goals',
    'Module 7 – Compliance, AdvaMed Code & Fraud',
    'Module 8 – Aseptic Awareness for Device Representatives',
  ]

  return (
    <div className="completionPage">
      <div className="completionHero">
        <div className="completionSeal">🎓</div>
        <h2>All 8 Modules Complete</h2>
        <p>
          Review your information, read the attestation, and provide your electronic signature
          to generate your TrackX certificate of completion.
        </p>
      </div>

      {/* Info block */}
      <div className="signBlock">
        <h3>Confirm Your Information</h3>
        <p>This information will appear on your certificate. Verify accuracy before signing.</p>

        <div className="signField">
          <label htmlFor="sig-name">Full Name</label>
          <input
            id="sig-name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Your full name"
          />
        </div>

        <div className="signRow">
          <div className="signField">
            <label htmlFor="sig-company">Territory / Region</label>
            <input
              id="sig-company"
              type="text"
              value={company}
              onChange={e => setCompany(e.target.value)}
              placeholder="Territory or region"
            />
          </div>
          <div className="signField">
            <label htmlFor="sig-rep">Rep ID (optional)</label>
            <input
              id="sig-rep"
              type="text"
              value={repId}
              onChange={e => setRepId(e.target.value)}
              placeholder="Optional"
            />
          </div>
        </div>
      </div>

      {/* Attestation block */}
      <div className="signBlock">
        <h3>Attestation Statement</h3>

        <div className="attestationBox">
          I, <strong>{name || '[Full Name]'}</strong>, hereby attest that I have personally
          reviewed and understood all content in this TrackX Technology Annual Compliance
          Credentialing Refresher, including:{' '}
          {MODULES_LIST.map((m, i) => (
            <span key={i}><strong>{m}</strong>{i < MODULES_LIST.length - 1 ? ', ' : '.'}</span>
          ))}
          <br /><br />
          I understand my obligations under each standard and commit to applying these principles
          in every clinical environment and business interaction. I acknowledge that this refresher
          reinforces — but does not replace — my foundational training, TrackX Technology&apos;s
          internal policies, or facility-specific requirements.
          <br /><br />
          <strong>Completion date: {date}</strong>
        </div>

        <div className="checkboxRow">
          <input
            type="checkbox"
            id="final-check"
            checked={agreed}
            onChange={e => setAgreed(e.target.checked)}
          />
          <label htmlFor="final-check">
            I have read the attestation above and confirm its accuracy. I understand this
            electronic acknowledgment carries the same weight as a handwritten signature for
            credentialing documentation purposes.
          </label>
        </div>

        <div className="signField" style={{ marginTop: 14 }}>
          <label htmlFor="esig">Electronic Signature — Type Your Full Name</label>
          <input
            id="esig"
            type="text"
            value={esig}
            onChange={e => setEsig(e.target.value)}
            placeholder="Type your full name to sign"
          />
        </div>

        <button
          className="btn btnPrimary btnFull"
          disabled={!canGenerate}
          onClick={handleGenerate}
          style={{ marginTop: 10 }}
        >
          Generate Certificate of Completion
        </button>
      </div>
    </div>
  )
}
