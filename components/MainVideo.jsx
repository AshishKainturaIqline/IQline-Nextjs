"use client"

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  CheckIcon,
  ExternalLinkIcon,
  LinkIcon,
  MessageCircleIcon,
  PauseIcon,
  PlayIcon,
  Share2Icon,
  Volume2Icon,
  VolumeXIcon
} from "lucide-react";
import thumbnailSrc from "@/assets/images/mainIQVideo.webp";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { fadeUp } from "@/components/home-section-primitives";
import { assetSrc, cn } from "@/lib/utils";
const HOME_VIDEO_SRC = "/video/MaineHome.mp4"
const SHARE_TITLE = "IQ-Line \u2014 India's AI-first healthcare automation";
const SHARE_TEXT = "Watch how IQ-Line elevates clinical workflows with LIMS, HIMS, and applied AI.";
function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60);
  return `${minutes}:${remainder.toString().padStart(2, "0")}`;
}
function getShareUrl() {
  const url = new URL(window.location.origin);
  url.searchParams.set("section", "watch");
  return url.toString();
}
function MainVideo() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const hideTimer = useRef(0);
  const playAfterLoad = useRef(false);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const nearView = useInView(sectionRef, { once: true, margin: "480px 0px" });
  const [videoSrc, setVideoSrc] = useState();
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [copied, setCopied] = useState(false);
  const [showChrome, setShowChrome] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const revealChrome = useCallback(() => {
    setShowChrome(true);
    window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => {
      if (videoRef.current && !videoRef.current.paused) {
        setShowChrome(false);
      }
    }, 2200);
  }, []);
  useEffect(() => {
    return () => window.clearTimeout(hideTimer.current);
  }, []);
  useEffect(() => {
    if (!nearView || videoSrc) return;
    setVideoSrc(HOME_VIDEO_SRC);
  }, [nearView, videoSrc]);
  useEffect(() => {
    const video = videoRef.current;
    if (!videoSrc || !video || !playAfterLoad.current) return;
    playAfterLoad.current = false;
    void video.play().catch(() => setPlaying(false));
  }, [videoSrc]);
  const loadVideo = useCallback(async () => {
    if (videoSrc) return videoSrc;
    setVideoSrc(HOME_VIDEO_SRC);
    return HOME_VIDEO_SRC;
  }, [videoSrc]);
  const togglePlay = useCallback(async () => {
    if (loadError) return;
    const video = videoRef.current;
    if (!video) return;
    if (!videoSrc) {
      playAfterLoad.current = true;
      try {
        await loadVideo();
      } catch {
        playAfterLoad.current = false;
        setLoadError(true);
      }
      return;
    }
    if (video.paused) {
      try {
        await video.play();
      } catch {
        setPlaying(false);
      }
      return;
    }
    video.pause();
  }, [loadError, videoSrc, loadVideo]);
  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }
  function seek(value) {
    const video = videoRef.current;
    if (!video || !duration) return;
    video.currentTime = value / 100 * duration;
    setProgress(value);
  }
  async function copyLink() {
    await navigator.clipboard.writeText(getShareUrl());
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }
  async function shareNative() {
    const url = getShareUrl();
    if (navigator.share) {
      try {
        await navigator.share({ title: SHARE_TITLE, text: SHARE_TEXT, url });
        return;
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
      }
    }
    await copyLink();
  }
  function openShareWindow(href) {
    window.open(href, "_blank", "noopener,noreferrer,width=640,height=640");
  }
  return <motion.section
    ref={sectionRef}
    id="watch"
    initial="hidden"
    animate={inView ? "visible" : "hidden"}
    className="scroll-mt-16 border-b border-border bg-background pt-20 pb-20 sm:pt-28 sm:pb-28"
  >
      <motion.div
    variants={fadeUp}
    className="mx-auto mb-10 max-w-2xl px-4 text-center sm:px-6 lg:px-8"
  >
        <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          See IQ-Line in action
        </h2>
        <p className="mt-3 text-pretty text-muted-foreground">
          See how IQ-Line supports everyday work across hospitals, laboratories
          and medical colleges.
        </p>
      </motion.div>

      <motion.div
    variants={fadeUp}
    className="relative w-full"
    onMouseMove={revealChrome}
    onMouseLeave={() => {
      if (playing) setShowChrome(false);
    }}
  >
        <div
    className="relative mx-auto aspect-video w-full max-w-[calc((100svh-5rem)*16/9)] overflow-hidden"
    onMouseMove={revealChrome}
  >
            {!playing && !loadError && <img
    src={assetSrc(thumbnailSrc)}
    alt="IQ-Line video preview"
    loading="lazy"
    decoding="async"
    className="absolute inset-0 z-[1] h-full w-full object-contain"
  />}

            <video
    ref={videoRef}
    src={videoSrc}
    playsInline
    preload="none"
    className="relative z-0 h-full w-full object-contain"
    onPlay={() => {
      setPlaying(true);
      revealChrome();
    }}
    onPause={() => {
      setPlaying(false);
      setShowChrome(true);
    }}
    onTimeUpdate={(event) => {
      const el = event.currentTarget;
      if (el.duration) {
        setProgress(el.currentTime / el.duration * 100);
      }
    }}
    onLoadedMetadata={(event) => {
      setDuration(event.currentTarget.duration);
    }}
    onEnded={() => {
      setPlaying(false);
      setShowChrome(true);
      setProgress(100);
    }}
    onError={() => {
      if (videoSrc) setLoadError(true);
    }}
    onClick={() => void togglePlay()}
  />

            {!loadError && !playing && <button
    type="button"
    onClick={(event) => {
      event.stopPropagation();
      void togglePlay();
    }}
    aria-label="Play video"
    className="absolute inset-0 z-10 flex items-center justify-center bg-black/20 transition-colors hover:bg-black/30"
  >
                <span className="flex size-20 items-center justify-center rounded-full bg-teal-500 text-slate-900 shadow-lg shadow-teal-500/30 transition-transform hover:scale-105">
                  <PlayIcon className="size-8 fill-current" />
                </span>
              </button>}

            {loadError && <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-2 bg-[oklch(0.09_0.04_240)] px-6 text-center">
                <p className="font-medium text-white">Video unavailable</p>
                <p className="max-w-md text-sm text-slate-400">
                  Could not load the video.
                </p>
              </div>}

            {!loadError && <div
    className={cn(
      "absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-4 pt-16 pb-4 transition-opacity duration-300 sm:px-6 lg:px-8",
      showChrome || !playing ? "opacity-100" : "pointer-events-none opacity-0"
    )}
  >
                <input
    type="range"
    min={0}
    max={100}
    step={0.1}
    value={progress}
    aria-label="Seek"
    className="mb-3 h-1 w-full cursor-pointer appearance-none rounded-full bg-white/20 accent-teal-400 [&::-webkit-slider-thumb]:size-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-teal-400"
    onChange={(event) => seek(Number(event.target.value))}
  />

                <div className="flex items-center gap-2">
                  <Button
    type="button"
    size="icon-sm"
    variant="ghost"
    className="text-white hover:bg-white/15 hover:text-white"
    aria-label={playing ? "Pause" : "Play"}
    onClick={(event) => {
      event.stopPropagation();
      void togglePlay();
    }}
  >
                    {playing ? <PauseIcon className="size-4" /> : <PlayIcon className="size-4 fill-current" />}
                  </Button>

                  <Button
    type="button"
    size="icon-sm"
    variant="ghost"
    className="text-white hover:bg-white/15 hover:text-white"
    aria-label={muted ? "Unmute" : "Mute"}
    onClick={(event) => {
      event.stopPropagation();
      toggleMute();
    }}
  >
                    {muted ? <VolumeXIcon className="size-4" /> : <Volume2Icon className="size-4" />}
                  </Button>

                  <span className="ml-1 text-xs tabular-nums text-slate-200">
                    {formatTime(duration ? progress / 100 * duration : 0)} /{" "}
                    {formatTime(duration)}
                  </span>

                  <div className="ml-auto">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
    type="button"
    size="sm"
    variant="ghost"
    className="text-white hover:bg-white/15 hover:text-white"
  >
                          <Share2Icon className="size-4" />
                          Share
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem onSelect={() => void shareNative()}>
                          <Share2Icon />
                          Share…
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => void copyLink()}>
                          {copied ? <CheckIcon /> : <LinkIcon />}
                          {copied ? "Copied" : "Copy link"}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
    onSelect={() => openShareWindow(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getShareUrl())}`
    )}
  >
                          <ExternalLinkIcon />
                          LinkedIn
                        </DropdownMenuItem>
                        <DropdownMenuItem
    onSelect={() => openShareWindow(
      `https://wa.me/?text=${encodeURIComponent(`${SHARE_TEXT} ${getShareUrl()}`)}`
    )}
  >
                          <MessageCircleIcon />
                          WhatsApp
                        </DropdownMenuItem>
                        <DropdownMenuItem
    onSelect={() => openShareWindow(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(SHARE_TEXT)}&url=${encodeURIComponent(getShareUrl())}`
    )}
  >
                          <ExternalLinkIcon />
                          X / Twitter
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>}
        </div>
      </motion.div>
    </motion.section>;
}
export {
  MainVideo
};
