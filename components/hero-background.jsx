function HeroBackground() {
  return <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {
    /* ── 1. VIBRANT MESH GRADIENTS (More visible) ─────────────────────── */
  }
      {
    /* Teal Glow */
  }
      <div className="animate-blob-a absolute left-[5%] top-[10%] size-[700px] rounded-full bg-teal-500 opacity-[0.2] blur-[120px]" />
      {
    /* Violet Glow */
  }
      <div className="animate-blob-b absolute right-[-5%] bottom-[10%] size-[600px] rounded-full bg-violet-600 opacity-[0.18] blur-[100px]" />
      {
    /* Cyan Glow */
  }
      <div className="animate-blob-c absolute left-[40%] top-[50%] size-[500px] rounded-full bg-cyan-400 opacity-[0.15] blur-[110px]" />

      {
    /* ── 2. TECHNICAL GRID (Stronger visibility) ────────────────────────── */
  }
      <div
    className="absolute inset-0"
    style={{
      backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.15) 1.5px, transparent 1.5px)",
      backgroundSize: "40px 40px"
    }}
  />

      {
    /* ── 3. DATA FLOW BEAMS (Brighter pulses) ─────────────────────────── */
  }
      <div className="absolute inset-0">
        {
    /* Horizontal Pulse 1 */
  }
        <div
    className="hero-beam-x absolute top-[30%] h-[2px] w-64 bg-gradient-to-r from-transparent via-teal-400/40 to-transparent"
    style={{ animationDuration: "4s" }}
  />
        {
    /* Horizontal Pulse 2 */
  }
        <div
    className="hero-beam-x-reverse absolute top-[65%] h-[2px] w-80 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
    style={{ animationDuration: "6s", animationDelay: "1s" }}
  />

        {
    /* Vertical Pulse 1 */
  }
        <div
    className="hero-beam-y absolute left-[30%] w-[1px] h-64 bg-gradient-to-b from-transparent via-teal-500/40 to-transparent"
    style={{ animationDuration: "5s", animationDelay: "0.5s" }}
  />
        {
    /* Vertical Pulse 2 */
  }
        <div
    className="hero-beam-y-reverse absolute right-[20%] w-[1px] h-80 bg-gradient-to-b from-transparent via-violet-500/30 to-transparent"
    style={{ animationDuration: "7s", animationDelay: "2s" }}
  />
      </div>

      {
    /* ── 4. PULSING NEURAL NODES (Higher contrast) ────────────────────── */
  }
      <div className="absolute inset-0">
        <Node x="20%" y="35%" delay={0} color="#2dd4bf" /> {
    /* Teal */
  }
        <Node x="75%" y="25%" delay={2} color="#8b5cf6" /> {
    /* Violet */
  }
        <Node x="85%" y="70%" delay={4} color="#22d3ee" /> {
    /* Cyan */
  }
        <Node x="15%" y="75%" delay={1} color="#2dd4bf" />
        <Node x="50%" y="20%" delay={3} color="#8b5cf6" />
      </div>

      {
    /* ── 5. SCANNING LINE (Subtle but sharp) ─────────────────────────── */
  }
      <div className="absolute inset-x-0 h-px bg-white/10 blur-[1px]" />

      {
    /* ── 6. DARK VIGNETTE (Ensures text readability) ─────────────────── */
  }
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(9,9,11,0.8)_100%)]" />
    </div>;
}
function Node({ x, y, delay, color }) {
  return <div
    className="hero-node absolute size-3 -translate-x-1/2 -translate-y-1/2"
    style={{ left: x, top: y, animationDelay: `${delay}s` }}
  >
      {
    /* Core Node */
  }
      <div
    className="size-full rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)]"
    style={{ backgroundColor: color }}
  />
      {
    /* Expanding Ripple */
  }
      <div
    className="hero-node-ripple absolute inset-0 rounded-full border border-white/40"
    style={{ animationDelay: `${delay}s` }}
  />
    </div>;
}
export {
  HeroBackground
};
