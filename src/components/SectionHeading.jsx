// Section title with a small number and line above it ("02 ——").
// Fades in when it scrolls into view and the line grows from the left.
export default function SectionHeading({ index, title, center = false, className = 'mb-3 md:mb-7 2xl:mb-9' }) {
  return (
    <div className={`reveal-item ${center ? 'text-center' : ''} ${className}`}>
      <div className={`flex items-center gap-3 mb-1 md:mb-2 ${center ? 'justify-center' : ''}`} aria-hidden="true">
        <span className="font-tech text-[0.65rem] md:text-sm 2xl:text-base font-medium tracking-[0.3em] text-cyan-400/80">
          {String(index).padStart(2, '0')}
        </span>
        <span className="eyebrow-rule h-px w-8 md:w-14 bg-gradient-to-r from-cyan-400/70 to-transparent" />
      </div>
      <h2 className="text-2xl md:text-5xl 2xl:text-6xl 3xl:text-7xl font-bold tracking-tight">{title}</h2>
    </div>
  )
}
