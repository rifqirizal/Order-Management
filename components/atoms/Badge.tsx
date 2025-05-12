import type React from "react"

interface BadgeProps {
  children: React.ReactNode
  variant?: "success" | "error" | "warning" | "info"
  className?: string
}

const Badge: React.FC<BadgeProps> = ({ children, variant = "info", className = "" }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "success":
        return "bg-green-100 text-green-800"
      case "error":
        return "bg-red-100 text-red-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "info":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  return (
    <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${getVariantStyles()} ${className}`}>
      {children}
    </span>
  )
}

export default Badge
