export default function AboutUsSection() {
  return (
    <section id="about" className="bg-cream py-25">
      {/* MATCH NAVBAR / HERO WIDTH */}
      <div className="max-w-8xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">

          {/* LEFT IMAGE */}
          <div className="rounded-3xl overflow-hidden min-h-130">
            <img
              src="/homepics/img5.jpg"
              alt="Outdoor furniture setting"
              className="w-full h-full object-cover"
            />
          </div>

          {/* RIGHT CONTENT */}
          <div className="bg-lightGreen rounded-3xl p-12 flex flex-col justify-between">
            
            {/* STORY */}
            <div>
              <h2 className="text-6xl md:text-5xl font-semibold text-green-900 mb-10">
               About Us
              </h2>

              {/* VISION */}
              <div className="mb-10">
                <h3 className="text-2xl font-semibold text-green-900 mb-4">
                  Our Vision
                </h3>
                <p className="text-green-800 leading-relaxed max-w-xl">
                  At Classy.Nest, we are dedicated to creating stylish and
                  durable outdoor furniture pieces that bring comfort and
                  elegance to outdoor spaces. Our commitment to quality
                  craftsmanship and innovative design sets us apart in the
                  industry.
                </p>
              </div>

              {/* MISSION */}
              <div>
                <h3 className="text-2xl font-semibold text-green-900 mb-4">
                  Our Mission
                </h3>
                <p className="text-green-800 leading-relaxed max-w-xl">
                  Our mission is to enrich outdoor living by providing
                  high-quality, stylish furniture that complements natural
                  landscapes and elevates the outdoor experience.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
