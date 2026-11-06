import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowRight, ArrowUpRight, Bot, Briefcase, Check, Code2, Cpu, Github, Globe2, GraduationCap, Menu, Network, Send, ShieldCheck, Sparkles, Terminal, X, Zap, Copy } from 'lucide-react';
import './styles.css';

const EMAIL = 'godwiillekwa17@gmail.com';

const nav = [['About', '#about'], ['Skills', '#skills'], ['Projects', '#projects'], ['Experience', '#experience'], ['Training', '#training'], ['Ventures', '#ventures']];

const stats = [
  ['~6 yrs', 'Telecom engineering at Huawei'],
  ['4', 'Platforms for AI data work'],
  ['1', 'Live AI demo you can try'],
  ['Remote', 'Open to opportunities']
];

const skills = [
  { icon: Sparkles, title: 'AI data and LLM evaluation', text: 'Annotation, grading model responses, search relevance, and checking multimodal datasets.', tag: 'Professional' },
  { icon: Cpu, title: 'Telecommunications', text: 'RF engineering, antenna optimisation, network deployment, LTE and 3G/4G/5G.', tag: 'Professional' },
  { icon: Terminal, title: 'Building with AI', text: 'LLM APIs (Groq, Gemini), prompt design, React front ends and simple backend APIs.', tag: 'Hands-on' },
  { icon: Network, title: 'Workflow automation', text: 'n8n basics and thinking through which repetitive jobs are worth automating.', tag: 'Learning' },
  { icon: Code2, title: 'Python', text: 'Working through the fundamentals and using them in small projects.', tag: 'Learning' },
  { icon: ShieldCheck, title: 'Troubleshooting', text: 'Tracking down faults, writing things down properly, and keeping data clean.', tag: 'Professional' }
];

const projects = [
  { icon: Bot, name: 'FlowPilot AI', stage: 'Working demo', text: 'An assistant that drafts customer replies, sorts incoming requests and summarises long threads. It only drafts. It never sends anything.', tags: ['Groq API', 'React', 'Node.js'], href: '#flowpilot', wide: true },
  { icon: Globe2, name: 'OppDisco', stage: 'In development', text: 'One place to find jobs, scholarships, internships, grants and training, with some AI help on CVs.', tags: ['Matching', 'Career tech'] },
  { icon: Network, name: 'SurePriceNG', stage: 'In development', text: 'Helps people in Nigeria compare prices and find trustworthy local vendors nearby.', tags: ['Marketplace', 'Local discovery'] },
  { icon: Zap, name: 'Electricity Outage Predictor', stage: 'Research', text: 'Looking at past Nigerian outage reports to see whether patterns can be predicted.', tags: ['Python', 'ML', 'Data analysis'] }
];

const training = [
  [GraduationCap, 'AI and Machine Learning', 'Formal training in the concepts and how they get applied.', 'Completed'],
  [Network, 'n8n Automation Quickstart', 'Intro course on building automated workflows.', 'Completed'],
  [Code2, 'Python Programming', 'Still going. Lessons and exercises, a bit every week.', 'In progress'],
  [Terminal, 'Data Literacy and IT Fundamentals', 'Data basics, IT foundations and technical support.', 'Foundation']
];

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <div className="bar">
        <a className="brand" href="#home"><span className="logo">M</span>Morgtech</a>
        <nav className={open ? 'links open' : 'links'}>
          {nav.map(([l, h]) => <a key={h} href={h} onClick={() => setOpen(false)}>{l}</a>)}
          <a className="btn btn-sm" href="#contact" onClick={() => setOpen(false)}>Contact</a>
        </nav>
        <button className="menu" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X size={20} /> : <Menu size={20} />}</button>
      </div>
    </header>
  );
}

function Head({ kicker, title, sub }) {
  return <div className="head"><span className="kicker">{kicker}</span><h2>{title}</h2>{sub && <p>{sub}</p>}</div>;
}

