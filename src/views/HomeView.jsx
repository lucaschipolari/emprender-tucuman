import CarouselEntrepreneurs from "../components/Home/CarouselEntrepreneurs";
import CarouselHome from "../components/Home/CarouselHome";
import Categorias from "../components/Home/Categorias";
import HeroCarousel from "../components/Home/HeroCarousel";
import OurValues from "../components/Home/OurValues";

export const HomeView = () => {
  return (
    <>
      <CarouselHome />
      <OurValues />
      <CarouselEntrepreneurs />
      <HeroCarousel />
      <Categorias />
    </>
  );
};

export default HomeView;
