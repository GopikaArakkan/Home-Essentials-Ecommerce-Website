import { useRef } from "react";
import BestSellerCard from "./BestSellerCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function BestSellersCarousel({ products = [] }) {
  // ✅ SAFETY: ensure products is always an array
  const bestSellers = products.filter(
    (p) => Number(p.discountPercent) >= 50
  );

  const carouselRef = useRef(null);

  const scrollLeft = () => {
    carouselRef.current?.scrollBy({
      left: -360,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    carouselRef.current?.scrollBy({
      left: 360,
      behavior: "smooth",
    });
  };

  return (
    <section id="bestsellers-discount" className="bg-cream py-12 relative">
      {/* Heading */}
      <div className="text-center mb-12">
        <p className="text-sm tracking-wide text-gray-500">
          New Trendy Collections
        </p>
        <h2 className="text-4xl md:text-6xl font-serif text-green-900 mt-2">
          BestSellers and Discounts
        </h2>
      </div>

      {/* LEFT ARROW */}
      <button
        onClick={scrollLeft}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg rounded-full w-12 h-12 flex items-center justify-center"
      >
        <ChevronLeft className="w-6 h-6 text-gray-700" />
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={scrollRight}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg rounded-full w-12 h-12 flex items-center justify-center"
      >
        <ChevronRight className="w-6 h-6 text-gray-700" />
      </button>

      {/* Carousel */}
      <div
        ref={carouselRef}
        className="flex gap-10 overflow-x-auto px-20 no-scrollbar scroll-smooth"
      >
        {bestSellers.map((product) => (
          <div key={product._id} className="shrink-0 w-[320px]">
            <BestSellerCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
