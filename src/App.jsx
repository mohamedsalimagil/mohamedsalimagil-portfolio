import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaTimes, FaExternalLinkAlt, FaDownload, FaMapMarkerAlt, FaPaperPlane, FaLightbulb } from 'react-icons/fa';
import { SiPython, SiJavascript, SiReact, SiFlask, SiPostgresql, SiGit, SiTailwindcss, SiNodedotjs } from 'react-icons/si';

// IMPORT ASSETS
import logo from './assets/logo.png'; 
import cliImage from './assets/cli.png'; 
import resumeFile from './assets/resume.pdf'; 
import introVideo from './assets/intro.mp4'; // <--- IMPORTED VIDEO

// --- ANIMATION VARIANTS FOR NAME ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.5 },
  },
};

const letterVariants = {
  hidden: { y: -50, opacity: 0, rotate: -20 },
  visible: {
    y: 0,
    opacity: 1,
    rotate: 0,
    transition: { type: "spring", damping: 12, stiffness: 200 },
  },
};

// --- DATA ---
const initialSkills = [
  { id: 1, name: "Python", icon: <SiPython />, color: "#fbbf24", role: "Backend / Scripting", desc: "Data processing, CLI tools, and server-side logic." }, 
  { id: 2, name: "JavaScript", icon: <SiJavascript />, color: "#facc15", role: "Core Logic", desc: "ES6+ standards, DOM manipulation, and async operations." }, 
  { id: 3, name: "React", icon: <SiReact />, color: "#22d3ee", role: "Frontend Framework", desc: "Component-based architecture, Hooks, and State Management." }, 
  { id: 4, name: "Flask", icon: <SiFlask />, color: "#ffffff", role: "API Framework", desc: "Lightweight RESTful APIs and microservices." }, 
  { id: 5, name: "PostgreSQL", icon: <SiPostgresql />, color: "#3b82f6", role: "Database", desc: "Complex queries, relational data modeling, and integrity." }, 
  { id: 6, name: "Git", icon: <SiGit />, color: "#f97316", role: "Version Control", desc: "Branch management, merging, and CI/CD workflows." }, 
  { id: 7, name: "Tailwind", icon: <SiTailwindcss />, color: "#38bdf8", role: "Styling Engine", desc: "Utility-first CSS for responsive, modern UIs." }, 
  { id: 8, name: "Node.js", icon: <SiNodedotjs />, color: "#4ade80", role: "Runtime Environment", desc: "Server-side JavaScript execution and package management." }, 
  null 
];

const projects = [
  {
    id: 1,
    title: "Haki Yetu Digital",
    type: "Full-Stack Web App",
    tech_line: "React • Flask • PostgreSQL",
    desc: "A legal-tech platform connecting Kenyans to justice resources. Features role-based auth (Lawyer/Client) and secure document handling.",
    link: "https://haki-yetu-digital.vercel.app/",
    chainLength: 12 
  },
  {
    id: 2,
    title: "FanyaMap",
    type: "Volunteer Connect Platform",
    tech_line: "React • Flask • APIs", 
    desc: "Connects Kenyan communities with volunteer opportunities. Features role-based dashboards for NGOs/Volunteers and real-time application tracking.",
    link: "https://fanyamap-frontend.onrender.com/",
    chainLength: 14
  },
  {
    id: 3,
    title: "TaskZilla Lite",
    type: "Task Management System",
    tech_line: "JavaScript • JSON Server",
    desc: "A robust task manager supporting CRUD operations, priority sorting, and local data persistence.",
    link: "https://mohamedsalimagil.github.io/TaskZilla/",
    chainLength: 8
  },
  {
    id: 4,
    title: "Blood Glucose (Web)",
    type: "Health Tracking App",
    tech_line: "JavaScript • HTML5 • CSS3",
    desc: "A responsive client-side app for logging health data. Features dynamic DOM updates and chart visualizations.",
    link: "https://mohamedsalimagil.github.io/Blood-Glucose-Tracker/",
    chainLength: 10
  },
  {
    id: 5,
    title: "Blood Glucose (CLI)",
    type: "Python Command Line Tool",
    tech_line: "Python • Replit Embed",
    desc: "A backend-focused tool for health data. Running live via Replit environment.",
    link: "https://replit.com/@MohamedAgil/bloodglucosetracker?embed=true",
    repo: "https://github.com/mohamedsalimagil/blood_glucose_tracker",
    isCLI: true, 
    image: cliImage,
    chainLength: 6
  }
];

