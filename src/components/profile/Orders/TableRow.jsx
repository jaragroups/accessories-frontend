import { TableCell, TableRow } from "@/components/ui/table";

export default function Row({ order }) {
  const {
    shipping_first_name,
    shipping_last_name,
    status,
    payment_method,
    payment_status,
    total_amount,
    order_items,
  } = order || {};

  console.log("🚀 ~ Row ~ order_items:", order_items);

  let children = null;

  if (order_items && order_items.length > 0) {
    children = order_items.map((item) => {
      const { product_name, product_slug, price, quantity, subtotal } =
        item || {};

      return (
        <TableRow key={product_slug}>
          <TableCell className="max-w-[130px] truncate font-medium">
            {/* <Link href={`/products/${product_slug}`}> */}
            {product_name}
            {/* </Link> */}
          </TableCell>
          <TableCell className="text-end capitalize">
            {parseFloat(price).toFixed(2)}
          </TableCell>
          <TableCell className="text-end capitalize">{quantity}</TableCell>
          <TableCell className="text-end">
            {(parseFloat(subtotal) * parseInt(quantity)).toFixed(2)}
          </TableCell>
        </TableRow>
      );
    });
  }

  return (
    <>
      <TableRow className="bg-gray-100">
        <TableCell className="font-medium">
          {shipping_first_name + " " + shipping_last_name}
        </TableCell>
        <TableCell className="capitalize">{status}</TableCell>
        <TableCell className="capitalize">{payment_method}</TableCell>
        <TableCell className="capitalize">{payment_status}</TableCell>
        <TableCell>{parseFloat(total_amount).toFixed(2)}</TableCell>
      </TableRow>

      {!!children && children}
    </>
  );
}
