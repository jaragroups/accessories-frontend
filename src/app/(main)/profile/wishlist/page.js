import WishlistProducts from "@/components/profile/Wishlist/WishlistProducts";

export default function page() {
  return (
    <div>
      <h1 className="text-3xl">Manage My Wishlist</h1>

      <section className="mt-4 rounded bg-gray-100/60 p-4">
        <WishlistProducts />
      </section>
    </div>
  );
}
