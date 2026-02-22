import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import api from "../api";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
   const [activeTab, setActiveTab] = useState("description");

  const [showReviewForm, setShowReviewForm] = useState(false);
   const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);

  const [activeReviewTab, setActiveReviewTab] = useState("reviews");
  const [searchTerm, setSearchTerm] = useState("");

  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [questionText, setQuestionText] = useState("");

  const [reviews, setReviews] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [infoTab, setInfoTab] = useState("description");
 const { user } = useAuth();
const isAdmin = user?.isAdmin;



  const DEFAULT_REVIEWS = [
  {
    name: "Aarav Sharma",
    rating: 4,
    comment: "Beautiful quality, looks premium in my living room.",
  },
  {
    name: "Sneha Patel",
    rating: 5,
    comment: "Exactly as shown. Totally worth the price!",
  },
  {
    name: "Rahul Verma",
    rating: 4,
    comment: "Packaging was great and delivery was fast.",
  },
];


 


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/api/products/${id}`);
        setProduct(res.data);
        setReviews(res.data.reviews || []);
           // ✅ THIS LINE IS REQUIRED FOR QUESTIONS TAB
      setQuestions(res.data.questions || []);

       if (res.data.images && res.data.images.length > 0) {
  setMainImage(res.data.images[0]);
}

      } catch (err) {
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="bg-cream min-h-screen flex items-center justify-center">Loading product...</div>;
  if (error) return <div className="bg-cream min-h-screen flex items-center justify-center text-red-600">{error}</div>;
  if (!product) return null;
 /* ===== DELIVERY INFO ===== */
const orderedDate = new Date();

const deliveryDate = new Date();
deliveryDate.setDate(orderedDate.getDate() + 5); // 5 days delivery

  /* ===== RATING ===== */

const ratingBreakdown = (reviewsList) => {
  const breakdown = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  reviewsList.forEach((r) => {
    breakdown[r.rating] += 1;
  });

  return breakdown;
};

 const allReviews =
  reviews.length > 0 ? reviews : DEFAULT_REVIEWS;

  const breakdown = ratingBreakdown(allReviews);


 const averageRating =
  allReviews.length > 0
    ? (
        allReviews.reduce((sum, r) => sum + r.rating, 0) /
        allReviews.length
      ).toFixed(1)
    : 4;



  /* ===== DISCOUNT ===== */
  const hasDiscount = Number(product.discountPercent) > 0;
  const discountedPrice = hasDiscount
    ? Math.round(product.price * (1 - product.discountPercent / 100))
    : product.price;
  const savings = hasDiscount ? product.price - discountedPrice : 0;

  const images = product.images?.length ? product.images : [];

  


  const submitReviewHandler = async () => {
  try {
   await axios.post(`/api/products/${id}/reviews`, {
  name: user.name,   // ✅
  rating: reviewRating,
  comment: reviewText,
});


    setReviewText("");
    setReviewRating(5);
    setShowReviewForm(false);

    // 🔥 reload product so rating + reviews update
    const res = await api.get(`/api/products/${id}`);
    setProduct(res.data);
    setReviews(res.data.reviews || []);
  } catch (err) {
    alert("Failed to submit review");
  }
};


const deleteReviewHandler = async (reviewId) => {
  if (!window.confirm("Delete this review?")) return;

  try {
   await axios.delete(
  `/api/products/${id}/reviews/${reviewId}`,
  { headers: { "x-admin": true } }
);


    // reload product
    const res = await api.get(`/api/products/${id}`);
    setProduct(res.data);
    setReviews(res.data.reviews || []);
  } catch (err) {
    alert("Failed to delete review");
  }
};


const replyToReview = async (reviewId, reply) => {
  if (!reply.trim()) return;

  try {
    await axios.put(
      `/api/products/${id}/reviews/${reviewId}/reply`,
      {
        reply,
        adminName: user.name,
      },
      {
        headers: { "x-admin": true },
      }
    );

    const res = await api.get(`/api/products/${id}`);
    setReviews(res.data.reviews || []);
  } catch {
    alert("Failed to update reply");
  }
};




const deleteQuestionHandler = async (questionId) => {
  if (!window.confirm("Delete this question?")) return;

  try {
    await axios.delete(
      `/api/products/${id}/questions/${questionId}`,
      {
        headers: {
          "x-admin": true, // ✅ tells backend this is admin
        },
      }
    );

    // 🔄 reload product after delete
    const res = await api.get(`/api/products/${id}`);
    setProduct(res.data);
    setQuestions(res.data.questions || []);
  } catch (err) {
    alert("Failed to delete question");
  }
};




const submitQuestionHandler = async () => {
  try {
    await axios.post(`/api/products/${id}/questions`, {
      user: user?.name || "Anonymous",
      question: questionText,
    });

    const res = await api.get(`/api/products/${id}`);
    setQuestions(res.data.questions || []);

    setQuestionText("");
    setShowQuestionForm(false);
  } catch (err) {
    alert("Failed to submit question");
  }
};


const replyToQuestion = async (questionId, answer) => {
  if (!answer.trim()) return;

  try {
    await axios.put(
  `/api/products/${id}/questions/${questionId}/answer`,
  { answer, adminName: user.name },
  { headers: { "x-admin": true } }
);


    const res = await api.get(`/api/products/${id}`);
    setQuestions(res.data.questions || []);
  } catch {
    alert("Failed to reply to question");
  }
};


  return (
    <section className="bg-cream pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* TOP */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* LEFT IMAGES */}
          <div>
            <img src={mainImage} alt={product.name} className="w-full h-[420px] object-cover shadow-lg shadow-gray-700 rounded-2xl transition-all duration-300 ease-out
  hover:scale-90 hover:shadow-l grounded-3xl" />
            <div className="flex gap-4 mt-4">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  onClick={() => setMainImage(img)}
                className={` 
  w-20 h-20 
  rounded-xl 
  cursor-pointer 
  border 
  object-cover
  transition-all duration-300 ease-out
  hover:scale-105 hover:shadow-lg
  ${mainImage === img ? "ring-2 ring-orange-400 scale-105" : "border-gray-200"}
