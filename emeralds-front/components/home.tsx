"use client";
import React from "react";
import HomeHero from "./home-hero";
import HomeBanner from "./home-banner";
import HomeFeaturedProducts from "./home-featured-products";
import HomeAbout from "./home-about";
import HomeFeatures from "./home-features";
import HomeTestimonials from "./home-testimonials";
import HomeContact from "./home-contact";

const HomePage: React.FC = () => {
  return (
    <main className="min-h-screen flex flex-col items-center bg-gradient-to-br from-emerald-50 to-white font-sans text-emerald-900">
      <HomeHero />
      <HomeBanner />
      <HomeFeaturedProducts />
      <HomeAbout />
      <HomeFeatures />
      <HomeTestimonials />
      <HomeContact />
    </main>
  );
};

export default HomePage;
