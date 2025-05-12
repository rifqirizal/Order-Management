"use client"

import type React from "react"
import { useState } from "react"
import { Avatar, Typography, Menu, MenuItem, IconButton, Box } from "@mui/material"
import Link from "next/link"

interface HeaderProps {
  username: string
  initials: string
}

const Header: React.FC<HeaderProps> = ({ username, initials }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <header className="bg-white px-5 p-2 flex justify-between items-center border-b shadow-xl">
      <Box>
        <Link href="/" className="flex items-center">
          <span className="text-orange-500 mr-1">•</span>
          <Typography variant="h6" fontWeight="bold">
            MyBrand
          </Typography>
        </Link>
      </Box>
      <div>
        <IconButton
          onClick={handleClick}
          size="small"
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <div className="flex items-center">
            <Avatar
              sx={{
                width: 36,
                height: 36,
                bgcolor: "#1BA8DF",
                fontSize: "0.875rem",
                color: "#fff",
              }}
            >
              {initials}
            </Avatar>
            <Typography variant="body2" className="ml-2 mr-1 hidden sm:block">
              {username}
            </Typography>
            <span className="text-gray-400 hidden sm:block">▼</span>
          </div>
        </IconButton>
        <Menu
          id="account-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>Settings</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </div>
    </header>
  )
}

export default Header
