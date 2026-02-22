
import { useEffect, useState } from "react";
import api from "../api"; 
// or "../../api" depending on file location
 import { useParams, Link, useLocation } from "react-router-dom";
import ProductCarousel from "../components/ProductCarousel";
import ProductCard from "../components/ProductCard";
import BestSellersCarousel from "../components/BestSellersCarousel";
import ImageCarousel from "../components/ImageCarousel";





export default function Shop() {
   // 🔥 COUNTDOWN TARGET (change date anytime)
  const targetDate = new Date("2026-12-31T23:59:59").getTime();

const [timeLeft, setTimeLeft] = useState({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
});

 useEffect(() => {
  const timer = setInterval(() => {
    const now = new Date().getTime();
    const diff = targetDate - now; // ✅ FIXED

    if (diff <= 0) {
      clearInterval(timer);
      setTimeLeft({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
      return;
    }

    setTimeLeft({
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      ),
      minutes: Math.floor(
        (diff % (1000 * 60 * 60)) / (1000 * 60)
      ),
      seconds: Math.floor((diff % (1000 * 60)) / 1000),
    });
  }, 1000);

  return () => clearInterval(timer);
}, [targetDate]);



  const { category } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState(100000);
  const ITEMS_PER_PAGE = 9;

const [currentPage, setCurrentPage] = useState(1);

 

  const location = useLocation();
const searchParams = new URLSearchParams(location.search);
const searchQuery = searchParams.get("search") || "";




  // Lighting filters
const [lightingFilters, setLightingFilters] = useState({
  type: "",
  material: "",
  energy: "",
  design: "",
  brand: "",
});

// Outdoor filters
const [outdoorFilters, setOutdoorFilters] = useState({
  style: "",
  material: "",
  color: "",
   brand: "",
});


// Indoor filters
const [indoorFilters, setIndoorFilters] = useState({
  style: "",
  material: "",
  color: "",
   brand: "",
});

// Kitchen filters
const [kitchenFilters, setKitchenFilters] = useState({
  cookware: "",
  containers: "",
  kitchenware: "",
  appliances: "",
   brand: "",
});


// Sofa filters
const [sofaFilters, setSofaFilters] = useState({
  material: "",
  type: "",
  configuration: "",
   brand: "",
});


// Recliner filters
const [reclinerFilters, setReclinerFilters] = useState({
  mechanism: "",
  brand: "",
});


// Dining filters
const [diningFilters, setDiningFilters] = useState({
  design: "",
  brand: "",
});



// Chair filters
const [chairFilters, setChairFilters] = useState({
  type: "",
  material: "",
  brand: "",
});


// Table filters
const [tableFilters, setTableFilters] = useState({
  material: "",
  design: "",
  brand: "",
});

// Living filters
const [livingFilters, setLivingFilters] = useState({
  brand: "",
});


// Wardrobe filters
const [wardrobeFilters, setWardrobeFilters] = useState({
  style: "",
  material: "",
  brand: "",
});


// handler fro lighting
const handleLightingFilterChange = (e) => {
  const { name, value } = e.target;

  setLightingFilters({
    type: "",
    material: "",
    energy: "",
    design: "",
    brand: "",
    [name]: value,
  });
  setCurrentPage(1);

};


// handler for outdoor
const handleOutdoorFilterChange = (e) => {
  const { name, value } = e.target;
  setOutdoorFilters((prev) => ({
    ...prev,
    [name]: value,
  }));
  setCurrentPage(1);

};


// indoor handler
const handleIndoorFilterChange = (e) => {
  const { name, value } = e.target;

  setIndoorFilters({
    style: "",
    material: "",
    color: "",
    brand: "",
    [name]: value,
  });
  setCurrentPage(1);

};



// handler for kitchen
const handleKitchenFilterChange = (e) => {
  const { name, value } = e.target;

  setKitchenFilters((prev) => {
    // base reset
    const resetFilters = {
      cookware: "",
      containers: "",
      kitchenware: "",
      appliances: "",
      brand: prev.brand, // keep brand
    };

    return {
      ...resetFilters,
      [name]: value,
    };
  });
  setCurrentPage(1);

};


// handler for sofa
const handleSofaFilterChange = (e) => {
  const { name, value } = e.target;

  setSofaFilters((prev) => {
    let updated = { ...prev, [name]: value };

    if (name === "type") {
      // Reset config when type changes
      updated.configuration = "";

      if (value === "Sectional Sofa") {
        updated.configuration = "Modular";
      }
    }

    return updated;
  });
  setCurrentPage(1);

};



// handler for recliners
const handleReclinerFilterChange = (e) => {
  const { name, value } = e.target;
  setReclinerFilters((prev) => ({
    ...prev,
    [name]: value,
  }));
  setCurrentPage(1);

};


// handler for dining
const handleDiningFilterChange = (e) => {
  const { name, value } = e.target;
  setDiningFilters((prev) => ({
    ...prev,
    [name]: value,
  }));
  setCurrentPage(1);

};

// handler for chairs
const handleChairFilterChange = (e) => {
  const { name, value } = e.target;
  setChairFilters((prev) => ({
    ...prev,
    [name]: value,
  }));
  setCurrentPage(1);

};

// handler for tables
const handleTableFilterChange = (e) => {
  const { name, value } = e.target;
  setTableFilters((prev) => ({
    ...prev,
    [name]: value,
  }));
  setCurrentPage(1);

};

// handler for living
const handleLivingFilterChange = (e) => {
  const { name, value } = e.target;
  setLivingFilters((prev) => ({
    ...prev,
    [name]: value,
  }));
  setCurrentPage(1);

};

const handleWardrobeFilterChange = (e) => {
  const { name, value } = e.target;
  setWardrobeFilters((prev) => ({
    ...prev,
    [name]: value,
  }));
  setCurrentPage(1);

};





  useEffect(() => {
    const fetchProducts = async () => {
      const res = await api.get("api/products");
      setProducts(res.data);
      setLoading(false);
    };
    fetchProducts();
  }, []);


// 🔥 RESET FILTERS WHEN CATEGORY CHANGES
useEffect(() => {
  setCurrentPage(1);

  setLightingFilters({
    type: "",
    material: "",
    energy: "",
    design: "",
    brand: "",
  });

  setOutdoorFilters({
    style: "",
    material: "",
    color: "",
    brand: "",
  });

  setIndoorFilters({
    style: "",
    material: "",
    color: "",
    brand: "",
  });

  setKitchenFilters({
    cookware: "",
    containers: "",
    kitchenware: "",
    appliances: "",
    brand: "",
  });

  setSofaFilters({
    material: "",
    type: "",
    configuration: "",
    brand: "",
  });

  setReclinerFilters({
  mechanism: "",
  brand: "",
});


  setDiningFilters({
  design: "",
  brand: "",
});


  setChairFilters({
  type: "",
  material: "",
  brand: "",
});

  setTableFilters({
    material: "",
    design: "",
    brand: "",
  });

  setLivingFilters({
  brand: "",
});


  setWardrobeFilters({
  style: "",
  material: "",
  brand: "",
});


  // optional but recommended
  setPriceRange(100000);
  setSortBy("default");
}, [category]);



  const categories = [
    "All",
    "Lighting",
    "Outdoor",
    "Indoor",
    "Kitchen",
    "Sofa",
    "Recliners",
    "Dining",
    "Chair",
    "Tables",
    "Living",
    "Wardrobes",
  ];

  const normalizedCategory = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : "All";

  /* ---------------- FILTERING ---------------- */

  let filteredProducts =
    category && category !== "all"
      ? products.filter(
          (p) => p.category.toLowerCase() === category.toLowerCase()
        )
      : products;



  filteredProducts = filteredProducts.filter(
  (p) => p.price <= priceRange
);
;


// SEARCH FILTER (from Navbar)
if (searchQuery) {
  filteredProducts = filteredProducts.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
}







  if (sortBy === "priceLow") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  if (sortBy === "priceHigh") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  if (sortBy === "newest") {
    filteredProducts.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }





// ---------------- LIGHTING FILTER LOGIC ----------------
const applyLightingFilters = (products) => {
  return products.filter((p) => {
    if (lightingFilters.type && p.type?.toLowerCase() !== lightingFilters.type.toLowerCase()) return false;
    if (lightingFilters.material && p.material?.toLowerCase() !== lightingFilters.material.toLowerCase()) return false;
    if (lightingFilters.energy && p.energy?.toLowerCase() !== lightingFilters.energy.toLowerCase()) return false;
    if (lightingFilters.design && p.design?.toLowerCase() !== lightingFilters.design.toLowerCase()) return false;
    if (lightingFilters.brand && p.brand?.toLowerCase() !== lightingFilters.brand.toLowerCase()) return false;
    return true;
  });
};
if (category === "lighting") {
  filteredProducts = applyLightingFilters(filteredProducts);
}




// outdoor filter
if (category === "outdoor") {
  filteredProducts = filteredProducts.filter((p) => {
    if (
      outdoorFilters.style &&
      p.style?.toLowerCase() !== outdoorFilters.style.toLowerCase()
    )
      return false;

    if (
      outdoorFilters.material &&
      p.material?.toLowerCase() !== outdoorFilters.material.toLowerCase()
    )
      return false;

    if (
      outdoorFilters.color &&
      p.color?.toLowerCase() !== outdoorFilters.color.toLowerCase()
    )
      return false;

    if (
      outdoorFilters.brand &&
      p.brand?.toLowerCase() !== outdoorFilters.brand.toLowerCase()
    )
      return false;

    return true;
  });
}


// indoor filter
if (category === "indoor") {
  filteredProducts = filteredProducts.filter((p) => {
    if (
      indoorFilters.style &&
      p.style?.toLowerCase() !== indoorFilters.style.toLowerCase()
    )
      return false;

    if (
      indoorFilters.material &&
      p.material?.toLowerCase() !== indoorFilters.material.toLowerCase()
    )
      return false;

    if (
      indoorFilters.color &&
      p.color?.toLowerCase() !== indoorFilters.color.toLowerCase()
    )
      return false;

    if (
      indoorFilters.brand &&
      p.brand?.toLowerCase() !== indoorFilters.brand.toLowerCase()
    )
      return false;

    return true;
  });
}



if (category === "kitchen") {
  filteredProducts = filteredProducts.filter((p) => {
    if (kitchenFilters.cookware && p.cookware !== kitchenFilters.cookware)
      return false;
//     if (kitchenFilters.containers) {
//   console.log("FILTER:", kitchenFilters.containers, "PRODUCT:", p.name, p.containers);
// }

    if (kitchenFilters.containers && p.containers !== kitchenFilters.containers)
      return false;

    if (kitchenFilters.kitchenware && p.kitchenware !== kitchenFilters.kitchenware)
      return false;

    if (kitchenFilters.appliances && p.appliances !== kitchenFilters.appliances)
      return false; 

    if (kitchenFilters.brand && p.brand !== kitchenFilters.brand)
      return false;

    return true;
  });
}



if (category === "sofa") {
  filteredProducts = filteredProducts.filter((p) => {
    if (
      sofaFilters.material &&
      p.material?.toLowerCase() !== sofaFilters.material.toLowerCase()
    ) return false;

    if (
      sofaFilters.type &&
      p.type?.toLowerCase() !== sofaFilters.type.toLowerCase()
    ) return false;

    // ✅ CONFIGURATION ONLY IF NOT SECTIONAL
    if (
      sofaFilters.type !== "Sectional Sofa" &&
      sofaFilters.configuration &&
      p.configuration?.toLowerCase() !== sofaFilters.configuration.toLowerCase()
    ) return false;

    if (
      sofaFilters.brand &&
      p.brand?.toLowerCase() !== sofaFilters.brand.toLowerCase()
    ) return false;

    return true;
  });
}




if (category === "recliners") {
  filteredProducts = filteredProducts.filter((p) => {
    if (
      reclinerFilters.mechanism &&
      p.mechanism?.toLowerCase() !== reclinerFilters.mechanism.toLowerCase()
    ) return false;

    if (
      reclinerFilters.brand &&
      p.brand?.toLowerCase() !== reclinerFilters.brand.toLowerCase()
    ) return false;

    return true;
  });
}



if (category === "dining") {
  filteredProducts = filteredProducts.filter((p) => {
    if (
      diningFilters.design &&
      p.design?.toLowerCase() !== diningFilters.design.toLowerCase()
    ) return false;

    if (
      diningFilters.brand &&
      p.brand?.toLowerCase() !== diningFilters.brand.toLowerCase()
    ) return false;

    return true;
  });
}



if (category === "chair") {
  filteredProducts = filteredProducts.filter((p) => {
    if (
      chairFilters.type &&
      p.type?.toLowerCase() !== chairFilters.type.toLowerCase()
    ) return false;

    if (
      chairFilters.material &&
      p.material?.toLowerCase() !== chairFilters.material.toLowerCase()
    ) return false;

    if (
      chairFilters.brand &&
      p.brand?.toLowerCase() !== chairFilters.brand.toLowerCase()
    ) return false;

    return true;
  });
}



if (category === "tables") {
  filteredProducts = filteredProducts.filter((p) => {
    if (
      tableFilters.material &&
      p.material?.toLowerCase() !== tableFilters.material.toLowerCase()
    ) return false;

    if (
      tableFilters.design &&
      p.design?.toLowerCase() !== tableFilters.design.toLowerCase()
    ) return false;

    if (
      tableFilters.brand &&
      p.brand?.toLowerCase() !== tableFilters.brand.toLowerCase()
    ) return false;

    return true;
  });
}



if (category === "living") {
  filteredProducts = filteredProducts.filter((p) => {
    if (
      livingFilters.brand &&
      p.brand?.toLowerCase() !== livingFilters.brand.toLowerCase()
    ) return false;

    return true;
  });
}



if (category === "wardrobes") {
  filteredProducts = filteredProducts.filter((p) => {
    if (
      wardrobeFilters.style &&
      p.style?.toLowerCase() !== wardrobeFilters.style.toLowerCase()
    ) return false;

    if (
      wardrobeFilters.material &&
      p.material?.toLowerCase() !== wardrobeFilters.material.toLowerCase()
    ) return false;

    if (
      wardrobeFilters.brand &&
      p.brand?.toLowerCase() !== wardrobeFilters.brand.toLowerCase()
    ) return false;

    return true;
  });
}




  /* ---------------- LOADER ---------------- */

  if (loading) {
    return (
      <div className="bg-cream min-h-screen pt-32 px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white p-5 rounded-3xl animate-pulse">
            <div className="h-56 bg-gray-200 rounded-2xl mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  const totalProducts = filteredProducts.length;
const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);

const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
const endIndex = startIndex + ITEMS_PER_PAGE;

const paginatedProducts = filteredProducts.slice(startIndex, endIndex);


  return (
    <div className="bg-cream min-h-screen px-8">

      {/* 🔥 DEAL COUNTDOWN BANNER */}
<div className="w-full bg-linear-to-r from-pink-700 to-purple-500 text-white py-4 px-6 mb-2 rounded-2xl">
  <div className="max-w-8xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

    {/* LEFT TEXT */}
    <div className="flex items-center gap-3">
      <span className="bg-yellow-400 text-red-900 text-sm font-bold px-3 py-1 rounded">
        DEAL
      </span>
      <p className="text-lg font-semibold">
        Limited Time Offer – Hurry Up!
      </p>
    </div>

    {/* COUNTDOWN */}
   <div className="flex items-center gap-3 text-center">
  <p className="text-sm uppercase tracking-wide mr-2">
    Ends In
  </p>

  <div className="bg-black/30 px-3 py-1 rounded">
    <p className="text-xl font-bold">{timeLeft.days}</p>
    <p className="text-xs">Days</p>
  </div>

  <div className="bg-black/30 px-3 py-1 rounded">
    <p className="text-xl font-bold">{timeLeft.hours}</p>
    <p className="text-xs">Hrs</p>
  </div>

  <div className="bg-black/30 px-3 py-1 rounded">
    <p className="text-xl font-bold">{timeLeft.minutes}</p>
    <p className="text-xs">Min</p>
  </div>

  <div className="bg-black/30 px-3 py-1 rounded animate-pulse">
    <p className="text-xl font-bold">{timeLeft.seconds}</p>
    <p className="text-xs">Sec</p>
  </div>
</div>

  </div>
</div>

      {/* PAGE TITLE */}
      <h1 className="text-3xl font-serif text-white bg-green-800 p-5 rounded-2xl mb-6 text-center">
        {normalizedCategory === "All" ? "All Products" : normalizedCategory}
      </h1>

      {/* TOP CATEGORY NAV */}
      <div className="flex flex-wrap justify-center gap-15 mb-12">
        {categories.map((cat) => (
          <Link
            key={cat}
            to={cat === "All" ? "/shop" : `/shop/${cat.toLowerCase()}`}
            className="relative text-green-900 font-medium pb-1"
          >
            {cat}
            {normalizedCategory.toLowerCase() === cat.toLowerCase() && (
              <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-green-900 rounded-full" />
            )}
          </Link>
        ))}
      </div>

      {/* MAIN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* LEFT FILTERS */}
       <aside className="space-y-10">
  {/* PRICE SLIDER */}
  <div>
    <h3 className="font-semibold mb-3">Price</h3>
    <input
      type="range"
      min="0"
      max="100000"
      value={priceRange}
      onChange={(e) => setPriceRange(Number(e.target.value))}
      className="w-full"
    />
    <div className="flex justify-between text-sm mt-2">
      <span>₹0</span>
      <span>₹{priceRange}</span>
    </div>
  </div>

  {/* LIGHTING FILTERS */}
  {normalizedCategory === "Lighting" && (
    <div className="space-y-6">
      <h3 className="font-semibold">Filter by</h3>

      {/* TYPE */}
      <select
        name="type"
        value={lightingFilters.type}
        onChange={handleLightingFilterChange}
        className="input w-full"
      >
        <option value="">Type</option>
        <option>Pendant</option>
        <option>Chandelier</option>
        <option>Lamp</option>
        <option>Ceiling</option>
      </select>

      {/* MATERIAL */}
      <select
        name="material"
        value={lightingFilters.material}
        onChange={handleLightingFilterChange}
        className="input w-full"
      >
        <option value="">Material</option>
        <option>Metal</option>
        <option>Glass</option>
      </select>

      {/* ENERGY */}
      <select
        name="energy"
        value={lightingFilters.energy}
        onChange={handleLightingFilterChange}
        className="input w-full"
      >
        <option value="">Energy Efficiency</option>
        <option>LED</option>
        <option>Incandescent</option>
      </select>

      {/* DESIGN */}
      <select
        name="design"
        value={lightingFilters.design}
        onChange={handleLightingFilterChange}
        className="input w-full"
      >
        <option value="">Design</option>
        <option>Modern</option>
        <option>Classic</option>
      </select>

       {/* BRAND */}
    <select
  name="brand"
  value={lightingFilters.brand}
  onChange={handleLightingFilterChange}
  className="input w-full"
>
  <option value="">Brand</option>
  <option>IKEA</option>
  <option>Urban Ladder</option>
  <option>Pepperfry</option>
  <option>Home Center</option>
</select>
    </div>
  )}

  {/* OUTDOOR FILTERS */}
{normalizedCategory === "Outdoor" && (
  <div className="space-y-6">
    <h3 className="font-semibold">Filter by</h3>

    {/* STYLE */}
    <select
      name="style"
      value={outdoorFilters.style}
      onChange={handleOutdoorFilterChange}
      className="input w-full"
    >
      <option value="">Style</option>
      <option>Modern</option>
      <option>Traditional</option>
    </select>

    {/* MATERIAL */}
    <select
      name="material"
      value={outdoorFilters.material}
      onChange={handleOutdoorFilterChange}
      className="input w-full"
    >
      <option value="">Material</option>
      <option>Wood</option>
      <option>Fabric</option>
    </select>

    {/* COLOR */}
    <select
      name="color"
      value={outdoorFilters.color}
      onChange={handleOutdoorFilterChange}
      className="input w-full"
    >
      <option value="">Color</option>
      <option>Dark</option>
      <option>Light</option>
    </select>
     {/* BRAND */}
    <select
      name="brand"
      value={outdoorFilters.brand}
      onChange={handleOutdoorFilterChange}
      className="input w-full"
    >
      <option value="">Brand</option>
     <option>IKEA</option>
      <option>Urban Ladder</option>
      <option>Pepperfry</option>
      <option>Home Center</option>
    </select>
  </div>
)}

{/* indoor filters */}
{normalizedCategory === "Indoor" && (
  <div className="space-y-6">
    <h3 className="font-semibold">Filter by</h3>

    {/* STYLE */}
    <select
      name="style"
      value={indoorFilters.style}
      onChange={handleIndoorFilterChange}
      className="input w-full"
    >
      <option value="">Style</option>
      <option>Modern</option>
      <option>Traditional</option>
    </select>

    {/* MATERIAL */}
    <select
      name="material"
      value={indoorFilters.material}
      onChange={handleIndoorFilterChange}
      className="input w-full"
    >
      <option value="">Material</option>
      <option>Wood</option>
      <option>clay</option>
    </select>

    {/* COLOR */}
    <select
      name="color"
      value={indoorFilters.color}
      onChange={handleIndoorFilterChange}
      className="input w-full"
    >
      <option value="">Color</option>
      <option>Dark</option>
      <option>Light</option>
    </select>
     {/* BRAND */}
   <select name="brand" value={indoorFilters.brand} onChange={handleIndoorFilterChange} className="input w-full">
      <option value="">Brand</option>
      <option>IKEA</option>
      <option>Urban Ladder</option>
      <option>Pepperfry</option>
      <option>Home Center</option>
    </select>
  </div>
)}

{/* KITCHEN FILTERS */}
{normalizedCategory === "Kitchen" && (
  <div className="space-y-6">
    <h3 className="font-semibold">Filter by</h3>

    {/* COOKWARE */}
   <select disabled={!!kitchenFilters.appliances} 

  name="cookware"
  value={kitchenFilters.cookware}
  onChange={handleKitchenFilterChange}
  className="input w-full"
>
  <option value="">Cookware</option>
  <option>Pots</option>
  <option>Pans</option>
  <option>Pressure Cooker</option>
</select>

    {/* CONTAINERS & BOTTLES */}
   <select disabled={!!kitchenFilters.appliances} 
  name="containers"
  value={kitchenFilters.containers}
  onChange={handleKitchenFilterChange}
  className="input w-full"
>
  <option value="">Containers & Bottles</option>
  <option>Containers</option>
  <option>Water Bottles</option>
</select>


    {/* KITCHENWARE */}
    <select disabled={!!kitchenFilters.appliances} 
      name="kitchenware"
      value={kitchenFilters.kitchenware}
      onChange={handleKitchenFilterChange}
      className="input w-full"
    >
      <option value="">Kitchenware</option>
      <option>Cutlery and Dish Racks</option>
      <option>Serving Trays and Utensil Holders</option>
    </select>

    {/* KITCHEN APPLIANCES */}
    <select disabled={!!kitchenFilters.appliances} 
      name="appliances"
      value={kitchenFilters.appliances}
      onChange={handleKitchenFilterChange}
      className="input w-full"
    >
      <option value="">Kitchen Appliances</option>
      <option>Juicer and Mixer</option>
      <option>Griddle</option>
    </select>

     {/* BRAND */}
   <select name="brand" value={kitchenFilters.brand} onChange={handleKitchenFilterChange} className="input w-full">
      <option value="">Brand</option>
      <option>IKEA</option>
      <option>Urban Ladder</option>
      <option>Pepperfry</option>
      <option>Home Center</option>
    </select>
  </div>
)}

{/* SOFA FILTERS */}
{normalizedCategory === "Sofa" && (
  <div className="space-y-6">
    <h3 className="font-semibold">Filter by</h3>

    {/* SOFA TYPE */}
    <select
      name="type"
      value={sofaFilters.type}
      onChange={handleSofaFilterChange}
      className="input w-full"
    >
      <option value="">Sofa Type</option>
      <option>Sofa-Cum-Bed</option>
      <option>Sectional Sofa</option>
      <option>L-Shaped Sofa</option>
    </select>

 {/* MATERIAL */}
    <select
      name="material"
      value={sofaFilters.material}
      onChange={handleSofaFilterChange}
      className="input w-full"
    >
      <option value="">Material</option>
      <option>Fabric</option>
      <option>Leather</option>
      <option>Wood</option>
    </select>

   {/* CONFIGURATION */}
{/* CONFIGURATION */}
{sofaFilters.type === "Sofa-Cum-Bed" && (
  <select
    name="configuration"
    value={sofaFilters.configuration}
    onChange={handleSofaFilterChange}
    className="input w-full"
  >
    <option value="">Configuration</option>
    <option>2 Seater</option>
    <option>3 Seater</option>
    <option>5 Seater</option>
  </select>
)}

{sofaFilters.type === "L-Shaped Sofa" && (
  <select
    name="configuration"
    value={sofaFilters.configuration}
    onChange={handleSofaFilterChange}
    className="input w-full"
  >
    <option value="">Configuration</option>
    <option>3 Seater</option>
    <option>5 Seater</option>
  </select>
)}

{sofaFilters.type === "Sectional Sofa" && (
  <select
    name="configuration"
    value="Modular"
    disabled
    className="input w-full"
  >
    <option>Modular</option>
  </select>
)}



     {/* BRAND */}
    <select name="brand" value={sofaFilters.brand} onChange={handleSofaFilterChange} className="input w-full">
      <option value="">Brand</option>
      <option>IKEA</option>
      <option>Urban Ladder</option>
      <option>Pepperfry</option>
      <option>Home Center</option>
    </select>
  </div>
)}

{/* RECLINER FILTERS */}
{normalizedCategory === "Recliners" && (
  <div className="space-y-6">
    <h3 className="font-semibold">Filter by</h3>

    {/* MECHANISM */}
    <select
      name="mechanism"
      value={reclinerFilters.mechanism}
      onChange={handleReclinerFilterChange}
      className="input w-full"
    >
      <option value="">Mechanism</option>
      <option>Manual</option>
      <option>Motorized</option>
    </select>

    {/* BRAND */}
    <select
      name="brand"
      value={reclinerFilters.brand}
      onChange={handleReclinerFilterChange}
      className="input w-full"
    >
      <option value="">Brand</option>
      <option>IKEA</option>
      <option>Urban Ladder</option>
      <option>Pepperfry</option>
      <option>Home Center</option>
    </select>
  </div>
)}


{/* DINING FILTERS */}
{normalizedCategory === "Dining" && (
  <div className="space-y-6">
    <h3 className="font-semibold">Filter by</h3>

    {/* DESIGN */}
    <select
      name="design"
      value={diningFilters.design}
      onChange={handleDiningFilterChange}
      className="input w-full"
    >
      <option value="">Design</option>
      <option>Modern</option>
      <option>Contemporary</option>
    </select>

    {/* BRAND */}
    <select
      name="brand"
      value={diningFilters.brand}
      onChange={handleDiningFilterChange}
      className="input w-full"
    >
      <option value="">Brand</option>
      <option>IKEA</option>
      <option>Urban Ladder</option>
      <option>Pepperfry</option>
      <option>Home Center</option>
    </select>
  </div>
)}

{/* chair */}
{normalizedCategory === "Chair" && (
  <div className="space-y-6">
    <h3 className="font-semibold">Filter by</h3>

    {/* TYPE */}
    <select
      name="type"
      value={chairFilters.type}
      onChange={handleChairFilterChange}
      className="input w-full"
    >
      <option value="">Type</option>
      <option>Dining Chair</option>
      <option>Other</option>
    </select>

    {/* MATERIAL */}
    <select
      name="material"
      value={chairFilters.material}
      onChange={handleChairFilterChange}
      className="input w-full"
    >
      <option value="">Material</option>
      <option>Wood</option>
      <option>Fabric</option>
    </select>

    {/* BRAND */}
    <select
      name="brand"
      value={chairFilters.brand}
      onChange={handleChairFilterChange}
      className="input w-full"
    >
      <option value="">Brand</option>
      <option>IKEA</option>
      <option>Urban Ladder</option>
      <option>Pepperfry</option>
      <option>Home Center</option>
    </select>
  </div>
)}

{/* TABLE FILTERS */}
{normalizedCategory === "Tables" && (
  <div className="space-y-6">
    <h3 className="font-semibold">Filter by</h3>

    {/* MATERIAL */}
    <select
      name="material"
      value={tableFilters.material}
      onChange={handleTableFilterChange}
      className="input w-full"
    >
      <option value="">Material</option>
      <option>Wood</option>
      <option>Marble</option>
    </select>

    {/* DESIGN */}
    <select
      name="design"
      value={tableFilters.design}
      onChange={handleTableFilterChange}
      className="input w-full"
    >
      <option value="">Design</option>
      <option>Modern</option>
      <option>Contemporary</option>
    </select>

    {/* BRAND */}
    <select
      name="brand"
      value={tableFilters.brand}
      onChange={handleTableFilterChange}
      className="input w-full"
    >
      <option value="">Brand</option>
      <option>IKEA</option>
      <option>Urban Ladder</option>
      <option>Pepperfry</option>
      <option>Home Center</option>
    </select>
  </div>
)}


{/* LIVING FILTERS */}
{normalizedCategory === "Living" && (
  <div className="space-y-6">
    <h3 className="font-semibold">Filter by</h3>

    <select
      name="brand"
      value={livingFilters.brand}
      onChange={handleLivingFilterChange}
      className="input w-full"
    >
      <option value="">Brand</option>
      <option>IKEA</option>
      <option>Urban Ladder</option>
      <option>Pepperfry</option>
      <option>Home Center</option>
    </select>
  </div>
)}

{/* WARDROBE FILTERS */}
{normalizedCategory === "Wardrobes" && (
  <div className="space-y-6">
    <h3 className="font-semibold">Filter by</h3>
  
    {/* STYLE */}
   <select
  name="style"
  value={wardrobeFilters.style}
  onChange={handleWardrobeFilterChange}
  className="input w-full"
>
  <option value="">Style</option>
  <option>Modern</option>
  <option>Contemporary</option>
</select>

    {/* MATERIAL */}
    <select
      name="material"
      value={wardrobeFilters.material}
      onChange={handleWardrobeFilterChange}
      className="input w-full"
    >
      <option value="">Material</option>
      <option>Solid Wood</option>
      <option>Engineered Wood</option>
      <option>Plywood</option>
    </select>

    {/* BRAND */}
    <select
      name="brand"
      value={wardrobeFilters.brand}
      onChange={handleWardrobeFilterChange}
      className="input w-full"
    >
      <option value="">Brand</option>
     <option>IKEA</option>
      <option>Urban Ladder</option>
      <option>Pepperfry</option>
      <option>Home Center</option>
    </select>
  </div>
)}

</aside>



        {/* RIGHT CONTENT */}
        <div className="lg:col-span-3">
          {/* SEARCH RESULT HEADING */}
{searchQuery && (
  <p className="mb-4 text-sm text-gray-600">
    Search results for{" "}
    <span className="font-semibold text-green-900">
      “{searchQuery}”
    </span>
  </p>
)}

          {/* SORT + COUNT */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-gray-600">
              {filteredProducts.length} products
            </p>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border px-3 py-2 rounded"
            >
              <option value="default">Sort by</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>

          {/* PRODUCTS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.length === 0 && (
              <p className="text-gray-500 col-span-full">
                No products found in this range.
              </p>
            )}

            {paginatedProducts.map((product) => {

              const discountedPrice = Math.round(
                product.price * (1 - product.discountPercent / 100)
              );

              const displayRating =
  product.numReviews > 0 ? product.rating : 4;

const displayReviews =
  product.numReviews > 0 ? product.numReviews : 3;


              return (
                <Link
                  key={product._id}
                  to={`/product/${product._id}`}
                  className="bg-orange-50 rounded-3xl p-5 border-2 border-orange-400 shadow-xl shadow-gray-400 hover:shadow-gray-500 hover:shadow-xl transition relative"
                >
                  {/* DISCOUNT BADGE */}
                  {product.discountPercent > 0 && (
                    <span className="absolute top-4 left-4 bg-green-700 text-white text-xs px-3 py-1 rounded-full z-10">
                      {product.discountPercent}% OFF
                    </span>
                  )}

                  {/* PRODUCT IMAGE */}
                  <img
                    src={product.images?.[0]}
                    alt={product.name}
                    className="w-full h-80 object-cover rounded-2xl mb-4 transition-all duration-300 ease-out
  hover:scale-105 shadow-lg shadow-gray-700"
                  />

                  <h3 className="text-green-900 font-medium">
                    {product.name}
                  </h3>

                  <div className="mt-2">
                    <span className="font-semibold">
                      ₹{discountedPrice}
                    </span>
                     {product.discountPercent > 0 && ( 
                      <span className="text-xs text-gray-400"> MRP</span>
                    )}
                    {product.discountPercent > 0 && (
                      <span className="text-xs text-gray-400 line-through">
                          ₹{product.price}
                      </span>
                    )}
                  </div>
                  {/* ⭐ RATING */}
<div className="flex items-center gap-1 mt-1">
  <div className="text-yellow-400 text-sm">
    {[...Array(5)].map((_, i) => (
      <span key={i}>
        {i < Math.round(displayRating) ? "★" : "☆"}
      </span>
    ))}
  </div>
  <span className="text-xs text-gray-500">
    ({displayReviews})
  </span>
</div>
                  
                </Link>
              );
            })}
          </div>


 {totalPages > 1 && (
  <div className="flex justify-center items-center gap-4 mt-12">
    {/* PREVIOUS */}
    <button
      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
      disabled={currentPage === 1}
      className={`px-5 py-2 rounded-full border 
        ${currentPage === 1
          ? "text-gray-400 border-gray-300 cursor-not-allowed"
          : "text-green-900 border-green-900 hover:bg-green-900 hover:text-white"
        }`}
    >
      Previous
    </button>

    {/* PAGE INFO */}
    <span className="text-sm text-gray-600">
      Page {currentPage} of {totalPages}
    </span>

    {/* NEXT */}
    <button
      onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
      disabled={currentPage === totalPages}
      className={`px-5 py-2 rounded-full border 
        ${currentPage === totalPages
          ? "text-gray-400 border-gray-300 cursor-not-allowed"
          : "text-green-900 border-green-900 hover:bg-green-900 hover:text-white"
        }`}
    >
      Next
    </button>
  </div>
)}

           

        </div>
      </div>



{/* ✅ SEPARATE CAROUSEL SECTION */}
<div className="bg-cream py-25">
  <ProductCarousel products={products.slice(0, 8)} />
<BestSellersCarousel products={products} />
<ImageCarousel />
</div>


      
    </div>
  );
  
}
