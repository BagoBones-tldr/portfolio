import { useState, useEffect } from 'react'
import './App.css'
import mePhoto from './assets/me.jpeg'

function GitHubIcon() {
  return (
    <svg viewBox="0 0 19 19" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M9.356 1.85C5.05 1.85 1.57 5.356 1.57 9.694a7.84 7.84 0 0 0 5.324 7.44c.387.079.528-.168.528-.376 0-.182-.013-.805-.013-1.454-2.165.467-2.616-.935-2.616-.935-.349-.91-.864-1.143-.864-1.143-.71-.48.051-.48.051-.48.787.051 1.2.805 1.2.805.695 1.194 1.817.857 2.268.649.064-.507.27-.857.49-1.052-1.728-.182-3.545-.857-3.545-3.87 0-.857.31-1.558.8-2.104-.078-.195-.349-1 .077-2.078 0 0 .657-.208 2.14.805a7.5 7.5 0 0 1 1.946-.26c.657 0 1.328.092 1.946.26 1.483-1.013 2.14-.805 2.14-.805.426 1.078.155 1.883.078 2.078.502.546.799 1.247.799 2.104 0 3.013-1.818 3.675-3.558 3.87.284.247.528.714.528 1.454 0 1.052-.012 1.896-.012 2.156 0 .208.142.455.528.377a7.84 7.84 0 0 0 5.324-7.441c.013-4.338-3.48-7.844-7.773-7.844" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  )
}

function BlueskyIcon() {
  return (
    <svg viewBox="0 0 16 17" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M7.75 7.735c-.693-1.348-2.58-3.86-4.334-5.097-1.68-1.187-2.32-.981-2.74-.79C.188 2.065.1 2.812.1 3.251s.241 3.602.398 4.13c.52 1.744 2.367 2.333 4.07 2.145-2.495.37-4.71 1.278-1.805 4.512 3.196 3.309 4.38-.71 4.987-2.746.608 2.036 1.307 5.91 4.93 2.746 2.72-2.746.747-4.143-1.747-4.512 1.702.189 3.55-.4 4.07-2.145.156-.528.397-3.691.397-4.13s-.088-1.186-.575-1.406c-.42-.19-1.06-.395-2.741.79-1.755 1.24-3.64 3.752-4.334 5.099" />
    </svg>
  )
}

function DiscordIcon() {
  return (
    <svg viewBox="0 0 20 19" width="21" height="21" fill="currentColor" aria-hidden="true">
      <path d="M16.224 3.768a14.5 14.5 0 0 0-3.67-1.153c-.158.286-.343.67-.47.976a13.5 13.5 0 0 0-4.067 0c-.128-.306-.317-.69-.476-.976A14.4 14.4 0 0 0 3.868 3.77C1.546 7.28.916 10.703 1.231 14.077a14.7 14.7 0 0 0 4.5 2.306q.545-.748.965-1.587a9.5 9.5 0 0 1-1.518-.74q.191-.14.372-.293c2.927 1.369 6.107 1.369 8.999 0q.183.152.372.294-.723.437-1.52.74.418.838.963 1.588a14.6 14.6 0 0 0 4.504-2.308c.37-3.911-.63-7.302-2.644-10.309m-9.13 8.234c-.878 0-1.599-.82-1.599-1.82 0-.998.705-1.82 1.6-1.82.894 0 1.614.82 1.599 1.82.001 1-.705 1.82-1.6 1.82m5.91 0c-.878 0-1.599-.82-1.599-1.82 0-.998.705-1.82 1.6-1.82.893 0 1.614.82 1.599 1.82 0 1-.706 1.82-1.6 1.82" />
    </svg>
  )
}

// To add a social later, drop a row here
// (X/Bluesky icon paths live in public/icons.svg).
const socials = [
  { label: 'GitHub', href: 'https://github.com/BagoBones-tldr', Icon: GitHubIcon, external: true },
  { label: 'Discord', href: 'https://discord.com/users/676961601232044063', Icon: DiscordIcon, external: true },
  { label: 'Bluesky', href: 'https://bsky.app/profile/chromerducky.bsky.social', Icon: BlueskyIcon, external: true },
  { label: 'Email', href: 'mailto:neutron-ton618@protonmail.com', Icon: MailIcon, external: false },
]

function SocialLinks({ className = '' }) {
  return (
    <div className={`social-links ${className}`}>
      {socials.map(({ label, href, Icon, external }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          className={`social-${label.toLowerCase()}`}
          {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
        >
          <Icon />
        </a>
      ))}
    </div>
  )
}

function formatAgo(ms) {
  if (ms == null) return ''
  const s = Math.floor(ms / 1000)
  if (s < 60) return 'just now'
  const m = Math.floor(s / 60)
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

const STATUS_LABEL = { online: 'online', working: 'working', offline: 'offline', unknown: 'status unknown' }

function useKronosStatus() {
  const [status, setStatus] = useState('unknown')
  const [agoMs, setAgoMs] = useState(null)
  useEffect(() => {
    let active = true
    const pull = async () => {
      try {
        const r = await fetch('/api/kronos-status')
        const d = await r.json()
        if (!active) return
        setStatus(d.status || 'unknown')
        setAgoMs(d.agoMs ?? null)
      } catch {
        if (active) setStatus('unknown')
      }
    }
    pull()
    const id = setInterval(pull, 20000)
    return () => { active = false; clearInterval(id) }
  }, [])
  return { status, agoMs }
}

function StatusBadge() {
  const { status, agoMs } = useKronosStatus()
  const showAgo = status !== 'unknown' && agoMs != null
  return (
    <span className={`status-badge ${status}`} title={showAgo ? `last seen ${formatAgo(agoMs)}` : STATUS_LABEL[status]}>
      <span className="status-dot" />
      {STATUS_LABEL[status]}
      {showAgo && <span className="status-ago"> · {formatAgo(agoMs)}</span>}
    </span>
  )
}

const navItems = ['about', 'skills', 'projects', 'experience', 'contact']

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    const targets = document.querySelectorAll('.reveal')
    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Scrollspy: highlight the nav link for the section in view.
  useEffect(() => {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    )
    navItems.forEach((id) => {
      const el = document.getElementById(id)
      if (el) spy.observe(el)
    })
    return () => spy.disconnect()
  }, [])

  return(
    <>
      <div className="grid-bg" />

        <nav>
  	  <div className="nav-logo">
  	    <svg viewBox="0 0 56 56" height="30" fill="none" style={{color:'var(--accent)'}}>
  	      <g stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round">
  	        <path d="M28 2 L53 15 L28 28 L3 15 Z" />
  	        <path d="M3 15 L28 28 L28 54 L3 41 Z" />
  	        <path d="M28 28 L53 15 L53 41 L28 54 Z" />
  	        <line x1="9"  y1="18" x2="9"  y2="44" />
  	        <line x1="15" y1="21" x2="15" y2="47" />
  	        <line x1="21" y1="24" x2="21" y2="50" />
  	        <line x1="35" y1="24" x2="35" y2="50" />
  	        <line x1="42" y1="21" x2="42" y2="47" />
  	        <line x1="49" y1="17" x2="49" y2="43" />
  	      </g>
  	    </svg>
  	    <span>PORTFOLIO</span>
  	  </div>
  	  <ul className="nav-links">
   	    {navItems.map((id) => (
   	      <li key={id}>
   	        <a href={`#${id}`} className={activeSection === id ? 'active' : ''}>{id}</a>
   	      </li>
   	    ))}
 	  </ul>
 	  <button className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
    	    <div className="bar"></div>
   	    <div className="bar"></div>
  	    <div className="bar"></div>
 	  </button>
	  <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
   	    {navItems.map((id) => (
   	      <a
   	        key={id}
   	        href={`#${id}`}
   	        className={activeSection === id ? 'active' : ''}
   	        onClick={() => setMenuOpen(false)}
   	      >
   	        {id}
   	      </a>
   	    ))}
  	 </div>
       </nav>

      {/* HERO */}
      <section id="hero">
        <div className="hero-content">
          <div className="hero-tag">employed · open to opportunities</div>
          <h1>Self-taught<br /><span className="dim">developer &</span><br />builder.</h1>
          <p className="hero-bio">
            Based in Laramie, Wyoming. I build systems that actually do things: AI assistants,
            self-hosted infrastructure, and tools that run 24/7. Currently working toward my CCNA.
          </p>
          <div className="hero-cta">
            <a href="#projects" className="btn btn-primary">View projects</a>
            <a href="#experience" className="btn btn-ghost">Experience</a>
          </div>
        </div>
        <div className="hero-img-wrap">
          <img src={mePhoto} alt="Quintin" className="hero-photo" />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <div className="section-label">about</div>
        <div className="section-title reveal">Who I am</div>
        <div className="bio-block reveal">
          <p className="bio-text">
            I'm a self-taught developer based in Laramie, Wyoming. What started as curiosity in early
            2026 quickly turned into a passion for building real, functional systems. I develop and
            maintain KRONOS, my flagship personal assistant project, and run my own self-hosted server
            infrastructure. I take pride in owning the full stack, from writing the code to managing
            the hardware it runs on. I'm currently working toward my CCNA certification as I deepen
            my knowledge of networking and infrastructure. Outside of tech, I unwind through gaming
            and music.
          </p>
        </div>
        <div className="strengths-grid">
          {[
            { icon: '⚙️', title: 'Systems thinker', desc: "Whether it's a kitchen or a codebase, I look for what's breaking the flow and fix it." },
            { icon: '🔥', title: 'Built for pressure', desc: 'Years in fast-paced kitchens taught me that panic is a luxury. I stay sharp when things get loud.' },
            { icon: '📦', title: 'Finisher, not just a starter', desc: "I don't hand things off half-done. From hardware to deployment, I see it through to working." },
            { icon: '📈', title: 'Moves fast, learns faster', desc: 'Started coding in early 2026. Already running production systems on real hardware. The gap between zero and shipped keeps shrinking.' },
            { icon: '🛠️', title: 'Bias toward doing', desc: "I don't wait to fully understand something before I start. I build, break it, and figure out why, then build it better." },
            { icon: '🤝', title: 'Reliable by default', desc: "In a kitchen or on a team, reliability isn't a trait I perform. It's just how I show up. Every shift. Every commit." },
          ].map((s, i) => (
            <div className="strength-card reveal" key={s.title} style={{ transitionDelay: `${i * 70}ms` }}>
              <div className="strength-icon">{s.icon}</div>
              <div className="strength-title">{s.title}</div>
              <div className="strength-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills">
        <div className="section-label">skills</div>
        <div className="section-title reveal">What I work with</div>
        <div className="skills-grid">
          <div className="skill-category reveal">
            <div className="skill-cat-title">Languages</div>
            <div className="skill-tags">
              {['JavaScript', 'Node.js', 'HTML', 'CSS'].map(s => <span className="skill-tag" key={s}>{s}</span>)}
            </div>
          </div>
          <div className="skill-category reveal">
            <div className="skill-cat-title">Tools & Platforms</div>
            <div className="skill-tags">
              {['Git', 'Telegram Bot API', 'Anthropic SDK', 'CalDAV / ICS', 'launchd', 'Raspberry Pi'].map(s => <span className="skill-tag" key={s}>{s}</span>)}
            </div>
          </div>
          <div className="skill-category reveal">
            <div className="skill-cat-title">Concepts</div>
            <div className="skill-tags">
              {['Service architecture', 'Prompt engineering', 'Process management', 'Env config', 'Scheduling & alerts'].map(s => <span className="skill-tag" key={s}>{s}</span>)}
            </div>
          </div>
          <div className="skill-category reveal">
            <div className="skill-cat-title">Infrastructure <span className="wip-label">in progress</span></div>
            <div className="skill-tags">
              {['Pi cluster', 'NAS setup', 'Home lab', 'CCNA'].map(s => <span className="skill-tag wip" key={s}>{s}</span>)}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
<section id="projects">
  <div className="section-label">projects</div>
  <div className="section-title reveal">What I've built</div>
  <div className="projects-list">
    {[
      {
        num: '01', name: 'KRONOS', live: true,
        desc: 'A fully local, voice-first personal assistant. Delivers morning briefings, responds to Telegram commands, and fires pre-event alerts. Runs as always-on background services on my own machine.',
        tags: ['Node.js', 'Anthropic SDK', 'Telegram Bot API', 'CalDAV', 'systemd', 'Linux'],
        link: 'https://github.com/BagoBones-tldr/Calender_Bot',
      },
      {
        num: '02', name: 'Home Lab',
        desc: 'Designing and building a self-hosted physical infrastructure: Raspberry Pi cluster, NAS, and server rack. Research-driven, built incrementally with real hardware.',
        tags: ['Raspberry Pi', 'Networking', 'Self-hosted', 'NAS'],
        link: null,
      },
      {
        num: '03', name: 'Portfolio Site',
        desc: 'This site. Built with React and Vite, deployed on Vercel. Dark modern aesthetic, fully responsive.',
        tags: ['React', 'Vite', 'Vercel'],
        link: 'https://github.com/BagoBones-tldr/portfolio',
      },
    ].map((p, i) => (
      <div className="project-card reveal" key={p.num} style={{ transitionDelay: `${i * 70}ms` }}>
        <div>
          <div className="project-num">{p.num}</div>
          <div className="project-name">{p.name}{p.live && <StatusBadge />}</div>
          <div className="project-desc">{p.desc}</div>
          <div className="project-tags">
            {p.tags.map(t => <span className="project-tag" key={t}>{t}</span>)}
          </div>
        </div>
        {p.link
          ? <a href={p.link} target="_blank" rel="noreferrer" className="project-arrow">↗</a>
          : <div className="project-arrow" style={{opacity: 0.2}}>↗</div>
        }
      </div>
    ))}
  </div>
</section>

      {/* EXPERIENCE */}
      <section id="experience">
        <div className="section-label">experience</div>
        <div className="section-title reveal">Where I've worked</div>
        <div className="exp-list">
          {[
            { date: '4 mos', role: 'Crew Member', company: "McDonald's · Wayne, NE" },
            { date: '6 mos', role: 'Cook / Rover', company: "Chili's · Laramie, WY" },
            { date: '1 yr', role: 'Food Runner / Busser', company: 'Trackside Bar & Grill · Waverly, NE' },
          ].map((e, i) => (
            <div className="exp-item reveal" key={e.role + e.company} style={{ transitionDelay: `${i * 70}ms` }}>
              <div className="exp-date">{e.date}</div>
              <div>
                <div className="exp-role">{e.role}</div>
                <div className="exp-company">{e.company}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

{/* CONTACT */}
<section id="contact">
  <div className="section-label">contact</div>
  <div className="section-title reveal">Get in touch</div>
  <form className="contact-form reveal" action="https://formspree.io/f/xwvzerbo" method="POST">
    <div className="form-row">
      <div className="form-group">
        <label className="form-label">Name</label>
        <input className="form-input" type="text" name="name" required />
      </div>
      <div className="form-group">
        <label className="form-label">Email</label>
        <input className="form-input" type="email" name="email" required />
      </div>
    </div>
    <div className="form-group">
      <label className="form-label">Subject</label>
      <input className="form-input" type="text" name="subject" required />
    </div>
    <div className="form-group">
      <label className="form-label">Message</label>
      <textarea className="form-input form-textarea" name="message" rows="5" required />
    </div>
    <button className="btn btn-primary" type="submit">Send message</button>
  </form>
  <div className="contact-social reveal">
    <span className="contact-social-label">or find me</span>
    <SocialLinks />
  </div>
</section>

      <footer>
        <SocialLinks className="footer-social" />
        <p>built by <span>Edwards</span></p>
      </footer>
    </>
  )
}
