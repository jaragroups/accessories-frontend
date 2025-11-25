import Product from "@/components/shared/ProductCard/Product";
import Title from "@/components/shared/Title/Title";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function MoreProducts({ relatedProducts }) {
  return (
    !!relatedProducts?.length && (
      <section className="mx-3 mt-10 md:mx-0">
        <Title>More Series</Title>

        <Carousel className="mt-3" opts={{ loop: false, align: "start" }}>
          <CarouselContent>
            {relatedProducts.map((product) => (
              <CarouselItem key={product.id} className="basis-1/4">
                <Product product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className={"cursor-pointer"} />
          <CarouselNext className={"cursor-pointer"} />
        </Carousel>
      </section>
    )
  );
}
