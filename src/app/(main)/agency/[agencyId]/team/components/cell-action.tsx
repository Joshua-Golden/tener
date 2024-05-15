import { useState } from "react"
import { useRouter } from "next/navigation"
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react"

import { TeamColumn } from './columns'
import { deleteUser, getUser } from '@/lib/queries'
import { UsersWithAgencySubAccountPermissionsSidebarOptions } from "@/lib/types"
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
  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from "@/components/ui/button"
import CustomModal from '@/components/global/custom-modal'
import UserDetails from '@/components/forms/user-details'

interface CellActionsProps {
    data: TeamColumn
}
  
export const CellActions: React.FC<CellActionsProps> = ({ data }) => {
    const { data: modalData, setOpen } = useModal()
    const { toast } = useToast()
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    if (!data) return
    if (!data.Agency) return
  
    return (
      <AlertDialog>
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
              onClick={() => navigator.clipboard.writeText(data?.email)}
            >
              <Copy size={15} /> Copy Email
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex gap-2"
              onClick={() => {
                setOpen(
                  <CustomModal
                    subheading="You can change permissions only when the user has an owned subaccount"
                    title="Edit User Details"
                  >
                    <UserDetails
                      type="agency"
                      id={data?.Agency?.id || null}
                      subAccounts={data?.Agency?.SubAccount}
                    />
                  </CustomModal>,
                  async () => {
                    return { user: await getUser(data?.id) }
                  }
                )
              }}
            >
              <Edit size={15} />
              Edit Details
            </DropdownMenuItem>
            {data.role !== 'AGENCY_OWNER' && (
              <AlertDialogTrigger asChild>
                <DropdownMenuItem
                  className="flex gap-2"
                  onClick={() => {}}
                >
                  <Trash size={15} /> Remove User
                </DropdownMenuItem>
              </AlertDialogTrigger>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-left">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-left">
              This action cannot be undone. This will permanently delete the user
              and related data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex items-center">
            <AlertDialogCancel className="mb-2">Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={loading}
              className="bg-destructive hover:bg-destructive"
              onClick={async () => {
                setLoading(true)
                await deleteUser(data.id)
                toast({
                  title: 'Deleted User',
                  description:
                    'The user has been deleted from this agency they no longer have access to the agency',
                })
                setLoading(false)
                router.refresh()
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
}