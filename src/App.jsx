import React, { useState, useEffect, useRef } from "react";
import {
  Code,
  Layout,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Terminal,
  Cpu,
  Globe,
  Menu,
  X,
  ChevronDown,
  Send,
  Sparkles,
  Palette,
  Zap,
  Sun,
  Moon,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";

// --- Utility Components & Styles ---

// Custom Hook for intersection observer (Scroll Reveal)
const useElementOnScreen = (options) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (containerRef.current) observer.unobserve(containerRef.current);
      }
    }, options);

    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, [containerRef, options]);

  return [containerRef, isVisible];
};

// Reveal Wrapper Component
const Reveal = ({ children, delay = 0, direction = "up" }) => {
  const [ref, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  });

  const translateClass =
    direction === "up"
      ? "translate-y-10"
      : direction === "left"
      ? "-translate-x-10"
      : "translate-x-10";

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 cubic-bezier(0.17, 0.55, 0.55, 1) transform ${
        isVisible
          ? "opacity-100 translate-y-0 translate-x-0"
          : `opacity-0 ${translateClass}`
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// Custom Logo Component
const JPLogo = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="hover:scale-110 transition-transform duration-300"
  >
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06b6d4" />
        <stop offset="100%" stopColor="#d946ef" />
      </linearGradient>
    </defs>
    <path
      d="M20 20 L20 80 L50 80"
      stroke="url(#logoGradient)"
      strokeWidth="8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M50 20 L80 20 L80 60 C80 75 70 80 50 80"
      stroke="url(#logoGradient)"
      strokeWidth="8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Circle stroke changes color based on theme */}
    <circle
      cx="50"
      cy="50"
      r="45"
      className="stroke-gray-300 dark:stroke-white opacity-20"
      strokeWidth="2"
    />
  </svg>
);

// --- Main Application Component ---

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Theme State
  const [theme, setTheme] = useState("dark");

  // Form States
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Toggle Theme Function
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Initialize Theme
  useEffect(() => {
    // Default to dark mode on load
    document.documentElement.classList.add("dark");
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Form Handler Functions
  const validateForm = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid";
    }
    if (!formData.message.trim()) tempErrors.message = "Message is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      // Simulate network request
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsSubmitting(false);
      setShowSuccessModal(true);
      setFormData({ name: "", email: "", message: "" });
    }
  };

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const skills = [
    {
      name: "React",
      icon: <Code size={24} />,
      level: "Expert",
      color: "text-cyan-600 dark:text-cyan-400",
    },
    {
      name: "TypeScript",
      icon: <Terminal size={24} />,
      level: "Advanced",
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      name: "Tailwind CSS",
      icon: <Palette size={24} />,
      level: "Expert",
      color: "text-teal-600 dark:text-teal-400",
    },
    {
      name: "Next.js",
      icon: <Globe size={24} />,
      level: "Advanced",
      color: "text-purple-600 dark:text-purple-400",
    },
    {
      name: "Node.js",
      icon: <Cpu size={24} />,
      level: "Intermediate",
      color: "text-green-600 dark:text-green-400",
    },
    {
      name: "Animation",
      icon: <Sparkles size={24} />,
      level: "Creative",
      color: "text-yellow-600 dark:text-yellow-400",
    },
  ];

  const projects = [
    {
      title: "E-Commerce Dashboard",
      description:
        "A high-performance analytics dashboard featuring real-time data visualization and dark mode.",
      tags: ["React", "Recharts", "Firebase"],
      color: "from-cyan-500 to-blue-500",
      icon: <Layout size={32} />,
    },
    {
      title: "AI Chat Interface",
      description:
        "A glassmorphic chat application integrated with LLM APIs, featuring streaming responses.",
      tags: ["Next.js", "Tailwind", "OpenAI API"],
      color: "from-fuchsia-500 to-purple-600",
      icon: <Sparkles size={32} />,
    },
    {
      title: "SaaS Landing Page",
      description:
        "A conversion-optimized landing page with complex scroll animations and 3D elements.",
      tags: ["React", "Three.js", "Framer Motion"],
      color: "from-emerald-400 to-teal-500",
      icon: <Zap size={32} />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white font-poppins selection:bg-cyan-500 selection:text-white overflow-x-hidden transition-colors duration-500">
      {/* Success Modal Popup */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-sm w-full border border-white/20 shadow-2xl transform transition-all scale-100 animate-bounce-in relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-500/10 to-cyan-500/10 pointer-events-none"></div>

            <div className="text-center relative z-10">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-6">
                <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400 animate-pulse" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Message Sent!
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-8">
                Thank you for reaching out. I'll get back to you as soon as
                possible.
              </p>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-xl transition-all transform hover:scale-[1.02] shadow-lg shadow-green-500/25"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-400/30 dark:bg-purple-600/20 rounded-full blur-[100px] animate-pulse-slow mix-blend-multiply dark:mix-blend-normal"></div>
        <div className="absolute top-[40%] right-[-10%] w-[400px] h-[400px] bg-cyan-400/30 dark:bg-cyan-500/20 rounded-full blur-[100px] animate-pulse-slow animation-delay-2000 mix-blend-multiply dark:mix-blend-normal"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-blue-400/30 dark:bg-blue-600/20 rounded-full blur-[100px] animate-pulse-slow animation-delay-4000 mix-blend-multiply dark:mix-blend-normal"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrolled || isMenuOpen
            ? "bg-white/70 dark:bg-black/60 backdrop-blur-xl border-b border-gray-200 dark:border-white/10 shadow-sm dark:shadow-none"
            : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0 flex items-center gap-3 group cursor-pointer">
              <JPLogo />
              <span className="font-bold text-xl tracking-tight group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                Jayaprakash T
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <div className="flex items-baseline space-x-8">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="relative px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors group"
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                ))}
              </div>

              <div className="flex items-center gap-4">
                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-white/20 transition-all duration-300"
                  aria-label="Toggle Theme"
                >
                  {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:scale-105">
                  Resume
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-yellow-400"
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white focus:outline-none"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 dark:bg-black/95 backdrop-blur-xl border-b border-gray-200 dark:border-white/10">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="max-w-5xl mx-auto text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm text-sm font-medium text-cyan-600 dark:text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              Open to new opportunities
            </div>
          </Reveal>

          <Reveal delay={200}>
            <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-8 leading-tight text-gray-900 dark:text-white">
              Hi, I'm <br />
              <span className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x">
                Jayaprakash T
              </span>
            </h1>
          </Reveal>

          <Reveal delay={400}>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Frontend Developer with{" "}
              <span className="text-gray-900 dark:text-white font-semibold">
                3.5+ years
              </span>{" "}
              of experience crafting pixel-perfect, immersive digital
              experiences using modern web technologies.
            </p>
          </Reveal>

          <Reveal delay={600}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <a
                href="#projects"
                className="group w-full sm:w-auto px-8 py-4 rounded-full bg-gray-900 dark:bg-white text-white dark:text-black font-bold hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.2)] dark:shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center justify-center gap-2"
              >
                Explore My Work
                <ExternalLink
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>
              <a
                href="#contact"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white font-bold hover:bg-white/80 dark:hover:bg-white/10 hover:border-cyan-500/50 hover:scale-105 transition-all duration-300 backdrop-blur-sm"
              >
                Let's Talk
              </a>
            </div>
          </Reveal>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-gray-400 dark:text-gray-500">
          <ChevronDown size={24} />
        </div>
      </section>

      {/* Stats Glass Strip */}
      <section className="relative z-10 -mt-24 mb-20 px-4">
        <Reveal delay={800}>
          <div className="max-w-5xl mx-auto p-1 rounded-3xl bg-gradient-to-r from-cyan-500/50 via-purple-500/50 to-pink-500/50">
            <div className="bg-white/80 dark:bg-black/80 backdrop-blur-xl rounded-[22px] p-8 border border-white/20 dark:border-white/10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-300 dark:divide-white/10">
                {[
                  { label: "Experience", value: "3.5+", suffix: "Years" },
                  { label: "Projects", value: "25+", suffix: "Completed" },
                  { label: "Expertise", value: "100%", suffix: "Frontend" },
                  { label: "Availability", value: "24/7", suffix: "Support" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="flex flex-col px-2 group cursor-default"
                  >
                    <span className="text-4xl font-bold bg-gradient-to-b from-gray-900 to-gray-600 dark:from-white dark:to-gray-500 bg-clip-text text-transparent mb-1 group-hover:scale-110 transition-transform duration-300">
                      {stat.value}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400 font-medium tracking-wider">
                      {stat.label}
                    </span>
                    <span className="text-xs text-cyan-600 dark:text-cyan-500/80">
                      {stat.suffix}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative z-10 py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                Technical{" "}
                <span className="text-cyan-500 dark:text-cyan-400">
                  Arsenal
                </span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                My preferred weapons of choice for conquering the digital
                frontier.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <Reveal key={index} delay={index * 100}>
                <div className="group relative p-6 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-cyan-500/50 transition-all duration-500 hover:-translate-y-2 overflow-hidden shadow-lg dark:shadow-none">
                  {/* Hover Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative z-10 flex items-start justify-between mb-4">
                    <div
                      className={`p-3 rounded-xl bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 ${skill.color} group-hover:scale-110 transition-transform duration-500`}
                    >
                      {skill.icon}
                    </div>
                    <span className="text-xs font-mono text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-white/10 px-2 py-1 rounded-md bg-gray-50 dark:bg-black/30">
                      {skill.level}
                    </span>
                  </div>

                  <h3 className="relative z-10 text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    {skill.name}
                  </h3>

                  <div className="relative z-10 w-full bg-gray-200 dark:bg-gray-800 rounded-full h-1.5 mt-4 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 h-full w-[0%] group-hover:w-full transition-all duration-1000 ease-out"></div>
                    <div className="bg-gray-300 dark:bg-gray-600 h-full w-full opacity-30"></div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="relative z-10 py-24 px-4 bg-gray-50/50 dark:bg-black/30"
      >
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-4">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                  Featured{" "}
                  <span className="text-purple-500 dark:text-purple-400">
                    Projects
                  </span>
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  A selection of my best work.
                </p>
              </div>
              <button className="flex items-center gap-2 text-gray-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors font-medium">
                View Github <Github size={18} />
              </button>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Reveal key={index} delay={index * 150}>
                <div className="group h-full relative rounded-3xl overflow-hidden bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 hover:border-cyan-500/30 dark:hover:border-white/30 transition-all duration-500 hover:shadow-2xl dark:hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]">
                  {/* Abstract Visual Header */}
                  <div
                    className={`h-56 w-full bg-gradient-to-br ${project.color} relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-white/10 dark:bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-80 dark:opacity-50 group-hover:scale-110 transition-transform duration-700">
                      <div className="p-4 bg-white/30 dark:bg-white/20 backdrop-blur-md rounded-full text-white shadow-lg">
                        {project.icon}
                      </div>
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-xs font-bold px-3 py-1 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 group-hover:text-cyan-600 dark:group-hover:text-white group-hover:border-cyan-500/50 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-8 line-clamp-3">
                      {project.description}
                    </p>
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white border-b border-transparent hover:border-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all pb-0.5"
                    >
                      View Case Study <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="rounded-[32px] p-1 bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 shadow-2xl">
              <div className="bg-white dark:bg-black rounded-[28px] p-8 md:p-16 overflow-hidden relative">
                <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
                  <div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                      Let's create something <br />
                      <span className="text-cyan-500 dark:text-cyan-400">
                        extraordinary
                      </span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-10 text-lg">
                      Ready to take your digital presence to the next level? I'm
                      currently available for freelance projects and full-time
                      roles.
                    </p>

                    <div className="space-y-6">
                      <a
                        href="mailto:hello@example.com"
                        className="flex items-center space-x-4 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors group"
                      >
                        <div className="p-4 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 group-hover:bg-cyan-500 group-hover:text-white dark:group-hover:text-black transition-all duration-300">
                          <Mail size={24} />
                        </div>
                        <span className="text-lg">jayaprakash@example.com</span>
                      </a>
                      <div className="flex gap-4 pt-4">
                        {[Github, Linkedin, Globe].map((Icon, i) => (
                          <a
                            key={i}
                            href="#"
                            className="p-4 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black text-gray-600 dark:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
                          >
                            <Icon size={24} />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    className="space-y-5 bg-gray-50 dark:bg-white/5 p-8 rounded-2xl border border-gray-200 dark:border-white/5 backdrop-blur-sm relative"
                  >
                    {/* Form Loading Overlay */}
                    {isSubmitting && (
                      <div className="absolute inset-0 z-20 bg-white/50 dark:bg-black/50 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                        <Loader2 className="h-10 w-10 text-cyan-500 animate-spin" />
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                        Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-black/50 border ${
                            errors.name
                              ? "border-red-500 focus:ring-red-500"
                              : "border-gray-200 dark:border-white/10 focus:border-cyan-500 focus:ring-cyan-500"
                          } focus:ring-1 outline-none transition-all text-gray-900 dark:text-white`}
                          placeholder="John Doe"
                        />
                        {errors.name && (
                          <div className="absolute right-3 top-3 text-red-500 animate-pulse">
                            <AlertCircle size={20} />
                          </div>
                        )}
                      </div>
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                        Email
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-black/50 border ${
                            errors.email
                              ? "border-red-500 focus:ring-red-500"
                              : "border-gray-200 dark:border-white/10 focus:border-cyan-500 focus:ring-cyan-500"
                          } focus:ring-1 outline-none transition-all text-gray-900 dark:text-white`}
                          placeholder="john@example.com"
                        />
                        {errors.email && (
                          <div className="absolute right-3 top-3 text-red-500 animate-pulse">
                            <AlertCircle size={20} />
                          </div>
                        )}
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                        Message
                      </label>
                      <div className="relative">
                        <textarea
                          rows="4"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-black/50 border ${
                            errors.message
                              ? "border-red-500 focus:ring-red-500"
                              : "border-gray-200 dark:border-white/10 focus:border-cyan-500 focus:ring-cyan-500"
                          } focus:ring-1 outline-none transition-all text-gray-900 dark:text-white resize-none`}
                          placeholder="Tell me about your project..."
                        ></textarea>
                        {errors.message && (
                          <div className="absolute right-3 top-3 text-red-500 animate-pulse">
                            <AlertCircle size={20} />
                          </div>
                        )}
                      </div>
                      {errors.message && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-white hover:opacity-90 transition-all flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02]"
                    >
                      <span>
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </span>
                      {!isSubmitting && <Send size={18} />}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-gray-200 dark:border-white/5 text-center text-gray-500">
        <div className="flex items-center justify-center gap-2 mb-4 opacity-50 hover:opacity-100 transition-opacity duration-300">
          <JPLogo />
        </div>
        <p className="text-sm">
          © {new Date().getFullYear()} Jayaprakash T. Built with React, Tailwind
          & ❤️.
        </p>
      </footer>

      {/* Styles */}
      <style>{`
        .animate-pulse-slow {
          animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient 5s ease infinite;
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        @keyframes bounce-in {
          0% { transform: scale(0.95); opacity: 0; }
          50% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); }
        }
        .animate-bounce-in {
          animation: bounce-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}</style>
    </div>
  );
}
