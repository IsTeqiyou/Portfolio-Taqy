import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import me from "@/assets/me.jpg";
import mem1 from "@/assets/memory1.jpg";
import mem2 from "@/assets/memory2.jpg";
import mem3 from "@/assets/memory3.jpg";
import mem5 from "@/assets/memory5.jpg";
import mem6 from "@/assets/memory6.png";
import cert1 from "@/assets/cert1.jpg";
import cert2 from "@/assets/cert2.jpg";
import cert3 from "@/assets/cert3.jpg";
import cert4 from "@/assets/cert4.jpg";
import cert5 from "@/assets/cert5.jpg";
import cert6 from "@/assets/cert6.png";
import cert7 from "@/assets/cert7.jpg";
import cert8 from "@/assets/cert8.jpg";
import mem4b from "@/assets/memory4b.jpg";
import { playPaperSound, playSkillSound, playWelcome, unlockPortfolioAudio } from "@/lib/portfolio-audio";

const zoom = (src: string) => window.dispatchEvent(new CustomEvent("zoom-photo", { detail: src }));

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
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    NAV.forEach((n) => { const el = document.getElementById(n.id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);
  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav className="flex items-center gap-1 rounded-full border-2 border-border bg-card p-1.5 shadow-hard">
        <span className="mx-1 grid h-8 w-8 place-items-center rounded-full bg-rose font-pixel text-xs text-primary-foreground">T</span>
        {NAV.map((n) => (
          <a key={n.id} href={`#${n.id}`}
            className={`rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider sm:px-4 ${active === n.id ? "bg-sun text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
            <span className="mr-1">{n.icon}</span><span className="hidden sm:inline">{n.label}</span>
          </a>
        ))}
        <span className="mx-1 flex gap-1.5">
          <button type="button" aria-label="Scroll ke bawah" title="Scroll ke bawah" onClick={() => window.scrollBy({ top: window.innerHeight * 0.8, behavior: "smooth" })} className="h-3.5 w-3.5 rounded-full border border-border bg-sun" />
          <button type="button" aria-label="Scroll ke atas" title="Balik ke atas" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="h-3.5 w-3.5 rounded-full border border-border bg-rose" />
          <button type="button" aria-label="Loncat ke kontak" title="Langsung ke kontak" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} className="h-3.5 w-3.5 rounded-full border border-border bg-leaf" />
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
            <img src={me} alt="Muhammad Taqiyuddin" className="relative w-full rounded-3xl border-2 border-border shadow-soft" />
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

function Polaroid({ src, cap, rot, d, fit }: { src: string; cap: string; rot: string; d: string; fit?: boolean }) {
  return (
    <figure onClick={() => zoom(src)} className="reveal relative w-full cursor-zoom-in bg-card p-2 pb-8 sm:p-3 sm:pb-10 shadow-soft transition-transform duration-500 hover:rotate-0 hover:scale-105"
      style={{ transform: `rotate(${rot})`, "--d": d } as React.CSSProperties}>
      <span className="tape -top-3 left-1/2 -translate-x-1/2 -rotate-3" />
      <img src={src} alt={cap} className={`aspect-square w-full bg-foreground/90 ${fit ? "object-contain" : "object-cover"}`} loading="lazy" />
      <figcaption className="absolute bottom-2 inset-x-0 text-center font-hand text-base sm:text-lg">{cap}</figcaption>
    </figure>
  );
}

function About() {
  const paras = [
    "Hi there! Nama saya Muhammad Taqiyuddin, biasa dipanggil Taqy.",
    "Time flies, nggak kerasa udah hampir 6 tahun aja saya nyantri di Pondok Tahfizh Plus Abu Dzar. Berawal dari Bangka, merantau ke Jawa sejak SMP sebagai bagian dari angkatan pertama. Fun fact, saya jadi santri paling muda di angkatan. Rasanya baru kemarin masih awkward beradaptasi dengan lingkungan baru, eh sekarang udah kelas 12 aja.",
    "Banyak banget hal yang berubah selama di sini. Dari yang awalnya masih clueless soal arah hidup, sampai akhirnya mulai menemukan passion lewat Al-Qur'an, ilmu agama, dan dunia IT. Belum lagi berbagai keseruan bareng teman-teman, mulai dari belajar bareng sampai olahraga bareng yang pastinya bakal ngangenin banget.",
    "And now, a new chapter begins! Alhamdulillah, saya berhasil diterima di Telkom University Bandung, Program Studi Psikologi. Rasanya campur aduk, antara excited menyambut kehidupan baru dan sedih karena sebentar lagi harus meninggalkan tempat yang udah terasa seperti rumah sendiri.",
    "Six years, countless memories, and a whole new beginning.",
    "Thank you, Abu Dzar! Banyak cerita yang mungkin nggak bisa diulang, tapi bakal selalu jadi bagian dari perjalanan hidup saya.",
  ];
  return (
    <section id="about" className="paper relative min-h-screen px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <p className="reveal font-hand text-2xl text-muted-foreground">tentang aku!</p>
        <h2 className="reveal mt-2 inline-block border-2 border-border bg-card px-5 py-2 font-pixel text-3xl shadow-hard sm:text-4xl">Siapa Saya?</h2>
        <div className="mt-12 grid items-start gap-12 lg:grid-cols-2">
          <div className="space-y-5 font-hand text-xl leading-relaxed sm:text-2xl">
            {paras.map((p, i) => (
              <p key={i} className={`reveal ${i === 0 ? "text-2xl font-bold sm:text-3xl" : ""}`} style={{ "--d": `${i * 120}ms` } as React.CSSProperties}>{p}</p>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-8">
            <Polaroid src={mem1} cap="sesi" rot="-3deg" d="100ms" />
            <Polaroid src={mem2} cap="potret" rot="3deg" d="150ms" />
            <Polaroid src={mem3} cap="yang" rot="2deg" d="200ms" />
            <Polaroid src={mem4b} cap="selalu" rot="-2deg" d="250ms" />
            <Polaroid src={mem5} cap="ku" rot="-3deg" d="300ms" />
            <Polaroid src={mem6} cap="benci" rot="2deg" d="350ms" />
          </div>
        </div>
        <div aria-hidden="true" className="reveal mt-12 flex items-center justify-end gap-3 font-hand text-xl text-muted-foreground">
          <span className="floaty text-4xl">🐸</span>
          <span className="-rotate-3 border-b-2 border-dashed border-leaf">aku numpang lewat yaa...</span>
        </div>
      </div>
    </section>
  );
}

const SKILLS = [
  { n: "HTML & CSS", v: 90, c: "bg-ember" },
  { n: "Tailwind CSS", v: 85, c: "bg-sky" },
  { n: "JavaScript", v: 80, c: "bg-sun" },
  { n: "React / Next.js", v: 75, c: "bg-mint" },
  { n: "Figma UI & UX", v: 86, c: "bg-rose" },
];

function SkillRow({ k, i }: { k: (typeof SKILLS)[number]; i: number }) {
  const [st, setSt] = useState<"idle" | "err" | "ok">("idle");
  const go = () => { if (st !== "idle") return; setSt("err"); playSkillSound("error"); setTimeout(() => { setSt("ok"); playSkillSound("ready"); }, 900); };
  return (
    <div onMouseEnter={go} onClick={go} className="cursor-help">
      <div className="flex justify-between font-mono text-sm uppercase tracking-wider">
        <span>{k.n}</span>
        <span className={`font-pixel ${st === "err" ? "glitch text-destructive" : ""}`}>{st === "ok" ? `${k.v}%` : st === "err" ? "ERR0R!" : "??%"}</span>
      </div>
      <div className={`relative mt-2 h-5 border-2 border-border bg-background ${st === "err" ? "glitch" : ""}`}>
        <div className={`h-full ${k.c} transition-[width] duration-1000 ease-out`} style={{ width: st === "ok" ? `${k.v}%` : "0%", transitionDelay: `${i * 0}ms` }} />
        {st === "idle" && <span className="absolute inset-0 grid place-items-center font-mono text-[10px] uppercase text-muted-foreground">arahkan kursor ke sini 👆</span>}
        {st === "err" && <span className="absolute inset-0 grid place-items-center bg-destructive font-mono text-[10px] uppercase text-destructive-foreground">⚠ system error... loading</span>}
      </div>
    </div>
  );
}

function Skills() {
  return (
    <div className="mt-24">
      <p className="reveal font-hand text-2xl text-muted-foreground">yang aku bisa 🛠️</p>
      <h2 className="reveal font-pixel text-4xl sm:text-5xl">Keahlian</h2>
      <div className="reveal relative mt-8 -rotate-1 border-2 border-border bg-card p-6 shadow-hard sm:p-10">
        <span className="tape -top-3 right-10 rotate-6" />
        <div className="grid gap-6 md:grid-cols-2">
          {SKILLS.map((k, i) => <SkillRow key={k.n} k={k} i={i} />)}
        </div>
      </div>
    </div>
  );
}

const CERTS = [
  { src: cert4, t: "Santri Teladan", s: "Kategori Santri Percontohan · 2022", icon: "★", c: "bg-sun" },
  { src: cert2, t: "Pengampu Halaqoh", s: "Tahfizh & IT Bootcamp · 2022", icon: "⌨", c: "bg-sky text-primary-foreground" },
  { src: cert5, t: "Liwaul Furqon Championship VI", s: "Peserta · Maret 2023", icon: "⚑", c: "bg-mint" },
  { src: cert3, t: "Dauroh Tuhfathul Athfal", s: "Peserta · Ramadhan 1444 H", icon: "☾", c: "bg-rose text-primary-foreground" },
  { src: cert6, t: "Front-End Web untuk Pemula", s: "Dicoding Academy · Nov 2024", icon: "</>", c: "bg-sky text-primary-foreground" },
  { src: cert1, t: "Ilqo Terbaik", s: "Certificate of Appreciation · 2024", icon: "♛", c: "bg-ember text-primary-foreground" },
  { src: cert7, t: "Challenge T-Shirt Design", s: "Juara 2 · Challenge Game Creator & T-Shirt Design", icon: "✎", c: "bg-mint" },
  { src: cert8, t: "React JS", s: "Lulus Nilai Cukup · IT Kelas 10 · 2024/2025", icon: "⚛", c: "bg-sky text-primary-foreground" },
];

function Certificates() {
  const rots = ["-3deg", "2deg", "-1deg", "3deg", "-2deg", "1deg", "-2deg", "3deg"];
  return (
    <div className="mt-24">
      <p className="reveal font-hand text-2xl text-muted-foreground">koleksi dari pondok 🏆</p>
      <h2 className="reveal font-pixel text-4xl sm:text-5xl">Sertifikat</h2>
      <p className="reveal mt-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">Pondok Tahfizh Plus Abu Dzar</p>
      <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-6">
        {CERTS.map((c, i) => (
          <figure key={c.t} className={`reveal group relative lg:col-span-2 ${i === CERTS.length - 2 ? "lg:col-start-2" : ""}`} style={{ "--d": `${i * 120}ms` } as React.CSSProperties}>
            <div className="border-2 border-border bg-card p-3 shadow-hard transition-transform duration-500 group-hover:rotate-0 group-hover:-translate-y-2" style={{ transform: `rotate(${rots[i]})` }}>
              <span className="tape -top-3 left-1/2 -translate-x-1/2 rotate-2" />
              <div onClick={() => zoom(c.src)} className="cursor-zoom-in overflow-hidden border-2 border-border">
                <img src={c.src} alt={`Sertifikat ${c.t}`} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <figcaption className="mt-3 flex items-start gap-3">
                <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-border text-sm font-bold ${c.c}`}>{c.icon}</span>
                <span>
                  <span className="block font-bold leading-tight">{c.t}</span>
                  <span className="block font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{c.s}</span>
                </span>
              </figcaption>
            </div>
            <span className="stamp absolute -top-4 -right-3 grid h-14 w-14 rotate-12 place-items-center rounded-full border-2 border-dashed border-ember bg-background font-pixel text-[9px] text-ember">#{String(i + 1).padStart(2, "0")}</span>
          </figure>
        ))}
      </div>
    </div>
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
            <div onPointerEnter={() => playPaperSound("turn")} onPointerDown={() => playPaperSound("turn")} className="proj-paper wet-a border-2 border-border p-6 pb-12 text-foreground shadow-soft transition-transform duration-500 group-hover:-translate-y-2 sm:p-10">
              <p className="font-mono text-xs uppercase tracking-widest opacity-70">● Aplikasi Android</p>
              <h3 className="mt-3 text-4xl font-bold sm:text-5xl">Qyqalb App</h3>
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
          <div className="reveal relative rotate-2 border-2 border-border bg-sun p-8 shadow-hard md:row-span-2" style={{ "--d": "350ms" } as React.CSSProperties}>
            <span className="tape -top-3 left-6 rotate-[-8deg]" />
            <p className="font-pixel text-2xl leading-tight">Maaf guys yaa 🙏</p>
            <p className="mt-4 font-hand text-2xl leading-snug">
              Di sini aku kasih dua aja. Kalau mau lihat lebih banyak lagi... hmm, nggak banyak sih, cuman lumayan aja. Ada di GitHub aku yaa!
            </p>
            <a href="https://github.com/IsTeqiyou" target="_blank" rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 bg-primary px-5 py-3 font-mono text-sm text-primary-foreground transition-transform hover:-translate-y-1">
              ⌥ github.com/IsTeqiyou
            </a>
          </div>
          <article className="reveal group relative md:-mt-4" style={{ "--d": "200ms" } as React.CSSProperties}>
            <span className="relative z-10 inline-block bg-rose px-5 py-2 font-mono text-xs uppercase tracking-widest text-primary-foreground [clip-path:polygon(0_0,88%_0,100%_100%,0_100%)]">✦ Proyek 02</span>
            <div onPointerEnter={() => playPaperSound("turn")} onPointerDown={() => playPaperSound("turn")} className="proj-paper wet-b border-2 border-border p-8 text-foreground shadow-soft transition-transform duration-500 group-hover:-translate-y-2 sm:p-10">
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">● Aplikasi Android</p>
              <h3 className="mt-3 text-4xl font-bold sm:text-5xl">Note App</h3>
              <p className="mt-4 max-w-md font-hand text-2xl">mencatat note note ✎</p>
              <a href="https://github.com/IsTeqiyou/noteApp.git" target="_blank" rel="noreferrer"
                className="mt-6 inline-block border-b-2 border-rose pb-1 font-mono text-xs uppercase tracking-widest text-rose transition-all hover:tracking-[0.3em]">Lihat Proyek ↗</a>
            </div>
          </article>
        </div>
        <Skills />
        <Certificates />
      </div>
    </section>
  );
}

