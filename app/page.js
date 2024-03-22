import CategoryList from "./_components/CategoryList";
import ProductList from "./_components/ProductList";
import Slider from "./_components/Slider";
import GlobalApi from "./_utils/GlobalApi";

export default async function Home() {
  const sliderList = await GlobalApi.getSliders();

  const categoryList = await GlobalApi.getCategoryList();

  const productList = await GlobalApi.getAllProducts();
  return (
    <main className="p-5 md:p-10 px-16">
      {/* Slider */}
      <Slider sliderList={sliderList} />
      {/* Category list */}
      <CategoryList categoryList={categoryList} />
      {/* Product list */}
      <ProductList productList={productList} />
    </main>
  );
}
