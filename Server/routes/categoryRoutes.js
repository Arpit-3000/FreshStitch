const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const LaundryCategory = require("../models/services/laundrycategorySchema");
const TailoringCategory = require("../models/services/tailoringCategorySchema");
const Lehenga = require("../models/tailoring_items/lehengaSchema");
const Jumpsuit = require("../models/tailoring_items/jumpsuitSchema");
const SalwarSuit = require("../models/tailoring_items/salwarsuitSchema");
const Shirt = require("../models/tailoring_items/shirtSchema");

            // -- MEN's Wear Routes
router.get("/mensWear", async (req, res) => {
  try {
    const mensCategory = await LaundryCategory.findOne({ name: "Men's Wear" });

    if (!mensCategory) {
      return res.status(404).json({ message: "Men's Wear category not found" });
    }

    res.json(mensCategory.items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Add a New Item to "Men's Wear"
router.post("/mensWear", async (req, res) => {
  try {
    const { name, price } = req.body;
    let mensCategory = await LaundryCategory.findOne({ name: "Men's Wear" });

    if (!mensCategory) {
      mensCategory = new LaundryCategory({
        name: "Men's Wear",
        icon: "men-icon.png",
        items: [{ name, price }],
      });
      await mensCategory.save();
    } else {
      mensCategory = await LaundryCategory.findOneAndUpdate(
        { name: "Men's Wear" },
        { $push: { items: { name, price } } },
        { new: true }
      );
    }

    res.status(201).json(mensCategory.items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Delete an Item from "Men's Wear"
router.delete("/mensWear/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid item ID" });
    }

    const updatedCategory = await LaundryCategory.findOneAndUpdate(
      { name: "Men's Wear" },
      { $pull: { items: { _id: new mongoose.Types.ObjectId(id) } } },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Item not found in Men's Wear" });
    }

    res.status(200).json({ message: "Item deleted successfully", id });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


// ✅ Edit an item in "Men's Wear"
router.put("/menswear/:id", async (req, res) => {
  try {
    const { id } = req.params; // Item's ObjectId
    const { name, price } = req.body; // Updated details

    // Find and update the specific item inside the "Men's Wear" category
    const updatedCategory = await LaundryCategory.findOneAndUpdate(
      { "name": "Men's Wear", "items._id": id },  // Find category and the specific item
      { $set: { "items.$.name": name, "items.$.price": price } },  // Update name & price
      { new: true }  // Return updated document
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(updatedCategory.items); // Return updated list
  } catch (err) {
    console.error("Error updating item:", err);
    res.status(500).json({ message: "Server error" });
  }
});

              // -- WOMEN's Wear Routes
router.get("/womensWear", async (req, res) => {
  try {
    const womensCategory = await LaundryCategory.findOne({ name: "Women's Wear" });

    if (!womensCategory) {
      return res.status(404).json({ message: "Women's Wear category not found" });
    }

    res.json(womensCategory.items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Add a New Item to "Women's Wear"
router.post("/womensWear", async (req, res) => {
  try {
    const { name, price } = req.body;
    let womensCategory = await LaundryCategory.findOne({ name: "Women's Wear" });

    if (!womensCategory) {
      womensCategory = new LaundryCategory({
        name: "Women's Wear",
        icon: "women-icon.png",
        items: [{ name, price }],
      });
      await womensCategory.save();
    } else {
      womensCategory = await LaundryCategory.findOneAndUpdate(
        { name: "Women's Wear" },
        { $push: { items: { name, price } } },
        { new: true }
      );
    }

    res.status(201).json(womensCategory.items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Delete an Item from "Women's Wear"

router.delete("/womensWear/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Convert `id` from string to ObjectId
    const objectId = new mongoose.Types.ObjectId(id);

    // Find the category and remove the item with matching `_id`
    const updatedCategory = await LaundryCategory.findOneAndUpdate(
      { name: "Women's Wear" },
      { $pull: { items: { _id: objectId } } }, // Convert `_id` to ObjectId for matching
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Item not found in Women's Wear" });
    }

    res.status(200).json({ message: "Item deleted successfully", id });
  } catch (err) {
    console.error("Error deleting item:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// ✅ Edit an item in "Women's Wear"
router.put("/womenswear/:id", async (req, res) => {
  try {
    const { id } = req.params; // Item's ObjectId
    const { name, price } = req.body; // Updated details

    // Find and update the specific item inside the "Women's Wear" category
    const updatedCategory = await LaundryCategory.findOneAndUpdate(
      { "name": "Women's Wear", "items._id": id },  // Find category and the specific item
      { $set: { "items.$.name": name, "items.$.price": price } },  // Update name & price
      { new: true }  // Return updated document
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(updatedCategory.items); // Return updated list
  } catch (err) {
    console.error("Error updating item:", err);
    res.status(500).json({ message: "Server error" });
  }
});

          // -- HOUSEHOLD Routes 
router.get("/household", async (req, res) => {
  try {
    const householdCategory = await LaundryCategory.findOne({ name: "Household" });

    if (!householdCategory) {
      return res.status(404).json({ message: "Household category not found" });
    }

    res.json(householdCategory.items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ Add a New Item to "Household"
router.post("/household", async (req, res) => {
  try {
    const { name, price } = req.body;
    let householdCategory = await LaundryCategory.findOne({ name: "Household" });

    if (!householdCategory) {
      householdCategory = new LaundryCategory({
        name: "Household",
        icon: "household-icon.png",
        items: [{ name, price }],
      });
      await householdCategory.save();
    } else {
      householdCategory = await LaundryCategory.findOneAndUpdate(
        { name: "Household" },
        { $push: { items: { name, price } } },
        { new: true } // Returns the updated document
      );
    }

    res.status(201).json(householdCategory.items); // ✅ Return the correct items list
  } catch (err) {
    console.error("Error adding item:", err);
    res.status(500).json({ message: err.message });
  }
});


// ✅ Delete an Item from "Household"
router.delete("/household/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid item ID" });
    }

    const updatedCategory = await LaundryCategory.findOneAndUpdate(
      { name: "Household" },
      { $pull: { items: { _id: new mongoose.Types.ObjectId(id) } } },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Item not found in Men's Wear" });
    }

    res.status(200).json({ message: "Item deleted successfully", id });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


// ✅ Edit an item in "Household"
router.put("/household/:id", async (req, res) => {
  try {
    const { id } = req.params; // Item's ObjectId
    const { name, price } = req.body; // Updated details

    // Find and update the specific item inside the "Household" category
    const updatedCategory = await LaundryCategory.findOneAndUpdate(
      { "name": "Household", "items._id": id },  // Find category and the specific item
      { $set: { "items.$.name": name, "items.$.price": price } },  // Update name & price
      { new: true }  // Return updated document
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(updatedCategory.items); // Return updated list
  } catch (err) {
    console.error("Error updating item:", err);
    res.status(500).json({ message: "Server error" });
  }
});


          //Get All Laundry Categories
router.get("/laundryCategories", async (req, res) => {
  try {
    const categories = await LaundryCategory.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

          //Get All Tailoring Categories
router.get("/tailoringCategories", async (req, res) => {
  try {
    const categories = await TailoringCategory.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

          //Get All Lehenga Designs
router.get("/lehengaDesigns", async (req, res) => {
  try {
    const lehengaDesigns = await Lehenga.find();
    res.json(lehengaDesigns);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

          //Get All Salwar Suit Designs
router.get("/SalwarSuitDesigns", async (req, res) => {
  try {
    const salwarSuitDesigns = await SalwarSuit.find();
    res.json(salwarSuitDesigns);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

          //Get All Jumpsuit Designs
router.get("/jumpsuitDesigns", async (req, res) => {
  try {
    const jumpsuitDesigns = await Jumpsuit.find();
    res.json(jumpsuitDesigns);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

          //Get All Shirt Designs
router.get("/ShirtDesigns", async (req, res) => {
  try {
    const ShirtDesigns = await Shirt.find();
    res.json(ShirtDesigns);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});


module.exports = router;