`}
                />
              ))}
            </div>
          </div>

          

          {/* RIGHT INFO */}
          <div>
            <h1 className="text-4xl font-serif text-green-900">{product.name}</h1>

            <div className="flex items-center gap-3 my-3">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>{i < Math.round(averageRating) ? "★" : "☆"}</span>
                ))}
              </div>
              <span className="text-sm text-gray-600"> {averageRating} ({reviews.length > 0 ? reviews.length : 3} reviews)</span>
            </div>

            <p className="text-3xl font-semibold">
              ₹{discountedPrice}
               {hasDiscount && (<span className="ml-2 text-gray-500"> MRP </span>)}
              {hasDiscount && <span className="ml-2 line-through text-gray-400"> ₹{product.price}</span>}
            </p>

            {hasDiscount && (
              <>
                <p className="text-red-500 font-medium">{product.discountPercent}% OFF</p>
                <p className="text-green-700">You save ₹{savings}</p>
              </>
            )}

            <p className="my-6 text-gray-600">{product.description}</p>
            
            <p className="font-medium text-green-700">
              {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
            </p>
            
            {product.countInStock > 0 && (
  <div className="mt-3 space-y-1">
    <p className="text-sm text-gray-600">
      Ordered on: {orderedDate.toDateString()}
    </p>

    <p className="text-sm text-green-700">
      Expected Delivery: {deliveryDate.toDateString()}
    </p>
  </div>
)}



           <span>Quantity: </span>
            <select
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}

              className="border mt-4 px-3 py-2 rounded"
            >
              {[...Array(product.countInStock).keys()].map(x => (
                <option key={x + 1}>{x + 1}</option>
              ))}
            </select>

           <div className="flex gap-4 mt-6">

  {/* ADD TO CART */}
  <button
    onClick={() => {
      addToCart({
        ...product,
        image: product.images?.[0],
        price: discountedPrice,
        originalPrice: product.price,
        discountPercent: product.discountPercent,
        qty,
      });
      navigate("/cart");
    }}
    className="bg-yellow-400 px-8 py-3 rounded-full hover:bg-yellow-600 hover:text-white"
  >
    Add to Cart
  </button>

  {/* BUY NOW */}
  <button
    onClick={() => {
      addToCart({
        ...product,
        image: product.images?.[0],
        price: discountedPrice,
        originalPrice: product.price,
        discountPercent: product.discountPercent,
        qty,
      });
      navigate("/checkout");
    }}
    className="bg-green-700 text-white px-8 py-3 rounded-full hover:bg-green-800"
  >
    Buy Now
  </button>
</div>



          </div>
        </div>


{/* PRODUCT INFO TABS */}
<div className="mt-10">
  <div className="flex gap-10 flex-wrap border-b pb-4">
    {[
      "description",
      "features",
      "sizing",
      "care",
      "warranty",
    ].map(tab => (
      <button
        key={tab}
        onClick={() => setInfoTab(tab)}
        className={`px-20 py-2 rounded-full border text-sm ${
          infoTab === tab
            ? "bg-green-900 text-white"
            : "bg-white text-gray-700"
        }`}
      >
        {tab.replace("-", " ")}
      </button>
    ))}
  </div>

  <div className="mt-6 text-gray-600 leading-relaxed">
    {infoTab === "description" && <p>{product.description}<br/>✔ Furnishings and lighting play a crucial role in creating a comfortable and inviting living space.
Furnishings include a variety of items such as sofas, chairs, tables, and storage solutions that enhance the aesthetics and functionality of a room. They can be designed to fit different styles, from modern to traditional, and are essential for creating a cozy atmosphere. 

<br/>✔Lighting is not just functional; it also defines the ambiance and mood of a space. In 2025, lighting trends focus on sustainability and smart technology, with options like LED lighting and smart fixtures that allow for remote control. 

<br/>✔Design considerations for furnishing and lighting include comfort, durability, and the ability to organize spaces effectively. Choosing the right pieces can significantly impact the overall look and feel of a room.</p>}
    {infoTab === "features" && (
      <p>✔ Premium quality materials<br />✔ Long lasting finish<br />✔ Eco-friendly design 
      <br/>The features of furniture and lights are designed to enhance both functionality and aesthetics. Here are some key features to consider when selecting furniture and lighting for your home:
<br/>✔Energy Efficiency: Look for LED lights and energy-efficient furniture options to save on energy costs and reduce environmental impact. 

<br/>✔Material Quality: Choose furniture made from durable materials like mango wood, teak wood, or engineered wood for long-lasting and low-maintenance pieces. 

<br/>✔Design Aesthetics: Consider the design aesthetics of the furniture and lighting. Modern chandeliers, contemporary pendant lights, and warm wall sconces can add a touch of sophistication to your space. 

<br/>✔Smart Technology: Smart lighting systems allow for remote control and automation, providing convenience and energy savings. 

<br/>✔Versatility: Look for furniture and lighting that can be used in various rooms, such as versatile living room furniture or adjustable task lighting for different activities. 


By focusing on these features, you can create a home that is not only functional but also visually appealing and environmentally conscious.</p>
      
    )}
    {infoTab === "sizing" && <p>Lighting Dimensions may vary by 1–2 cm.<br/> ✔Seus Lighting: Use their Chandelier Size Calculator to determine the ideal size based on your room dimensions. 

<br/>✔Carolina Lanterns & Lighting: This guide helps you size and place chandeliers based on room size and furniture. 

<br/>✔Lightology: Their wizard applies accepted lighting design techniques to recommend chandelier sizes for various spaces. 

<br/>✔Maxim Lighting: Another Chandelier Size Calculator to help you find the correct size for your room. 

<br/>Standard Furniture Dimensions<br/>
✔Sofas: Typically, sofas have a seat height of 16–18 inches and a depth of 22+ inches for lounging comfort.
<br/>✔Dining Tables: Standard dining table height is 28–30 inches, with chairs having a seat height of 17–19 inches to maintain ergonomic alignment.
<br/>✔Wardrobes: Common dimensions are 72–96 inches high, 24–30 inches deep, and 36–72 inches wide.
<br/>✔Coffee Tables: These usually stand at 16–18 inches high and should be placed 30 inches away from the sofa for easy access. 
</p>}
    {infoTab === "care" && <p>Care of Lightings<br/>
✔Regular Dusting: Use a feather duster or microfiber cloth to gently remove dust from all parts of the chandelier. 

<br/>✔Deep Cleaning: For a thorough clean, turn off the power, remove crystals if applicable, and clean with a mild solution of dish soap and warm water. 

<br/>✔Inspect Bulbs and Wiring: Regularly check for burned-out or flickering bulbs and inspect the wiring for any damage. 

<br/>✔Tighten Screws and Fixtures: Periodically check that all components are securely fastened to avoid accidents. 

<br/>Care of Furniture<br/>
Proper care of furniture is essential to maintain its beauty and longevity. Here are some key points to consider:<br/>
✔Regular Cleaning: Use a soft, lint-free cloth to dust surfaces regularly. For deeper cleaning, use a wood cleaner or a mixture of mild soap and water. Avoid soaking the wood and dry it immediately. 

<br/>✔Avoid Sunlight: Keep furniture away from direct sunlight to prevent fading and cracking. Use curtains or blinds to block direct sunlight during peak hours. 

<br/>✔Use Mats and Coasters: Protect surfaces from moisture rings and heat damage caused by cups and glasses. Coasters and placemats can prevent scratches and spills on dining tables. 

<br/>✔Regular Maintenance: Dust accumulation can scratch wood surfaces. Make dust-free your furniture three to four times a month by using a soft, lint-free cloth or a microfiber duster. 

<br/>✔Appropriate Cleaning Products: Avoid all-purpose and harsh chemical cleaners. Instead, use mild soap and water or wood-specific cleaners. 


By following these tips, you can ensure that your furniture remains in pristine condition for years to come.</p>}
    {infoTab === "warranty" && <p>✔IKEA: Offers a warranty policy of 5 years, but specific details are not provided in the result. 

<br/>✔URBAN LADDER: Provides a 1-year limited warranty on all chandelier and lighting products purchased through their store. If there is an electrical failure due to a manufacturer defect within 12 months, they will repair or replace the affected component at no charge. 

<br/>✔PEPPERFRY: Offers a 2-3 year limited warranty starting from the date of delivery, covering defects in materials and workmanship. They do not cover damage caused by improper installation or neglect. 

<br/>✔HOME CENTER: Guarantees their chandeliers for one year against defects in materials and workmanship. They will repair or replace defective components during this period. </p>}
  </div>
</div>



        {/* REVIEWS & QUESTIONS */}
        <div className="mt-24">
          <div className="flex gap-6 border-b mb-6">
            {["reviews", "questions"].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveReviewTab(tab)}
                className={`pb-2 ${activeReviewTab === tab ? "border-b-2 border-green-900" : ""}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeReviewTab === "reviews" && (
            <>
              <input
                placeholder="Search reviews"
                className="border px-3 py-2 rounded mb-6"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              {/* ⭐ RATING BREAKDOWN */}
<div className="max-w-md mb-10">
  {[5, 4, 3, 2, 1].map((star) => (
    <div key={star} className="flex items-center gap-3 mb-2">
      <span className="w-10 text-sm">{star} ★</span>

      <div className="flex-1 bg-gray-200 h-2 rounded">
        <div
          className="bg-yellow-400 h-2 rounded"
          style={{
            width: `${
              allReviews.length
                ? (breakdown[star] / allReviews.length) * 100
                : 0
            }%`,
          }}
        />
      </div>

      <span className="w-6 text-sm text-gray-600">
        {breakdown[star]}
      </span>
    </div>
  ))}
</div>


              <div className="flex gap-6 overflow-x-auto">
                {allReviews
                  .filter(r => r.comment.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((r) => (
  <div
    key={r._id || r.comment}
 className="relative min-w-[300px] transition bg-gray-100 shadow-lg hover:shadow-2xl hover:-translate-y-1 p-5 rounded-xl"

             //only admin can delete the review(at top const admin=true)
  >
    {/* admin delete */}
    {isAdmin && r._id && (
      <button
        onClick={() => deleteReviewHandler(r._id)}
        className="absolute top-2 right-2 text-red-500 text-sm"
      >
        ✕
      </button>
    )}            
 <h4 className="font-medium">{r.name}</h4>
  <div className="text-yellow-400">{"★".repeat(r.rating)}</div>
  <p>{r.comment}</p>

 
 {/* USER VIEW */}
{!isAdmin && r.reply && (
  <p className="mt-2 text-green-700 text-sm">
    <strong>Admin:</strong> {r.reply}
  </p>
)}

{/* ADMIN EDITABLE REPLY */}
{isAdmin && (
  <div className="mt-3">
    <textarea
      defaultValue={r.reply || ""}
      placeholder="Admin reply..."
      className="border w-full p-2 rounded text-sm"
      onBlur={(e) => replyToReview(r._id, e.target.value)}
    />
  </div>
)}

  </div>
 ))}
 </div>
  </>
  )}



          {activeReviewTab === "questions" && (
            <div className="space-y-4">
              {questions.length === 0 && <p className="text-gray-500">No questions yet.</p>}
             {questions.map((q) => (
  <div
    key={q._id}
    className="relative bg-white p-4 rounded-xl"
  >
    {/* ❌ DELETE QUESTION (ADMIN) */}
    {isAdmin && (
      <button
        onClick={() => deleteQuestionHandler(q._id)}
        className="absolute top-2 right-2 text-red-500 text-sm"
      >
        ✕
      </button>
    )}

    {/* QUESTION */}
    <p className="font-medium">Q: {q.question}</p>

    {/* USER VIEW (READ ONLY) */}
    {!isAdmin && q.answer && (
      <p className="text-green-700 mt-2">
        A: {q.answer}
      </p>
    )}

    {/* ADMIN REPLY (EDITABLE + SAVE BUTTON) */}
    {isAdmin && (
      <div className="mt-3">
        <textarea
          value={q.answerDraft || q.answer || ""}
          placeholder="Admin answer..."
          className="border w-full p-2 rounded text-sm"
          onChange={(e) =>
            setQuestions((prev) =>
              prev.map((item) =>
                item._id === q._id
                  ? { ...item, answerDraft: e.target.value }
                  : item
              )
            )
          }
        />

        <button
          className="mt-2 bg-green-900 text-white px-3 py-1 rounded text-sm"
          onClick={() => replyToQuestion(q._id, q.answerDraft)}
        >
          Save Reply
        </button>
      </div>
    )}
  </div>
))}

            </div>
          )}




          <div className="mt-6 flex gap-3">
            <button onClick={() => setShowQuestionForm(true)} className="border px-4 py-2 rounded">
              Ask a Question
            </button>
            <button
    disabled={!user}
    onClick={() => setShowReviewForm(true)}
    className={`border px-4 py-2 rounded ${
      !user && "opacity-50 cursor-not-allowed"
    }`}
  >
    Write a Review
  </button>

  {!user && (
    <span className="text-sm text-gray-500 self-center">
      Login to write a review
    </span>
  )}

          </div>
        </div>
      </div>

      {/* QUESTION MODAL */}
      {showQuestionForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <textarea
              className="border w-full p-3 h-28"
              placeholder="Ask your question..."
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
            />
            <div className="flex justify-end gap-3 mt-4">
              <button onClick={() => setShowQuestionForm(false)}>Cancel</button>
             <button
  onClick={submitQuestionHandler}
  className="bg-green-900 text-white px-4 py-2 rounded"
>
  Submit
</button>

            </div>
          </div>
        </div>
      )}

{showReviewForm && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
    <div className="bg-white p-6 rounded-xl w-full max-w-md">
      <textarea
        className="border w-full p-3 h-28"
        placeholder="Write your review..."
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
      />

      <select
        className="border w-full mt-4 p-2"
        value={reviewRating}
        onChange={(e) => setReviewRating(Number(e.target.value))}
      >
        {[5,4,3,2,1].map(r => (
          <option key={r} value={r}>{r} Stars</option>
        ))}
      </select>

      <div className="flex justify-end gap-3 mt-4">
        <button onClick={() => setShowReviewForm(false)}>Cancel</button>
        <button
          onClick={submitReviewHandler}
  className="bg-green-900 text-white px-4 py-2 rounded"
>
          Submit
        </button>
      </div>
    </div>
  </div>
)}


    </section>
  );
}