function Contact({ onClose }: { onClose: () => void }) {
  const items = [
    { k: "Instagram", v: "@taaqydn", href: "https://instagram.com/taaqydn", c: "bg-rose text-primary-foreground", i: "◎" },
    { k: "Gmail", v: "muhtaqi009@gmail.com", href: "mailto:muhtaqi009@gmail.com", c: "bg-sun", i: "✉" },
    { k: "Gmail Sekolah", v: "taqiyuddin2011@student.abudzar.sch.id", href: "mailto:taqiyuddin2011@student.abudzar.sch.id", c: "bg-mint", i: "✎" },
  ];
  return (
    <section id="contact" className="paper relative flex min-h-screen flex-col justify-center overflow-hidden px-6 py-28">
      <div className="mx-auto w-full max-w-5xl text-center">
        <p className="reveal font-hand text-2xl text-muted-foreground">yuk ngobrol!</p>
        <h2 className="reveal font-pixel text-5xl sm:text-7xl">Hubungi Saya</h2>
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <a key={it.k} href={it.href} target="_blank" rel="noreferrer"
              className={`reveal group ${it.c} border-2 border-border p-8 text-left shadow-hard transition-all duration-300 hover:-translate-y-2 hover:rotate-[-1deg]`}
              style={{ "--d": `${i * 150}ms` } as React.CSSProperties}>
              <span className="text-4xl">{it.i}</span>
              <p className="mt-4 font-mono text-xs uppercase tracking-widest opacity-80">{it.k}</p>
              <p className="mt-1 break-all text-xl font-bold">{it.v}</p>
              <p className="mt-6 font-mono text-xs transition-all group-hover:tracking-widest">Kirim pesan →</p>
            </a>
          ))}
        </div>
      </div>
      <button type="button" onPointerEnter={() => playPaperSound("touch")} onPointerDown={() => playPaperSound("touch")} onClick={() => { playPaperSound("close"); window.dispatchEvent(new Event("funpass")); onClose(); }}
        className="book-cover reveal group relative mx-auto mt-20 flex w-full max-w-md flex-col items-center gap-2 rounded-r-2xl border-2 border-border px-8 py-10 text-primary-foreground shadow-hard transition-transform hover:-rotate-1">
        <span className="absolute inset-y-0 left-0 w-4 rounded-l bg-foreground/40" />
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-sun">~ the end ~</span>
        <span className="font-pixel text-2xl sm:text-3xl">Tutup Buku</span>
        <span className="flex flex-col items-center text-center font-hand text-xl leading-snug opacity-80">
          <span>makasih udah mampir yaa</span>
          <span>klik buat balik ke cover</span>
        </span>
      </button>
    </section>
  );
}

