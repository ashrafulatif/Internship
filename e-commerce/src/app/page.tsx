"use client";
import React from "react";
import Carousel from "@/components/MuiCarousel";
import ProductList from "@/components/ProductList";
import products from "@/Data/productData.json";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import CategoryCard from "@/components/CatagoryCard";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  imageUrl: string;
  rating: number;
}

const typedProducts: Product[] = products.products;

const Home: React.FC = () => {
  //scroll animation
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <div>
      <Carousel />
      <CategoryCard />
      <ProductList products={typedProducts} />
    </div>
  );
};

export default Home;
