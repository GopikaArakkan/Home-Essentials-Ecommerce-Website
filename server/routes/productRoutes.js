import express from "express";
import Product from "../models/Product.js";
import mongoose from "mongoose";
import adminOnly from "../middleware/Admin.js";
import { protect } from "../middleware/AuthMiddleware.js";



const router = express.Router();


// DELETE a review (ADMIN only)
router.delete("/:id/reviews/:reviewId", adminOnly, async (req, res) => {

  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.reviews = product.reviews.filter(
      (r) => r._id.toString() !== req.params.reviewId
    );

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.length > 0
        ? product.reviews.reduce((acc, r) => acc + r.rating, 0) /
          product.reviews.length
        : 0;

    await product.save();

    res.json({ message: "Review deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


// ADMIN add/edit reply to review
router.put("/:id/reviews/:reviewId/reply", async (req, res) => {
  try {
    const { reply, adminName } = req.body;

    if (!reply || !reply.trim()) {
      return res.status(400).json({ message: "Reply cannot be empty" });
    }

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const review = product.reviews.id(req.params.reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });

    // ✅ ADD or EDIT (same logic)
    review.reply = reply;
    review.repliedBy = adminName;

    await product.save();

    res.json({
      message: "Reply updated",
      reviews: product.reviews, // 🔥 IMPORTANT
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});



// DELETE a question (ADMIN only)
router.delete("/:id/questions/:questionId", adminOnly, async (req, res) => {

  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.questions = product.questions.filter(
      (q) => q._id.toString() !== req.params.questionId
    );

    await product.save();

    res.json({ message: "Question deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


// ADMIN add/edit answer to question
router.put("/:id/questions/:questionId/answer", async (req, res) => {
  try {
    const { answer, adminName } = req.body;

    if (!answer || !answer.trim()) {
      return res.status(400).json({ message: "Answer cannot be empty" });
    }

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const question = product.questions.id(req.params.questionId);
    if (!question) return res.status(404).json({ message: "Question not found" });

    // ✅ ADD or EDIT
    question.answer = answer;
    question.answeredBy = adminName;

    await product.save();

    res.json({
      message: "Answer updated",
      questions: product.questions, // 🔥 IMPORTANT
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});




// POST product review
router.post("/:id/reviews", async (req, res) => {
  const { rating, comment } = req.body

  try {
    const product = await Product.findById(req.params.id)

    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }

    const review = {
      name: req.body.name || "Anonymous",
      rating: Number(rating),
      comment,
      createdAt: new Date(),
    }

    product.reviews.push(review)

    product.numReviews = product.reviews.length
    product.rating =
      product.reviews.reduce((acc, r) => acc + r.rating, 0) /
      product.reviews.length

    await product.save()

   res.status(201).json({
  message: "Review added successfully",
  reviews: product.reviews,
  rating: product.rating,
  numReviews: product.numReviews,
})

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})


// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
});


// POST a question (USER)
router.post("/:id/questions", async (req, res) => {
  try {
    const { question, user } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.questions.push({
      user,
      question,
    });

    await product.save();

    res.status(201).json({
      message: "Question submitted",
      questions: product.questions,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});



// GET single product
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});



// ===============================
// ADMIN: CREATE PRODUCT
// ===============================
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const product = new Product({
      user: req.user._id,
      name: req.body.name,
      images: req.body.images,
      price: req.body.price,
      discountPercent: req.body.discountPercent || 0,
      description: req.body.description,
      category: req.body.category,
      countInStock: req.body.countInStock,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: "Product creation failed" });
  }
});

// ===============================
// ADMIN: DELETE PRODUCT
// ===============================
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Delete failed" });
  }
});


// ===============================
// ADMIN: UPDATE PRODUCT
// ===============================
router.put("/:id", adminOnly, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = req.body.name || product.name;
    product.images = req.body.images || product.images;
    product.price = req.body.price || product.price;
    product.discountPercent =
      req.body.discountPercent ?? product.discountPercent;
    product.description = req.body.description || product.description;
    product.category = req.body.category || product.category;
    product.countInStock = req.body.countInStock || product.countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Product update failed" });
  }
});

// ===============================
// ADMIN: DELETE PRODUCT
// ===============================
router.delete("/:id", adminOnly, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Product delete failed" });
  }
});



// ✅ THIS LINE IS MANDATORY
export default router;
