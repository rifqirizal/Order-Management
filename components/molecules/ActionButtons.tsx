"use client"

import type React from "react"
import { IconButton, Tooltip } from "@mui/material"
import { Edit, FileText, Trash2 } from "lucide-react"

interface ActionButtonsProps {
  onEdit?: () => void
  onView?: () => void
  onDelete?: () => void
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onEdit, onView, onDelete }) => {
  return (
    <div className="flex space-x-4">
      {onEdit && (
        <Tooltip title="Edit">
          <IconButton size="small" onClick={onEdit} className="text-[#00B4FF]">
            <Edit className="h-5 w-5" />
          </IconButton>
        </Tooltip>
      )}

      {onView && (
        <Tooltip title="View">
          <IconButton size="small" onClick={onView} className="text-[#00B4FF]">
            <FileText className="h-5 w-5" />
          </IconButton>
        </Tooltip>
      )}

      {onDelete && (
        <Tooltip title="Delete">
          <IconButton size="small" onClick={onDelete} className="text-[#FF0000]">
            <Trash2 className="h-5 w-5" />
          </IconButton>
        </Tooltip>
      )}
    </div>
  )
}

export default ActionButtons
