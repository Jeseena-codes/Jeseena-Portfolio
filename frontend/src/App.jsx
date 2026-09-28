import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Skills from './components/Skills';
import TechMarquee from './components/TechMarquee';
import Journey from './components/Journey';
import Projects from './components/Projects';
import Contact from './components/Contact';
import ContactMessageForm from './components/ContactMessageForm';
import Footer from './components/Footer';
import {
  getAbout,
  getServices,
  getSkills,
  getEducation,
  getWorkProcess,
  getResume,
  FALLBACK_ABOUT,
  FALLBACK_SERVICES,
  FALLBACK_MAIN_SKILLS,
  FALLBACK_EDUCATION,
  FALLBACK_WORK_PROCESS,
} from './services/api';

export default function App() {
  const [about, setAbout] = useState(FALLBACK_ABOUT);
  const [services, setServices] = useState(FALLBACK_SERVICES);
  const [skills, setSkills] = useState(FALLBACK_MAIN_SKILLS);
  const [learningSkills, setLearningSkills] = useState([]);
  const [journey, setJourney] = useState(FALLBACK_EDUCATION);
  const [workProcess, setWorkProcess] = useState(FALLBACK_WORK_PROCESS);
  const [cvUrl, setCvUrl] = useState('/images/Jeseena_CV.pdf');

  // Light & Dark mode state (default: dark with sun icon at top right)
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('portfolio-theme') || 'dark';
    } catch (e) {
      return 'dark';
    }
  });

  useEffect(() => {
    try {
      if (theme === 'light') {
        document.body.classList.add('light-theme');
      } else {
        document.body.classList.remove('light-theme');
      }
      localStorage.setItem('portfolio-theme', theme);
    } catch (e) {}
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    getAbout().then((data) => {
      if (data && data.name) setAbout(data);
    });

    getResume().then((data) => {
      if (data && data.download_url) setCvUrl(data.download_url);
    });

    getServices().then((data) => {
      if (Array.isArray(data) && data.length > 0) setServices(data);
    });

    getSkills().then((data) => {
      if (data && Array.isArray(data.main_skills) && data.main_skills.length > 0) {
        setSkills(data.main_skills);
      } else if (Array.isArray(data) && data.length > 0) {
        setSkills(data);
      }

      if (data && Array.isArray(data.currently_learning) && data.currently_learning.length > 0) {
        setLearningSkills(data.currently_learning);
      }
    });

    getEducation().then((data) => {
      if (Array.isArray(data) && data.length > 0) setJourney(data);
    });

    getWorkProcess().then((data) => {
      if (Array.isArray(data) && data.length > 0) setWorkProcess(data);
    });
  }, []);

  // Initialize Lenis Smooth Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.05,
      touchMultiplier: 1.5,
      infinite: false,
      prevent: (node) => {
        return (
          node?.hasAttribute?.('data-lenis-prevent') ||
          node?.hasAttribute?.('data-lenis-prevent-wheel') ||
          Boolean(node?.closest?.('[data-lenis-prevent]')) ||
          Boolean(node?.closest?.('.modal-content')) ||
          Boolean(node?.closest?.('.modal-overlay'))
        );
      },
    });

    window.lenis = lenis;

    // Synchronize Lenis with GSAP ScrollTrigger
    const handleLenisScroll = () => {
      if (typeof window !== 'undefined' && window.ScrollTrigger) {
        window.ScrollTrigger.update();
      }
    };
    lenis.on('scroll', handleLenisScroll);

    let tickerHandler;
    let fallbackRafId;

    if (typeof window !== 'undefined' && window.gsap) {
      tickerHandler = (time) => {
        lenis.raf(time * 1000);
      };
      window.gsap.ticker.add(tickerHandler);
      window.gsap.ticker.lagSmoothing(0);
    } else {
      const raf = (time) => {
        lenis.raf(time);
        fallbackRafId = requestAnimationFrame(raf);
      };
      fallbackRafId = requestAnimationFrame(raf);
    }

    // Preserve seamless anchor navigation (Navbar & buttons)
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (href && href.length > 1 && href !== '#') {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          lenis.scrollTo(target, {
            offset: -75,
            duration: 1.2,
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      lenis.off('scroll', handleLenisScroll);
      if (tickerHandler && window.gsap) {
        window.gsap.ticker.remove(tickerHandler);
      }
      if (fallbackRafId) {
        cancelAnimationFrame(fallbackRafId);
      }
      lenis.destroy();
      delete window.lenis;
    };
  }, []);

  // Scroll Fade Effect ("Maranju Povunna")
  useEffect(() => {
    const sections = document.querySelectorAll('.scroll-fade-item');

    const handleScroll = () => {
      const viewportHeight = window.innerHeight;

      sections.forEach((sec) => {
        const rect = sec.getBoundingClientRect();
        if (rect.bottom < viewportHeight * 0.2) {
          sec.classList.add('is-past');
          sec.classList.remove('is-active');
        } else {
          sec.classList.remove('is-past');
          sec.classList.add('is-active');
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [services, skills, journey]);

  // Scroll Reveal Observer
  useEffect(() => {
    const timer = setTimeout(() => {
      const reveals = document.querySelectorAll('.reveal-on-scroll');
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed');
            }
          });
        },
        { threshold: 0.1 }
      );

      reveals.forEach((el) => observer.observe(el));
    }, 100);

    // GSAP ScrollTrigger Unified Scroll-Reveal ("Coming up from shadow/depth" across every section)
    const gsapTimer = setTimeout(() => {
      if (typeof window !== 'undefined' && window.gsap && window.ScrollTrigger) {
        window.gsap.registerPlugin(window.ScrollTrigger);

        // 1. Section Header Blocks (Titles, tags, subtitles)
        const headers = document.querySelectorAll('.section-header-block, .projects-header-row');
        headers.forEach((header) => {
          window.gsap.fromTo(
            header,
            { opacity: 0, y: 28, filter: 'blur(3px)' },
            {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.85,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: header,
                start: 'top 88%',
                toggleActions: 'play none none none',
                once: true,
              },
            }
          );
        });

        // 2. About Me: Highlight cards and side CTA card
        const aboutCards = document.querySelectorAll('.about-highlight-card');
        if (aboutCards.length > 0) {
          window.gsap.fromTo(
            aboutCards,
            { opacity: 0, y: 26, filter: 'blur(3px)' },
            {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.8,
              stagger: 0.08,
              ease: 'power2.out',
              clearProps: 'transform,filter',
              scrollTrigger: {
                trigger: aboutCards[0],
                start: 'top 86%',
                toggleActions: 'play none none none',
                once: true,
              },
            }
          );
        }

        const aboutSideCard = document.querySelector('.about-side-profile-card');
        if (aboutSideCard) {
          window.gsap.fromTo(
            aboutSideCard,
            { opacity: 0, y: 28, filter: 'blur(3px)' },
            {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.85,
              ease: 'power2.out',
              clearProps: 'transform,filter',
              scrollTrigger: {
                trigger: aboutSideCard,
                start: 'top 85%',
                toggleActions: 'play none none none',
                once: true,
              },
            }
          );
        }

        // 3. Services / What I Do Cards
        const serviceCards = document.querySelectorAll('.service-card');
        if (serviceCards.length > 0) {
          window.gsap.fromTo(
            serviceCards,
            { opacity: 0, y: 28, filter: 'blur(3px)' },
            {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.85,
              stagger: 0.1,
              ease: 'power2.out',
              clearProps: 'transform,filter',
              scrollTrigger: {
                trigger: serviceCards[0],
                start: 'top 85%',
                toggleActions: 'play none none none',
                once: true,
              },
            }
          );
        }

        // 4. Skills Category Groups & Bar Cards
        const skillItems = document.querySelectorAll('.skills-category-group, .skill-bar-card');
        if (skillItems.length > 0) {
          window.gsap.fromTo(
            skillItems,
            { opacity: 0, y: 26, filter: 'blur(3px)' },
            {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.8,
              stagger: 0.08,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: skillItems[0],
                start: 'top 85%',
                toggleActions: 'play none none none',
                once: true,
              },
            }
          );
        }


        // 6. Contact Section Elements (Direct channels, device mockup)
        const contactChannels = document.querySelectorAll('.contact-ref-row');
        if (contactChannels.length > 0) {
          window.gsap.fromTo(
            contactChannels,
            { opacity: 0, y: 24, filter: 'blur(3px)' },
            {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.75,
              stagger: 0.07,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: contactChannels[0],
                start: 'top 85%',
                toggleActions: 'play none none none',
                once: true,
              },
            }
          );
        }

        const contactDevice = document.querySelector('.contact-device-col');
        if (contactDevice) {
          window.gsap.fromTo(
            contactDevice,
            { opacity: 0, y: 28, filter: 'blur(3px)' },
            {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.85,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: contactDevice,
                start: 'top 85%',
                toggleActions: 'play none none none',
                once: true,
              },
            }
          );
        }

        window.ScrollTrigger.refresh();
      }
    }, 250);

    return () => {
      clearTimeout(timer);
      clearTimeout(gsapTimer);
    };
  }, [services, skills, journey]);

  return (
    <div className="portfolio-app">
      <Navbar about={about} cvUrl={cvUrl} theme={theme} toggleTheme={toggleTheme} />
      <main>
        {/* 1. HERO - Exact 3-column layout */}
        <Hero about={about} />

        {/* 2. ABOUT ME - Narrative + Highlights + Side CTA Card */}
        <About about={about} cvUrl={cvUrl} />

        {/* 3. WHAT I DO - 6 Service/Capability Cards */}
        <Services services={services} about={about} />

        {/* 4. SKILLS - Main Skills + Currently Learning Area */}
        <Skills skills={skills} learningSkills={learningSkills} about={about} />

        {/* 5. RUNNING TECHNOLOGY LOGOS - Infinite Marquee Strip */}
        <TechMarquee />

        {/* 6. EDUCATION / JOURNEY - Asymmetric timeline with quote card */}
        <Journey journey={journey} workProcess={workProcess} about={about} />

        {/* 7. PROJECTS - CareNova, JobBizz, Portfolio (Horizontal Centered Cards + Modal) */}
        <Projects about={about} />

        {/* 8. CONTACT - Channels + Laptop Mockup */}
        <Contact about={about} />

        {/* 9. INLINE MESSAGE FORM - Submits directly to Django backend and MySQL */}
        <ContactMessageForm />
      </main>

      {/* 10. FOOTER - with bottom navigation bar and CV link */}
      <Footer about={about} cvUrl={cvUrl} />
    </div>
  );
}
