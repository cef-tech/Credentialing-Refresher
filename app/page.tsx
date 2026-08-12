'use client'

import { useState } from 'react'
import Landing from '@/components/Landing'
import CourseShell from '@/components/CourseShell'
import Completion from '@/components/Completion'
import Certificate from '@/components/Certificate'

export type View = 'landing' | 'course' | 'completion' | 'certificate'

export interface UserData {
  name: string
  company: string
  repId: string
}

export interface CertData extends UserData {
  esig: string
  date: string
}

export default function Home() {
  const [view, setView] = useState<View>('landing')
  const [userData, setUserData] = useState<UserData>({ name: '', company: '', repId: '' })
  const [completed, setCompleted] = useState<Record<number, boolean>>({
    1: false, 2: false, 3: false, 4: false,
    5: false, 6: false, 7: false, 8: false,
  })
  const [certData, setCertData] = useState<CertData | null>(null)

  function handleStart(data: UserData) {
    setUserData(data)
    setView('course')
  }

  function handleModuleCheck(id: number, checked: boolean) {
    setCompleted(prev => ({ ...prev, [id]: checked }))
  }

  function handleCompletion() {
    setView('completion')
  }

  function handleGenerate(data: CertData) {
    setCertData(data)
    setView('certificate')
  }

  function handleRestart() {
    setView('landing')
    setUserData({ name: '', company: '', repId: '' })
    setCompleted({ 1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false })
    setCertData(null)
  }

  return (
    <>
      {view === 'landing' && <Landing onStart={handleStart} />}
      {view === 'course' && (
        <CourseShell
          completed={completed}
          onCheck={handleModuleCheck}
          onComplete={handleCompletion}
        />
      )}
      {view === 'completion' && (
        <Completion
          userData={userData}
          onGenerate={handleGenerate}
        />
      )}
      {view === 'certificate' && certData && (
        <Certificate data={certData} onRestart={handleRestart} />
      )}
    </>
  )
}
