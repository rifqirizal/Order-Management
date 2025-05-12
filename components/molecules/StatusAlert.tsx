"use client"

import type React from "react"
import { Snackbar, Alert as MuiAlert } from "@mui/material"

interface StatusAlertProps {
  message: string | null
  type?: "success" | "error" | "warning" | "info"
  onClose: () => void
}

const StatusAlert: React.FC<StatusAlertProps> = ({ message, type = "success", onClose }) => {
  if (!message) return null

  return (
    <Snackbar
      open={!!message}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <MuiAlert severity={type} onClose={onClose}>
        {message}
      </MuiAlert>
    </Snackbar>
  )
}

export default StatusAlert
