"use client"

import type React from "react"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"

interface MuiThemeProviderProps {
  children: React.ReactNode
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#17a2b8",
    },
    secondary: {
      main: "#002B4E",
    },
    error: {
      main: "#dc3545",
    },
    background: {
      default: "#f0f0f0",
    },
  },
})

export default function MuiThemeProvider({ children }: MuiThemeProviderProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
