import { IoLogoYoutube } from "react-icons/io"; 


import { ImFacebook } from "react-icons/im"; 
import { BsInstagram } from "react-icons/bs"; 

import { GrTwitter } from "react-icons/gr"; 
import { Link } from "react-router-dom"
import { useState } from "react"

const policyData = {
  privacy: {
    title: "Privacy Policy",
    content:
      "We respect your privacy. All personal information is kept confidential and used only to improve our services."
  },
  accessibility: {
    title: "Accessibility Statement",
    content:
      "Classy. Nest is committed to ensuring digital accessibility for all users, including those with disabilities."
  },
  shipping: {
    title: "Shipping Policy",
    content:
      "To ensure timely delivery, please confirn and keep your shipping address up-to-date in Your orders. Orders are processed within 4–5 business days. Shipping timelines may vary based on location.<br/>Any queries please contact us, we are here 24/7 to help you."
  },
  terms: {
    title: "Terms & Conditions",
    content:
      "By accessing this website, you agree to comply with our terms, conditions, and policies."
  },
  refund: {
    title: "Refund Policy",
    content:
      "Defective, Physical damage, Wrong and Missing item - 10 days from delivery- full refund and replacement. Any other reason- 10 days from delivery- Full refund. Refunds will be processed within 7 business days after approval."
  },
  secure: {
    title: "Secure Transactions",
    content:
      "We work hard to protect your security and privacy. Our payment security system encrypts your information during transmission. we dont share your credit card details with third party sellers, and we dont sell your infornmation to others. "
  },
  delivered: {
    title: "Delivered",
    content:
      "Order processed by Classy.Nest; delievred through our courier patners . "
  },
   topbrand: {
    title: " 🏆Top Brand",
    content:
      "Top Brand indicates high quality, trusted brands on Classy.Nest aggregated basis verified ratings, returns/refunds and refunds order history at brand level. "
  },
  help: {
    title: "Help ",
    content:
      "Go to contact section and mail "
  }
};


export default function FooterSection() {

  const [activePolicy, setActivePolicy] = useState(null);

  return (
    <section className="bg-cream py-1">
      <div className="max-w-8xl mx-auto px-6 space-y-10">

        {/* TOP ROW */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* LEFT CARD */}
          <div className="bg-[#245b2a] rounded-3xl p-12 text-white flex flex-col justify-between">
            <div>
              <Link
      to="/"
              className="px-4 py-2 font-bold text-4xl rounded-lg mr-3 text-transparent bg-gradient-to-r from-yellow-500 to-gray-200"
               style={{ WebkitBackgroundClip: "text", backgroundClip: "text" }}>🪶Classy.Nest.
               </Link>
              <div className="w-24 h-px bg-white/50 mb-6" />

             {/* SOCIAL ICONS */}
<div className="flex gap-4">
  <a
    href="https://twitter.com"
    target="_blank"
    rel="noopener noreferrer"
   className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-md text-[#1DA1F2] transition-all duration-300 hover:bg-[#1DA1F2] hover:text-white hover:shadow-xl hover:-translate-y-1 cursor-pointer"
  >
     <GrTwitter className="text-xl" />
  </a>

  <a
    href="https://instagram.com"
    target="_blank"
    rel="noopener noreferrer"
   className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-md text-[#1DA1F2] transition-all duration-300 hover:bg-[#1DA1F2] hover:text-white hover:shadow-xl hover:-translate-y-1 cursor-pointer"
  ><BsInstagram className="text-xl"/>
  
  </a>

  <a
    href="https://facebook.com"
    target="_blank"
    rel="noopener noreferrer"
    className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-md text-[#1DA1F2] transition-all duration-300 hover:bg-[#1DA1F2] hover:text-white hover:shadow-xl hover:-translate-y-1 cursor-pointer"
  >
   <ImFacebook className="text-xl"/>
  </a>

   <a
    href="https://youtube.com"
    target="_blank"
    rel="noopener noreferrer"
    className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-md text-[#1DA1F2] transition-all duration-300 hover:bg-[#1DA1F2] hover:text-white hover:shadow-xl hover:-translate-y-1 cursor-pointer"
  >
  <IoLogoYoutube className="text-xl"/>
  </a>
</div>

            </div>
          </div>

          {/* RIGHT CARD */}
        {/* RIGHT CARD */}
<div
  className="
    bg-linear-to-br from-lime-600 to-lime-100 rounded-3xl p-12 text-gray-900 flex flex-col justify-center space-y-6 shadow-[0_25px_60px_rgba(0,0,0,0.18)] hover:shadow-[0_35px_80px_rgba(0,0,0,0.25)] hover:-translate-y-1 transition-all duration-300">
  <p className="text-lg font-medium tracking-wide">
     ☎️0824-438647, 0824-448386, 0824-2418647<br/><br/>
     📞+91 8147596578, +91 7795478931, +91 9576148620
  </p>

  <p className="text-lg font-medium tracking-wide">
    ✉️ classy.nest@mysite.com
  </p>

  <p className="text-lg leading-relaxed font-medium text-gray-800">
    📍 Classy Nest, 8th West Cross, Mangalore, Karnataka - 575001
    
  </p>
</div>


        </div>



        {/* BOTTOM ROW */}
       {/* BOTTOM ROW */}
<div
  className="
    bg-[#245b2a]
    rounded-3xl
    p-12
    text-white
    grid
    grid-cols-1
    md:grid-cols-3
    gap-10
  "
>

 
  

  {/* COLUMN 2 — BRAND / TRUST */}
 
 <div className="flex flex-col md:flex-row md:flex-nowrap justify-between gap-8 md:gap-40 text-center md:text-left">

    
    {/* COLUMN 1 — LOGO */}
   <div className="flex-shrink-0 flex justify-center md:justify-start">

      <Link
        to="/"
        className="px-4 py-2 font-bold text-4xl rounded-lg mr-3
                   text-transparent bg-gradient-to-r from-yellow-500 to-gray-200"
        style={{ WebkitBackgroundClip: "text", backgroundClip: "text" }}
      >
        🪶Classy.Nest.
      </Link>
    </div>

    {/* COLUMN 2 — POLICIES */}
    <div className="space-y-3 text-sm min-w-[160px]">
      <h4 className="font-semibold text-lg mb-2">Policies</h4>
      <button onClick={() => setActivePolicy("privacy")} className="block hover:underline">Privacy Policy</button>
      <button onClick={() => setActivePolicy("accessibility")} className="block hover:underline">Accessibility Statement</button>
      <button onClick={() => setActivePolicy("shipping")} className="block hover:underline">Shipping Policy</button>
      <button onClick={() => setActivePolicy("terms")} className="block hover:underline">Terms & Conditions</button>
    </div>

    {/* COLUMN 3 — BRAND / TRUST */}
    <div className="space-y-3 text-sm min-w-[160px]">
      <h4 className="font-semibold text-lg mb-2">Classy.Nest</h4>
      <button onClick={() => setActivePolicy("refund")} className="block hover:underline">Refund Policy</button>
      <button onClick={() => setActivePolicy("secure")} className="block hover:underline">Secure Transactions</button>
      <button onClick={() => setActivePolicy("delivered")} className="block hover:underline">Classy.Nest Delivered</button>
      <button onClick={() => setActivePolicy("topbrand")} className="block hover:underline">Top Brand</button>
    </div>

    {/* COLUMN 4 — COPYRIGHT */}
   <div className="text-sm flex items-center justify-center md:justify-end min-w-[160px]">

      <p className="opacity-90 leading-relaxed">
        © 2035 by <span className="font-semibold">Classy.Nest</span> <br />
        All rights reserved.
      </p>
    </div>
  </div>



</div>


      </div>
      {/* POLICY MODAL */}
{activePolicy && (
  <div
    className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
    onClick={() => setActivePolicy(null)}
  >
    <div
      className="bg-white rounded-2xl p-8 max-w-lg w-full text-[#245b2a] relative"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Close button */}
      <button
        onClick={() => setActivePolicy(null)}
        className="absolute top-4 right-4 text-xl font-bold"
      >
        ✕
      </button>

      <h2 className="text-2xl font-semibold mb-4">
        {policyData[activePolicy].title}
      </h2>

      <p className="text-sm leading-relaxed">
        {policyData[activePolicy].content}
      </p>
    </div>
  </div>
)}

    </section>
  )
}
