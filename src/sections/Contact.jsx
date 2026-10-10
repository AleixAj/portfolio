/**
 * Contact form (sent with EmailJS) and the footer.
 * The form needs the VITE_EMAILJS_* variables in .env.local to work.
 */
import { useRef, useState, memo } from 'react'
import emailjs from '@emailjs/browser'
import { FaLinkedin, FaEnvelope, FaGithub, FaFileAlt } from 'react-icons/fa'
import SectionHeading from '../components/SectionHeading'

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

// Wait at least this long between two messages, to slow down spam bots
const COOLDOWN_MS = 15000

const INPUT_CLS = 'bg-white/[0.04] border border-white/10 hover:border-white/20 rounded-xl 2xl:rounded-2xl px-5 2xl:px-6 py-2.5 md:py-3 2xl:py-4 text-base 2xl:text-xl text-white placeholder-gray-500 focus:border-cyan-400/60 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-colors duration-300'
const FOOTER_LINK = 'text-gray-400 hover:text-cyan-400 transition-colors'
const FOOTER_ICON = 'w-4 h-4 md:w-5 md:h-5'

function ContactForm({ t }) {
  const formRef = useRef(null)
  const lastSubmitRef = useRef(0)
  const [status, setStatus] = useState('idle') // idle | sending | success | error | config-error

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus('config-error')
      return
    }
    // Honeypot: a hidden field real people never see. If it has something in it,
    // it's a bot, so I pretend it worked and don't send anything.
    if (formRef.current?.elements?.company_website?.value) {
      setStatus('success')
      formRef.current.reset()
      return
    }
    // Too soon after the last message, ignore it
    if (Date.now() - lastSubmitRef.current < COOLDOWN_MS) return
    setStatus('sending')
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      lastSubmitRef.current = Date.now()
      setStatus('success')
      formRef.current.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="max-w-5xl mx-auto w-full px-5 md:px-8 text-white md:max-w-xl 2xl:max-w-2xl 3xl:max-w-3xl">
      <SectionHeading index={6} title={t.title} center className="mb-2 md:mb-3 2xl:mb-5" />
      <p className="reveal-item text-sm md:text-lg 2xl:text-2xl text-gray-400 mb-4 md:mb-7 2xl:mb-10 text-center" style={{ '--d': 1 }}>{t.subtitle}</p>
      <form ref={formRef} onSubmit={handleSubmit} style={{ '--d': 2 }} className="reveal-item flex flex-col gap-2.5 md:gap-4 2xl:gap-5" aria-busy={status === 'sending'}>
        <label className="sr-only" htmlFor="contact-name">{t.name}</label>
        <input
          id="contact-name"
          name="from_name" type="text" required maxLength={80} placeholder={t.name}
          autoComplete="name"
          className={INPUT_CLS}
        />
        <label className="sr-only" htmlFor="contact-email">{t.email}</label>
        <input
          id="contact-email"
          name="reply_to" type="email" required maxLength={120} placeholder={t.email}
          autoComplete="email"
          className={INPUT_CLS}
        />
        <label className="sr-only" htmlFor="contact-subject">{t.subject}</label>
        <input
          id="contact-subject"
          name="subject" type="text" required maxLength={120} placeholder={t.subject}
          className={INPUT_CLS}
        />
        <label className="sr-only" htmlFor="contact-message">{t.message}</label>
        <textarea
          id="contact-message"
          name="message" required maxLength={2000} rows={3} placeholder={t.message}
          className={`${INPUT_CLS} resize-none`}
        />
        {/* Honeypot field: hidden from people and screen readers, only bots fill it in */}
        <div className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden" aria-hidden="true">
          <label htmlFor="contact-company">Company website</label>
          <input id="contact-company" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        <button
          type="submit" disabled={status === 'sending'}
          className="mt-0.5 md:mt-1 px-8 md:px-12 py-2.5 md:py-4 2xl:py-5 bg-white text-black font-semibold rounded-2xl text-base md:text-lg 2xl:text-xl btn-glow disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'sending' ? t.sending : t.send}
        </button>
        <div aria-live="polite" role="status">
          {status === 'success' && <p className="text-center text-cyan-400 font-medium text-lg">{t.success}</p>}
          {status === 'error' && <p className="text-center text-red-400 font-medium text-lg">{t.error}</p>}
          {status === 'config-error' && <p className="text-center text-red-400 font-medium text-lg">{t.configError}</p>}
        </div>
      </form>
    </div>
  )
}

function Footer({ t, cv }) {
  return (
    <footer id="page-footer" className="bg-black/80 border-t border-white/10 text-white">
      <div className="max-w-6xl 2xl:max-w-7xl 3xl:max-w-[100rem] mx-auto px-5 md:px-8 2xl:px-12 py-3 md:py-5 2xl:py-7 grid grid-cols-2 md:flex md:flex-row md:items-center md:justify-between gap-3 md:gap-0">

        <div className="flex items-center gap-3">
          <img src="/AJ.png" alt="AJ Logo" className="w-10 h-10 2xl:w-14 2xl:h-14 object-contain flex-shrink-0" />
          <div className="flex flex-col">
            <span className="font-tech text-sm md:text-xl 2xl:text-2xl font-bold tracking-widest">ALEIX AUQUÉ</span>
            <p className="text-gray-400 text-[0.65rem] md:text-xs 2xl:text-sm tracking-wide">Software Developer</p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="flex gap-3">
            <a href="https://linkedin.com/in/aleixauque/" target="_blank" rel="noopener noreferrer" aria-label={t.linkedin}
              className={FOOTER_LINK}>
              <FaLinkedin className={FOOTER_ICON} />
            </a>
            <a href="mailto:aleixauque@gmail.com" aria-label={t.sendEmail}
              className={FOOTER_LINK}>
              <FaEnvelope className={FOOTER_ICON} />
            </a>
            <a href="https://github.com/AleixAj" target="_blank" rel="noopener noreferrer" aria-label={t.github}
              className={FOOTER_LINK}>
              <FaGithub className={FOOTER_ICON} />
            </a>
            {/* Here the CV opens instead of downloading. From the footer people usually
                just want a quick look, and the hero already has a download button. */}
            <a href={cv.href} target="_blank" rel="noopener noreferrer" aria-label={t.viewCV} title={t.viewCV}
              className={FOOTER_LINK}>
              <FaFileAlt className={FOOTER_ICON} />
            </a>
          </div>
          <div className="flex flex-col gap-0.5 items-end">
            <p className="text-gray-400 text-xs">aleixauque@gmail.com</p>
          </div>
        </div>

      </div>
      <div className="border-t border-white/5 py-2.5 text-center text-gray-600 text-xs">
        © {new Date().getFullYear()} Aleix Auqué · {t.rights}
      </div>
    </footer>
  )
}

function Contact({ t, cv }) {
  return (
    <section id="contact" className="min-h-full md:h-[100dvh] ls:h-auto bg-black/45 flex flex-col relative overflow-hidden ls:overflow-visible">
      <div className="flex-1 flex items-center justify-center pt-16 md:pt-24 pb-2 md:pb-[60px]">
        <ContactForm t={t} />
      </div>
      <Footer t={t} cv={cv} />
    </section>
  )
}

// memo: its props only change with the language, so scrolling around
// (which re-renders App) doesn't touch it
export default memo(Contact)
