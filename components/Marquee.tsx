export default function Marquee() {
  const items = [
    'Django', '✦', 'FastAPI', '✦', 'Python', '✦', 'Kotlin', '✦',
    'Java', '✦', 'Android', '✦', 'Firebase', '✦', 'JavaScript', '✦',
    'Django', '✦', 'FastAPI', '✦', 'Python', '✦', 'Kotlin', '✦',
    'Java', '✦', 'Android', '✦', 'Firebase', '✦', 'JavaScript', '✦',
  ]

  return (
    <div className="border-y border-ink/10 py-4 overflow-hidden bg-ink text-paper">
      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((item, i) => (
          <span
            key={i}
            className={`mx-6 section-label ${item === '✦' ? 'text-accent text-base' : 'text-paper/70'}`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
