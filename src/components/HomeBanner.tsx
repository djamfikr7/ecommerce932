import Container from "./Container";

const HomeBanner = () => {
  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 py-16">
      <Container className="text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl uppercase font-bold text-darkColor">
          Best Clothing Collection
        </h1>
        <p className="mt-4 text-sm md:text-base text-lightColor/80 font-medium max-w-[480px] mx-auto">
          Discover our curated selection of premium fashion. From everyday
          essentials to statement pieces — find your style with Ecommerce932.
        </p>
        <div className="mt-6">
          <a
            href="#products"
            className="inline-block bg-darkColor text-white px-8 py-3 rounded-full font-semibold hover:bg-darkColor/90 hoverEffect"
          >
            Explore All Deals
          </a>
        </div>
      </Container>
    </div>
  );
};

export default HomeBanner;