function FlowPilot() {
  const [task, setTask] = useState('A customer says their order hasn\'t arrived, but tracking shows it\'s still in transit. Write a helpful reply that acknowledges the worry and explains what happens next, without promising a delivery date.');
  const [context, setContext] = useState('We are a small online shop. Only ask for the order number if it\'s really needed.');
  const [category, setCategory] = useState('Customer support');
  const [tone, setTone] = useState('Empathetic');
  const [answer, setAnswer] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [health, setHealth] = useState('checking');
  const [copied, setCopied] = useState(false);

  useEffect(() => { fetch('/api/health').then(r => r.json()).then(d => setHealth(d.configured ? 'ready' : 'setup')).catch(() => setHealth('offline')); }, []);

  const presets = [
    ['Reply to a customer', 'Write a clear, kind reply to this customer message: '],
    ['Sort a request', 'Classify this request by topic, urgency (low/medium/high), sentiment and the team that should handle it. Keep the reasoning short: '],
    ['Summarise a thread', 'Summarise this conversation as: the issue, what has been done, what is still open, and the next step: '],
    ['Write an SOP', 'Turn this process into a short SOP with numbered steps, an owner for each, and checks: ']
  ];
  const label = { ready: 'Groq connected', setup: 'API key needed', offline: 'Backend offline', checking: 'Checking...' }[health];

  async function run(e) {
    e.preventDefault(); setBusy(true); setError(''); setAnswer('');
    try {
      const r = await fetch('/api/assistant', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ task, context, category, tone }) });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || 'Something went wrong.');
      setAnswer(d.answer);
    } catch (err) { setError(err.message || 'Could not connect.'); } finally { setBusy(false); }
  }
  function copy() { navigator.clipboard?.writeText(answer); setCopied(true); setTimeout(() => setCopied(false), 1500); }

  return (
    <section className="section" id="flowpilot">
      <div className="wrap">
        <Head kicker="Live demo" title="Try FlowPilot" sub="I built this to see how far a language model can go with everyday support work. Pick a task, add a bit of context, and it gives you a first draft to edit." />
        <div className="app">
          <div className="app-bar">
            <div className="dots"><i /><i /><i /></div>
            <span className="app-title">flowpilot.app</span>
            <span className={`pill ${health}`}><i />{label}</span>
          </div>
          <div className="app-body">
            <form onSubmit={run} className="app-form">
              <div className="chips">{presets.map(([l, p]) => <button type="button" key={l} onClick={() => { setTask(p); setAnswer(''); }}>{l}</button>)}</div>
              <label>Task or customer message</label>
              <textarea rows="6" value={task} onChange={e => setTask(e.target.value)} maxLength={6000} required />
              <div className="row2">
                <div><label>Category</label><select value={category} onChange={e => setCategory(e.target.value)}><option>Customer support</option><option>Operations</option><option>Workflow planning</option><option>Writing & communication</option><option>Research & analysis</option></select></div>
                <div><label>Tone</label><select value={tone} onChange={e => setTone(e.target.value)}><option>Empathetic</option><option>Professional</option><option>Friendly</option><option>Concise</option><option>Formal</option></select></div>
              </div>
              <label>Extra context <em>optional</em></label>
              <textarea rows="2" value={context} onChange={e => setContext(e.target.value)} maxLength={3000} />
              <div className="submit">
                <small>Please leave out personal or sensitive details.</small>
                <button className="btn" disabled={busy || task.trim().length < 3}>{busy ? 'Thinking...' : <>Generate draft <Send size={14} /></>}</button>
              </div>
            </form>
            <div className="app-out">
              <div className="out-head"><span><Sparkles size={14} /> Draft</span>{answer && <button className="ghost" onClick={copy}>{copied ? <><Check size={13} /> Copied</> : <><Copy size={13} /> Copy</>}</button>}</div>
              {error ? <div className="err"><b>That didn't work</b><p>{error}</p></div>
                : answer ? <div className="answer">{answer}</div>
                : <div className="empty"><Bot size={28} /><b>Nothing yet</b><p>Run a task and your draft shows up here.</p></div>}
            </div>
          </div>
        </div>
        <p className="fine"><ShieldCheck size={14} /> Demo only. FlowPilot writes and analyses text. It doesn't send messages or touch any customer system. Always read the output before using it.</p>
      </div>
    </section>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}&su=${encodeURIComponent('Hello Godwill')}`;
  function copy() {
    const done = () => { setCopied(true); setTimeout(() => setCopied(false), 1800); };
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(EMAIL).then(done, done); else done();
  }
  return (
    <>
      <div className="cta center">
        <a className="btn btn-light" href={gmail} target="_blank" rel="noreferrer">Write me an email <ArrowUpRight size={16} /></a>
        <a className="btn btn-ghost-light" href="https://github.com/morgtech" target="_blank" rel="noreferrer"><Github size={16} /> GitHub</a>
      </div>
      <div className="mailrow">
        <span>{EMAIL}</span>
        <button type="button" onClick={copy}>{copied ? <><Check size={13} /> Copied</> : <><Copy size={13} /> Copy</>}</button>
        <a href={`mailto:${EMAIL}`}>Open mail app</a>
      </div>
    </>
  );
}

function App() {
  return (
    <>
      <Header />
      <main>
        <section className="hero" id="home">
          <div className="glow" />
          <div className="wrap hero-grid">
            <div>
              <span className="badge"><i /> Open to remote work</span>
              <h1>I build useful tech and I'm still getting better at it.</h1>
              <p className="lead">Hi, I'm Godwill Morgan Lekwa. I'm a computer engineer who spent about six years in telecom, then moved into AI data work. These days I'm teaching myself to build things with Python, n8n and LLM APIs like Groq.</p>
              <div className="cta">
                <a className="btn" href="#projects">See my projects <ArrowUpRight size={16} /></a>
                <a className="btn btn-ghost" href="#flowpilot">Try the demo <ArrowRight size={16} /></a>
              </div>
              <div className="loc">Based in Aba, Nigeria. Working with people anywhere.</div>
            </div>
            <div className="mock">
              <div className="mock-top"><span className="logo">M</span><div><b>Morgtech</b><small>Engineering + AI</small></div><span className="pill ready"><i />Online</span></div>
              <div className="mock-row"><Cpu size={16} /><span>Huawei, RF and network deployment</span><em>~6 yrs</em></div>
              <div className="mock-row"><Sparkles size={16} /><span>AI data and LLM evaluation</span><em>Ongoing</em></div>
              <div className="mock-row"><Bot size={16} /><span>FlowPilot AI</span><em>Live demo</em></div>
              <div className="mock-row"><Code2 size={16} /><span>Python</span><em>Learning</em></div>
            </div>
          </div>
          <div className="wrap stats">{stats.map(([n, t]) => <div key={t}><b>{n}</b><span>{t}</span></div>)}</div>
        </section>

        <section className="section" id="about">
          <div className="wrap">
            <Head kicker="About" title="Engineer first, now building with AI." />
            <div className="about">
              <p>I started out in computer engineering and spent roughly six years at Huawei Technologies working on telecom networks. Most of that was deployment, antenna optimisation and RF work.</p>
              <p>Later I picked up AI data projects: annotation, search relevance, and evaluating LLM answers. Doing that day after day taught me how much clean data and clear instructions matter. A model is only as good as what it's fed and how it's judged.</p>
              <p>Now I'm learning to build. Python, n8n and LLM APIs like Groq are the tools I reach for, and I mostly learn by making small things and fixing what breaks.</p>
            </div>
          </div>
        </section>

        <section className="section alt" id="skills">
          <div className="wrap">
            <Head kicker="Skills" title="What I do well, and what I'm still learning." sub="Each card says where I actually stand." />
            <div className="grid3">{skills.map(s => { const I = s.icon; return <article className="card" key={s.title}><div className="ico"><I size={20} /></div><h3>{s.title}</h3><p>{s.text}</p><span className="tag">{s.tag}</span></article>; })}</div>
          </div>
        </section>

        <section className="section" id="projects">
          <div className="wrap">
            <Head kicker="Projects" title="Things I've built and things I'm working on." sub="Every project is marked with its real stage, so you know what's live and what's still an idea in progress." />
            <div className="bento">{projects.map(p => { const I = p.icon; return (
              <article className={p.wide ? 'card wide' : 'card'} key={p.name}>
                <div className="card-top"><div className="ico"><I size={20} /></div><span className={p.wide ? 'stage live' : 'stage'}>{p.stage}</span></div>
                <h3>{p.name}</h3><p>{p.text}</p>
                <div className="tags">{p.tags.map(t => <span key={t}>{t}</span>)}</div>
                {p.href && <a className="link" href={p.href}>Try it below <ArrowUpRight size={14} /></a>}
              </article>); })}</div>
          </div>
        </section>

        <FlowPilot />

        <section className="section alt" id="experience">
          <div className="wrap narrow">
            <Head kicker="Experience" title="Where I've worked." />
            <div className="timeline">
              <article><div className="dot" /><small>Huawei Technologies · about 6 years</small><h3>Telecommunications Engineer</h3><p>Network deployment and technical operations: antenna optimisation, RF engineering, supervising deployments, and working across mobile network technologies.</p><div className="tags"><span>3G/4G/5G</span><span>LTE / MIMO</span><span>RF</span><span>Antenna optimisation</span></div></article>
              <article><div className="dot" /><small>International AI data platforms · project-based</small><h3>AI Data Annotator and LLM Evaluator</h3><p>Annotation, grading model responses, search relevance and multimodal dataset checks on OneForma, RWS, Appen CrowdGen and Lionbridge.</p><div className="tags"><span>LLM evaluation</span><span>Data quality</span><span>Search relevance</span><span>Multimodal</span></div></article>
            </div>
          </div>
        </section>

        <section className="section" id="training">
          <div className="wrap narrow">
            <Head kicker="Training" title="How I'm learning." />
            <div className="list">{training.map(([I, t, d, s]) => <div className="li" key={t}><div className="ico"><I size={18} /></div><div><h3>{t}</h3><p>{d}</p></div><span className={s === 'In progress' ? 'stage' : 'stage live'}>{s}</span></div>)}</div>
          </div>
        </section>

        <section className="section alt" id="ventures">
          <div className="wrap">
            <Head kicker="Ventures" title="Morgtech and ELYON." sub="Two names, one idea: make useful technology easier to get." />
            <div className="grid2">
              <article className="card"><div className="card-top"><div className="ico"><Cpu size={20} /></div><span className="stage live">Personal brand</span></div><h3>Morgtech</h3><p>My own tech and engineering brand. It's where I put software, AI experiments and digital projects.</p><a className="link" href="https://github.com/morgtech" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14} /></a></article>
              <article className="card"><div className="card-top"><div className="ico"><Briefcase size={20} /></div><span className="stage live">Registered company</span></div><h3>ELYON Tech Solutions</h3><p>My registered Nigerian technology company. It's built around software, AI-enabled services and business automation for organisations and individuals. The product line is still growing.</p></article>
            </div>
          </div>
        </section>

        <section className="section" id="contact">
          <div className="wrap">
            <div className="final">
              <h2>Got a project or a role in mind?</h2>
              <p>I'm open to remote work and happy to talk about AI, automation or engineering. Send a message and I'll reply.</p>
              <Contact />
            </div>
          </div>
        </section>
      </main>
      <footer className="footer"><div className="wrap foot"><span>© {new Date().getFullYear()} Godwill Morgan Lekwa</span><span>Morgtech · ELYON Tech Solutions</span><a href="#home">Back to top</a></div></footer>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
