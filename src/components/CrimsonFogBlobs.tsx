export function CrimsonFogBlobs() {
  return (
    <div aria-hidden="true" className="pointer-events-none">
      <div
        className="fog-blob"
        style={{
          top: '-10vh',
          left: '-10vw',
          width: '60vw',
          height: '60vw',
          background: 'var(--fog-blob-1)',
          opacity: 0.55,
          animation: 'fog-drift-1 38s ease-in-out infinite alternate',
        }}
      />
      <div
        className="fog-blob"
        style={{
          bottom: '-15vh',
          right: '-10vw',
          width: '55vw',
          height: '55vw',
          background: 'var(--fog-blob-2)',
          opacity: 0.5,
          animation: 'fog-drift-2 36s ease-in-out infinite alternate',
        }}
      />
      <div
        className="fog-blob"
        style={{
          top: '30vh',
          left: '40vw',
          width: '45vw',
          height: '45vw',
          background: 'var(--fog-blob-3)',
          opacity: 0.4,
          animation: 'fog-drift-3 40s ease-in-out infinite alternate',
        }}
      />
    </div>
  )
}
