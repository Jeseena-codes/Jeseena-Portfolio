import React, { useRef, useEffect, useCallback, useMemo } from 'react';

/**
 * TextRepel Component
 * Provides a cursor-based per-letter subtle spring repel effect.
 *
 * Parameters (as requested):
 * - radius: 120px
 * - strength: 45px
 * - stiffness: 180
 * - damping: 14
 * - mass: 0.4
 */
export default function TextRepel({
  as: Component = 'div',
  text,
  segments,
  className = '',
  style = {},
  radius = 120,
  strength = 45,
  stiffness = 180,
  damping = 14,
  mass = 0.4,
  children,
  ...props
}) {
  const containerRef = useRef(null);
  const lettersRef = useRef([]);
  const animatingRef = useRef(false);
  const rafIdRef = useRef(null);
  const isHoveringRef = useRef(false);

  // Normalize segments: can come from `segments` prop, or `text` prop, or `children` string
  const resolvedSegments = useMemo(() => {
    if (Array.isArray(segments) && segments.length > 0) {
      return segments;
    }
    const rawText = text !== undefined && text !== null ? String(text) : (typeof children === 'string' ? children : '');
    return [{ text: rawText }];
  }, [segments, text, children]);

  // Tokenize segments into words, spaces, and line breaks
  const tokens = useMemo(() => {
    const list = [];
    resolvedSegments.forEach((seg, segIdx) => {
      if (seg.isBreak) {
        list.push({ type: 'break', key: `br-${segIdx}` });
        return;
      }
      const segText = seg.text || '';
      // Support line breaks within strings
      const lines = segText.split('\n');
      lines.forEach((line, lineIdx) => {
        if (lineIdx > 0) {
          list.push({ type: 'break', key: `br-${segIdx}-${lineIdx}` });
        }
        const words = line.split(' ');
        words.forEach((word, wordIdx) => {
          if (word.length > 0) {
            list.push({
              type: 'word',
              word,
              className: seg.className || '',
              key: `w-${segIdx}-${lineIdx}-${wordIdx}`,
            });
          }
          if (wordIdx < words.length - 1) {
            list.push({ type: 'space', key: `sp-${segIdx}-${lineIdx}-${wordIdx}` });
          }
        });
      });
    });
    return list;
  }, [resolvedSegments]);

  // Count total characters to pre-size letters array
  let letterCounter = 0;
  const letterMap = useMemo(() => {
    let count = 0;
    const map = [];
    tokens.forEach((token) => {
      if (token.type === 'word') {
        const charIndices = [];
        for (let i = 0; i < token.word.length; i++) {
          charIndices.push(count++);
        }
        map.push({ ...token, charIndices });
      } else {
        map.push(token);
      }
    });
    return { tokensWithIndices: map, totalCount: count };
  }, [tokens]);

  // Register letter element
  const registerLetter = (index, el) => {
    if (el) {
      if (!lettersRef.current[index]) {
        lettersRef.current[index] = {
          el,
          cx: 0,
          cy: 0,
          currentX: 0,
          currentY: 0,
          currentRot: 0,
          targetX: 0,
          targetY: 0,
          targetRot: 0,
          vx: 0,
          vy: 0,
          vrot: 0,
        };
      } else {
        lettersRef.current[index].el = el;
      }
    }
  };

  // Update layout coordinates of each letter relative to the container
  const updatePositions = useCallback(() => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();

    lettersRef.current.forEach((letter) => {
      if (letter && letter.el) {
        // Temporarily reset transform to read exact natural layout position
        const prevTransform = letter.el.style.transform;
        letter.el.style.transform = 'none';
        const rect = letter.el.getBoundingClientRect();
        letter.cx = rect.left - containerRect.left + rect.width / 2;
        letter.cy = rect.top - containerRect.top + rect.height / 2;
        letter.el.style.transform = prevTransform;
      }
    });
  }, []);

  // Spring physics animation loop (Symplectic Euler integration)
  const animate = useCallback(() => {
    let hasMotion = false;
    const dt = 0.016;
    const k = stiffness;
    const c = damping;
    const m = mass;

    lettersRef.current.forEach((letter) => {
      if (!letter || !letter.el) return;

      // X dimension
      const fx = -k * (letter.currentX - letter.targetX) - c * letter.vx;
      const ax = fx / m;
      letter.vx += ax * dt;
      letter.currentX += letter.vx * dt;

      // Y dimension
      const fy = -k * (letter.currentY - letter.targetY) - c * letter.vy;
      const ay = fy / m;
      letter.vy += ay * dt;
      letter.currentY += letter.vy * dt;

      // Rotation dimension
      const frot = -k * (letter.currentRot - letter.targetRot) - c * letter.vrot;
      const arot = frot / m;
      letter.vrot += arot * dt;
      letter.currentRot += letter.vrot * dt;

      // Settle thresholds
      const diffX = Math.abs(letter.currentX - letter.targetX);
      const diffY = Math.abs(letter.currentY - letter.targetY);
      const diffRot = Math.abs(letter.currentRot - letter.targetRot);
      const vel = Math.abs(letter.vx) + Math.abs(letter.vy) + Math.abs(letter.vrot);

      if (diffX > 0.05 || diffY > 0.05 || diffRot > 0.05 || vel > 0.05) {
        hasMotion = true;
      } else {
        letter.currentX = letter.targetX;
        letter.currentY = letter.targetY;
        letter.currentRot = letter.targetRot;
        letter.vx = 0;
        letter.vy = 0;
        letter.vrot = 0;
      }

      // Apply transform directly to avoid React re-render overhead
      if (letter.currentX === 0 && letter.currentY === 0 && letter.currentRot === 0) {
        if (letter.el.style.transform !== '') {
          letter.el.style.transform = '';
        }
      } else {
        letter.el.style.transform = `translate3d(${letter.currentX.toFixed(2)}px, ${letter.currentY.toFixed(2)}px, 0) rotate(${letter.currentRot.toFixed(2)}deg)`;
      }
    });

    if (hasMotion) {
      rafIdRef.current = requestAnimationFrame(animate);
    } else {
      animatingRef.current = false;
    }
  }, [stiffness, damping, mass]);

  // Pointer interactions scoped to this container
  const handlePointerEnter = useCallback(() => {
    // Only enable on desktop mouse/fine pointer
    if (typeof window !== 'undefined' && !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return;
    }
    isHoveringRef.current = true;
    updatePositions();
  }, [updatePositions]);

  const handlePointerMove = useCallback((e) => {
    if (!containerRef.current) return;
    if (typeof window !== 'undefined' && !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return;
    }
    isHoveringRef.current = true;

    if (lettersRef.current.length > 0 && lettersRef.current[0] && lettersRef.current[0].cx === 0 && lettersRef.current[0].cy === 0) {
      updatePositions();
    }

    const containerRect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - containerRect.left;
    const mouseY = e.clientY - containerRect.top;

    lettersRef.current.forEach((letter) => {
      if (!letter) return;
      const dx = letter.cx - mouseX;
      const dy = letter.cy - mouseY;
      const dist = Math.hypot(dx, dy);

      if (dist < radius && dist > 0.001) {
        const power = Math.pow(1 - dist / radius, 1.2);
        const angle = Math.atan2(dy, dx);
        letter.targetX = Math.cos(angle) * strength * power;
        letter.targetY = Math.sin(angle) * strength * power;
        // Subtle tilt away from cursor direction
        letter.targetRot = (letter.targetX / strength) * 12;
      } else {
        letter.targetX = 0;
        letter.targetY = 0;
        letter.targetRot = 0;
      }
    });

    if (!animatingRef.current) {
      animatingRef.current = true;
      rafIdRef.current = requestAnimationFrame(animate);
    }
  }, [radius, strength, animate]);

  const handlePointerLeave = useCallback(() => {
    isHoveringRef.current = false;
    lettersRef.current.forEach((letter) => {
      if (letter) {
        letter.targetX = 0;
        letter.targetY = 0;
        letter.targetRot = 0;
      }
    });

    if (!animatingRef.current) {
      animatingRef.current = true;
      rafIdRef.current = requestAnimationFrame(animate);
    }
  }, [animate]);

  // Measure on mount and on resize
  useEffect(() => {
    const timer = setTimeout(updatePositions, 100);
    const onResize = () => updatePositions();
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', onResize);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [updatePositions]);

  return (
    <Component
      ref={containerRef}
      className={`text-repel-container ${className}`}
      style={style}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      {...props}
    >
      {letterMap.tokensWithIndices.map((token) => {
        if (token.type === 'break') {
          return <br key={token.key} className="text-repel-break" />;
        }
        if (token.type === 'space') {
          return ' ';
        }
        if (token.type === 'word') {
          return (
            <span
              key={token.key}
              className={`text-repel-word ${token.className}`}
              style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
            >
              {token.word.split('').map((char, charIdx) => {
                const globalIndex = token.charIndices[charIdx];
                return (
                  <span
                    key={`${token.key}-c-${charIdx}`}
                    ref={(el) => registerLetter(globalIndex, el)}
                    className="text-repel-char"
                    style={{
                      display: 'inline-block',
                      willChange: 'transform',
                      pointerEvents: 'none',
                    }}
                  >
                    {char}
                  </span>
                );
              })}
            </span>
          );
        }
        return null;
      })}
    </Component>
  );
}
