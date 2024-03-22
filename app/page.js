import Slider from "./_components/Slider";
import GlobalApi from "./_utils/GlobalApi";

export default async function Home() {
  const sliderList = await GlobalApi.getSliders();

  return (
    <main className="p-5 md:p-10 px-16">
      {/* Slider */}
      <Slider sliderList={sliderList} />
    </main>
  );
}
