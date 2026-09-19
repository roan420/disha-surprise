import { useEffect, useRef } from 'react';

/**
 * High-performance Canvas 3D Particle & Shimmering Glass Orb Engine
 * Handles 3D rotation, depth shading, floating romantic particles,
 * and responsive pointer / touch parallax.
 */
export default function Background3D({ mode = 'hero' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    }

    resize();
    window.addEventListener('resize', resize);

    // Pointer parallax tracking
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handlePointerMove = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      targetX = (clientX / width - 0.5) * 40;
      targetY = (clientY / height - 0.5) * 40;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    // Floating romantic particle system
    const PARTICLE_COUNT = mode === 'hero' ? 65 : 45;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.8 + 0.8,
      speedY: Math.random() * 0.45 + 0.15,
      speedX: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.7 + 0.2,
      pulseSpeed: Math.random() * 0.03 + 0.01,
      isHeart: Math.random() > 0.65,
      hue: Math.random() > 0.4 ? 345 : 280 // Rose pink to violet
    }));

    // 3D Glass Orb / Heart geometry coordinates
    let rotationAngle = 0;

    const render = () => {
      // Smooth dampening for pointer parallax
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;
      rotationAngle += 0.012;

      ctx.clearRect(0, 0, width, height);

      // 1. Ambient Background Glows
      const centerX = width / 2 + currentX;
      const centerY = height / 2 + currentY;

      const radialBg = ctx.createRadialGradient(
        centerX,
        centerY,
        10,
        centerX,
        centerY,
        Math.max(width, height) * 0.8
      );
      radialBg.addColorStop(0, 'rgba(45, 20, 68, 0.45)');
      radialBg.addColorStop(0.5, 'rgba(20, 12, 36, 0.25)');
      radialBg.addColorStop(1, 'rgba(9, 6, 17, 0)');

      ctx.fillStyle = radialBg;
      ctx.fillRect(0, 0, width, height);

      // 2. Render Floating Particles & Tiny Hearts
      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX;
        p.opacity += Math.sin(Date.now() * 0.002 * p.pulseSpeed) * 0.008;

        if (p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.globalAlpha = Math.max(0.1, Math.min(0.85, p.opacity));

        if (p.isHeart) {
          // Draw subtle floating heart
          ctx.fillStyle = `hsl(${p.hue}, 90%, 75%)`;
          const s = p.size * 1.5;
          ctx.beginPath();
          ctx.moveTo(0, s * 0.3);
          ctx.bezierCurveTo(-s * 0.6, -s * 0.4, -s * 1.1, s * 0.4, 0, s * 1.1);
          ctx.bezierCurveTo(s * 1.1, s * 0.4, s * 0.6, -s * 0.4, 0, s * 0.3);
          ctx.fill();
        } else {
          // Draw twinkling stardust diamond
          ctx.fillStyle = `hsla(${p.hue}, 85%, 85%, ${p.opacity})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = `hsl(${p.hue}, 85%, 65%)`;
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      // 3. Render Center Glowing 3D Glass Orb / Jewel (Most prominent in Hero mode)
      if (mode === 'hero') {
        const orbRadius = Math.min(width * 0.22, 105);
        const orbX = centerX;
        const orbY = centerY - 30 + Math.sin(Date.now() * 0.002) * 10;

        // Outer Aura Glow
        const auraGlow = ctx.createRadialGradient(
          orbX,
          orbY,
          orbRadius * 0.2,
          orbX,
          orbY,
          orbRadius * 2.2
        );
        auraGlow.addColorStop(0, 'rgba(255, 77, 109, 0.4)');
        auraGlow.addColorStop(0.5, 'rgba(157, 78, 221, 0.2)');
        auraGlow.addColorStop(1, 'rgba(255, 77, 109, 0)');

        ctx.fillStyle = auraGlow;
        ctx.beginPath();
        ctx.arc(orbX, orbY, orbRadius * 2.2, 0, Math.PI * 2);
        ctx.fill();

        // 3D Glass Orb Body
        const orbGrad = ctx.createRadialGradient(
          orbX - orbRadius * 0.35,
          orbY - orbRadius * 0.35,
          orbRadius * 0.1,
          orbX,
          orbY,
          orbRadius
        );
        orbGrad.addColorStop(0, 'rgba(255, 220, 240, 0.85)');
        orbGrad.addColorStop(0.25, 'rgba(255, 107, 139, 0.55)');
        orbGrad.addColorStop(0.7, 'rgba(131, 56, 236, 0.4)');
        orbGrad.addColorStop(1, 'rgba(40, 10, 60, 0.7)');

        ctx.save();
        ctx.beginPath();
        ctx.arc(orbX, orbY, orbRadius, 0, Math.PI * 2);
        ctx.fillStyle = orbGrad;
        ctx.shadowColor = 'rgba(255, 77, 109, 0.6)';
        ctx.shadowBlur = 32;
        ctx.fill();

        // Glass Rim Highlight
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.65)';
        ctx.lineWidth = 1.8;
        ctx.stroke();

        // Specular Light Glint
        const glintGrad = ctx.createLinearGradient(
          orbX - orbRadius * 0.6,
          orbY - orbRadius * 0.6,
          orbX + orbRadius * 0.3,
          orbY + orbRadius * 0.3
        );
        glintGrad.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
        glintGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.05)');
        glintGrad.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.ellipse(
          orbX - orbRadius * 0.3,
          orbY - orbRadius * 0.35,
          orbRadius * 0.42,
          orbRadius * 0.22,
          -Math.PI / 4,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = glintGrad;
        ctx.fill();

        // Inner floating 3D glowing heart inside the orb
        const heartScale = (orbRadius / 75) * (1 + Math.sin(Date.now() * 0.003) * 0.06);
        ctx.save();
        ctx.translate(orbX, orbY + 6);
        ctx.rotate(Math.sin(rotationAngle) * 0.15);
        ctx.scale(heartScale, heartScale);

        ctx.fillStyle = '#ff3366';
        ctx.shadowColor = '#ff6699';
        ctx.shadowBlur = 24;
        ctx.beginPath();
        ctx.moveTo(0, -6);
        ctx.bezierCurveTo(-14, -22, -32, -4, 0, 24);
        ctx.bezierCurveTo(32, -4, 14, -22, 0, -6);
        ctx.fill();

        // Inner Heart Specular Shine
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.beginPath();
        ctx.arc(-8, -12, 3.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
    };
  }, [mode]);

  return <canvas ref={canvasRef} className="canvas-background" aria-hidden="true" />;
}
