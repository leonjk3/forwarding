import { useState } from 'react'
import './App.css'

function App() {
  const [status, setStatus] = useState('연결 확인 전')
  const [pending, setPending] = useState(false)
  async function checkHealth() {
    setPending(true)
    setStatus('연결 확인 중…')
    try {
      const response = await fetch('/actuator/health', { signal: AbortSignal.timeout(5000) })
      const health = await response.json()
      if (!response.ok || health.status !== 'UP') throw new Error('unavailable')
      setStatus('API와 데이터베이스가 정상 연결되었습니다.')
    } catch {
      setStatus('연결할 수 없습니다. 백엔드와 PostgreSQL 실행 상태를 확인하세요.')
    } finally {
      setPending(false)
    }
  }
  return (
    <main>
      <span className="eyebrow">FORWARDING / LOCAL DEVELOPMENT</span>
      <h1>운송의 시작부터,<br />법인 간 협업까지.</h1>
      <p className="intro">FCL · LCL · 완성차 운송을 위한 포워딩 플랫폼</p>
      <section aria-labelledby="health-title">
        <h2 id="health-title">개발 환경 연결</h2>
        <p role="status" aria-live="polite">{status}</p>
        <button onClick={checkHealth} disabled={pending}>{pending ? '확인 중…' : '연결 확인'}</button>
      </section>
      <p className="note">프로젝트 초기 구성 단계입니다. 로그인·법인 권한·운송 주문은 다음 단계에서 구현합니다.</p>
    </main>
  )
}
export default App
