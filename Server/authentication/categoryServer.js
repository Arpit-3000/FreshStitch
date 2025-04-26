const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const detect = require('detect-port').default || require('detect-port');

const LaundryCategory = require("./laundrycategorySchema");
const TailoringCategory = require("./tailoringCategorySchema");
const Lehenga = require("./lehengaSchema");
const Jumpsuit = require("./jumpsuitSchema");
const SalwarSuit = require("./salwarsuitSchema");
const Shirt = require("./shirtSchema");

const app = express();
app.use(express.json());
app.use(cors());
const port = 4000;


detect(port).then(freePort => {
  if (freePort !== port) {
      console.error(` Port ${port} is already in use`);
      process.exit(1);
  } else {
      app.listen(port, () => {
          console.log(` Server running on http://localhost:${port}`);
      });
  }
});

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/ExistingUsers", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB connection error:", err));


// ✅ Get Items from "Men's Wear" Category
app.get("/api/mensWear", async (req, res) => {
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
app.post("/api/mensWear", async (req, res) => {
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
app.delete("/api/mensWear/:id", async (req, res) => {
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
app.put("/api/menswear/:id", async (req, res) => {
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

// ✅ Get Items from "Women's Wear"
app.get("/api/womensWear", async (req, res) => {
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
app.post("/api/womensWear", async (req, res) => {
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

app.delete("/api/womensWear/:id", async (req, res) => {
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
app.put("/api/womenswear/:id", async (req, res) => {
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

// ✅ Get Items from "Household"
app.get("/api/household", async (req, res) => {
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
app.post("/api/household", async (req, res) => {
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
app.delete("/api/household/:id", async (req, res) => {
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
app.put("/api/household/:id", async (req, res) => {
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


// ✅ Get All Laundry Categories
app.get("/api/laundryCategories", async (req, res) => {
  try {
    const categories = await LaundryCategory.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get All Tailoring Categories
app.get("/api/tailoringcategories", async (req, res) => {
  try {
    const categories = await TailoringCategory.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get All Lehenga Designs
app.get("/api/lehengaDesigns", async (req, res) => {
  try {
    const lehengaDesigns = await Lehenga.find();
    res.json(lehengaDesigns);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Get All Salwar Suit Designs
app.get("/api/SalwarSuitDesigns", async (req, res) => {
  try {
    const salwarSuitDesigns = await SalwarSuit.find();
    res.json(salwarSuitDesigns);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Get All Jumpsuit Designs
app.get("/api/jumpsuitDesigns", async (req, res) => {
  try {
    const jumpsuitDesigns = await Jumpsuit.find();
    res.json(jumpsuitDesigns);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/api/ShirtDesigns", async (req, res) => {
  try {
    const ShirtDesigns = await Shirt.find();
    res.json(ShirtDesigns);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});



