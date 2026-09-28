import React, { useRef, useState, useEffect, useCallback } from 'react';

/**
 * InteractiveImage3D - Subtle 3D Perspective, Tilt & Depth Interaction
 * Applies the same organic 3D movement and tactile depth as the Hero portrait
 * to suitable existing images throughout the portfolio.
 */
export default function InteractiveImage3D({
  src,
  alt = '',
  className = '',
  style = {},
  imgStyle = {},
  onClick,
  onError,
  loading = 'lazy',
  children,
}) {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const glareRef = useRef(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const currentTransform = useRef({
    rotateX: 0,
    rotateY: 0,
    translateX: 0,
    translateY: 0,
    translateZ: 0,
    glareX: 50,
    glareY: 50,
    glareOpacity: 0,
  });

  const targetTransform = useRef({
    rotateX: 0,
    rotateY: 0,
    translateX: 0,
    translateY: 0,
    translateZ: 0,
    glareX: 50,
    glareY: 50,
    glareOpacity: 0,
  });

  const rafId = useRef(null);
  const isTouchDevice = useRef(false);

  useEffect(() => {
    isTouchDevice.current =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches;
  }, []);

  const animate = useCallback(() => {
    const cur = currentTransform.current;
    const tgt = targetTransform.current;
    const factor = isHovered ? 0.08 : 0.06;

    cur.rotateX += (tgt.rotateX - cur.rotateX) * factor;
    cur.rotateY += (tgt.rotateY - cur.rotateY) * factor;
    cur.translateX += (tgt.translateX - cur.translateX) * factor;
    cur.translateY += (tgt.translateY - cur.translateY) * factor;
    cur.translateZ += (tgt.translateZ - cur.translateZ) * factor;
    cur.glareX += (tgt.glareX - cur.glareX) * factor;
    cur.glareY += (tgt.glareY - cur.glareY) * factor;
    cur.glareOpacity += (tgt.glareOpacity - cur.glareOpacity) * factor;

    if (cardRef.current) {
      cardRef.current.style.transform = `
        perspective(900px)
        rotateX(${cur.rotateX.toFixed(2)}deg)
        rotateY(${cur.rotateY.toFixed(2)}deg)
        translate3d(${cur.translateX.toFixed(2)}px, ${cur.translateY.toFixed(2)}px, ${cur.translateZ.toFixed(2)}px)
      `;
    }

    if (glareRef.current) {
      glareRef.current.style.background = `radial-gradient(
        circle at ${cur.glareX.toFixed(1)}% ${cur.glareY.toFixed(1)}%,
        rgba(255, 255, 255, 0.25) 0%,
        rgba(211, 47, 47, 0.12) 35%,
        transparent 65%
      )`;
      glareRef.current.style.opacity = cur.glareOpacity.toFixed(3);
    }

    rafId.current = requestAnimationFrame(animate);
  }, [isHovered]);

  useEffect(() => {
    rafId.current = requestAnimationFrame(animate);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [animate]);

  const handlePointerMove = (e) => {
    if (isTouchDevice.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const normX = (x - 0.5) * 2;
    const normY = (y - 0.5) * 2;

    const MAX_TILT = 6;
    const MAX_SHIFT = 4;

    targetTransform.current.rotateX = -normY * MAX_TILT;
    targetTransform.current.rotateY = normX * MAX_TILT;
    targetTransform.current.translateX = normX * MAX_SHIFT;
    targetTransform.current.translateY = normY * MAX_SHIFT;
    targetTransform.current.translateZ = isPressed ? 20 : 12;

    targetTransform.current.glareX = x * 100;
    targetTransform.current.glareY = y * 100;
    targetTransform.current.glareOpacity = 0.45;
  };

  const handlePointerEnter = () => {
    if (isTouchDevice.current) return;
    setIsHovered(true);
    targetTransform.current.translateZ = 12;
    targetTransform.current.glareOpacity = 0.45;
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
    targetTransform.current.rotateX = 0;
    targetTransform.current.rotateY = 0;
    targetTransform.current.translateX = 0;
    targetTransform.current.translateY = 0;
    targetTransform.current.translateZ = 0;
    targetTransform.current.glareOpacity = 0;
  };

  const handlePointerDown = () => {
    setIsPressed(true);
    targetTransform.current.translateZ = 22;
  };

  const handlePointerUp = () => {
    setIsPressed(false);
    targetTransform.current.translateZ = isHovered ? 12 : 0;
  };

  return (
    <div
      ref={containerRef}
      className={`interactive-3d-wrapper ${className}`}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onClick={onClick}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        perspective: '900px',
        cursor: onClick ? 'pointer' : 'default',
        ...style,
      }}
    >
      <div
        ref={cardRef}
        className="interactive-3d-card"
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          borderRadius: 'inherit',
          transition: isHovered ? 'none' : 'transform 0.5s ease',
        }}
      >
        <img
          src={src}
          alt={alt}
          onError={onError}
          loading={loading}
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
            borderRadius: 'inherit',
            pointerEvents: 'none',
            userSelect: 'none',
            transform: 'translateZ(10px)',
            transition: 'filter 0.3s ease',
            ...imgStyle,
          }}
        />

        {/* Dynamic Specular Glare Layer */}
        <div
          ref={glareRef}
          className="interactive-3d-glare"
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            pointerEvents: 'none',
            zIndex: 3,
            transform: 'translateZ(25px)',
            mixBlendMode: 'overlay',
            opacity: 0,
            transition: 'opacity 0.2s ease',
          }}
        />

        {children}
      </div>
    </div>
  );
}
