import Image from "next/image";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa6";

export default function Product({ product }) {
  const { name, thumbnail_image, thumbnail_image_2, price, slug } =
    product || {};

  return (
    <div className="border-stroke relative h-[23.875rem] rounded-[0.625rem] border bg-white md:w-[17.75rem]">
      <div className="group relative h-fit w-fit overflow-hidden rounded-3xl">
        <Link href={`/shop/product/${slug}`}>
          <Image
            src={thumbnail_image}
            alt={name}
            width={282}
            height={253}
            className="border-stroke block h-[15.813rem] w-[17.625rem] rounded-t-[0.625rem] border-b group-hover:hidden"
          />
        </Link>
        <Link href={`/shop/product/${slug}`}>
          <Image
            src={thumbnail_image_2}
            alt={name}
            width={282}
            height={253}
            className="border-stroke hidden h-[15.813rem] w-[17.625rem] rounded-t-[0.625rem] border-b group-hover:block"
          />
        </Link>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between">
          <Link
            href={`/shop/product/${slug}`}
            className="max-w-[13rem] truncate capitalize"
          >
            {name}
          </Link>

          <button className="flex size-[2.125rem] cursor-pointer items-center justify-center rounded-full bg-[#F9F9F9]">
            <FaRegHeart />
          </button>
        </div>

        <p className="text-md/[0.994rem] mt-3 font-semibold text-primary">
          ${price}
        </p>
      </div>
    </div>
  );
}
