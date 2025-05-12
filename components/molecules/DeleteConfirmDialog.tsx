"use client"

import type React from "react"
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import Button from "../atoms/Button"

interface DeleteConfirmDialogProps {
  open: boolean
  title?: string
  message?: string
  onConfirm: () => void
  onCancel: () => void
  isDeleting?: boolean
}

const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({
  open,
  title = "Confirm Delete",
  message = "Are you sure you want to delete this item? This action cannot be undone.",
  onConfirm,
  onCancel,
  isDeleting = false,
}) => {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outline" onClick={onCancel} className="border-[#052A49] text-[#052A49] font-semibold">
          Cancel
        </Button>
        <Button variant="primary" onClick={onConfirm} disabled={isDeleting} className="bg-[#FF0000] font-semibold">
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteConfirmDialog
