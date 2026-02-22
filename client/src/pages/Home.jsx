import api from "../api"
import { useEffect, useState } from "react"

import HeroSection from "../components/HeroSection"
import ShopSection from "../components/ShopSection"
import AboutUsSection from "../components/AboutUsSection"
import ProductCarousel from "../components/ProductCarousel"
import ImageCarousel from "../components/ImageCarousel"
import GallerySection from "../components/GallerySection"
import ContactSection from "../components/ContactSection"
import FooterSection from "../components/FooterSection"
import Brands from "../components/Brands"
import BestSellersCarousel from "../components/BestSellersCarousel"

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchProducts = async () => {
      try {
      
     const res = await api.get("/api/products");



        if (Array.isArray(res.data)) {
          setProducts(res.data)
        } else {
          throw new Error("Invalid API response")
        }
      } catch (err) {
        console.error("API error:", err)
        setError("Failed to load products")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

console.log("HOME PRODUCTS:", products);
console.log("HOME LOADING:", loading);
console.log("HOME ERROR:", error);



  return (
    <>
      {/* HERO */}
      <HeroSection />

      {/* SHOP SECTION */}
      <ShopSection />

      {/* ABOUT US */}
      <AboutUsSection />

      {/* BEST SELLERS */}
      {!loading && !error && products.length > 0 && (
  <BestSellersCarousel products={products} />
)}


      {/* ALL PRODUCTS CAROUSEL */}
      <section className="bg-cream px-4 py-14">
        <div className="max-w-8xl mx-auto min-h-100">

          {loading && (
            <p className="text-gray-500">Loading products...</p>
          )}

          {error && (
            <p className="text-red-600">{error}</p>
          )}

          {!loading && !error && products.length > 0 && (
            <ProductCarousel products={products} />
          )}
        </div>
      </section>

      {/* IMAGE CAROUSEL */}
      <ImageCarousel />

      {/* GALLERY */}
      <GallerySection />

      {/* BRANDS */}
      <Brands />

      {/* CONTACT */}
      <ContactSection />

      {/* FOOTER */}
      <FooterSection />
    </>
  )
}
