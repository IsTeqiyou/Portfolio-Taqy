import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import me from "@/assets/me.jpg.asset.json";
import mem1 from "@/assets/memory1.jpg.asset.json";
import mem2 from "@/assets/memory2.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Muhammad Taqiyuddin — Portfolio" },
      { name: "description", content: "Website kecil Muhammad Taqiyuddin: IT programmer, UI/UX designer, dan santri Pondok Tahfizh Plus Abu Dzar." },
      { property: "og:title", content: "Muhammad Taqiyuddin — Portfolio" },
      { property: "og:description", content: "IT programmer, UI/UX designer & gamer. Cuma website kecil kok." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const NAV = [
  { id: "home", label: "Home", icon: "★" },
  { id: "about", label: "Tentang", icon: "☺" },
  { id: "project", label: "Proyek", icon: "▦" },
  { id: "contact", label: "Kontak", icon: "✉" },
];

const FEATURES = [
  {
    label: "Doa",
    c: "bg-sun",
    icon: (
      <>
        <path d="M12 6.4c-2-1.6-5-1.9-8-1v12c3-.9 6-.6 8 1 2-1.6 5-1.9 8-1v-12c-3-.9-6-.6-8 1z" />
        <path d="M12 6.4v12" />
      </>
    ),
  },
  {
    label: "Sholat",
    c: "bg-mint",
    icon: (
      <>
        <circle cx="12" cy="11" r="6.5" strokeDasharray="1.2 2.4" />
        <path d="M12 17.5v2.2" />
        <path d="M10.4 19.7h3.2" />
      </>
    ),
  },
  {
    label: "Waktu",
    c: "bg-rose",
    icon: (
      <>
        <circle cx="12" cy="12" r="7.5" />
        <path d="M12 7.8v4.6l3 1.9" />
      </>
    ),
  },
];

function Header() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { threshold: 0.5 },
    );
    NAV.forEach((n) => { const el = document.getElementById(n.id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);
  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav className="flex items-center gap-1 rounded-full border-2 border-border bg-card p-1.5 shadow-hard">
        <span className="spin-slow mx-1 grid h-8 w-8 place-items-center rounded-full bg-rose font-pixel text-xs text-primary-foreground">T</span>
        {NAV.map((n) => (
          <a key={n.id} href={`#${n.id}`}
            className={`rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-all duration-300 sm:px-4 ${active === n.id ? "bg-sun text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
            <span className="mr-1">{n.icon}</span><span className="hidden sm:inline">{n.label}</span>
          </a>
        ))}
        <span className="mx-1 hidden gap-1 sm:flex">
          <i className="h-3 w-3 rounded-full bg-sun" /><i className="h-3 w-3 rounded-full bg-rose" /><i className="h-3 w-3 rounded-full bg-leaf" />
        </span>
      </nav>
    </header>
  );
}

function Hero() {
  const tags = [
    { t: "💻 IT Programmer", c: "bg-mint", r: "-6deg" },
    { t: "🎨 Desain UI & UX", c: "bg-sun", r: "4deg" },
    { t: "🎮 Suka Ngegame", c: "bg-rose text-primary-foreground", r: "-3deg" },
  ];
  return (
    <section id="home" className="paper relative flex min-h-screen items-center overflow-hidden px-6 pt-28 pb-16">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-2">
        <div>
          <p className="reveal font-hand text-2xl text-muted-foreground">halo, nama saya ✎</p>
          <div className="reveal relative mt-2 inline-block" style={{ "--d": "150ms" } as React.CSSProperties}>
            <h1 className="font-pixel text-5xl leading-[0.95] sm:text-7xl">Muhammad<br />Taqiyuddin</h1>
            <svg className="absolute -inset-4 h-[calc(100%+2rem)] w-[calc(100%+2rem)]" viewBox="0 0 400 200" preserveAspectRatio="none" fill="none">
              <path className="draw" d="M10 20 Q200 5 390 18 L388 185 Q200 195 12 182 Z" stroke="var(--ember)" strokeWidth="2.5" />
            </svg>
          </div>
          <p className="reveal mt-6 flex items-center gap-2 font-mono text-xs uppercase tracking-widest" style={{ "--d": "300ms" } as React.CSSProperties}>
            <span className="h-2 w-2 rounded-full bg-sky blink" /> cuma website kecil kok
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {tags.map((g, i) => (
              <span key={g.t} className={`reveal ${g.c} border-2 border-border px-4 py-2 font-mono text-sm shadow-hard`}
                style={{ "--d": `${450 + i * 120}ms`, transform: `rotate(${g.r})` } as React.CSSProperties}>{g.t}</span>
            ))}
          </div>
          <a href="#about" className="reveal mt-10 inline-flex items-center gap-3 bg-primary px-6 py-3 font-mono text-xs uppercase tracking-widest text-primary-foreground transition-transform hover:-translate-y-1" style={{ "--d": "800ms" } as React.CSSProperties}>
            <span className="h-3 w-3 bg-sky" /> Kenalan yuk ↓
          </a>
        </div>
        <div className="reveal relative mx-auto w-full max-w-sm" style={{ "--d": "250ms" } as React.CSSProperties}>
          <div className="absolute inset-0 translate-x-6 translate-y-6 -rotate-3 rounded-3xl bg-foreground/85 blur-[2px]" />
          <div className="absolute inset-0 -translate-x-4 translate-y-3 rotate-6 rounded-3xl bg-sun" />
          <div className="floaty relative" style={{ "--r": "-2deg" } as React.CSSProperties}>
            <img src={me.url} alt="Muhammad Taqiyuddin" className="relative w-full rounded-3xl border-2 border-border shadow-soft" />
          </div>
          <span className="floaty absolute -top-6 -right-4 flex rotate-12 items-center gap-2 font-hand text-3xl text-rose" style={{ animationDelay: "1s" }}>
            <svg viewBox="0 0 24 24" className="h-7 w-7 -rotate-6" fill="currentColor" aria-hidden="true"><path d="M13.6 1.8 4.2 13.4h5.4l-1.4 8.8 9.6-11.8h-5.6z" /></svg>
            it's me!
          </span>
        </div>
      </div>
    </section>
  );
}

function About() {
  const paras = [
    "Hi there! Nama saya Muhammad Taqiyuddin, biasa dipanggil Taqy.",
    "Time flies, nggak kerasa udah mau 6 tahun aja saya stay dan nyantri di Pondok Tahfizh Plus Abu Dzar, Bogor. Originally dari Bangka terus merantau ke Jawa, saya udah join dari zaman SMP as part of angkatan 1—and fun fact, saya itu santri paling muda di angkatan. Rasanya baru kemarin struggle adaptasi, tahu-tahu sekarang udah kelas 12 aja.",
    "Back then, saya sempat clueless banget dan bingung mau dibawa ke mana tujuan hidup ini. Tapi this long journey benar-benar changed my whole perspective. Nggak cuma fokus increasing hafalan Alquran dan deepening ilmu agama, saya juga belajar IT as an essential skill buat embrace era digital.",
    "The vibe di pondok juga makin seru karena dikelilingi banyak teman seperjuangan. To blow off some steam dari rutinitas harian, saya biasanya suka play sports kayak futsal atau berenang bareng mereka.",
    "Right now, mendekati graduation, saya lagi in the process of applying ke perguruan tinggi swasta (PTS). With all the skills, hafalan, dan life experience selama di pondok, saya definitely ready and more confident buat melangkah ke jenjang kuliah!",
  ];
  const Polaroid = ({ src, cap, rot, d }: { src: string; cap: string; rot: string; d: string }) => (
    <figure className="reveal relative mx-auto w-56 bg-card p-3 pb-10 shadow-soft transition-transform duration-500 hover:rotate-0 hover:scale-105"
      style={{ transform: `rotate(${rot})`, "--d": d } as React.CSSProperties}>
      <span className="tape -top-3 left-1/2 -translate-x-1/2 -rotate-3" />
      <img src={src} alt={cap} className="aspect-[3/4] w-full object-cover" loading="lazy" />
      <figcaption className="absolute bottom-2 inset-x-0 text-center font-hand text-lg">{cap}</figcaption>
    </figure>
  );
  return (
    <section id="about" className="paper relative min-h-screen px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <p className="reveal font-hand text-2xl text-muted-foreground">tentang aku!</p>
        <h2 className="reveal mt-2 inline-block border-2 border-border bg-card px-5 py-2 font-pixel text-3xl shadow-hard sm:text-4xl">Siapa Saya?</h2>
        <div className="mt-12 grid items-start gap-12 lg:grid-cols-[1fr_2fr_1fr]">
          <Polaroid src={mem1.url} cap="sesi" rot="-5deg" d="100ms" />
          <div className="space-y-5 font-hand text-xl leading-relaxed sm:text-2xl">
            {paras.map((p, i) => (
              <p key={i} className={`reveal ${i === 0 ? "text-2xl font-bold sm:text-3xl" : ""}`} style={{ "--d": `${i * 120}ms` } as React.CSSProperties}>{p}</p>
            ))}
          </div>
          <Polaroid src={mem2.url} cap="potret" rot="6deg" d="300ms" />
        </div>
      </div>
    </section>
  );
}

function Project() {
  return (
    <section id="project" className="paper relative min-h-screen px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <p className="reveal font-hand text-2xl text-muted-foreground">intip karyaku ✎</p>
        <h2 className="reveal font-pixel text-5xl sm:text-7xl">Proyek Saya</h2>
        <div className="mt-12 grid items-center gap-10 md:grid-cols-[3fr_2fr]">
          <article className="reveal group relative" style={{ "--d": "150ms" } as React.CSSProperties}>
            <span className="relative z-10 inline-block bg-sky px-5 py-2 font-mono text-xs uppercase tracking-widest text-primary-foreground [clip-path:polygon(0_0,88%_0,100%_100%,0_100%)]">✦ Proyek 01</span>
            <div className="border-2 border-border bg-foreground p-8 text-primary-foreground shadow-soft transition-transform duration-500 group-hover:-translate-y-2 sm:p-10">
              <p className="font-mono text-xs uppercase tracking-widest opacity-70">● Aplikasi Android</p>
              <h3 className="mt-3 text-5xl font-bold">Qyqalb App</h3>
              <p className="mt-4 max-w-md opacity-80">Aplikasi kumpulan doa dan waktu sholat — biar ibadah harian makin gampang.</p>
              <div className="mt-8 flex items-center gap-4">
                {FEATURES.map((f, i) => (
                  <span key={f.label} title={f.label} className={`floaty grid h-16 w-16 place-items-center rounded-xl border-2 border-border ${f.c} text-foreground`}
                    style={{ animationDelay: `${i * 0.8}s` } as React.CSSProperties}>
                    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      {f.icon}
                    </svg>
                  </span>
                ))}
              </div>
              <a href="https://github.com/IsTeqiyou/Qyqalb_App.git" target="_blank" rel="noreferrer"
                className="mt-8 inline-block border-b-2 border-sun pb-1 font-mono text-xs uppercase tracking-widest text-sun transition-all hover:tracking-[0.3em]">Lihat Proyek ↗</a>
            </div>
          </article>
          <div className="reveal relative rotate-2 border-2 border-border bg-sun p-8 shadow-hard" style={{ "--d": "350ms" } as React.CSSProperties}>
            <span className="tape -top-3 left-6 rotate-[-8deg]" />
            <p className="font-pixel text-2xl leading-tight">Maaf guys yaa 🙏</p>
            <p className="mt-4 font-hand text-2xl leading-snug">
              Di sini saya kasih satu aja. Kalau mau lihat lebih banyak lagi... hmm, nggak banyak sih, cuman lumayan aja. Ada di GitHub aku yaa!
            </p>
            <a href="https://github.com/IsTeqiyou" target="_blank" rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 bg-primary px-5 py-3 font-mono text-sm text-primary-foreground transition-transform hover:-translate-y-1">
              ⌥ github.com/IsTeqiyou
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const items = [
    { k: "Instagram", v: "@taaqydn", href: "https://instagram.com/taaqydn", c: "bg-rose text-primary-foreground", i: "◎" },
    { k: "Gmail", v: "muhtaqi009@gmail.com", href: "mailto:muhtaqi009@gmail.com", c: "bg-sun", i: "✉" },
  ];
  return (
    <section id="contact" className="paper relative flex min-h-screen flex-col justify-center overflow-hidden px-6 py-28">
      <div className="mx-auto w-full max-w-5xl text-center">
        <p className="reveal font-hand text-2xl text-muted-foreground">yuk ngobrol!</p>
        <h2 className="reveal font-pixel text-5xl sm:text-7xl">Hubungi Saya</h2>
        <div className="mt-14 grid gap-8 sm:grid-cols-2">
          {items.map((it, i) => (
            <a key={it.k} href={it.href} target="_blank" rel="noreferrer"
              className={`reveal group ${it.c} border-2 border-border p-8 text-left shadow-hard transition-all duration-300 hover:-translate-y-2 hover:rotate-[-1deg]`}
              style={{ "--d": `${i * 150}ms` } as React.CSSProperties}>
              <span className="text-4xl">{it.i}</span>
              <p className="mt-4 font-mono text-xs uppercase tracking-widest opacity-80">{it.k}</p>
              <p className="mt-1 break-all text-2xl font-bold sm:text-3xl">{it.v}</p>
              <p className="mt-6 font-mono text-xs transition-all group-hover:tracking-widest">Kirim pesan →</p>
            </a>
          ))}
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 overflow-hidden border-t-2 border-border bg-foreground py-3 text-primary-foreground">
        <div className="marquee flex w-max gap-10 font-pixel text-sm">
          {Array.from({ length: 2 }).flatMap((_, j) =>
            ["Muhammad Taqiyuddin", "✦", "IT Programmer", "✦", "UI & UX", "✦", "Gamer", "✦", "Santri Abu Dzar", "✦"].map((t, i) => <span key={`${j}-${i}`}>{t}</span>),
          )}
        </div>
      </div>
    </section>
  );
}

function Index() {
  useReveal();
  return (
    <main>
      <Header />
      <Hero />
      <About />
      <Project />
      <Contact />
    </main>
  );
}
