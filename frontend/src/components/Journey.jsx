import React, { useEffect, useRef } from 'react';
import TextRepel from './TextRepel';

const DEFAULT_EDUCATION = [
  {
    year: '2022',
    title: 'Higher Secondary — Commerce',
    description: 'Govt. Victoria Girls Higher Secondary School, Anicode — Foundational academic studies in commerce, mathematics, and business communication.'
  },
  {
    year: '2025',
    title: 'Bachelor of Arts in Functional English',
    description: 'Govt. Arts & Science College, Kozhinjampara — Cultivated strong analytical reasoning, communication, and clear technical documentation skills.'
  },
  {
    year: '2025–2026',
    title: 'Python Full Stack Development with Internship',
    description: 'Safe Technologies — Comprehensive Python Full Stack Development training with internship, developing complete web platforms with Python, Django, and MySQL.'
  },
  {
    year: '2026',
    title: 'Full Stack Development',
    description: 'Building dynamic full-stack projects, mastering React, modern APIs, and developing responsive web applications.'
  },
];

const DEFAULT_WORK_PROCESS = [
  { num: '01', title: 'Discover', description: 'Research & Analysis', icon: 'bx bx-search-alt' },
  { num: '02', title: 'Plan', description: 'UI/UX Flow & Architecture', icon: 'bx bx-notepad' },
  { num: '03', title: 'Design', description: 'High-Fidelity UI & Modeling', icon: 'bx bx-palette' },
  { num: '04', title: 'Develop', description: 'Frontend & Backend Logic', icon: 'bx bx-code-alt' },
  { num: '05', title: 'Test', description: 'Feedback & Quality Assurance', icon: 'bx bx-check-shield' },
  { num: '06', title: 'Deliver', description: 'Deployment & Launch', icon: 'bx bx-cloud-upload' }
];

