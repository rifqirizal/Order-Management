"use client"

import type React from "react"
import { TextField, InputAdornment, IconButton } from "@mui/material"
import { Search } from "lucide-react"

interface SearchFieldProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSearch: () => void
  placeholder?: string
  label?: string
}

const SearchField: React.FC<SearchFieldProps> = ({ value, onChange, onSearch, placeholder = "Search", label }) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSearch()
    }
  }

  return (
    <div>
      {label && <label className="block mb-2">{label}</label>}
      <TextField
        value={value}
        onChange={onChange}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        size="small"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={onSearch} edge="end">
                <Search className="h-5 w-5" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  )
}

export default SearchField
