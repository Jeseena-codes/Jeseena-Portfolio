import React, { useState, useEffect } from 'react';
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
  getResume,
  FALLBACK_ABOUT,
  FALLBACK_SERVICES,
  FALLBACK_MAIN_SKILLS,
  FALLBACK_EDUCATION,
} from './services/api';

export default function App() {
  const [about, setAbout] = useState(FALLBACK_ABOUT);
  const [services, setServices] = useState(FALLBACK_SERVICES);
  const [skills, setSkills] = useState(FALLBACK_MAIN_SKILLS);
  const [learningSkills, setLearningSkills] = useState([]);
  const [journey, setJourney] = useState(FALLBACK_EDUCATION);
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

    // GSAP ScrollTrigger Section Transitions
    const gsapTimer = setTimeout(() => {
      if (typeof window !== 'undefined' && window.gsap && window.ScrollTrigger) {
        window.gsap.registerPlugin(window.ScrollTrigger);
        const sections = document.querySelectorAll('section:not(#home), footer');
        sections.forEach((sec) => {
          window.gsap.fromTo(
            sec,
            { opacity: 0, y: 35 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: sec,
                start: 'top 85%',
                toggleActions: 'play none none none',
                once: true,
              },
            }
          );
        });
      }
    }, 200);

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
        <Services services={services} />

        {/* 4. SKILLS - Main Skills + Currently Learning Area */}
        <Skills skills={skills} learningSkills={learningSkills} />

        {/* 5. RUNNING TECHNOLOGY LOGOS - Infinite Marquee Strip */}
        <TechMarquee />

        {/* 6. EDUCATION / JOURNEY - Asymmetric timeline with quote card */}
        <Journey journey={journey} about={about} />

        {/* 7. PROJECTS - CareNova, JobBizz, Portfolio (Horizontal Centered Cards + Modal) */}
        <Projects />

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
