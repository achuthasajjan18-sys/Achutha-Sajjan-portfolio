import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Linkedin,
  Github,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ExternalLink,
  Award,
  GraduationCap,
  Send,
  Sparkles,
  CheckCircle2,
  Cpu,
  Menu,
  X,
  Code2,
  Database,
  Palette,
  Check
} from "lucide-react";
import { personalInfo, projects, skillsData, education, certifications } from "./data";
import { SemanticNetworkCanvas } from "./components/SemanticNetworkCanvas";

// Detailed mapping for the two Design Options
interface ThemeConfig {
  id: "pastel" | "slate";
  name: string;
  description: string;
  fontSans: string;
  fontDisplay: string;
  
  // Section Backgrounds
  bgHero: string;
  bgAbout: string;
  bgProjects: string;
  bgSkills: string;
  bgEdu: string;
  bgContact: string;
  bgFooter: string;
  
  // Colors & Typography
  textDark: string;
  textBody: string;
  accentText: string;
  accentBg: string;
  accentBorder: string;
  accentHoverBg: string;
  accentHoverText: string;
  secondaryText: string;
  secondaryBorder: string;
  
  // Component styling
  navBg: string;
  navBorder: string;
  logoBg: string;
  cardBg: string;
  cardBorder: string;
  cardHoverBorder: string;
  skillPill: string;
  tagBg: string;
  quoteBg: string;
  quoteBorder: string;
  formBg: string;
  inputBg: string;
  inputBorder: string;
  
  // Visual effects
  shadowClass: string;
  hoverShadowClass: string;

  // SPARE/MUTED HIGHLIGHTS (Rule: Only punchlines get this treatment, no inline bold-colored spans)
  highlight1: string; // dusty rose / indigo wash at low opacity
  highlight2: string; // sage / neutral gray wash at low opacity
}

const themeConfigs: Record<"pastel" | "slate", ThemeConfig> = {
  pastel: {
    id: "pastel",
    name: "Muted Pastel & Aubergine",
    description: "Gentle lavender-to-sage gradients with warm serifs and soft-fill tags",
    fontSans: "font-sans", // Sora
    fontDisplay: "font-display", // Fraunces
    bgHero: "bg-gradient-to-br from-[#EDE9F5] via-[#FAF9FB] to-[#E8EDE6]",
    bgAbout: "bg-gradient-to-b from-[#E8EDE6] via-[#FAF9FB] to-[#F5E9E3]",
    bgProjects: "bg-[#E8EDE6]/80 backdrop-blur-sm",
    bgSkills: "bg-[#F5E9E3]/90 backdrop-blur-sm",
    bgEdu: "bg-[#EDEEF0]/95 backdrop-blur-sm",
    bgContact: "bg-[#F5EBF1]/95",
    bgFooter: "bg-[#FAF9FB]",
    
    textDark: "text-[#2E2B2E]",
    textBody: "text-[#4A454A]",
    accentText: "text-[#5B3A5C]",
    accentBg: "bg-[#5B3A5C]",
    accentBorder: "border-[#5B3A5C]",
    accentHoverBg: "hover:bg-[#452B46]",
    accentHoverText: "hover:text-[#5B3A5C]",
    secondaryText: "text-[#C97D74]",
    secondaryBorder: "border-[#C97D74]/25",
    
    navBg: "bg-[#EDE9F5]/85 backdrop-blur-md",
    navBorder: "border-[#C97D74]/15",
    logoBg: "bg-[#5B3A5C]",
    cardBg: "bg-white/85 backdrop-blur-md",
    cardBorder: "border-[#C97D74]/15",
    cardHoverBorder: "hover:border-[#5B3A5C]/40",
    skillPill: "bg-[#FAF9F6] border border-[#C97D74]/25 hover:border-[#5B3A5C]/40 hover:text-[#5B3A5C] text-[#4A454A] shadow-sm",
    tagBg: "bg-[#EDE9F5] text-[#5B3A5C]",
    quoteBg: "bg-[#FAF9FB]",
    quoteBorder: "border-[#5B3A5C]",
    formBg: "bg-white/95 border border-[#C97D74]/15",
    inputBg: "bg-[#FAF9FB]",
    inputBorder: "border-[#C97D74]/25 focus:border-[#5B3A5C]",
    
    shadowClass: "shadow-plum-soft",
    hoverShadowClass: "shadow-plum-hover",
    
    highlight1: "bg-[#C97D74]/20 text-[#2E2B2E]",
    highlight2: "bg-[#E8EDE6] text-[#2E2B2E]"
  },
  slate: {
    id: "slate",
    name: "Swiss Slate & Indigo",
    description: "Breathable neutral off-white with crisp sans-serifs and a confident violet accent",
    fontSans: "font-inter", // Inter
    fontDisplay: "font-grotesk", // Space Grotesk
    bgHero: "bg-[#F7F6F3]",
    bgAbout: "bg-[#FAF9F6]",
    bgProjects: "bg-[#FAF9F6] border-t border-[#8A8580]/15",
    bgSkills: "bg-[#F7F6F3]",
    bgEdu: "bg-[#FAF9F6]",
    bgContact: "bg-[#F7F6F3]",
    bgFooter: "bg-[#FAF9F6]",
    
    textDark: "text-[#171614]",
    textBody: "text-[#403D3A]",
    accentText: "text-[#5B4FE8]",
    accentBg: "bg-[#5B4FE8]",
    accentBorder: "border-[#5B4FE8]",
    accentHoverBg: "hover:bg-[#4237C9]",
    accentHoverText: "hover:text-[#5B4FE8]",
    secondaryText: "text-[#8A8580]",
    secondaryBorder: "border-[#8A8580]/20",
    
    navBg: "bg-[#F7F6F3]/90 backdrop-blur-md",
    navBorder: "border-[#8A8580]/15",
    logoBg: "bg-[#5B4FE8]",
    cardBg: "bg-white",
    cardBorder: "border-[#8A8580]/15",
    cardHoverBorder: "hover:border-[#5B4FE8]/40",
    skillPill: "border border-[#8A8580]/30 hover:border-[#5B4FE8]/50 hover:text-[#5B4FE8] text-[#403D3A]",
    tagBg: "bg-[#F1EFEB] text-[#171614]",
    quoteBg: "bg-[#FAF9F6]",
    quoteBorder: "border-[#5B4FE8]",
    formBg: "bg-[#FAF9F6] border border-[#8A8580]/15",
    inputBg: "bg-white",
    inputBorder: "border-[#8A8580]/30 focus:border-[#5B4FE8]",
    
    shadowClass: "shadow-sm",
    hoverShadowClass: "hover:shadow-md",
    
    highlight1: "bg-[#5B4FE8]/10 text-[#171614]",
    highlight2: "bg-[#8A8580]/15 text-[#171614]"
  }
};

