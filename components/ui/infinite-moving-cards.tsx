"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface InfiniteMovingCardsProps {
  items: React.ReactNode[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: InfiniteMovingCardsProps) => {
  const duration =
    speed === "fast"
      ? "20s"
      : speed === "normal"
        ? "40s"
        : "80s";

  return (
    <div
      className={cn(
        "scroller relative z-20 w-full max-w-7xl overflow-hidden",
        "[mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]",
        className
      )}
      style={
        {
          "--animation-duration": duration,
          "--animation-direction":
            direction === "left" ? "forwards" : "reverse",
        } as React.CSSProperties
      }
    >
      <ul
        className={cn(
          "flex w-max min-w-full flex-nowrap gap-4 py-4",
          items.length > 0 && "animate-scroll",
          pauseOnHover &&
            "hover:[animation-play-state:paused]"
        )}
      >
        {[...items, ...items].map((item, index) => (
          <li
            key={index}
            className="flex h-auto min-h-52 w-[calc(100vw-2rem)] shrink-0 sm:w-[32rem]"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};