import Image from "next/image";

const CategoryList = ({ categoryList }) => {
  return (
    <div className="mt-5">
      <h2 className="text-green-600 font-bold text-2xl">Shop by Category</h2>
      <div className="mt-2 grid gap-5 grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7">
        {categoryList.map((category) => (
          <div
            key={category.id}
            className="flex flex-col items-center bg-green-50 gap-2 p-4 rounded-lg cursor-pointer group hover:bg-green-200"
          >
            <Image
              src={
                process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
                category.attributes.icon.data[0].attributes.url
              }
              height={50}
              width={50}
              alt="icon"
              className="transition-all ease-in-out group-hover:scale-125"
            />
            <h2 className="text-green-800">{category.attributes.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
