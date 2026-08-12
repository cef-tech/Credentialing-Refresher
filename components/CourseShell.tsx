'use client'

import { useState } from 'react'
import { MODULES } from '@/lib/modules'
import ModuleView from './ModuleView'
import TrackXLogo from './TrackXLogo'

interface Props {
  completed: Record<number, boolean>
  onCheck: (id: number, checked: boolean) => void
  onComplete: () => void
}

export default function CourseShell({ completed, onCheck, onComplete }: Props) {
  const [activeModule, setActiveModule] = useState(1)

  const doneCount = Object.values(completed).filter(Boolean).length
  const pct = Math.round((doneCount / 8) * 100)

  function handleNext(id: number) {
    if (id < 8) {
      setActiveModule(id + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      onComplete()
    }
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Header */}
      <div className="courseHeader">
        <div className="headerLogo">
          <TrackXLogo size="small" />
          <div className="headerDivider" />
          <div className="headerCourseName">Compliance Credentialing</div>
        </div>
        <div className="progressBarWrap">
          <div className="progressBarFill" style={{ width: `${pct}%` }} />
        </div>
        <div className="progressLabel">
          Module {activeModule} of 8 · {doneCount}/8 complete
        </div>
      </div>

      {/* Tabs */}
      <div className="moduleTabs">
        {MODULES.map(m => (
          <button
            key={m.id}
            className={[
              'tabBtn',
              activeModule === m.id ? 'tabBtnActive' : '',
              completed[m.id] ? 'tabBtnCompleted' : '',
            ].join(' ')}
            onClick={() => { setActiveModule(m.id); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          >
            {m.emoji} <span>{m.shortTitle}</span>
            {completed[m.id] && <span className="tabCheck">✓</span>}
          </button>
        ))}
      </div>

      {/* Module Content */}
      {MODULES.map(m => (
        activeModule === m.id && (
          <ModuleView
            key={m.id}
            module={m}
            checked={completed[m.id]}
            onCheck={v => onCheck(m.id, v)}
            onNext={() => handleNext(m.id)}
          />
        )
      ))}
    </div>
  )
}