function Decor() {
  const bits = [
    { cls: "torn-scrap bg-sun/70 left-[3%] top-[18%] h-24 w-40 -rotate-12", d: "0s" },
    { cls: "torn-scrap bg-mint/70 right-[4%] top-[34%] h-28 w-36 rotate-6", d: "1.5s" },
    { cls: "torn-scrap bg-rose/40 left-[6%] top-[52%] h-20 w-32 rotate-3", d: "3s" },
    { cls: "torn-scrap bg-sky/30 right-[8%] top-[70%] h-24 w-44 -rotate-6", d: "2s" },
    { cls: "torn-scrap bg-ember/30 left-[45%] top-[88%] h-16 w-28 rotate-12", d: "4s" },
    { cls: "torn-scrap bg-sky/25 left-[70%] top-[8%] h-20 w-32 rotate-12", d: "0.5s" },
    { cls: "torn-scrap bg-sun/50 right-[30%] top-[45%] h-16 w-24 -rotate-3", d: "2.5s" },
    { cls: "torn-scrap bg-mint/50 left-[20%] top-[63%] h-24 w-28 rotate-6", d: "3.5s" },
    { cls: "torn-scrap bg-rose/30 right-[2%] top-[80%] h-20 w-36 -rotate-12", d: "1s" },
    { cls: "torn-scrap bg-leaf/30 left-[1%] top-[95%] h-16 w-32 rotate-3", d: "4.5s" },
  ];
  const doodles = ["✦", "✎", "☆", "✧", "⚡", "♪", "✶", "◇", "☁", "✚", "○", "△", "✦", "⚡", "☆", "✎"];
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {bits.map((b, i) => <span key={i} className={`drift absolute ${b.cls}`} style={{ animationDelay: b.d }} />)}
      {doodles.map((d, i) => (
        <span key={i} className={`${i % 2 ? "spin-drift" : "drift"} absolute font-hand text-3xl sm:text-4xl text-muted-foreground/40`}
          style={{ left: `${(i * 37 + 10) % 92}%`, top: `${4 + i * 6}%`, animationDelay: `${i * 0.6}s` }}>{d}</span>
      ))}
    </div>
  );
}

