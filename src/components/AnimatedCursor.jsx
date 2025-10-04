"use client";
import { useEffect, useState } from "react";

const AnimatedCursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    const down = () => setClicked(true);
    const up = () => setClicked(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    const hoverables = document.querySelectorAll("a, button, .hoverable");
    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", () => setHovering(true));
      el.addEventListener("mouseleave", () => setHovering(false));
    });

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 z-50"
      style={{
        transform: `translate(${pos.x - 25}px, ${pos.y - 25}px) scale(${clicked ? 0.9 : 1})`,
        transition: "transform 0.05s linear", // instant reflex
      }}
    >
      {/* Outer camera lens */}
      <div
        className={`w-[50px] h-[50px] rounded-full border-4 border-primary/80 flex items-center justify-center relative`}
        style={{
          boxShadow: hovering
            ? "0 0 25px rgba(0,255,200,0.6)"
            : "0 0 15px rgba(255,255,255,0.2)",
          background: "radial-gradient(circle, rgba(40,40,40,0.5) 30%, transparent 70%)",
        }}
      >
        {/* Crosshair lines */}
        <div className="absolute w-[60%] h-[2px] bg-primary/70" />
        <div className="absolute h-[60%] w-[2px] bg-primary/70" />

        {/* Inner reflex */}
        <div
          className={`w-3 h-3 rounded-full ${
            hovering ? "bg-accent" : "bg-white"
          }`}
          style={{
            boxShadow: "0 0 8px rgba(255,255,255,0.6)",
          }}
        />
      </div>
    </div>
  );
};

export default AnimatedCursor;
