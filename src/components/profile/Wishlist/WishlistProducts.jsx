import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";

export default async function WishlistProducts() {
  const res = await fetch("https://dummyjson.com/products");

  if (!res.ok) {
    throw new Error("An error occurred while fetching wishlist products.");
  }

  const { products } = await res.json();

  return (
    <section className="space-y-4 divide-y border-gray-500 *:pb-4 *:last-of-type:pb-0">
      {products.map((product) => (
        <div key={product.id} className="flex items-center justify-between">
          <div className="flex items-center gap-x-4">
            <Image
              src={product.images[0]}
              alt={product.title}
              width={100}
              height={100}
              className="size-[6.25rem] bg-white"
            />
            <div>
              <h5 className="text-xl">{product.title}</h5>
              <p className="line-clamp-2 text-gray-500">
                {product.description}
              </p>
              <p className="text-gray-500">
                $ <span className="">{product.price.toFixed(2)}</span>
              </p>
            </div>
          </div>
          <Button variant={"ghost"} className={"cursor-pointer"}>
            <ShoppingCart />
          </Button>
        </div>
      ))}
    </section>
  );
}
