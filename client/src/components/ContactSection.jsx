
import { useState } from "react";


  


export default function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section id="contact" className="bg-cream py-24">
      <div className="max-w-8xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT IMAGE */}
         <div className="rounded-3xl overflow-hidden h-200">
  <img
    src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6"
    alt="Nature"
    className="w-full h-full object-cover"
  />
</div>

          {/* RIGHT CONTENT */}
          <div>
           {/* SMALL LABEL */}
<p className="text-sm tracking-wide text-primary mb-2">
  Contact Us
</p>

{/* MAIN HEADING */}
<h2 className="text-4xl md:text-6xl font-serif text-green-900 mb-6">
  Get in Touch
</h2>

{/* DESCRIPTION */}
<p className="text-gray-700 max-w-lg">
  Have a question or want to learn more about our products?  
  Feel free to reach out to us.
</p>
<br/><br/>

 <form
  className="space-y-6"
  onSubmit={(e) => {
    e.preventDefault();

    alert("Message sent successfully!");

    // ✅ CLEAR FORM
    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      address: "",
      message: "",
    });
  }}
>



  {/* NAME */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <label className="block text-sm text-gray-700 mb-2">
        First name *
      </label>
     <input
  type="text"
  name="firstName"
  value={formData.firstName}
  onChange={handleChange}
  required
  className="w-full bg-green-200 rounded-xl px-4 py-3 focus:outline-none"
/>

    </div>

    <div>
      <label className="block text-sm text-gray-700 mb-2">
        Last name *
      </label>
      <input
  type="text"
  name="lastName"
  value={formData.lastName}
  onChange={handleChange}
  required
  className="w-full bg-green-200 rounded-xl px-4 py-3 focus:outline-none"
/>

    </div>
  </div>

  {/* CONTACT */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <label className="block text-sm text-gray-700 mb-2">
        Phone *
      </label>
     <input
  type="tel"
  name="phone"
  value={formData.phone}
  onChange={handleChange}
  required
  className="w-full bg-green-200 rounded-xl px-4 py-3 focus:outline-none"
/>

    </div>

    <div>
      <label className="block text-sm text-gray-700 mb-2">
        Email *
      </label>
      <input
  type="email"
  name="email"
  value={formData.email}
  onChange={handleChange}
  required
  className="w-full bg-green-200 rounded-xl px-4 py-3 focus:outline-none"
/>

    </div>
  </div>

  {/* ADDRESS */}
  <div>
    <label className="block text-sm text-gray-700 mb-2">
      Address *
    </label>
    <input
  type="text"
  name="address"
  value={formData.address}
  onChange={handleChange}
  required
  className="w-full bg-green-200 rounded-xl px-4 py-3 focus:outline-none"
/>

  </div>

  {/* MESSAGE */}
  <div>
    <label className="block text-sm text-gray-700 mb-2">
      Message *
    </label>
    <textarea
  rows="4"
  name="message"
  value={formData.message}
  onChange={handleChange}
  required
  className="w-full bg-green-200 rounded-xl px-4 py-3 focus:outline-none resize-none"
/>

  </div>

  {/* BUTTON */}
  <button
    type="submit"
    className="bg-green-200 text-green-900 px-10 py-4 rounded-full text-sm font-medium hover:bg-green-900 border hover:text-white border-green-300 transition"
  >
    Send Message
  </button>

</form>


          </div>
        </div>
      </div>
    </section>
  )
}
