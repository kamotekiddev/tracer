import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import React from "react";

interface Props {
    columns: number;
    rows: number;
}

function TableSkeleton({ columns, rows }: Props) {
    return (
        <Table className="pointer-events-none">
            <TableHeader>
                <TableRow className="border-none">
                    {[...Array(columns).keys()].map((col) => (
                        <TableHead key={col} className="p-2">
                            <div className="size-full overflow-hidden rounded-full bg-neutral-100">
                                <div className="inset-y-0 z-10 size-full animate-[shimmer_3s_infinite] bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />
                            </div>
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {[...Array(rows).keys()].map((row) => (
                    <TableRow key={row} className="border-none">
                        {[...Array(columns).keys()].map((col) => (
                            <TableHead key={col} className="p-2">
                                <div className="size-full overflow-hidden rounded-full bg-neutral-100">
                                    <div className="inset-y-0 z-10 size-full animate-[shimmer_3s_infinite] bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />
                                </div>
                            </TableHead>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default TableSkeleton;
