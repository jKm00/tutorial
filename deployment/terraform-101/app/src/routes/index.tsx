import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import Snow from '../components/Snow'

export const Route = createFileRoute('/')({
  component: App,
})

function Tree({ lightsOn }: { lightsOn: boolean }) {
  // Simple stylized tree using SVG; lights toggle visibility via CSS class
  return (
    <svg viewBox="0 0 200 260" width="220" height="280" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="tr" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#1b8a3a" />
          <stop offset="100%" stopColor="#0b6b2c" />
        </linearGradient>
      </defs>
      <g transform="translate(100,20)">
        {/* three symmetric layers forming the tree */}
        <polygon points="0,0 -80,80 80,80" fill="url(#tr)" />
        <polygon points="0,40 -90,140 90,140" fill="url(#tr)" />
        <polygon points="0,80 -100,200 100,200" fill="url(#tr)" />
        <rect x="-20" y="200" width="40" height="40" rx="6" fill="#5b3319" />

        <g className={lightsOn ? 'lights-on' : 'lights-off'}>
          {/* Ornaments + lights are now part of the twinkling lights group */}
          <circle cx="-40" cy="100" r="6" fill="#e63946" />
          <circle cx="20" cy="125" r="6" fill="#ffd166" />
          <circle cx="40" cy="80" r="6" fill="#a8dadc" />
          <circle cx="-10" cy="50" r="6" fill="#f72585" />

          <circle cx="-60" cy="150" r="4" fill="#ffe66d" />
          <circle cx="60" cy="150" r="4" fill="#ff6b6b" />
          <circle cx="0" cy="170" r="4" fill="#9b5de5" />
          <circle cx="40" cy="110" r="4" fill="#4cc9f0" />
        </g>
      </g>
    </svg>
  )
}

function App() {
  const [greeting, setGreeting] = useState('Merry Christmas!')
  const [input, setInput] = useState('')
  const [lights, setLights] = useState(true)

  return (
    <div className="festive-container">
      <Snow count={60} />
      <main className="card">
        <section className="hero">
          <h1 className="greeting">{greeting}</h1>
          <p className="sub">A tiny festive interactive example — tweak the message and toggle lights.</p>

          <div className="controls">
            <input
              aria-label="greeting"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a custom greeting"
              className="btn"
              style={{ minWidth: 200 }}
            />
            <button
              className="btn primary"
              onClick={() => {
                setGreeting(input.trim() || 'Merry Christmas!')
                setInput('')
              }}
            >
              Set Greeting
            </button>
            <button
              className="btn ghost"
              onClick={() => {
                setGreeting('Merry Christmas!')
                setInput('')
              }}
            >
              Reset
            </button>
            <button
              className="btn"
              onClick={() => setLights((s) => !s)}
              aria-pressed={lights}
            >
              {lights ? 'Turn Lights Off' : 'Turn Lights On'}
            </button>
          </div>
        </section>

        <aside className="tree-wrap">
          <div className="tree-card">
            <Tree lightsOn={lights} />
            <p style={{ marginTop: 8, color: 'rgba(255,255,255,0.8)' }}>Click the button to toggle twinkling lights.</p>
          </div>
        </aside>
      </main>
    </div>
  )
}

export default App