function App() {
  const [selectedId, setSelectedId] = useState(null);
  const [grid, setGrid] = useState(initialSkills);
  const [activeSkill, setActiveSkill] = useState(initialSkills[0]);
  const [isPaused, setIsPaused] = useState(false);
  const [litBulbs, setLitBulbs] = useState({});

  const toggleBulb = (id) => {
    setLitBulbs(prev => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    if (isPaused) return;
    const moveTile = () => {
      setGrid(currentGrid => {
        const emptyIndex = currentGrid.indexOf(null);
        const row = Math.floor(emptyIndex / 3);
        const col = emptyIndex % 3;
        const neighbors = [];
        if (row > 0) neighbors.push(emptyIndex - 3); 
        if (row < 2) neighbors.push(emptyIndex + 3); 
        if (col > 0) neighbors.push(emptyIndex - 1); 
        if (col < 2) neighbors.push(emptyIndex + 1); 
        const randomNeighborIndex = neighbors[Math.floor(Math.random() * neighbors.length)];
        const newGrid = [...currentGrid];
        const tileToMove = newGrid[randomNeighborIndex];
        newGrid[emptyIndex] = tileToMove;
        newGrid[randomNeighborIndex] = null;
        setActiveSkill(tileToMove);
        return newGrid;
      });
    };
    const intervalId = setInterval(moveTile, 2000); 
    return () => clearInterval(intervalId);
  }, [isPaused]); 

  // Function to split text for animation
  const nameText = "MOHAMED SALIM AGIL";

  return (
    <div className="min-h-screen text-slate-300 font-sans selection:bg-amber-500 selection:text-black">
      
      {/* --- NAVBAR --- */}
      <nav className="fixed w-full top-0 z-50 px-6 py-4 flex justify-between items-center backdrop-blur-md bg-black/40 border-b border-white/5">
        <div className="w-auto overflow-hidden"> 
            <motion.div 
              className="text-xl md:text-2xl font-bold tracking-wider text-amber-400 font-mono drop-shadow-[0_0_5px_rgba(251,191,36,0.5)] flex"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {nameText.split("").map((char, index) => (
                <motion.span key={index} variants={letterVariants}>
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.div>
        </div>
        <ul className="flex gap-8 text-xs font-bold tracking-[0.2em] text-slate-400 uppercase hidden md:flex">
          <li className="hover:text-amber-400 cursor-pointer transition"><a href="#skills">Skills</a></li>
          <li className="hover:text-amber-400 cursor-pointer transition"><a href="#projects">Work</a></li>
          <li className="hover:text-amber-400 cursor-pointer transition"><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="min-h-screen flex items-center px-4 md:px-20 pt-20 bg-transparent">
        <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row items-center md:items-start gap-12">
            
            {/* LEFT: Video Identity (REPLACED LOGO WITH VIDEO) */}
            <div className="flex-shrink-0">
                <div className="w-56 h-56 rounded-full overflow-hidden border-[4px] border-slate-700 shadow-xl bg-black relative">
                    <video 
                      autoPlay 
                      loop 
                      muted 
                      playsInline 
                      className="w-full h-full object-cover"
                    >
                      <source src={introVideo} type="video/mp4" />
                    </video>
                </div>
            </div>

            {/* RIGHT: Text Content */}
            <div className="text-left">
                <p className="text-amber-500 font-bold text-sm tracking-widest uppercase mb-4">Junior Software Engineer</p>
                <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-white tracking-tight leading-tight">
                    Mohamed Salim Agil
                </h1>
                <p className="text-xl md:text-2xl text-slate-400 mb-6 font-light">
                    Engineering Logic. <span className="text-white font-medium">Designing Value.</span>
                </p>
                <p className="max-w-2xl text-slate-500 text-base mb-8 leading-relaxed">
                   I transform complex problems into clean, reliable code. 
                   My background in high-stakes accounting ensures accuracy; my passion for code ensures innovation.
                </p>
                <div className="flex flex-wrap gap-4">
                    <a href={resumeFile} download="Mohamed_Salim_Agil_Resume" className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded shadow-sm transition hover:-translate-y-1 flex items-center gap-2">
                      <FaDownload /> Download Resume
                    </a>
                    <div className="flex items-center gap-4 px-4">
                        <a href="https://github.com/mohamedsalimagil" target="_blank" className="text-2xl text-slate-500 hover:text-white transition"><FaGithub /></a>
                        <a href="https://linkedin.com/in/mohamed-salim-agil-110a92270" target="_blank" className="text-2xl text-slate-500 hover:text-white transition"><FaLinkedin /></a>
                    </div>
                </div>
            </div>
        </div>
      </header>

      {/* --- SKILLS SECTION --- */}
      <section id="skills" className="py-24 px-4 bg-black/20 border-t border-white/5">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
              <div className="w-full md:w-1/2 flex flex-col items-start">
                  <div className="mb-6 text-left">
                      <h2 className="text-2xl font-bold text-white tracking-widest uppercase">Core Stack</h2>
                      <p className="text-xs text-slate-500 mt-2">Interactive Diagnostics</p>
                  </div>
                  <div className="crt-monitor w-full max-w-md h-56 bg-black p-8 flex flex-col justify-center items-start relative group">
                      <div className="text-left w-full relative z-10">
                          <p className="crt-text text-sm opacity-50 mb-4 border-b border-slate-800 pb-2">
                             root@msa-portfolio:~# scan_module --target="{activeSkill ? activeSkill.name.toUpperCase() : "..."}"
                          </p>
                          {activeSkill && (
                              <motion.div key={activeSkill.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
                                  <div className="flex justify-between items-center mb-2">
                                     <p className="crt-text text-2xl font-bold text-white">{activeSkill.name}</p>
                                     <span className="text-[10px] bg-slate-800 text-amber-500 px-2 py-1 rounded code-font uppercase">{activeSkill.role}</span>
                                  </div>
                                  <p className="crt-text text-sm text-slate-400 leading-snug">&gt; {activeSkill.desc}</p>
                              </motion.div>
                          )}
                          <p className="crt-text text-xs mt-4 text-amber-500 animate-pulse">
                             {isPaused ? "_PAUSED // USER_INTERACTION_DETECTED" : "_RUNNING_DIAGNOSTIC..."}
                          </p>
                      </div>
                  </div>
              </div>
              <div className="w-full md:w-1/2 flex justify-center md:justify-start">
                  <div className="grid grid-cols-3 gap-3 bg-[#1e293b]/80 p-4 rounded-xl shadow-lg border border-slate-700 w-fit" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
                      {grid.map((skill, index) => (
                          <div key={index} className="w-24 h-24 rounded-lg flex items-center justify-center relative bg-slate-800/50">
                            <AnimatePresence mode='popLayout'>
                                {skill && (
                                    <motion.div layoutId={`skill-${skill.id}`} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} onMouseEnter={() => setActiveSkill(skill)} className="w-24 h-24 absolute inset-0 bg-[#0f172a] border border-slate-600 rounded-lg flex flex-col items-center justify-center shadow-md cursor-pointer hover:border-amber-500 hover:bg-slate-800 transition-colors group">
                                        <div className="text-3xl mb-1 group-hover:scale-110 transition-transform" style={{ color: skill.color }}>{skill.icon}</div>
                                        <span className="text-[10px] font-bold text-slate-400 group-hover:text-white uppercase">{skill.name}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                          </div>
                      ))}
                  </div>
              </div>
          </div>
      </section>

      {/* --- PROJECTS SECTION --- */}
      <section id="projects" className="py-32 px-4 relative bg-transparent">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-24 text-center text-white">
             Featured <span className="text-amber-500">Deployments</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-32 justify-center">
            {projects.map((project) => (
              <div key={project.id} className="relative flex flex-col items-center h-[450px]">
                <div className="flex flex-col items-center mb-[-5px] relative z-0">
                    <div onClick={() => toggleBulb(project.id)} className={`text-2xl mb-1 cursor-pointer transition-colors duration-200 ${litBulbs[project.id] ? 'text-amber-400' : 'text-slate-600'}`}>
                        <FaLightbulb />
                    </div>
                    {[...Array(project.chainLength)].map((_, i) => (<div key={i} className="chain-link"></div>))}
                    <div className="w-3 h-3 rounded-full bg-slate-600 mt-1"></div>
                </div>
                <motion.div layoutId={`card-${project.id}`} onClick={() => setSelectedId(project.id)} className="w-full bg-[#0f172a] border-[6px] border-[#1e293b] rounded-[20px] shadow-xl relative z-20 overflow-hidden cursor-pointer hover:-translate-y-1 transition-transform duration-300" style={{ aspectRatio: '3/4' }}>
                  <div className="h-5 w-full bg-[#1e293b] flex justify-center items-center z-30 relative border-b border-white/5">
                      <div className="w-1 h-1 rounded-full bg-slate-500"></div>
                  </div>
                  <div className="relative w-full h-full bg-black group">
                     <div className={`absolute inset-0 z-10 transition duration-300 pointer-events-none ${litBulbs[project.id] ? 'bg-amber-500/10' : 'bg-black/50'}`}></div>
                     {project.isCLI ? ( <img src={project.image} className="w-full h-full object-cover opacity-90" /> ) : ( <iframe src={project.link} className="w-[400%] h-[400%] origin-top-left transform scale-[0.25] border-none no-scrollbar bg-white" loading="lazy" /> )}
                     <div className="absolute inset-0 bg-[#0f172a]/95 flex flex-col items-center justify-center p-6 text-center opacity-0 group-hover:opacity-100 transition duration-200 z-30">
                        <p className="text-amber-500 font-bold text-xs uppercase mb-2">System Function</p>
                        <p className="text-white text-sm leading-relaxed">{project.desc}</p>
                        <p className="text-slate-500 text-[10px] mt-4">Click to Expand & Launch</p>
                     </div>
                     <div className="absolute bottom-0 w-full p-4 bg-[#0f172a] border-t border-white/5 z-20 flex justify-between items-center">
                        <h3 className="text-white font-bold text-sm truncate">{project.title}</h3>
                        <p className="text-amber-500 text-[10px] font-bold uppercase">{project.type}</p>
                     </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT FORM --- */}
      <section id="contact" className="py-32 px-4 bg-black/30">
          <div className="max-w-5xl mx-auto bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl">
              <div className="md:w-5/12 bg-black/40 p-10 flex flex-col justify-between border-r border-slate-800">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-6">Let's Connect.</h2>
                    <p className="text-slate-400 mb-8 leading-relaxed">
                        I am currently available for Full-Stack roles. 
                        Fill out the form, and I will receive your message instantly.
                    </p>
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 text-slate-300">
                            <FaEnvelope className="text-amber-500"/>
                            <a href="mailto:mohamedsalimagil.dev@gmail.com" className="hover:text-white transition text-sm">mohamedsalimagil.dev@gmail.com</a>
                        </div>
                        <div className="flex items-center gap-4 text-slate-300">
                            <FaMapMarkerAlt className="text-amber-500"/>
                            <p className="text-sm">Mombasa, Kenya</p>
                        </div>
                    </div>
                  </div>
              </div>

              <div className="md:w-7/12 p-10">
                  <form action="https://formspree.io/f/xpqdzryl" method="POST" className="flex flex-col gap-6">
                       <div className="grid grid-cols-2 gap-6">
                           <div>
                               <label className="block text-xs text-slate-500 uppercase tracking-wider mb-2">First Name</label>
                               <motion.input 
                                  whileFocus={{ scale: 1.02, borderColor: '#fbbf24', backgroundColor: 'rgba(251, 191, 36, 0.05)' }}
                                  transition={{ duration: 0.2 }}
                                  type="text" name="firstName" className="modern-input" placeholder="Jane" required 
                               />
                           </div>
                           <div>
                               <label className="block text-xs text-slate-500 uppercase tracking-wider mb-2">Last Name</label>
                               <motion.input 
                                  whileFocus={{ scale: 1.02, borderColor: '#fbbf24', backgroundColor: 'rgba(251, 191, 36, 0.05)' }}
                                  transition={{ duration: 0.2 }}
                                  type="text" name="lastName" className="modern-input" placeholder="Doe" required 
                               />
                           </div>
                       </div>
                       <div>
                           <label className="block text-xs text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
                           <motion.input 
                              whileFocus={{ scale: 1.02, borderColor: '#fbbf24', backgroundColor: 'rgba(251, 191, 36, 0.05)' }}
                              transition={{ duration: 0.2 }}
                              type="email" name="email" className="modern-input" placeholder="jane@company.com" required 
                           />
                       </div>
                       <div>
                           <label className="block text-xs text-slate-500 uppercase tracking-wider mb-2">Message</label>
                           <motion.textarea 
                              whileFocus={{ scale: 1.02, borderColor: '#fbbf24', backgroundColor: 'rgba(251, 191, 36, 0.05)' }}
                              transition={{ duration: 0.2 }}
                              name="message" className="modern-input h-32" placeholder="Project details..." required
                           ></motion.textarea>
                       </div>
                       <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          type="submit" 
                          className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-3 px-6 rounded transition flex items-center justify-center gap-2 mt-2"
                       >
                           <FaPaperPlane /> Send Message
                       </motion.button>
                  </form>
              </div>
          </div>
          <footer className="mt-20 text-center text-slate-600 text-xs">
              <p>&copy; 2026 Mohamed Salim Agil.</p>
          </footer>
      </section>

      {/* --- MODAL (UPDATED WITH REPLIT + GITHUB BUTTONS) --- */}
      <AnimatePresence>
        {selectedId && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <div className="absolute inset-0" onClick={() => setSelectedId(null)}></div>
            {projects.map(project => (
                project.id === selectedId && (
                    <motion.div layoutId={`card-${project.id}`} key={project.id} className="w-full max-w-6xl bg-[#0f172a] border border-slate-700 rounded-xl overflow-hidden shadow-2xl relative z-70 flex flex-col md:flex-row h-[90vh]">
                        
                        {/* SIDEBAR CONTENT */}
                        <div className="w-full md:w-4/12 p-8 flex flex-col bg-[#111c30] border-r border-slate-700 overflow-y-auto">
                            <button onClick={(e) => { e.stopPropagation(); setSelectedId(null); }} className="self-end text-slate-400 hover:text-white mb-6 p-2 rounded hover:bg-slate-700 transition"><FaTimes /></button>
                            <h2 className="text-3xl font-bold text-white mb-2">{project.title}</h2>
                            <p className="text-amber-500 text-xs uppercase tracking-widest font-bold mb-6">{project.type}</p>
                            <p className="text-slate-300 text-sm leading-relaxed mb-8">{project.desc}</p>
                            
                            {/* BUTTON 1: LIVE DEMO (Replit or Website) */}
                            <a href={project.link} target="_blank" rel="noreferrer" className="mt-auto py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-center uppercase tracking-widest rounded transition flex justify-center items-center gap-2">
                                {project.isCLI ? "Run Live Terminal" : "Launch Live App"} <FaExternalLinkAlt />
                            </a>

                            {/* BUTTON 2: SOURCE CODE (GitHub) - Conditional */}
                            {project.repo && (
                                <a href={project.repo} target="_blank" rel="noreferrer" className="mt-4 py-4 bg-slate-700 hover:bg-slate-600 text-white font-bold text-center uppercase tracking-widest rounded transition flex justify-center items-center gap-2">
                                    <FaGithub className="text-xl"/> Source Code
                                </a>
                            )}
                        </div>

                        {/* PREVIEW WINDOW */}
                        <div className="w-full md:w-8/12 bg-black relative flex items-center justify-center">
                            {project.isCLI ? (
                                <iframe 
                                    src={project.link} 
                                    className="w-full h-full border-none bg-black rounded-lg"
                                    title="Replit CLI"
                                    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                                    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
                                />
                            ) : (
                                <iframe src={project.link} className="w-full h-full border-none bg-white" title="Project Web View" />
                            )}
                        </div>
                    </motion.div>
                )
            ))}
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default App;