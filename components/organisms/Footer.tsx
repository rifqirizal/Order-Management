import type React from "react"

interface FooterProps {
  companyName: string
  year?: number
}

const Footer: React.FC<FooterProps> = ({ companyName, year = 2021 }) => {
  return (
    <footer className="p-4 text-center text-sm text-gray-500">
      ©{year} Managed by {companyName}
    </footer>
  )
}

export default Footer
