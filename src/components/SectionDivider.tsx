export function SectionDivider() {
  return (
    <div
      aria-hidden="true"
      className="relative w-full"
      style={{ height: 'clamp(2rem, 6vw, 4rem)' }}
    >
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, oklch(from var(--border) l c h / 0.2) 50%, transparent 100%)',
        }}
      />
      <div className="absolute left-1/2 top-1/2 h-px w-24 -translate-x-1/2 -translate-y-1/2 bg-border" />
    </div>
  )
}
