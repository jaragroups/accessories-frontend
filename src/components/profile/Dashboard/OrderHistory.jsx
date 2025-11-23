"use client";

import TableHeader from "@/components/profile/Orders/TableHeader";
import Row from "@/components/profile/Orders/TableRow";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import useAuth from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function OrderHistory() {
  const {
    user: { user },
  } = useAuth();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_ORIGIN}/v1/user/orders?user_email=${user?.email}`,
      );
      if (!res.ok) {
        throw new Error("Failed to fetch orders");
      }
      const { orders } = await res.json();
      setOrders(orders);
    };

    fetchOrders();
  }, [user]);

  let content;

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
        className={cn(
          "text-center",
          orders.length === 0 ? "mt-[35rem]" : "mt-40",
        )}
      >
        A list of your recent orders.
      </TableCaption>

      <TableHeader />

      <TableBody>{content}</TableBody>
    </Table>
  );
}
