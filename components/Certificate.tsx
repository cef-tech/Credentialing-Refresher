import type { CertData } from '@/app/page'
import TrackXLogo from './TrackXLogo'

const CERT_MODULES = [
  '🔒 HIPAA',
  '🩸 Bloodborne Pathogens',
  '☢️ Radiation Safety',
  '🏥 OR Protocols',
  '🔥 Fire Safety',
  '✅ Patient Safety Goals',
  '⚖️ Compliance & Ethics',
  '🧤 Aseptic Awareness',
]

interface Props {
  data: CertData
  onRestart: () => void
}

export default function Certificate({ data, onRestart }: Props) {
  const companyLine = data.company
    ? `TrackX Technology — ${data.company}`
    : 'TrackX Technology'

  return (
    <div className="certPage">
      <div className="certWrap" id="cert-inner">
        <div className="certAccentBar" />

        {/* Logo row */}
        <div className="certLogoRow">
          <TrackXLogo size="small" dark />
          <div className="certLogoDivider" />
          <div className="certLogoText">
            <div className="certCompanyName">
              Track<span>X</span> Technology
            </div>
            <div className="certSubtitle">Annual Compliance Credentialing</div>
          </div>
        </div>

        {/* Title */}
        <div className="certTitleRow">
          <h1>Certificate of Completion</h1>
          <p>Annual Compliance Credentialing Refresher · Medical Device Professional</p>
        </div>

        <p className="certPresents">This certifies that</p>
        <div className="certName">{data.name}</div>
        <p className="certCompanyLine">{companyLine}</p>
        <p className="certBody">has successfully completed all required modules of the</p>
        <div className="certCourseName">
          TrackX Technology Annual Compliance Credentialing Refresher
        </div>

        <div className="certModules">
          {CERT_MODULES.map(m => (
            <div key={m} className="certMod">{m}</div>
          ))}
        </div>

        <p className="certStandards">
          Satisfies annual credentialing requirements per HIPAA (45 CFR 160/164),
          OSHA 29 CFR 1910.1030, NRC/ALARA Radiation Standards, AORN OR Protocol Standards,
          NFPA 101, The Joint Commission NPSGs, AdvaMed Code of Ethics,
          Anti-Kickback Statute, and False Claims Act
        </p>

        <div className="certSigRow">
          <div className="certSigBlock">
            <div className="certSig">{data.esig}</div>
            <div className="certSigLabel">Representative Signature</div>
          </div>
          <div className="certSigBlock">
            <div className="certSig">TrackX Technology</div>
            <div className="certSigLabel">Issuing Organization</div>
          </div>
        </div>

        <div className="certFooter">
          <span>Completion Date: <strong>{data.date}</strong></span>
          <span>Rep ID: <strong>{data.repId || '—'}</strong></span>
          <span>Valid for 12 months from date of completion</span>
        </div>
      </div>

      <div className="certActions">
        <button className="btn btnPrimary" onClick={() => window.print()}>
          🖨 Print Certificate
        </button>
        <button className="btn btnGhost" onClick={onRestart}>
          Start New Completion
        </button>
      </div>
    </div>
  )
}
