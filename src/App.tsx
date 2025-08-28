import React from "react";
import { motion } from "framer-motion";
import {
  Rocket,
  Twitter,
  MessageCircle,
  ShieldCheck,
  Coins,
  Sparkles,
  ExternalLink,
  ChartPie,
  Copy
} from "lucide-react";

/**
 * $SPUD — Single-file React landing (Tailwind + Framer Motion)
 * ------------------------------------------------------------
 * Drop into any React app (Vite/CRA/Next.js). Tailwind required.
 * Replace CONFIG below (buy links, socials, contract, DexScreener pool).
 */

const CONFIG = {
  token: {
    symbol: "SPUD",
    name: "SPUD Coin",
    totalSupply: "69,000,000",
    taxes: "0%",
    liquidity: "Locked",
  },
  chain: "Solana",
  contract: "GNHW5JetZmW85vAU35KyoDcYoSd3sNWtx5RPMTDJpump", // paste real contract
  links: {
    buy: "#", // pump.fun or Raydium link
    contract: "#", // Solscan link
    twitter: "#",
    telegram: "#",
    dexscreener: "https://dexscreener.com/solana/INSERT_POOL_ID", // replace pool id
  },
};

const LOGO_SRC = "/spud-logo.png"; // put file under /public

function FallbackSVG({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 300 300"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="$SPUD fallback logo"
    >
      <defs>
        <radialGradient id="spud" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#F9E8B0" />
          <stop offset="55%" stopColor="#E6C37A" />
          <stop offset="100%" stopColor="#C08A3D" />
        </radialGradient>
      </defs>
      <ellipse cx="150" cy="155" rx="120" ry="130" fill="url(#spud)" />
      <circle cx="115" cy="150" r="12" fill="#2E1A09" />
      <circle cx="185" cy="150" r="12" fill="#2E1A09" />
      <path d="M120 205 Q150 225 180 205" stroke="#2E1A09" strokeWidth="8" fill="none" strokeLinecap="round" />
      <text x="150" y="265" textAnchor="middle" fontSize="28" fontWeight="800" fill="#1f2937">{CONFIG.token.symbol}</text>
    </svg>
  );
}

