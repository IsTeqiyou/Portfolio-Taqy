import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import me from "@/assets/me.jpg.asset.json";
import mem1 from "@/assets/memory1.jpg.asset.json";
import mem2 from "@/assets/memory2.jpg.asset.json";
import mem3 from "@/assets/memory3.jpg.asset.json";
import mem5 from "@/assets/memory5.jpg.asset.json";
import mem6 from "@/assets/memory6.png.asset.json";
import cert1 from "@/assets/cert1.jpg.asset.json";
import cert2 from "@/assets/cert2.jpg.asset.json";
import cert3 from "@/assets/cert3.jpg.asset.json";
import cert4 from "@/assets/cert4.jpg.asset.json";
import cert5 from "@/assets/cert5.jpg.asset.json";
import cert6 from "@/assets/cert6.png.asset.json";
import mem4b from "@/assets/memory4b.jpg.asset.json";

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
        <span className="mx-1 flex gap-1.5">
          <button type="button" aria-label="Scroll ke bawah" title="Scroll ke bawah" onClick={() => window.scrollBy({ top: window.innerHeight * 0.8, behavior: "smooth" })} className="h-3.5 w-3.5 rounded-full border border-border bg-sun transition-transform hover:scale-150" />
          <button type="button" aria-label="Scroll ke atas" title="Balik ke atas" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="h-3.5 w-3.5 rounded-full border border-border bg-rose transition-transform hover:scale-150" />
          <button type="button" aria-label="Loncat ke kontak" title="Langsung ke kontak" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} className="h-3.5 w-3.5 rounded-full border border-border bg-leaf transition-transform hover:scale-150" />
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
            <img src={me.url} alt="Muhammad Taqiyuddin" onClick={() => zoom(me.url)} className="relative w-full cursor-zoom-in rounded-3xl border-2 border-border shadow-soft" />
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
    <figure onClick={() => zoom(src)} className="reveal relative mx-auto w-full max-w-56 cursor-zoom-in bg-card p-2 pb-8 sm:p-3 sm:pb-10 shadow-soft transition-transform duration-500 hover:rotate-0 hover:scale-105"
      style={{ transform: `rotate(${rot})`, "--d": d } as React.CSSProperties}>
      <span className="tape -top-3 left-1/2 -translate-x-1/2 -rotate-3" />
      <img src={src} alt={cap} className={`aspect-[3/4] w-full bg-foreground/90 ${fit ? "object-contain" : "object-cover"}`} loading="lazy" />
      <figcaption className="absolute bottom-2 inset-x-0 text-center font-hand text-base sm:text-lg">{cap}</figcaption>
    </figure>
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
  return (
    <section id="about" className="paper relative min-h-screen px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <p className="reveal font-hand text-2xl text-muted-foreground">tentang aku!</p>
        <h2 className="reveal mt-2 inline-block border-2 border-border bg-card px-5 py-2 font-pixel text-3xl shadow-hard sm:text-4xl">Siapa Saya?</h2>
        <div className="mt-12 grid items-start gap-12 lg:grid-cols-[1fr_2fr_1fr]">
          <div className="grid grid-cols-3 gap-4 lg:grid-cols-1 lg:gap-10">
            <Polaroid src={mem1.url} cap="sesi" rot="-5deg" d="100ms" />
            <Polaroid src={mem3.url} cap="yang" rot="4deg" d="200ms" />
            <Polaroid src={mem4b.url} cap="selalu" rot="-3deg" d="300ms" fit />
          </div>
          <div className="order-first space-y-5 font-hand lg:order-none text-xl leading-relaxed sm:text-2xl">
            {paras.map((p, i) => (
              <p key={i} className={`reveal ${i === 0 ? "text-2xl font-bold sm:text-3xl" : ""}`} style={{ "--d": `${i * 120}ms` } as React.CSSProperties}>{p}</p>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-4 lg:grid-cols-1 lg:gap-10">
            <Polaroid src={mem2.url} cap="potret" rot="6deg" d="150ms" />
            <Polaroid src={mem5.url} cap="kuuu" rot="-4deg" d="250ms" />
            <Polaroid src={mem6.url} cap="benci" rot="3deg" d="350ms" fit />
          </div>
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

function Skills() {
  return (
    <div className="mt-24">
      <p className="reveal font-hand text-2xl text-muted-foreground">yang aku bisa ⚡</p>
      <h2 className="reveal font-pixel text-4xl sm:text-5xl">Keahlian</h2>
      <div className="reveal relative mt-8 -rotate-1 border-2 border-border bg-card p-6 shadow-hard sm:p-10">
        <span className="tape -top-3 right-10 rotate-6" />
        <div className="grid gap-6 md:grid-cols-2">
          {SKILLS.map((k, i) => (
            <div key={k.n}>
              <div className="flex justify-between font-mono text-sm uppercase tracking-wider">
                <span>{k.n}</span><span className="font-pixel">{k.v}%</span>
              </div>
              <div className="mt-2 h-5 border-2 border-border bg-background">
                <div className={`skill-bar h-full ${k.c}`} style={{ "--w": `${k.v}%`, "--d": `${300 + i * 150}ms` } as React.CSSProperties} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const CERTS = [
  { src: cert4.url, t: "Santri Teladan", s: "Kategori Santri Percontohan · 2022", icon: "★", c: "bg-sun" },
  { src: cert2.url, t: "Pengampu Halaqoh", s: "Tahfizh & IT Bootcamp · 2022", icon: "⌨", c: "bg-sky text-primary-foreground" },
  { src: cert5.url, t: "Liwaul Furqon Championship VI", s: "Peserta · Maret 2023", icon: "⚑", c: "bg-mint" },
  { src: cert3.url, t: "Dauroh Tuhfathul Athfal", s: "Peserta · Ramadhan 1444 H", icon: "☾", c: "bg-rose text-primary-foreground" },
  { src: cert6.url, t: "Front-End Web untuk Pemula", s: "Dicoding Academy · Nov 2024", icon: "</>", c: "bg-sky text-primary-foreground" },
  { src: cert1.url, t: "Ilqo Terbaik", s: "Certificate of Appreciation · 2024", icon: "♛", c: "bg-ember text-primary-foreground" },
];

function Certificates() {
  const rots = ["-3deg", "2deg", "-1deg", "3deg", "-2deg", "1deg"];
  return (
    <div className="mt-24">
      <p className="reveal font-hand text-2xl text-muted-foreground">koleksi dari pondok 🏆</p>
      <h2 className="reveal font-pixel text-4xl sm:text-5xl">Sertifikat</h2>
      <p className="reveal mt-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">Pondok Tahfizh Plus Abu Dzar</p>
      <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {CERTS.map((c, i) => (
          <figure key={c.t} className="reveal group relative" style={{ "--d": `${i * 120}ms` } as React.CSSProperties}>
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
            <div className="torn-bottom border-2 border-border bg-foreground p-6 pb-12 text-primary-foreground shadow-soft transition-transform duration-500 group-hover:-translate-y-2 sm:p-10">
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
            <div className="torn-bottom border-2 border-border bg-card p-8 shadow-soft transition-transform duration-500 group-hover:-translate-y-2 sm:p-10">
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
      <button type="button" onClick={onClose}
        className="book-cover reveal group relative mx-auto mt-20 flex w-full max-w-md flex-col items-center gap-2 rounded-r-2xl border-2 border-border px-8 py-10 text-primary-foreground shadow-hard transition-transform hover:-rotate-1">
        <span className="absolute inset-y-0 left-0 w-4 rounded-l bg-foreground/40" />
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-sun">~ the end ~</span>
        <span className="font-pixel text-2xl sm:text-3xl">Tutup Buku</span>
        <span className="font-hand text-xl opacity-80">makasih udah mampir yaa ✦ klik buat balik ke cover</span>
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

function Cover({ open, onOpen }: { open: boolean; onOpen: () => void }) {
  const startY = useRef<number | null>(null);
  useEffect(() => {
    document.body.style.overflow = open ? "" : "hidden";
    if (open) return;
    const wheel = (e: WheelEvent) => e.deltaY > 20 && onOpen();
    window.addEventListener("wheel", wheel);
    return () => window.removeEventListener("wheel", wheel);
  }, [open, onOpen]);
  const down = (y: number) => { startY.current = y; };
  const up = (y: number) => { if (startY.current !== null && startY.current - y > 50) onOpen(); startY.current = null; };
  return (
    <div aria-hidden={open}
      onPointerDown={(e) => down(e.clientY)} onPointerUp={(e) => up(e.clientY)}
      onTouchStart={(e) => down(e.touches[0].clientY)} onTouchEnd={(e) => up(e.changedTouches[0].clientY)}
      className={`book-cover fixed inset-0 z-[80] flex touch-none select-none flex-col items-center justify-center px-6 text-center text-primary-foreground ${open ? "open pointer-events-none" : ""}`}>
      <span className="absolute inset-y-0 left-0 w-6 bg-foreground/40 sm:w-10" />
      <div className="relative border-4 border-double border-sun/70 px-8 py-12 sm:px-16 sm:py-16">
        <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-sun sm:text-xs">✦ vol. 01 ✦</p>
        <h1 className="mt-4 font-pixel text-4xl leading-tight sm:text-6xl">Portfolio<br />Taqy</h1>
        <p className="mx-auto mt-6 max-w-xs rotate-[-2deg] border-2 border-dashed border-rose bg-rose/20 px-4 py-2 font-hand text-xl sm:text-2xl">dilarang buka sebelum izin pemilik!</p>
      </div>
      <button type="button" onClick={onOpen} className="nudge mt-12 font-mono text-xs uppercase tracking-widest text-sun">↑ tarik ke atas buat buka ↑</button>
    </div>
  );
}

function Index() {
  useReveal();
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
      <Cover open={open} onOpen={onOpen} />
    </main>
  );
}
