import React from 'react'

export interface Module {
  id: number
  emoji: string
  shortTitle: string
  title: string
  label: string
  intro: string
  colorClass: string
  checkLabel: string
  nextLabel: string
  content: React.ReactNode
}

// ── Shared sub-components used in module content ──

export function SectionBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="sectionBlock">
      <h3>{title}</h3>
      {children}
    </div>
  )
}

export function InfoList({ items }: { items: (string | React.ReactNode)[] }) {
  return (
    <ul className="infoList">
      {items.map((item, i) => <li key={i}>{item}</li>)}
    </ul>
  )
}

export function AlertBox({ type, children }: { type: 'red' | 'amber' | 'blue' | 'green' | 'purple'; children: React.ReactNode }) {
  const cls = { red: 'alertRed', amber: 'alertAmber', blue: 'alertBlue', green: 'alertGreen', purple: 'alertPurple' }[type]
  const icon = { red: '🚨', amber: '⚠️', blue: '💡', green: '💬', purple: '💡' }[type]
  return (
    <div className={`alertBox ${cls}`} style={{ marginTop: 12 }}>
      <span className="alertIcon">{icon}</span>
      <div>{children}</div>
    </div>
  )
}

export function AcronymGrid({ rows }: { rows: { letter: string; term: string; desc: string }[] }) {
  return (
    <div className="acronymGrid">
      {rows.map(r => (
        <React.Fragment key={r.letter}>
          <div className="acronymLetter">{r.letter}</div>
          <div className="acronymDef"><strong>{r.term}</strong><span>{r.desc}</span></div>
        </React.Fragment>
      ))}
    </div>
  )
}

export function TwoCol({ children }: { children: React.ReactNode }) {
  return <div className="twoCol" style={{ marginTop: 10 }}>{children}</div>
}

export function MiniCard({ title, body }: { title: string; body: string }) {
  return <div className="miniCard"><strong>{title}</strong><span>{body}</span></div>
}

export function DoseTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <table className="doseTable">
      <thead><tr>{headers.map(h => <th key={h}>{h}</th>)}</tr></thead>
      <tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j} dangerouslySetInnerHTML={{ __html: c }} />)}</tr>)}</tbody>
    </table>
  )
}

// ── MODULE DEFINITIONS ──

