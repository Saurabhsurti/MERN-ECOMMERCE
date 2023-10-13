const express = require("express");
const router = express.Router();
const Product = require("../model/product");
const ErrorHandler = require("../utils/ErrorHandler");
const Shop = require("../model/shop");
const { upload } = require("../multer");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { isSeller, isAdmin, isAuthenticated } = require("../middleware/auth");
const Event = require("../model/event");
const fs = require("fs");

// create event
router.post("/create-event",upload.array("images"), catchAsyncErrors(async(req,res,next) => {
    try {
        const shopId = req.body.shopId;
        const shop = await Shop.findById(shopId);
        if(!shop){
            return next(new ErrorHandler("Shop Id is Invalid", 400));
        }
        else{
            const files = req.files;
            const imageUrls = files.map((file) => `${file.filename}`)
            const eventData = req.body;
            eventData.images = imageUrls;
            eventData.shop = shop;

            const product = await Event.create(eventData);

            res.status(201).json({
              success:true,
              product,
            })
        }

    } catch (error) {
        return next(new ErrorHandler(error, 400));
    }
}))

// get all events
router.get("/get-all-events",async(req, res, next) => {
  try {
    const events = await Event.find();
    res.status(201).json({
      success: true,
      events,
    })
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
})

// get all events of a shop
router.get(
  "/get-all-events/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const events = await Event.find({ shopId: req.params.id });

      res.status(201).json({
        success: true,
        events,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// delete event of a shop
router.delete(
  "/delete-shop-event/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const eventData = await Event.findById(req.params.id);



      

      // for (let i = 0; 1 < product.images.length; i++) {
      //   const result = await cloudinary.v2.uploader.destroy(
      //     event.images[i].public_id
      //   );
      // }
      eventData.images.forEach((imageUrl) => {
          const filename = imageUrl;
          const filePath = `uploads/${filename}`
          fs.unlink(filePath, (err) => {
            if(err){
              console.log(err);
            }
          });
        });

        const event = await Event.findByIdAndDelete(req.params.id);
        
        if (!event) {
        return next(new ErrorHandler("Event is not found with this id", 404));
      }    
      // await event.remove();

      res.status(201).json({
        success: true,
        message: "Event Deleted successfully!",
      });

    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// all events --- for admin
router.get(
  "/admin-all-events",
  isAuthenticated,
  isAdmin("admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const events = await Event.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        events,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;