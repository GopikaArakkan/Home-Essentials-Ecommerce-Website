import { useEffect, useState } from "react";

const images = [
  "/homepics/img1.jpg",
  "/homepics/img2.jpg",
  "/homepics/img3.jpg",
  "/homepics/img5.jpg",
  "/homepics/img4.jpg",
];

export default function ImageCarousel() {
  const [index, setIndex] = useState(0);

  // AUTO SLIDE
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-cream pb-25">
      <div className="max-w-8xl mx-auto px-6">
        <div className="relative h-105 overflow-hidden min-h-130 rounded-3xl">
          
          {/* SLIDER */}
          <div
            className="flex h-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Slide ${i}`}
                className="min-w-full h-full object-cover"
              />
            ))}
          </div>

          {/* DOTS */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <span
                key={i}
                className={`w-2.5 h-2.5 rounded-full transition ${
                  index === i ? "bg-green-700" : "bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
