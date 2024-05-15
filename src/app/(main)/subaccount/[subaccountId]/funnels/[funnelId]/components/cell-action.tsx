import { useState } from "react"
import { useRouter } from "next/navigation"
import { Copy, MoreHorizontal,  } from "lucide-react"

import { FunnelPageColumn } from './columns'
import { useModal } from "@/providers/modal-provider"
import { useToast } from "@/components/ui/use-toast"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from "@/components/ui/button"

interface CellActionsProps {
  data: FunnelPageColumn
}
  
export const CellActions: React.FC<CellActionsProps> = ({ data }) => {
  const { data: modalData, setOpen } = useModal()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  if (!data) return

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-8 p-0"
        >
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          className="flex gap-2"
          onClick={() => navigator.clipboard.writeText(data?.id)}
        >
          <Copy size={15} /> Copy ID
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}