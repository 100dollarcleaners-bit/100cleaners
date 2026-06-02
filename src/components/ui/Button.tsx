"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { type ButtonHTMLAttributes, type ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-gold text-navy hover:bg-gold-light shadow-lg shadow-gold/20",
  secondary:
    "bg-navy text-white hover:bg-navy-light shadow-lg shadow-navy/20",
  outline:
    "border-2 border-gold text-gold hover:bg-gold hover:text-navy",
  ghost: "text-navy hover:bg-navy/5",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  href?: string;
  children: ReactNode;
  className?: string;
}

export function Button({
  variant = "primary",
  href,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold tracking-wide transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Link href={href} className={classes}>
          {children}
        </Link>
      </motion.div>
    );
  }

  const { type = "button", onClick, ...rest } = props;

  return (
    <motion.div
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      className="inline-block"
    >
      <button
        type={type}
        onClick={onClick}
        className={classes}
        disabled={disabled}
        {...rest}
      >
        {children}
      </button>
    </motion.div>
  );
}
