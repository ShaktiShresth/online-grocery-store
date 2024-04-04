"use client";

import GlobalApi from "@/app/_utils/GlobalApi";
import { Input } from "@/components/ui/input";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Checkout = () => {
  const [totalCartItem, setTotalCartItem] = useState(0);
  const [cartItemList, setCartItemList] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const jwt = sessionStorage.getItem("jwt");
  const user = JSON.parse(sessionStorage.getItem("user"));
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
  const [address, setAddress] = useState("");

  const [totalAmount, setTotalAmount] = useState();

  /**
   * Get total cart items
   */
  const getCartItems = async () => {
    const cartItemList_ = await GlobalApi.getCartItems(user.id, jwt);
    console.log(cartItemList_);
    setTotalCartItem(cartItemList_?.length);
    setCartItemList(cartItemList_);
  };

  useEffect(() => {
    if (!jwt) {
      router.push("/sign-in");
    }
    getCartItems();
  }, []);

  useEffect(() => {
    let total = 0;
    cartItemList.forEach((elem) => {
      total += elem.amount;
    });
    setTotalAmount((total * 0.9 + 15).toFixed(2));
    setSubTotal(total.toFixed(2));
  }, [cartItemList]);

  const calculateTotalAmt = () => {
    const totalAmt = subTotal * 0.9 + 15;
    return totalAmt.toFixed(2);
  };

  const onApprove = (data) => {
    console.log(data);
  };

  return (
    <div>
      <h2 className="p-3 bg-primary text-xl font-bold text-center text-white">
        Checkout
      </h2>
      <div className="p-5 md:px-10 grid grid-cols-1 lg:grid-cols-3 py-8">
        <div className="md:col-span-2 mx-20">
          <h2 className="font-bold text-3xl">Billing Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-10 mt-3">
            <Input
              placeholder="Name"
              onChange={(ev) => setUsername(ev.target.value)}
            />
            <Input
              placeholder="Email"
              onChange={(ev) => setEmail(ev.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3 md:gap-10 mt-3">
            <Input
              placeholder="Phone"
              onChange={(ev) => setPhone(ev.target.value)}
            />
            <Input
              placeholder="Zip"
              onChange={(ev) => setZip(ev.target.value)}
            />
          </div>
          <div className="mt-3">
            <Input
              placeholder="Address"
              onChange={(ev) => setAddress(ev.target.value)}
            />
          </div>
        </div>
        <div className="mx-20 lg:mx-10 border mt-5 lg:mt-0">
          <h2 className="p-3 bg-gray-200 font-bold text-center">
            Total Cart ({totalCartItem})
          </h2>
          <div className="p-4 flex flex-col gap-4">
            <h2 className="font-bold flex justify-between">
              Subtotal : <span>${subTotal}</span>
            </h2>
            <hr />
            <h2 className="flex justify-between">
              Delivery : <span>$15.00</span>
            </h2>
            <h2 className="flex justify-between">
              Tax (9%) : <span>${(totalCartItem * 0.9).toFixed(2)}</span>
            </h2>
            <hr />
            <h2 className="flex justify-between font-bold">
              Total : <span>${calculateTotalAmt()}</span>
            </h2>
            <PayPalButtons
              className="paypal_btn"
              style={{ layout: "horizontal" }}
              onApprove={onApprove}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: totalAmount,
                        currency_code: "USD",
                      },
                    },
                  ],
                });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