function Lightbox() {
  const [src, setSrc] = useState<string | null>(null);
  useEffect(() => {
    const on = (e: Event) => setSrc((e as CustomEvent<string>).detail);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setSrc(null);
    window.addEventListener("zoom-photo", on);
    window.addEventListener("keydown", esc);
    return () => { window.removeEventListener("zoom-photo", on); window.removeEventListener("keydown", esc); };
  }, []);
  if (!src) return null;
  return (
    <div onClick={() => setSrc(null)} className="fixed inset-0 z-[90] grid cursor-zoom-out place-items-center bg-foreground/70 p-6 backdrop-blur-sm">
      <figure className="zoom-in relative bg-card p-3 shadow-soft">
        <img src={src} alt="Foto diperbesar" className="max-h-[75vh] max-w-[88vw] object-contain sm:max-w-[70vw]" />
        <button type="button" aria-label="Tutup" className="absolute -top-4 right-0 grid h-9 w-9 sm:-right-4 place-items-center rounded-full border-2 border-border bg-rose font-bold text-primary-foreground">✕</button>
      </figure>
    </div>
  );
}

const POP = ["😂", "🤣", "👀", "💥", "🐸", "🙀", "✨", "🔥", "🤪"];
function ClickBurst() {
  const [bits, setBits] = useState<{ id: number; x: number; y: number; e: string; dx: number }[]>([]);
  useEffect(() => {
    let id = 0;
    const on = (ev: MouseEvent) => {
      if (ev.target instanceof Element && ev.target.closest("header")) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const add = Array.from({ length: 5 }, () => ({ id: id++, x: ev.clientX, y: ev.clientY, e: POP[Math.floor(Math.random() * POP.length)] ?? "✨", dx: Math.random() * 160 - 80 }));
      setBits((b) => [...b, ...add]);
      setTimeout(() => setBits((b) => b.filter((x) => !add.includes(x))), 900);
    };
    window.addEventListener("click", on);
    return () => window.removeEventListener("click", on);
  }, []);
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[95]">
      {bits.map((b) => (
        <span key={b.id} className="burst absolute text-2xl" style={{ left: b.x, top: b.y, "--dx": `${b.dx}px` } as React.CSSProperties}>{b.e}</span>
      ))}
    </div>
  );
}

