import { Button } from "@/components/ui/button";
import { LoaderIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const CartItemList = ({ cartItemList, onDeleteItem, loadingDeleteItems }) => {
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const total = cartItemList.reduce(
      (acc, cartItem) => acc + cartItem.amount,
      0
    );
    setSubtotal(total.toFixed(2));
  }, [cartItemList]);

  return (
    <div>
      <div className="h-[600px] overflow-auto">
        {cartItemList.map((cart, index) => (
          <div
            className="flex justify-between items-center p-2 mb-4"
            key={cart.id}
          >
            <div className="flex gap-6 items-center">
              <Image
                src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + cart.image}
                width={70}
                height={70}
                alt={cart.name}
                className="border p-2"
              />
              <div className="flex flex-col items-start">
                <h2 className="font-bold text-start">{cart.name}</h2>
                <h2>Quantity {cart.quantity}</h2>
                <div className="text-lg font-bold">$ {cart.amount}</div>
              </div>
            </div>
            {loadingDeleteItems[index] ? (
              <LoaderIcon className="text-red-500 animate-spin" />
            ) : (
              <TrashIcon
                className="cursor-pointer hover:text-red-500"
                onClick={() => onDeleteItem(cart.id, index)}
              />
            )}
          </div>
        ))}
      </div>
      <div className="absolute w-[90%] bottom-6 flex flex-col">
        <h2 className="flex justify-between font-bold text-lg">
          Subtotal <span>${subtotal}</span>
        </h2>
        <Button>Checkout</Button>
      </div>
    </div>
  );
};

export default CartItemList;
