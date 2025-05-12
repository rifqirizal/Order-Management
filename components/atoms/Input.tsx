import React from "react"
import { TextField } from "@mui/material"

interface InputProps {
  label?: string
  name?: string
  value?: string | number
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  error?: boolean
  helperText?: string
  placeholder?: string
  type?: string
  disabled?: boolean
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  value,
  onChange,
  required = false,
  error = false,
  helperText,
  placeholder,
  type = "text",
  disabled = false,
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <TextField
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        fullWidth
        error={error}
        helperText={helperText}
        variant="outlined"
        size="small"
        type={type}
        disabled={disabled}
      />
    </div>
  )
}

export default Input