function AnimatedLogo({ className = "w-24 h-24" }: { className?: string }) {
  const [broken, setBroken] = React.useState(false);

  return (
    <div className={`relative ${className}`}>
      <div className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl bg-yellow-300/30 blur-2xl" />
      {!broken ? (
        <motion.img
          src={LOGO_SRC}
          alt="$SPUD logo"
          className="w-full h-full object-contain drop-shadow-xl select-none"
          initial={{ rotate: -4, scale: 0.98, opacity: 0.95 }}
          animate={{ rotate: [-4, 4, -2, 2, 0], scale: 1, opacity: 1 }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ rotate: 2, scale: 1.02 }}
          onError={() => setBroken(true)}
        />
      ) : (
        <motion.div
          initial={{ rotate: -4, scale: 0.98, opacity: 0.95 }}
          animate={{ rotate: [-4, 4, -2, 2, 0], scale: 1, opacity: 1 }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ rotate: 2, scale: 1.02 }}
          className="w-full h-full"
        >
          <FallbackSVG />
        </motion.div>
      )}
    </div>
  );
}

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col items-start rounded-2xl bg-white/10 px-6 py-4 backdrop-blur border border-white/10">
    <span className="text-2xl font-extrabold tracking-tight">{value}</span>
    <span className="text-sm opacity-80">{label}</span>
  </div>
);

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6 shadow-lg ${className}`}>{children}</div>
);

function ContractBadge() {
  const [copied, setCopied] = React.useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(CONFIG.contract);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };
  return (
    <div className="flex items-center gap-2 text-xs font-semibold rounded-full bg-black/10 dark:bg-white/10 px-3 py-1">
      <span className="opacity-80">{CONFIG.chain}</span>
      <span className="opacity-50">•</span>
      <button onClick={handleCopy} className="inline-flex items-center gap-1 hover:opacity-100 opacity-90">
        <Copy className="h-3.5 w-3.5" /> {copied ? "Copied!" : "Copy contract"}
      </button>
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-amber-50 via-amber-100 to-amber-200 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-900 text-zinc-900 dark:text-zinc-100">
      {/* Background blobs */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-yellow-300/40 blur-3xl" />
        <div className="absolute top-1/3 -right-20 h-96 w-96 rounded-full bg-orange-400/30 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-amber-600/20 blur-3xl" />
      </div>

      {/* Navbar */}
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <AnimatedLogo className="w-10 h-10" />
          <span className="text-lg font-extrabold tracking-tight">{CONFIG.token.name}</span>
          <span className="rounded-full bg-black/10 px-2 py-0.5 text-xs font-semibold dark:bg-white/10 ml-1">${CONFIG.token.symbol}</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
          <a href="#about" className="opacity-80 hover:opacity-100">About</a>
          <a href="#tokenomics" className="opacity-80 hover:opacity-100">Tokenomics</a>
          <a href="#roadmap" className="opacity-80 hover:opacity-100">Roadmap</a>
          <a href="#community" className="opacity-80 hover:opacity-100">Community</a>
        </nav>
        <div className="flex items-center gap-3">
          <a
            href={CONFIG.links.buy}
            className="inline-flex items-center gap-2 rounded-2xl bg-yellow-400 px-4 py-2 font-bold text-zinc-900 shadow hover:brightness-95"
          >
            <Rocket className="h-4 w-4" /> Buy ${CONFIG.token.symbol}
          </a>
          <a
            href={CONFIG.links.contract}
            className="hidden md:inline-flex items-center gap-2 rounded-2xl border border-white/10 px-4 py-2 font-semibold hover:bg-white/10"
          >
            <ExternalLink className="h-4 w-4" /> View Contract
          </a>
          <button onClick={() => setMenuOpen((v) => !v)} className="md:hidden rounded-xl border border-white/10 px-3 py-2 text-sm font-semibold">
            Menu
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mx-auto max-w-7xl px-6 pb-4 md:hidden">
          <div className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 p-3">
            <a href="#about" className="px-3 py-2 rounded-xl hover:bg-white/10">About</a>
            <a href="#tokenomics" className="px-3 py-2 rounded-xl hover:bg-white/10">Tokenomics</a>
            <a href="#roadmap" className="px-3 py-2 rounded-xl hover:bg-white/10">Roadmap</a>
            <a href="#community" className="px-3 py-2 rounded-xl hover:bg-white/10">Community</a>
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-10 md:grid-cols-2 md:py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-5xl md:text-6xl font-black leading-[1.05]">
            Much <span className="text-yellow-500">Potato</span>.
            <br />Such <span className="text-yellow-500">Value</span>.
            <br />Wow.
          </h1>
          <p className="mt-5 max-w-xl text-lg opacity-90">
            $SPUD is pure community energy on {CONFIG.chain}. No taxes. No tricks. Just meme power and wholesome vibes. Join the SPUD Army and let's plant the seeds to the moon.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href={CONFIG.links.buy} className="inline-flex items-center gap-2 rounded-2xl bg-yellow-400 px-5 py-3 text-zinc-900 font-extrabold shadow hover:brightness-95">
              <Rocket className="h-5 w-5" /> Buy on pump.fun
            </a>
            <a href="#community" className="inline-flex items-center gap-2 rounded-2xl border border-white/10 px-5 py-3 font-semibold hover:bg-white/10">
              <Sparkles className="h-5 w-5" /> Join the SPUD Army
            </a>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3 max-w-lg">
            <Stat label="Total Supply" value={CONFIG.token.totalSupply} />
            <Stat label="Taxes" value={CONFIG.token.taxes} />
            <Stat label="Liquidity" value={CONFIG.token.liquidity} />
          </div>

          {/* DexScreener Widget (self-closing to avoid unterminated JSX) */}
          <div className="mt-10">
            <h3 className="text-xl font-bold mb-3">Live Chart</h3>
            <iframe
              src={CONFIG.links.dexscreener}
              title="DexScreener Chart"
              className="w-full h-[500px] rounded-2xl border border-white/10"
              loading="lazy"
              allow="clipboard-write; fullscreen"
            />
          </div>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <div className="absolute -inset-6 rounded-3xl bg-yellow-400/30 blur-2xl" />
          <div className="relative rounded-3xl border border-white/10 bg-white/10 p-10 backdrop-blur-xl shadow-xl">
            <div className="absolute right-6 top-6">
              <ContractBadge />
            </div>
            <AnimatedLogo className="w-[360px] h-[360px] mx-auto" />
          </div>
        </motion.div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <div className="flex items-center gap-3">
              <Coins className="h-6 w-6" />
              <h3 className="text-xl font-extrabold">Pure Meme Energy</h3>
            </div>
            <p className="mt-3 opacity-90">$SPUD is a community-first memecoin. No hidden taxes, no shady mechanics.</p>
          </Card>
          <Card>
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-6 w-6" />
              <h3 className="text-xl font-extrabold">Rug-Resistant</h3>
            </div>
            <p className="mt-3 opacity-90">Liquidity locked and contract public. Fair, fun, and transparent.</p>
          </Card>
          <Card>
            <div className="flex items-center gap-3">
              <Rocket className="h-6 w-6" />
              <h3 className="text-xl font-extrabold">Spud to the Moon</h3>
            </div>
            <p className="mt-3 opacity-90">We build community and let the internet do what it does best.</p>
          </Card>
        </div>
      </section>

      {/* Tokenomics */}
      <section id="tokenomics" className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">Tokenomics</h2>
            <p className="mt-4 opacity-90 max-w-prose">
              <strong>Total Supply:</strong> {CONFIG.token.totalSupply} ${CONFIG.token.symbol}
              <br />
              <strong>Taxes:</strong> {CONFIG.token.taxes}
              <br />
              <strong>Launch:</strong> 100% to the market via LP on pump.fun
              <br />
              <strong>Liquidity:</strong> {CONFIG.token.liquidity}
            </p>
            <ul className="mt-6 space-y-2 text-sm opacity-90 list-disc pl-5">
              <li>No presale, no team allocation</li>
              <li>Contract renounced when stable (optional)</li>
              <li>Open verifications and community multisig for future moves</li>
            </ul>
          </div>
          <Card className="md:ml-auto">
            <div className="flex items-center gap-2 mb-4">
              <ChartPie className="h-5 w-5" />
              <h3 className="text-lg font-bold">Initial Distribution</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="rounded-2xl bg-white/10 p-4">
                <div className="text-3xl font-black">100%</div>
                <div className="opacity-80">Liquidity Pool</div>
              </div>
              <div className="rounded-2xl bg-white/10 p-4">
                <div className="text-3xl font-black">0%</div>
                <div className="opacity-80">Team/Presale</div>
              </div>
            </div>
            <div className="mt-4 text-xs opacity-70">* Keep on-chain records pinned.</div>
          </Card>
        </div>
      </section>

      {/* Community */}
      <section id="community" className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          <Card>
            <h3 className="text-xl font-extrabold mb-2">Join the SPUD Army</h3>
            <p className="opacity-90 mb-4">Get memes, announcements, and community votes.</p>
            <div className="flex flex-wrap gap-3">
              <a href={CONFIG.links.twitter} className="inline-flex items-center gap-2 rounded-2xl border border-white/10 px-4 py-2 font-semibold hover:bg-white/10">
                <Twitter className="h-4 w-4" /> Follow on X
              </a>
              <a href={CONFIG.links.telegram} className="inline-flex items-center gap-2 rounded-2xl border border-white/10 px-4 py-2 font-semibold hover:bg-white/10">
                <MessageCircle className="h-4 w-4" /> Join Telegram
              </a>
            </div>
          </Card>
          <Card>
            <h3 className="text-xl font-extrabold mb-2">Hall of Memes</h3>
            <p className="opacity-90 mb-4">Community-made masterpieces featured weekly.</p>
            <div className="grid grid-cols-3 gap-2 text-center text-2xl">
              <div className="rounded-xl bg-white/10 py-6">🥔</div>
              <div className="rounded-xl bg-white/10 py-6">🐶</div>
              <div className="rounded-xl bg-white/10 py-6">🚀</div>
              <div className="rounded-xl bg-white/10 py-6">🌕</div>
              <div className="rounded-xl bg-white/10 py-6">😂</div>
              <div className="rounded-xl bg-white/10 py-6">✨</div>
            </div>
          </Card>
          <Card>
            <h3 className="text-xl font-extrabold mb-2">How to Buy</h3>
            <ol className="list-decimal pl-5 space-y-2 text-sm opacity-90">
              <li>Open the official pump.fun link.</li>
              <li>Connect your Solana wallet.</li>
              <li>Swap SOL for ${CONFIG.token.symbol}. Hold your spuds.</li>
            </ol>
            <a href={CONFIG.links.buy} className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-yellow-400 px-4 py-2 font-bold text-zinc-900 shadow hover:brightness-95">
              <Rocket className="h-4 w-4" /> Buy ${CONFIG.token.symbol}
            </a>
          </Card>
        </div>
      </section>

      {/* Roadmap */}
      <section id="roadmap" className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-8">Roadmap</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <h4 className="text-lg font-bold">Q1 — Plant the Potato</h4>
            <ul className="mt-3 text-sm opacity-90 space-y-2">
              <li>Launch on pump.fun</li>
              <li>Website and socials live</li>
              <li>Liquidity locked</li>
            </ul>
          </Card>
          <Card>
            <h4 className="text-lg font-bold">Q2 — Spud Army Rises</h4>
            <ul className="mt-3 text-sm opacity-90 space-y-2">
              <li>Meme contests and airdrops</li>
              <li>Community votes</li>
              <li>Influencer collabs</li>
            </ul>
          </Card>
          <Card>
            <h4 className="text-lg font-bold">Q3 — Mashed Potatoes</h4>
            <ul className="mt-3 text-sm opacity-90 space-y-2">
              <li>Simple mini-game</li>
              <li>NFT collectibles</li>
              <li>Merch drops</li>
            </ul>
          </Card>
          <Card>
            <h4 className="text-lg font-bold">Q4 — Spud to the Moon</h4>
            <ul className="mt-3 text-sm opacity-90 space-y-2">
              <li>Listings expansion</li>
              <li>Charity/community fund</li>
              <li>Global meme takeover</li>
            </ul>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-10 border-t border-white/10 bg-white/5">
        <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AnimatedLogo className="w-8 h-8" />
            <div className="text-sm opacity-90">© {new Date().getFullYear()} {CONFIG.token.name} — Just potatoes and vibes.</div>
          </div>
          <div className="text-xs opacity-70 max-w-xl">
            Disclaimer: {CONFIG.token.symbol} is a meme coin created for fun and community engagement. Nothing here is financial advice. Always DYOR.
          </div>
        </div>
      </footer>
    </div>
  );
}
