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
                            <div className="bg-neutral-100 size-full rounded-full overflow-hidden">
                                <div className="bg-gradient-to-r size-full z-10 inset-y-0 from-transparent via-neutral-200 to-transparent animate-[shimmer_3s_infinite]" />
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
                                <div className="bg-neutral-100 size-full rounded-full overflow-hidden">
                                    <div className="bg-gradient-to-r size-full z-10 inset-y-0 from-transparent via-neutral-200 to-transparent animate-[shimmer_3s_infinite]" />
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