const PASSERS = ["🐎", "🐦", "🦆", "🐄", "🐌", "🦖"];
function Passers({ open }: { open: boolean }) {
  const [list, setList] = useState<{ id: number; e: string; top: number; dur: number; rev: boolean }[]>([]);
  useEffect(() => {
    let id = 0;
    const timers = new Set<ReturnType<typeof setTimeout>>();
    const expire = (add: typeof list) => {
      const timer = setTimeout(() => { setList((l) => l.filter((x) => !add.includes(x))); timers.delete(timer); }, 5000);
      timers.add(timer);
    };
    const on = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const add = Array.from({ length: 4 }, (_, k) => ({ id: id++, e: PASSERS[Math.floor(Math.random() * PASSERS.length)] ?? "🐎", top: 15 + Math.random() * 65, dur: 2.5 + Math.random() * 2, rev: k % 2 === 1 }));
      setList((l) => [...l, ...add]);
      expire(add);
    };
    let lastY = window.scrollY;
    let distance = 0;
    let lastVisit = 0;
    const scroll = () => {
      distance += Math.abs(window.scrollY - lastY);
      lastY = window.scrollY;
      if (!open || distance < 700 || Date.now() - lastVisit < 12000 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      lastVisit = Date.now(); distance = 0;
      const add = [{ id: id++, e: ["🦆", "🛸", "🐢"][id % 3] ?? "🦆", top: 82, dur: 4.5, rev: id % 2 === 0 }];
      setList((l) => [...l, ...add]);
      expire(add);
    };
    window.addEventListener("funpass", on);
    window.addEventListener("scroll", scroll, { passive: true });
    return () => { window.removeEventListener("funpass", on); window.removeEventListener("scroll", scroll); timers.forEach(clearTimeout); };
  }, [open]);
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[96] overflow-hidden">
      {list.map((p) => (
        <span key={p.id} className={`passby absolute text-6xl ${p.rev ? "rev" : ""}`} style={{ top: `${p.top}%`, animationDuration: `${p.dur}s` }}>
          <span className="inline-block" style={{ transform: p.rev ? "none" : "scaleX(-1)" }}>{p.e}</span>
        </span>
      ))}
    </div>
  );
}

