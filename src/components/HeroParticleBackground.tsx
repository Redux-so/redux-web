"use client";

import { useEffect, useRef } from "react";

type Snowflake = {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  speedY: number;
  driftX: number;
  wobble: number;
  wobbleSpeed: number;
};

function snowflakeCount(width: number, height: number) {
  const area = width * height;
  return Math.min(120, Math.max(45, Math.floor(area / 12000)));
}

export default function HeroParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let animationId = 0;
    let snowflakes: Snowflake[] = [];

    const createSnowflakes = () => {
      const width = parent.offsetWidth;
      const height = parent.offsetHeight;
      const count = snowflakeCount(width, height);

      snowflakes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.4 + 0.6,
        opacity: Math.random() * 0.22 + 0.08,
        speedY: Math.random() * 0.35 + 0.2,
        driftX: (Math.random() - 0.5) * 0.18,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.012 + 0.004,
      }));
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = parent.offsetWidth * dpr;
      canvas.height = parent.offsetHeight * dpr;
      canvas.style.width = `${parent.offsetWidth}px`;
      canvas.style.height = `${parent.offsetHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      createSnowflakes();
    };

    const resetSnowflake = (flake: Snowflake, width: number, spawnTop = true) => {
      flake.x = Math.random() * width;
      flake.y = spawnTop ? -6 : Math.random() * parent.offsetHeight;
    };

    const draw = () => {
      const width = parent.offsetWidth;
      const height = parent.offsetHeight;

      ctx.clearRect(0, 0, width, height);

      for (const flake of snowflakes) {
        if (!prefersReducedMotion) {
          flake.wobble += flake.wobbleSpeed;
          flake.y += flake.speedY;
          flake.x += flake.driftX + Math.sin(flake.wobble) * 0.08;
        }

        if (flake.y > height + 6) {
          resetSnowflake(flake, width);
          flake.y = -6;
        }
        if (flake.x < -6) flake.x = width + 6;
        if (flake.x > width + 6) flake.x = -6;

        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
        ctx.fill();
      }

      if (!prefersReducedMotion) {
        animationId = requestAnimationFrame(draw);
      }
    };

    resize();
    draw();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(parent);

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
