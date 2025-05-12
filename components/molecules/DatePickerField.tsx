"use client"

import type React from "react"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { InputAdornment } from "@mui/material"
import { Calendar } from "lucide-react"

interface DatePickerFieldProps {
  value: Date | null
  onChange: (date: Date | null) => void
  label?: string
  placeholder?: string
}

const DatePickerField: React.FC<DatePickerFieldProps> = ({ value, onChange, label, placeholder = "Select date" }) => {
  return (
    <div>
      {label && <label className="block mb-2">{label}</label>}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          value={value}
          onChange={onChange}
          slotProps={{
            textField: {
              placeholder,
              size: "small",
              fullWidth: true,
              InputProps: {
                endAdornment: (
                  <InputAdornment position="end">
                    <Calendar className="h-5 w-5" />
                  </InputAdornment>
                ),
              },
            },
          }}
        />
      </LocalizationProvider>
    </div>
  )
}

export default DatePickerField
