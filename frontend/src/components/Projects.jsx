import React, { useState, useEffect, useRef } from 'react';
import { getProjects, FALLBACK_PROJECTS } from '../services/api';
import ProjectModal from './ProjectModal';
import TextRepel from './TextRepel';

export default function Projects({ about }) {
  const [projects, setProjects] = useState(FALLBACK_PROJECTS);
  const [selectedProject, setSelectedProject] = useState(null);
  const sectionTitle = about?.projects_section_title || 'SELECTED PROJECTS';
  const githubUrl = about?.github_url || 'https://github.com/Jeseena-codes';

  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const containerRef = useRef(null);
  const panelsRef = useRef([]);
  const flippersRef = useRef([]);
  const frontFacesRef = useRef([]);
  const backFacesRef = useRef([]);

  useEffect(() => {
    getProjects().then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        setProjects(data);
      }
    });
  }, []);

  // Strictly enforce the 3 primary projects: 1. CareNova, 2. JobBizz, 3. Personal Portfolio
  const displayProjects = projects.slice(0, 3);

  // Standardize titles, one-line descriptions, and images from project data (dynamically reflecting Django Admin)
  const getProjectDisplay = (proj) => {
    const raw = ((proj?.title || '') + ' ' + (proj?.slug || '')).toLowerCase();
    let defaultImg = '/images/carenova.png';

    if (raw.includes('jobbizz')) {
      defaultImg = '/images/jobbizz.png';
    } else if (raw.includes('portfolio')) {
      defaultImg = '/images/portfolio_project.png';
    } else {
      defaultImg = '/images/carenova.png';
    }

    const title = proj?.title || (raw.includes('jobbizz') ? 'JobBizz' : raw.includes('portfolio') ? 'Personal Portfolio' : 'CareNova');
    const oneLineDesc = proj?.overview || proj?.description || (
      raw.includes('jobbizz')
        ? 'JobBizz is a job consultancy platform designed to manage interactions between candidates, companies, and consultancy operations through dedicated portals.'
        : raw.includes('portfolio')
          ? 'This portfolio website is a personal developer portfolio created to present my projects, technical skills, education, development journey, and professional profile in an interactive web experience.'
          : 'CareNova is a full-stack medical store management website developed to manage medicines, users, shopping cart activity, and orders through a centralized web application.'
    );

    let imgSrc = proj?.display_image || proj?.image_url || defaultImg;
    if (imgSrc && !imgSrc.startsWith('/') && !imgSrc.startsWith('http')) {
      imgSrc = '/' + imgSrc;
    }
    return { title, oneLineDesc, imgSrc, defaultImg };
  };

  // GSAP Choreography:
  // 1. Cards are ALREADY SPLIT and STRAIGHT when they first appear
  // 2. Comfortable, smooth scroll distance pinned right below navbar (end: +=650px)
  // 3. Silky smooth, fluid 3D card flip with inertia scrub matching Lenis
  // 4. Final content settled with interactive CASE STUDY button
  // 5. Fully reversible when scrolling back up
  useEffect(() => {
    if (typeof window === 'undefined' || !window.gsap || !window.ScrollTrigger) return;
    window.gsap.registerPlugin(window.ScrollTrigger);

    const section = sectionRef.current;
    const stage = stageRef.current;
    const container = containerRef.current;
    const panels = panelsRef.current.filter(Boolean);
    const flippers = flippersRef.current.filter(Boolean);
    const frontFaces = frontFacesRef.current.filter(Boolean);
    const backFaces = backFacesRef.current.filter(Boolean);

    if (!section || !stage || !container || panels.length < 3) return;

    const ctx = window.gsap.context(() => {
      const mm = window.gsap.matchMedia();
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Clean Entrance: Smooth fade in for already-split cards
      window.gsap.fromTo(
        panels,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.06,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      );

      // Desktop layout (min-width: 992px)
      mm.add('(min-width: 992px)', () => {
        if (prefersReducedMotion) {
          window.gsap.set(flippers, { rotateY: 180, z: 0 });
          window.gsap.set(frontFaces, { pointerEvents: 'none' });
          window.gsap.set(backFaces, { pointerEvents: 'auto' });
          return;
        }

        // INITIAL STATE: Cards are ALREADY SPLIT, perfectly STRAIGHT (no rotateZ, no angle),
        // and in their exact final size and position (no zoom, z: 0)
        window.gsap.set(panels, {
          x: 0,
          y: 0,
          z: 0,
          rotateX: 0,
          rotateY: 0,
          rotateZ: 0,
          scale: 1,
        });

        window.gsap.set(flippers, {
          rotateY: 0,
          rotateX: 0,
          rotateZ: 0,
          x: 0,
          y: 0,
          z: 0,
          scale: 1,
          transformOrigin: '50% 50%',
          transformStyle: 'preserve-3d',
        });

        window.gsap.set(frontFaces, {
          pointerEvents: 'auto',
        });
        window.gsap.set(backFaces, {
          pointerEvents: 'none',
        });

        // 1. Standalone flip animation timeline (small, fast, smooth front/back reveal)
        const flipTl = window.gsap.timeline({
          paused: true,
          onComplete: () => {
            window.gsap.set(frontFaces, { pointerEvents: 'none' });
            window.gsap.set(backFaces, { pointerEvents: 'auto' });
          },
          onReverseComplete: () => {
            window.gsap.set(frontFaces, { pointerEvents: 'auto' });
            window.gsap.set(backFaces, { pointerEvents: 'none' });
          },
        });

        flipTl
          .to(flippers, {
            rotateY: 180,
            duration: 0.35,
            ease: 'power2.inOut',
            stagger: 0.02,
          }, 0)
          .set(frontFaces, { pointerEvents: 'none' }, 0.175)
          .set(backFaces, { pointerEvents: 'auto' }, 0.175);

        // 2. Discrete two-step ScrollTrigger logic:
        // STEP 1 (One downward scroll gesture) -> triggers complete flip 100% and holds
        // STEP 2 (Next downward scroll gesture) -> unpins and smoothly transitions into section below
        let isFlipped = false;

        window.ScrollTrigger.create({
          trigger: section,
          start: 'top 75px',
          end: '+=240px',
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Downward scroll gesture inside Projects section triggers complete flip
            if (self.direction === 1 && self.progress >= 0.25) {
              if (!isFlipped) {
                isFlipped = true;
                flipTl.play();
              }
            }
            // Upward scroll gesture inside Projects section triggers complete reverse flip
            else if (self.direction === -1 && self.progress <= 0.75) {
              if (isFlipped) {
                isFlipped = false;
                flipTl.reverse();
              }
            }
          },
          onEnter: () => {
            // When arriving from previous section, ensure cards remain in initial front state
            if (!isFlipped) {
              flipTl.pause(0);
              window.gsap.set(frontFaces, { pointerEvents: 'auto' });
              window.gsap.set(backFaces, { pointerEvents: 'none' });
            }
          },
          onEnterBack: () => {
            // When arriving back up from next section, cards should be in flipped state
            isFlipped = true;
            flipTl.pause(flipTl.duration());
            window.gsap.set(frontFaces, { pointerEvents: 'none' });
            window.gsap.set(backFaces, { pointerEvents: 'auto' });
          },
          onLeave: () => {
            // Leaving forward into next section, ensure cards stay flipped
            isFlipped = true;
            flipTl.pause(flipTl.duration());
            window.gsap.set(frontFaces, { pointerEvents: 'none' });
            window.gsap.set(backFaces, { pointerEvents: 'auto' });
          },
          onLeaveBack: () => {
            // Leaving backward into previous section, ensure cards stay front face
            isFlipped = false;
            flipTl.pause(0);
            window.gsap.set(frontFaces, { pointerEvents: 'auto' });
            window.gsap.set(backFaces, { pointerEvents: 'none' });
          },
          snap: {
            snapTo: [0, 1],
            duration: { min: 0.15, max: 0.25 },
            delay: 0.02,
            ease: 'power1.out',
          },
        });
      });

      // Mobile / Tablet layout (max-width: 991px): Clean responsive stack
      mm.add('(max-width: 991px)', () => {
        window.gsap.set(panels, { x: 0, y: 0, rotateZ: 0, scale: 1 });
        window.gsap.set(flippers, { rotateY: 180, z: 0 });
        window.gsap.set(frontFaces, { pointerEvents: 'none' });
        window.gsap.set(backFaces, { pointerEvents: 'auto' });
      });
    }, sectionRef);

    // Refresh ScrollTrigger calculations once layout and images settle
    const refreshTimer1 = setTimeout(() => {
      if (window.ScrollTrigger) window.ScrollTrigger.refresh();
    }, 250);
    const refreshTimer2 = setTimeout(() => {
      if (window.ScrollTrigger) window.ScrollTrigger.refresh();
    }, 600);

    return () => {
      clearTimeout(refreshTimer1);
      clearTimeout(refreshTimer2);
      ctx.revert();
    };
  }, [displayProjects.length, projects]);

  return (
    <section id="projects" className="projects-section scroll-split-section" ref={sectionRef}>
      <div className="container">
        {/* Header Row with Red Bar and View All Link */}
        <div className="projects-header-row">
          <div className="projects-title-box">
            <TextRepel as="h2" className="projects-section-title" text={sectionTitle} />
            <div className="title-red-bar"></div>
          </div>

          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="projects-view-all-link"
            title="View all repositories on GitHub"
          >
            View All Projects →
          </a>
        </div>

        {/* Scroll Split Card Stage */}
        {displayProjects.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--text-gray)', padding: '3rem 1rem' }}>
            Projects will appear here once added in the Admin Panel.
          </div>
        ) : (
          <div className="scroll-split-stage" ref={stageRef}>
            <div className="scroll-split-container" ref={containerRef}>
              {displayProjects.map((proj, idx) => {
                const { title: displayTitle, oneLineDesc, imgSrc, defaultImg } = getProjectDisplay(proj);

                return (
                  <div
                    key={proj.id || proj.slug || displayTitle}
                    ref={(el) => (panelsRef.current[idx] = el)}
                    className="scroll-split-card"
                    onClick={() => setSelectedProject(proj)}
                    title="Click to view full case study"
                  >
                    {/* 3D Flipper Container */}
                    <div
                      className="card-flipper"
                      ref={(el) => (flippersRef.current[idx] = el)}
                    >
                      {/* STATE 1 — FRONT FACE (ONLY PROJECT IMAGE + PROJECT NAME) */}
                      <div
                        className="card-face card-face-front"
                        ref={(el) => (frontFacesRef.current[idx] = el)}
                      >
                        <div className="front-media">
                          <img
                            src={imgSrc}
                            alt={displayTitle}
                            loading="eager"
                            onError={(e) => {
                              e.currentTarget.src = defaultImg;
                            }}
                          />
                        </div>
                        <div className="front-info">
                          <h3 className="project-title-text">{displayTitle}</h3>
                        </div>
                      </div>

                      {/* STATE 2 — BACK FACE (IMAGE + NAME + ONE-LINE DESCRIPTION + CASE STUDY →) */}
                      <div
                        className="card-face card-face-back"
                        ref={(el) => (backFacesRef.current[idx] = el)}
                      >
                        <div className="back-media">
                          <img
                            src={imgSrc}
                            alt={displayTitle}
                            loading="eager"
                            onError={(e) => {
                              e.currentTarget.src = defaultImg;
                            }}
                          />
                        </div>
                        <div className="back-info">
                          <h3 className="project-title-text">{displayTitle}</h3>
                          <p className="project-one-line-desc" title={oneLineDesc}>
                            {oneLineDesc}
                          </p>
                          <button
                            type="button"
                            className="project-case-study-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProject(proj);
                            }}
                          >
                            <span>CASE STUDY</span>
                            <span className="case-study-arrow">→</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Interactive Modal Details rendered via Portal on document.body */}
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </div>
    </section>
  );
}

