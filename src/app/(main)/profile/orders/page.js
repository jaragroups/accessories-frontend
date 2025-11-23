import TableHeader from "@/components/profile/OrderHistory/TableHeader";
import Row from "@/components/profile/OrderHistory/TableRow";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export default async function Page({ searchParams }) {
  const user = {
    emailAddresses: [
      {
        emailAddress: "lahodyj@mailinator.com",
      },
    ],
  };

  let content;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_ORIGIN}/v1/user/orders?user_email=${user.emailAddresses[0].emailAddress}`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch orders");
  }

  const { orders } = await res.json();

  content = (
    <>
      {orders.length > 0 ? (
        orders.map((order) => <Row key={order.id} order={order} />)
      ) : (
        <TableRow className="hover:bg-transparent">
          <TableCell
            colSpan={5}
            className="pt-28 text-center text-lg text-gray-800"
          >
            No orders found.
          </TableCell>
        </TableRow>
      )}
    </>
  );

  return (
    <Table className="px-10">
      <TableCaption
        className={cn("text-center", orders.length === 0 && "mt-[35rem]")}
      >
        A list of your recent orders.
      </TableCaption>
      <TableHeader />

      <TableBody>{content}</TableBody>
    </Table>
  );
}
