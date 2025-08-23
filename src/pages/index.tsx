import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Mani+ Podcast – The Beating Edge</title>
        <meta
          name="description"
          content="The Beating Edge with Mani+: real stories on heart transplant, kidney failure, and thriving with dialysis—conversations with patients, doctors, and health pros."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen">
        {/* Hero */}
        <section className="relative mx-auto flex max-w-6xl flex-col items-center px-6 py-20 text-center sm:py-28">
          <NeonMicLogo />

          <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
            <span className="block">THE BEATING EDGE</span>
            <span className="mt-2 block text-3xl font-semibold text-zinc-300 sm:text-4xl">
              with <span className="neon-green">Mani+</span>
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-balance text-lg text-zinc-300/90">
            A raw, hopeful and expert-led podcast about navigating heart transplant,
            kidney failure, and life on dialysis. Mani talks with fellow patients,
            caregivers, cardiologists, nephrologists and mental health professionals.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#subscribe"
              className="rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              Subscribe Free
            </a>
            <a
              href="#episodes"
              className="rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10"
            >
              Latest Episodes
            </a>
          </div>
        </section>

        {/* About */}
        <section id="about" className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            About the show
          </h2>
          <div className="mt-5 grid gap-8 md:grid-cols-2">
            <div className="card">
              <h3 className="neon-red text-xl font-semibold">Mani’s story</h3>
              <p className="mt-2 text-zinc-300/90">
                Mani received a heart transplant and faces kidney failure, attending
                dialysis 4× per week. This show is his platform to document the
                journey, ask better questions, and share practical tactics for
                living fully.
              </p>
            </div>
            <div className="card">
              <h3 className="neon-green text-xl font-semibold">Who you’ll hear from</h3>
              <p className="mt-2 text-zinc-300/90">
                Patients, transplant teams, nephrologists, cardiologists, social
                workers, dietitians, mental health pros and researchers—each brings
                concise, compassionate insights you can use today.
              </p>
            </div>
          </div>
        </section>

        {/* Episodes placeholder */}
        <section id="episodes" className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex items-end justify-between gap-6">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Featured episodes
            </h2>
            <Link href="#subscribe" className="text-sm text-zinc-300 hover:underline">
              Get new episodes →
            </Link>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Dialysis 101 with a nephrology nurse",
                description:
                  "Understanding modalities, fatigue management, and questions to ask your care team.",
              },
              {
                title: "What every transplant patient should track",
                description:
                  "A cardiologist on meds, labs, and advocating for yourself between visits.",
              },
              {
                title: "Nutrition on dialysis—beyond phosphorus",
                description:
                  "A renal dietitian on realistic eating, labs, and grocery tactics on a budget.",
              },
            ].map((ep, i) => (
              <article key={i} className="card">
                <h3 className="text-lg font-semibold text-white">{ep.title}</h3>
                <p className="mt-2 text-sm text-zinc-300/90">{ep.description}</p>
                <div className="mt-4 flex items-center gap-3">
                  <button className="rounded-md bg-white/10 px-3 py-2 text-sm text-white hover:bg-white/20">
                    Play trailer
                  </button>
                  <button className="rounded-md border border-white/20 px-3 py-2 text-sm text-white/80 hover:bg-white/10">
                    Show notes
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Subscribe */}
        <section id="subscribe" className="mx-auto max-w-3xl px-6 pb-24">
          <div className="card">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Never miss a heartbeat
            </h2>
            <p className="mt-2 text-zinc-300/90">
              Join for episode alerts and behind‑the‑scenes updates. No spam.
            </p>
            <form
              className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto]"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="you@health.com"
                className="w-full rounded-md border border-white/15 bg-black/30 px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[--color-mani-green]"
              />
              <button
                type="submit"
                className="neon-green rounded-md px-6 py-3 font-semibold text-black/90"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 py-10 text-center text-sm text-zinc-400">
          © {new Date().getFullYear()} Mani.plus — The Beating Edge
        </footer>
      </main>
    </>
  );
}

function NeonMicLogo() {
  return (
    <svg
      className="glow-red glow-green h-24 w-24 sm:h-28 sm:w-28"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <g strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        {/* Heartbeat line left (red) */}
        <path
          d="M2 60 H20 L28 48 L36 64 L44 52 H58"
          stroke="var(--color-mani-red)"
        />
        {/* Mic (outline, red) */}
        <rect x="60" y="28" width="18" height="28" rx="9" stroke="var(--color-mani-red)" />
        <line x1="69" y1="32" x2="69" y2="36" stroke="var(--color-mani-red)" />
        <line x1="69" y1="48" x2="69" y2="52" stroke="var(--color-mani-red)" />
        <path d="M60 48a9 9 0 0 0 18 0" stroke="var(--color-mani-red)" />
        <path d="M69 57v8" stroke="var(--color-mani-red)" />
        <path d="M60 65h18" stroke="var(--color-mani-red)" />
        {/* Heartbeat right (green) */}
        <path
          d="M78 60 H88 L92 54 L96 62 L100 60"
          stroke="var(--color-mani-green)"
        />
      </g>
    </svg>
  );
}