export default function App() {
  const [activeTheme, setActiveTheme] = useState<"pastel" | "slate">("pastel");
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const t = themeConfigs[activeTheme];

  // Monitor scroll for header background and active section
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ["hero", "about", "projects", "skills", "education", "contact"];
      const scrollPosition = window.scrollY + 140; // offset

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formState.name && formState.email && formState.message) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormState({ name: "", email: "", message: "" });
      }, 1000);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
      setActiveSection(id);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${t.fontSans} ${t.textBody} antialiased selection:bg-[#5B3A5C]/10 selection:text-[#5B3A5C] relative`}>
      
      {/* Dynamic Background Blur Blobs for Option 2 (Soft Pastel) */}
      {activeTheme === "pastel" && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-[5%] left-[5%] w-[45vw] h-[45vw] max-w-[600px] rounded-full bg-[#EDE9F5] opacity-60 blur-3xl animate-pulse duration-[12s]" />
          <div className="absolute top-[35%] right-[-5%] w-[40vw] h-[40vw] max-w-[500px] rounded-full bg-[#E8EDE6] opacity-60 blur-3xl" />
          <div className="absolute bottom-[20%] left-[-10%] w-[35vw] h-[35vw] max-w-[450px] rounded-full bg-[#F5E9E3] opacity-50 blur-3xl" />
          <div className="absolute bottom-5 right-[10%] w-[30vw] h-[30vw] max-w-[400px] rounded-full bg-[#F5EBF1] opacity-65 blur-3xl" />
        </div>
      )}

      {/* HEADER / NAVIGATION */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          scrolled
            ? `${t.navBg} ${t.navBorder} py-4 shadow-sm`
            : "bg-transparent border-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between relative">
          
          <button
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-3 group focus:outline-none cursor-pointer"
          >
            {/* Sparing Accent Logo Mark */}
            <div className={`w-8 h-8 rounded-full ${t.logoBg} ${t.logoText} flex items-center justify-center font-semibold text-sm tracking-tighter transition-transform duration-300 group-hover:scale-105`}>
              AS
            </div>
            <span className={`font-semibold tracking-tight text-lg ${t.fontDisplay} ${t.textDark}`}>
              Achutha Sajjan
            </span>
          </button>

          {/* Desktop Navigation Menu */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider">
            {[
              { id: "about", label: "About" },
              { id: "projects", label: "Projects" },
              { id: "skills", label: "Skills" },
              { id: "education", label: "Education" },
              { id: "contact", label: "Contact" }
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`relative py-1 cursor-pointer transition-colors duration-300 ${
                  activeSection === link.id
                    ? t.accentText
                    : `${t.textDark}/75 hover:text-[#5B3A5C]`
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.div
                    layoutId="activeUnderline"
                    className={`absolute bottom-0 left-0 right-0 h-0.5 ${t.logoBg} rounded-full`}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}

            {/* THEME SELECTOR BUTTON */}
            <div className="relative">
              <button
                onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
                className={`flex items-center gap-2 px-3 py-2 border rounded-md transition-all duration-300 text-[11px] font-mono cursor-pointer ${
                  themeDropdownOpen ? `${t.accentBorder} ${t.accentText}` : `${t.secondaryBorder} ${t.textDark}/80 hover:${t.accentBorder}`
                }`}
              >
                <Palette size={13} />
                <span>Theme: {t.name.split(" ")[0]}</span>
              </button>
              
              <AnimatePresence>
                {themeDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className={`absolute right-0 mt-2 w-72 p-4 rounded-xl shadow-xl border ${t.cardBg} ${t.cardBorder} z-50`}
                  >
                    <div className="text-[10px] font-mono uppercase tracking-widest text-brand-secondary mb-3 pb-2 border-b border-brand-secondary/10">
                      Select Design Option
                    </div>
                    <div className="space-y-2">
                      {(["pastel", "slate"] as const).map((themeId) => {
                        const item = themeConfigs[themeId];
                        const isSelected = activeTheme === themeId;
                        return (
                          <button
                            key={themeId}
                            onClick={() => {
                              setActiveTheme(themeId);
                              setThemeDropdownOpen(false);
                            }}
                            className={`w-full text-left p-2.5 rounded-lg transition-colors flex items-start gap-3 cursor-pointer ${
                              isSelected
                                ? "bg-brand-secondary/10"
                                : "hover:bg-brand-secondary/5"
                            }`}
                          >
                            <div className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center ${
                              isSelected ? `${t.accentBorder} ${t.accentText}` : "border-brand-secondary/45"
                            }`}>
                              {isSelected && <Check size={10} />}
                            </div>
                            <div className="flex-1">
                              <div className={`text-xs font-semibold ${t.textDark}`}>
                                {item.name}
                              </div>
                              <div className="text-[10px] font-sans text-brand-secondary/90 leading-tight mt-0.5 normal-case font-normal">
                                {item.description}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => scrollToSection("contact")}
              className={`px-4 py-2 border ${t.accentBorder} ${t.accentText} rounded-md font-semibold text-[10px] tracking-wider uppercase hover:bg-brand-accent hover:text-white transition-all duration-300 cursor-pointer`}
            >
              Get in touch
            </button>
          </nav>

          {/* Mobile Navigation Interface Controls */}
          <div className="flex items-center gap-3 md:hidden">
            {/* Quick Mobile Theme Button */}
            <button
              onClick={() => setActiveTheme(activeTheme === "pastel" ? "slate" : "pastel")}
              className={`p-2 border rounded-md cursor-pointer ${t.secondaryBorder}`}
              title="Toggle design option"
              aria-label="Toggle design option"
            >
              <Palette size={16} className={t.accentText} />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`text-brand-text-dark/80 hover:${t.accentText} focus:outline-none cursor-pointer`}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </header>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className={`fixed inset-x-0 top-[73px] ${t.navBg} border-b ${t.navBorder} z-40 px-6 py-8 shadow-lg md:hidden flex flex-col gap-6`}
          >
            {[
              { id: "about", label: "About" },
              { id: "projects", label: "Projects" },
              { id: "skills", label: "Skills" },
              { id: "education", label: "Education" },
              { id: "contact", label: "Contact" }
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`text-left ${t.fontDisplay} font-semibold text-xl py-1 pl-3 border-l-2 ${
                  activeSection === link.id ? `${t.accentBorder} ${t.accentText}` : "border-transparent"
                }`}
              >
                {link.label}
              </button>
            ))}
            
            <div className={`p-4 rounded-xl border ${t.cardBg} ${t.cardBorder}`}>
              <div className="text-[10px] font-mono uppercase tracking-widest text-brand-secondary mb-2">
                Active Theme Options:
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => { setActiveTheme("pastel"); setMobileMenuOpen(false); }}
                  className={`flex-1 py-2 rounded text-xs font-semibold text-center border ${
                    activeTheme === "pastel" ? `${t.accentBorder} ${t.accentText}` : "border-brand-secondary/20"
                  }`}
                >
                  Pastel
                </button>
                <button
                  onClick={() => { setActiveTheme("slate"); setMobileMenuOpen(false); }}
                  className={`flex-1 py-2 rounded text-xs font-semibold text-center border ${
                    activeTheme === "slate" ? `${t.accentBorder} ${t.accentText}` : "border-brand-secondary/20"
                  }`}
                >
                  Slate
                </button>
              </div>
            </div>

            <button
              onClick={() => scrollToSection("contact")}
              className={`mt-2 w-full text-center py-3 ${t.accentBg} text-white rounded font-medium text-sm transition-all`}
            >
              Get In Touch
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section
        id="hero"
        className={`min-h-screen pt-36 pb-20 flex items-center relative overflow-hidden transition-colors duration-500 ${t.bgHero}`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Asymmetric hero text */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`${t.fontDisplay} text-4xl sm:text-5xl lg:text-[5.5rem] font-bold tracking-tight ${t.textDark} mb-4 leading-[1.05]`}
            >
              {personalInfo.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`text-xs font-mono text-brand-secondary mb-6 font-normal uppercase tracking-widest`}
            >
              {personalInfo.subTitle}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className={`text-sm md:text-base ${t.textBody} leading-relaxed mb-8 max-w-xl`}
            >
              Bridging the gap between raw intelligent algorithms and production-grade architectures. Building scalable language processing systems, semantic document indexing engines, and automated ML pipelines integrated within robust web platforms.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
            >
              <button
                onClick={() => scrollToSection("projects")}
                className={`group flex items-center justify-center gap-2 px-6 py-3.5 ${t.accentBg} text-white rounded-lg font-semibold text-xs uppercase tracking-wider transition-all duration-300 hover:opacity-95 shadow-sm hover:shadow-md cursor-pointer`}
              >
                Inspect Systems
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className={`px-6 py-3.5 border ${t.secondaryBorder} ${t.textDark} rounded-lg font-semibold text-xs uppercase tracking-wider hover:border-[#5B3A5C] hover:bg-brand-secondary/5 transition-all duration-300 text-center cursor-pointer`}
              >
                Get In Touch
              </button>
            </motion.div>

            {/* Quick stats / social row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-12 pt-8 border-t border-brand-secondary/15 flex flex-wrap items-center gap-6"
            >
              <span className="text-[10px] font-mono uppercase tracking-widest text-brand-secondary font-bold">
                Connect Channels:
              </span>
              <div className="flex items-center gap-4">
                <a
                  href={personalInfo.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-brand-secondary hover:${t.accentText} transition-colors`}
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href={personalInfo.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-brand-secondary hover:${t.accentText} transition-colors`}
                  aria-label="GitHub Profile"
                >
                  <Github size={18} />
                </a>
                <a
                  href={personalInfo.socials.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-xs font-mono uppercase tracking-wider text-brand-secondary hover:${t.accentText} transition-colors`}
                >
                  LeetCode
                </a>
                <a
                  href={personalInfo.socials.kaggle}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-xs font-mono uppercase tracking-wider text-brand-secondary hover:${t.accentText} transition-colors`}
                >
                  Kaggle
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right side interactive visualization */}
          <div className="lg:col-span-5 h-full w-full flex items-center justify-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className={`w-full ${t.cardBg} border ${t.cardBorder} rounded-2xl overflow-hidden shadow-sm transition-colors duration-500`}
            >
              <div className="p-4 border-b border-brand-secondary/10 flex items-center justify-between bg-black/5">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-secondary/35" />
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-secondary/35" />
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-secondary/35" />
                </div>
                <div className="text-[10px] font-mono tracking-widest uppercase text-brand-secondary font-bold">
                  Attention_Map_visualizer.py
                </div>
              </div>
              <div className="relative">
                <SemanticNetworkCanvas />
              </div>
            </motion.div>
          </div>

        </div>

        {/* Minimal ambient scroll indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 hidden md:block">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className={`w-1 h-12 rounded ${t.attentionIndicator} flex justify-center pt-2`}
          >
            <span className="w-1 h-3 rounded bg-brand-secondary/40" />
          </motion.div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className={`py-28 border-t ${t.navBorder} relative transition-colors duration-500 ${t.bgAbout}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left title block with Photo */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative group w-full max-w-[280px] sm:max-w-[320px] md:max-w-[340px]"
              >
                {/* Subtle colored dynamic blob behind the photo for depth, matching the current theme's palette */}
                <div className={`absolute -inset-4 rounded-[32px] bg-gradient-to-tr ${
                  activeTheme === "pastel"
                    ? "from-[#C97D74]/20 via-[#EDE9F5]/30 to-[#5B3A5C]/20"
                    : "from-[#8A8580]/20 via-[#F7F6F3]/30 to-[#5B4FE8]/20"
                } blur-xl opacity-80 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Decorative offset backdrop plate */}
                <div className={`absolute inset-0 rounded-[24px] border border-brand-secondary/15 bg-white/10 backdrop-blur-sm -rotate-3 group-hover:rotate-0 transition-transform duration-500`} />

                <img
                  src="profile.jpg"
                  alt={personalInfo.name}
                  className={`relative z-10 w-full aspect-[3/4] object-cover rounded-[24px] border-2 ${t.cardBorder} shadow-lg ${
                    activeTheme === "pastel" ? "shadow-[#C97D74]/10" : "shadow-[#5B4FE8]/5"
                  } group-hover:shadow-xl group-hover:shadow-brand-secondary/20 transition-all duration-500 hover:scale-[1.01]`}
                  referrerPolicy="no-referrer"
                />
              </motion.div>

              <div>
                <span className={`text-[10px] font-mono uppercase tracking-widest ${t.accentText} font-bold block mb-2`}>
                  Professional Blueprint
                </span>
                <h2 className={`${t.fontDisplay} text-3xl md:text-5xl font-bold tracking-tight ${t.textDark}`}>
                  About Achutha
                </h2>
                <div className={`h-1 w-12 ${t.logoBg} mt-4 rounded-full`} />
                
                <div className="mt-8 flex flex-col gap-4 text-xs font-mono text-brand-secondary">
                  <div className="flex items-center gap-3">
                    <GraduationCap size={16} className={t.accentText} />
                    <span>MCA Candidate 2025 – 2027</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Cpu size={16} className={t.accentText} />
                    <span>NLP, RAG, Sentiment Specialist</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin size={16} className={t.accentText} />
                    <span>Bengaluru, India</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right block - layout-driven emphasis, zero inline coloring */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <p className={`text-xl md:text-2xl ${t.textDark}/90 leading-relaxed mb-6 ${t.fontDisplay}`}>
                  MCA candidate at BMSIT Bengaluru who{" "}
                  <span className={`inline px-1.5 py-0.5 rounded ${t.highlight1}`}>
                    builds full-stack applications and machine learning systems that solve real problems
                  </span>. Proficient in Python, React, Node.js, and MongoDB, with applied experience in NLP, sentiment analysis, RAG pipelines, and automated ML workflows.
                </p>
                <p className={`text-sm md:text-base ${t.textBody} leading-relaxed mb-6`}>
                  In modern software engineering, deploying a high-performing language model is only half the battle. Genuine business impact is achieved by orchestrating secure, real-time data ingestion, optimizing inference rates, compiling conversational grounding contexts, and shipping complete full-stack products. My development methodology focuses on mathematical precision in NLP combined with highly pragmatic application architecture.
                </p>
                <p className={`text-sm md:text-base ${t.textBody} leading-relaxed`}>
                  As an MCA student in Bengaluru, India's Silicon Valley, I operate within the heart of technological innovation. Whether setting up complex LangChain vector paths, FAISS clustering matrices, or automated NLP sentiment assessment pipelines, I prioritize modular clean code, thorough documentation, and intuitive end-user interfaces.
                </p>
              </div>

              {/* Grid of core philosophies */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className={`p-6 border ${t.cardBorder} rounded-xl ${t.cardBg} transition-colors duration-500`}>
                  <div className={`w-8 h-8 rounded-full ${t.logoBg}/5 flex items-center justify-center mb-4`}>
                    <Sparkles size={16} className={t.accentText} />
                  </div>
                  <h4 className={`${t.fontDisplay} font-bold ${t.textDark} text-base mb-2`}>
                    Applied Intelligence
                  </h4>
                  <p className="text-xs text-brand-secondary leading-relaxed normal-case">
                    Refining and compiling advanced language models for production tasks, including automated semantic classifications.
                  </p>
                </div>

                <div className={`p-6 border ${t.cardBorder} rounded-xl ${t.cardBg} transition-colors duration-500`}>
                  <div className={`w-8 h-8 rounded-full ${t.logoBg}/5 flex items-center justify-center mb-4`}>
                    <Code2 size={16} className={t.accentText} />
                  </div>
                  <h4 className={`${t.fontDisplay} font-bold ${t.textDark} text-base mb-2`}>
                    Production Systems
                  </h4>
                  <p className="text-xs text-brand-secondary leading-relaxed normal-case">
                    Building robust, fully containerized software using React, Node.js, and MongoDB, complete with secure API loops.
                  </p>
                </div>

                <div className={`p-6 border ${t.cardBorder} rounded-xl ${t.cardBg} transition-colors duration-500`}>
                  <div className={`w-8 h-8 rounded-full ${t.logoBg}/5 flex items-center justify-center mb-4`}>
                    <Database size={16} className={t.accentText} />
                  </div>
                  <h4 className={`${t.fontDisplay} font-bold ${t.textDark} text-base mb-2`}>
                    Advanced RAG Flow
                  </h4>
                  <p className="text-xs text-brand-secondary leading-relaxed normal-case">
                    Minimizing model hallucinations by optimizing document chunks, embedding structures, and context grounding.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className={`py-28 border-t ${t.navBorder} transition-colors duration-500 ${t.bgProjects} relative`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <span className={`text-[10px] font-mono uppercase tracking-widest ${t.accentText} font-bold block mb-2`}>
                Production Systems
              </span>
              <h2 className={`${t.fontDisplay} text-3xl md:text-5xl font-bold tracking-tight ${t.textDark}`}>
                Featured Systems
              </h2>
            </div>
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-secondary max-w-sm mt-4 md:mt-0 leading-relaxed">
              Every system is an integration of modern machine learning techniques deployed inside fully operational web services or API layers.
            </p>
          </div>

          {/* Asymmetrical grid structure with beautiful soft-pastel depth */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {projects.map((project, idx) => {
              const colSpan = idx === 0 ? "lg:col-span-12" : "lg:col-span-6";
              
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`${colSpan} group border ${t.cardBorder} rounded-2xl ${t.cardBg} overflow-hidden p-6 md:p-8 flex flex-col justify-between ${t.cardHoverBorder} transition-all duration-300 hover:-translate-y-1 ${t.shadowClass} hover:${t.hoverShadowClass} relative`}
                >
                  {/* Subtle color highlight accent strip */}
                  <div className={`absolute top-0 left-0 w-2 h-full ${t.logoBg} scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top`} />

                  <div>
                    {/* Header line of card */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
                      <span className={`text-[10px] font-mono uppercase tracking-widest font-bold ${t.tagBg} px-3 py-1 rounded-full`}>
                        {project.period}
                      </span>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`relative z-20 p-2.5 rounded-full border ${t.cardBorder} hover:border-brand-secondary text-brand-secondary hover:${t.accentText} transition-all duration-300 flex items-center justify-center bg-white cursor-pointer hover:scale-105 active:scale-95`}
                        aria-label={`View code repository for ${project.title}`}
                      >
                        <ExternalLink size={14} />
                      </a>
                    </div>

                    {/* Titles */}
                    <h3 className={`${t.fontDisplay} text-2xl sm:text-3.5xl font-bold ${t.textDark} mb-1 group-hover:${t.accentText} transition-colors`}>
                      {project.title}
                    </h3>
                    <p className={`text-xs font-mono uppercase tracking-widest ${t.secondaryText} font-bold mb-6`}>
                      {project.subtitle}
                    </p>

                    {/* Tech tag chips */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tech.map((tag) => (
                        <span
                          key={tag}
                          className={`text-xs font-medium border ${t.secondaryBorder} rounded-full px-3 py-1 bg-white/40`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Plain body bullet lists - zero highlight spans, let layout speak */}
                    <ul className="space-y-3 mb-8">
                      {project.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-3">
                          <span className={`w-1.5 h-1.5 rounded-full ${t.logoBg} mt-2 flex-shrink-0`} />
                          <span className={`text-sm ${t.textBody} leading-relaxed`}>
                            {bullet}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Sub-footer details inside card */}
                  <div className="pt-5 border-t border-brand-secondary/10 flex items-center justify-between mt-auto relative z-20">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-brand-secondary">
                      Full-Stack ML Pipeline
                    </span>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`relative z-20 inline-flex items-center gap-1.5 text-xs uppercase font-semibold tracking-wider ${t.textDark} hover:${t.accentText} group-hover:${t.accentText} transition-colors duration-300 cursor-pointer py-1.5 px-3 -my-1.5 -mx-3 hover:bg-brand-secondary/5 rounded-lg border border-transparent hover:border-brand-secondary/20`}
                    >
                      Inspect Source
                      <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>

                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className={`py-28 border-t ${t.navBorder} transition-colors duration-500 ${t.bgSkills} relative`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
            <div className="lg:col-span-5">
              <span className={`text-[10px] font-mono uppercase tracking-widest ${t.accentText} font-bold block mb-2`}>
                Taxonomy & Stack
              </span>
              <h2 className={`${t.fontDisplay} text-3xl md:text-5xl font-bold tracking-tight ${t.textDark} mb-4`}>
                Core Proficiencies
              </h2>
              <div className={`h-1 w-12 ${t.logoBg} mt-4 mb-6 rounded-full`} />
              <p className={`text-sm md:text-base ${t.textBody} leading-relaxed`}>
                Clean architectural structuring of systems from mathematical modeling to application layers. My engineering skill sets are grouped logically below:
              </p>
            </div>
            <div className="lg:col-span-7 flex items-center justify-start lg:justify-end">
              <div className={`text-[11px] font-mono ${t.secondaryText} border-l-2 ${t.accentBorder} pl-4 py-2 leading-relaxed max-w-sm font-semibold`}>
                "Pill tags are designed with a soft, breathable visual identity and micro-hover zoom triggers. Legibility remains the absolute core priority."
              </div>
            </div>
          </div>

          {/* Categorized layout */}
          <div className="space-y-12">
            {skillsData.map((category) => (
              <div
                key={category.id}
                className={`grid grid-cols-1 md:grid-cols-12 gap-6 items-center border-b ${t.secondaryBorder} pb-8 last:border-0 last:pb-0`}
              >
                {/* Category metadata */}
                <div className="md:col-span-4 flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${t.logoBg}`} />
                  <h3 className={`${t.fontDisplay} font-bold ${t.textDark} text-lg md:text-xl`}>
                    {category.categoryName}
                  </h3>
                </div>

                {/* Soft-fill custom chips */}
                <div className="md:col-span-8 flex flex-wrap gap-2.5">
                  {category.skills.map((skill) => (
                    <motion.span
                      key={skill}
                      whileHover={{ scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className={`text-xs font-semibold px-4 py-2 rounded-full transition-all duration-300 ${t.skillPill}`}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* EDUCATION HISTORY */}
      <section id="education" className={`py-28 border-t ${t.navBorder} transition-colors duration-500 ${t.bgEdu} relative`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Academic Journey */}
            <div className="lg:col-span-7">
              <div className="mb-12">
                <span className={`text-[10px] font-mono uppercase tracking-widest ${t.accentText} font-bold block mb-2`}>
                  Academic Milestones
                </span>
                <h2 className={`${t.fontDisplay} text-3xl md:text-5xl font-bold tracking-tight ${t.textDark}`}>
                  Education History
                </h2>
                <div className={`h-1 w-12 ${t.logoBg} mt-4 rounded-full`} />
              </div>

              {/* Education timeline list */}
              <div className="relative pl-6 border-l border-brand-secondary/20 space-y-12 ml-3">
                {education.map((item) => (
                  <div key={item.id} className="relative group">
                    {/* Circle timeline bullet */}
                    <div className={`absolute -left-[31px] top-1.5 w-4.5 h-4.5 rounded-full ${t.cardBg} border-2 ${t.accentBorder} transition-colors duration-300 flex items-center justify-center shadow-sm`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${t.logoBg}`} />
                    </div>

                    <div className={`text-[10px] font-mono font-bold ${t.secondaryText} mb-1 uppercase tracking-widest`}>
                      {item.period}
                    </div>
                    <h3 className={`${t.fontDisplay} text-xl md:text-2xl font-bold ${t.textDark} mb-1 group-hover:${t.accentText} transition-colors duration-300`}>
                      {item.degree}
                    </h3>
                    <h4 className={`text-xs font-semibold uppercase tracking-wider ${t.textDark}/80 mb-3 font-mono`}>
                      {item.institution}
                    </h4>
                    {item.details && (
                      <p className={`text-sm ${t.textBody} leading-relaxed`}>
                        {item.details}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Industry Verifications & Quote */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="mb-12">
                  <span className={`text-[10px] font-mono uppercase tracking-widest ${t.accentText} font-bold block mb-2`}>
                    Industry Verification
                  </span>
                  <h2 className={`${t.fontDisplay} text-3xl font-bold tracking-tight ${t.textDark}`}>
                    Certifications
                  </h2>
                  <div className={`h-1 w-12 ${t.logoBg} mt-4 rounded-full`} />
                </div>

                <div className="space-y-6">
                  {certifications.map((cert) => (
                    <motion.div
                      key={cert.id}
                      whileHover={{ y: -2 }}
                      className={`p-6 border ${t.cardBorder} rounded-xl ${t.cardBg} flex items-start gap-4 hover:${t.cardHoverBorder} transition-all duration-300 ${t.shadowClass}`}
                    >
                      <div className={`p-3 ${t.logoBg}/5 rounded-lg flex items-center justify-center ${t.accentText} mt-0.5`}>
                        <Award size={20} />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`text-[9px] font-mono font-bold uppercase tracking-widest ${t.tagBg} px-2.5 py-0.5 rounded-full`}>
                            {cert.year}
                          </span>
                          {cert.badge && (
                            <span className="text-[9px] font-mono font-semibold uppercase px-2.5 py-0.5 rounded-full bg-brand-secondary/10 text-brand-secondary border border-brand-secondary/15 tracking-wider">
                              {cert.badge}
                            </span>
                          )}
                        </div>
                        <h3 className={`${t.fontDisplay} font-bold ${t.textDark} text-base mt-2 mb-1`}>
                          {cert.title}
                        </h3>
                        <p className="text-xs text-brand-secondary">
                          Issuer: {cert.issuer}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Asymmetrical Quote Callout */}
              <div className={`mt-12 p-6 border-l-4 ${t.quoteBorder} ${t.quoteBg} rounded-r-xl transition-colors duration-500`}>
                <p className={`text-sm italic ${t.textBody} leading-relaxed mb-4`}>
                  "Engineering is not just about compiling machine learning algorithms inside isolated sandbox environments. It is about crafting robust pipelines, establishing proper database layers, and optimizing APIs so they perform reliably at commercial scale."
                </p>
                <span className={`text-[10px] font-mono uppercase tracking-widest ${t.secondaryText} font-bold`}>
                  — Achutha Sajjan
                </span>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* CONTACT / FOOTER SECTION */}
      <section id="contact" className={`py-28 border-t ${t.navBorder} transition-colors duration-500 ${t.bgContact} relative`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left coordinate details column */}
            <div className="lg:col-span-5">
              <span className={`text-[10px] font-mono uppercase tracking-widest ${t.accentText} font-bold block mb-2`}>
                Let's Collaborate
              </span>
              <h2 className={`${t.fontDisplay} text-3xl md:text-5xl font-bold tracking-tight ${t.textDark} mb-6`}>
                Start a Conversation
              </h2>
              <p className={`text-sm md:text-base ${t.textBody} leading-relaxed mb-10 max-w-sm`}>
                Whether you're looking to build an advanced retrieval pipeline, integrate responsive sentiment feedback loops, or ship complete machine learning systems, let's connect and design the solution.
              </p>

              {/* Coordinates list */}
              <div className="space-y-6">
                
                {/* Email */}
                <div className="flex items-center gap-4">
                  <div className={`w-11 h-11 rounded-full border ${t.cardBorder} flex items-center justify-center ${t.accentText} ${t.cardBg} shadow-sm`}>
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono font-bold text-brand-secondary uppercase tracking-widest block">
                      Direct Email
                    </span>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className={`text-sm font-semibold ${t.textDark} hover:${t.accentText} transition-colors`}
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-4">
                  <div className={`w-11 h-11 rounded-full border ${t.cardBorder} flex items-center justify-center ${t.accentText} ${t.cardBg} shadow-sm`}>
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono font-bold text-brand-secondary uppercase tracking-widest block">
                      Direct Contact
                    </span>
                    <a
                      href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`}
                      className={`text-sm font-semibold ${t.textDark} hover:${t.accentText} transition-colors`}
                    >
                      {personalInfo.phone}
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-4">
                  <div className={`w-11 h-11 rounded-full border ${t.cardBorder} flex items-center justify-center ${t.accentText} ${t.cardBg} shadow-sm`}>
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono font-bold text-brand-secondary uppercase tracking-widest block">
                      Office Location
                    </span>
                    <span className={`text-sm font-semibold ${t.textDark}`}>
                      {personalInfo.location}
                    </span>
                  </div>
                </div>

              </div>

            </div>

            {/* Right form column */}
            <div className="lg:col-span-7">
              <div className={`p-8 rounded-2xl ${t.formBg} ${t.shadowClass} transition-all duration-500 relative overflow-hidden`}>
                
                <AnimatePresence mode="wait">
                  {!formSubmitted ? (
                    <motion.form
                      key="contact-form"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleContactSubmit}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                          <label htmlFor="name" className={`text-xs font-mono uppercase tracking-widest ${t.textDark}/85 font-bold`}>
                            Full Name
                          </label>
                          <input
                            id="name"
                            type="text"
                            required
                            placeholder="Your Name"
                            value={formState.name}
                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                            className={`border ${t.inputBorder} ${t.inputBg} rounded-lg px-4 py-3.5 text-sm ${t.textDark} focus:outline-none transition-colors duration-300`}
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label htmlFor="email" className={`text-xs font-mono uppercase tracking-widest ${t.textDark}/85 font-bold`}>
                            Email Address
                          </label>
                          <input
                            id="email"
                            type="email"
                            required
                            placeholder="you@example.com"
                            value={formState.email}
                            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                            className={`border ${t.inputBorder} ${t.inputBg} rounded-lg px-4 py-3.5 text-sm ${t.textDark} focus:outline-none transition-colors duration-300`}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="message" className={`text-xs font-mono uppercase tracking-widest ${t.textDark}/85 font-bold`}>
                          Project Details / Brief
                        </label>
                        <textarea
                          id="message"
                          required
                          rows={5}
                          placeholder="What challenge would you like to solve together?"
                          value={formState.message}
                          onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                          className={`border ${t.inputBorder} ${t.inputBg} rounded-lg px-4 py-3.5 text-sm ${t.textDark} focus:outline-none transition-colors duration-300 resize-none`}
                        />
                      </div>

                      <button
                        type="submit"
                        className={`w-full flex items-center justify-center gap-2 py-4 ${t.accentBg} text-white rounded-lg font-bold text-xs uppercase tracking-wider transition-opacity hover:opacity-95 cursor-pointer shadow-sm`}
                      >
                        Transmit query brief
                        <Send size={14} />
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success-state"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className="py-12 flex flex-col items-center text-center"
                    >
                      <div className={`w-16 h-16 rounded-full bg-brand-secondary/10 border ${t.accentBorder} flex items-center justify-center ${t.accentText} mb-6`}>
                        <CheckCircle2 size={32} />
                      </div>
                      <h3 className={`${t.fontDisplay} font-bold text-2xl ${t.textDark} mb-2`}>
                        Query Processed
                      </h3>
                      <p className={`text-sm ${t.textBody} max-w-sm leading-relaxed mb-8`}>
                        Thank you for your transmission. Your system details have been safely registered. I will respond within 12 business hours.
                      </p>
                      <button
                        onClick={() => setFormSubmitted(false)}
                        className={`px-6 py-3 border ${t.secondaryBorder} ${t.textDark} rounded-lg text-xs uppercase font-mono tracking-widest font-bold hover:bg-black/5 transition-colors cursor-pointer`}
                      >
                        Send Another Message
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className={`py-12 border-t ${t.navBorder} ${t.bgFooter} transition-colors duration-500`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 text-[11px] text-brand-secondary font-mono">
          <div>
            &copy; 2026 Achutha Sajjan. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => scrollToSection("about")} className={`hover:${t.accentText} transition-colors cursor-pointer`}>About</button>
            <button onClick={() => scrollToSection("projects")} className={`hover:${t.accentText} transition-colors cursor-pointer`}>Projects</button>
            <button onClick={() => scrollToSection("skills")} className={`hover:${t.accentText} transition-colors cursor-pointer`}>Skills</button>
            <button onClick={() => scrollToSection("education")} className={`hover:${t.accentText} transition-colors cursor-pointer`}>Education</button>
          </div>
          <div className="text-center md:text-right">
            Designed with breathable asymmetry & color depth.
          </div>
        </div>
      </footer>

    </div>
  );
}
