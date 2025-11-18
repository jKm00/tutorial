import { useMemo } from 'react'

type SnowProps = {
  count?: number
}

export default function Snow({ count = 40 }: SnowProps) {
  const flakes = useMemo(() => {
    return new Array(count).fill(0).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * -20,
      duration: 6 + Math.random() * 10,
      size: 6 + Math.random() * 18,
      opacity: 0.5 + Math.random() * 0.5,
    }))
  }, [count])

  return (
    <div aria-hidden className="snow-root pointer-events-none">
      {flakes.map((f) => (
        <div
          key={f.id}
          className="snow-flake"
          style={{
            left: `${f.left}vw`,
            animationDelay: `${f.delay}s`,
            animationDuration: `${f.duration}s`,
            width: f.size,
            height: f.size,
            opacity: f.opacity,
          }}
        />
      ))}
    </div>
  )
}
