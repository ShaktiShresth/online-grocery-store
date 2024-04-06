import Image from "next/image";

const MyOrderItem = ({ orderItem }) => {
  return (
    <>
      <div className="grid grid-cols-5 mt-3 items-center">
        <Image
          src={
            process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
            orderItem.product.data.attributes.images.data[0].attributes.url
          }
          height={80}
          width={80}
          alt="image"
          className="bg-gray-100 p-5 rounded-md border"
        />
        <div className="col-span-2">
          <div>
            <h2>{orderItem.product.data.attributes.name}</h2>
            <h2>Item Price: ${orderItem.product.data.attributes.mrp}</h2>
          </div>
        </div>
        <div>
          <h2>Quantity: {orderItem.quantity}</h2>
        </div>
        <div>
          <h2>Price: ${orderItem.amount}</h2>
        </div>
      </div>
      <hr className="mt-3" />
    </>
  );
};

export default MyOrderItem;
