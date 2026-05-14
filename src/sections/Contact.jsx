import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { FaLinkedin, FaEnvelope, FaGithub, FaFileAlt } from 'react-icons/fa'

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

function ContactForm({ t }) {
  const formRef = useRef(null)
  const [status, setStatus] = useState('idle')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus('error')
      return
    }
    setStatus('sending')
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      setStatus('success')
      formRef.current.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="max-w-5xl mx-auto w-full px-5 md:px-8 text-white md:max-w-xl">
      <h2 className="text-2xl md:text-5xl font-bold mb-3 text-center">{t.title}</h2>
      <p className="text-sm md:text-lg text-gray-400 mb-5 md:mb-7 text-center">{t.subtitle}</p>
      <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-3 md:gap-4">
        <input
          name="from_name" type="text" required placeholder={t.name}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-5 py-3 text-base text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/60 transition-colors"
        />
        <input
          name="reply_to" type="email" required placeholder={t.email}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-5 py-3 text-base text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/60 transition-colors"
        />
        <input
          name="subject" type="text" required placeholder={t.subject}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-5 py-3 text-base text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/60 transition-colors"
        />
        <textarea
          name="message" required rows={4} placeholder={t.message}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-5 py-3 text-base text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/60 transition-colors resize-none"
        />
        <button
          type="submit" disabled={status === 'sending'}
          className="mt-1 px-8 md:px-12 py-3 md:py-4 bg-white text-black font-semibold rounded-2xl text-base md:text-lg hover:scale-105 transition-transform glow-pulse disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'sending' ? t.sending : t.send}
        </button>
        {status === 'success' && <p className="text-center text-cyan-400 font-medium text-lg">{t.success}</p>}
        {status === 'error'   && <p className="text-center text-red-400 font-medium text-lg">{t.error}</p>}
      </form>
    </div>
  )
}

function Footer({ t }) {
  return (
    <footer id="page-footer" className="bg-black/80 border-t border-white/10 text-white">
      <div className="max-w-5xl mx-auto px-5 md:px-8 py-3 md:py-5 grid grid-cols-2 md:flex md:flex-row md:items-center md:justify-between gap-3 md:gap-0">

        <div className="flex items-center gap-3">
          <img src="/AJ.png" alt="AJ Logo" className="w-10 h-10 object-contain flex-shrink-0" />
          <div className="flex flex-col">
            <span className="font-tech text-sm md:text-xl font-bold tracking-widest">ALEIX AUQUÉ</span>
            <p className="text-gray-400 text-[0.65rem] md:text-xs tracking-wide">Software Developer</p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="flex gap-3">
            <a href="https://linkedin.com/in/aleixauque/" target="_blank" rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors">
              <FaLinkedin className="w-4 h-4 md:w-5 md:h-5" />
            </a>
            <a href="mailto:aleixauque@gmail.com"
              className="text-gray-400 hover:text-cyan-400 transition-colors">
              <FaEnvelope className="w-4 h-4 md:w-5 md:h-5" />
            </a>
            <a href="https://github.com/AleixAj" target="_blank" rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors">
              <FaGithub className="w-4 h-4 md:w-5 md:h-5" />
            </a>
            <a href="/CV_Aleix_Auque.pdf" download
              className="text-gray-400 hover:text-cyan-400 transition-colors">
              <FaFileAlt className="w-4 h-4 md:w-5 md:h-5" />
            </a>
          </div>
          <div className="flex flex-col gap-0.5 items-end">
            <p className="text-gray-400 text-xs">aleixauque@gmail.com</p>
            <p className="text-gray-400 text-xs">(+34) 680 80 26 09</p>
          </div>
        </div>

      </div>
      <div className="border-t border-white/5 py-2.5 text-center text-gray-600 text-xs">
        © {new Date().getFullYear()} Aleix Auqué · {t.rights}
      </div>
    </footer>
  )
}

export default function Contact({ t }) {
  return (
    <section id="contact" className="h-[100dvh] ls:h-auto bg-black/45 flex flex-col relative overflow-hidden ls:overflow-visible">
      <div className="flex-1 flex items-center justify-center pt-16 md:pt-24 pb-2 md:pb-[60px]">
        <ContactForm t={t} />
      </div>
      <Footer t={t} />
    </section>
  )
}
