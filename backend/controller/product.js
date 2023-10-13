const express = require("express");
const router = express.Router();
const Order = require("../model/order");
const Product = require("../model/product");
const ErrorHandler = require("../utils/ErrorHandler");
const Shop = require("../model/shop");
const { upload } = require("../multer");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");
const fs = require("fs");

// create product
router.post("/create-product",upload.array("images"), catchAsyncErrors(async(req,res,next) => {
    try {
        const shopId = req.body.shopId;
        const shop = await Shop.findById(shopId);
        if(!shop){
            return next(new ErrorHandler("Shop Id is Invalid", 400));
        }
        else{
          
            const files = req.files;
            const imageUrls = files.map((file) => `${file.filename}`)

            const productData = req.body;
            productData.images = imageUrls;
            productData.shop = shop;

            const product = await Product.create(productData);
            // console.log("All products at bacck",product)
            res.status(201).json({
              success:true,
              product,
            })
        }

    } catch (error) {
        return next(new ErrorHandler(error, 400));
    }
}))

// // get all products of a shop
// router.get(
//   "/get-all-products-shop/:id",
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       // console.log(req.params.id)
//       const products = await Product.find({ shopId: req.params.id });
//       console.log("Controller",products)
//       res.status(201).json({
//         success: true,
//         products,
//       });
//     } catch (error) {
//       return next(new ErrorHandler(error, 400));
//     }
//   })
// );

// get all products of a Shop
router.get(
  "/get-all-products-shop/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Check if :id parameter is undefined or not a valid ObjectId
      if (!req.params.id || !mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid shop ID provided.",
        });
      }

      console.log("Shop ID for shop:", req.params.id);
      const products = await Product.find({ shopId: req.params.id });
      console.log("Products for shop:", products);
      // Check if products is empty and handle accordingly
      if (products.length === 0) {
        // Handle empty products
        // Respond with an appropriate message or status code
        return res.status(404).json({ success: false, message: "No products found." });
      }

      // If products are available, send the response
      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);


// // delete product of a shop
router.delete(
  "/delete-shop-product/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const productId = req.params.id
      const productData = await Product.findById(productId);
      productData.images.forEach((imageUrl) => {
        const filename = imageUrl;
        const filePath = `uploads/${filename}`
        fs.unlink(filePath, (err) => {
          if(err){
            console.log(err);
          }
        });
      });

      const product = await Product.findByIdAndDelete(productId);

      if (!product) {
        return next(new ErrorHandler("Product is not found with this id", 500));
      }    
      res.status(201).json({
        success: true,
        message: "Product Deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

//get all products
router.get(
  "/get-all-products",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find().sort({ createdAt: -1 });
      // console.log("Get All",products)
      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// // review for a product
router.put(
  "/create-new-review",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { user, rating, comment, productId, orderId } = req.body;

      const product = await Product.findById(productId);

      const review = {
        user,
        rating,
        comment,
        productId,
      };

      const isReviewed = product.reviews.find(
        (rev) => rev.user._id === req.user._id
      );

      if (isReviewed) {
        product.reviews.forEach((rev) => {
          if (rev.user._id === req.user._id) {
            (rev.rating = rating), (rev.comment = comment), (rev.user = user);
          }
        });
      } else {
        product.reviews.push(review);
      }

      let avg = 0;

      product.reviews.forEach((rev) => {
        avg += rev.rating;
      });

      product.ratings = avg / product.reviews.length;

      await product.save({ validateBeforeSave: false });

      await Order.findByIdAndUpdate(
        orderId,
        { $set: { "cart.$[elem].isReviewed": true } },
        { arrayFilters: [{ "elem._id": productId }], new: true }
      );

      res.status(200).json({
        success: true,
        message: "Reviwed succesfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// all products --- for admin
router.get(
  "/admin-all-products",
  isAuthenticated,
  isAdmin("admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;