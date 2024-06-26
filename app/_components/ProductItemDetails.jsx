"use client";

import { Button } from "@/components/ui/button";
import { LoaderIcon, ShoppingBasket } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import GlobalApi from "../_utils/GlobalApi";
import { toast } from "sonner";
import { UpdateCartContext } from "../_context/UpdateCartContext";

const ProductItemDetails = ({ product }) => {
  const jwt = sessionStorage.getItem("jwt");
  const user = JSON.parse(sessionStorage.getItem("user"));
  const { updateCart, setUpdateCart } = useContext(UpdateCartContext);
  const [productTotalPrice, setProductTotalPrice] = useState(
    product.attributes.sellingPrice
      ? product.attributes.sellingPrice
      : product.attributes.mrp
  );
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const addToCart = () => {
    setLoading(true);
    if (!jwt) {
      router.push("/sign-in");
      setLoading(false);
      return;
    }
    const data = {
      data: {
        quantity: quantity,
        amount: (quantity * productTotalPrice).toFixed(2),
        products: product.id,
        users_permissions_users: user.id,
        userId: user.id,
      },
    };
    GlobalApi.addToCart(data, jwt).then(
      (resp) => {
        console.log(resp);
        toast("Product added to your cart.");
        setUpdateCart(!updateCart);
        setLoading(false);
      },
      (e) => {
        toast("Error while adding the product to cart.");
        setLoading(false);
      }
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 p-7 bg-white text-black">
      <Image
        src={
          process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
          product.attributes.images.data[0].attributes.url
        }
        width={300}
        height={300}
        alt="product image"
        className="bg-slate-200 p-5 h-[250px] md:h-[320px] w-[250px] md:w-[300px] object-contain rounded-lg"
      />
      <div className="flex flex-col gap-3 items-start">
        <h2 className="text-2xl font-bold">{product.attributes.name}</h2>
        <h2 className="text-sm text-gray-500">
          {product.attributes.description}
        </h2>
        <div className="flex items-center gap-3">
          {product.attributes.sellingPrice && (
            <h2 className="font-bold text-xl md:text-3xl">
              ${product.attributes.sellingPrice}
            </h2>
          )}
          <h2
            className={`font-bold text-xl md:text-3xl ${
              product.attributes.sellingPrice && "line-through text-gray-500"
            }`}
          >
            ${product.attributes.mrp}
          </h2>
        </div>
        <h2 className="font-medium text-lg">
          Quantity ({product.attributes.itemQuantityType})
        </h2>
        <div className="flex flex-col items-baseline gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 border flex gap-10 items-center px-3">
              <button
                disabled={quantity == 1}
                onClick={() => setQuantity(quantity - 1)}
              >
                -
              </button>
              <h2>{quantity}</h2>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            <h2 className="text-xl md:text-2xl font-bold">
              = ${(quantity * productTotalPrice).toFixed(2)}
            </h2>
          </div>
          <Button
            className="flex gap-3"
            onClick={() => addToCart()}
            disabled={loading}
          >
            <ShoppingBasket />
            {loading ? <LoaderIcon className="animate-spin" /> : "Add To Cart"}
          </Button>
        </div>
        <h2>
          <span className="font-bold">Category: </span>
          {product.attributes.categories.data[0].attributes.name}
        </h2>
      </div>
    </div>
  );
};

export default ProductItemDetails;
