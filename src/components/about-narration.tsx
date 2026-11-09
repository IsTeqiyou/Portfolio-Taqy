import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pauseWelcome } from "@/lib/portfolio-audio";
import aboutAsset from "@/assets/taqy-about.mp3.asset.json";

export function AboutNarration({ open }: { open: boolean }) {
  const audio = useRef<HTMLAudioElement>(null);
  const started = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const play = useCallback(() => {
    const player = audio.current;
    if (!player) return;
    pauseWelcome();
    void player.play().then(() => { started.current = true; setFailed(false); }).catch(() => setPlaying(false));
  }, []);

  useEffect(() => {
    if (!open) { audio.current?.pause(); return; }
    const section = document.getElementById("about");
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting && !started.current) play();
      else if (!entry?.isIntersecting) audio.current?.pause();
    }, { rootMargin: "-15% 0px -20% 0px", threshold: 0 });
    observer.observe(section);
    return () => observer.disconnect();
  }, [open, play]);

  return (
    <div className="mt-5 flex items-center gap-2">
      <audio ref={audio} src={new URL(aboutAsset.url, "https://caritaqydisini.lovable.app").href} preload="metadata"
        onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} onError={() => { setFailed(true); setPlaying(false); }} />
      <Button variant="outline" size="icon" aria-label={playing ? "Jeda bacaan" : "Putar bacaan"} title={playing ? "Jeda bacaan" : "Putar bacaan"}
        onClick={() => playing ? audio.current?.pause() : play()}>
        {playing ? <Pause /> : <Play />}
      </Button>
      <Button variant="ghost" size="icon" aria-label="Ulangi bacaan" title="Ulangi bacaan" onClick={() => { if (audio.current) audio.current.currentTime = 0; play(); }}>
        <RotateCcw />
      </Button>
      {failed && <span role="alert" className="font-hand text-lg text-destructive">Suaranya belum bisa diputar.</span>}
    </div>
  );
}