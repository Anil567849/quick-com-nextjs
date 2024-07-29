import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Order } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import StatusBadge from './status-badge';
import StatusChanger from './status-changer';

export const columns: ColumnDef<Order>[] = [
    {
        accessorKey: 'product',
        header: 'Product Name',
    },
    {
        accessorKey: 'qty',
        header: 'Qty',
    },
    {
        accessorKey: 'user',
        header: 'Customer Name',
    },
    {
        accessorKey: 'type',
        header: 'Order Type',
    },
    {
        accessorKey: 'address',
        header: 'Address',
    },
    {
        id: 'status',
        header: 'Status',
        cell: ({ row }) => { // if we want to manipulate this cell
            return <StatusBadge status={row.original.status} />;
        },
    },
    {
        id: 'status',
        header: 'Action',
        cell: ({ row }) => { // if we want to manipulate this cell
            return <StatusChanger orderId={row.original.id} currentStatus={row.original.status} />;
        },
    },
];