import React, { useRef, useState, useEffect, useCallback } from 'react';

/**
 * Profile3D - Large Cutout 3D Portrait with Depth, Floating & Parallax
 *
 * Features:
 * - NO rectangular box or card borders; large organic cutout PNG silhouette
 * - GSAP entrance reveal: subtle 3D scale-up, translateY and perspective settling
 * - Pure React + CSS 3D transforms (perspective, preserve-3d, translateZ, rotateX/Y)
 * - Organic mouse-driven tilt with requestAnimationFrame lerping
 * - Dynamic light/glare layer with subtle crimson influence
 * - Soft deep-crimson ambient glow matching portfolio theme
 * - Idle gentle floating animation
 * - Subtle scroll-based parallax tied to page scroll / ScrollTrigger
 * - Responsive: smooth tilt on desktop, gentle reduced motion on tablet, touch-safe on mobile
 */
export default function Profile3D({
  src = '/images/profile.png',
  alt = 'Jeseena - Full Stack Developer',
  className = '',
}) {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const glareRef = useRef(null);
  const glowRef = useRef(null);

  const [imgError, setImgError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Animation values (current & target for smooth lerp)
  const currentTransform = useRef({
    rotateX: 0,
    rotateY: 0,
    translateX: 0,
    translateY: 0,
    glareX: 50,
    glareY: 50,
    glareOpacity: 0,
    scrollY: 0,
  });

  const targetTransform = useRef({
    rotateX: 0,
    rotateY: 0,
    translateX: 0,
    translateY: 0,
    glareX: 50,
    glareY: 50,
    glareOpacity: 0,
    scrollY: 0,
  });

  const rafId = useRef(null);
  const isTouchDevice = useRef(false);

  // Check touch capabilities
  useEffect(() => {
    isTouchDevice.current =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches;
  }, []);

  // GSAP Hero Entrance Animation: subtle scale-up, translateY and perspective settling
  useEffect(() => {
    let ctx;
    if (typeof window !== 'undefined' && containerRef.current) {
      const runEntrance = () => {
        if (!window.gsap || !containerRef.current) return;
        ctx = window.gsap.context(() => {
          window.gsap.fromTo(
            containerRef.current,
            {
              opacity: 0,
              scale: 0.92,
              y: 28,
              rotateX: 6,
              rotateY: -3,
              transformPerspective: 1200,
            },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              rotateX: 0,
              rotateY: 0,
              duration: 1.25,
              delay: 0.15,
              ease: 'power3.out',
              clearProps: 'transform',
            }
          );
        }, containerRef);
      };

      if (window.gsap) {
        runEntrance();
      } else {
        const timer = setTimeout(runEntrance, 100);
        return () => clearTimeout(timer);
      }
    }

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  // RAF loop for buttery smooth interpolation (lerp)
  const animate = useCallback(() => {
    const cur = currentTransform.current;
    const tgt = targetTransform.current;

    // Lerp factor (higher = snappier, lower = smoother)
    const factor = isHovered ? 0.08 : 0.06;

    cur.rotateX += (tgt.rotateX - cur.rotateX) * factor;
    cur.rotateY += (tgt.rotateY - cur.rotateY) * factor;
    cur.translateX += (tgt.translateX - cur.translateX) * factor;
    cur.translateY += (tgt.translateY - cur.translateY) * factor;
    cur.glareX += (tgt.glareX - cur.glareX) * factor;
    cur.glareY += (tgt.glareY - cur.glareY) * factor;
    cur.glareOpacity += (tgt.glareOpacity - cur.glareOpacity) * factor;
    cur.scrollY += (tgt.scrollY - cur.scrollY) * 0.08;

    if (cardRef.current) {
      const idleY = Math.sin(Date.now() * 0.0018) * 3;
      const totalY = cur.translateY + cur.scrollY + (isHovered ? 0 : idleY);
      cardRef.current.style.transform = `
        perspective(1000px)
        rotateX(${cur.rotateX.toFixed(2)}deg)
        rotateY(${cur.rotateY.toFixed(2)}deg)
        translate3d(${cur.translateX.toFixed(2)}px, ${totalY.toFixed(2)}px, 0)
      `;
    }

    if (glareRef.current) {
      glareRef.current.style.background = `radial-gradient(
        circle at ${cur.glareX.toFixed(1)}% ${cur.glareY.toFixed(1)}%,
        rgba(255, 255, 255, 0.28) 0%,
        rgba(211, 47, 47, 0.15) 30%,
        rgba(139, 0, 0, 0.05) 55%,
        transparent 75%
      )`;
      glareRef.current.style.opacity = cur.glareOpacity.toFixed(3);
    }

    if (glowRef.current) {
      // Glow reacts subtly in opposite direction for physical light sensation
      const glowX = -cur.rotateY * 3;
      const glowY = cur.rotateX * 3;
      glowRef.current.style.transform = `translate3d(${glowX.toFixed(1)}px, ${glowY.toFixed(1)}px, -20px) scale(${isHovered ? 1.05 : 1})`;
      glowRef.current.style.opacity = isHovered ? '0.85' : '0.55';
    }

    rafId.current = requestAnimationFrame(animate);
  }, [isHovered]);

  useEffect(() => {
    rafId.current = requestAnimationFrame(animate);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [animate]);

  // Pointer movement handler
  const handlePointerMove = (e) => {
    if (isTouchDevice.current) return;
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate relative coordinates normalized from -1 to 1
    const x = (e.clientX - rect.left) / width;
    const y = (e.clientY - rect.top) / height;

    const normX = (x - 0.5) * 2;
    const normY = (y - 0.5) * 2;

    // Maximum natural tilt angles (subtle & elegant)
    const MAX_TILT = 7; // degrees
    const MAX_SHIFT = 6; // px

    targetTransform.current.rotateX = -normY * MAX_TILT;
    targetTransform.current.rotateY = normX * MAX_TILT;
    targetTransform.current.translateX = normX * MAX_SHIFT;
    targetTransform.current.translateY = normY * MAX_SHIFT;

    // Glare follows cursor position
    targetTransform.current.glareX = x * 100;
    targetTransform.current.glareY = y * 100;
    targetTransform.current.glareOpacity = 0.55;
  };

  const handlePointerEnter = () => {
    if (isTouchDevice.current) return;
    setIsHovered(true);
    targetTransform.current.glareOpacity = 0.55;
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    // Smooth return to neutral original position
    targetTransform.current.rotateX = 0;
    targetTransform.current.rotateY = 0;
    targetTransform.current.translateX = 0;
    targetTransform.current.translateY = 0;
    targetTransform.current.glareOpacity = 0;
  };

  // Subtle scroll parallax
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Parallax only active when container is in or near viewport
      if (rect.bottom > -100 && rect.top < viewportHeight + 100) {
        const progress = (rect.top - viewportHeight / 2) / (viewportHeight / 2);
        targetTransform.current.scrollY = Math.max(-25, Math.min(25, progress * 18));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`profile3d-wrapper ${className}`}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      style={{
        position: 'relative',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        perspective: '1200px',
        willChange: 'transform',
      }}
    >
      {/* 3D Depth Canvas */}
      <div
        ref={cardRef}
        className="profile3d-card"
        style={{
          position: 'relative',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Layer 1 (Back, translateZ: -20px): Soft Deep Crimson Ambient Glow behind silhouette */}
        <div
          ref={glowRef}
          className="profile3d-glow"
          style={{
            position: 'absolute',
            bottom: '8%',
            left: '50%',
            width: '105%',
            height: '85%',
            transform: 'translate(-50%, 0) translateZ(-20px)',
            background: 'radial-gradient(ellipse at center, rgba(211, 47, 47, 0.42) 0%, rgba(139, 0, 0, 0.18) 45%, transparent 70%)',
            filter: 'blur(30px)',
            pointerEvents: 'none',
            zIndex: 0,
            borderRadius: '50%',
            transition: 'opacity 0.4s ease, transform 0.2s ease',
            opacity: 0.6,
          }}
        />

        {/* Layer 2 (Middle, translateZ: 25px): Large Cutout PNG Portrait (NO rectangular box) */}
        <div
          className="profile3d-image-layer"
          style={{
            position: 'relative',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            transform: 'translateZ(25px)',
            transformStyle: 'preserve-3d',
            zIndex: 2,
          }}
        >
          {!imgError ? (
            <img
              src={src}
              alt={alt}
              onError={() => setImgError(true)}
              className="hero-profile-cutout-img"
              style={{
                width: '100%',
                maxWidth: '290px',
                height: 'auto',
                maxHeight: '380px',
                objectFit: 'contain',
                objectPosition: 'center bottom',
                filter: isHovered
                  ? 'contrast(1.05) brightness(1.02) drop-shadow(0 20px 38px rgba(0, 0, 0, 0.85)) drop-shadow(0 0 30px rgba(211, 47, 47, 0.32))'
                  : 'contrast(1.04) brightness(1.01) drop-shadow(0 15px 28px rgba(0, 0, 0, 0.68)) drop-shadow(0 0 22px rgba(211, 47, 47, 0.18))',
                display: 'block',
                pointerEvents: 'none',
                userSelect: 'none',
                transition: 'filter 0.4s ease',
              }}
            />
          ) : (
            <div
              style={{
                width: '100%',
                maxWidth: '380px',
                height: '420px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
                textAlign: 'center',
              }}
            >
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#D32F2F" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <p style={{ marginTop: '0.8rem', fontSize: '0.75rem', color: '#A0A0A0' }}>
                Profile Photo Slot:
                <br />
                <code>{src}</code>
              </p>
            </div>
          )}
        </div>

        {/* Layer 3 (Front, translateZ: 38px): Dynamic Specular Light / Glare */}
        <div
          ref={glareRef}
          className="profile3d-glare"
          style={{
            position: 'absolute',
            inset: '-10%',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 3,
            transform: 'translateZ(38px)',
            mixBlendMode: 'screen',
            opacity: 0,
            transition: 'opacity 0.25s ease',
          }}
        />
      </div>
    </div>
  );
}
