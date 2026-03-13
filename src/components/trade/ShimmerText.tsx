import { motion } from "motion/react";

interface ShimmerTextProps {
  isShimmering: boolean;
  children: React.ReactNode;
  className?: string;
  textValue?: string;
  placeholderText?: string;
}

export function ShimmerText({ isShimmering, children, className = "", textValue, placeholderText = "Loading..." }: ShimmerTextProps) {
  if (!isShimmering) {
    return <div className={className}>{children}</div>;
  }

  // Use textValue if available, otherwise use placeholder during shimmer
  const displayText = textValue || placeholderText;

  return (
    <div className={`relative ${className}`}>
      {/* Hidden input for layout */}
      <div className="opacity-0">{children}</div>
      
      {/* Shimmer text overlay */}
      <div className="absolute inset-0 flex items-center">
        <motion.div
          className="relative overflow-hidden"
          style={{
            background: "linear-gradient(90deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.4) 100%)",
            backgroundSize: "200% 100%",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            fontSize: "32px",
            fontFamily: "var(--font-family-inter)",
            fontWeight: "400",
            lineHeight: "36px",
            padding: "8px 0",
          }}
          animate={{
            backgroundPosition: ["200% 0%", "-200% 0%"],
          }}
          transition={{
            duration: 2.5,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        >
          {displayText}
        </motion.div>
      </div>
    </div>
  );
}