"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface BriefcaseBusinessIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface BriefcaseBusinessIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const HANDLE_VARIANTS: Variants = {
  normal: {
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 18,
    },
  },
  animate: {
    y: [-1.5, 0],
    transition: {
      type: "spring",
      stiffness: 320,
      damping: 10,
      mass: 0.6,
    },
  },
};

const BODY_VARIANTS: Variants = {
  normal: {
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 18,
    },
  },
  animate: {
    y: [0, 0.6, 0],
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
};

const LOCK_VARIANTS: Variants = {
  normal: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  animate: {
    scale: [1, 1.8, 1],
    opacity: [1, 0.6, 1],
    transition: {
      duration: 0.6,
      delay: 0.1,
      ease: "easeInOut",
    },
  },
};

const BriefcaseBusinessIcon = forwardRef<
  BriefcaseBusinessIconHandle,
  BriefcaseBusinessIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
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
      <svg
        fill="none"
        height={size}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          animate={controls}
          d="M12 12h.01"
          initial="normal"
          style={{ transformOrigin: "12px 12px" }}
          variants={LOCK_VARIANTS}
        />
        <motion.path
          animate={controls}
          d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"
          initial="normal"
          variants={HANDLE_VARIANTS}
        />
        <motion.g animate={controls} initial="normal" variants={BODY_VARIANTS}>
          <path d="M22 13a18.15 18.15 0 0 1-20 0" />
          <rect height="14" rx="2" width="20" x="2" y="6" />
        </motion.g>
      </svg>
    </div>
  );
});

BriefcaseBusinessIcon.displayName = "BriefcaseBusinessIcon";

export { BriefcaseBusinessIcon };
