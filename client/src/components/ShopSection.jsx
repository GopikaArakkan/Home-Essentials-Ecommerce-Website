import { AiOutlineArrowDown } from "react-icons/ai"; 
export default function ShopSection() {
  return (
    <section className="bg-cream pt-25 pb-20">
      <div className="max-w-8xl mx-auto px-6">

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 min-h-130">

          {/* CARD 1 – IMAGE */}
          <div className="rounded-3xl overflow-hidden lg:col-span-1 hover:-translate-y-1 transition">
            <img
              src="/homepics/img1.jpg"
              alt="Outdoor furniture"
              className="w-full h-full object-cover"
            />
          </div>

          {/* CARD 2 – SHOP NOW */}
<div
  className="
    bg-green-300 
    rounded-3xl 
    flex 
    flex-col 
    items-center 
    justify-center 
    text-center 
    lg:col-span-1 
    hover:-translate-y-1
    px-6 py-10
  "
>
  <h3
    className="
      text-3xl 
      sm:text-4xl 
      lg:text-5xl 
      font-semibold 
      text-green-900
      leading-tight
    "
  >
    Outdoor <br /> Elegance
  </h3>

  <button
    onClick={() => {
      document
        .getElementById("shop-now")
        ?.scrollIntoView({ behavior: "smooth" });
    }}
    className="
      mt-6 
      w-12 h-12 
      border-2 
      border-green-900 
      rounded-full 
      flex 
      items-center 
      justify-center 
      text-xl 
      hover:bg-lime-400
      transition
    "
  >
    <AiOutlineArrowDown />
  </button>
</div>

          {/* CARD 3 – IMAGE (WIDER) */}
          <div className="rounded-3xl overflow-hidden lg:col-span-3 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl">
            <img
              src="/homepics/img2.jpg"
              alt="Modern outdoor setup"
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  )
}
