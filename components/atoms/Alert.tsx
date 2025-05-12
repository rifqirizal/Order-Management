import type React from "react"
import { Alert as MuiAlert, type AlertProps as MuiAlertProps } from "@mui/material"

interface AlertProps extends MuiAlertProps {
  message: string
}

const Alert: React.FC<AlertProps> = ({ message, ...props }) => {
  return (
    <MuiAlert className="mb-4" {...props}>
      {message}
    </MuiAlert>
  )
}

export default Alert