export const MODULES: Module[] = [
  {
    id: 1,
    emoji: '🔒',
    shortTitle: 'HIPAA',
    title: 'HIPAA Training',
    label: 'Module 1 · HIPAA · 45 CFR Parts 160 & 164',
    colorClass: 'modColor1',
    intro: 'The Health Insurance Portability and Accountability Act governs the privacy and security of protected health information. As a TrackX representative with regular clinical access, you encounter PHI routinely and carry both legal and ethical obligations to protect it.',
    checkLabel: 'I have read and understood the HIPAA Training module. I acknowledge my obligations as a Business Associate representative and commit to protecting PHI and ePHI in all clinical environments.',
    nextLabel: 'Continue to Bloodborne Pathogens →',
    content: (
      <>
        <SectionBlock title="📋 What Is Protected Health Information (PHI)?">
          <p>PHI is any individually identifiable health information in any format — verbal, paper, or electronic — that relates to a patient&apos;s health condition, care, or payment. The 18 HIPAA identifiers that render information &quot;protected&quot; include:</p>
          <TwoCol>
            <MiniCard title="Direct Identifiers" body="Name, address, DOB, phone, fax, email, SSN, MRN, health plan numbers, account numbers, dates of admission/discharge/procedure" />
            <MiniCard title="Indirect Identifiers" body="Device identifiers (including UDI), IP addresses, biometric identifiers, full-face photos, and any other unique identifying code" />
          </TwoCol>
        </SectionBlock>

        <SectionBlock title="🤝 TrackX as a Business Associate">
          <p>Because TrackX Technology accesses PHI while providing services to hospitals, the company qualifies as a <strong>Business Associate</strong> under HIPAA. This means TrackX must have a Business Associate Agreement (BAA) with each facility. As a field representative, your obligations:</p>
          <InfoList items={[
            <><strong>Minimum necessary access:</strong> Access PHI only to the extent required for your legitimate support role — case setup, navigation support, imaging review.</>,
            'Do not photograph, screenshot, or record any patient information — from OR monitors, imaging displays, EMR screens, or patient wristbands — without explicit written patient authorization.',
            'Do not discuss patient cases in hallways, elevators, cafeterias, or other non-private spaces.',
            'Case observations for training, marketing, or publications require a signed patient authorization form. Confirm with the facility\'s compliance office before any case documentation.',
            'Do not share case details — diagnosis, outcomes, complications — via personal email, personal text, or social media under any circumstances.',
          ]} />
        </SectionBlock>

        <SectionBlock title="🖥️ TrackX System Security & ePHI">
          <p>The TrackX platform may capture, display, or process patient imaging data that qualifies as electronic PHI (ePHI). Your device security obligations:</p>
          <InfoList items={[
            'Lock or log out of any TrackX device or workstation containing patient data when unattended — even momentarily.',
            'Never connect TrackX hardware to personal computers, personal cloud storage, or unauthorized networks.',
            'Use only company-approved, encrypted media for any data transfer involving ePHI.',
            'Report lost or stolen devices that may contain ePHI to your manager and TrackX\'s compliance team immediately. HIPAA breach notification timelines begin at discovery.',
          ]} />
        </SectionBlock>

        <AlertBox type="red">
          <strong>Breach Reporting:</strong> If you suspect a HIPAA breach — unauthorized access, accidental disclosure, or device loss — report it to TrackX compliance immediately. Do not investigate independently. Civil penalties range from $100 to $50,000 per violation; criminal penalties apply to willful violations.
        </AlertBox>
      </>
    ),
  },

  {
    id: 2,
    emoji: '🩸',
    shortTitle: 'Bloodborne Pathogens',
    title: 'Bloodborne Pathogens & Universal Precautions',
    label: 'Module 2 · OSHA 29 CFR 1910.1030',
    colorClass: 'modColor2',
    intro: 'This module satisfies OSHA\'s annual Bloodborne Pathogen training requirement. It focuses specifically on the exposure risks, protective measures, and response protocols relevant to medical device representatives who observe and support surgical procedures.',
    checkLabel: 'I have read and understood the Bloodborne Pathogens & Universal Precautions module. I acknowledge my responsibilities under OSHA 29 CFR 1910.1030 and my employer\'s Exposure Control Plan.',
    nextLabel: 'Continue to Radiation Safety →',
    content: (
      <>
        <SectionBlock title="⚠️ The Three Primary Bloodborne Pathogens">
          <InfoList items={[
            <><strong>HIV</strong> — Needlestick transmission risk ~0.3% from a known positive source. No cure; manageable with antiretrovirals. PEP must begin within 72 hours of exposure, ideally within 2 hours.</>,
            <><strong>Hepatitis B (HBV)</strong> — Transmission risk up to 30% without prophylaxis. Vaccine-preventable. HBV can survive on dry surfaces for up to 7 days — relevant for instrument handling and tray transport.</>,
            <><strong>Hepatitis C (HCV)</strong> — Needlestick transmission risk ~1.8%. No vaccine available. Leading cause of chronic liver disease and liver transplants in the U.S.</>,
          ]} />
        </SectionBlock>

        <SectionBlock title="🛡️ Standard & Universal Precautions for Device Reps">
          <p>Treat all blood and potentially infectious materials as infectious regardless of patient status. As a rep — typically not scrubbed in — your exposure points are instrument handling, tray transport, and proximity to the field:</p>
          <InfoList items={[
            <><strong>Gloves:</strong> Required any time you handle instruments, trays, trials, or implants that may have contacted blood or tissue. Change gloves between patients.</>,
            <><strong>Eye and face protection:</strong> Required when splashing, spraying, or aerosolization of blood is anticipated — including during powered instrument use, irrigation, or bone cutting near your position.</>,
            <><strong>Sharps awareness:</strong> Never recap needles, pass sharps hand-to-hand, or reach into sharps containers. Use instruments — not bare hands — to handle trial implants with cutting edges or sharp tips.</>,
            <><strong>Loaner tray transport:</strong> Contaminated instruments must be contained in a closed, rigid container before transport out of the OR. Never transport open, contaminated trays in hallways or elevators.</>,
            <><strong>Hand hygiene:</strong> Wash hands with soap and water immediately after removing gloves and before leaving the OR. Use alcohol-based hand rub at all OR entry and exit points.</>,
          ]} />
        </SectionBlock>

        <AlertBox type="red">
          <strong>Exposure Incident Response:</strong> Needlestick, contaminated sharp cut, mucous membrane splash, or non-intact skin contact with blood — wash immediately with soap and water (flush eyes/mucosa with water), report to OR supervisor, and seek medical evaluation before leaving the facility. Do not delay. File an incident report with TrackX and the facility.
        </AlertBox>

        <SectionBlock title="💉 HBV Vaccination">
          <p>Your employer is required to offer HBV vaccination at no cost. If you have declined, a signed declination must be on file. If previously vaccinated, confirm your titer documentation is current with your employer&apos;s occupational health records. You may request vaccination at any time.</p>
        </SectionBlock>

        <SectionBlock title="🏷️ Biohazard Labeling & Waste">
          <p>The universal biohazard symbol (orange/orange-red) marks regulated waste containers, blood product storage, and contaminated equipment. Red bags or containers may substitute. Never place non-waste items in biohazard containers. All loaner trays must be returned and reprocessed per TrackX&apos;s instrument reprocessing protocol and applicable facility policy.</p>
        </SectionBlock>
      </>
    ),
  },

  {
    id: 3,
    emoji: '☢️',
    shortTitle: 'Radiation Safety',
    title: 'X-Ray & Radiation Safety',
    label: 'Module 3 · NRC · ALARA · 21 CFR 1020.30 · ACR Guidelines',
    colorClass: 'modColor3',
    intro: 'TrackX Technology\'s core product relies on fluoroscopic X-ray imaging. As a TrackX representative, you are present during more fluoroscopic procedures than nearly any other clinical staff member. Understanding radiation safety is not just a regulatory requirement — it is a direct occupational health concern for you personally.',
    checkLabel: 'I have read and understood the X-Ray & Radiation Safety module. I acknowledge my obligations under NRC regulations and ALARA principles, and commit to proper use of radiation PPE in all fluoroscopy environments.',
    nextLabel: 'Continue to OR Protocols →',
    content: (
      <>
        <SectionBlock title="⚡ Types of Radiation in the Surgical Environment">
          <TwoCol>
            <MiniCard title="Ionizing Radiation (X-ray / Fluoroscopy)" body="Used in C-arm fluoroscopy and the TrackX workflow. Penetrates tissue and can damage DNA with cumulative exposure. The primary occupational concern for OR personnel." />
            <MiniCard title="Scatter Radiation" body="X-rays that deflect off the patient and travel in all directions. Scatter is the main source of exposure for non-primary-beam personnel, including device reps standing near the C-arm." />
          </TwoCol>
        </SectionBlock>

        <SectionBlock title="📐 ALARA — The Governing Principle">
          <p><strong>ALARA (As Low As Reasonably Achievable)</strong> is the foundational principle of radiation safety, required by the NRC and adopted by all healthcare facilities. It means using the minimum radiation dose necessary to achieve the clinical objective. As a TrackX rep, you support ALARA by:</p>
          <InfoList items={[
            'Reminding surgical teams that TrackX reduces the total number of X-rays required by enabling real-time virtual tracking between shots.',
            'Never encouraging additional X-rays beyond what the surgeon clinically requires.',
            'Ensuring the TrackX system is properly calibrated and set up before the case begins to avoid repeat exposures from system errors.',
            'Stepping back from the primary beam area whenever fluoroscopy is activated, even during setup and calibration shots.',
          ]} />
        </SectionBlock>

        <SectionBlock title="🛡️ The Three Principles of Radiation Protection">
          <InfoList items={[
            <><strong>Time:</strong> Minimize the duration of exposure. Step away during fluoroscopy activation whenever your physical presence is not required.</>,
            <><strong>Distance:</strong> Radiation intensity follows the inverse square law — doubling your distance reduces your dose to one-quarter. Step back at least 6 feet from the C-arm during X-ray activation when possible.</>,
            <><strong>Shielding:</strong> Lead aprons, thyroid collars, and lead glasses attenuate scatter radiation. Always wear a lead apron when you are in the OR during fluoroscopy. A thyroid collar is strongly recommended.</>,
          ]} />
        </SectionBlock>

        <SectionBlock title="🦺 Personal Protective Equipment for Radiation">
          <DoseTable
            headers={['PPE Item', 'Attenuation', 'Requirement Level']}
            rows={[
              ['<strong>Lead apron (0.5mm Pb)</strong>', 'Reduces scatter by ~90–95%', 'Required in OR during fluoroscopy'],
              ['<strong>Thyroid collar</strong>', 'Reduces thyroid dose by ~50%', 'Required at most facilities; strongly recommended'],
              ['<strong>Lead glasses</strong>', 'Reduces lens dose significantly', 'Recommended for high-volume fluoroscopy exposure'],
              ['<strong>Radiation dosimeter badge</strong>', 'N/A — monitoring device', 'Required if frequently present during fluoroscopy; wear at collar level outside apron'],
            ]}
          />
          <AlertBox type="amber">
            <strong>Dosimeter Policy:</strong> If your role involves regular fluoroscopy exposure, your employer is required to provide and track radiation monitoring badges. Wear your dosimeter every time you are in a room with active fluoroscopy. Do not share badges, store them in radiation fields, or leave them in your car.
          </AlertBox>
        </SectionBlock>

        <SectionBlock title="📊 Occupational Dose Limits (NRC / 10 CFR 20)">
          <DoseTable
            headers={['Body Region', 'Annual Limit']}
            rows={[
              ['Whole body (effective dose)', '5,000 mrem/year (50 mSv)'],
              ['Lens of the eye', '15,000 mrem/year'],
              ['Skin, hands, feet', '50,000 mrem/year'],
              ['Pregnant workers (declared pregnancy)', '500 mrem for the gestation period'],
            ]}
          />
          <p style={{ marginTop: 10 }}>If you are pregnant or may be pregnant, you have the right to declare your pregnancy to your employer in writing. Declared pregnant workers receive a separate, more protective dose limit. TrackX&apos;s compliance team can assist with radiation exposure review for declared pregnant employees.</p>
        </SectionBlock>

        <SectionBlock title="📍 Positioning During TrackX-Supported Cases">
          <InfoList items={[
            'During C-arm X-ray activation, position yourself at the opposite side of the C-arm from the X-ray tube (the image receptor side) — scatter is significantly lower on the detector side.',
            'Never stand in the primary beam path — the direct line between the X-ray tube and the image receptor — for any reason.',
            'If you must remain near the C-arm during fluoroscopy, stand perpendicular to the beam, behind available shielding, and as far back as the room allows.',
            'Use the TrackX system\'s real-time tracking display to reduce the number of confirmatory X-rays requested — this directly reduces cumulative dose for everyone in the room.',
            'During lateral fluoroscopy (side-view), scatter is highest on the tube side (usually the patient\'s right). Prioritize maximum distance on that side.',
          ]} />
        </SectionBlock>

        <AlertBox type="blue">
          <strong>TrackX & Radiation Reduction:</strong> Clinical data shows TrackX reduces X-ray frequency by up to 74.8% and radiation exposure by up to 91.8% per procedure. Understanding radiation safety allows you to speak credibly about these outcomes with surgeons and OR staff.
        </AlertBox>
      </>
    ),
  },

  {
    id: 4,
    emoji: '🏥',
    shortTitle: 'OR Protocols',
    title: 'OR Protocols',
    label: 'Module 4 · AORN · TJC · CMS Conditions of Participation',
    colorClass: 'modColor4',
    intro: 'The operating room functions under a structured set of protocols designed to protect patients, staff, and visitors. As a TrackX representative with regular OR access, adherence to these protocols is a condition of your facility access and a direct reflection on TrackX Technology.',
    checkLabel: 'I have read and understood the OR Protocols module. I acknowledge the standards governing OR access, attire, conduct, documentation, and my role in supporting safe surgical care.',
    nextLabel: 'Continue to Fire Safety →',
    content: (
      <>
        <SectionBlock title="🚪 Access, Credentialing & Check-In">
          <InfoList items={[
            'Check in with the OR front desk or materials management upon every facility arrival. Do not enter the OR suite without registering your presence and confirming you are on the case schedule.',
            'Carry your credentialing verification at all times — badge, digital verification, or platform confirmation (Reptrax, Vendormate, Symplr, or Intellicentrics). Know which platform each facility uses.',
            'Do not enter an OR room without permission from the circulating nurse, even for a "quick check." Knock or use the intercom.',
            'Secure all personal items (bags, phones, food) in vendor-designated areas before entering the OR suite.',
          ]} />
        </SectionBlock>

        <SectionBlock title="👗 Surgical Attire by Zone">
          <div className="twoCol">
            <div className="miniCard"><strong>Semi-Restricted Zone</strong><span>Scrub suit (hospital-provided or personal, per facility policy), surgical cap covering all hair. Clean closed-toe shoes or shoe covers.</span></div>
            <div className="miniCard"><strong>Restricted Zone (OR Room)</strong><span>All of the above plus surgical mask covering nose and mouth. Mask must be worn properly — no dangling, no under-nose wear. No jewelry visible below sleeve level.</span></div>
          </div>
        </SectionBlock>

        <SectionBlock title="⏱️ Time-Out & Universal Protocol">
          <InfoList items={[
            <><strong>Pre-procedure verification:</strong> Confirm correct patient, procedure, site, implants, and special equipment before the patient enters the room. Have your TrackX system fully set up and verified before the time-out begins.</>,
            <><strong>Site marking:</strong> The surgeon marks the operative site. For spine cases, confirm the correct levels are on the surgical order. If your navigation data identifies a discrepancy at any point, flag it immediately.</>,
            <><strong>Time-out:</strong> A complete pause immediately before incision. Stop all non-essential activity. When asked to confirm system readiness, implant availability, or TrackX setup status — respond clearly and accurately. If anything is uncertain, say so.</>,
          ]} />
        </SectionBlock>

        <SectionBlock title="📊 Instrument Counts & Implant Traceability">
          <InfoList items={[
            'Do not add items to the sterile field without coordinating with the scrub tech — unannounced additions disrupt count accuracy.',
            'If a count discrepancy occurs, do not leave the OR. Cooperate fully and account for all items from your trays.',
            'Provide UDI labels or implant stickers for every component implanted. Confirm they are logged in the facility\'s implant record.',
            'Never remove any item — including packaging — from the OR during an active case without notifying the circulator.',
            'Maintain accurate preference cards. Outdated cards are a leading contributor to wrong-implant events.',
          ]} />
        </SectionBlock>

        <SectionBlock title="🔇 Conduct & Communication">
          <InfoList items={[
            'Minimize conversation during critical phases — induction, intubation, critical dissection, closure.',
            'Do not offer clinical opinions to the patient. Some patients are awake under regional anesthesia and can hear everything said in the room.',
            'Keep your phone on silent. Step out for non-urgent calls. In-room phone use should be limited to product reference and IFU lookup only.',
            'If your TrackX system generates a warning, error, or unexpected output during a case — communicate it to the surgeon and circulator promptly and clearly.',
            'Disagreements with clinical decisions should be raised privately with the surgeon — never during the procedure unless it is an immediate patient safety issue.',
          ]} />
        </SectionBlock>

        <AlertBox type="purple">
          <strong>The Rep Standard:</strong> Your role is to support — not to direct. Clinical authority rests with the surgeon and OR team. The most valued representatives are those who are fully prepared, unobtrusive during critical moments, and speak up precisely when it matters most.
        </AlertBox>
      </>
    ),
  },

  {
    id: 5,
    emoji: '🔥',
    shortTitle: 'Fire Safety',
    title: 'Fire Safety',
    label: 'Module 5 · NFPA 101 · TJC EC.02.03.01',
    colorClass: 'modColor5',
    intro: 'The OR is one of the highest fire-risk environments in any building due to the simultaneous presence of ignition sources, oxidizers, and fuels. This module reviews the OR fire triangle, your response duties, and the RACE/PASS framework required by The Joint Commission and NFPA 101.',
    checkLabel: 'I have read and understood the Fire Safety module. I acknowledge my responsibilities under NFPA 101 and The Joint Commission fire safety standards in all clinical facilities I access.',
    nextLabel: 'Continue to Patient Safety Goals →',
    content: (
      <>
        <SectionBlock title="🔺 The OR Fire Triangle">
          <InfoList items={[
            <><strong>Ignition Sources:</strong> Electrosurgical units (ESU/Bovie), lasers, fiberoptic light cables left on drapes, defibrillators, powered instruments. ESUs are implicated in the majority of OR fires. TrackX equipment should never be placed near active ESU cables or holsters.</>,
            <><strong>Oxidizers:</strong> Oxygen and nitrous oxide. Open-delivery oxygen near the surgical field dramatically lowers the ignition threshold of normally non-flammable materials.</>,
            <><strong>Fuels:</strong> Drapes, gowns, gauze, alcohol-based prep solutions (must be fully dry before draping or energy activation — minimum 3 minutes), patient hair, intestinal gases, and endotracheal tubes.</>,
          ]} />
        </SectionBlock>

        <SectionBlock title="🚨 RACE — Fire Response Protocol">
          <AcronymGrid rows={[
            { letter: 'R', term: 'Rescue', desc: 'Remove any person in immediate danger. Prioritize patients who cannot self-evacuate. Do not use elevators.' },
            { letter: 'A', term: 'Alarm', desc: 'Activate the nearest pull station and call the facility\'s fire code (e.g., "Code Red" overhead page). Do not assume someone else has alarmed.' },
            { letter: 'C', term: 'Contain', desc: 'Close all doors and windows to limit fire and smoke spread. Do not prop fire-rated doors open. Fire doors provide up to 90 minutes of rated protection.' },
            { letter: 'E', term: 'Extinguish / Evacuate', desc: 'Attempt extinguishment only if the fire is small, contained, and you have a clear egress path. Otherwise evacuate to the designated assembly area via posted routes.' },
          ]} />
        </SectionBlock>

        <SectionBlock title="🧯 PASS — Extinguisher Technique">
          <AcronymGrid rows={[
            { letter: 'P', term: 'Pull', desc: 'Pull the safety pin from the handle to arm the extinguisher.' },
            { letter: 'A', term: 'Aim', desc: 'Aim the nozzle at the base of the fire — not the flames.' },
            { letter: 'S', term: 'Squeeze', desc: 'Squeeze the handle to discharge. Typical discharge is 10–15 seconds.' },
            { letter: 'S', term: 'Sweep', desc: 'Sweep side to side across the base of the fire. Watch for re-ignition. If the fire grows, evacuate immediately.' },
          ]} />
        </SectionBlock>

        <SectionBlock title="🗺️ Orientation Responsibilities">
          <p>Before beginning any case, identify: the nearest fire alarm pull station, nearest fire extinguisher, primary and secondary OR evacuation routes, the facility&apos;s fire code and paging protocol, and the location of horizontal evacuation areas (smoke compartments). Do not defer this orientation step.</p>
        </SectionBlock>
      </>
    ),
  },

  {
    id: 6,
    emoji: '✅',
    shortTitle: 'Patient Safety Goals',
    title: 'National Patient Safety Goals',
    label: 'Module 6 · The Joint Commission NPSGs · Current Year',
    colorClass: 'modColor6',
    intro: 'The Joint Commission\'s National Patient Safety Goals identify specific, high-priority areas where action is required to prevent serious patient harm. As a representative regularly present during surgical procedures, you are a member of the care team and share responsibility for a safe environment.',
    checkLabel: 'I have read and understood the National Patient Safety Goals module. I acknowledge my role in supporting patient safety, the Universal Protocol, and speak-up culture in every facility I enter.',
    nextLabel: 'Continue to Compliance & Ethics →',
    content: (
      <>
        <SectionBlock title="🪪 NPSG 01 — Patient Identification">
          <p>Use at least two patient identifiers (name + DOB, or name + MRN) before any procedure. Never use room number as an identifier. If your TrackX system displays patient imaging, verify the patient name and ID on screen match the surgical schedule before any case activity.</p>
        </SectionBlock>

        <SectionBlock title="📡 NPSG 02 — Communication">
          <p>Critical results must reach the responsible caregiver within defined timeframes. If your TrackX system displays data inconsistent with the surgical plan — unexpected anatomy, instrument position outside expected trajectory — communicate it to the surgeon and circulator immediately and clearly. Do not assume the discrepancy will be noticed.</p>
        </SectionBlock>

        <SectionBlock title="💊 NPSG 03 — Medication Safety">
          <p>All medications and solutions on and off the sterile field must be labeled. If your setup involves any fluid (saline for irrigation, contrast, bone substitute), ensure labeling per facility policy. Do not handle, move, or relabel any medication. If you observe an unlabeled syringe or container on the sterile field, alert the scrub tech.</p>
        </SectionBlock>

        <SectionBlock title="🔔 NPSG 06 — Alarm Safety">
          <p>Do not silence, disable, or adjust any patient monitoring alarm. If your TrackX system generates an alert or system error during a case, communicate it to the surgeon and circulator promptly. Do not dismiss TrackX system alarms without proper evaluation — some system warnings directly relate to tracking accuracy, which affects patient safety.</p>
        </SectionBlock>

        <SectionBlock title="🦠 NPSG 07 — Infection Prevention">
          <p>Hand hygiene compliance is the most effective single measure for preventing healthcare-associated infections. Comply at every entry and exit point. Do not enter the sterile field without proper gowning and gloving by the scrub tech. If you break technique — declare it immediately.</p>
        </SectionBlock>

        <SectionBlock title="✅ Universal Protocol">
          <InfoList items={[
            <><strong>Site marking:</strong> For spine cases with multi-level exposure, confirm the correct level(s) are on the surgical order. If your TrackX imaging identifies a discrepancy between the planned and actual level, flag it before proceeding.</>,
            <><strong>Time-out:</strong> Stop all activity. Participate when addressed. Confirm TrackX system readiness, calibration status, and imaging availability clearly and accurately.</>,
            <><strong>Speak-up obligation:</strong> Any team member — including vendor representatives — is expected to raise safety concerns. If you observe a wrong implant being opened, a labeling discrepancy, or a TrackX output that contradicts the surgical plan — speak up immediately.</>,
          ]} />
        </SectionBlock>
      </>
    ),
  },

  {
    id: 7,
    emoji: '⚖️',
    shortTitle: 'Compliance & Ethics',
    title: 'Compliance, AdvaMed Code of Ethics & Fraud',
    label: 'Module 7 · AdvaMed Code · AKS · False Claims Act · OIG',
    colorClass: 'modColor7',
    intro: 'Medical device sales and clinical support activities are governed by federal law, industry codes, and company policy. Violations carry serious civil and criminal consequences — including personal liability for individual representatives.',
    checkLabel: 'I have read and understood the Compliance, AdvaMed Code of Ethics, and Fraud Training module. I acknowledge my obligations under the AKS, False Claims Act, AdvaMed Code, and TrackX\'s compliance program.',
    nextLabel: 'Continue to Aseptic Awareness →',
    content: (
      <>
        <SectionBlock title="📜 AdvaMed Code of Ethics">
          <InfoList items={[
            <><strong>Meals and hospitality:</strong> Must be modest in value, occur in an appropriate business setting, and not include non-HCP guests (family, friends). Standalone entertainment — sporting events, concerts, golf — is not permitted.</>,
            <><strong>Educational items:</strong> Must serve a genuine educational purpose, be modest in value, and never serve as an inducement to purchase or use your products.</>,
            <><strong>Consulting and speaking arrangements:</strong> Must reflect fair market value, be documented with a written agreement, and be independent of purchasing decisions.</>,
            <><strong>Loaner equipment:</strong> Provided only for legitimate evaluation, demonstration, or patient use — never as an unstated inducement or substitute for purchase.</>,
          ]} />
        </SectionBlock>

        <SectionBlock title="⚖️ Anti-Kickback Statute (AKS)">
          <p>The AKS (42 U.S.C. § 1320a-7b(b)) prohibits offering, paying, soliciting, or receiving anything of value to induce or reward referrals of items or services covered by federal healthcare programs. Violations can be criminal even without explicit intent:</p>
          <InfoList items={[
            'Excessive meals, entertainment, or gifts to physicians who use or influence purchase of TrackX products — even framed as "relationship building" — is a potential AKS violation.',
            'Above-fair-market-value payments for speaking or consulting arrangements can constitute illegal remuneration.',
            <><strong>Penalties:</strong> Up to $100,000 per violation, up to 10 years imprisonment, and exclusion from federal healthcare programs.</>,
          ]} />
        </SectionBlock>

        <SectionBlock title="📄 False Claims Act (FCA)">
          <InfoList items={[
            'Submitting claims for devices not actually implanted, or billing for a higher-cost device than used, is fraud.',
            'Off-label promotion that leads to reimbursement claims can trigger FCA liability.',
            'The FCA includes a whistleblower (qui tam) provision — employees who report violations may receive 15–30% of government recoveries. Retaliation against whistleblowers is prohibited.',
            <><strong>Penalties:</strong> $13,000–$26,000 per false claim, plus three times actual damages.</>,
          ]} />
        </SectionBlock>

        <SectionBlock title="📣 Off-Label Promotion">
          <p>Promote TrackX products only for cleared indications per approved labeling and company-approved messaging. If a surgeon asks about an off-label use, you may acknowledge the question and direct them to peer-reviewed literature — you may not promote or endorse that use yourself. Never create or distribute materials referencing off-label uses without explicit approval from TrackX&apos;s regulatory and legal teams.</p>
        </SectionBlock>

        <AlertBox type="red">
          <strong>Reporting Obligations:</strong> If you observe potential compliance violations — improper payments, false billing, off-label promotion, AKS concerns — report through TrackX&apos;s compliance channel. Anonymous reporting options are available. Non-retaliation policies protect employees who report in good faith.
        </AlertBox>

        <SectionBlock title="📝 Day-to-Day Compliance Practices">
          <InfoList items={[
            'Document all HCP interactions involving anything of value — same day, every time, in the designated tracking system.',
            'When in doubt about whether an activity is compliant, ask TrackX\'s compliance officer before proceeding.',
            'Do not allow a long-standing customer relationship to override compliance obligations.',
            'Keep your training records and credentialing documentation current. Lapsed compliance training is a compliance deficiency that can affect your facility access.',
          ]} />
        </SectionBlock>
      </>
    ),
  },

  {
    id: 8,
    emoji: '🧤',
    shortTitle: 'Aseptic Awareness',
    title: 'Aseptic Awareness for Device Representatives',
    label: 'Module 8 · AORN Standards · Rep-Specific Scope',
    colorClass: 'modColor8',
    intro: 'This module is specifically scoped to the role of a non-scrubbed medical device representative. It covers what you need to know to protect the sterile environment, avoid contamination events, and respond correctly if sterility is compromised — without overreaching into clinical roles that are not yours.',
    checkLabel: 'I have read and understood the Aseptic Awareness for Device Representatives module. I acknowledge my responsibility to maintain and protect the sterile environment in my role as a non-scrubbed vendor representative.',
    nextLabel: 'Proceed to Sign & Certify →',
    content: (
      <>
        <SectionBlock title="🧬 The Core Rule">
          <p>As a non-scrubbed vendor representative, you are an unsterile person in a sterile environment. The fundamental rule is simple: <strong>do not touch the sterile field, sterile items, or the sterile drape perimeter.</strong></p>
          <InfoList items={[
            'Maintain at least 12 inches of physical distance from any sterile surface or draped field.',
            'When passing near the sterile field, face it — never turn your back to it.',
            'Do not reach across the sterile field for any reason — not to point, not to adjust a monitor, not to retrieve a dropped item.',
            'Items that fall below the level of the sterile field (the table edge or below) are considered contaminated. Do not retrieve and return them to the field.',
          ]} />
        </SectionBlock>

        <SectionBlock title="📦 Opening and Presenting Sterile Supplies">
          <p>As a TrackX representative, you regularly open sterile disposables and implant packaging for transfer to the sterile field. The correct technique every time:</p>
          <InfoList items={[
            <><strong>Inspect before opening:</strong> Check packaging for tears, pinholes, moisture, broken seals, and expiration dates. If integrity is in doubt — do not open it.</>,
            <><strong>Peel-pack technique:</strong> Open by peeling the wrapper back smoothly and evenly. Present the sterile contents to the scrub tech without allowing the outer wrapper to contact the sterile field or the contents.</>,
            'Do not flip or toss items onto the sterile field — present them at the edge for the scrub tech to retrieve.',
            <><strong>Announce every item</strong> as you open it: item type, size, lot number. This is essential for documentation, counts, and wrong-implant prevention.</>,
            <><strong>If you drop a sterile item or it contacts an unsterile surface</strong> — declare it contaminated immediately and retrieve a replacement. Never minimize or conceal a contamination event.</>,
          ]} />
        </SectionBlock>

        <SectionBlock title="🚨 Recognizing and Responding to Sterility Breaks">
          <InfoList items={[
            'If you observe anyone — scrubbed or unscrubbed — breach the sterile field, speak up immediately: "I think there may have been a break in technique."',
            'If a sterile drape becomes wet (strike-through contamination), notify the scrub tech immediately — that area is no longer sterile.',
            'If any component that will contact the sterile field is dropped or contacts an unsterile surface, declare it and obtain a replacement.',
            'Declaring a sterility break is never optional, even if it causes delay or embarrassment. Surgical site infections are a life-threatening outcome — a brief pause is always the right call.',
          ]} />
        </SectionBlock>

        <SectionBlock title="🧴 Hand Hygiene as Aseptic Practice">
          <p>For non-scrubbed representatives, standard hand hygiene — not surgical scrub — is the expectation. Wash hands or use alcohol-based hand rub at every OR entry and exit, after glove removal, and any time hands are potentially contaminated. Do not enter the OR with visibly soiled hands under any circumstances.</p>
        </SectionBlock>

        <AlertBox type="amber">
          <strong>Common Rep Errors to Avoid:</strong> Reaching across the sterile field to point at an implant; opening packaging too close to the field causing wrapper contact; touching a sterile item &quot;just to check&quot; without gloves; failing to declare a contamination event to avoid disrupting the case flow. All of these have resulted in patient infections.
        </AlertBox>
      </>
    ),
  },
]
