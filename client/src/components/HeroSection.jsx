import { AiOutlineArrowDown } from "react-icons/ai";

export default function HeroSection() {
  return (
    <section className="bg-cream pt-5 pb-20">
      {/* MATCH NAVBAR WIDTH */}
      <div className="max-w-8xl mx-auto px-4 md:px-6">

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8 min-h-130">

          {/* CARD 1 – WIDE */}
          <div className="rounded-3xl bg-red-200 p-6 md:p-12 flex flex-col justify-between lg:col-span-2 text-center md:text-left">
            <div>
              <h1 className="text-3xl md:text-5xl lg:text-7xl font-semibold text-gray-800 leading-tight">
                Elevate Your <br /> Outdoor Living
              </h1>

              <p className="mt-4 md:mt-6 text-gray-700 max-w-md mx-auto md:mx-0">
                Discover premium outdoor furniture designed for comfort,
                durability, and timeless style.
              </p>
            </div>

            <button
              onClick={() => {
                document
                  .getElementById("explore-collections")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="
                mt-6
                w-full md:w-fit
                px-50 py-3
                bg-[#245b2a] text-white
                rounded-full
                hover:bg-yellow-600 hover:text-black
              "
            >
              Explore Collections
            </button>
          </div>

          {/* CARD 2 */}
          <div className="bg-green-300 rounded-3xl flex flex-col items-center justify-center text-center p-6 lg:col-span-1 hover:-translate-y-1">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-green-900 leading-tight">
              BestSellers <br /> and <br /> Discounts
            </h3>

            <button
              onClick={() => {
                document
                  .getElementById("bestsellers-discount")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="
                mt-6
                w-12 h-12
                border-2 border-green-900
                rounded-full
                flex items-center justify-center
                text-xl
                bg-lime-400
                hover:bg-orange-400
              "
            >
              <AiOutlineArrowDown />
            </button>
          </div>

          {/* CARD 3 */}
          <div className="rounded-3xl overflow-hidden lg:col-span-1 hover:-translate-y-1">
            <img
              src="/homepics/img4.jpg"
              alt="Outdoor furniture"
              className="w-full h-64 md:h-full object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  );
}