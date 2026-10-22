import FeaturedProducts from "@/components/common/FeaturedProducts";
import ShopByCategory from "@/components/common/ShopByCategory";
import Footer from "@/components/layout/Footer";
import HeroBanner from "@/components/layout/HeroBanner";
import Navbar from "@/components/layout/Navbar";
import React from "react";

const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroBanner />
      <ShopByCategory />
      <FeaturedProducts />
      <Footer />
    </div>
  );
};

export default Home;
