import TableHeader from "@/components/profile/OrderHistory/TableHeader";
import Row from "@/components/profile/OrderHistory/TableRow";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
} from "@/components/ui/table";

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

  if (res.ok) {
    const { orders } = await res.json();

    content = (
      <>
        {orders.length > 0 ? (
          orders.map((order) => <Row key={order.id} order={order} />)
        ) : (
          <TableRow>
            <TableCell colSpan={4} className="text-center">
              No orders found.
            </TableCell>
          </TableRow>
        )}
      </>
    );
  }

  return (
    <Table className="px-10">
      <TableCaption>A list of your recent orders.</TableCaption>
      <TableHeader />

      <TableBody>{content}</TableBody>
    </Table>
  );
}
