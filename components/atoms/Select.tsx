import type React from "react"
import {
  FormControl,
  Select as MuiSelect,
  MenuItem,
  type SelectProps as MuiSelectProps,
  FormHelperText,
} from "@mui/material"

interface SelectOption {
  value: string | number
  label: string
}

interface SelectProps extends Omit<MuiSelectProps, "error"> {
  label?: string
  options: SelectOption[]
  required?: boolean
  error?: boolean
  helperText?: string
  placeholder?: string
}

const Select: React.FC<SelectProps> = ({
  label,
  options,
  required = false,
  error = false,
  helperText,
  placeholder = "Select an option",
  ...props
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <FormControl fullWidth error={error}>
        <MuiSelect
          displayEmpty
          size="small"
          renderValue={(selected) => {
            if (!selected) {
              return <span className="text-gray-400">{placeholder}</span>
            }
            const option = options.find((opt) => opt.value === selected)
            return option ? option.label : String(selected)
          }}
          {...props}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </MuiSelect>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </div>
  )
}

export default Select
