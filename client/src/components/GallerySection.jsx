import GalleryCard from "./GalleryCard";



const galleryItems = [
  { title: "SOFAS", image: "/homepics/sofa.jpg", span: "col-span-2" },
  { title: "RECLINERS", image: "/homepics/recliners.webp", span: "col-span-1" },
  { title: "DINING", image: "/homepics/dining.jpg", span: "col-span-1" },

  { title: "CHAIRS", image: "/homepics/chairs.webp", span: "col-span-1" },
  { title: "TABLES", image: "/homepics/table.webp", span: "col-span-1" },
  { title: "KITCHENS", image: "/homepics/kitchens.jpg", span: "col-span-2" },

  { title: "OUTDOOR", image: "/homepics/outdoors.jpg", span: "col-span-1" },
  { title: "LIVING", image: "/homepics/living.jpg", span: "col-span-2" },
  { title: "WARDROBES", image: "/homepics/wardrobes.avif", span: "col-span-1" },
];

export default function GallerySection() {
  return (
    <section id="explore-collections" className="bg-cream py-1">
      <h2 className="text-4xl md:text-6xl font-serif text-green-900 text-center p-10">
        Gallery Collections
      </h2>

      <div className="max-w-8xl mx-auto px-6">
        <div className="grid grid-cols-4 gap-6">
          {galleryItems.map((item) => (
            <GalleryCard
              key={item.title}
              title={item.title}
              image={item.image}
              span={item.span}
            />
          ))}
        </div>
      </div>
    </section>
  );
}


