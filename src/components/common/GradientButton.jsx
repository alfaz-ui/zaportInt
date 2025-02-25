import React, { useEffect, useRef } from "react";
import { Button } from "@mui/material";
import "../../App.css"; // Your .button-c base styles

function GradientButton({
  children,
  buttonColor, // text color
  fontFamily,
  fontSize,
  padding,
  color,
  borderRadius,
  onClick,
  variant,
  customBoxShadow, // optionally override boxShadow
  blur = false, // boolean for backdrop filter
  gradientStart, // dynamic gradient start color
  gradientEnd, // dynamic gradient end color
  ...props
}) {
  const buttonRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      // Update CSS custom properties for shine position
      button.style.setProperty("--pointer-x", `${x}px`);
      button.style.setProperty("--pointer-y", `${y}px`);
    };

    button.addEventListener("mousemove", handleMouseMove);
    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Build the gradient using the passed props (with defaults)
  const defaultGradientStart =
    gradientStart || "var(--base-color-gradients--button-1)";
  const defaultGradientEnd =
    gradientEnd || "var(--base-color-gradients--button-2)";

  return (
    <Button
      ref={buttonRef}
      className="button-c"
      onClick={onClick}
      variant={variant}
      sx={{
        backgroundImage: `linear-gradient(150deg, ${defaultGradientStart} 24%, ${defaultGradientEnd} 96%)`,
        boxShadow:
          customBoxShadow || "inset 0 0 0 1px var(--base-color-white--20)",
        color: { color },
        textTransform: "none",
        backgroundColor: { buttonColor },
        fontFamily: fontFamily || "inherit",
        fontSize: fontSize || "1rem",
        padding: padding || ".75rem 1.25rem",
        borderRadius: { borderRadius: "0.75rem" },
        fontWeight: 500,
        lineHeight: 1.6,
        transition: "box-shadow 0.25s",
        ...(blur && { backdropFilter: "blur(20px)" }),
        "&:hover": {
          boxShadow: "inset 0 0 0 2px #ffffff, 0 0 10px #ffffff",
        },
      }}
      {...props}
    >
      {children}
    </Button>
  );
}

export default GradientButton;
