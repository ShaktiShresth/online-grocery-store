import Image from "next/image";
import Link from "next/link";

const TopCategoryList = ({ categoryList, selectedCategory }) => {
  return (
    <div className="flex justify-center">
      <div className="mt-2 gap-5 flex overflow-auto mx-7 md:mx-20">
        {categoryList.map((category) => (
          <Link
            href={`/products-category/${category.attributes.name}`}
            key={category.id}
            className={`w-[150px] min-w-[100px] flex flex-col justify-center 
            items-center bg-green-50 gap-2 p-4 rounded-lg cursor-pointer group 
            hover:bg-green-600 ${
              selectedCategory === category.attributes.name &&
              "bg-green-600 text-white"
            }`}
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
            <h2
              className={`text-green-800 group-hover:text-white ${
                selectedCategory === category.attributes.name && "text-white"
              }`}
            >
              {category.attributes.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopCategoryList;
