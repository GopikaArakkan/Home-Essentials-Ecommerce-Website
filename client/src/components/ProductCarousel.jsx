import { useRef } from "react";
import ProductCard from "./ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductCarousel({ products }) {
  const carouselRef = useRef(null);

  const scrollLeft = () => {
    carouselRef.current.scrollBy({
      left: -360,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({
      left: 360,
      behavior: "smooth",
    });
  };

  return (
    <section id="shop-now" className="bg-white py-8 relative">
      {/* Heading */}
      <div className="text-center mb-12">
        <p className="text-sm tracking-wide text-gray-500">Shop Now</p>
        <h2 className="text-4xl md:text-6xl font-serif text-green-900 mt-2">
          Shop Outdoor Elegance
        </h2>
      </div>

      {/* LEFT ARROW */}
      <button
        onClick={scrollLeft}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-10 bg-gray-100 shadow-md rounded-full w-12 h-12 flex items-center justify-center hover:scale-105 transition"
      >
        <ChevronLeft className="w-6 h-6 text-gray-700" />
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={scrollRight}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full w-12 h-12 flex items-center justify-center hover:scale-105 transition"
      >
        <ChevronRight className="w-6 h-6 text-gray-700" />
      </button>

      {/* Carousel */}
     <div
  ref={carouselRef}
  className="flex gap-10 overflow-x-auto px-20 no-scrollbar scroll-smooth"
>
        {products.map((product) => (
          <div
            key={product._id}
            className="shrink-0 w-[320px]"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
