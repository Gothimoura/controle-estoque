import React, { useContext } from "react";
import { Toaster as Sonner, ToasterProps } from "sonner";
import { ThemeContext } from "../../App";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
