"use client";

import Image from "next/image";
import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";

export default function Accessory({ accessory, handleAddToCart }) {
  const { id, name, price, slug, thumbnail_image } = accessory || {};
  const [quantity, setQuantity] = useState(1);

  const onAddToCart = () => {
    const data = {
      id,
      slug,
      name,
      price,
    };

    handleAddToCart(data, quantity);
  };

  return (
    <div className="flex w-full scale-75 flex-col gap-y-3 rounded-xl border bg-gray-100 p-3">
      <Image
        src={thumbnail_image}
        alt={name}
        width={200}
        height={150}
        className="h-[150px] w-[200px]"
      />

      <div className="flex items-center gap-x-2">
        <div className="flex flex-col items-start">
          <span className="line-clamp-1 max-w-[150px] text-start text-xl font-semibold">
            {name}
          </span>
          <span className="text-base text-gray-700">${price}</span>
        </div>
      </div>

      <div className="flex flex-col gap-y-2">
        <div className="flex justify-between divide-x rounded bg-gray-200 text-slate-500">
          <button
            className="flex w-1/3 cursor-pointer items-center justify-center py-2 text-xl"
            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
          >
            <FaMinus />
          </button>
          <span className="flex w-1/3 items-center justify-center py-2 text-lg">
            {quantity}
          </span>
          <button
            className="flex w-1/3 cursor-pointer items-center justify-center py-2 text-xl"
            onClick={() => setQuantity((prev) => prev + 1)}
          >
            <FaPlus />
          </button>
        </div>

        <button
          className="button-primary cursor-pointer text-white"
          onClick={onAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
