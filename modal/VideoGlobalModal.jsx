"use client"

import { useEffect, useRef } from "react";
const VideoGlobalModal = ({
  isOpen,
  onClose,
  videoUrl,
  title
}) => {
  const modalRef = useRef(null);
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);
  useEffect(() => {
    if (!isOpen) return;
    const prevActive = document.activeElement;
    modalRef.current?.focus();
    return () => {
      prevActive?.focus();
    };
  }, [isOpen]);
  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);
  if (!isOpen) return null;
  const isEmbed = /youtube\.com|youtu\.be|vimeo\.com/.test(videoUrl);
  return <div
    className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/80 backdrop-blur-sm transition-all"
    tabIndex={-1}
    ref={modalRef}
    aria-modal="true"
    role="dialog"
    onClick={onClose}
  >
      <div
    className="relative w-full max-w-3xl mx-3 sm:mx-6 rounded-2xl bg-background shadow-xl border border-border flex flex-col"
    onClick={(e) => e.stopPropagation()}
  >
        {
    /* Close Button */
  }
        <button
    aria-label="Close"
    className="absolute top-3 right-3 z-10 rounded-full bg-card p-2 text-2xl text-muted-foreground hover:bg-muted/50 transition"
    onClick={onClose}
    style={{ lineHeight: 1 }}
  >
          &times;
        </button>

        {title && <div className="px-6 pt-6 pb-2">
            <h2 className="text-lg font-semibold text-foreground">{title}</h2>
          </div>}

        <div className="w-full aspect-video bg-black rounded-b-2xl overflow-hidden flex justify-center items-center">
          {isEmbed ? <iframe
    src={videoUrl}
    title="Video"
    allow="autoplay; fullscreen; picture-in-picture"
    allowFullScreen
    className="w-full h-full"
    frameBorder={0}
  /> : <video
    src={videoUrl}
    controls
    autoPlay
    className="w-full h-full"
    style={{ background: "#000" }}
  />}
        </div>
      </div>
    </div>;
};
export {
  VideoGlobalModal
};
