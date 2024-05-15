import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react"

import { BillingColumn } from './columns'
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
    data: BillingColumn
}
  
export const CellActions: React.FC<CellActionsProps> = ({ data }) => {
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
          onClick={() => navigator.clipboard.writeText(data?.invoiceId)}
        >
          <Copy size={15} /> Copy Email
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}