function playBaa() {
  try {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctx(); const t = ctx.currentTime;
    const o = ctx.createOscillator(); o.type = "sawtooth";
    o.frequency.setValueAtTime(320, t); o.frequency.linearRampToValueAtTime(260, t + 0.9);
    const lfo = ctx.createOscillator(); lfo.frequency.value = 9; const lg = ctx.createGain(); lg.gain.value = 25;
    lfo.connect(lg).connect(o.frequency);
    const f = ctx.createBiquadFilter(); f.type = "lowpass"; f.frequency.value = 1400;
    const g = ctx.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.25, t + 0.05); g.gain.linearRampToValueAtTime(0, t + 0.95);
    o.connect(f).connect(g).connect(ctx.destination);
    o.start(); lfo.start(); o.stop(t + 1); lfo.stop(t + 1); o.onended = () => ctx.close();
  } catch { /* no audio */ }
}

const BOO = ["🐑", "👻", "🤡", "🐸", "🙀"];
function ScrollBoo() {
  const [boo, setBoo] = useState<{ e: string; side: "left" | "right" } | null>(null);
  useEffect(() => {
    const seen = new Set<string>();
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting || seen.has(e.target.id)) return;
      seen.add(e.target.id);
      setBoo({ e: BOO[seen.size % BOO.length] ?? "🐑", side: seen.size % 2 ? "left" : "right" });
      playBaa();
      setTimeout(() => setBoo(null), 1600);
    }), { threshold: 0.25 });
    ["about", "project", "contact"].forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);
  if (!boo) return null;
  return (
    <div aria-hidden="true" className={`boo pointer-events-none fixed top-1/3 z-[97] text-8xl ${boo.side === "left" ? "left-2" : "right-2"}`}>
      <span className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border-2 border-border bg-card px-3 py-1 font-hand text-2xl text-foreground">baaaaa! 😝</span>
      {boo.e}
    </div>
  );
}

