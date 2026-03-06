const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
// const ExpressError = require("../utils/ExpressError.js");
// const {listingSchema,reviewSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner , validateListing, validateReview} = require("../middleware.js");

const listingController = require("../controller/listing.js");

const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer( {storage}); 


//new route

router.get("/new",isLoggedIn,listingController.randerNewForm);


router .route("/")
.get(wrapAsync(listingController.index))
.post(
    isLoggedIn,
    // validateListing,
    upload.single('listing[image]'),
    wrapAsync(listingController.createListing)
    
  );

  
router  
    .route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn,isOwner, 
      upload.single('listing[image]'),
      // validateListing,
      wrapAsync(listingController.updateListing))
    .delete(isLoggedIn,isOwner,wrapAsync(listingController.deleteListing));


//edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.editListing));















// //Index route
// router.get("/", wrapAsync(listingController.index));

// //new route

// router.get("/new",isLoggedIn,listingController.randerNewForm);

// //show route
// router.get("/:id", wrapAsync(listingController.showListing));

// //create route
// router.post("/",isLoggedIn, validateListing , wrapAsync(listingController.createListing));



// //update route
// router.put("/:id",isLoggedIn,isOwner,validateListing,wrapAsync(listingController.updateListing));

// //delete route
// router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingController.deleteListing));

module.exports = router;