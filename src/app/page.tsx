import Hero from "@/components/home/Hero";
import FeatureBar from "@/components/home/FeatureBar";
import ShopByCategory from "@/components/home/ShopByCategory";
import FeaturedCollection from "@/components/home/FeaturedCollection";
import BestSellers from "@/components/home/BestSellers";
import FabricSection from "@/components/home/FabricSection";
import WhyElko from "@/components/home/WhyElko";
import SocialProof from "@/components/home/SocialProof";
import ReviewsCarousel from "@/components/home/ReviewsCarousel";
import InstagramGallery from "@/components/home/InstagramGallery";
import NewsletterCTA from "@/components/home/NewsletterCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <FeatureBar />
      <ShopByCategory />
      <FeaturedCollection />
      <BestSellers />
      <FabricSection />
      <WhyElko />
      <SocialProof />
      <ReviewsCarousel />
      <InstagramGallery />
      <NewsletterCTA />
    </>
  );
}
