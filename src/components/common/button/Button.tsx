import { forwardRef } from "react";
import { ButtonHTMLAttributes } from "react";
import { cn } from "@/utils/classname";

const styles = {
  baseStyles:
    "btn font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  variants: {
    default: "btn-primary text-white hover:opacity-90",
    outline: "btn-outline border-1 border-[#DADADA] hover:bg-gray-100",
    success: "btn-success text-white hover:opacity-90",
    "outline-success": "btn-outline border-success text-success hover:bg-success/10",
    error: "btn-error bg-critical text-white font-bold hover:opacity-90",
    "outline-error": "btn-outline border-error text-error hover:bg-error/10",
    ghost: "btn-ghost hover:bg-gray-100",
  },
  sizes: {
    default: "h-10 py-2 px-4",
    sm: "h-8 px-3 text-sm",
    lg: "h-12 px-8",
    icon: "h-10 w-10",
  },
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "success" | "outline-success" | "error" | "outline-error" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = "default",
      size = "default",
      isLoading = false,
      disabled,
      fullWidth,
      onClick,
      type = "button",
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={cn(
          styles.baseStyles,
          styles.variants[variant],
          styles.sizes[size],
          fullWidth && "w-full",
          "md:min-w-28",
          className,
        )}
        onClick={onClick}
        {...props}
      >
        {isLoading ? <span className="loading loading-spinner"></span> : children}
      </button>
    );
  },
);

Button.displayName = "Button";