function Peeker() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setInterval(() => { setShow(true); setTimeout(() => setShow(false), 2200); }, 9000);
    return () => clearInterval(t);
  }, []);
  return (
    <div aria-hidden="true" className={`peeker pointer-events-none fixed bottom-0 right-6 z-[70] text-6xl ${show ? "up" : ""}`}>
      <span className="absolute -top-10 right-10 whitespace-nowrap rounded-full border-2 border-border bg-card px-3 py-1 font-hand text-xl text-foreground">ciluk ba! 👋</span>
      🙈
    </div>
  );
}

function Cover({ open, onOpen: rawOpen }: { open: boolean; onOpen: () => void }) {
  const opening = useRef(false);
  const onOpen = useCallback(() => { if (opening.current) return; opening.current = true; playPaperSound("turn"); playWelcome(); rawOpen(); }, [rawOpen]);
  const startY = useRef<number | null>(null);
  const [drag, setDrag] = useState(0);
  useEffect(() => {
    if (!open) opening.current = false;
    document.body.style.overflow = open ? "" : "hidden";
    if (open) return;
    const wheel = (e: WheelEvent) => e.deltaY > 5 && onOpen();
    window.addEventListener("wheel", wheel, { passive: true });
    return () => window.removeEventListener("wheel", wheel);
  }, [open, onOpen]);
  const down = (y: number) => { startY.current = y; playPaperSound("touch"); };
  const move = (y: number) => { if (startY.current !== null) setDrag(Math.max(0, startY.current - y)); };
  const up = (y: number) => {
    if (startY.current !== null && startY.current - y > 30) onOpen();
    startY.current = null; setDrag(0);
  };
  return (
    <div aria-hidden={open}
      onPointerEnter={() => !open && playPaperSound("touch")}
      onPointerDown={(e) => down(e.clientY)} onPointerMove={(e) => move(e.clientY)} onPointerUp={(e) => up(e.clientY)}
      style={drag && !open ? { transform: `translateY(${-drag}px)`, transition: "none" } : undefined}
      className={`book-cover fixed inset-0 z-[80] flex touch-none select-none flex-col items-center justify-center px-6 text-center text-primary-foreground ${open ? "open pointer-events-none" : ""}`}>
      <span className="absolute inset-y-0 left-0 w-6 bg-foreground/40 sm:w-10" />
      <span className="absolute inset-y-0 left-8 w-px border-l border-dashed border-sun/40 sm:left-14" />
      {["left-10 top-6 sm:left-16", "right-6 top-6", "left-10 bottom-6 sm:left-16", "right-6 bottom-6"].map((p, i) => (
        <span key={p} className={`absolute ${p} h-10 w-10 border-sun/60 ${["border-t-2 border-l-2", "border-t-2 border-r-2", "border-b-2 border-l-2", "border-b-2 border-r-2"][i]}`} />
      ))}
      <span className="floaty absolute left-[14%] top-[14%] rotate-[-12deg] bg-sun px-3 py-1 font-hand text-xl text-foreground shadow-hard">jangan diintip! 🤫</span>
      <span className="floaty absolute right-[10%] top-[22%] grid h-20 w-20 rotate-12 place-items-center rounded-full border-2 border-dashed border-rose bg-rose/20 font-pixel text-[10px] uppercase leading-tight text-sun" style={{ animationDelay: "1s" }}>top<br />secret</span>
      <span className="floaty absolute bottom-[18%] left-[12%] text-5xl" style={{ animationDelay: "2s" }}>📎</span>
      <span className="floaty absolute bottom-[22%] right-[14%] rotate-6 bg-mint px-3 py-1 font-mono text-xs text-foreground shadow-hard" style={{ animationDelay: "1.5s" }}>⚡ handle with care</span>
      <span className="spin-drift absolute right-[30%] bottom-[10%] text-3xl text-sun/60">✦</span>
      <span className="spin-drift absolute left-[30%] top-[8%] text-2xl text-sun/50">☆</span>
      <div className="relative border-4 border-double border-sun/70 px-8 py-12 sm:px-16 sm:py-16">
        <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-sun sm:text-xs">✦ vol. 01 ✦</p>
        <h1 className="mt-4 font-pixel text-4xl leading-tight sm:text-6xl">Portfolio<br />Taqy</h1>
      </div>
      <button type="button" onClick={onOpen} className="nudge mt-12 font-mono text-xs uppercase tracking-widest text-sun">↑ tarik ke atas buat buka ↑</button>
    </div>
  );
}

function Index() {
  useReveal();
  useEffect(() => {
    const unlock = () => { try { unlockPortfolioAudio(); } catch { /* unsupported browser */ } };
    window.addEventListener("pointerdown", unlock, true);
    window.addEventListener("keydown", unlock, true);
    return () => { window.removeEventListener("pointerdown", unlock, true); window.removeEventListener("keydown", unlock, true); };
  }, []);
  const [open, setOpen] = useState(false);
  const onOpen = useCallback(() => { setOpen(true); window.scrollTo({ top: 0 }); }, []);
  const onClose = useCallback(() => { window.scrollTo({ top: 0, behavior: "smooth" }); setTimeout(() => setOpen(false), 500); }, []);
  return (
    <main className="relative">
      <Decor />
      <Header />
      <Hero />
      <About />
      <Project />
      <Contact onClose={onClose} />
      <Lightbox />
      {open && <Peeker />}
      <Passers open={open} />
      {open && <ScrollBoo />}
      <ClickBurst />
      <Cover open={open} onOpen={onOpen} />
    </main>
  );
}
