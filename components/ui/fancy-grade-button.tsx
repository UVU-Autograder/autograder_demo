"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { forwardRef } from "react";

interface FancyGradeButtonProps extends Omit<ButtonProps, "children"> {
  children?: React.ReactNode;
}

export const FancyGradeButton = forwardRef<HTMLButtonElement, FancyGradeButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className="relative group"
      >
        {/* Animated gradient border */}
        <div className="absolute -inset-0.5 bg-linear-to-r from-purple-600 via-blue-600 to-cyan-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300 animate-pulse" />
        
        {/* Button */}
        <Button
          ref={ref}
          className={`relative w-32 gap-2 bg-linear-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-700 hover:via-blue-700 hover:to-cyan-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}
          {...props}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 w-full h-full">
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
          </div>
          
          {/* Content */}
          <span className="relative flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            {children || "Grade"}
          </span>
        </Button>
        
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-lg bg-linear-to-r from-purple-600/50 via-blue-600/50 to-cyan-600/50 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
      </motion.div>
    );
  }
);

FancyGradeButton.displayName = "FancyGradeButton";
