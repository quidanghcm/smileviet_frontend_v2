"use client";
import {IconDotsVertical} from "@tabler/icons-react"
import ColumnFilter from "@/components/ui/ColumnFilter" 
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export const getColumns = (filters, handleFilterChange) =>[
    {
        accessorKey: "name",
        header: () => <ColumnFilter label="Name" 
        placeholder="Filter name.."
        value={filters.name || ""}
        onChange={(val)=>handleFilterChange("name",val)}
        />,
        cell: (info) => info.getValue(),
    },
     {
        accessorKey: "description",
        header: () => <ColumnFilter label="Description" 
        placeholder="Filter description.."
        value={filters.description || ""}
        onChange={(val)=>handleFilterChange("description",val)}
        />,
        cell: (info) => info.getValue(),
    },
    {
        id: "actions",
        cell: () => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
                        size="icon"
                    >
                        <IconDotsVertical />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-32">
                    <DropdownMenuItem>Edit</DropdownMenuItem>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    },

];
