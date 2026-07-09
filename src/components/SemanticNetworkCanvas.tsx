import React, { useEffect, useRef, useState } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  label: string;
  radius: number;
  baseRadius: number;
  pulseTimer: number;
}

const NLP_TOKENS = [
  "RAG", "Embeddings", "Transformer", "FAISS", "Gemini", "Attention",
  "Sentiment", "Python", "React", "Vector DB", "LangChain", "Node.js", "ML Pipeline"
];

// Signal particle structure flowing between connected nodes
interface SignalParticle {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  progress: number; // 0 to 1
  speed: number;
  color: string;
}

export const SemanticNetworkCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hoveredNode, setHoveredNodeState] = useState<string | null>(null);

  // Refs to allow animation loop to read state change instantly without re-initializing the entire loop
  const hoveredNodeRef = useRef<string | null>(null);
  const nodesRef = useRef<Node[]>([]);
  const particlesRef = useRef<SignalParticle[]>([]);

  // Track if nodes are already initialized
  const initializedRef = useRef(false);

  // Sync state to ref for render loop consumption
  const setHoveredNode = (val: string | null) => {
    hoveredNodeRef.current = val;
    setHoveredNodeState(val);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 400;
    let height = 350;

    const mouse = { x: -1000, y: -1000, radius: 130 };

    // Initialize nodes once to keep positions static during hover actions
    if (!initializedRef.current || nodesRef.current.length === 0) {
      nodesRef.current = NLP_TOKENS.map((token) => {
        const radius = 5;
        return {
          x: Math.random() * 250 + 50,
          y: Math.random() * 200 + 50,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          label: token,
          radius: radius,
          baseRadius: radius,
          pulseTimer: Math.random() * Math.PI * 2
        };
      });
      initializedRef.current = true;
    }

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newWidth, height: newHeight } = entry.contentRect;
        width = newWidth || 400;
        height = newHeight || 350;

        // Correctly handle DPI scaling
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        ctx.resetTransform();
        ctx.scale(dpr, dpr);

        // Keep existing nodes within the new bounds beautifully
        nodesRef.current.forEach((node) => {
          node.x = Math.max(40, Math.min(width - 40, node.x));
          node.y = Math.max(40, Math.min(height - 40, node.y));
        });
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;

      // Check for hover near node center
      let foundHover = false;
      const nodes = nodesRef.current;
      for (const node of nodes) {
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        // Generous collision detection for high responsiveness
        if (distance < 30) {
          if (hoveredNodeRef.current !== node.label) {
            setHoveredNode(node.label);
          }
          foundHover = true;
          break;
        }
      }
      if (!foundHover && hoveredNodeRef.current !== null) {
        setHoveredNode(null);
      }
    };

    const onMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      setHoveredNode(null);
    };

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Read current hovered node cleanly
      const currentHover = hoveredNodeRef.current;
      const nodes = nodesRef.current;
      const particles = particlesRef.current;

      // 1. Draw subtle background dot grid
      ctx.fillStyle = 'rgba(201, 125, 116, 0.08)'; // Secondary clay/rose at low opacity
      const gridSpacing = 24;
      for (let x = 0; x < width; x += gridSpacing) {
        for (let y = 0; y < height; y += gridSpacing) {
          ctx.beginPath();
          ctx.arc(x, y, 0.75, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 2. Physics & Node Movement Updates
      nodes.forEach((node) => {
        // Continuous organic drifting
        node.x += node.vx;
        node.y += node.vy;

        // Dynamic pulsing factor for organic looks
        node.pulseTimer += 0.015;

        // Butter-smooth wall collision (prevents jitter or state traps)
        const margin = 40;
        if (node.x < margin) {
          node.x = margin;
          node.vx = Math.abs(node.vx);
        } else if (node.x > width - margin) {
          node.x = width - margin;
          node.vx = -Math.abs(node.vx);
        }

        if (node.y < margin) {
          node.y = margin;
          node.vy = Math.abs(node.vy);
        } else if (node.y > height - margin) {
          node.y = height - margin;
          node.vy = -Math.abs(node.vy);
        }

        // Soft, elegant physics-based mouse repulsion
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          // Softly accelerate away from mouse
          node.vx -= (dx / dist) * force * 0.12;
          node.vy -= (dy / dist) * force * 0.12;
          
          // Gently scale size on mouse proximity
          node.radius = node.baseRadius + force * 2.5;
        } else {
          // Slow recovery to base scale
          node.radius = node.radius * 0.9 + node.baseRadius * 0.1;
        }

        // Speed limit / damping to guarantee smooth floating
        const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
        const maxSpeed = 1.0;
        if (speed > maxSpeed) {
          node.vx = (node.vx / speed) * maxSpeed;
          node.vy = (node.vy / speed) * maxSpeed;
        }

        // Dynamic air friction/damping
        node.vx *= 0.985;
        node.vy *= 0.985;
      });

      // 3. Spawning & drawing active signals (attention flow)
      if (Math.random() < 0.06 && nodes.length > 1) {
        // Pick random connection to trigger a pulse
        const indexA = Math.floor(Math.random() * nodes.length);
        let indexB = Math.floor(Math.random() * nodes.length);
        while (indexB === indexA) {
          indexB = Math.floor(Math.random() * nodes.length);
        }
        
        const nodeA = nodes[indexA];
        const nodeB = nodes[indexB];
        const dist = Math.hypot(nodeA.x - nodeB.x, nodeA.y - nodeB.y);
        
        if (dist < 150) {
          particles.push({
            startX: nodeA.x,
            startY: nodeA.y,
            endX: nodeB.x,
            endY: nodeB.y,
            progress: 0,
            speed: (2 + Math.random() * 2.5) / dist, // Time-based progress increment
            color: Math.random() > 0.4 ? 'rgba(91, 58, 92, 0.7)' : 'rgba(201, 125, 116, 0.7)'
          });
        }
      }

      // Update and draw connections (lines) based on proximity
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            const alpha = (1 - dist / 140) * 0.14;
            const isHighlighted = currentHover === n1.label || currentHover === n2.label;

            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);

            if (isHighlighted) {
              ctx.strokeStyle = `rgba(91, 58, 92, ${alpha * 4.0})`;
              ctx.lineWidth = 1.4;
            } else {
              ctx.strokeStyle = `rgba(201, 125, 116, ${alpha})`;
              ctx.lineWidth = 0.8;
            }
            ctx.stroke();
          }
        }
      }

      // Update and draw signal particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.progress += p.speed;

        if (p.progress >= 1) {
          particles.splice(i, 1);
          continue;
        }

        // Interpolated position
        const px = p.startX + (p.endX - p.startX) * p.progress;
        const py = p.startY + (p.endY - p.startY) * p.progress;

        ctx.beginPath();
        ctx.arc(px, py, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }

      // 4. Draw labels & node centers with incredible visual detail
      nodes.forEach((node) => {
        const isHovered = currentHover === node.label;
        const pulse = Math.sin(node.pulseTimer) * 1.5;

        // Subtle glow effect for hovered node
        if (isHovered) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + 6 + pulse, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(91, 58, 92, 0.12)';
          ctx.fill();
        }

        // Center dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, isHovered ? node.radius + 1 : node.radius, 0, Math.PI * 2);
        ctx.fillStyle = isHovered ? '#5B3A5C' : '#C97D74';
        ctx.fill();

        // Label handling
        ctx.font = `500 ${isHovered ? '11px' : '9px'} "Sora", sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        if (isHovered) {
          const textWidth = ctx.measureText(node.label).width;
          
          // Draw crisp custom backing pill for the hover label
          ctx.fillStyle = 'rgba(237, 233, 245, 0.95)';
          ctx.beginPath();
          const px = node.x - textWidth / 2 - 8;
          const py = node.y - 23;
          const pw = textWidth + 16;
          const ph = 18;
          const r = 5; // rounded border pill
          ctx.roundRect ? ctx.roundRect(px, py, pw, ph, r) : ctx.rect(px, py, pw, ph);
          ctx.fill();

          ctx.strokeStyle = 'rgba(91, 58, 92, 0.2)';
          ctx.lineWidth = 1;
          ctx.stroke();

          // Foreground label text
          ctx.fillStyle = '#5B3A5C';
          ctx.fillText(node.label, node.x, node.y - 14);
        } else {
          ctx.fillStyle = 'rgba(46, 43, 46, 0.72)';
          ctx.fillText(node.label, node.x, node.y - 12);
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      if (canvas) {
        canvas.removeEventListener('mousemove', onMouseMove);
        canvas.removeEventListener('mouseleave', onMouseLeave);
      }
    };
  }, []); // Empty dependency array means this effect ONLY runs once on mount!

  return (
    <div ref={containerRef} className="relative w-full h-[350px] md:h-[450px] overflow-hidden select-none">
      <canvas ref={canvasRef} className="block w-full h-full cursor-crosshair" />
      <div className="absolute top-4 right-4 text-[10px] font-mono uppercase tracking-widest text-brand-secondary pointer-events-none opacity-50 bg-brand-bg px-2 py-0.5 rounded border border-brand-secondary/15">
        Attention Map Visualizer
      </div>
    </div>
  );
};
