import GlobalApi from "@/app/_utils/GlobalApi";
import TopCategoryList from "../_components/TopCategoryList";
import ProductList from "@/app/_components/ProductList";

const ProductCategory = async ({ params }) => {
  const productList = await GlobalApi.getProductsByCategory(
    params.categoryName
  );
  const categoryList = await GlobalApi.getCategoryList();

  return (
    <div>
      <h2 className="bg-primary p-4 text-white font-bold text-3xl text-center">
        {params.categoryName.split("%20").join(" ")}
      </h2>
      <TopCategoryList
        categoryList={categoryList}
        selectedCategory={params.categoryName.split("%20").join(" ")}
      />
      <div className="p-5 md:p-10">
        <ProductList productList={productList} />
      </div>
    </div>
  );
};

export default ProductCategory;
