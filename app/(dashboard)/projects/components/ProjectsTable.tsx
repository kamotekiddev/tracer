import { Star } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function ProjectsTable() {
  return (
    <Table className="border-b-2">
      <TableHeader className="border-b-2">
        <TableRow>
          <TableHead className="w-[100px]">
            <Star className="h-4 w-4" />
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Key</TableHead>
          <TableHead>Owner</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">
            <Star className="h-4 w-4" />
          </TableCell>
          <TableCell>Sample Projects</TableCell>
          <TableCell>SP32</TableCell>
          <TableCell>kamotekid.dev@gmail.com</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">
            <Star className="h-4 w-4" />
          </TableCell>
          <TableCell>Sample Projects</TableCell>
          <TableCell>SP32</TableCell>
          <TableCell>kamotekid.dev@gmail.com</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">
            <Star className="h-4 w-4" />
          </TableCell>
          <TableCell>Sample Projects</TableCell>
          <TableCell>SP32</TableCell>
          <TableCell>kamotekid.dev@gmail.com</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export default ProjectsTable;
