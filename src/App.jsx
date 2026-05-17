import{useState} from 'react'

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
    <>
      <div className="grid-bg" />

        <nav>
  	  <div className="nav-logo">stack<span>zero</span></div>
  	  <ul className="nav-links">
   	    <li><a href="#about">about</a></li>
    	    <li><a href="#skills">skills</a></li>
    	    <li><a href="#projects">projects</a></li>
    	    <li><a href="#experience">experience</a></li>
    	    <li><a href="#contact">contact</a></li>
 	  </ul>
 	  <button className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
    	    <div className="bar"></div>
   	    <div className="bar"></div>
  	    <div className="bar"></div>
 	  </button>
	  <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
   	    <a href="#about" onClick={() => setMenuOpen(false)}>about</a>
    	    <a href="#skills" onClick={() => setMenuOpen(false)}>skills</a>
      	    <a href="#projects" onClick={() => setMenuOpen(false)}>projects</a>
   	    <a href="#experience" onClick={() => setMenuOpen(false)}>experience</a>
   	    <a href="#contact" onClick={() => setMenuOpen(false)}>contact</a>
  	 </div>
       </nav>

      {/* HERO */}
      <section id="hero">
        <div className="hero-tag">available for work</div>
        <h1>Self-taught<br /><span className="dim">developer &</span><br />builder.</h1>
        <p className="hero-bio">
          Based in Laramie, Wyoming. I build systems that actually do things — AI assistants,
          self-hosted infrastructure, and tools that run 24/7. Currently working toward my CCNA.
        </p>
        <div className="hero-cta">
          <a href="#projects" className="btn btn-primary">View projects</a>
          <a href="#experience" className="btn btn-ghost">Experience</a>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <div className="section-label">about</div>
        <div className="section-title">Who I am</div>
        <div className="bio-block">
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
            { icon: '🛠️', title: 'Bias toward doing', desc: "I don't wait to fully understand something before I start. I build, break it, and figure out why — then build it better." },
            { icon: '🤝', title: 'Reliable by default', desc: "In a kitchen or on a team, reliability isn't a trait I perform — it's just how I show up. Every shift. Every commit." },
          ].map((s) => (
            <div className="strength-card" key={s.title}>
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
        <div className="section-title">What I work with</div>
        <div className="skills-grid">
          <div className="skill-category">
            <div className="skill-cat-title">Languages</div>
            <div className="skill-tags">
              {['JavaScript', 'Node.js', 'HTML', 'CSS'].map(s => <span className="skill-tag" key={s}>{s}</span>)}
            </div>
          </div>
          <div className="skill-category">
            <div className="skill-cat-title">Tools & Platforms</div>
            <div className="skill-tags">
              {['Git', 'Telegram Bot API', 'Anthropic SDK', 'CalDAV / ICS', 'launchd', 'Raspberry Pi'].map(s => <span className="skill-tag" key={s}>{s}</span>)}
            </div>
          </div>
          <div className="skill-category">
            <div className="skill-cat-title">Concepts</div>
            <div className="skill-tags">
              {['Service architecture', 'Prompt engineering', 'Process management', 'Env config', 'Scheduling & alerts'].map(s => <span className="skill-tag" key={s}>{s}</span>)}
            </div>
          </div>
          <div className="skill-category">
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
  <div className="section-title">What I've built</div>
  <div className="projects-list">
    {[
      {
        num: '01', name: 'KRONOS',
        desc: 'A fully local, voice-first personal assistant. Delivers morning briefings, responds to Telegram commands, and fires pre-event alerts — running 24/7 on a Raspberry Pi.',
        tags: ['Node.js', 'Anthropic SDK', 'Telegram Bot API', 'CalDAV', 'Raspberry Pi', 'launchd'],
        link: 'https://github.com/BagoBones-tldr/KRONOS',
      },
      {
        num: '02', name: 'Home Lab',
        desc: 'Designing and building a self-hosted physical infrastructure — Raspberry Pi cluster, NAS, and server rack. Research-driven, built incrementally with real hardware.',
        tags: ['Raspberry Pi', 'Networking', 'Self-hosted', 'NAS'],
        link: null,
      },
      {
        num: '03', name: 'Portfolio Site',
        desc: 'This site. Built with React and Vite, deployed on Netlify. Dark modern aesthetic, fully responsive.',
        tags: ['React', 'Vite', 'Netlify'],
        link: 'https://github.com/BagoBones-tldr/portfolio',
      },
    ].map((p) => (
      <div className="project-card" key={p.num}>
        <div>
          <div className="project-num">{p.num}</div>
          <div className="project-name">{p.name}</div>
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
        <div className="section-title">Where I've worked</div>
        <div className="exp-list">
          {[
            { date: 'Jan 2026 — Apr 2026', role: 'Crew Member', company: "McDonald's · Wayne" },
            { date: '6 months', role: 'Cook / Rover', company: "Chili's · Laramie, WY" },
            { date: '1 year', role: 'Food Runner / Busser', company: 'Trackside Bar & Grill' },
          ].map((e) => (
            <div className="exp-item" key={e.role + e.company}>
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
  <div className="section-title">Get in touch</div>
  <form className="contact-form" action="https://formspree.io/f/xwvzerbo" method="POST">
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
</section>

      <footer>
        <p>built by <span>stackzero</span> · stackzero.netlify.app</p>
      </footer>
    </>
  )
}
