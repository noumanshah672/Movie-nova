import { useMemo, useState } from 'react'
import { Search, Clapperboard, Bookmark, Play, Sparkles, Menu, X, Crown, Globe2, Film, Tv, Star } from 'lucide-react'
import { catalog, type Title } from './catalog'

const tabs = ['Discover','Movies','Series','Anime','Punjabi','Watchlist'] as const
type Tab = typeof tabs[number]
const plans = [{name:'Monthly',price:'499',duration:'1 month'},{name:'Quarterly',price:'1,299',duration:'3 months'},{name:'Half-yearly',price:'2,299',duration:'6 months'},{name:'Yearly',price:'3,999',duration:'12 months'}]

export default function App() {
 const [tab,setTab] = useState<Tab>('Discover')
 const [query,setQuery] = useState('')
 const [saved,setSaved] = useState<number[]>(()=>JSON.parse(localStorage.getItem('mn-watchlist')||'[]'))
 const [selected,setSelected] = useState<Title|null>(null)
 const [menu,setMenu] = useState(false)
 const [notice,setNotice] = useState('')
 const [plan,setPlan] = useState('Monthly')
 const filtered = useMemo(()=>catalog.filter(m=>{
  const q=query.toLowerCase()
  const match = `${m.title} ${m.language} ${m.genre} ${m.region}`.toLowerCase().includes(q)
  const category = tab==='Discover' || (tab==='Watchlist' ? saved.includes(m.id) : tab==='Punjabi' ? m.language==='Punjabi' : m.kind===tab.slice(0,-1) || (tab==='Series'&&m.kind==='Series') || (tab==='Anime'&&m.kind==='Anime'))
  return match && category
 }),[query,tab,saved])
 function toggleSave(id:number){const next=saved.includes(id)?saved.filter(x=>x!==id):[...saved,id];setSaved(next);localStorage.setItem('mn-watchlist',JSON.stringify(next))}
 return <div className="app-shell">
  <div className="ambient ambient-red"/><div className="ambient ambient-blue"/>
  <header className="topbar"><a className="brand" onClick={()=>setTab('Discover')}><span className="brand-mark"><Clapperboard size={21}/></span><span>MOVIE<span className="accent">NOVA</span></span></a>
   <nav className="desktop-nav">{tabs.map(t=><button className={tab===t?'nav-active':''} key={t} onClick={()=>setTab(t)}>{t}</button>)}</nav>
   <div className="header-actions"><label className="searchbox"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search titles, language..."/></label><button className="menu-btn" onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button></div>
  </header>
  {menu&&<nav className="mobile-nav">{tabs.map(t=><button key={t} onClick={()=>{setTab(t);setMenu(false)}}>{t}</button>)}</nav>}
  <main>
   <section className="hero"><div className="hero-copy"><div className="eyebrow"><Sparkles size={14}/> YOUR WORLD OF ENTERTAINMENT</div><h1>Stories without<br/><span>boundaries.</span></h1><p>Discover movies, series and anime from Pakistan, India, Korea, Türkiye and around the world.</p><div className="hero-buttons"><button className="primary" onClick={()=>document.getElementById('catalog')?.scrollIntoView({behavior:'smooth'})}><Play size={16} fill="currentColor"/> Explore titles</button><button className="secondary" onClick={()=>setTab('Watchlist')}><Bookmark size={16}/> My watchlist</button></div><div className="hero-stats"><span><Globe2/> Global stories</span><span><Film/> Movies & series</span><span><Star/> Curated discovery</span></div></div><div className="hero-art"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="poster-stack"><div className="poster poster-a"><span>THE<br/>UNKNOWN</span></div><div className="poster poster-b"><span>BEYOND<br/>THE SKY</span></div><div className="poster poster-c"><span>FINAL<br/>CHAPTER</span></div></div><div className="floating-chip"><Sparkles size={15}/> Discover something new</div></div></section>
   <section className="catalog-section" id="catalog"><div className="section-heading"><div><div className="eyebrow">CURATED FOR YOU</div><h2>{tab==='Discover'?'Explore the universe':tab}</h2><p>Find your next favourite story.</p></div><div className="result-count">{filtered.length} TITLES</div></div>
    <div className="filter-row">{tabs.slice(0,5).map(t=><button key={t} className={tab===t?'filter-active':''} onClick={()=>setTab(t)}>{t}</button>)}</div>
    <div className="movie-grid">{filtered.map(m=><article className="movie-card" key={m.id}><div className={`cover cover-${m.id%6}`}><div className="cover-glow"/><span className="cover-kind">{m.kind}</span><div className="cover-title">{m.title}</div><span className="cover-year">{m.year} · {m.language}</span><button className="quick-play" onClick={()=>setSelected(m)}><Play size={17} fill="currentColor"/></button></div><div className="movie-info"><div><h3>{m.title}</h3><p>{m.genre} · {m.region}</p></div><button className={saved.includes(m.id)?'save saved':'save'} onClick={()=>toggleSave(m.id)} aria-label="Save title"><Bookmark size={17} fill={saved.includes(m.id)?'currentColor':'none'}/></button></div></article>)}</div>
    {filtered.length===0&&<div className="empty"><Search size={30}/><h3>No titles found</h3><p>Try another search or category.</p></div>}
   </section>
   <section className="membership"><div className="membership-copy"><div className="eyebrow"><Crown size={14}/> NOVA MEMBERSHIP</div><h2>More stories.<br/><span>One membership.</span></h2><p>Choose a plan to preview membership options. Payments are not active yet.</p><div className="payment-note">Easypaisa payment setup: <b>Not connected</b></div></div><div className="plans">{plans.map(p=><button key={p.name} className={`plan ${plan===p.name?'plan-selected':''}`} onClick={()=>setPlan(p.name)}><span>{p.name}</span><strong>Rs {p.price}</strong><small>{p.duration}</small></button>)}<button className="primary plan-continue" onClick={()=>setNotice('Membership checkout is in setup mode. Easypaisa merchant approval and secure server credentials are needed before payments can be accepted.')}>Continue with {plan}</button></div></section>
   <section className="ad-slot"><span>ADVERTISEMENT SPACE</span><p>Ad network will be connected after approval. No ads are running yet.</p></section>
  </main>
  <footer><a className="brand"><span className="brand-mark"><Clapperboard size={18}/></span>MOVIE<span className="accent">NOVA</span></a><p>Discover stories from everywhere.</p><small>Movie Nova is a discovery catalogue. Watch availability depends on official providers.</small></footer>
  {selected&&<div className="modal-backdrop" onClick={()=>setSelected(null)}><div className="detail-modal" onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={()=>setSelected(null)}><X/></button><div className="eyebrow">{selected.kind} · {selected.year}</div><h2>{selected.title}</h2><p>{selected.description}</p><div className="detail-meta">{selected.language} · {selected.genre} · {selected.region}</div><button className="secondary" onClick={()=>toggleSave(selected.id)}><Bookmark size={16}/> {saved.includes(selected.id)?'Remove from watchlist':'Add to watchlist'}</button><p className="small-note">This catalogue does not host or stream copyrighted films.</p></div></div>}
  {notice&&<div className="toast" role="status">{notice}<button onClick={()=>setNotice('')}>OK</button></div>}
 </div>
}