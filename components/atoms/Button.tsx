import type React from "react"
import { Button as MuiButton, type ButtonProps as MuiButtonProps} from "@mui/material"

interface CustomButtonProps extends Omit<MuiButtonProps, "variant" | "color"> {
  variant?: "primary" | "secondary" | "outline"
  size?: "small" | "medium" | "large"
}

const Button: React.FC<CustomButtonProps> = ({
  variant = "primary",
  size = "medium",
  children,
  className = "",
  ...props
}) => {
  const getMuiVariant = (): MuiButtonProps["variant"] => {
    switch (variant) {
      case "outline":
        return "outlined"
      default:
        return "contained"
    }
  }

  const getMuiColor = (): MuiButtonProps["color"] => {
    switch (variant) {
      case "secondary":
        return "secondary"
      default:
        return "primary"
    }
  }

  return (
    <MuiButton
      variant={getMuiVariant()}
      color={getMuiColor()}
      size={size}
      className={className}
      {...props}
    >
      {children}
    </MuiButton>
  )
}

export default Button
