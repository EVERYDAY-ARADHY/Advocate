import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, [data-cursor="hover"]';

export function GavelCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const cursorX = useSpring(x, { stiffness: 500, damping: 35, mass: 0.4 });
  const cursorY = useSpring(y, { stiffness: 500, damping: 35, mass: 0.4 });

  const [isHovering, setIsHovering] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(true);
  const lastTargetRef = useRef<Element | null>(null);

  useEffect(() => {
    const isTouchDevice =
      typeof window !== "undefined" &&
      (window.matchMedia("(pointer: coarse)").matches ||
        "ontouchstart" in window);
    setIsTouch(isTouchDevice);
    if (isTouchDevice) return;

    document.documentElement.classList.add("gavel-cursor-active");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = document.elementFromPoint(e.clientX, e.clientY);
      if (target !== lastTargetRef.current) {
        lastTargetRef.current = target;
        if (target && target.closest(INTERACTIVE_SELECTOR)) {
          setIsHovering(true);
        } else {
          setIsHovering(false);
        }
      }
    };

    const down = () => setIsPressed(true);
    const up = () => setIsPressed(false);
    const leave = () => setIsVisible(false);
    const enter = () => setIsVisible(true);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
      document.documentElement.classList.remove("gavel-cursor-active");
    };
  }, [isVisible, x, y]);

  if (isTouch) return null;

  const baseColor = "hsl(40 25% 88%)";
  const goldColor = "hsl(40 70% 58%)";
  const color = isHovering ? goldColor : baseColor;
  const scale = isPressed ? 0.85 : isHovering ? 1.15 : 1;
  const rotate = isPressed ? -25 : isHovering ? -8 : 0;

  return (
    <>
      {/* Soft glow halo behind cursor */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9998] mix-blend-screen"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? (isHovering ? 0.5 : 0.18) : 0,
          transition: "opacity 200ms ease",
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${goldColor}55 0%, transparent 70%)`,
            filter: "blur(6px)",
          }}
        />
      </motion.div>

      {/* The gavel itself */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-30%",
          translateY: "-30%",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 180ms ease",
        }}
      >
        <motion.div
          animate={{ scale, rotate }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
          style={{ transformOrigin: "30% 30%" }}
        >
          <GavelSvg color={color} />
        </motion.div>
      </motion.div>
    </>
  );
}

function GavelSvg({ color }: { color: string }) {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        filter: `drop-shadow(0 2px 4px rgba(0,0,0,0.35)) drop-shadow(0 0 6px ${color}66)`,
        transition: "filter 250ms ease",
      }}
    >
      {/* Handle */}
      <rect
        x="14.5"
        y="13"
        width="2.6"
        height="16"
        rx="1.1"
        transform="rotate(-45 14.5 13)"
        fill={color}
        stroke="rgba(0,0,0,0.35)"
        strokeWidth="0.6"
      />
      {/* Hammer head */}
      <rect
        x="3.2"
        y="6.8"
        width="13.5"
        height="7"
        rx="1.4"
        transform="rotate(-45 3.2 6.8)"
        fill={color}
        stroke="rgba(0,0,0,0.4)"
        strokeWidth="0.6"
      />
      {/* Decorative bands on the hammer head */}
      <line
        x1="6.2"
        y1="3.8"
        x2="11.4"
        y2="9"
        stroke="rgba(0,0,0,0.25)"
        strokeWidth="0.6"
      />
      <line
        x1="9.2"
        y1="0.8"
        x2="14.4"
        y2="6"
        stroke="rgba(0,0,0,0.25)"
        strokeWidth="0.6"
      />
      {/* Pommel highlight */}
      <circle cx="26.5" cy="25.5" r="1.6" fill={color} stroke="rgba(0,0,0,0.4)" strokeWidth="0.5" />
    </svg>
  );
}
