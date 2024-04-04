import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

const OrderConfirmation = () => {
  return (
    <div className="flex justify-center my-20">
      <div className="border shadow-md flex flex-col justify-center p-20 rounded-md items-center gap-3 px-32">
        <CheckCircle2 className="size-24 text-primary" />
        <h2 className="text-3xl text-primary font-medium">Order Successful!</h2>
        <h2 className="text-gray-400">Thank you so much for the order.</h2>
        <Button className="mt-8">Track your order</Button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
