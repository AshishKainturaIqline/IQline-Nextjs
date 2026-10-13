"use client"

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpIcon } from "lucide-react";
function Top() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;
      setShow(scrollTop + windowHeight >= fullHeight - 40);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return <AnimatePresence>
      {show && <motion.button
    key="top-button"
    type="button"
    initial={{ opacity: 0, y: 32 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 32 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    aria-label="Scroll to top"
    className="fixed right-6 bottom-6 z-50 flex size-12 cursor-pointer items-center justify-center rounded-full bg-primary text-white shadow-lg hover:bg-primary/90"
  >
          <ArrowUpIcon className="size-6" />
        </motion.button>}
    </AnimatePresence>;
}
var stdin_default = Top;
export {
  Top,
  stdin_default as default
};
