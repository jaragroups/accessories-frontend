import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function Header() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Name</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Payment Method</TableHead>
        <TableHead>Payment Status</TableHead>
        <TableHead>Total Amount</TableHead>
      </TableRow>
    </TableHeader>
  );
}