export default function Journey({ journey = [], workProcess = [], about }) {
  const displayJourney = journey.length > 0 ? journey : DEFAULT_EDUCATION;
  const displayWorkProcess = workProcess.length > 0 ? workProcess : DEFAULT_WORK_PROCESS;

  const sectionRef = useRef(null);
  const educationRef = useRef(null);
  const timelineContainerRef = useRef(null);
  const centerLineFillRef = useRef(null);
  const cardsRef = useRef([]);
  const dotsRef = useRef([]);
  const connectorsRef = useRef([]);

  const workProcessRef = useRef(null);
  const processLineRef = useRef(null);
  const processStepsRef = useRef([]);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.gsap || !window.ScrollTrigger) return;
    window.gsap.registerPlugin(window.ScrollTrigger);

    const ctx = window.gsap.context(() => {
      const totalMilestones = displayJourney.length;
      const timelineContainer = timelineContainerRef.current;
      const centerLineFill = centerLineFillRef.current;
      const cards = cardsRef.current.filter(Boolean);
      const dots = dotsRef.current.filter(Boolean);
      const connectors = connectorsRef.current.filter(Boolean);

      // ================================================================
      // 1. SCROLL-DRIVEN VERTICAL TIMELINE (SCRUB CONTROLLED)
      // ================================================================
      if (timelineContainer && centerLineFill && totalMilestones > 0) {
        // Initial setup for alternating cards, dots, and connectors
        displayJourney.forEach((_, idx) => {
          const card = cardsRef.current[idx];
          const dot = dotsRef.current[idx];
          const conn = connectorsRef.current[idx];
          const isLeft = idx % 2 === 0;

          if (card) {
            window.gsap.set(card, {
              opacity: 0,
              x: isLeft ? -35 : 35,
              y: 12,
              scale: 0.96,
            });
          }

          if (dot) {
            window.gsap.set(dot, {
              scale: 0.8,
              opacity: 0.4,
            });
          }

          if (conn) {
            window.gsap.set(conn, {
              scaleX: 0,
              transformOrigin: isLeft ? 'right center' : 'left center',
            });
          }
        });

        // Scrubbed GSAP Timeline linked directly to user scrolling
        const scrubTl = window.gsap.timeline({
          scrollTrigger: {
            trigger: timelineContainer,
            start: 'top 75%',
            end: 'bottom 80%',
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

        // Progressively grow the single line from 0% to 100% height
        scrubTl.to(
          centerLineFill,
          {
            height: '100%',
            ease: 'none',
            duration: totalMilestones,
          },
          0
        );

        // Sequentially activate each dot, connector, and card as the line progresses
        displayJourney.forEach((_, idx) => {
          const dot = dots[idx];
          const card = cards[idx];
          const conn = connectors[idx];
          const stepTime = idx;

          if (dot) {
            scrubTl.to(
              dot,
              {
                scale: 1.25,
                opacity: 1,
                ease: 'power2.out',
                duration: 0.35,
              },
              stepTime
            );
          }

          if (conn) {
            scrubTl.to(
              conn,
              {
                scaleX: 1,
                ease: 'power2.out',
                duration: 0.3,
              },
              stepTime + 0.05
            );
          }

          if (card) {
            scrubTl.to(
              card,
              {
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
                ease: 'power2.out',
                duration: 0.45,
              },
              stepTime + 0.1
            );
          }
        });
      }

      // ================================================================
      // 2. WORK PROCESS (HORIZONTAL FLOW IN SAME SECTION)
      // ================================================================
      // Animate Work Process small heading (smooth subtle fade)
      const wpHeader = workProcessRef.current?.querySelector('.work-process-small-header');
      if (wpHeader) {
        window.gsap.fromTo(
          wpHeader,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: wpHeader,
              start: 'top 88%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        );
      }

      if (processLineRef.current && workProcessRef.current) {
        window.gsap.fromTo(
          processLineRef.current,
          { width: '0%' },
          {
            width: '100%',
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: workProcessRef.current,
              start: 'top 82%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        );
      }

      const activeProcessSteps = processStepsRef.current.filter(Boolean);
      if (activeProcessSteps.length > 0 && workProcessRef.current) {
        window.gsap.fromTo(
          activeProcessSteps,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: workProcessRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [displayJourney, displayWorkProcess]);

  return (
    <section id="journey" className="middle-3col-section journey-fullwidth-section" ref={sectionRef}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-num-tag">04 / JOURNEY</div>
          <TextRepel as="h2" className="section-title" text="EDUCATION & MILESTONES" />
          <p className="section-subtitle">
            {about?.journey_section_subtitle || 'A structured timeline of my learning milestones, methodology, and core technical competencies.'}
          </p>
        </div>

        {/* 1. EDUCATION & MILESTONES (Center Timeline with 1st Card Left, 2nd Card Right, and Center Connected Dot) */}
        <div className="center-vertical-timeline" ref={timelineContainerRef}>
          {/* Continuous Vertical Timeline Line exactly in the CENTER */}
          <div className="center-timeline-axis">
            <div className="center-timeline-track"></div>
            <div className="center-timeline-fill" ref={centerLineFillRef}></div>
          </div>

          {/* Alternating Milestone Rows */}
          <div className="center-timeline-list">
            {displayJourney.map((item, idx) => {
              const isLeft = idx % 2 === 0;
              const hasDash = (item.description || '').includes(' — ');
              const [org, details] = hasDash
                ? item.description.split(' — ')
                : ['', item.description];

              const cardMarkup = (
                <div className="edu-flow-card edu-wide-popup-card" tabIndex="0">
                  <div className="edu-card-header-row">
                    <div className="edu-title-col">
                      <span className="edu-milestone-index">0{idx + 1}</span>
                      <h3 className="timeline-node-title">{item.title}</h3>
                    </div>
                    <span className="edu-year-badge">{item.year}</span>
                  </div>

                  {org && (
                    <div className="edu-institution-tag">
                      <i className="bx bxs-institution" style={{ color: 'var(--crimson-bright)' }}></i>
                      <span>{org.trim()}</span>
                    </div>
                  )}

                  <p className="timeline-node-desc">
                    {details ? details.trim() : item.description}
                  </p>
                </div>
              );

              return (
                <div
                  key={item.id || idx}
                  className={`center-timeline-row ${isLeft ? 'row-left' : 'row-right'}`}
                >
                  {/* Left Slot: Card 1 (idx 0), Card 3 (idx 2), etc. */}
                  <div className="timeline-slot slot-left">
                    {isLeft && (
                      <div
                        className="timeline-card-anchor"
                        ref={(el) => (cardsRef.current[idx] = el)}
                      >
                        {cardMarkup}
                      </div>
                    )}
                  </div>

                  {/* Horizontal Connector Line linking center dot to card */}
                  <div
                    className={`edu-horizontal-connector ${isLeft ? 'connector-left' : 'connector-right'}`}
                    ref={(el) => (connectorsRef.current[idx] = el)}
                  ></div>

                  {/* Connected Dot exactly in the CENTER */}
                  <div
                    className="center-timeline-dot-anchor"
                    ref={(el) => (dotsRef.current[idx] = el)}
                  >
                    <div className="center-timeline-dot">
                      <div className="dot-inner-core"></div>
                      <div className="dot-pulse-ring"></div>
                    </div>
                  </div>

                  {/* Right Slot: Card 2 (idx 1), Card 4 (idx 3), etc. */}
                  <div className="timeline-slot slot-right">
                    {!isLeft && (
                      <div
                        className="timeline-card-anchor"
                        ref={(el) => (cardsRef.current[idx] = el)}
                      >
                        {cardMarkup}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. WORK PROCESS (Flows directly underneath education) */}
        <div className="unified-work-process-subpart" ref={workProcessRef}>
          <div className="work-process-small-header">
            <span className="sub-red-label">WORK PROCESS</span>
          </div>

          <div className="work-process-flow-container">
            <div className="process-horizontal-track">
              <div className="process-horizontal-fill" ref={processLineRef}></div>
            </div>

            <div className="process-horizontal-grid">
              {displayWorkProcess.map((step, idx) => (
                <div
                  key={step.id || idx}
                  className="process-step-column"
                  ref={(el) => (processStepsRef.current[idx] = el)}
                  tabIndex="0"
                >
                  <div className="process-circle-icon">
                    <i className={step.icon || 'bx bx-check'}></i>
                  </div>
                  <div className="process-step-content">
                    <span className="process-step-title">{step.title}</span>
                    <span className="process-step-desc">{step.description || step.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
