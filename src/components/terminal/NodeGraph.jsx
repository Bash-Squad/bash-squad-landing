import React from 'react';

/**
 * NodeGraph: the hero centerpiece. An interactive mesh of nodes (tools /
 * systems) with data pulses flowing along the edges. Nodes drift, react to
 * the cursor, and the whole thing animates to life. Pure canvas, no deps.
 * Honors prefers-reduced-motion (renders a static graph).
 */
export function NodeGraph({
  labels = ['CRM', 'Slack', 'Stripe', 'Sheets', 'Email', 'DB', 'API', 'Agent', 'Webhook'],
  density = 1,
  style,
  ...rest
}) {
  const canvasRef = React.useRef(null);
  const wrapRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    const ACID = '#B6FF2E', CYAN = '#38E1FF', INK = '#7C868D';
    const mouse = { x: -9999, y: -9999 };

    let nodes = [], edges = [];
    function build() {
      const rect = wrap.getBoundingClientRect();
      W = rect.width; H = rect.height;
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.max(7, Math.round(labels.length * density));
      nodes = Array.from({ length: n }, (_, i) => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.18, vy: (Math.random() - 0.5) * 0.18,
        r: i % 4 === 0 ? 5 : 3,
        label: labels[i % labels.length],
        hub: i % 4 === 0,
      }));
      edges = [];
      // connect each node to 2 nearest
      nodes.forEach((a, i) => {
        const d = nodes.map((b, j) => ({ j, dist: (a.x - b.x) ** 2 + (a.y - b.y) ** 2 })).filter(o => o.j !== i).sort((p, q) => p.dist - q.dist).slice(0, 2);
        d.forEach(o => { if (!edges.some(e => (e.a === o.j && e.b === i))) edges.push({ a: i, b: o.j, pulse: Math.random() }); });
      });
    }
    build();

    let raf, t = 0;
    function frame() {
      t += 1;
      ctx.clearRect(0, 0, W, H);
      // update nodes
      nodes.forEach(nd => {
        if (!reduce) {
          nd.x += nd.vx; nd.y += nd.vy;
          if (nd.x < 0 || nd.x > W) nd.vx *= -1;
          if (nd.y < 0 || nd.y > H) nd.vy *= -1;
          // cursor repel
          const dx = nd.x - mouse.x, dy = nd.y - mouse.y, dist = Math.hypot(dx, dy);
          if (dist < 120) { nd.x += (dx / dist) * (120 - dist) * 0.012; nd.y += (dy / dist) * (120 - dist) * 0.012; }
        }
      });
      // edges + pulses
      edges.forEach(e => {
        const a = nodes[e.a], b = nodes[e.b];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist > 260) return;
        const alpha = 1 - dist / 260;
        ctx.strokeStyle = `rgba(124,134,141,${alpha * 0.45})`;
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        if (!reduce) {
          e.pulse += 0.006; if (e.pulse > 1) e.pulse -= 1;
          const px = a.x + (b.x - a.x) * e.pulse, py = a.y + (b.y - a.y) * e.pulse;
          ctx.fillStyle = e.a % 3 === 0 ? CYAN : ACID;
          ctx.globalAlpha = alpha;
          ctx.beginPath(); ctx.arc(px, py, 1.8, 0, Math.PI * 2); ctx.fill();
          ctx.globalAlpha = 1;
        }
      });
      // nodes
      nodes.forEach(nd => {
        ctx.beginPath(); ctx.arc(nd.x, nd.y, nd.r, 0, Math.PI * 2);
        ctx.fillStyle = nd.hub ? ACID : '#15191D';
        ctx.fill();
        ctx.lineWidth = 1; ctx.strokeStyle = nd.hub ? ACID : '#333A41'; ctx.stroke();
        if (nd.hub) { ctx.shadowColor = ACID; ctx.shadowBlur = 10; ctx.fill(); ctx.shadowBlur = 0;
          ctx.font = '10px "JetBrains Mono", monospace'; ctx.fillStyle = 'rgba(180,190,195,0.7)';
          ctx.fillText(nd.label, nd.x + 9, nd.y + 3);
        }
      });
      raf = requestAnimationFrame(frame);
    }
    frame();

    const onMove = (e) => { const r = wrap.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    const onResize = () => build();
    wrap.addEventListener('mousemove', onMove);
    wrap.addEventListener('mouseleave', onLeave);
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(raf); wrap.removeEventListener('mousemove', onMove); wrap.removeEventListener('mouseleave', onLeave); window.removeEventListener('resize', onResize); };
  }, [labels, density]);

  return (
    <div ref={wrapRef} style={{ position: 'relative', width: '100%', height: '100%', minHeight: 280, ...style }} {...rest}>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
    </div>
  );
}
