import welcomeAsset from "@/assets/taqy-welcome.mp3.asset.json";

let context: AudioContext | undefined;
let welcome: HTMLAudioElement | undefined;
let pendingWelcome = false;
let lastPaper = 0;

export function unlockPortfolioAudio() {
  if (typeof window === "undefined") return;
  context ??= new AudioContext();
  void context.resume().catch(() => {});
  welcome ??= new Audio(new URL(welcomeAsset.url, "https://caritaqydisini.lovable.app").href);
  welcome.volume = 0.8;
  if (pendingWelcome) playWelcome();
}

export function playWelcome() {
  pendingWelcome = true;
  if (!welcome) return;
  welcome.currentTime = 0;
  void welcome.play().then(() => { pendingWelcome = false; }).catch(() => {
    // Browsers require a tap/click before audio, including scroll-opened books.
    pendingWelcome = true;
  });
}

export function playPaperSound(kind: "touch" | "turn" | "close" = "turn") {
  if (!context || context.state !== "running") return;
  if (kind === "touch" && performance.now() - lastPaper < 180) return;
  lastPaper = performance.now();
  const duration = kind === "touch" ? 0.18 : kind === "close" ? 0.32 : 0.65;
  const buffer = context.createBuffer(1, Math.ceil(context.sampleRate * duration), context.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    const t = i / data.length;
    data[i] = (Math.random() * 2 - 1) * Math.sin(Math.PI * t) * (0.6 + 0.4 * Math.sin(t * 45));
  }
  const source = context.createBufferSource();
  source.buffer = buffer;
  const filter = context.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(kind === "close" ? 450 : 2400, context.currentTime);
  filter.frequency.exponentialRampToValueAtTime(kind === "close" ? 100 : 900, context.currentTime + duration);
  const gain = context.createGain();
  gain.gain.value = kind === "touch" ? 0.12 : 0.22;
  source.connect(filter).connect(gain).connect(context.destination);
  source.start();
  source.onended = () => { source.disconnect(); filter.disconnect(); gain.disconnect(); };
}

export function playSkillSound(kind: "error" | "ready") {
  if (!context || context.state !== "running") return;
  const now = context.currentTime;
  const tones = kind === "error" ? [180, 120, 180] : [660, 880];
  const step = kind === "error" ? 0.13 : 0.09;
  tones.forEach((frequency, i) => {
    if (!context) return;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const start = now + i * step;
    oscillator.type = kind === "error" ? "square" : "sine";
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(0.07, start + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, start + step - 0.01);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start(start);
    oscillator.stop(start + step);
    oscillator.onended = () => { oscillator.disconnect(); gain.disconnect(); };
  });
}