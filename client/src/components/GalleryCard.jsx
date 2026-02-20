import { Link } from "react-router-dom";

export default function GalleryCard({ title, span, image }) {
  return (
    <Link
      to={`/shop/${title.toLowerCase()}`}
      className={`${span} group relative h-80 rounded-3xl overflow-hidden`}
    >
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-black/30" />

      <div className="absolute bottom-6 left-6 text-white text-xl font-semibold tracking-wide">
        {title}
      </div>
    </Link>
  );
}
