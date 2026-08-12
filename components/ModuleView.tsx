import type { Module } from '@/lib/modules'

interface Props {
  module: Module
  checked: boolean
  onCheck: (v: boolean) => void
  onNext: () => void
}

export default function ModuleView({ module: m, checked, onCheck, onNext }: Props) {
  return (
    <div className="moduleContent">
      <div className="moduleEyebrow">
        <div className={`moduleNum ${m.colorClass}`}>{m.id}</div>
        <span className="moduleLabel">{m.label}</span>
      </div>

      <h2 className="moduleTitle">{m.title}</h2>
      <p className="moduleIntro">{m.intro}</p>

      {m.content}

      <div className="readConfirm">
        <p>
          By checking the box below, you confirm you have read and understood this module and
          agree to comply with all applicable standards in every clinical environment you access.
        </p>
        <div className="checkboxRow">
          <input
            type="checkbox"
            id={`check-${m.id}`}
            checked={checked}
            onChange={e => onCheck(e.target.checked)}
          />
          <label htmlFor={`check-${m.id}`}>{m.checkLabel}</label>
        </div>
        <button
          className="btn btnPrimary"
          disabled={!checked}
          onClick={onNext}
        >
          {m.nextLabel}
        </button>
      </div>
    </div>
  )
}
