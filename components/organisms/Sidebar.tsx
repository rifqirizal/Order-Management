import type React from "react"
import Link from "next/link"
import { FileText, Mail } from "lucide-react"
import { Box, Typography } from "@mui/material"

const Sidebar: React.FC = () => {
  return (
    <Box
      sx={{
        width: "250px",
        bgcolor: "#002B4E",
        color: "white",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box component="nav" sx={{ flex: 1, mt: 3 }}>
        <Link href="/" className="flex items-center p-3 bg-[#084577] transition-colors border-l-4">
          <FileText className="mr-3 h-5 w-5" />
          <span className="text-[16px]">Order Management</span>
        </Link>
      </Box>
      <Box sx={{ p: 3, borderTop: "1px solid #fff" }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Mail className="mr-2 h-5 w-5" />
          <Typography className="text-sm text-[#E0E0E0]">Support</Typography>
        </Box>
        <Typography variant="body2" sx={{ color: "gray.300" }}>
          <a href="mailto:cs@bosnet.com">cs@bosnet.com</a>
        </Typography>
      </Box>
    </Box>
  )
}

export default Sidebar
