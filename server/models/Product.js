import mongoose from "mongoose";

/* -------------------- REVIEW SCHEMA -------------------- */
const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },

    // ✅ ADMIN REPLY
    reply: {
      type: String,
      default: "",
    },
    repliedBy: {
      type: String,
    },
  },
  { timestamps: true }
);

/* -------------------- QUESTION SCHEMA -------------------- */
const questionSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },     // who asked
    question: { type: String, required: true },
    answer: { type: String },                   // admin reply
    answeredBy: { type: String },               // admin name/email
  },
  { timestamps: true }
);


/* -------------------- PRODUCT SCHEMA -------------------- */
const productSchema = new mongoose.Schema(
  {

    user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true,
},
    /* BASIC INFO */
    name: { type: String, required: true },

    images: {
      type: [String],
      required: true,
      validate: [(arr) => arr.length > 0, "At least one image required"],
    },

    price: { type: Number, required: true },

    discountPercent: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    description: { type: String, required: true },
    category: { type: String, required: true },

    countInStock: { type: Number, required: true },

    /* FILTERABLE FIELDS */
   /* FILTERABLE FIELDS */
brand: String,
material: String,
energy: String,
color: String,
style: String,
type: String,
design: String,
configuration: String, // ✅ ADD THIS


    /* KITCHEN-SPECIFIC */
cookware: String,
containers: String,
kitchenware: String,
appliances: String,


    /* RECLINER-SPECIFIC */
    mechanism: String,
  

    /* REVIEWS */
    reviews: [reviewSchema],
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },

    /* QUESTIONS */
    questions: [questionSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
