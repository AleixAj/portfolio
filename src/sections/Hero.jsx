import { lazy, Suspense } from 'react'
import { FaLinkedin, FaFileAlt } from 'react-icons/fa'

const Scene3D = lazy(() => import('../components/Scene3D'))

export default function Hero({ wordIdx, words, goToSection, heroActive, t }) {
  return (
    <section id="inicio" className="h-[100dvh] relative flex flex-col md:block">

      <div className="absolute inset-0">
        <Suspense fallback={<div className="w-full h-full bg-[radial-gradient(circle_at_70%_40%,rgba(34,211,238,0.16),transparent_35%)]" />}>
          <Scene3D heroActive={heroActive} />
        </Suspense>
      </div>

      {/* Mobile: título arriba */}
      <div className="md:hidden flex-shrink-0 pt-24 ls:pt-12 px-8 pb-20 ls:pb-6 text-white relative z-10 bg-gradient-to-b from-black/90 via-black/60 to-transparent text-center">
        <h1 className="text-[7vw] font-bold tracking-tighter leading-none">
          {t.transform}{' '}
          <span
            key={wordIdx}
            className="inline-block"
            style={{ animation: 'wordSlideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
          >
            {words[wordIdx]}
          </span>
        </h1>
        <h2 className="text-[5.5vw] font-bold text-cyan-400 tracking-tight mt-2">
          {t.subtitle}
        </h2>
      </div>

      <div className="md:hidden flex-1" />

      {/* Mobile: contenido abajo */}
      <div className="md:hidden flex-shrink-0 px-8 pt-20 ls:pt-8 pb-32 ls:pb-4 text-white relative z-10 pointer-events-none bg-gradient-to-t from-black/90 via-black/60 to-transparent">
        <p className="text-xl text-gray-300">Software Developer</p>
        <p className="mt-3 ls:hidden text-sm text-gray-300 w-full text-justify">
          {t.intro}
        </p>
        <button
          onClick={() => goToSection('projects')}
          className="mt-8 ls:mt-3 w-[13.75rem] px-5 py-2.5 ls:py-2 bg-white text-black font-semibold rounded-2xl text-base hover:scale-105 transition-transform pointer-events-auto glow-pulse"
        >
          {t.cta}
        </button>
        <div className="mt-4 ls:mt-2 flex gap-3 pointer-events-auto flex-wrap">
          <a href="https://linkedin.com/in/aleixauque/" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 bg-cyan-400 rounded-xl text-black hover:scale-105 hover:shadow-[0_0_20px_rgba(34,211,238,0.8),0_0_40px_rgba(34,211,238,0.4)] transition-none hover:transition-none text-sm font-semibold">
            <FaLinkedin className="w-3.5 h-3.5" /> LinkedIn
          </a>
          <a href="/CV_Aleix_Auque.pdf" download
            className="flex items-center gap-1.5 px-4 py-2 bg-cyan-400 rounded-xl text-black hover:scale-105 hover:shadow-[0_0_20px_rgba(34,211,238,0.8),0_0_40px_rgba(34,211,238,0.4)] transition-none hover:transition-none text-sm font-semibold">
            <FaFileAlt className="w-3.5 h-3.5" /> CV
          </a>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:flex absolute inset-0 z-10 items-center px-6 lg:pl-64 pointer-events-none">
        <div className="flex flex-col justify-center text-white max-w-lg lg:max-w-none">
          <h1 className="text-6xl lg:text-7xl font-bold tracking-tighter leading-none">
            {t.transform}{' '}
            <span
              key={wordIdx}
              className="inline-block"
              style={{ animation: 'wordSlideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
            >
              {words[wordIdx]}
            </span>
          </h1>
          <h2 className="text-5xl lg:text-6xl font-bold text-cyan-400 tracking-tight mt-3">
            {t.subtitle}
          </h2>
          <div className="translate-y-28">
            <p className="text-3xl text-gray-300">Software Developer</p>
            <p className="mt-4 text-lg text-gray-300 max-w-[38rem] text-justify">
              {t.intro}
            </p>
            <button
              onClick={() => goToSection('projects')}
              className="mt-8 w-[19rem] px-10 py-5 bg-white text-black font-semibold rounded-2xl text-xl hover:scale-105 transition-transform pointer-events-auto glow-pulse"
            >
              {t.cta}
            </button>
            <div className="mt-8 flex gap-4 pointer-events-auto flex-wrap">
              <a href="https://linkedin.com/in/aleixauque/" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-4 bg-cyan-400 rounded-2xl text-black hover:scale-105 hover:shadow-[0_0_20px_rgba(34,211,238,0.8),0_0_40px_rgba(34,211,238,0.4)] transition-none hover:transition-none text-lg font-semibold">
                <FaLinkedin className="w-5 h-5" /> LinkedIn
              </a>
              <a href="/CV_Aleix_Auque.pdf" download
                className="flex items-center gap-2 px-8 py-4 bg-cyan-400 rounded-2xl text-black hover:scale-105 hover:shadow-[0_0_20px_rgba(34,211,238,0.8),0_0_40px_rgba(34,211,238,0.4)] transition-none hover:transition-none text-lg font-semibold">
                <FaFileAlt className="w-5 h-5" /> CV
              </a>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
