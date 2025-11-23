import NoContent from "@/components/shared/NoContent/NoContent";
import Product from "../shared/ProductCard/Product";

export default async function Products({ products }) {
  return !products?.length ? (
    <NoContent
      title="No products found"
      subtitle="Try searching for something else"
    />
  ) : (
    <section className="mx-auto grid grid-cols-2 gap-x-3 gap-y-4 md:grid-cols-3">
      {products.map((product, index) => (
        <Product key={index} product={product} />
      ))}
    </section>
  );
}
