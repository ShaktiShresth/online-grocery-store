import { Button } from "@/components/ui/button";
import Image from "next/image";

const ProductItem = ({ product }) => {
  return (
    <div
      className="p-2 md:p-6 flex flex-col items-center justify-center gap-3 border rounded-lg
    hover:scale-110 hover:shadow-lg transition-all ease-in-out cursor-pointer"
    >
      <Image
        src={
          process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
          product.attributes.images.data[0].attributes.url
        }
        height={200}
        width={500}
        alt={product.attributes.name}
        className="h-[160px] w-[160px] object-contain"
      />
      <h2 className="font-bold text-lg">{product.attributes.name}</h2>
      <div className="flex items-center gap-3">
        {product.attributes.sellingPrice && (
          <h2 className="font-bold text-lg">
            ${product.attributes.sellingPrice}
          </h2>
        )}
        <h2
          className={`font-bold ${
            product.attributes.sellingPrice && "line-through text-gray-500"
          }`}
        >
          ${product.attributes.mrp}
        </h2>
      </div>
      <Button
        variant="outline"
        className="text-primary hover:text-white hover:bg-primary"
      >
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductItem;
