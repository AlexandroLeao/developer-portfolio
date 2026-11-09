import { useEffect, useRef, useState } from 'react'

type HeroMascotProps = {
  alt: string
  language: 'pt' | 'en'
}

type MascotFrameProps = {
  name: 'hero-illustration' | 'hero-wave' | 'hero-poke'
  className?: string
  alt?: string
  priority?: 'high' | 'low'
}

function MascotFrame({ name, className = '', alt = '', priority = 'low' }: MascotFrameProps) {
  return (
    <picture className={`hero-mascot-frame ${className}`} aria-hidden={alt ? undefined : true}>
      <source
        type="image/webp"
        srcSet={`/images/${name}-640.webp 640w, /images/${name}-1024.webp 1024w, /images/${name}-1448.webp 1448w`}
        sizes="(max-width: 640px) calc(100vw - 3rem), 512px"
      />
      <img
        src={`/images/${name}-1024.webp`}
        width={1448}
        height={1086}
        alt={alt}
        fetchPriority={priority}
        decoding="async"
        draggable="false"
        className="h-full w-full object-contain"
      />
    </picture>
  )
}

export default function HeroMascot({ alt, language }: HeroMascotProps) {
  const [poked, setPoked] = useState(false)
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => {
    if (clickTimer.current !== null) clearTimeout(clickTimer.current)
  }, [])

  const poke = () => {
    if (clickTimer.current !== null) clearTimeout(clickTimer.current)
    setPoked(true)
    clickTimer.current = setTimeout(() => {
      setPoked(false)
      clickTimer.current = null
    }, 500)
  }

  return (
    <button
      type="button"
      onClick={poke}
      data-testid="hero-mascot"
      data-poked={poked}
      aria-label={language === 'pt' ? 'Cutucar o personagem Alexandro' : 'Poke Alexandro character'}
      className="hero-mascot relative z-10 block aspect-[4/3] w-full max-w-lg cursor-pointer border-0 bg-transparent p-0 focus-visible:rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-primary)"
    >
      {/* Both whole-character poses use the same dimensions and frame. */}
      <MascotFrame name="hero-illustration" alt={alt} priority="high" />
      <MascotFrame name="hero-wave" className="hero-mascot-wave" />
      {/* Click is a third complete frame: no hand layers or CSS displacement. */}
      <MascotFrame name="hero-poke" className="hero-mascot-poke" />
      <span role="status" className="sr-only">
        {poked
          ? language === 'pt' ? 'Ai! Fui cutucado!' : 'Ouch! I was poked!'
          : language === 'pt' ? 'Acenando' : 'Waving'}
      </span>
    </button>
  )
}
