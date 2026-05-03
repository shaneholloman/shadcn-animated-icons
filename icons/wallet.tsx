"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface WalletIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface WalletIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const WALLET_VARIANTS: Variants = {
  normal: {
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 18,
    },
  },
  animate: {
    rotate: [0, -2, 2, -1, 0],
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
};

const COIN_VARIANTS: Variants = {
  normal: {
    scale: 0,
    opacity: 0,
    transition: {
      duration: 0.15,
    },
  },
  animate: {
    scale: [0, 1.1, 1, 1.1, 1],
    opacity: [0, 1, 1, 1, 1],
    transition: {
      duration: 0.7,
      delay: 0.1,
      ease: "easeOut",
      times: [0, 0.3, 0.55, 0.8, 1],
    },
  },
};

const WalletIcon = forwardRef<WalletIconHandle, WalletIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: () => controls.start("animate"),
        stopAnimation: () => controls.start("normal"),
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseEnter?.(e);
        } else {
          controls.start("animate");
        }
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseLeave?.(e);
        } else {
          controls.start("normal");
        }
      },
      [controls, onMouseLeave]
    );

    return (
      <div
        className={cn(className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <motion.svg
          animate={controls}
          fill="none"
          height={size}
          initial="normal"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          style={{ transformOrigin: "12px 12px" }}
          variants={WALLET_VARIANTS}
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
          <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
          <motion.circle
            animate={controls}
            cx="18"
            cy="13"
            initial="normal"
            r="0.9"
            style={{ transformOrigin: "18px 13px" }}
            variants={COIN_VARIANTS}
          />
        </motion.svg>
      </div>
    );
  }
);

WalletIcon.displayName = "WalletIcon";

export { WalletIcon };
