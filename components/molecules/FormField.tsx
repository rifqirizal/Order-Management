"use client"

import type React from "react"
import Input from "../atoms/Input"
import Select from "../atoms/Select"

interface FormFieldProps {
  type: "text" | "number" | "select" | "date"
  label: string
  name?: string
  value: any
  onChange?: (e: any) => void
  required?: boolean
  error?: boolean
  helperText?: string
  placeholder?: string
  options?: { value: string | number; label: string }[]
  disabled?: boolean
  className?: string
}

const FormField: React.FC<FormFieldProps> = ({
  type,
  label,
  name,
  value,
  onChange,
  required = false,
  error = false,
  helperText,
  placeholder,
  options = [],
  disabled = false,
  className = "",
}) => {
  if (type === "select" && options) {
    return (
      <div className={className}>
        <Select
          label={label}
          name={name}
          value={value || ""}
          onChange={onChange}
          options={options}
          required={required}
          error={error}
          helperText={helperText}
          placeholder={placeholder || `Select ${label.toLowerCase()}`}
          disabled={disabled}
        />
      </div>
    )
  }

  return (
    <div className={className}>
      <Input
        label={label}
        name={name}
        value={value || ""}
        onChange={onChange}
        required={required}
        error={error}
        helperText={helperText}
        placeholder={placeholder || `Input ${label.toLowerCase()}`}
        type={type}
        disabled={disabled}
      />
    </div>
  )
}

export default FormField
